# 📚 LMS Feedback Autofiller

**LMS Feedback Autofiller** is a Chrome extension that automatically fills out your LMS feedback forms with your personalized answers and can even auto-submit them for you. Save time, avoid repetitive typing, and never miss a feedback deadline again!

---

## 🚀 Installation

1. **Clone or Download the Extension**
   - Download this repository as a ZIP file.
   - Extract it to a folder on your computer.

2. **Load the Extension into Chrome**
   - Open `chrome://extensions/` in your browser.
   - Enable **Developer mode** (toggle in the top right).
   - Click **Load unpacked**.
   - Select the folder where you extracted the extension.

That's it! The extension is now installed and ready to use.

---

## ⚙️ Features

- **Customizable Responses:** Set your own answers for all feedback questions.
- **Auto-Submit Option:** Enable auto-submit to send feedback automatically (5 seconds after opening the form).
- **Smart Session Selection:** Automatically selects the attended session based on the course name.
- **Supports All Input Types:** Handles radio buttons, text areas, and more.
- **Modern UI:** Clean, dark-themed popup.
- **Safe & Secure:** Only runs on feedback forms, stores your settings locally.

---

## 🧑‍💻 How to Use

1. **Open the Extension**
   - Click the extension icon in your browser toolbar.

2. **Customize Your Answers**
   - The popup will show all feedback questions.
   - Edit any answer to your liking.
   - Use the toggle to enable or disable auto-submit.

3. **Save Your Settings**
   - Click the **Save** button. Your preferences are stored for next time.

4. **Fill Out Feedback**
   - Go to your LMS feedback form.
   - The extension will automatically fill in your answers.
   - If auto-submit is enabled, the form will be submitted **5 seconds** after opening (be cautious!).

---

## 📝 Notes

- **Auto-Submit:** When enabled, the form will be submitted automatically after 5 seconds. Make sure your answers are correct before enabling this!
- **Course-Specific Logic:** The extension detects the course name and selects the appropriate session for "Which session did you attend?" questions.
- **Works on IITJ-Futurense LMS Feedback Forms:** The extension is specifically designed for IITJ-Futurense LMS feedback layouts. If your form is different, you may need to adjust the matching patterns in `content.js`.

---

## 🗂️ File Structure

```bash
📁 LMS Feedback Autofiller/
├── manifest.json         # Chrome extension metadata
├── popup.html            # Extension popup UI
├── popup.js              # Logic for rendering and saving settings
├── style.css             # Custom styles and toggle switch design
├── content.js            # Autofill logic for LMS form
├── icon.png              # Extension icon (optional)
```

---

## ✅ Permissions

This extension uses:

- **storage:** to save your feedback settings
- **scripting:** to interact with the current tab
- **activeTab:** to access the current webpage

All securely managed and scoped.

---

## 📷 Screenshots

Coming soon! Or add your own 🙂

---

## 📄 License

MIT License — feel free to modify and enhance.

