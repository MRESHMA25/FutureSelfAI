const form = document.getElementById("reflectionForm");

const wizardSteps = Array.from(
  document.querySelectorAll(".wizard-step")
);

const stepLabel = document.getElementById("stepLabel");
const stepName = document.getElementById("stepName");
const wizardProgressBar = document.getElementById(
  "wizardProgressBar"
);

const backBtn = document.getElementById("backBtn");
const nextBtn = document.getElementById("nextBtn");
const generateBtn = document.getElementById("generateBtn");
const wizardMessage = document.getElementById("wizardMessage");

const goalDetail = document.getElementById("goalDetail");
const goalCount = document.getElementById("goalCount");

const challengeChoices = document.getElementById(
  "challengeChoices"
);

const challengeOtherGroup = document.getElementById(
  "challengeOtherGroup"
);

const challengeOther = document.getElementById(
  "challengeOther"
);

const futureOtherGroup = document.getElementById(
  "futureOtherGroup"
);

const futureOther = document.getElementById("futureOther");

const loadingSection = document.getElementById(
  "loadingSection"
);

const loadingText = document.getElementById("loadingText");

const errorSection = document.getElementById("errorSection");
const errorMessage = document.getElementById("errorMessage");

const resultSection = document.getElementById(
  "resultSection"
);

const copyBtn = document.getElementById("copyBtn");

const historyList = document.getElementById("historyList");
const clearHistoryBtn = document.getElementById(
  "clearHistoryBtn"
);

const CLIENT_ID_KEY = "futureself_client_id";
const PLAN_PROGRESS_PREFIX = "futureself_plan_";

let currentStep = 1;
let selectedGoal = "";
let selectedChallenges = [];
let selectedFutureTraits = [];
let latestReflection = null;
let loadingInterval = null;


const challengeOptions = {
  Career: [
    "Lack of confidence",
    "Not knowing where to start",
    "Fear of rejection",
    "Inconsistent applications",
    "Interview anxiety",
    "Procrastination",
  ],

  Learning: [
    "Difficulty staying consistent",
    "Too many topics",
    "Distractions",
    "Low motivation",
    "Not understanding concepts",
    "Procrastination",
  ],

  Confidence: [
    "Fear of judgment",
    "Overthinking",
    "Negative self-talk",
    "Difficulty speaking up",
    "Past setbacks",
    "Comparing myself to others",
  ],

  Productivity: [
    "Procrastination",
    "Phone distractions",
    "No clear routine",
    "Too many tasks",
    "Low energy",
    "Perfectionism",
  ],

  "Well-being": [
    "Poor routine",
    "Low energy",
    "Difficulty resting",
    "Too much screen time",
    "Inconsistency",
    "Feeling overwhelmed",
  ],

  "Personal Goal": [
    "Not knowing where to start",
    "Procrastination",
    "Low confidence",
    "Lack of time",
    "Inconsistency",
    "Feeling overwhelmed",
  ],
};


const loadingMessages = [
  "Understanding your goal...",
  "Finding your main focus...",
  "Creating small practical steps...",
  "Building your seven-day plan...",
];


function createClientId() {
  if (
    window.crypto &&
    typeof window.crypto.randomUUID === "function"
  ) {
    return window.crypto.randomUUID();
  }

  return `client-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 12)}`;
}


function getClientId() {
  let clientId = localStorage.getItem(CLIENT_ID_KEY);

  if (!clientId) {
    clientId = createClientId();
    localStorage.setItem(CLIENT_ID_KEY, clientId);
  }

  return clientId;
}


const clientId = getClientId();


function show(element) {
  element.classList.remove("hidden");
}


function hide(element) {
  element.classList.add("hidden");
}


function showWizardMessage(message) {
  wizardMessage.textContent = message;
  show(wizardMessage);
}


function clearWizardMessage() {
  wizardMessage.textContent = "";
  hide(wizardMessage);
}


function showError(message) {
  errorMessage.textContent = message;
  show(errorSection);
}


function clearError() {
  errorMessage.textContent = "";
  hide(errorSection);
}


function updateWizard() {
  wizardSteps.forEach((step) => {
    const stepNumber = Number(step.dataset.step);

    step.classList.toggle(
      "active",
      stepNumber === currentStep
    );
  });

  const names = {
    1: "Choose your goal",
    2: "Select your challenges",
    3: "Choose future qualities",
  };

  stepLabel.textContent = `Step ${currentStep} of 3`;
  stepName.textContent = names[currentStep];
  wizardProgressBar.style.width =
    `${(currentStep / 3) * 100}%`;

  backBtn.classList.toggle(
    "hidden",
    currentStep === 1
  );

  nextBtn.classList.toggle(
    "hidden",
    currentStep === 3
  );

  generateBtn.classList.toggle(
    "hidden",
    currentStep !== 3
  );

  clearWizardMessage();
}


function validateCurrentStep() {
  if (currentStep === 1) {
    if (!selectedGoal) {
      showWizardMessage("Choose one goal area.");
      return false;
    }

    if (!goalDetail.value.trim()) {
      showWizardMessage(
        "Describe your goal in one short sentence."
      );
      return false;
    }
  }

  if (currentStep === 2) {
    const finalChallenges = getFinalChallenges();

    if (finalChallenges.length === 0) {
      showWizardMessage(
        "Select at least one challenge."
      );
      return false;
    }
  }

  if (currentStep === 3) {
    const finalTraits = getFinalFutureTraits();

    if (finalTraits.length === 0) {
      showWizardMessage(
        "Choose at least one future quality."
      );
      return false;
    }
  }

  return true;
}


nextBtn.addEventListener("click", () => {
  if (!validateCurrentStep()) {
    return;
  }

  if (currentStep === 1) {
    renderChallengeChoices();
  }

  currentStep += 1;
  updateWizard();
});


backBtn.addEventListener("click", () => {
  currentStep = Math.max(1, currentStep - 1);
  updateWizard();
});


document.querySelectorAll(".choice-card").forEach((card) => {
  card.addEventListener("click", () => {
    document
      .querySelectorAll(".choice-card")
      .forEach((item) => item.classList.remove("selected"));

    card.classList.add("selected");
    selectedGoal = card.dataset.value;

    clearWizardMessage();
  });
});


goalDetail.addEventListener("input", () => {
  goalCount.textContent =
    `${goalDetail.value.length} / 300`;
});


function renderChallengeChoices() {
  challengeChoices.innerHTML = "";
  selectedChallenges = [];

  const options =
    challengeOptions[selectedGoal] ||
    challengeOptions["Personal Goal"];

  [...options, "Other"].forEach((option) => {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "option-chip";
    button.dataset.value = option;
    button.textContent = option;

    button.addEventListener("click", () => {
      button.classList.toggle("selected");

      if (option === "Other") {
        challengeOther.value = "";
        challengeOtherGroup.classList.toggle(
            "hidden",
            !button.classList.contains("selected")
        );

  return;
}

      if (button.classList.contains("selected")) {
        selectedChallenges.push(option);
      } else {
        selectedChallenges =
          selectedChallenges.filter(
            (item) => item !== option
          );
      }

      clearWizardMessage();
    });

    challengeChoices.appendChild(button);
  });
}


document
  .querySelectorAll("#futureTraitChoices .option-chip")
  .forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.dataset.value;

      if (
        !button.classList.contains("selected") &&
        selectedFutureTraits.length >= 3 &&
        value !== "Other"
      ) {
        showWizardMessage(
          "Choose up to three qualities."
        );
        return;
      }

      button.classList.toggle("selected");

      if (value === "Other") {
        futureOtherGroup.classList.toggle(
          "hidden",
          !button.classList.contains("selected")
        );

        return;
      }

      if (button.classList.contains("selected")) {
        selectedFutureTraits.push(value);
      } else {
        selectedFutureTraits =
          selectedFutureTraits.filter(
            (item) => item !== value
          );
      }

      clearWizardMessage();
    });
  });


function getFinalChallenges() {
  const values = [...selectedChallenges];

  if (
    !challengeOtherGroup.classList.contains("hidden") &&
    challengeOther.value.trim()
  ) {
    values.push(challengeOther.value.trim());
  }

  return [...new Set(values)];
}


function getFinalFutureTraits() {
  const values = [...selectedFutureTraits];

  if (
    !futureOtherGroup.classList.contains("hidden") &&
    futureOther.value.trim()
  ) {
    values.push(futureOther.value.trim());
  }

  return [...new Set(values)].slice(0, 3);
}


function startLoading() {
  let index = 0;

  loadingText.textContent = loadingMessages[index];
  show(loadingSection);

  loadingInterval = window.setInterval(() => {
    index = (index + 1) % loadingMessages.length;
    loadingText.textContent = loadingMessages[index];
  }, 1300);
}


function stopLoading() {
  if (loadingInterval) {
    clearInterval(loadingInterval);
    loadingInterval = null;
  }

  hide(loadingSection);
}


async function requestJson(url, options = {}) {
  const response = await fetch(url, options);

  let data = {};

  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok) {
    throw new Error(
      data.error || "The request could not be completed."
    );
  }

  return data;
}


form.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!validateCurrentStep()) {
    return;
  }

  clearError();
  hide(resultSection);

  generateBtn.disabled = true;
  generateBtn.textContent = "Building Your Plan...";

  startLoading();

  const payload = {
    client_id: clientId,
    goal_category: selectedGoal,
    goal_detail: goalDetail.value.trim(),
    challenges: getFinalChallenges(),
    future_traits: getFinalFutureTraits(),
  };

  try {
    const reflection = await requestJson(
      "/reflect",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    latestReflection = reflection;

    renderReflection(reflection);
    await loadHistory();

    resultSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  } catch (error) {
    showError(
      error.message ||
      "FutureSelfAI could not build your plan."
    );

    errorSection.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  } finally {
    stopLoading();

    generateBtn.disabled = false;
    generateBtn.textContent = "Build My Plan";
  }
});


function renderReflection(data) {
  document.getElementById("mindsetScore").textContent =
    `${data.mindset_score}/100`;

  document.getElementById("primaryFocus").textContent =
    data.primary_focus;

  document.getElementById("progressTrend").textContent =
    data.progress_trend?.label || "Starting Point";

  document.getElementById("progressMessage").textContent =
    data.progress_trend?.message || "";

  document.getElementById("totalReflections").textContent =
    data.total_reflections || 1;

  document.getElementById("currentPattern").textContent =
    data.current_pattern;

  document.getElementById("futureOpportunity").textContent =
    data.future_opportunity;

  document.getElementById("futureMessage").textContent =
    data.future_message;

  document.getElementById("memoryInsight").textContent =
    data.memory_insight;

  renderActionSteps(data.action_steps);
  renderPlan(
    data.reflection_id,
    data.seven_day_plan
  );

  show(resultSection);
}


function renderActionSteps(actions) {
  const container = document.getElementById(
    "actionSteps"
  );

  container.innerHTML = "";

  (actions || []).forEach((action, index) => {
    const card = document.createElement("article");
    card.className = "action-step-card";

    const number = document.createElement("span");
    number.textContent = `0${index + 1}`;

    const text = document.createElement("p");
    text.textContent = action;

    card.append(number, text);
    container.appendChild(card);
  });
}


function getPlanStorageKey(reflectionId) {
  return `${PLAN_PROGRESS_PREFIX}${reflectionId}`;
}


function loadCompletedDays(reflectionId) {
  try {
    const stored = localStorage.getItem(
      getPlanStorageKey(reflectionId)
    );

    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}


function saveCompletedDays(
  reflectionId,
  completedDays
) {
  localStorage.setItem(
    getPlanStorageKey(reflectionId),
    JSON.stringify(completedDays)
  );
}


function renderPlan(reflectionId, plan) {
  const container = document.getElementById(
    "planCards"
  );

  container.innerHTML = "";

  let completedDays = loadCompletedDays(
    reflectionId
  );

  (plan || []).forEach((item, index) => {
    const day = item.day || index + 1;

    const card = document.createElement("article");
    card.className = "plan-card";

    const number = document.createElement("span");
    number.className = "day-number";
    number.textContent = `Day ${day}`;

    const content = document.createElement("div");

    const title = document.createElement("h3");
    title.textContent = item.title;

    const action = document.createElement("p");
    action.textContent = item.action;

    content.append(title, action);

    const button = document.createElement("button");
    button.type = "button";
    button.className = "complete-button";

    function updateCardState() {
      const completed = completedDays.includes(day);

      card.classList.toggle("completed", completed);
      button.textContent = completed
        ? "Completed ✓"
        : "Mark Complete";
    }

    button.addEventListener("click", () => {
      if (completedDays.includes(day)) {
        completedDays = completedDays.filter(
          (value) => value !== day
        );
      } else {
        completedDays.push(day);
      }

      saveCompletedDays(
        reflectionId,
        completedDays
      );

      updateCardState();
      updatePlanProgress(completedDays.length);
    });

    card.append(number, content, button);
    container.appendChild(card);

    updateCardState();
  });

  updatePlanProgress(completedDays.length);
}


function updatePlanProgress(completed) {
  document.getElementById(
    "completedCount"
  ).textContent = `${completed} of 7`;

  document.getElementById(
    "planProgressBar"
  ).style.width = `${(completed / 7) * 100}%`;
}


function buildCopyText(data) {
  const actions = (data.action_steps || [])
    .map((item) => `- ${item}`)
    .join("\n");

  const plan = (data.seven_day_plan || [])
    .map(
      (item) =>
        `Day ${item.day}: ${item.title}\n${item.action}`
    )
    .join("\n\n");

  return [
    "FutureSelfAI Plan",
    "",
    `Mindset Score: ${data.mindset_score}/100`,
    `Main Focus: ${data.primary_focus}`,
    "",
    "What May Be Happening",
    data.current_pattern,
    "",
    "Your Opportunity",
    data.future_opportunity,
    "",
    "Message From Future You",
    data.future_message,
    "",
    "First Three Moves",
    actions,
    "",
    "Seven-Day Plan",
    plan,
  ].join("\n");
}


copyBtn.addEventListener("click", async () => {
  if (!latestReflection) {
    return;
  }

  try {
    await navigator.clipboard.writeText(
      buildCopyText(latestReflection)
    );

    copyBtn.textContent = "Copied!";

    setTimeout(() => {
      copyBtn.textContent = "Copy Plan";
    }, 1500);
  } catch {
    copyBtn.textContent = "Copy Failed";
  }
});


async function loadHistory() {
  historyList.innerHTML = "";

  try {
    const data = await requestJson(
      `/history/${encodeURIComponent(clientId)}`
    );

    const reflections = data.reflections || [];

    if (reflections.length === 0) {
      historyList.innerHTML = `
        <p class="empty-history">
          No check-ins yet. Your agent memory will appear here.
        </p>
      `;

      return;
    }

    reflections.forEach((item) => {
      const card = document.createElement("article");
      card.className = "history-card";

      const date = document.createElement("time");
      const parsedDate = new Date(item.created_at);

      date.textContent = Number.isNaN(
        parsedDate.getTime()
      )
        ? item.created_at
        : parsedDate.toLocaleString();

      const title = document.createElement("h3");
      title.textContent = item.goal_detail;

      const summary = document.createElement("p");
      summary.textContent = item.summary;

      const meta = document.createElement("div");
      meta.className = "history-meta";

      const category = document.createElement("span");
      category.textContent = item.goal_category;

      const focus = document.createElement("span");
      focus.textContent =
        `Focus: ${item.primary_focus}`;

      const score = document.createElement("span");
      score.textContent =
        `Score: ${item.mindset_score}/100`;

      meta.append(category, focus, score);
      card.append(date, title, summary, meta);

      historyList.appendChild(card);
    });
  } catch {
    historyList.innerHTML = `
      <p class="empty-history">
        Previous check-ins could not be loaded.
      </p>
    `;
  }
}


clearHistoryBtn.addEventListener("click", async () => {
  const confirmed = window.confirm(
    "Clear your saved check-ins and plan progress?"
  );

  if (!confirmed) {
    return;
  }

  clearHistoryBtn.disabled = true;
  clearHistoryBtn.textContent = "Clearing...";

  try {
    await requestJson(
      `/clear-history/${encodeURIComponent(clientId)}`,
      {
        method: "DELETE",
      }
    );

    Object.keys(localStorage)
      .filter((key) =>
        key.startsWith(PLAN_PROGRESS_PREFIX)
      )
      .forEach((key) =>
        localStorage.removeItem(key)
      );

    latestReflection = null;
    hide(resultSection);
    await loadHistory();

    clearHistoryBtn.textContent = "History Cleared";

    setTimeout(() => {
      clearHistoryBtn.textContent = "Clear History";
    }, 1500);
  } catch (error) {
    showError(error.message);
    clearHistoryBtn.textContent = "Clear History";
  } finally {
    clearHistoryBtn.disabled = false;
  }
});


updateWizard();
loadHistory();