import nodemailer from 'nodemailer';
import fetch from 'node-fetch';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  if (name.length > 100 || email.length > 100 || message.length > 5000) {
    return res.status(400).json({ error: 'Input too long' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  // Run Telegram and Email in parallel for faster response
  const promises = [];

  // Telegram notification
  const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } = process.env;
  if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
    promises.push(
      fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: `🔔 New Contact\n\n👤 ${name}\n📧 ${email}\n\n💬 ${message}`,
        }),
      })
        .then(r => r.json())
        .then(d => ({ type: 'telegram', success: d.ok }))
        .catch(() => ({ type: 'telegram', success: false }))
    );
  }

  // Email notification
  const { EMAIL_ADDRESS, GMAIL_PASSKEY } = process.env;
  if (EMAIL_ADDRESS && GMAIL_PASSKEY) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: EMAIL_ADDRESS, pass: GMAIL_PASSKEY },
    });

    promises.push(
      transporter.sendMail({
        from: EMAIL_ADDRESS,
        to: EMAIL_ADDRESS,
        subject: `Portfolio Contact: ${name}`,
        html: `<h2>🔔 New Contact</h2><p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p><b>Message:</b> ${message}</p>`,
        replyTo: email,
      })
        .then(() => ({ type: 'email', success: true }))
        .catch(() => ({ type: 'email', success: false }))
    );
  }

  const results = await Promise.all(promises);
  const anySuccess = results.some(r => r.success);

  if (anySuccess) {
    return res.status(200).json({ success: true, message: 'Message sent successfully' });
  }
  return res.status(500).json({ error: 'Failed to send message' });
}
