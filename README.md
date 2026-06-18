# Midcourse Self-Audit — pre-test

A standalone, self-scoring healthspan audit. This version captures responses **and** a short feedback step to a Google Sheet you own — for a small round with people you know, before building the full email funnel.

Two files do the work: `index.html` (the audit) and `apps-script.gs` (the capture endpoint). Hosting and capture are separate jobs — GitHub serves the page; the Sheet stores the data.

---

## 1. Host it — GitHub Pages

1. Create a new GitHub repo. Public is fine: the page isn't secret, and responses go to your private Sheet, **not** the repo.
2. Add `index.html` to the repo (root).
3. Repo **Settings → Pages**. Under "Build and deployment", Source: **Deploy from a branch**; Branch: **main**, folder **/ (root)**. Save.
4. Wait a minute, then your link appears: `https://<your-username>.github.io/<repo-name>/`. That's the link you share.

The page works immediately, even before you set up capture — it'll just log submissions to the browser console instead of saving them. So you can demo it right away.

---

## 2. Capture the data — Google Sheet + Apps Script

1. Create a new Google Sheet in your Drive.
2. **Extensions → Apps Script.** Delete the placeholder, paste all of `apps-script.gs`, Save.
3. **Deploy → New deployment → Web app.** Execute as: **Me**. Who has access: **Anyone**. Deploy, and authorise when asked (it's your own script writing to your own Sheet).
4. Copy the **Web app URL**.
5. Open `index.html`, find `SHEET_ENDPOINT` near the top of the `<script>`, and paste the URL between the quotes. Commit/re-upload.
6. **Test:** open the Web app URL in a browser — it should say *"endpoint is live."* Then take the audit once and confirm a row lands in a "Responses" tab.

---

## 3. What gets captured

One row per completed audit, in a "Responses" tab: timestamp, total + band, the three pillar scores, the three lever scores, the weakest lever, the three feedback answers (accuracy / usefulness / would-share-email), any comment, an optional email if they give one, the raw 15 answers, and the browser/user-agent.

No personal data is collected unless someone chooses to type their email. Nothing is shown publicly.

---

## 4. What this round is for

You're after the *reaction*, not a dataset — so talk to the people you send it to as well. The "would you hand over your email" answer is the one to watch: it's the closest thing to the real conversion ask, from people who'll be honest with you. If the result feels accurate and useful and they'd give the email, the full funnel is worth building. If not, you've learned it cheaply.
