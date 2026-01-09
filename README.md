# Hemanshu Mahajan - Portfolio

A modern, responsive portfolio website showcasing DevOps & Cloud engineering skills, projects, and certifications.

🔗 **Live Demo:** [View Portfolio](https://hemanshu.dev)

## Tech Stack

**Frontend:**
- React 18 + TypeScript
- Vite 7 (build tool)
- Tailwind CSS + shadcn/ui
- Framer Motion (animations)
- Three.js + React Three Fiber (3D graphics)
- React Router DOM

**Backend:**
- Node.js + Express
- Nodemailer (contact form emails)

## Features

- 🎨 Modern dark theme with animated 3D cloud scene
- 📱 Fully responsive design
- ⚡ Optimized performance with code splitting
- 📧 Contact form with email integration
- 🎯 Smooth scroll animations
- 📄 Downloadable resume

## Getting Started

### Prerequisites

- Node.js 24.x
- npm or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Hemanshubt/portfolio.git
cd portfolio
```

2. Install frontend dependencies:
```bash
npm install
```

3. Install server dependencies:
```bash
cd server
npm install
cd ..
```

4. Set up environment variables:

Create `.env` in the root directory:
```env
VITE_API_URL=http://localhost:3001
```

Create `server/.env`:
```env
EMAIL_ADDRESS=your-email@gmail.com
GMAIL_PASSKEY=your-app-password
```

### Development

Run the frontend:
```bash
npm run dev
```

Run the backend (in a separate terminal):
```bash
cd server
npm run dev
```

The app will be available at `http://localhost:8080`

### Build

```bash
npm run build
```

## Project Structure

```
├── src/
│   ├── components/     # React components
│   ├── data/           # Static data (projects, skills)
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions
│   └── pages/          # Page components
├── server/             # Express backend for contact form
├── public/             # Static assets
└── api/                # Vercel serverless functions
```

## Deployment

The project is configured for Vercel deployment with `vercel.json`.

## License

MIT

## Contact

- GitHub: [@Hemanshubt](https://github.com/Hemanshubt)
- LinkedIn: [Hemanshu Mahajan](https://www.linkedin.com/in/hemanshu-mahajan/)
- Twitter: [@Hemanshubtc](https://x.com/Hemanshubtc)
