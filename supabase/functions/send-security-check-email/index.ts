import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const RECIPIENT_EMAIL = "aktiv.schluesseldienst1998@gmail.com";

type PhotoPayload = {
  label: string;
  data_url: string;
  index: number;
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { door_type, first_name, phone, zip, message, photo_count, photos } = await req.json() as {
      door_type: string;
      first_name: string;
      phone: string;
      zip: string;
      message: string | null;
      photo_count: number;
      photos?: PhotoPayload[];
    };

    const attachments: { filename: string; content: string }[] = [];
    const photoHtmlRows: string[] = [];

    if (photos && Array.isArray(photos)) {
      for (const photo of photos) {
        if (!photo.data_url || !photo.data_url.startsWith("data:image/")) continue;

        const base64Match = photo.data_url.match(/^data:image\/(\w+);base64,(.+)$/);
        if (!base64Match) continue;

        const ext = base64Match[1] === "jpeg" ? "jpg" : base64Match[1];
        const base64Data = base64Match[2];

        const safeLabel = photo.label.replace(/[^a-zA-Z0-9äöüÄÖÜß _-]/g, "").trim() || "Foto";
        const filename = `Foto_${photo.index}_${safeLabel}.${ext}`;

        attachments.push({ filename, content: base64Data });

        photoHtmlRows.push(
          `<div style="margin-bottom:16px;"><p style="margin:0 0 4px;font-weight:bold;color:#334155;">${photo.index}. ${photo.label}</p><img src="cid:${filename}" alt="${photo.label}" style="max-width:100%;border-radius:8px;border:1px solid #e2e8f0;" /></div>`
        );
      }
    }

    const photosSection = photoHtmlRows.length > 0
      ? `<h2 style="color:#0f766e;margin-top:24px;margin-bottom:12px;">Hochgeladene Fotos</h2>${photoHtmlRows.join("")}`
      : "";

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f8fafc; border-radius: 12px;">
        <h1 style="color: #0f766e; margin-bottom: 24px;">Neue Sicherheits-Check Anfrage</h1>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; font-weight: bold; color: #334155; width: 140px;">Türart:</td><td style="padding: 8px 0; color: #475569;">${door_type}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #334155;">Name:</td><td style="padding: 8px 0; color: #475569;">${first_name}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #334155;">Telefon:</td><td style="padding: 8px 0; color: #475569;">${phone}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #334155;">PLZ:</td><td style="padding: 8px 0; color: #475569;">${zip}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #334155;">Fotos:</td><td style="padding: 8px 0; color: #475569;">${photo_count} Foto(s) hochgeladen</td></tr>
          ${message ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #334155; vertical-align: top;">Nachricht:</td><td style="padding: 8px 0; color: #475569;">${message}</td></tr>` : ''}
        </table>
        ${photosSection}
        <p style="margin-top: 24px; padding: 16px; background: #ecfeff; border-radius: 8px; color: #155e75; font-size: 14px;">
          Bitte kontaktieren Sie den Kunden innerhalb von 24 Stunden unter der angegebenen Telefonnummer.
        </p>
        <p style="margin-top: 24px; color: #94a3b8; font-size: 12px;">Diese E-Mail wurde automatisch vom Sicherheits-Check Formular generiert.</p>
      </div>
    `;

    const emailText = `Neue Sicherheits-Check Anfrage

Türart: ${door_type}
Name: ${first_name}
Telefon: ${phone}
PLZ: ${zip}
Fotos: ${photo_count} Foto(s) hochgeladen${attachments.length > 0 ? " (als Anhang beigefügt)" : ""}
${message ? `Nachricht: ${message}` : ''}

Bitte kontaktieren Sie den Kunden innerhalb von 24 Stunden.`;

    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      return new Response(JSON.stringify({ error: "RESEND_API_KEY not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const emailBody: Record<string, unknown> = {
      from: "Sicherheits-Check <onboarding@resend.dev>",
      to: [RECIPIENT_EMAIL],
      subject: `Neue Sicherheits-Check Anfrage von ${first_name}`,
      html: emailHtml,
      text: emailText,
    };

    if (attachments.length > 0) {
      emailBody.attachments = attachments;
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailBody),
    });

    if (!res.ok) {
      const errText = await res.text();
      return new Response(JSON.stringify({ error: errText }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true, attachments_sent: attachments.length }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
