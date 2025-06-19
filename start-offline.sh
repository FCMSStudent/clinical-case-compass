#!/bin/bash

# Start the Clinical Case Compass app in offline mode
# This sets placeholder Supabase credentials for development/demo purposes

echo "🚀 Starting Clinical Case Compass in offline mode..."
echo "📝 Setting placeholder Supabase credentials..."

export VITE_SUPABASE_URL="https://placeholder.supabase.co"
export VITE_SUPABASE_ANON_KEY="placeholder-anon-key"
export VITE_APP_NAME="Clinical Case Compass"
export VITE_APP_VERSION="1.0.0"

echo "✅ Environment variables set"
echo "🌐 Starting development server..."

npm run dev 