/**
 * Alle Bilder der Website mit Alt-Text.
 * Neues Bild: Datei nach src/assets/images/ legen, hier importieren und eintragen.
 * Der Alt-Text beschreibt, was auf dem Bild zu sehen ist (für Screenreader und Google).
 */
import heroBroetchenRegal from '../assets/images/hero-broetchen-regal.jpg';
import heroHexenhaus from '../assets/images/hero-hexenhaus.jpg';
import backstubeKinderBacken from '../assets/images/backstube-kinder-backen.jpg';
import standortBakerBoys from '../assets/images/standort-baker-boys.jpg';
import standortBackstubeLive from '../assets/images/standort-backstube-live.jpg';
import verkaufswagen from '../assets/images/verkaufswagen.jpg';
import lebkuchenhaus from '../assets/images/lebkuchenhaus.jpg';
import bakerBoysSchaufenster from '../assets/images/baker-boys-schaufenster.jpg';
import bestellkarte from '../assets/images/bestellkarte.jpg';
import logoTafel from '../assets/images/logo-tafel.png';
import logoTooGoodToGo from '../assets/images/logo-too-good-to-go.png';
import bausatzKlein from '../assets/images/bausatz-klein.jpg';
import bausatzGross from '../assets/images/bausatz-gross.jpg';
import bausatzXxl from '../assets/images/bausatz-xxl.jpg';
import logoSchmitz from '../assets/images/logo-schmitz.jpg';
import aktionSimjueDienstag from '../assets/images/aktion-simjue-dienstag.jpg';
import feiertageOeffnungszeiten from '../assets/images/feiertage-oeffnungszeiten.jpg';

export const images = {
  heroBroetchenRegal: {
    src: heroBroetchenRegal,
    alt: 'Eine große Auswahl an frischen Brötchen und Broten auf einem Verkaufsregal.',
  },
  heroHexenhaus: {
    src: heroHexenhaus,
    alt: 'Verziertes Lebkuchen-Hexenhaus mit weißem Zuckerguss, Süßigkeiten und kleinen Figuren.',
  },
  backstubeKinderBacken: {
    src: backstubeKinderBacken,
    alt: 'Bäcker in Schürze zeigt Kindern in einer Backstube das Backen, Kinder sitzen an Holztischen.',
  },
  standortBakerBoys: {
    src: standortBakerBoys,
    alt: 'Bäckerei "Baker Boys" mit der Aufschrift "Frischeshop & Stehcafé", zwei roten Schirmen und Holzbänken.',
  },
  standortBackstubeLive: {
    src: standortBackstubeLive,
    alt: 'Bäckerei "Backstube - Live" mit Tischen und Stühlen davor; links ein weißes Lieferfahrzeug.',
  },
  verkaufswagen: {
    src: verkaufswagen,
    alt: 'Weißer Verkaufswagen mit geöffneter Seitenklappe, ein Mann mit Maske steht dahinter, Gebäck liegt in der Auslage.',
  },
  lebkuchenhaus: {
    src: lebkuchenhaus,
    alt: 'Ein großes Lebkuchenhaus, reich verziert mit weißem Zuckerguss und bunten Süßigkeiten, steht auf einem Backblech.',
  },
  bakerBoysSchaufenster: {
    src: bakerBoysSchaufenster,
    alt: 'Filiale "Baguetterie Bäckerei" mit blau-weißen Markisen, Auslage und Außentischen in der Fußgängerzone.',
  },
  bestellkarte: {
    src: bestellkarte,
    alt: 'Bestellkarten von Schmitz, Bäcker Boys, mit zwei Männern in Kochkleidung, die Backwaren halten.',
  },
  logoTafel: {
    src: logoTafel,
    alt: 'Logo von Die Tafeln mit Bestecksymbol und Slogan "Essen, wo es hingehört".',
  },
  logoTooGoodToGo: {
    src: logoTooGoodToGo,
    alt: 'Logo von Too Good To Go mit drei grün-blauen Blättern, die ein Herz bilden.',
  },
  bausatzKlein: {
    src: bausatzKlein,
    alt: 'Kleiner Hexenhaus-Bausatz: Lebkuchenteile, Süßigkeiten, Zuckerschnee und Hexenfiguren, daneben ein fertig dekoriertes kleines Hexenhaus.',
  },
  bausatzGross: {
    src: bausatzGross,
    alt: 'Großer Hexenhaus-Bausatz: Lebkuchenplatten, Süßigkeiten, Zuckerschnee und Hexenfiguren, daneben ein fertig dekoriertes Hexenhaus.',
  },
  bausatzXxl: {
    src: bausatzXxl,
    alt: 'XXL-Lebkuchenhaus, über und über mit Zuckerguss und bunten Süßigkeiten verziert.',
  },
  logoSchmitz: {
    src: logoSchmitz,
    alt: 'Logo: Stadtbäckerei Café Schmitz – Eure Baker Boys',
  },
  aktionSimjueDienstag: {
    src: aktionSimjueDienstag,
    alt: 'Grafik "SIM-JÜ Dienstag – Backstube Schmitz" vor einem Riesenrad.',
  },
  feiertageOeffnungszeiten: {
    src: feiertageOeffnungszeiten,
    alt: 'Beige Weihnachtskugel mit Text "Öffnungszeiten an den Feiertagen" und Auflistung der Öffnungszeiten vor Tannenbaumhintergrund.',
  },
} as const;

export type ImageKey = keyof typeof images;

/** Galerie auf Start-, Bastel-Sets-, Hexenhaus- und Kindergeburtstag-Seite (Reihenfolge = Anzeige) */
export const galleryHome: ImageKey[] = [
  'backstubeKinderBacken',
  'standortBakerBoys',
  'heroBroetchenRegal',
  'verkaufswagen',
  'standortBackstubeLive',
  'lebkuchenhaus',
];

export const gallerySub: ImageKey[] = [
  'backstubeKinderBacken',
  'standortBakerBoys',
  'bakerBoysSchaufenster',
  'heroBroetchenRegal',
  'verkaufswagen',
  'standortBackstubeLive',
  'lebkuchenhaus',
];
