const QUESTIONS = [
  { key: 'recorded_quality', label: 'Rating for recorded lectures (1-5)', type: 'text' },
  { key: 'recorded_engagement', label: 'Engagement of recorded videos', type: 'text' },
  { key: 'recorded_understanding', label: 'Helpfulness of lectures', type: 'text' },
  { key: 'doubt_sessions_attended', label: 'Doubt-clearing sessions attended', type: 'text' },
  { key: 'doubt_helpfulness', label: 'Helpfulness of doubt sessions (1-5)', type: 'text' },
  { key: 'doubts_addressed', label: 'Were doubts cleared?', type: 'text' },
  { key: 'ta_support', label: 'TA supportiveness', type: 'text' },
  { key: 'ai_attended', label: 'Attended AI Tools session?', type: 'text' },
  { key: 'ai_rating', label: 'AI Tools session rating (1-5)', type: 'text' },
  { key: 'ai_insights', label: 'Insights from AI Tools session', type: 'text' },
  { key: 'ai_confidence', label: 'Confidence in AI Tools', type: 'text' },
  { key: 'overall_satisfaction', label: 'Overall satisfaction (1-5)', type: 'text' },
  { key: 'recorded_improve', label: 'Recorded lectures improvement', type: 'textarea' },
  { key: 'doubt_improve', label: 'Doubt-clearing improvement', type: 'textarea' },
  { key: 'ai_support', label: 'Additional AI tools support', type: 'textarea' },
  { key: 'liked_most', label: 'What did you like the most?', type: 'textarea' },
  { key: 'next_week', label: 'What to improve for next week?', type: 'textarea' },
  { key: 'comments', label: 'Any additional comments?', type: 'textarea' }
];

const DEFAULT_SETTINGS = {
  recorded_quality: "4",
  recorded_engagement: "Very engaging and clear",
  recorded_understanding: "Yes, very much",
  doubt_sessions_attended: "Did not attend",
  doubt_helpfulness: "4",
  doubts_addressed: "Did not ask any doubts",
  ta_support: "Did not interact",
  ai_attended: "No",
  ai_rating: "4",
  ai_insights: "Somewhat relevant",
  ai_confidence: "Somewhat confident",
  overall_satisfaction: "4",
  recorded_improve: "Nothing to improve. Everything was clear.",
  doubt_improve: "Better scheduling would help.",
  ai_support: "Provide additional case studies.",
  liked_most: "Clarity and structure of the lectures.",
  next_week: "More live examples would help.",
  comments: "Everything was great, keep going!"
};

document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.sync.get(DEFAULT_SETTINGS, (saved) => {
    createForm(saved);
  });

  document.getElementById("save").addEventListener("click", () => {
    const data = {};
    QUESTIONS.forEach(q => {
      data[q.key] = document.getElementById(q.key).value;
    });
    chrome.storage.sync.set(data);
  });
});

function createForm(saved) {
  const container = document.getElementById("form");
  QUESTIONS.forEach(q => {
    const label = document.createElement("label");
    label.textContent = q.label;
    const input = q.type === "textarea" ? document.createElement("textarea") : document.createElement("input");
    input.id = q.key;
    input.value = saved[q.key] ?? DEFAULT_SETTINGS[q.key] ?? "";
    container.appendChild(label);
    container.appendChild(input);
  });
}