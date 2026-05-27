# Frontend Operations & Configuration Guide

This document outlines everything needed to configure, run, and prepare the React/Vite frontend for production deployment.

## 📋 Requirements
- **Node.js:** v18.0.0 or higher
- **Package Manager:** npm (v9+) or yarn/pnpm

---

## ⚙️ Environment Configuration

The frontend relies on knowing where the backend API lives. 

1. Open `src/api/axiosConfig.js`.
2. Locate the Axios creation block:
   ```javascript
   const api = axios.create({
       baseURL: 'http://localhost:8080/api', // <-- Change this for production
   });
   ```
3. **For Local Development:** Keep it as `http://localhost:8080/api` (assuming your Spring Boot server is running locally).
4. **For Production Deployment:** Change this to your live backend URL, for example: `https://api.yourdomain.com/api`. 

*(Note: In a true production environment, you would abstract this into a `.env` file using `import.meta.env.VITE_API_URL`)*

---

## 🚀 Building & Running

### Local Development (HMR)
To run the Vite development server with Hot Module Replacement:
```bash
# 1. Install all dependencies (Only needed once or when package.json changes)
npm install

# 2. Start the dev server
npm run dev
```
The application will instantly launch at `http://localhost:5173`.

### Production Build
When you are ready to deploy the frontend to a static host (like Vercel, Netlify, AWS S3, or Nginx):

```bash
# Create an optimized, minified production build
npm run build
```
This command will create a `dist/` directory. The contents of this directory are purely static HTML, CSS, and JS files.

---

## 🌐 Deploying to Nginx (Example)

If you are deploying the `dist/` folder to a VPS using Nginx, you must configure Nginx to route all requests back to `index.html` to support React Router's client-side routing.

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/aialgocoach/dist;
    index index.html;

    location / {
        # This is CRITICAL for React Router to work!
        try_files $uri $uri/ /index.html;
    }
}
```

---

## 🐞 Troubleshooting

- **Chart Labels Cut Off:** Ensure your screen width isn't forcing responsive containers to crush the charts. The UI is responsive, but Recharts sometimes requires manual browser refreshes on drastic window resizes.
- **Endless Loading Spinners:** If the dashboard or AI Insights page spins forever, open your browser's Developer Tools (Network Tab). If requests to `http://localhost:8080` are failing (CORS or Network Error), your Spring Boot backend is not running.
- **Unexpected Logouts:** The Axios interceptors automatically handle token refreshing. If you are kicked to the login screen, it means your 7-day Refresh Token has expired and you must legitimately log in again.
