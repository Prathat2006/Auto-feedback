const DEFAULT_SETTINGS = {
    recorded_quality: "4",
    recorded_engagement: "Very engaging and clear",
    recorded_understanding: "Yes, very much",
    doubt_helpfulness: "4",
    doubts_addressed: "Did not ask any doubts",
    ta_support: "Did not interact",
    ai_attended: "Yes",
    ai_rating: "4",
    ai_insights: "Somewhat relevant",
    ai_confidence: "Somewhat confident",
    overall_satisfaction: "4",
    recorded_improve: "Nothing to improve. Everything was clear.",
    doubt_improve: "Better scheduling would help.",
    ai_support: "Provide additional case studies.",
    liked_most: "Clarity and structure of the lectures.",
    next_week: "More live examples would help.",
    comments: "Everything was great, keep going!",
    auto_submit: false,
    auto_submit_delay: 5, // NEW: default delay in seconds
};

// Define radio options for each radio question
const RADIO_OPTIONS = {
    recorded_quality: ["1", "2", "3", "4", "5"],
    recorded_engagement: [
        "Very engaging and clear",
        "Somewhat engaging but could be clearer",
        "Neutral",
        "Hard to understand, needs improvement",
        "Did not watch"
    ],
    recorded_understanding: ["Not at all","Not really", "Somewhat", "Yes, very much"],
    doubt_helpfulness: ["1", "2", "3", "4", "5"],
    doubts_addressed: [
        "Yes, all my doubts were cleared",
        "Some doubts were cleared",
        "No, I still have unresolved doubts",
        "Did not ask any doubts"
    ],
    ta_support: [
        "Very supportive and interactive",
        "Somewhat supportive",
        "Neutral",
        "Not very supportive",
        "Did not interact"
    ],
    ai_attended: ["No", "Yes"],
    ai_rating: ["1", "2", "3", "4", "5"],
    ai_insights: [
        "Yes, very relevant",
        "Somewhat relevant",
        "Neutral",
        "Not really relevant",
        "Did not attend"
    ],
    ai_confidence: [
        "Very confident",
        "Somewhat confident",
        "Neutral",
        "Not confident",
        "Did not attend"
    ],
    overall_satisfaction: ["1", "2", "3", "4", "5"]
};
const QUESTIONS = Object.entries(DEFAULT_SETTINGS)
    .filter(([key]) => key !== "auto_submit" && key !== "auto_submit_delay")
    .map(([key, value]) => ({
        key,
        label: key.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase()),
        type: RADIO_OPTIONS[key] ? "radio" : "textarea"
    }));

function createForm(saved = {}) {
    const container = document.getElementById("form");
    container.innerHTML = "";
    QUESTIONS.forEach(({ key, label, type }) => {
        const labelEl = document.createElement("label");
        labelEl.setAttribute("for", key);
        labelEl.textContent = label;
        container.appendChild(labelEl);

        if (type === "radio") {
            const options = RADIO_OPTIONS[key];
            const selectedValue = saved[key] ?? DEFAULT_SETTINGS[key];
            const radioGroup = document.createElement("div");
            radioGroup.id = key + "_group";
            options.forEach(option => {
                const radioId = `${key}_${option.replace(/\s+/g, "_")}`;
                const radio = document.createElement("input");
                radio.type = "radio";
                radio.name = key;
                radio.id = radioId;
                radio.value = option;
                if (option === selectedValue) radio.checked = true;

                const radioLabel = document.createElement("label");
                radioLabel.setAttribute("for", radioId);
                radioLabel.textContent = option;

                radioGroup.appendChild(radio);
                radioGroup.appendChild(radioLabel);
            });
            container.appendChild(radioGroup);
        } else {
            const textarea = document.createElement("textarea");
            textarea.id = key;
            textarea.value = saved[key] ?? DEFAULT_SETTINGS[key];
            container.appendChild(textarea);
        }
    });

    const autoDiv = document.createElement("div");
    autoDiv.className = "toggle-wrapper";
    const autoLabel = document.createElement("span");
    autoLabel.className = "toggle-label";
    autoLabel.textContent = "Enable Auto-Submit";

    const autoToggle = document.createElement("input");
    autoToggle.type = "checkbox";
    autoToggle.id = "auto_submit";
    autoToggle.className = "auto-submit-toggle";
    autoToggle.checked = saved.auto_submit ?? DEFAULT_SETTINGS.auto_submit;

    autoDiv.appendChild(autoLabel);
    autoDiv.appendChild(autoToggle);
    container.appendChild(autoDiv);
}

document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.sync.get(DEFAULT_SETTINGS, (saved) => createForm(saved));

    document.getElementById("save").addEventListener("click", () => {
        const data = {};
                data["auto_submit"] = document.getElementById("auto_submit").checked;

        const delayEl = document.getElementById("auto_submit_delay");
        if (delayEl) {
            const parsed = parseInt(delayEl.value, 10);
            data["auto_submit_delay"] = Number.isFinite(parsed) && parsed >= 1 && parsed <= 60 ? parsed : DEFAULT_SETTINGS.auto_submit_delay;
        } else {
            data["auto_submit_delay"] = DEFAULT_SETTINGS.auto_submit_delay;
        }
        QUESTIONS.forEach(q => {
            if (q.type === "radio") {
                const checked = document.querySelector(`input[name="${q.key}"]:checked`);
                data[q.key] = checked ? checked.value : DEFAULT_SETTINGS[q.key];
            } else {
                const input = document.getElementById(q.key);
                data[q.key] = input.value;
            }
        });


        chrome.storage.sync.set(data, () => {
            document.getElementById("status").textContent = "Settings saved!";
            setTimeout(() => document.getElementById("status").textContent = "", 1500);
        });
    });
});