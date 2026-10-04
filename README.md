# Cpazen — AI-Powered CPA Offer Tracker

[![Deploy Status](https://img.shields.io/badge/deploy-cloudflare-blue)](https://cpazen.com)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

> Track every click, conversion and payout in real time. Set up in 60s. Free 50k events/mo.

## 🚀 Quick Start

```bash
# 1. Clone
git clone https://github.com/jshkbt-create/cpazen-app.git
cd cpazen-app

# 2. Install
npm install

# 3. Environment
cp .env.local.example .env.local
# Edit .env.local with your secrets

# 4. Database
npx prisma generate
npx prisma migrate dev

# 5. Run
npm run dev
# Open http://localhost:3000
```

## 📁 Project Structure

```
cpazen-app/
├── apps/
│   └── web/              # Next.js 14 frontend + API routes
├── packages/
│   └── shared/           # Shared types & utilities
├── supabase/
│   ├── functions/        # Edge Functions (postback, AI, bot-detect)
│   └── migrations/       # Database migrations
├── prisma/
│   └── schema.prisma     # Complete database schema
└── scripts/
    ├── setup.sh          # One-command local setup
    └── deploy-edge-functions.sh     # Production deployment
```

## 🏗️ Architecture

- **Frontend**: Next.js 14 (App Router), React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes + Supabase Edge Functions
- **Database**: PostgreSQL (Supabase) with Prisma ORM
- **Cache**: Redis (Upstash) for real-time counters
- **Real-time**: Supabase Realtime (WebSocket)
- **AI**: OpenAI GPT-4o + Google Gemini Flash
- **Auth**: Supabase Auth (JWT, magic link, OAuth)
- **Payments**: Stripe (subscription billing)
- **Deploy**: Cloudflare Pages

## 🔧 Configuration

### Required Services

| Service | Purpose | Free Tier |
|---------|---------|----------|
| [Supabase](https://supabase.com) | Database, Auth, Edge Functions | 500MB, 2M requests |
| [Upstash Redis](https://upstash.com) | Real-time cache, counters | 10k req/day |
| [Cloudflare](https://cloudflare.com) | CDN, SSL, DDoS protection | Unlimited |
| [Stripe](https://stripe.com) | Payments, subscriptions | Pay per transaction |

### Environment Variables

See `.env.local.example` for complete list.

## 🚢 Deployment

### Automated (GitHub Actions)

Push to `main` branch triggers:
1. Run tests
2. Deploy Edge Functions to Supabase
3. Build & deploy to Cloudflare Pages

### Manual

```bash
# Deploy everything
cd cpazen-app
npm run deploy:all
```

## 📊 Features

### MVP (Shipped)
- [x] User authentication (email, magic link, OAuth)
- [x] Offer management (CRUD)
- [x] Campaign builder with tracking links
- [x] Real-time click tracking & postback handling
- [x] Dashboard with KPI cards, charts, tables
- [x] AI bot detection (Gemini Flash)
- [x] AI optimization insights (GPT-4o)
- [x] Stripe subscription billing

### Advanced (Post-MVP)
- [ ] Multi-touch attribution models
- [ ] Landing page builder with A/B testing
- [ ] Advanced fraud detection (fingerprinting)
- [ ] White-label & reseller program

## 🔒 Security

- All secrets server-side only (never exposed to client)
- HMAC-signed postback URLs
- Rate limiting (100 req/min per IP)
- Row-level security (RLS) on all tables
- AES-256 encryption at rest
- TLS 1.3 everywhere

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing`
5. Open Pull Request

## 📄 License

MIT © [Cpazen](https://cpazen.com)

---

**Questions?** Open an issue or email support@cpazen.com
