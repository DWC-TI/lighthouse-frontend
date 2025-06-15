const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// ✅ Serve projects.json at /api/projects
app.get('/api/projects', (req, res) => {
  const filePath = path.join(__dirname, 'data', 'projects.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('❌ Failed to read projects.json:', err);
      return res.status(500).json({ error: 'File read error' });
    }

    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    } catch (parseError) {
      console.error('❌ JSON parse error:', parseError);
      res.status(500).json({ error: 'Invalid JSON format' });
    }
  });
});

// ✅ Optional root route to confirm server is running
app.get('/', (req, res) => {
  res.send('✅ Lighthouse server is running');
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
