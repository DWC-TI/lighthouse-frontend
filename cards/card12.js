(function () {
  const logContainer = document.getElementById("recent-activity-log");
  const toggle = document.getElementById("toggle-activity-log");
  const container = document.getElementById("recent-activity-content");

  // 🔀 Attach toggle listener
  if (toggle && logContainer) {
    toggle.addEventListener("change", () => {
      logContainer.style.display = toggle.checked ? "block" : "none";
    });
  }

  const log = (msg) => {
    if (logContainer) logContainer.innerHTML += `<div>🔍 ${msg}</div>`;
  };

  if (!container) {
    console.warn("📉 Card 12 script loaded before container");
    return;
  }

  log("Starting fetch from /api/projects");

  fetch("http://localhost:3001/api/projects")
    .then(res => {
      log(`Fetch response: HTTP ${res.status}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then(data => {
      log("✅ Data received");
      const projects = Array.isArray(data.projects) ? data.projects : [];
      log(`Found ${projects.length} projects`);

      const now = new Date();
      const recent = projects
        .map(p => ({
          title: p.title || "Untitled",
          date: new Date(p.lastUpdated || p.updated || p.created)
        }))
        .filter(p => !isNaN(p.date))
        .filter(p => {
          const days = (now - p.date) / (1000 * 60 * 60 * 24);
          const isRecent = days <= 7;
          log(`📅 ${p.title} – ${p.date.toLocaleString()} (${Math.round(days)} days ago) → ${isRecent ? "✅ recent" : "⏭️ skipped"}`);
          return isRecent;
        })
        .sort((a, b) => b.date - a.date);

      if (!recent.length) {
        container.innerHTML = "<p style='color:#fa7268'>⚠️ No recent updates found.</p>";
        log("No recent entries matched the 7-day filter.");
        return;
      }

      const ul = document.createElement("ul");
      ul.style.listStyle = "none";
      ul.style.padding = "0";
      ul.style.margin = "0.5em 0";
      ul.style.maxWidth = "340px";
      ul.style.textAlign = "left";

      for (const p of recent) {
        const li = document.createElement("li");
        li.style.marginBottom = "0.5em";
        li.style.padding = "0.5em 0.8em";
        li.style.background = "#fffbe8";
        li.style.borderRadius = "0.7em";
        li.style.boxShadow = "0 1px 3px #fa726833";
        li.innerHTML = `<strong>${p.title}</strong><br><small>🕒 ${p.date.toLocaleString()}</small>`;
        ul.appendChild(li);
      }

      container.innerHTML = "";
      container.appendChild(ul);
      log(`✅ Displayed ${recent.length} recent update(s)`);
    })
    .catch(err => {
      container.innerHTML = `
        <div style="color:#fa7268">
          ❌ Could not load project data<br>
          <code>${err.message}</code>
        </div>`;
      log(`❌ Error occurred: ${err.message}`);
    });
})();
