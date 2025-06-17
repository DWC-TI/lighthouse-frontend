// scripts/generate-logs-manifest.js

const fs = require("fs");
const path = require("path");

const baseDir = path.join(__dirname, "..");
const logsDir = path.join(baseDir, "logs");
const docsProgressDir = path.join(baseDir, "docs", "progress");
const manifestPath = path.join(baseDir, "data", "logs-manifest.json");

const ignoreFiles = ["README.md", ".DS_Store", "index.html-changes.md"];
const output = [];

function getCreatedDate(filePath) {
  const { birthtime } = fs.statSync(filePath);
  return new Date(birthtime).toISOString();
}

function formatTitle(fileName) {
  const noExt = fileName.replace(/\.[^/.]+$/, "");
  return noExt
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

function walkDir(dir, baseUrl) {
  if (!fs.existsSync(dir)) return;

  const items = fs.readdirSync(dir);
  items.forEach((item) => {
    if (ignoreFiles.includes(item)) return;

    const filePath = path.join(dir, item);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      walkDir(filePath, path.join(baseUrl, item));
    } else {
      const relPath = path.join(baseUrl, item).replace(/\\/g, "/");
      output.push({
        title: formatTitle(item),
        path: relPath.startsWith("/") ? relPath : "/" + relPath,
        tags: [baseUrl.split("/")[1] || "log"], // Use folder name as tag
        created: getCreatedDate(filePath),
        visible: true,
      });
    }
  });
}

walkDir(logsDir, "logs");
walkDir(docsProgressDir, "docs/progress");

fs.writeFileSync(manifestPath, JSON.stringify(output, null, 2));
console.log(`✅ logs-manifest.json updated with ${output.length} entries.`);
