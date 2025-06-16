const fs = require('fs');
const path = require('path');

const LOGS_DIR = path.join(__dirname, '../logs');
const MANIFEST_PATH = path.join(LOGS_DIR, 'logs_manifest.json');

// Folder → Type Map
const typeMap = {
  sprints: 'sprint',
  decisions: 'decision',
  insights: 'insight',
  changelog: 'changelog',
  beams: 'app-log',
};

function generateTitle(fileName) {
  const name = fileName.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function scanLogs() {
  const logEntries = [];

  for (const [folder, type] of Object.entries(typeMap)) {
    const folderPath = path.join(LOGS_DIR, folder);
    if (!fs.existsSync(folderPath)) continue;

    const files = fs.readdirSync(folderPath);
    for (const file of files) {
      const fullPath = `${folder}/${file}`;
      logEntries.push({
        type,
        file: fullPath,
        title: `${generateTitle(file)} (${type})`,
        description: `Auto-added ${type} log for ${file}`,
        tags: [type, file.split('.')[0]],
      });
    }
  }

  // Add project structure log
  const structureFile = 'project-structure.md';
  const structurePath = path.join(LOGS_DIR, structureFile);
  if (fs.existsSync(structurePath)) {
    logEntries.unshift({
      type: 'structure',
      file: structureFile,
      title: '📘 Core Project Structure',
      description: 'Defines the 5 core components, naming, and visual system.',
      tags: ['core', 'method', 'system'],
    });
  }

  const manifest = {
    project: 'Lighthouse',
    last_updated: new Date().toISOString(),
    logs: logEntries,
  };

  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
  console.log(`✅ Manifest updated with ${logEntries.length} entries.`);
}

scanLogs();
