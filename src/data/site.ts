/**
 * Zentrale Stammdaten der Bäckerei Schmitz.
 * Hier ändern sich Kontakt, Social-Media-Links und Öffnungszeiten –
 * die Website übernimmt die Werte automatisch an allen Stellen.
 */

export const site = {
  name: 'Bäckerei Schmitz Werne',
  /** Wird an jeden Seitentitel angehängt: "Seitentitel | Bäckerei Schmitz Werne" */
  titleSuffix: 'Bäckerei Schmitz Werne',
  url: 'https://www.schmitz-werne.de',
  owner: 'Barbara Schmitz',
  email: 'info@baguetterie-schmitz.de',
  /** Telefonnummer im Impressum */
  phone: { label: '02389 / 2534', tel: '+4923892534' },
  /** Steht in Formular-Fehlermeldungen als Ausweg */
  emergencyPhone: { label: '02389 781208', tel: '+492389781208' },
  address: {
    street: 'Stockumer Str. 27',
    zip: '59368',
    city: 'Werne',
    country: 'DE',
  },
  taxNumber: '333 5121 2357',
  copyrightYear: 2026,
};

export const social = {
  facebook: 'https://www.facebook.com/bakerboyswerne',
  instagram: 'https://www.instagram.com/baeckerei_schmitz_werne/',
  whatsapp: 'https://api.whatsapp.com/send/?phone=492389781208',
};

/** Standorte inkl. Öffnungszeiten (Startseite, Sektion "Standorte") */
export const locations = [
  {
    id: 'baker-boys',
    name: 'Baker Boys',
    image: 'standortBakerBoys',
    description:
      'Die Anlaufstelle für deine tägliche Brotzeit – belegte Brötchen, Snacks und großzügige Parkmöglichkeiten.',
    hoursTitle: 'Reguläre Öffnungszeiten:',
    hours: ['Mo-Fr: 05:00 - 17:00 Uhr', 'Sa: geschlossen'],
    phone: { label: '02389 / 402 10 49', tel: '+4923894021049' },
    address: 'Stockumer Str. 27, 59368 Werne',
  },
  {
    id: 'backstube',
    name: 'Backstube',
    image: 'standortBackstubeLive',
    description:
      'Sehen, Riechen & Schmecken. Bei einem Kaffee die Herstellung der verschiedenen Backwaren live verfolgen.',
    hoursTitle: 'Reguläre Öffnungszeiten:',
    hours: ['Mo–Fr: 06:00–10:00 Uhr oder länger (so lange Licht brennt)', 'Sa: geschlossen'],
    phone: { label: '02389 781208', tel: '+492389781208' },
    address: 'Schlot 1 (Am Busbahnhof), 59368 Werne',
  },
] as const;

/**
 * Ältere Standort-Karten (auf der alten Seite ausgeblendet).
 * Werden nur angezeigt, wenn in sections.ts `home.standorteAlt` auf true steht.
 */
export const locationsOld = [
  {
    ...locations[0],
    hoursTitle: 'Öffnungszeiten:',
    hours: ['Mo-Fr: 05:00 - 13:30 Uhr', 'Sa: geschlossen'],
    phone: { label: '02389 2534', tel: '+4923892534' },
  },
  {
    ...locations[1],
    hoursTitle: 'Öffnungszeiten:',
    hours: ['Mo–Fr 06:00–10:00 Uhr oder länger (so lange Licht brennt)', 'Sa: geschlossen'],
  },
] as const;

export const nav = [
  { label: 'Startseite', href: '/' },
  { label: 'Hexenhäuser Bastel-Sets', href: '/hexenhauser-bastel-sets' },
  { label: 'Hexenhaus basteln', href: '/hexenhaus-basteln' },
  { label: 'Kindergeburtstag', href: '/kindergeburtstag-werne' },
];

/** Ab diesem Menüpunkt (Index) landen die Einträge auf großen Bildschirmen im "…"-Menü */
export const navOverflowFrom = 3;

export const footerNav = [
  { label: 'Impressum', href: '/impressum' },
  { label: 'Datenschutz', href: '/datenschutz' },
];
