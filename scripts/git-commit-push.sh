#!/bin/bash

# Step 1: Status
echo "🔍 Checking status..."
git status

# Step 2: Stage all changes
echo ""
echo "📦 Staging all changes..."
git add .

# Step 3: Ask for commit message
echo ""
read -p "💬 Commit message: " message

if [ -z "$message" ]; then
  echo "❌ Commit message is required. Aborting."
  exit 1
fi

# Step 4: Commit
echo ""
echo "📥 Committing..."
git commit -m "$message"

# Step 5: Pull with rebase (optional but safe)
echo ""
echo "🔄 Pulling from origin with rebase..."
git pull --rebase origin main

# Step 6: Push
echo ""
echo "⬆️ Pushing to GitHub..."
git push origin main

echo ""
echo "✅ Done! Everything is committed and pushed."
