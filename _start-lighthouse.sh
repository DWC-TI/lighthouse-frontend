#!/bin/bash

# Kill previous servers
lsof -ti tcp:8080 | xargs kill -9 2>/dev/null
lsof -ti tcp:3001 | xargs kill -9 2>/dev/null

# Start Node.js API server on port 3001
cd /Users/stevedeweerdt/lighthouse-project/lighthouse-frontend/lighthouse-server
echo "🌐 Current dir: $(pwd)"
echo "🚀 Starting Node.js server on port 3001..."
/usr/local/bin/node server.js &
echo "✅ Node server started."

sleep 1

# Start frontend HTTP server on port 8080
cd /Users/stevedeweerdt/lighthouse-project/lighthouse-frontend
echo "📂 Switching to frontend dir: $(pwd)"
echo "🌍 Starting Python HTTP server on port 8080..."
python3 -m http.server 8080 &

sleep 2

# Open frontend pages in Chrome
echo "🧭 Opening Chrome tabs..."
/usr/bin/osascript <<EOF
tell application "Google Chrome"
    activate
    set myWin to make new window
    tell myWin
        set URL of active tab to "http://localhost:8080/index.html"
        make new tab with properties {URL:"http://localhost:8080/projects.html"}
        make new tab with properties {URL:"http://localhost:8080/manual.html"}
        make new tab with properties {URL:"http://localhost:8080/server-test.html"}
    end tell
end tell
EOF
