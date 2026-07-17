# AIAlgoCoach Frontend 🎨


The AIAlgoCoach frontend is a blazing-fast Single Page Application (SPA) built with React and Vite. It serves as the presentation layer, turning raw Codeforces and AI data into a beautiful, interactive dashboard.

## 🚀 Capabilities

- **Interactive AI Chat:** A Markdown-rendered chat interface for real-time algorithmic mentoring.
- **Dynamic Dashboards:** Beautiful UI for visualizing competitive programming metrics.
- **Activity Heatmaps:** Renders GitHub-style yearly contribution grids for problem-solving streaks.
- **Complex Visualizations:** Generates Radar Charts for topic mastery, Pie Charts for language preferences, and Bar Charts for verdict history.
- **Responsive Design:** Optimized for both desktop and mobile viewing with a consistent "Glassmorphism" aesthetic.
- **Secure JWT Handling:** Built-in Axios interceptors seamlessly handle access and refresh token lifecycles in the background.

## 🛠️ Core Technologies

- **React 19 & Vite 8:** The foundation of the SPA, chosen for ultra-fast Hot Module Replacement (HMR) and optimized production builds.
- **Tailwind CSS 3.4:** Utility-first CSS framework used exclusively for styling.
- **React Router DOM 7:** Handles client-side routing, protected private routes, and nested layouts.
- **Recharts:** A composable charting library built on React components, used for all data visualizations.
- **Axios:** Handles HTTP requests and is configured with automated interceptors for transparent JWT lifecycle management.
- **Lucide React:** Beautiful, clean SVG icon set.
- **React Markdown:** Renders the AI Mentor's Markdown responses securely, enhanced with `remark-gfm` and `@tailwindcss/typography` for flawless table and code-block rendering.

## ✨ Design System: "Glassmorphism"

The entire UI is built around a unified aesthetic:
- **Depth:** Cards float above a subtle, animated gradient background using CSS `backdrop-filter: blur()`.
- **Color Palette:** A professional, calming blend of Slate (for text/structure), Teal (Primary accents), and Indigo (Secondary accents).
- **Typography:** The `Inter` font family is used globally for high legibility, heavily utilizing font-weights to create visual hierarchy instead of pure colors.
- **Micro-interactions:** Buttons and cards feature subtle transform scales and shadow transitions on hover to feel responsive and alive.

## 📁 Key Components Directory

```
src/
├── api/             # Global Axios instance & JWT Interceptors
├── components/      
│   ├── about/       # Modular UI blocks for the About page
│   ├── charts/      # Complex Visualizations (Recharts wrappers)
│   └── layout/      # Structural UI (Sidebar, Header)
├── pages/           # Main Views (Dashboard, Analytics, AI Insights, AboutDeveloper)
├── App.jsx          # Route definitions and `<PrivateRoute>` wrappers
└── index.css        # Tailwind directives and custom component layers
```

---

<div align="center">
  <p>Part of the <b>AIAlgoCoach</b> Platform.</p>
  <a href="../README.md">Return to Root Directory</a>
</div>
