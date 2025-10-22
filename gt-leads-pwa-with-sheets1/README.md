# GipsyTeam Leads PWA (with Google Sheets)

Interactive, tablet-friendly PWA to capture qualified leads at the booth.
Sends submissions to Google Sheets via a Google Apps Script Web App.

## Quick start (Replit)
1. Create a new Node.js repl (Vite).
2. Upload this project.
3. `npm install` then `npm run dev`.

## Configure Google Sheets
1. Create a Google Sheet. Copy its ID from the URL.
2. Open **Apps Script** > New project. Paste code from `apps_script_webhook.gs`.
3. Set `SHEET_ID` and (optionally) `SHEET_NAME`.
4. Deploy > *New deployment* > Type: **Web app** > Execute as: **Me** > Who has access: **Anyone**.
5. Copy the Web app URL.
6. In `/public/config.json`, set `"webhook": "<YOUR_WEB_APP_URL>"` (no rebuild needed).

## Kiosk tips
- App auto-resets to the welcome screen after 60 seconds of inactivity.
- Data is also stored locally (`localStorage`) as a backup.
- Install as PWA from the browser menu.