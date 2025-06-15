const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3001;

// Enable CORS so frontend at 8080 can access
app.use(cors());
app.use(express.json());

// Absolute path to projects.json
const filePath = path.join(__dirname, "data", "projects.json");

// GET: return all projects
app.get("/api/projects", (req, res) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("File read error:", err);
      return res.status(500).json({ error: "File read error" });
    }

    try {
      const json = JSON.parse(data);
      res.json(json);
    } catch (parseErr) {
      console.error("JSON parse error:", parseErr);
      res.status(500).json({ error: "Invalid JSON format" });
    }
  });
});

// POST: overwrite all project data
app.post("/api/save-project", (req, res) => {
  fs.writeFile(filePath, JSON.stringify(req.body, null, 2), (err) => {
    if (err) {
      console.error("File write error:", err);
      return res.status(500).json({ error: "Write failed" });
    }
    res.status(200).json({ message: "Project saved" });
  });
});

// GET: simple status page for server-test.html
app.get("/status", (req, res) => {
  const now = new Date().toLocaleString();
  res.send(`<h1>Server Status</h1><p>Time: ${now}</p>`);
});

app.listen(PORT, () => {
  console.log(`✅ API Server running at http://localhost:${PORT}`);
});
