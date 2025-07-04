chrome.storage.sync.get(null, settings => {
  const RADIO_QUESTIONS = [
    { key: "recorded_quality", pattern: /quality of the recorded lectures/i },
    { key: "doubt_helpfulness", pattern: /helpful were the live doubt-clearing sessions/i },
    { key: "ai_rating", pattern: /rate the hands-on experience/i },
    { key: "overall_satisfaction", pattern: /overall.*learning experience/i }
  ];

  const TEXT_QUESTIONS = [
    { key: "recorded_engagement", pattern: /engaging and easy to understand/i },
    { key: "recorded_understanding", pattern: /help you understand the subject/i },
    { key: "doubt_sessions_attended", pattern: /sessions did you attend/i },
    { key: "doubts_addressed", pattern: /doubts adequately addressed/i },
    { key: "ta_support", pattern: /supportive were the TAs/i },
    { key: "ai_attended", pattern: /attend this week AI-Tools/i },
    { key: "ai_insights", pattern: /session provide practical insights/i },
    { key: "ai_confidence", pattern: /confident.*using.*AI tools/i }
  ];

  const TEXTAREAS = [
    { key: "recorded_improve", pattern: /what could be improved.*lectures/i },
    { key: "doubt_improve", pattern: /suggestions for improving the doubt/i },
    { key: "ai_support", pattern: /support would help.*AI tools/i },
    { key: "liked_most", pattern: /what did you like the most/i },
    { key: "next_week", pattern: /could be improved for next week/i },
    { key: "comments", pattern: /additional comments or suggestions/i }
  ];

  // Map course keywords to session option labels
  const COURSE_TO_SESSION = [
    { keyword: /basics? of data analytics/i, label: "Basics of Data Analytics" },
    { keyword: /linear algebra.*numerical analysis/i, label: "Linear Algebra and Numerical Analysis" },
    { keyword: /foundations? of statistics? and probability/i, label: "Foundations of Statistics and Probability" },
    { keyword: /algorithmic thinking/i, label: "Algorithmic Thinking and Its Applications" }
  ];

  // Extract course title from breadcrumb
  function getCourseTitleFromBreadcrumb() {
    const breadcrumb = document.querySelector('nav[aria-label="Navigation bar"] .breadcrumb-item a[title]');
    if (breadcrumb) {
      return breadcrumb.getAttribute('title') || breadcrumb.textContent || "";
    }
    return "";
  }

  function selectRadioByValue(container, value) {
    const radios = container.querySelectorAll('input[type="radio"]');
    for (let radio of radios) {
      if (radio.value === value) {
        radio.checked = true;
        radio.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }
  }

  function selectRadioByLabel(container, labelText) {
    const labels = container.querySelectorAll("label");
    for (let label of labels) {
      if (label.textContent.trim().toLowerCase() === labelText.toLowerCase()) {
        const input = label.querySelector('input[type="radio"], input[type="checkbox"]');
        if (input) {
          input.checked = true;
          input.dispatchEvent(new Event("change", { bubbles: true }));
        }
      }
    }
  }

  document.querySelectorAll("legend").forEach(legend => {
    const questionText = legend.textContent.trim();
    for (const q of RADIO_QUESTIONS) {
      if (q.pattern.test(questionText)) {
        const container = legend.closest("fieldset");
        if (!container) return;
        selectRadioByValue(container, settings[q.key] || "4");
      }
    }
    for (const q of TEXT_QUESTIONS) {
      if (q.pattern.test(questionText)) {
        const container = legend.closest("fieldset");
        if (!container) return;
        // Special handling for "Which doubt-clearing sessions did you attend this week?"
        if (/sessions did you attend/i.test(questionText)) {
          const courseTitle = getCourseTitleFromBreadcrumb();
          let matchedLabel = null;
          for (const mapping of COURSE_TO_SESSION) {
            if (mapping.keyword.test(courseTitle)) {
              matchedLabel = mapping.label;
              break;
            }
          }
          // If matched, select the corresponding option
          if (matchedLabel) {
            selectRadioByLabel(container, matchedLabel);
            return;
          }
        }
        // Default behavior
        selectRadioByLabel(container, settings[q.key] || "Yes");
      }
    }
  });

  document.querySelectorAll("label").forEach(label => {
    const questionText = label.textContent.trim();
    const textarea = label.closest(".form-group, .form-inline, .fitem")?.querySelector("textarea");
    if (!textarea) return;
    for (const q of TEXTAREAS) {
      if (q.pattern.test(questionText)) {
        textarea.value = settings[q.key] || "";
        textarea.dispatchEvent(new Event("input", { bubbles: true }));
      }
    }
  });
  if (settings.auto_submit) {
    setTimeout(() => {
      const submitBtn = document.querySelector('input[type="submit"]#id_savevalues');
      if (submitBtn) {
        submitBtn.click();
      } else {
        console.warn("Submit button not found!");
      }
    }, 5000); // 5 seconds
  }
  
});
