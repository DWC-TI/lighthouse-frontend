#!/bin/bash

# 🔪 Kill any previous servers on 8080 or 3001
lsof -ti tcp:8080 | xargs kill -9 2>/dev/null
lsof -ti tcp:3001 | xargs kill -9 2>/dev/null

# 🚀 Start Node.js backend server on port 3001
cd /Users/stevedeweerdt/lighthouse-project/lighthouse-frontend/lighthouse-server
echo "🌐 Current dir: $(pwd)"
echo "🚀 Starting Node.js server on port 3001..."
/usr/local/bin/node server.js &
echo "✅ Node server started."

sleep 1

# 🛠️ Update logs manifest
cd /Users/stevedeweerdt/lighthouse-project/lighthouse-frontend
echo "🧾 Updating logs manifest..."
/usr/local/bin/node scripts/updateLogsManifest.js
echo "✅ logs_manifest.json updated."

# 🌍 Start Python HTTP frontend server on port 8080
echo "📂 Switching to frontend dir: $(pwd)"
echo "🌍 Starting Python HTTP server on port 8080..."
python3 -m http.server 8080 &

sleep 2

# 🧭 Open all key frontend pages in Google Chrome
echo "🧭 Opening Chrome tabs..."
/usr/bin/osascript <<EOF
tell application "Google Chrome"
    activate
    set myWin to make new window
    tell myWin
        set URL of active tab to "http://localhost:8080/index.html"
        make new tab with properties {URL:"http://localhost:8080/manual.html"}
        make new tab with properties {URL:"http://localhost:8080/server-test.html"}
        make new tab with properties {URL:"http://localhost:8080/logs-manifest.html"}
        make new tab with properties {URL:"https://chatgpt.com/g/g-p-684eb94e1a908191819270e2ad36f8bd-app-development/project"}
    end tell
end tell
EOF
