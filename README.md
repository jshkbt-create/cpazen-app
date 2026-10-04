# Cpazen — AI-Powered CPA Offer Tracker

[![Deploy Status](https://img.shields.io/badge/deploy-cloudflare-blue)](https://cpazen.com)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

> Track every click, conversion and payout in real time. Set up in 60s.

## Quick Start

```bash
git clone https://github.com/jshkbt-create/cpazen-app.git
cd cpazen-app
npm install
cp .env.local.example .env.local
npx prisma generate
npm run dev
```

## Project Structure

```text
cpazen-app/
├── apps/web/
├── packages/shared/
├── prisma/
├── scripts/
├── supabase/
├── .env.local.example
├── .gitignore
├── package.json
├── turbo.json
└── README.md
```

## Deployment

- GitHub Actions deploys the app on `main`
- Supabase Edge functions are deployed from CI
- Cloudflare Pages is used for the web app

## License

MIT
