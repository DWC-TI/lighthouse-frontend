# 🗺️ Lighthouse Modular Dashboard

A clean, flexible, and fully modular dashboard to track your creative energy, routines, and weekly beacons—built for your Lighthouse Method.

---

## 🚦 Overview

- **Modular HTML dashboard** — Each “card” is its own HTML file for easy updating and expansion.
- **Modern Lighthouse-inspired style** — All theme colors and layout in one CSS file.
- **Live creative flow chart** — 7-day history, color-coded, and fully responsive.
- **Zero vendor lock-in** — No build tools, just HTML, CSS, and [Chart.js](https://www.chartjs.org/).

---

## 📁 Folder Structure

```
/project-root
  ├── index.html         # Loads everything, no UI logic here!
  ├── style.css          # All colors, layout, and card style
  ├── /cards/
  │     ├── card0.html   # Top menu (navbar)
  │     ├── card1.html   # Beacon Hero
  │     ├── card2.html   # Builder Beam
  │     ├── card3.html   # Maintenance
  │     ├── card4.html   # Exploration
  │     ├── card5.html   # Return Point
  │     ├── card6.html   # Creative Flow Timeline (Chart.js)
  │     ├── card7.html   # Check-In
  │     ├── card8.html   # Weekly Beacon
  │     └── card9.html   # Blind Spot
```

---

## 🛠️ How it Works

- The `index.html` script dynamically loads all cards into flexible rows.
- Change, add, or remove cards simply by editing the `/cards` folder and updating the loader array in `index.html`.
- All dashboard appearance is managed in `style.css`.
- The Creative Flow Timeline chart (Card 6) uses Chart.js; color logic matches the Lighthouse energy metaphor.

---

## ⚡ Quick Start

1. Open `index.html` in your browser.
2. Edit or add any card in `/cards/` to update the dashboard instantly.
3. Adjust `flowData` in the chart script to reflect your real 7-day values.

---

## 🎨 Theming

- Edit any color or style in `style.css`.
- Add or remove cards without breaking layout.
- Theme and logic are separated—easy to port to React or other frameworks later.

---

## 🚀 Extending the Dashboard

- **Add new cards:**  
  - Copy an existing card, e.g., `card10.html`
  - Add it to a row in the loader config in `index.html`
- **Change chart data:**  
  - Update the `flowData` array in the main script for real values.
- **Connect to APIs:**  
  - (Future) Fetch check-in data from Notion, Strapi, or another backend.
- **Customize rows/columns:**  
  - Change the loader array to rearrange dashboard sections.

---

## 🏗️ Next Steps & Notes

- [ ] Connect real check-in/check-out data
- [ ] Add notification/reminder features
- [ ] Add export to PDF/image
- [ ] Add new Lighthouse workflow cards as needed

---

## ✍️ Project Log

*2024-06-14*: Modular structure, color logic, and creative flow chart completed!  
*Add your next milestone here.*

---

**Built by Steve De Weert & Lighthouse Method**  
_Support and upgrades by ChatGPT_
