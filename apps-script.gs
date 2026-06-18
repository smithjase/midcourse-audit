// Midcourse Self-Audit — capture endpoint (Google Apps Script)
// Receives a submission from index.html and appends a row to this Sheet.
//
// SETUP:
// 1. Create a new Google Sheet (in your own Drive).
// 2. Extensions > Apps Script. Delete the placeholder code, paste ALL of this, and Save.
// 3. Deploy > New deployment > select type "Web app".
//      - Description: Midcourse capture
//      - Execute as: Me
//      - Who has access: Anyone
//    Deploy, and authorise when prompted (it's your own script writing to your own Sheet).
// 4. Copy the "Web app URL" it gives you.
// 5. In index.html, paste that URL into SHEET_ENDPOINT (near the top of the <script>).
// 6. Test: open the Web app URL in a browser — you should see "endpoint is live".
//    Then take the audit once and check a row appears in the Sheet.

var SHEET_NAME = "Responses";

var HEADERS = [
  "timestamp", "total", "band",
  "physical", "cognition", "autonomic",
  "exercise", "nutrition", "sleep", "weak_lever",
  "fb_accuracy", "fb_useful", "fb_email_willing",
  "email", "comment", "answers", "user_agent"
];

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if (sh.getLastRow() === 0) {
      sh.appendRow(HEADERS);
      sh.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
      sh.setFrozenRows(1);
    }
    sh.appendRow([
      new Date(),
      data.total || "", data.band || "",
      data.physical || "", data.cognition || "", data.autonomic || "",
      data.exercise || "", data.nutrition || "", data.sleep || "", data.weak || "",
      data.fb_accuracy || "", data.fb_useful || "", data.fb_email_willing || "",
      data.email || "", data.fb_comment || "",
      (data.answers || []).join(","),
      data.ua || ""
    ]);
    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput("Midcourse capture endpoint is live.");
}
