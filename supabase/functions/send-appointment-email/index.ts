import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const RECIPIENT_EMAIL = "aktiv.schluesseldienst1998@gmail.com";

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const {
      service,
      door_type,
      reason,
      appointment_date,
      time_slot,
      first_name,
      last_name,
      phone,
      email,
      address,
    } = await req.json() as {
      service: string;
      door_type: string;
      reason: string;
      appointment_date: string;
      time_slot: string;
      first_name: string;
      last_name: string;
      phone: string;
      email: string;
      address: string;
    };

    const formattedDate = new Intl.DateTimeFormat("de-DE", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(new Date(`${appointment_date}T12:00:00`));

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f8fafc; border-radius: 12px;">
        <h1 style="color: #0f766e; margin-bottom: 24px;">Neue Terminanfrage</h1>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; font-weight: bold; color: #334155; width: 160px;">Leistung:</td><td style="padding: 8px 0; color: #475569;">${service}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #334155;">Türart:</td><td style="padding: 8px 0; color: #475569;">${door_type}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #334155;">Grund:</td><td style="padding: 8px 0; color: #475569;">${reason}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #334155;">Wunschtermin:</td><td style="padding: 8px 0; color: #475569;">${formattedDate}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #334155;">Zeitfenster:</td><td style="padding: 8px 0; color: #475569;">${time_slot}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #334155;">Name:</td><td style="padding: 8px 0; color: #475569;">${first_name} ${last_name}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #334155;">Telefon:</td><td style="padding: 8px 0; color: #475569;">${phone}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #334155;">E-Mail:</td><td style="padding: 8px 0; color: #475569;">${email}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #334155; vertical-align: top;">Adresse:</td><td style="padding: 8px 0; color: #475569; white-space: pre-line;">${address}</td></tr>
        </table>
        <p style="margin-top: 24px; padding: 16px; background: #ecfeff; border-radius: 8px; color: #155e75; font-size: 14px;">
          Bitte kontaktieren Sie den Kunden zur Terminbestätigung unter der angegebenen Telefonnummer oder E-Mail-Adresse.
        </p>
        <p style="margin-top: 24px; color: #94a3b8; font-size: 12px;">Diese E-Mail wurde automatisch vom Terminbuchungs-Formular generiert.</p>
      </div>
    `;

    const emailText = `Neue Terminanfrage

Leistung: ${service}
Türart: ${door_type}
Grund: ${reason}
Wunschtermin: ${formattedDate}
Zeitfenster: ${time_slot}
Name: ${first_name} ${last_name}
Telefon: ${phone}
E-Mail: ${email}
Adresse: ${address}

Bitte kontaktieren Sie den Kunden zur Terminbestätigung.`;

    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      return new Response(JSON.stringify({ error: "RESEND_API_KEY not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Terminbuchung <onboarding@resend.dev>",
        to: [RECIPIENT_EMAIL],
        subject: `Neue Terminanfrage von ${first_name} ${last_name}`,
        html: emailHtml,
        text: emailText,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      return new Response(JSON.stringify({ error: errText }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
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
