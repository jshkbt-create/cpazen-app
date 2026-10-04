#!/bin/bash
set -e

echo "🚀 Cpazen Setup"
command -v node >/dev/null 2>&1 || { echo "❌ Node.js required"; exit 1; }
command -v git >/dev/null 2>&1 || { echo "❌ Git required"; exit 1; }

if [ ! -d ".git" ]; then
  echo "📥 Initializing git..."
  git init
fi

echo "📦 Installing dependencies..."
npm install

if [ ! -f ".env.local" ]; then
  cp .env.local.example .env.local
  echo "✅ Created .env.local - fill in your secrets"
fi

echo "🗄️ Generating Prisma client..."
npx prisma generate

echo "✅ Setup complete!"
