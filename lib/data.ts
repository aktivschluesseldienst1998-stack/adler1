export const business = {
  name: 'Adler-Schlüsseldienst',
  city: 'Berlin',
  street: 'Kantstraße 123',
  zip: '10625 Berlin',
  phone: '+49 30 814507693',
  phoneDisplay: '030 814 5076 93',
  phoneHref: 'tel:+4930814507693',
  email: 'kontakt@adlerschluesseldienst.de',
  website: 'https://www.adlerschluesseldienst.de',
  hours: 'Büro nach Terminvereinbarung',
  emergencyHours: 'Schlüsselnotdienst: 24 Stunden täglich, 7 Tage die Woche',
  taxNote: 'Kein Ausweis von Umsatzsteuer, da Kleinunternehmer gemäß § 19 UStG.',
  authority: 'Zuständige Aufsichtsbehörde ist das Bezirksamt Mitte von Berlin.',
  chamber: 'IHK Berlin',
  responseTime: 'max. 30 Minuten',
  rating: 4.9,
  reviewCount: 61,
  reviewSources: 'Google, golocal & Meinungsmeister',
  googleMapsUrl: 'https://maps.app.goo.gl/2AmEZvicUidTwT5C8',
  googleMapsPlaceId: '0x47a85100599bec71:0xdabc09ceda11d5a6',
};

export const services = [
  {
    slug: 'tueroeffnung',
    icon: 'DoorOpen',
    title: 'Türöffnung',
    short: 'Schnelle und beschädigungsfreie Türöffnung – rund um die Uhr.',
    description:
      'Unser Team steht Ihnen jederzeit zur Verfügung, um Ihnen bei einer Türöffnung schnell und unkompliziert zu helfen. Egal ob es sich um Ihre Haus- oder Wohnungstür handelt – wir öffnen ohne jegliche Beschädigungen.',
    features: [
      'Beschädigungsfreie Öffnungstechnik',
      '24/7 Notdienst-Einsatz',
      'Festpreis am Telefon',
      'In maximal 30 Minuten vor Ort',
    ],
    faqs: [
      {
        q: 'Wie schnell ist der Schlüsseldienst bei mir?',
        a: 'Unsere Techniker sind in der Regel innerhalb von maximal 30 Minuten bei Ihnen vor Ort – egal in welchem Berliner Bezirk Sie sich befinden.',
      },
      {
        q: 'Wird meine Tür bei der Öffnung beschädigt?',
        a: 'Nein. Wir verwenden professionelle Technik, die es ermöglicht, Ihre Tür in den allermeisten Fällen völlig ohne Beschädigung zu öffnen.',
      },
      {
        q: 'Was kostet eine Türöffnung?',
        a: 'Den genauen Festpreis nennen wir Ihnen vorab am Telefon – ohne versteckte Kosten.',
      },
    ],
  },
  {
    slug: 'schlosswechsel',
    icon: 'KeyRound',
    title: 'Schlosswechsel',
    short: 'Defektes Schloss, Schlüsselverlust oder Wunsch nach mehr Sicherheit? Wir tauschen Schlösser und Schließzylinder fachgerecht aus.',
    description:
      'Sind Sie auf der Suche nach einem neuen Schloss? Wir bieten eine vielfältige Auswahl an hochwertigen Produkten und kümmern uns gerne um den fachgerechten Einbau für Sie.',
    features: [
      'Große Auswahl hochwertiger Schlösser',
      'Fachgerechter Einbau durch Profis',
      'Beratung zu Sicherheitsklassen',
      'Markenprodukte namhafter Hersteller',
    ],
    faqs: [
      {
        q: 'Wie lange dauert ein Schlosswechsel?',
        a: 'Ein Schlosswechsel dauert in der Regel 15 bis 30 Minuten, je nach Schlosstyp und Türbeschaffenheit.',
      },
      {
        q: 'Welche Schlösser bauen Sie ein?',
        a: 'Wir führen eine breite Auswahl an Schließzylindern namhafter Hersteller – vom Standardzylinder bis zum Hochsicherheitszylinder mit Pickschutz und Bohrschutz.',
      },
      {
        q: 'Kann ich nach einem Schlüsselverlust sofort einen Schlosswechsel beauftragen?',
        a: 'Ja. Bei verlorenen Schlüsseln empfehlen wir einen zeitnahen Austausch des Zylinders, damit Unbefugte keinen Zugang erhalten. Wir sind 24/7 für Sie da.',
      },
    ],
  },
  {
    slug: 'einbruchschaden',
    icon: 'ShieldAlert',
    title: 'Einbruchschadenbeseitigung',
    short: 'Nach einem Einbruch sichern und reparieren wir beschädigte Schlösser, Zylinder und Türbereiche.',
    description:
      'Im Falle eines Einbruchs ist schnelles Handeln gefragt. Wir reparieren beschädigte Türen und Schlösser schnell und zuverlässig, damit Sie sich wieder sicher fühlen können.',
    features: [
      'Schnelle Notfall-Reparatur',
      'Tür- und Schlossinstandsetzung',
      'Sicherung der Wohnung nach Einbruch',
    ],
    faqs: [
      {
        q: 'Was muss ich nach einem Einbruch tun?',
        a: 'Sichern Sie die Stelle, rufen Sie die Polizei und anschließend uns. Wir kommen schnell vor Ort und reparieren oder ersetzen das Schloss, damit Ihre Wohnung wieder sicher ist.',
      },
      {
        q: 'Wie schnell kann jemand nach einem Einbruch kommen?',
        a: 'Unser Notdienst ist 24/7 erreichbar und in der Regel innerhalb von 30 Minuten bei Ihnen.',
      },
    ],
  },
  {
    slug: 'einbruchschutz',
    icon: 'ShieldCheck',
    title: 'Einbruchschutz',
    short: 'Wir prüfen Schwachstellen an Türen und beraten zu geeigneten mechanischen Sicherheitslösungen für Wohnung, Haus und Gewerbe.',
    description:
      'Lassen Sie sich von uns zu mechanischer Sicherheitstechnik beraten. Wir prüfen Schwachstellen an Ihren Türen und installieren auf Wunsch passenden Einbruchschutz wie Panzerriegel, Stangenschlösser und Zusatzschlösser.',
    features: [
      'Beratung zu mechanischer Sicherheitstechnik',
      'Schwachstellenanalyse an Türen',
      'Montage von Panzerriegeln und Stangenschlössern',
      'Individuelle Sicherheitslösungen',
    ],
    faqs: [
      {
        q: 'Wie sichere ich mein Zuhause optimal gegen Einbruch?',
        a: 'Wir beraten Sie individuell – von Zusatzschlössern über Querriegelverschlüsse bis hin zu Stangenschlössern. Auf Wunsch übernehmen wir die komplette Montage.',
      },
      {
        q: 'Welche Anforderungen kann die Versicherung an den Einbruchschutz stellen?',
        a: 'Je nach Versicherungsvertrag können bestimmte Anforderungen an den Einbruchschutz bestehen. Prüfen Sie im Zweifel die Bedingungen Ihrer Versicherung oder sprechen Sie direkt mit Ihrem Versicherer.',
      },
      {
        q: 'Welche mechanische Sicherung ist für meine Tür sinnvoll?',
        a: 'Das hängt von Türtyp, Einbausituation und Sicherheitsklasse ab. Wir prüfen die Gegebenheiten vor Ort und empfehlen die passende Lösung – von Zusatzschloss bis Panzerriegel.',
      },
    ],
  },
  {
    slug: 'zusaetzliche-schloesser',
    icon: 'Lock',
    title: 'Zusatzschlösser & Panzerriegel',
    short: 'Zusätzliche mechanische Sicherungen können den Widerstand einer vorhandenen Tür erhöhen. Wir beraten zur passenden Lösung und übernehmen die Montage.',
    description:
      'Durch den Einsatz von zusätzlichen Sicherheitsschlössern können Sie Ihren Einbruchschutz effektiv verbessern. Lassen Sie sich von uns beraten und profitieren Sie von unserer professionellen Montage.',
    features: [
      'Beratung zu Zusatzschlössern',
      'Professionelle Montage',
      'Verschiedene Sicherheitsklassen',
      'Sicherung von Wohnungs- und Haustüren',
    ],
    faqs: [
      {
        q: 'Wann sind zusätzliche Schlösser sinnvoll?',
        a: 'Zusätzliche Schlösser sind immer dann empfehlenswert, wenn eine Tür nur über einen einzigen Schließzylinder verfügt oder wenn Sie den Schutz einer Wohnungstür oder Haustür erhöhen möchten.',
      },
      {
        q: 'Welche Arten von Zusatzschlössern gibt es?',
        a: 'Es gibt Querriegelschlösser, Zusatzsicherungen mit Drehknopf, Bänderiegel und viele mehr. Wir beraten Sie, welches System für Ihre Tür am besten geeignet ist.',
      },
      {
        q: 'Darf ich ein Zusatzschloss in meiner Mietwohnung anbringen lassen?',
        a: 'In den meisten Fällen ja, insbesondere bei Wohnungstüren. Wir beraten Sie gerne zu den rechtlichen Rahmenbedingungen und mietvertraglichen Möglichkeiten.',
      },
    ],
  },
  {
    slug: 'hochsicherheitszylinder',
    icon: 'ShieldPlus',
    title: 'Sicherheitszylinder',
    short: 'Wir tauschen vorhandene Schließzylinder gegen moderne Sicherheitszylinder und beraten bei der Auswahl des passenden Systems.',
    description:
      'Unsere hochwertigen Sicherheitszylinder bieten einen effektiven Schutz vor Manipulationen und Einbrüchen. Wir führen eine breite Auswahl an Sicherheitszylindern namhafter Hersteller und unterstützen Sie gerne bei der Auswahl des passenden Modells.',
    features: [
      'Pickschutz und Bohrschutz',
      'Namhafte Hersteller',
      'Individuelle Sicherheitsberatung',
      'Auf Wunsch mit Schließanlage',
    ],
    faqs: [
      {
        q: 'Was unterscheidet einen Hochsicherheitszylinder von einem Standardzylinder?',
        a: 'Hochsicherheitszylinder verfügen über erweiterte Schutzmechanismen gegen Picking, Bohren und Ziehen. Welche Lösung passt, hängt von Tür, Einbausituation und gewünschtem Schutz ab.',
      },
      {
        q: 'Welche Anforderungen kann die Versicherung an einen Sicherheitszylinder stellen?',
        a: 'Je nach Versicherungsvertrag können bestimmte Anforderungen an den Einbruchschutz bestehen. Prüfen Sie im Zweifel die Bedingungen Ihrer Versicherung oder sprechen Sie direkt mit Ihrem Versicherer.',
      },
      {
        q: 'Kann ich mehrere Schlüssel für einen Hochsicherheitszylinder bestellen?',
        a: 'Ja, je nach Hersteller können zusätzliche Schlüssel bestellt werden. Bei bestimmten geschützten Schließsystemen kann für die Anfertigung zusätzlicher Schlüssel eine Sicherungskarte erforderlich sein.',
      },
    ],
  },
] as const;

export const districts = [
  { slug: 'mitte', name: 'Mitte', description: 'Türöffnung und Schlüsseldienst in Berlin Mitte – schnell, zuverlässig und zu fairen Festpreisen.' },
  { slug: 'friedrichshain-kreuzberg', name: 'Friedrichshain-Kreuzberg', description: '24/7 Schlüsseldienst in Friedrichshain-Kreuzberg: Türöffnung, Schlosswechsel und Notdienst.' },
  { slug: 'pankow', name: 'Pankow', description: 'Schlüsseldienst Pankow: Notdienst-Türöffnung, Schlosswechsel und Einbruchschutz rund um die Uhr.' },
  { slug: 'charlottenburg-wilmersdorf', name: 'Charlottenburg-Wilmersdorf', description: 'Schlüsseldienst in Charlottenburg-Wilmersdorf: Schnelle Türöffnung und Sicherheitstechnik mit Festpreis am Telefon.' },
  { slug: 'spandau', name: 'Spandau', description: 'Schlüsseldienst Spandau: 24/7 Notdienst, Schlosswechsel und Einbruchschutz zum Festpreis.' },
  { slug: 'steglitz-zehlendorf', name: 'Steglitz-Zehlendorf', description: 'Türöffnung und Schlüsseldienst in Steglitz-Zehlendorf – beschädigungsfrei und schnell vor Ort.' },
  { slug: 'tempelhof-schoeneberg', name: 'Tempelhof-Schöneberg', description: 'Schlüsseldienst Tempelhof-Schöneberg: Notdienst, Schlosswechsel und Sicherheitstechnik.' },
  { slug: 'neukoelln', name: 'Neukölln', description: 'Schlüsseldienst Neukölln: 24h Notdienst-Türöffnung und Schlosswechsel zum Festpreis.' },
  { slug: 'treptow-koepenick', name: 'Treptow-Köpenick', description: 'Schlüsseldienst in Treptow-Köpenick: Schnelle Türöffnung und Einbruchschutz.' },
  { slug: 'marzahn-hellersdorf', name: 'Marzahn-Hellersdorf', description: 'Schlüsseldienst Marzahn-Hellersdorf: Türöffnung, Schlosswechsel und Notdienst rund um die Uhr.' },
  { slug: 'lichtenberg', name: 'Lichtenberg', description: 'Schlüsseldienst Lichtenberg: Notdienst-Türöffnung und Sicherheitstechnik mit Festpreis am Telefon.' },
  { slug: 'reinickendorf', name: 'Reinickendorf', description: 'Schlüsseldienst Reinickendorf: 24/7 Notdienst, Schlosswechsel und Einbruchschutz.' },
] as const;

export const reviews = [
  {
    name: 'Sandra M.',
    rating: 5,
    date: 'Juni 2026',
    text: 'Ich hatte mich ausgesperrt und innerhalb von 20 Minuten war der Techniker da. Tür ohne Beschädigung geöffnet und der Preis stimmte genau wie am Telefon gesagt. Sehr empfehlenswert!',
    source: 'Google',
  },
  {
    name: 'Thomas K.',
    rating: 5,
    date: 'Mai 2026',
    text: 'Top Leistung, ein kompetenter Handwerker, der schnell und sauber gearbeitet hat. Festpreis wie vereinbart – keine bösen Überraschungen. Gerne wieder.',
    source: 'golocal',
  },
  {
    name: 'Jana P.',
    rating: 5,
    date: 'Mai 2026',
    text: 'Sehr freundlich, war schnell da, Preis war wie am Telefon besprochen. Danke für die schnelle Hilfe in einer stressigen Situation.',
    source: 'Meinungsmeister',
  },
  {
    name: 'Michael R.',
    rating: 5,
    date: 'April 2026',
    text: 'Nach einem Einbruch wurde unser Schloss innerhalb einer Stunde ausgetauscht. Sehr professionelle Beratung zu Sicherheitstechnik. Fühlen uns wieder sicher.',
    source: 'Google',
  },
  {
    name: 'Andreas B.',
    rating: 5,
    date: 'April 2026',
    text: 'Ausgezeichneter, zuverlässiger Service und überaus freundlich. Tür war ruckzuck offen, ohne Schaden. Klare Empfehlung!',
    source: 'Gelbe Seiten',
  },
  {
    name: 'Katrin S.',
    rating: 5,
    date: 'März 2026',
    text: 'Mitten in der Nacht ausgesperrt – trotzdem kam jemand innerhalb von 25 Minuten. Faires Festpreis-Angebot am Telefon. Riesige Erleichterung!',
    source: 'Google',
  },
  {
    name: 'Daniel W.',
    rating: 5,
    date: 'März 2026',
    text: 'Haben einen Hochsicherheitszylinder einbauen lassen. Gute Beratung, saubere Arbeit und faire Preise. Sehr zufrieden.',
    source: 'golocal',
  },
  {
    name: 'Nicole F.',
    rating: 5,
    date: 'Februar 2026',
    text: 'Der Techniker war sehr freundlich und kompetent. Türöffnung ohne Schaden, Preis genau wie versprochen. Absolute Empfehlung!',
    source: 'Meinungsmeister',
  },
  {
    name: 'Stefan H.',
    rating: 5,
    date: 'Februar 2026',
    text: 'Schnelle Hilfe nach Schlüsselverlust. Schloss wurde noch am selben Tag gewechselt. Sehr professionell und zuverlässig.',
    source: 'Google',
  },
];

export const advantages = [
  {
    icon: 'Clock',
    title: '24/7',
    text: 'Rund um die Uhr erreichbar',
  },
  {
    icon: 'Timer',
    title: 'max. 30 Min.',
    text: 'Schnell in Berlin vor Ort',
  },
  {
    icon: 'Euro',
    title: 'Festpreis',
    text: 'Preis vor der Anfahrt',
  },
  {
    icon: 'DoorOpen',
    title: 'Schonende Öffnung',
    text: 'Professionelle Öffnungsmethoden',
  },
  {
    icon: 'MapPin',
    title: 'Berlinweit',
    text: 'Alle 12 Bezirke',
  },
] as const;

export const navLinks = [
  { href: '/leistungen', label: 'Leistungen' },
  { href: '/sicherheits-check', label: 'Sicherheits-Check' },
  { href: '/termin-buchen', label: 'Termin buchen' },
  { href: '/preise', label: 'Preise' },
  { href: '/bezirke', label: 'Bezirke' },
  { href: '/bewertungen', label: 'Bewertungen' },
  { href: '/ueber-uns', label: 'Über uns' },
  { href: '/kontakt', label: 'Kontakt' },
];

export const footerLinks = {
  leistungen: services.map((s) => ({ href: `/leistungen/${s.slug}`, label: s.title })),
  bezirke: districts.slice(0, 6).map((d) => ({ href: `/bezirke/${d.slug}`, label: d.name })),
  rechtliches: [
    { href: '/impressum', label: 'Impressum' },
    { href: '/datenschutz', label: 'Datenschutz' },
    { href: '/preise', label: 'Preise & Kosten' },
  ],
};

export const problemCards = [
  {
    title: 'Tür zugefallen?',
    text: 'Die Wohnungstür ist ins Schloss gefallen und der Schlüssel liegt noch drinnen? Bei einer lediglich zugefallenen Tür ist häufig eine schnelle und schonende Öffnung möglich.',
    link: '/leistungen/tueroeffnung',
  },
  {
    title: 'Schlüssel steckt von innen',
    text: 'Der Schlüssel steckt auf der Innenseite der Tür? Abhängig vom eingebauten Schließzylinder und der Türsituation kann trotzdem eine Öffnung möglich sein.',
    link: '/leistungen/tueroeffnung',
  },
  {
    title: 'Schlüssel abgebrochen',
    text: 'Ist ein Schlüssel im Schloss abgebrochen, prüfen wir zunächst, ob sich das abgebrochene Stück entfernen lässt und der vorhandene Zylinder weiter genutzt werden kann.',
    link: '/leistungen/tueroeffnung',
  },
  {
    title: 'Schlüssel verloren',
    text: 'Bei einem verlorenen Schlüssel kann neben der Türöffnung auch ein Austausch des Schließzylinders sinnvoll sein – insbesondere wenn nicht ausgeschlossen werden kann, dass der Schlüssel einer Adresse zugeordnet werden kann.',
    link: '/leistungen/schlosswechsel',
  },
  {
    title: 'Tür abgeschlossen',
    text: 'Eine abgeschlossene Tür erfordert andere Öffnungsmethoden als eine lediglich zugefallene Tür. Die Situation wird vor Ort geprüft und das weitere Vorgehen mit dem Kunden besprochen.',
    link: '/leistungen/tueroeffnung',
  },
  {
    title: 'Schloss oder Zylinder defekt',
    text: 'Dreht der Schlüssel durch, klemmt oder lässt er sich nicht mehr bewegen, kann die Ursache beispielsweise am Schließzylinder, Einsteckschloss oder an der Verriegelung liegen.',
    link: '/leistungen/schlosswechsel',
  },
];

export const securityCards = [
  {
    title: 'Panzerriegel / Querriegelschloss',
    text: 'Zusätzliche Sicherung einer Tür über einen großen Teil ihrer Breite.',
    cta: 'Panzerriegel nachrüsten',
    link: '/leistungen/zusaetzliche-schloesser',
  },
  {
    title: 'Stangenschloss',
    text: 'Zusätzliche mechanische Sicherung in Richtung oberer und unterer Türbereich.',
    cta: 'Mehr über Stangenschlösser',
    link: '/leistungen/zusaetzliche-schloesser',
  },
  {
    title: 'Sicherheitszylinder',
    text: 'Hochwertige Schließzylinder als Bestandteil einer verbesserten Türsicherung.',
    cta: 'Sicherheitszylinder ansehen',
    link: '/leistungen/hochsicherheitszylinder',
  },
  {
    title: 'Zusatzschloss',
    text: 'Zusätzlicher Verriegelungspunkt für vorhandene Türen.',
    cta: 'Mehr über Zusatzschlösser',
    link: '/leistungen/zusaetzliche-schloesser',
  },
];

export const priceTable = [
  { label: 'Zugefallene Tür', price: 'Preis anfragen' },
  { label: 'Abgeschlossene Tür', price: 'Preis anfragen' },
  { label: 'Schlosswechsel', price: 'Preis anfragen' },
  { label: 'Sicherheitszylinder', price: 'Preis anfragen' },
  { label: 'Anfahrt innerhalb Berlins', price: 'kostenlos' },
];

export const neighborhoods = [
  'Charlottenburg',
  'Wilmersdorf',
  'Steglitz',
  'Lichterfelde',
  'Zehlendorf',
  'Tempelhof',
  'Schöneberg',
  'Neukölln',
  'Kreuzberg',
  'Friedrichshain',
  'Köpenick',
  'Adlershof',
  'Lichtenberg',
  'Marzahn',
  'Hellersdorf',
  'Wedding',
  'Moabit',
];

export const homepageFaqs = [
  {
    q: 'Was kostet eine Türöffnung in Berlin?',
    a: 'Den genauen Festpreis nennen wir Ihnen vorab am Telefon – transparent, ohne versteckte Kosten und ohne Überraschungen vor Ort. Der Preis hängt von der Türsituation ab: Ist die Tür nur zugefallen oder abgeschlossen? Welcher Schlosstyp ist verbaut? Findet der Einsatz tagsüber oder nachts statt? All diese Faktoren klären wir am Telefon, bevor wir losfahren, sodass Sie vor der Anfahrt wissen, was auf Sie zukommt.',
  },
  {
    q: 'Wie schnell ist der Schlüsseldienst vor Ort?',
    a: 'Unsere Techniker sind in Berlin in der Regel innerhalb von maximal 30 Minuten bei Ihnen vor Ort. Die genaue Anfahrtszeit hängt vom aktuellen Standort des nächsten verfügbaren Technikers ab. Da wir in allen 12 Bezirken im Einsatz sind, ist meist jemand in Ihrer Nähe.',
  },
  {
    q: 'Kann eine zugefallene Tür ohne Beschädigung geöffnet werden?',
    a: 'Ja, in den weitaus meisten Fällen ist eine beschädigungsfreie Öffnung möglich. Wir arbeiten mit professionellen Öffnungswerkzeugen und modernen Methoden, die das Schloss und die Tür voll funktionsfähig erhalten. Nur bei einem abgebrochenen Schlüssel im Schloss oder einem stark beschädigten Schloss kann ein Bohren notwendig sein – das besprechen wir vorher mit Ihnen.',
  },
  {
    q: 'Was passiert, wenn der Schlüssel von innen steckt?',
    a: 'Das ist eine häufige Situation, die wir routiniert lösen. Je nach eingebautem Schließzylinder und Türsituation lässt sich die Tür trotzdem öffnen, bei anderen Schlössern benötigen wir einen besonderen Eingang. Rufen Sie uns an und schildern Sie die Situation – wir beraten Sie telefonisch und sagen Ihnen, was möglich ist.',
  },
  {
    q: 'Muss ich mich nach einer Türöffnung ausweisen?',
    a: 'Ja. Bevor wir eine Tür öffnen, prüfen wir Ihre Berechtigung. Bitte halten Sie Ihren Personalausweis und nach Möglichkeit einen Mietvertrag oder eine Post mit der Anschrift bereit. Das schützt Sie und Ihre Nachbarn und ist für uns Standard bei jedem Einsatz.',
  },
  {
    q: 'Muss nach einer Türöffnung das Schloss gewechselt werden?',
    a: 'Nicht zwingend. Bei einer beschädigungsfreien Öffnung bleibt das Schloss voll funktionsfähig. Ein Wechsel ist jedoch empfehlenswert, wenn der Schlüssel verloren ging oder das Schloss ohnehin defekt war. Wir beraten Sie vor Ort, ob ein Tausch sinnvoll ist.',
  },
  {
    q: 'Was mache ich bei einem abgebrochenen Schlüssel?',
    a: 'Ist ein Schlüssel im Schloss abgebrochen, prüfen wir zunächst, ob sich das abgebrochene Stück entfernen lässt und der vorhandene Zylinder weiter genutzt werden kann. Gelingt das nicht, ist ein Zylinderwechsel notwendig. Wir beraten Sie transparent über die Möglichkeiten und Kosten.',
  },
  {
    q: 'Was kostet ein Schlosswechsel?',
    a: 'Die Kosten für einen Schlosswechsel setzen sich aus dem Arbeitsaufwand und dem Material zusammen. Wir beraten Sie zur passenden Sicherheitsklasse und nennen Ihnen den Gesamtpreis vorab. So wissen Sie vor der Ausführung, was die Leistung kostet.',
  },
  {
    q: 'Welcher Einbruchschutz ist für eine Wohnungstür sinnvoll?',
    a: 'Das hängt von Türtyp, Einbausituation und gewünschter Sicherheitsklasse ab. Häufige Maßnahmen sind Zusatzschlösser, Panzerriegel, Stangenschlösser und Sicherheitszylinder. Wir prüfen die Gegebenheiten vor Ort und empfehlen die passende Lösung – auf Wunsch inklusive fachgerechter Montage.',
  },
  {
    q: 'Ist Adler nachts, am Wochenende und an Feiertagen erreichbar?',
    a: 'Ja. Unser Notdienst ist 24 Stunden täglich, 7 Tage die Woche und auch an Feiertagen erreichbar. Für Nachteinsätze zwischen 22 und 6 Uhr kann ein Nachtzuschlag anfallen – wir informieren Sie darüber vorab am Telefon, bevor wir losfahren.',
  },
];
