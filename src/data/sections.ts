/**
 * Sektionen ein- und ausschalten.
 * true  = Sektion wird angezeigt
 * false = Sektion ist ausgeblendet (Inhalt bleibt erhalten und kann jederzeit wieder eingeschaltet werden)
 *
 * Nach dem Ändern: speichern, committen, pushen – Vercel baut die Seite automatisch neu.
 */
export const sections = {
  home: {
    hero: true, //                 "Deine Bäckerei in Werne an der Lippe"
    simjueDienstag: true, //       Aktion "SIM-JÜ Dienstag in der Backstube!" (Text in announcements.ts)
    standorteAlt: false, //        Alte Standort-Karten (Baker Boys bis 13:30 Uhr, Tel. 2534)
    feiertage: false, //           "Öffnungszeiten an den Feiertagen" (Text in announcements.ts)
    standorte: true, //            Standort-Karten Baker Boys + Backstube (Daten in site.ts)
    backstubeHautnah: true, //     "Backstube hautnah: Unser Erlebnisangebot"
    galerie: true, //              Bildergalerie
    bestellkarte: true, //         "Unsere Bestellkarte" mit PDF-Download
    bastelSets: true, //           "Unsere Hexenhäuser Bastel-Sets"
    kundenstimmen: true, //        "Das sagen unsere Kunden" (Trustindex-Bewertungen)
    lebensmittelRetten: true, //   Tafel + Too Good To Go
  },
  bastelSets: {
    hero: true,
    preise: true, //               Drei Bausatz-Karten mit Preisen
    formular: true, //             Online-Vorbestellung
    galerie: true,
  },
  hexenhausBasteln: {
    hero: true,
    ankuendigung: false, //        "Hallo Kinder! November 2025 ist es wieder so weit!" (Vorankündigung)
    einladung: true, //            "Hallo Kinder! Es ist wieder so weit!"
    termine: true, //              Termin-Karten (Termine in announcements.ts)
    formular: true, //             Online-Anmeldung
    galerie: true,
    cta: true, //                  "Bastel-Sets für Zuhause"
  },
  kindergeburtstag: {
    hero: true,
    angebot: true, //              Angebot mit Preisen
    formular: true, //             Online-Anfrage
    galerie: true,
  },
} as const;
