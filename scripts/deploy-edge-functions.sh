#!/bin/bash
set -e

echo "Deploying Edge Functions..."
supabase functions deploy postback
supabase functions deploy ai-analyze
supabase functions deploy bot-detect
supabase functions deploy generate-report

echo "✅ Edge Functions deployed"
