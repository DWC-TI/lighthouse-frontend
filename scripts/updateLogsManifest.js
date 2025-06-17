// scripts/updateLogsManifest.js

const fs = require("fs");
const path = require("path");

const logsDir = path.join(__dirname, "../logs/system");
const manifestPath = path.join(__dirname, "../logs/logs_manifest.json");

// Helper: Get file's last modified date as readable string
function getReadableDate(filePath) {
  const stats = fs.statSync(filePath);
  return stats.mtime.toISOString();
}

// Read all .log files in logs/system/
const logFiles = fs
  .readdirSync(logsDir)
  .filter((file) => file.endsWith(".log"))
  .map((file) => {
    return {
      title: file.replace(".log", "").replace(/[-_]/g, " "),
      date: getReadableDate(path.join(logsDir, file)),
      path: `logs/system/${file}`
    };
  });

// Write output manifest
fs.writeFileSync(manifestPath, JSON.stringify({ logs: logFiles }, null, 2));
console.log(`✅ logs_manifest.json updated with ${logFiles.length} logs.`);
