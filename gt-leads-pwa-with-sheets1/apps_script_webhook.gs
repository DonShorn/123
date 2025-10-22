/**
 * Google Apps Script — Web App endpoint for collecting GT booth leads into Google Sheets.
 * Steps:
 * 1) Create a Google Sheet and copy its ID.
 * 2) Paste this code in Apps Script, set SHEET_ID/SHEET_NAME.
 * 3) Deploy as Web app (access: Anyone).
 * 4) Paste the Web app URL into /public/config.json -> "webhook".
 */
const SHEET_ID = 'PUT_YOUR_SHEET_ID_HERE'
const SHEET_NAME = 'Leads'

function doPost(e) {
  try {
    const body = e.postData && e.postData.contents ? JSON.parse(e.postData.contents) : {}
    const ss = SpreadsheetApp.openById(SHEET_ID)
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME)
    if (sheet.getLastRow() === 0) sheet.appendRow(['timestamp','screen','name','company','contact','description'])

    sheet.appendRow([
      body.timestamp || new Date().toISOString(),
      body.screen || '',
      body.name || '',
      body.company || '',
      body.contact || '',
      body.description || ''
    ])

    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON)
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) })).setMimeType(ContentService.MimeType.JSON)
  }
}