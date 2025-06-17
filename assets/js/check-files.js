// 📂 check-files.js

const filesToCheck = [
  "beams.json",
  "logs.json",
  "state.json",
  "signals.json"
];

const githubBase =
  "https://raw.githubusercontent.com/DWC-TI/lighthouse-frontend/main/data/";
const localBase = "/data/";

const statusContainer = document.getElementById("status-container");
statusContainer.innerHTML = "";

filesToCheck.forEach((filename) => {
  const statusEl = document.createElement("div");
  statusEl.className = "status gray";
  statusEl.innerHTML = `<span class='dot'>●</span> ${filename} – checking...`;
  statusContainer.appendChild(statusEl);

  const dot = statusEl.querySelector(".dot");

  fetch(githubBase + filename, { cache: "no-store" })
    .then((res) => {
      if (res.ok) {
        dot.innerText = "●";
        dot.title = "Loaded from GitHub";
        statusEl.className = "status green";
        statusEl.innerHTML = `<span class='dot'>●</span> ${filename} – GitHub accessible`;
      } else {
        throw new Error("GitHub load failed");
      }
    })
    .catch(() => {
      fetch(localBase + filename, { cache: "no-store" })
        .then((res) => {
          if (res.ok) {
            dot.innerText = "●";
            dot.title = "Loaded from local fallback";
            statusEl.className = "status yellow";
            statusEl.innerHTML = `<span class='dot'>●</span> ${filename} – Using local fallback`;
          } else {
            throw new Error("Local load failed");
          }
        })
        .catch(() => {
          dot.innerText = "●";
          dot.title = "Could not load file";
          statusEl.className = "status red";
          statusEl.innerHTML = `<span class='dot'>●</span> ${filename} – Error – not found`;
        });
    });
});
