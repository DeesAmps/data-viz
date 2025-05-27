# Copilot Instructions
<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

This project is a full-stack interactive data visualization dashboard for COVID-19 data. It uses React (Vite, TypeScript) for the frontend and Python/Flask for the backend. The backend will handle data normalization and API endpoints, and PostgreSQL will be used for data storage. Features include dynamic filters, cross-chart brushing, time-series playback, CSV/XLSX export, annotation layers, and OAuth2 authentication (GitHub/Google).

This project uses the `owid-covid-data.csv` file for COVID-19 data storage and normalization. The backend (Flask) should load, normalize, and serve this data via API endpoints. The frontend (React) will consume these endpoints for dynamic, interactive visualizations. Use pandas for CSV processing in the backend, and ensure endpoints support filtering, time-series, and export features as described above.

# Backend API Guidance
- Load and cache `owid-covid-data.csv` on Flask startup.
- Expose endpoints for:
  - Filtered data queries (by country, date, metric, etc.)
  - Time-series data for playback
  - Export of filtered data (CSV/XLSX)
  - Annotation management
- Use PostgreSQL for persistent storage if/when needed.

# Frontend Guidance
- Fetch data from Flask API endpoints.
- Implement dynamic filters, cross-chart brushing, and time-series playback using React state and chart libraries.
- Support CSV/XLSX export and annotation overlays via API.

# Auth
- Integrate OAuth2 (GitHub/Google) for user authentication on both frontend and backend as needed.
