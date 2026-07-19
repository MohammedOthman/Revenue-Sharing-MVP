import env from '../config/env.js';

// Transactional email with zero heavy dependencies:
// - RESEND_API_KEY set  -> deliver via Resend's HTTP API
// - not configured      -> log the message server-side and report
//   delivered:false so callers can fall back (e.g. hand the admin a link).
export const isEmailConfigured = () => Boolean(env.resendApiKey);

export const sendEmail = async ({ to, subject, text, html }) => {
  if (!isEmailConfigured()) {
    console.log(`[mailer] Email not configured. Would send to ${to}: ${subject}\n${text}`);
    return { delivered: false };
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: env.emailFrom,
      to: [to],
      subject,
      text,
      ...(html ? { html } : {}),
    }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => '');
    throw new Error(`Email send failed (${response.status}): ${body.slice(0, 300)}`);
  }
  return { delivered: true };
};
