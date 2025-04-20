📚 LMS Feedback Autofiller
Automatically fill out LMS feedback forms with personalized answers and optionally auto-submit them — saving your time and sanity during evaluation weeks.

⚙️ Features
Customizable responses for all feedback questions

Stylish and intuitive settings popup

Toggle for Auto-Submit (5s after opening the form)

Supports radio buttons, text areas, and adaptive course-specific logic

Dark theme and clean UI ✨

🚀 Installation
Clone or Download the Extension

Download this repository as a ZIP

Extract it to a folder on your computer

Load Extension into Chrome

Open chrome://extensions/

Enable Developer mode (top right)

Click Load unpacked

Select the extracted folder

✅ You're all set!

🧪 How to Use
Click the extension icon in your browser.

A settings page will appear with all the feedback options.

Customize any responses you’d like — your changes are saved.

Toggle Auto-Submit ON if you want the form to submit automatically (⚠️ 5 seconds after loading).

Visit the LMS feedback form — it will autofill with your selected preferences.

🧰 File Structure
bash
Copy
Edit
📁 LMS Feedback Autofiller/
├── manifest.json         # Chrome extension metadata
├── popup.html            # Extension popup UI
├── popup.js              # Logic for rendering and saving settings
├── style.css             # Custom styles and toggle switch design
├── content.js            # Autofill logic for LMS form
├── icon.png              # Extension icon (optional)
💡 Notes
The extension works on any page (<all_urls> is enabled), but it activates logic only when the form structure matches expected LMS feedback layouts.

If Auto-Submit is enabled, it will try submitting the form 5 seconds after loading — be careful!

Course-specific options (like “Which sessions did you attend?”) are auto-selected based on the course name in the page.

🛠 Customize or Extend
Want to change default answers or add more logic?

Modify the defaults in popup.js → DEFAULT_SETTINGS

Update matching patterns in content.js to adapt to different LMS questions

✅ Permissions
This extension uses:

storage: to save your feedback settings

scripting: to interact with the current tab

activeTab: to access the current webpage

All securely managed and scoped.

📷 Screenshots
Coming soon! Or add your own 🙂

📄 License
MIT License — feel free to modify and enhance.

