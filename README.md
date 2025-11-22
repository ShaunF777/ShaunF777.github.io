# ShaunF777 Portfolio

This repository hosts my personal portfolio site at [https://shaunf777.github.io](https://shaunf777.github.io).

## 📂 Structure
- `index.html` → Main landing page with chronological hero section (loads `data/timeline.json`)
- `year.html` → Template for detailed year pages (loads `data/{YEAR}.json`)
- `css/style.css` → Site styles (dark theme)
- `js/main.js` → JavaScript timeline rendering and navigation
- `js/year.js` → JavaScript year page data loader and renderer
- `data/` → JSON files mapping achievements (2004–2025)
- `images/` → Pictures for timeline and detail pages

📂 Recommended Folder Structure
Here’s a clean, extensible layout for your repo:
```bash
ShaunF777.github.io/
│
├── index.html                # Front page (hero section with timeline)
├── year.html                 # Template/details page for each year
├── README.md                 # Documentation for repo
├── .gitignore                # Ignore unnecessary files
├── .nojekyll                 # Disable Jekyll processing
│
├── css/
│   └── style.css             # Global styles
│
├── js/
│   ├── main.js               # Front page interactions
│   └── year.js               # Logic for year detail pages
│
├── data/
│   ├── timeline.json         # highligths for index.html
│   ├── 2004.json             # full details per year and reference to photos
│   ├── 2005.json
|   ├── 2006.json  
│   └── ... etc ...
│
└── images/
    ├── timeline/             # Timeline images
    └── years/2004            # Year-specific galleries

```

## 🎯 Features
- Interactive timeline with clickable years
- Detail pages with categories:
  1. Responsibilities
  2. Structural Design
  3. Hydraulics & Drive Systems
  4. Automation Systems Integration

## 🚀 Deployment
- A `.nojekyll` file is included to prevent Jekyll processing.
- Keep image filenames consistent with the JSON entries.
- All code is vanilla JS (ES6). No build tools required.
- This site is automatically deployed via GitHub Pages.
