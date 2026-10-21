/**
 * Termine und zeitlich begrenzte Hinweise.
 *
 * visible      – Hauptschalter (true/false)
 * visibleFrom  – optional, ab diesem Datum sichtbar (Format 'JJJJ-MM-TT')
 * visibleUntil – optional, bis einschließlich diesem Datum sichtbar
 *
 * Achtung: Die Seite wird beim Veröffentlichen (Build) erzeugt. Datumsgrenzen greifen
 * also beim nächsten Build – z. B. nach dem nächsten Push oder einem manuellen
 * "Redeploy" in Vercel.
 */

export type Announcement = {
  visible: boolean;
  visibleFrom?: string;
  visibleUntil?: string;
};

export function isVisible(a: Announcement, today = new Date()): boolean {
  if (!a.visible) return false;
  const day = today.toISOString().slice(0, 10);
  if (a.visibleFrom && day < a.visibleFrom) return false;
  if (a.visibleUntil && day > a.visibleUntil) return false;
  return true;
}

/** Hexenhaus basteln in der Backstube – Termin-Karten und Auswahl im Anmeldeformular */
export const hexenhausTermine: (Announcement & {
  title: string;
  date: string;
  text: string;
  /** Uhrzeiten, die im Formular zur Auswahl stehen */
  slots: string[];
})[] = [
  {
    visible: true,
    title: 'Termin 1',
    date: 'Dienstag, 17.11.26',
    text: 'Ein Termin um 15.30 Uhr & einer um 17:00 Uhr. Pro Haus 23 Euro inklusive Süßigkeiten.',
    slots: ['15:30 Uhr', '17:00 Uhr'],
  },
  {
    visible: true,
    title: 'Termin 2',
    date: 'Mittwoch, 18.11.26',
    text: 'Ein Termin um 15.30 Uhr und einer um 17:00 Uhr. Pro Haus 23 Euro inklusive Süßigkeiten.',
    slots: ['15:30 Uhr', '17:00 Uhr'],
  },
  {
    visible: true,
    title: 'Termin 3',
    date: 'Donnerstag, 19.11.26',
    text: 'Ein Termin um 15.30 Uhr und einer um 17:00 Uhr. Pro Haus 23 Euro inklusive Süßigkeiten.',
    slots: ['15:30 Uhr', '17:00 Uhr'],
  },
];

/** Vorankündigung Hexenhaus basteln (Seite /hexenhaus-basteln, zusätzlich Schalter in sections.ts) */
export const hexenhausVorankuendigung: Announcement & { title: string; text: string } = {
  visible: true,
  title: 'Hallo Kinder! November 2025 ist es wieder so weit!',
  text: 'In der Winterzeit, meist Mitte November, bauen wir wieder mit euch gemeinsam Hexenhäuschen bei uns in der Backstube. Alle Termine und Informationen findet ihr Oktober 2025 hier.',
};

/** Aktion "SIM-JÜ Dienstag" (Startseite, zusätzlich Schalter in sections.ts) */
export const simjueDienstag: Announcement & {
  title: string;
  text: string;
  buttonText: string;
  buttonHref: string;
} = {
  visible: true,
  title: 'SIM-JÜ Dienstag in der Backstube!',
  text: 'Traditionsgemäß findet am Sim-Jü-Dienstag das Frühschoppen bei uns an der Backstube statt. Heiße Wurstbrötchen und kühle Pilse (und weitere Getränke) warten auf euch – und natürlich gibt’s auch wieder leckere Salzkuchen mit Mett oder Käse.',
  buttonText: 'Hier alle Informationen',
  buttonHref: 'https://fb.me/e/5bsBg1w0I',
};

/** Öffnungszeiten an den Feiertagen (Startseite, zusätzlich Schalter in sections.ts) */
export const feiertage: Announcement & { title: string; lines: string[][] } = {
  visible: true,
  title: 'Öffnungszeiten an den Feiertagen.',
  lines: [
    ['📅 24.12.2025', '⏰ 06:00 - 12:00 Uhr in der Backstube'],
    ['📅 25.12.2025 bis einschließlich 04.01.2026', '🚫 Geschlossen'],
    ['📅 Ab 05.01.2026', '⏰ Regulär geöffnet'],
  ],
};
