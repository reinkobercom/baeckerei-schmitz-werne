/**
 * Formular-Endpoint für alle Anfrageformulare.
 * Läuft als Serverless-Funktion auf Vercel (alle anderen Seiten sind statisch).
 *
 * Benötigt die Umgebungsvariable RESEND_API_KEY (in Vercel unter
 * Project → Settings → Environment Variables). Der Key gehört NIEMALS ins Repository.
 */
import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { fieldLabels, forms, mailConfig } from '../../data/forms';
import { site } from '../../data/site';

export const prerender = false;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_LEN = 5000;

// Einfaches Rate-Limit je IP (pro Serverless-Instanz): max. 5 Anfragen in 10 Minuten
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQ = 5;
const hits = new Map<string, number[]>();
function limited(ip: string): boolean {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 5000) hits.clear();
  return list.length > MAX_REQ;
}

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

export const POST: APIRoute = async ({ request, clientAddress, redirect }) => {
  const wantsJson = (request.headers.get('accept') || '').includes('application/json');
  const referer = request.headers.get('referer') || '/';
  const phoneHtml = `<a href="tel:${site.emergencyPhone.tel}">${site.emergencyPhone.label}</a>`;

  const reply = (status: number, body: Record<string, unknown>, fallback: string) =>
    wantsJson
      ? new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json; charset=utf-8' } })
      : redirect(fallback, 303);

  let data: FormData;
  try {
    data = await request.formData();
  } catch {
    return reply(400, { ok: false, message: 'Ungültige Anfrage.' }, referer);
  }

  const formId = String(data.get('form') || '');
  const def = forms[formId];
  if (!def) return reply(400, { ok: false, message: 'Unbekanntes Formular.' }, referer);

  const back = (() => {
    try { const u = new URL(referer); u.searchParams.set('fehler', formId); u.hash = ''; return u.pathname + u.search; } catch { return '/'; }
  })();

  // Honeypot: Bots füllen das unsichtbare Feld aus → so tun, als hätte es geklappt
  if (String(data.get('website') || '').trim() !== '') {
    console.warn(`[anfrage] Honeypot ausgelöst (${formId})`);
    return reply(200, { ok: true, redirect: mailConfig.successRedirect }, mailConfig.successRedirect);
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || clientAddress || 'unbekannt';
  if (limited(ip)) {
    console.warn(`[anfrage] Rate-Limit für ${ip} (${formId})`);
    return reply(429, { ok: false, message: `Zu viele Anfragen in kurzer Zeit. Bitte versuche es in ein paar Minuten noch einmal oder ruf uns an: ${phoneHtml}.` }, back);
  }

  // Serverseitige Prüfung
  const errors: Record<string, string> = {};
  const values: Record<string, string> = {};
  for (const f of def.fields) {
    const v = String(data.get(f.name) ?? '').trim().slice(0, MAX_LEN);
    values[f.name] = v;
    if (f.required && !v) errors[f.name] = 'Bitte fülle dieses Feld aus.';
    else if (f.type === 'email' && v && !EMAIL.test(v)) errors[f.name] = 'Bitte gib eine gültige E-Mail-Adresse an.';
    else if (f.type === 'select' && v && !f.options.includes(v)) errors[f.name] = 'Bitte wähle eine Option aus der Liste.';
  }
  if (data.get('datenschutz') !== 'ja') errors.datenschutz = 'Bitte stimme der Datenschutzerklärung zu.';

  if (Object.keys(errors).length) {
    return reply(422, { ok: false, errors }, back);
  }

  const apiKey = process.env.RESEND_API_KEY || import.meta.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('[anfrage] RESEND_API_KEY fehlt – Anfrage konnte nicht versendet werden', { formId, values });
    return reply(500, { ok: false }, back);
  }

  const rows = [
    ['Art der Anfrage', def.type] as const,
    ...def.fields.map((f) => [fieldLabels[f.name] || f.name, values[f.name] || '–'] as const),
  ];
  const text =
    `${mailConfig.subject}\n\n` +
    rows.map(([k, v]) => `${k}: ${v}`).join('\n') +
    `\n\nDatenschutz zugestimmt: ja\nGesendet über ${site.url} (${new Date().toLocaleString('de-DE', { timeZone: 'Europe/Berlin' })})`;
  const html = `<!doctype html><html><body style="font-family:Arial,sans-serif;color:#343434;font-size:15px;line-height:1.5">
<h2 style="color:#325382;margin:0 0 4px">Neue Anfrage über die Website</h2>
<p style="margin:0 0 16px;font-size:17px"><b>Art der Anfrage:</b> ${esc(def.type)}</p>
<table cellpadding="8" cellspacing="0" style="border-collapse:collapse;max-width:640px;width:100%">
${rows.map(([k, v]) => `<tr><td style="border-bottom:1px solid #eee;font-weight:bold;vertical-align:top;width:180px">${esc(k)}</td><td style="border-bottom:1px solid #eee;white-space:pre-wrap">${esc(v)}</td></tr>`).join('\n')}
<tr><td style="font-weight:bold">Datenschutz</td><td>zugestimmt</td></tr>
</table>
<p style="color:#888;font-size:12px;margin-top:24px">Gesendet über das Formular auf ${esc(site.url)} · Auf diese E-Mail antworten = Antwort an ${esc(values.email || '')}</p>
</body></html>`;

  try {
    const resend = new Resend(apiKey);
    const { data: sent, error } = await resend.emails.send({
      from: mailConfig.from,
      to: def.to,
      replyTo: values.email,
      subject: mailConfig.subject,
      text,
      html,
    });
    if (error || !sent?.id) {
      console.error('[anfrage] Resend-Fehler', JSON.stringify(error), { formId, values });
      return reply(502, { ok: false }, back);
    }
    console.log(`[anfrage] gesendet ${formId} id=${sent.id}`);
    return reply(200, { ok: true, id: sent.id, redirect: mailConfig.successRedirect }, mailConfig.successRedirect);
  } catch (e) {
    console.error('[anfrage] Versand fehlgeschlagen', e, { formId, values });
    return reply(502, { ok: false }, back);
  }
};

export const GET: APIRoute = ({ redirect }) => redirect('/', 302);
