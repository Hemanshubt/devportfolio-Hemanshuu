import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import handler from './contact.js';

// Load .env from root directory
const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, '..', '.env') });

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Wrap the Vercel handler for Express
app.all('/api/contact', async (req, res) => {
  console.log('Received request:', req.method, req.body);
  console.log('Env vars loaded:', {
    telegram: !!process.env.TELEGRAM_BOT_TOKEN,
    email: !!process.env.EMAIL_ADDRESS
  });
  try {
    await handler(req, res);
  } catch (error) {
    console.error('Handler error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
