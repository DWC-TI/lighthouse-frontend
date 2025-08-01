# 📂 /logs/

This folder contains structured logs and documentation for the Lighthouse Method system.  
It captures key outputs, state transitions, assistant insights, and system messages during development and usage.

---

## 🔧 Folder Structure

Each subfolder inside `/logs/` corresponds to a different log type or domain:

- `/system/` — Logs internal assistant-generated system messages, insights, or structural updates.
- `/checkins/` — Daily check-ins from the Lighthouse Dashboard or user sessions.
- `/checkouts/` — Daily check-outs reflecting user states, sprint completion, and anchors.
- `/beacons/` — Weekly or monthly Beacon reflections and summaries.
- `/return-points/` — Anchored cues for reentry after breaks or overwhelm.
- `/keeper-wisdom/` — Keeper’s Tips and insights logged from key moments.

---

## 🧾 Log Format

Each log file follows a consistent `.log` or `.json` format and includes:

- `🏷️ Title` – Friendly name or session summary.
- `🗓️ Date` – ISO timestamp or readable version.
- `📂 View Log File` – Path to the actual content file.

Logs may also include signal indicators:
- **Energy Signal** (e.g., 🟢🟢⚪)
- **Momentum Signal** (e.g., 🔵 Beam in Motion)
- **State Weather** (e.g., 🌤️ Clear Focus)

---

## 🧠 Purpose

This logging system is designed to:
- Preserve context across sessions
- Track user rhythm, energy, and creative state
- Allow structured reflection and automated insight generation
- Serve as a timeline of the development journey

---

## 🛠️ How to Use

1. Logs are automatically generated by the assistant or by user input.
2. You can browse logs manually or build dashboards to visualize trends.
3. Commit logs regularly with clear commit messages.

---

## 🚨 Notes

- Do **not** manually edit `.log` files unless debugging.
- For frontend rendering, use the manifest script to update the index display.
- Broken links or missing files should trigger a `404` fallback and be logged.

---

## ✨ Example Entry Format

```plaintext
🏷️ Drift Recovery – Midweek Check-In  
🗓️ 2025-06-17T09:12:43Z  
📂 View Log File → /logs/checkins/2025-06-17-drift-recovery.log
Energy: 🟡🟡⚪ | Momentum: 🟢 Current Engaged | Weather: 🌥️ Light Haze
