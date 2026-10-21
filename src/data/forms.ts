/**
 * Formulare: Felder, Texte und Empfänger.
 *
 * Empfänger ändern: Adresse(n) bei `to` eintragen (mehrere als Liste, z. B. ['a@x.de', 'b@x.de']).
 * Absender (`from`) muss eine in Resend verifizierte Domain sein.
 */
import { hexenhausTermine, isVisible } from './announcements';

export const mailConfig = {
  from: 'leads@reinkober-leadportal.com',
  /** Betreff ALLER Benachrichtigungen (gleich für jedes Formular) */
  subject: 'Neue Anfrage | Bäckerei Schmitz - reinkober.com',
  /** Nach erfolgreichem Absenden */
  successRedirect: '/danke',
};

export type Field =
  | { name: string; type: 'text' | 'email' | 'tel'; placeholder: string; required: boolean; icon?: 'person' | 'mail' | 'phone'; autocomplete?: string }
  | { name: string; type: 'select'; placeholder: string; required: boolean; options: string[] }
  | { name: string; type: 'textarea'; placeholder: string; required: boolean };

export type FormDef = {
  id: string;
  /** Art der Anfrage – steht in der Mail oben ("Art der Anfrage: …") */
  type: string;
  to: string[];
  submitText: string;
  submitSubtitle?: string;
  fields: Field[];
};

const baseFields: Field[] = [
  { name: 'name', type: 'text', placeholder: 'Dein Name', required: true, icon: 'person', autocomplete: 'name' },
  { name: 'email', type: 'email', placeholder: 'Deine E-Mail-Adresse', required: true, icon: 'mail', autocomplete: 'email' },
  { name: 'telefon', type: 'tel', placeholder: 'Deine Telefonnummer', required: true, icon: 'phone', autocomplete: 'tel' },
];

const details: Field = {
  name: 'bemerkungen',
  type: 'textarea',
  placeholder: 'Weitere Details oder Bemerkungen zur Anfrage (optional)',
  required: false,
};

export const forms: Record<string, FormDef> = {
  'bastel-sets': {
    id: 'bastel-sets',
    type: 'Hexenhäuser Bastel-Sets (Vorbestellung)',
    to: ['info@baguetterie-schmitz.de', 'leads@reinkober.agency'],
    submitText: 'Jetzt unverbindlich vorbestellen',
    fields: [
      ...baseFields,
      {
        name: 'bastelset',
        type: 'select',
        placeholder: 'Welches Bastel-Set möchtest du vorbestellen?',
        required: true,
        options: ['Kleiner Bausatz', 'Großer Bausatz', 'XXL Bausatz', 'Ich weiß noch nicht'],
      },
      { name: 'anzahl', type: 'text', placeholder: 'Wie viele Bastel-Sets benötigst du etwa?', required: true },
      details,
    ],
  },
  'hexenhaus-basteln': {
    id: 'hexenhaus-basteln',
    type: 'Hexenhaus basteln in der Backstube (Anmeldung)',
    to: ['info@baguetterie-schmitz.de', 'leads@reinkober.agency'],
    submitText: 'Jetzt Platz anfragen',
    submitSubtitle: 'Keine verbindliche Buchung - bitte auf unsere Rückmeldung warten',
    fields: [
      ...baseFields,
      {
        name: 'termin',
        type: 'select',
        placeholder: 'Datum auswählen',
        required: false,
        // Wird automatisch aus den Terminen in announcements.ts erzeugt
        options: hexenhausTermine.filter((t) => isVisible(t)).flatMap((t) => t.slots.map((s) => `${t.date} um ${s}`)),
      },
      {
        name: 'kinder',
        type: 'select',
        placeholder: 'Wie viele Kinder machen mit (z.B. 2)',
        required: false,
        options: ['1 Kind', '2 Kinder', '3 Kinder', '4 Kinder', '5 Kinder', '6 Kinder', 'Mehr als 6 Kinder'],
      },
      details,
    ],
  },
  kindergeburtstag: {
    id: 'kindergeburtstag',
    type: 'Kindergeburtstag in der Backstube',
    to: ['info@baguetterie-schmitz.de', 'leads@reinkober.agency'],
    submitText: 'Jetzt abschicken',
    submitSubtitle: 'Keine verbindliche Buchung - bitte auf unsere Rückmeldung warten',
    fields: [
      ...baseFields,
      {
        name: 'kinder',
        type: 'select',
        placeholder: 'Wie viele Kinder machen mit?',
        required: false,
        options: ['8 Kinder', '9 Kinder', '10 Kinder', '11 Kinder', '12 Kinder', 'Ich weiß es noch nicht'],
      },
      { name: 'wunschdatum', type: 'text', placeholder: 'Wunschdatum (z.B. 10.05.2026) (optional)', required: false },
      details,
    ],
  },
};

/** Lesbare Feldnamen für die Benachrichtigungs-Mail */
export const fieldLabels: Record<string, string> = {
  name: 'Name',
  email: 'E-Mail',
  telefon: 'Telefon',
  bastelset: 'Bastel-Set',
  anzahl: 'Anzahl Bastel-Sets',
  termin: 'Termin',
  kinder: 'Anzahl Kinder',
  wunschdatum: 'Wunschdatum',
  bemerkungen: 'Bemerkungen',
};
