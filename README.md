# Bäckerei Schmitz Werne – Website

Neuaufbau von www.schmitz-werne.de mit [Astro](https://astro.build), gehostet auf Vercel.
Alle Seiten sind statisch (schnell, sicher); nur der Formularversand (`/api/anfrage`) läuft als Serverless-Funktion.

## Inhalte pflegen (ohne Programmierkenntnisse)

Alle Inhalte, die sich öfter ändern, stehen in `src/data/`. Datei auf GitHub öffnen → Stift-Symbol → ändern → „Commit changes“. Vercel baut die Seite danach automatisch neu (ca. 1 Minute).

| Was | Datei |
|---|---|
| Kontakt, Social-Media-Links, Standorte, **Öffnungszeiten**, Menü (das Copyright-Jahr im Footer aktualisiert sich automatisch) | `src/data/site.ts` |
| Sektionen **ein-/ausschalten** (`true` / `false`) | `src/data/sections.ts` |
| **Termine** Hexenhaus basteln, Aktionen (SIM-JÜ), Feiertags-Öffnungszeiten | `src/data/announcements.ts` |
| Bilder und **Alt-Texte** | `src/data/images.ts` (Bilddateien in `src/assets/images/`) |
| **Formulare**: Felder, Texte, Empfänger | `src/data/forms.ts` |
| Datenschutzerklärung | `src/data/datenschutz.ts` |
| Texte einzelner Seiten | `src/pages/*.astro` |
| Bestellkarte (PDF) | `public/files/backerei-schmitz-bestellkarte.pdf` (gleicher Dateiname = Link bleibt gültig) |

### Sektion ein- oder ausschalten
In `src/data/sections.ts` den Wert hinter der Sektion auf `true` (sichtbar) oder `false` (ausgeblendet) setzen. Ausgeblendete Inhalte bleiben erhalten.

### Termine Hexenhaus basteln
In `src/data/announcements.ts` unter `hexenhausTermine` Datum, Text und Uhrzeiten (`slots`) ändern. Die Auswahl im Anmeldeformular wird daraus automatisch erzeugt.
Optional: `visibleFrom` / `visibleUntil` (Format `'2026-11-19'`). Achtung: Datumsgrenzen greifen beim nächsten Build (nächster Commit oder „Redeploy“ in Vercel).

### Formular-Empfänger ändern
In `src/data/forms.ts` beim jeweiligen Formular `to: ['info@baguetterie-schmitz.de', 'leads@reinkober.agency']` anpassen (mehrere Adressen: `['a@x.de', 'b@x.de']`).
Absender ist `leads@reinkober-leadportal.com` (`mailConfig.from`) – die Domain muss in Resend verifiziert sein.
„Antworten“ in der Benachrichtigung geht direkt an die Person, die das Formular ausgefüllt hat.

## Formulare – Technik
- Versand über [Resend](https://resend.com), Endpoint `src/pages/api/anfrage.ts`
- Serverseitige Prüfung aller Pflichtfelder und der E-Mail-Adresse, verständliche Fehlermeldungen im Formular
- Spamschutz: unsichtbares Honeypot-Feld + Rate-Limit (5 Anfragen / 10 Min. je IP)
- Schlägt der Versand fehl, sieht der Besucher eine Meldung mit Telefonnummer, und die komplette Anfrage steht im Vercel-Log (Project → Logs, Suchbegriff `[anfrage]`) – es geht nichts still verloren
- Nach Erfolg: Weiterleitung auf `/danke`

## Umgebungsvariablen (Vercel → Project → Settings → Environment Variables)

| Name | Wert | Umgebungen |
|---|---|---|
| `RESEND_API_KEY` | API-Key aus Resend (nie ins Repository!) | Production, Preview |

Lokal: `.env.example` nach `.env` kopieren und den Key eintragen (`.env` ist in `.gitignore`).

## Lokal entwickeln
```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # Produktions-Build prüfen
```

## Externe Dienste
- **Vercel Web Analytics** (cookielos) – im Vercel-Projekt unter „Analytics“ aktivieren
- **Trustindex** (Google-Bewertungen auf der Startseite) – lädt erst nach Einwilligung im kleinen Banner
- Schriften (League Spartan) liegen lokal in `public/fonts/` – keine Verbindung zu Google Fonts

## DNS-Umstellung (Domain www.schmitz-werne.de)

1. In Vercel: Project → Settings → Domains → `www.schmitz-werne.de` und `schmitz-werne.de` hinzufügen (`schmitz-werne.de` leitet auf `www` weiter).
2. Beim Domain-Anbieter **nur** diese Einträge ändern – vorher die alten A-/CNAME-Einträge für `@` und `www` entfernen:
   - `A` für `@` → die von Vercel angezeigte IP
   - `CNAME` für `www` → der von Vercel angezeigte Wert
3. **MX- und TXT-Einträge der Haupt-Domain unverändert lassen**, sonst kommen keine E-Mails mehr an.
4. Der Formularversand läuft über `reinkober-leadportal.com` – für schmitz-werne.de sind dafür keine DNS-Einträge nötig.
5. Erst wenn die neue Seite unter der Domain erreichbar ist, den alten Anbieter (Onepage) kündigen.
