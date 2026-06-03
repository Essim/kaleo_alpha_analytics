const els = {
  generatedAt: document.querySelector("#generatedAt"),
  resetFilters: document.querySelector("#resetFilters"),
  searchInput: document.querySelector("#searchInput"),
  ageFilter: document.querySelector("#ageFilter"),
  platformFilter: document.querySelector("#platformFilter"),
  wellnessFilter: document.querySelector("#wellnessFilter"),
  downloadFilter: document.querySelector("#downloadFilter"),
  activeDaysMin: document.querySelector("#activeDaysMin"),
  activeDaysLabel: document.querySelector("#activeDaysLabel"),
  screeningOnly: document.querySelector("#screeningOnly"),
  endOnly: document.querySelector("#endOnly"),
  j7Only: document.querySelector("#j7Only"),
  allQuestionnairesOnly: document.querySelector("#allQuestionnairesOnly"),
  flagsOnly: document.querySelector("#flagsOnly"),
  progressionOnly: document.querySelector("#progressionOnly"),
  subsetSentence: document.querySelector("#subsetSentence"),
  statsGrid: document.querySelector("#statsGrid"),
  themeFilter: document.querySelector("#themeFilter"),
  mainCardsTab: document.querySelector("#mainCardsTab"),
  moreCardsTab: document.querySelector("#moreCardsTab"),
  actionCards: document.querySelector("#actionCards"),
  actionDetail: document.querySelector("#actionDetail"),
  testerList: document.querySelector("#testerList"),
  testerDetail: document.querySelector("#testerDetail"),
  sortImpact: document.querySelector("#sortImpact"),
  sortActivity: document.querySelector("#sortActivity"),
  sortScore: document.querySelector("#sortScore")
};


const themeLabels = {
  guidance: "Guidance",
  fusion: "Fusion/grid",
  questionnaire: "Questions",
  results: "Results",
  audio: "Audio",
  technical: "Technical",
  retention: "Retention",
  visual: "Visual",
  ritual: "Rituals",
  product: "Product"
};

const state = {
  data: null,
  filteredUsers: [],
  selectedActionId: null,
  selectedUserId: null,
  cardTab: "main",
  sortMode: "impact"
};

const fmt = new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 });
const pctDetailFmt = new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 });

function esc(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function compact(value, fallback = "NA") {
  if (value === null || value === undefined || value === "") return fallback;
  return String(value);
}

function num(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function median(values) {
  const clean = values.map(num).filter((v) => v !== null).sort((a, b) => a - b);
  if (!clean.length) return null;
  const mid = Math.floor(clean.length / 2);
  return clean.length % 2 ? clean[mid] : (clean[mid - 1] + clean[mid]) / 2;
}

function mean(values) {
  const clean = values.map(num).filter((v) => v !== null);
  if (!clean.length) return null;
  return clean.reduce((sum, value) => sum + value, 0) / clean.length;
}

function percent(part, total) {
  if (!total) return null;
  return (part / total) * 100;
}

function fmtNumber(value, suffix = "") {
  const n = num(value);
  if (n === null) return "NA";
  return `${fmt.format(n)}${suffix}`;
}

function fmtPct(value) {
  const n = num(value);
  if (n === null) return "NA";
  const rounded = Math.round(n);
  const detailed = `${pctDetailFmt.format(n)}%`;
  return {
    html: `<span class="pct-value" title="${esc(detailed)}">${esc(rounded)}%</span>`,
    text: `${rounded}%`,
    detailed
  };
}

function valueHtml(value) {
  if (value && typeof value === "object" && "html" in value) return value.html;
  return textWithPercentHovers(value);
}

function textWithPercentHovers(value) {
  const text = String(value ?? "");
  const percentPattern = /(-?\d+(?:[.,]\d+)?)\s*%/g;
  let html = "";
  let lastIndex = 0;
  for (const match of text.matchAll(percentPattern)) {
    html += esc(text.slice(lastIndex, match.index));
    const rawNumber = match[1];
    const numeric = Number(rawNumber.replace(",", "."));
    if (Number.isFinite(numeric)) {
      const rounded = Math.round(numeric);
      const detailed = match[0].replace(/\s+%$/, "%");
      html += `<span class="pct-value" title="${esc(detailed)}">${esc(rounded)}%</span>`;
    } else {
      html += esc(match[0]);
    }
    lastIndex = match.index + match[0].length;
  }
  html += esc(text.slice(lastIndex));
  return html;
}

function optionList(select, values, allLabel) {
  const unique = [...new Set(values.filter(Boolean))].sort((a, b) => String(a).localeCompare(String(b)));
  select.innerHTML = [`<option value="">${esc(allLabel)}</option>`, ...unique.map((v) => `<option value="${esc(v)}">${esc(v)}</option>`)].join("");
}

function truthySignal(user, key) {
  return Boolean(user.signals && user.signals[key]);
}

function getFilters() {
  return {
    search: els.searchInput.value.trim().toLowerCase(),
    age: els.ageFilter.value,
    platform: els.platformFilter.value,
    wellness: els.wellnessFilter.value,
    download: els.downloadFilter.value,
    activeDaysMin: Number(els.activeDaysMin.value) || 0,
    screeningOnly: els.screeningOnly.checked,
    endOnly: els.endOnly.checked,
    j7Only: els.j7Only.checked,
    allQuestionnairesOnly: els.allQuestionnairesOnly.checked,
    flagsOnly: els.flagsOnly.checked,
    progressionOnly: els.progressionOnly.checked,
    theme: els.themeFilter.value
  };
}

function searchableText(user) {
  const q = user.questionnaire;
  return [
    user.id,
    ...(user.platforms || []),
    ...(user.clientVersions || []),
    q?.screening?.age,
    q?.screening?.profession,
    q?.screening?.wellnessApps,
    q?.internal?.frustrations,
    q?.internal?.barriers,
    q?.j7?.thought,
    q?.j7?.download,
    ...(q?.j7?.liked || []),
    ...(q?.j7?.disliked || [])
  ].filter(Boolean).join(" ").toLowerCase();
}

function userMatchesFilters(user, filters) {
  const q = user.questionnaire;
  const metrics = user.metrics || {};
  if (filters.search && !searchableText(user).includes(filters.search)) return false;
  if (filters.age && q?.screening?.age !== filters.age) return false;
  if (filters.platform && !(user.platforms || []).includes(filters.platform)) return false;
  if (filters.wellness && q?.screening?.wellnessApps !== filters.wellness) return false;
  if (filters.download && q?.j7?.download !== filters.download) return false;
  if ((metrics.activeDays || 0) < filters.activeDaysMin) return false;
  if (filters.screeningOnly && !user.hasScreening) return false;
  if (filters.endOnly && !user.hasEndQuestionnaire) return false;
  if (filters.j7Only && !user.hasJ7) return false;
  if (filters.allQuestionnairesOnly && !user.hasAllQuestionnaires) return false;
  if (filters.flagsOnly && !truthySignal(user, "coherenceFlag")) return false;
  if (filters.progressionOnly && !truthySignal(user, "progressionBlock")) return false;
  return true;
}

function initFilters(data) {
  optionList(els.ageFilter, data.users.map((u) => u.questionnaire?.screening?.age), "All ages");
  optionList(els.platformFilter, data.users.flatMap((u) => u.platforms || []), "All platforms");
  optionList(els.wellnessFilter, data.users.map((u) => u.questionnaire?.screening?.wellnessApps), "All profiles");
  optionList(els.downloadFilter, data.users.map((u) => u.questionnaire?.j7?.download), "All intents");
  const themeValues = [...(data.mainCards || []), ...(data.actionCards || [])].map((c) => c.theme).map((t) => themeLabels[t] ? t : "product");
  optionList(els.themeFilter, themeValues, "All card themes");
  [...els.themeFilter.options].forEach((option) => {
    if (option.value) option.textContent = themeLabels[option.value] || option.value;
  });
  const maxActiveDays = Math.max(...data.users.map((u) => u.metrics?.activeDays || 0), 1);
  els.activeDaysMin.max = String(Math.ceil(maxActiveDays));
}

function bindEvents() {
  [
    els.searchInput,
    els.ageFilter,
    els.platformFilter,
    els.wellnessFilter,
    els.downloadFilter,
    els.activeDaysMin,
    els.screeningOnly,
    els.endOnly,
    els.j7Only,
    els.allQuestionnairesOnly,
    els.flagsOnly,
    els.progressionOnly,
    els.themeFilter
  ].forEach((el) => el.addEventListener("input", render));

  els.resetFilters.addEventListener("click", () => {
    [
      els.searchInput,
      els.ageFilter,
      els.platformFilter,
      els.wellnessFilter,
      els.downloadFilter,
      els.themeFilter
    ].forEach((el) => { el.value = ""; });
    els.activeDaysMin.value = "0";
    [
      els.screeningOnly,
      els.endOnly,
      els.j7Only,
      els.allQuestionnairesOnly,
      els.flagsOnly,
      els.progressionOnly
    ].forEach((el) => { el.checked = false; });
    render();
  });

  [
    [els.sortImpact, "impact"],
    [els.sortActivity, "activity"],
    [els.sortScore, "score"]
  ].forEach(([button, mode]) => {
    button.addEventListener("click", () => {
      state.sortMode = mode;
      [els.sortImpact, els.sortActivity, els.sortScore].forEach((b) => b.classList.remove("active"));
      button.classList.add("active");
      renderTesterList();
    });
  });

  [
    [els.mainCardsTab, "main"],
    [els.moreCardsTab, "more"]
  ].forEach(([button, tab]) => {
    button.addEventListener("click", () => {
      state.cardTab = tab;
      state.selectedActionId = null;
      els.mainCardsTab.classList.toggle("active", tab === "main");
      els.moreCardsTab.classList.toggle("active", tab === "more");
      renderActionCards();
      renderActionDetail();
    });
  });
}

function computeStats(users) {
  const j7Users = users.filter((u) => u.hasJ7);
  const withScore = j7Users.filter((u) => num(u.questionnaire?.j7?.score) !== null);
  return {
    total: users.length,
    screening: users.filter((u) => u.hasScreening).length,
    end: users.filter((u) => u.hasEndQuestionnaire).length,
    j7: j7Users.length,
    fullChain: users.filter((u) => u.hasAllQuestionnaires).length,
    activeDaysMedian: median(users.map((u) => u.metrics?.activeDays)),
    activeHoursMedian: median(users.map((u) => u.metrics?.activeHours)),
    d7: percent(users.filter((u) => u.metrics?.retainedD7 === 1).length, users.length),
    firstRecipe: percent(users.filter((u) => u.metrics?.reachedFirstRecipe === 1).length, users.length),
    j7Score: mean(withScore.map((u) => u.questionnaire.j7.score)),
    progressionBlock: percent(j7Users.filter((u) => truthySignal(u, "progressionBlock")).length, j7Users.length),
    downloadPositive: percent(j7Users.filter((u) => truthySignal(u, "downloadPositive")).length, j7Users.length),
    failedMergeMedian: median(users.map((u) => u.metrics?.failedMergeRatio).filter((v) => v !== null).map((v) => v * 100)),
    flags: users.filter((u) => truthySignal(u, "coherenceFlag")).length
  };
}

function spark(percentValue, color = "var(--green)") {
  const value = Math.max(0, Math.min(100, Number(percentValue) || 0));
  return `<svg class="spark" viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true">
    <rect x="0" y="3" width="100" height="4" rx="2" fill="#e7ece9"></rect>
    <rect x="0" y="3" width="${value}" height="4" rx="2" fill="${color}"></rect>
  </svg>`;
}

function renderStats(users) {
  const s = computeStats(users);
  const cards = [
    ["Filtered testers", fmtNumber(s.total), percent(s.total, state.data.users.length), "var(--blue)"],
    ["Screening coverage", fmtPct(percent(s.screening, s.total)), percent(s.screening, s.total), "var(--green)"],
    ["End questionnaire", fmtPct(percent(s.end, s.total)), percent(s.end, s.total), "var(--green)"],
    ["J+7 coverage", fmtPct(percent(s.j7, s.total)), percent(s.j7, s.total), "var(--violet)"],
    ["Full chain", fmtPct(percent(s.fullChain, s.total)), percent(s.fullChain, s.total), "var(--violet)"],
    ["Median active days", fmtNumber(s.activeDaysMedian), Math.min(100, (s.activeDaysMedian || 0) * 5), "var(--blue)"],
    ["Median active hours", fmtNumber(s.activeHoursMedian, "h"), Math.min(100, (s.activeHoursMedian || 0) * 20), "var(--blue)"],
    ["D7 retained", fmtPct(s.d7), s.d7, "var(--green)"],
    ["First recipe reached", fmtPct(s.firstRecipe), s.firstRecipe, "var(--green)"],
    ["J+7 score avg", fmtNumber(s.j7Score, "/10"), (s.j7Score || 0) * 10, "var(--amber)"],
    ["Progression block", fmtPct(s.progressionBlock), s.progressionBlock, "var(--red)"],
    ["Download positive", fmtPct(s.downloadPositive), s.downloadPositive, "var(--green)"]
  ];
  els.statsGrid.innerHTML = cards.map(([label, value, bar, color]) => `
    <article class="stat-card">
      <div class="label">${esc(label)}</div>
      <div class="value">${valueHtml(value)}</div>
      ${spark(bar, color)}
    </article>
  `).join("");
  els.subsetSentence.textContent = `${s.total} / ${state.data.users.length} testers in the current subset. ${s.flags} coherence flag carriers remain visible.`;
}

function actionCardsForView() {
  const filters = getFilters();
  const source = state.cardTab === "main" ? (state.data.mainCards || []) : (state.data.actionCards || []);
  return source
    .filter((card) => !filters.theme || card.theme === filters.theme)
    .sort((a, b) => {
      if (state.cardTab === "main") return a.id.localeCompare(b.id);
      return b.severity - a.severity || a.id.localeCompare(b.id);
    });
}

function cardKindLabel(card) {
  if (card.kind === "strength") return "Strength";
  if (card.kind === "weakness") return "Weakness";
  return card.priority || "Card";
}

function cardActionLabel(card) {
  if (card.kind === "strength") return "Leverage";
  if (card.kind === "weakness") return "Action";
  return "Next";
}

function cardPills(card) {
  if (card.kind) {
    return `
      <span class="pill kind-${esc(card.kind)}">${esc(cardKindLabel(card))}</span>
      <span class="pill theme">${esc(themeLabels[card.theme] || card.theme)}</span>
    `;
  }
  return `
    <span class="pill priority-${esc(card.priority.toLowerCase())}">${esc(card.priority)}</span>
    <span class="pill theme">${esc(themeLabels[card.theme] || card.theme)}</span>
  `;
}

function renderActionCards() {
  const cards = actionCardsForView();
  if (!cards.some((card) => card.id === state.selectedActionId)) {
    state.selectedActionId = cards[0]?.id || null;
  }
  els.actionCards.innerHTML = cards.map((card) => `
    <button class="action-card ${card.kind ? "main-card" : ""} ${card.id === state.selectedActionId ? "is-selected" : ""}" data-action-id="${esc(card.id)}" data-priority="${esc(card.priority || "")}" data-kind="${esc(card.kind || "")}" type="button">
      <div class="card-kicker">
        ${cardPills(card)}
      </div>
      <h3>${esc(card.title)}</h3>
      <p>${textWithPercentHovers(card.mainEvidence)}</p>
      <p><strong>${esc(cardActionLabel(card))}:</strong> ${textWithPercentHovers(card.nextAction)}</p>
    </button>
  `).join("");
  els.actionCards.querySelectorAll("[data-action-id]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedActionId = button.dataset.actionId;
      renderActionCards();
      renderActionDetail();
    });
  });
}

function userMatchesTheme(user, theme) {
  switch (theme) {
    case "guidance":
      return truthySignal(user, "progressionBlock");
    case "fusion":
      return truthySignal(user, "fusionBlock") || (user.metrics?.failedMergeRatio || 0) >= 0.3 || (user.metrics?.gridFillPct || 0) >= 50;
    case "questionnaire":
      return truthySignal(user, "questionnaireFriction") || (user.metrics?.questionRepeats || 0) >= 5;
    case "results":
      return truthySignal(user, "resultsInterest") || (user.metrics?.observatoryVisits || 0) > 0;
    case "audio":
      return truthySignal(user, "likedMusic") || truthySignal(user, "dislikedMusic") || user.questionnaire?.j7?.sound;
    case "technical":
      return truthySignal(user, "technicalBlock") || truthySignal(user, "notificationIssue");
    case "retention":
      return truthySignal(user, "downloadPositive") || truthySignal(user, "powerUser") || user.metrics?.retainedD7 === 1;
    case "visual":
      return truthySignal(user, "likedGraphics");
    case "ritual":
      return truthySignal(user, "ritualEngaged");
    default:
      return truthySignal(user, "coherenceFlag") || user.hasJ7;
  }
}

function themeImpact(theme, users) {
  const relevant = users.filter((user) => userMatchesTheme(user, theme));
  const j7Users = users.filter((u) => u.hasJ7);
  const items = {
    guidance: [
      ["Relevant users", relevant.length],
      ["J+7 progression block", fmtPct(percent(users.filter((u) => truthySignal(u, "progressionBlock")).length, j7Users.length))],
      ["Median active days", fmtNumber(median(relevant.map((u) => u.metrics?.activeDays)))],
      ["Full chain users", users.filter((u) => u.hasAllQuestionnaires).length],
      ["Coherence flags", users.filter((u) => truthySignal(u, "coherenceFlag")).length],
      ["First recipe reached", fmtPct(percent(users.filter((u) => u.metrics?.reachedFirstRecipe === 1).length, users.length))]
    ],
    fusion: [
      ["Relevant users", relevant.length],
      ["Failed merge median", fmtPct(median(relevant.map((u) => u.metrics?.failedMergeRatio).filter((v) => v !== null).map((v) => v * 100)))],
      ["Grid fill median", fmtPct(median(relevant.map((u) => u.metrics?.gridFillPct)))],
      ["Interactions / recipe", fmtNumber(median(relevant.map((u) => u.metrics?.interactionsPerRecipe)))],
      ["Runtime error users", relevant.filter((u) => (u.metrics?.runtimeErrors || 0) > 0).length],
      ["J+7 fusion blocks", relevant.filter((u) => u.questionnaire?.j7?.blockers?.fusion === "Oui").length]
    ],
    questionnaire: [
      ["Relevant users", relevant.length],
      ["BFI distinct median", fmtNumber(median(relevant.map((u) => u.metrics?.bfiDistinct)))],
      ["Question repeats median", fmtNumber(median(relevant.map((u) => u.metrics?.questionRepeats)))],
      ["Question instances median", fmtNumber(median(relevant.map((u) => u.metrics?.questionnaireInstances)))],
      ["J+7 disliked questions", relevant.filter((u) => (u.questionnaire?.j7?.disliked || []).some((x) => x.includes("questionnement"))).length],
      ["Seconds / question", fmtNumber(median(relevant.map((u) => u.metrics?.secondsPerQuestion)), "s")]
    ],
    results: [
      ["Relevant users", relevant.length],
      ["Observatory visits median", fmtNumber(median(relevant.map((u) => u.metrics?.observatoryVisits)))],
      ["Journal open median", fmtPct(median(relevant.map((u) => u.metrics?.journalOpenRate).filter((v) => v !== null).map((v) => v * 100)))],
      ["J+7 liked results", relevant.filter((u) => (u.questionnaire?.j7?.liked || []).some((x) => x.includes("résultats"))).length],
      ["Download positive", fmtPct(percent(relevant.filter((u) => truthySignal(u, "downloadPositive")).length, relevant.length))],
      ["Score avg", fmtNumber(mean(relevant.map((u) => u.questionnaire?.j7?.score)), "/10")]
    ],
    audio: [
      ["Relevant users", relevant.length],
      ["Liked music", relevant.filter((u) => truthySignal(u, "likedMusic")).length],
      ["Disliked music", relevant.filter((u) => truthySignal(u, "dislikedMusic")).length],
      ["Volume session median", fmtPct(median(relevant.map((u) => u.metrics?.soundSessionRate).filter((v) => v !== null).map((v) => v * 100)))],
      ["J+7 sound answers", relevant.filter((u) => u.questionnaire?.j7?.sound).length],
      ["Strict contradictions", relevant.filter((u) => (u.metrics?.soundSessionRate || 0) === 0 && /haut-parleurs|casque/i.test(u.questionnaire?.j7?.sound || "")).length]
    ],
    technical: [
      ["Relevant users", relevant.length],
      ["Runtime error users", relevant.filter((u) => (u.metrics?.runtimeErrors || 0) > 0).length],
      ["Notification error users", relevant.filter((u) => (u.metrics?.notificationRuntimeErrors || 0) > 0).length],
      ["p95 load median", fmtNumber(median(relevant.map((u) => u.metrics?.p95LoadMs)), "ms")],
      ["Low FPS median", fmtPct(median(relevant.map((u) => u.metrics?.lowFpsRate).filter((v) => v !== null).map((v) => v * 100)))],
      ["Tech blocks J+7", relevant.filter((u) => u.questionnaire?.j7?.blockers?.technical === "Oui").length]
    ],
    retention: [
      ["Relevant users", relevant.length],
      ["D7 retained", fmtPct(percent(relevant.filter((u) => u.metrics?.retainedD7 === 1).length, relevant.length))],
      ["Download positive", fmtPct(percent(relevant.filter((u) => truthySignal(u, "downloadPositive")).length, relevant.length))],
      ["Median active days", fmtNumber(median(relevant.map((u) => u.metrics?.activeDays)))],
      ["Median active hours", fmtNumber(median(relevant.map((u) => u.metrics?.activeHours)), "h")],
      ["High J+7 score", relevant.filter((u) => truthySignal(u, "highScore")).length]
    ],
    visual: [
      ["Relevant users", relevant.length],
      ["J+7 liked graphics", relevant.filter((u) => (u.questionnaire?.j7?.liked || []).some((x) => x.includes("graphique"))).length],
      ["High score users", relevant.filter((u) => truthySignal(u, "highScore")).length],
      ["Median active days", fmtNumber(median(relevant.map((u) => u.metrics?.activeDays)))],
      ["Download positive", fmtPct(percent(relevant.filter((u) => truthySignal(u, "downloadPositive")).length, relevant.length))],
      ["Coherence flags", relevant.filter((u) => truthySignal(u, "coherenceFlag")).length]
    ],
    ritual: [
      ["Relevant users", relevant.length],
      ["Rituals median", fmtNumber(median(relevant.map((u) => u.metrics?.ritualCompleted)))],
      ["Completion median", fmtPct(median(relevant.map((u) => u.metrics?.ritualCompletionRate).filter((v) => v !== null).map((v) => v * 100)))],
      ["Power users", relevant.filter((u) => truthySignal(u, "powerUser")).length],
      ["J+7 positive download", fmtPct(percent(relevant.filter((u) => truthySignal(u, "downloadPositive")).length, relevant.length))],
      ["Progression blocks", relevant.filter((u) => truthySignal(u, "progressionBlock")).length]
    ]
  };
  return items[theme] || [
    ["Relevant users", relevant.length],
    ["Active days median", fmtNumber(median(relevant.map((u) => u.metrics?.activeDays)))],
    ["J+7 score", fmtNumber(mean(relevant.map((u) => u.questionnaire?.j7?.score)), "/10")],
    ["Download positive", fmtPct(percent(relevant.filter((u) => truthySignal(u, "downloadPositive")).length, relevant.length))],
    ["Flags", relevant.filter((u) => truthySignal(u, "coherenceFlag")).length],
    ["J+7 users", relevant.filter((u) => u.hasJ7).length]
  ];
}

function scoreUserImpact(user) {
  return (truthySignal(user, "coherenceFlag") ? 8 : 0)
    + (truthySignal(user, "progressionBlock") ? 5 : 0)
    + (truthySignal(user, "fusionBlock") ? 3 : 0)
    + (truthySignal(user, "technicalBlock") ? 3 : 0)
    + (truthySignal(user, "lowScore") ? 3 : 0)
    + Math.min(user.metrics?.activeDays || 0, 10) * 0.3;
}

function sortedSupportingUsers(theme, users, limit = 10) {
  return users
    .filter((user) => userMatchesTheme(user, theme))
    .sort((a, b) => scoreUserImpact(b) - scoreUserImpact(a))
    .slice(0, limit);
}

function sourceLinesForCard(card, users) {
  const visibleIds = new Set(users.map((u) => u.id));
  return state.data.sourceLines
    .filter((line) => {
      if (line.userId && !visibleIds.has(line.userId)) return false;
      if (line.cardId) return line.cardId === card.id;
      return line.theme === card.theme || card.relatedEvidenceIds?.some((id) => line.id.startsWith(id));
    })
    .slice(0, 80);
}

function renderActionDetail() {
  const activeCards = actionCardsForView();
  const allCards = [...(state.data.mainCards || []), ...(state.data.actionCards || [])];
  const card = activeCards.find((item) => item.id === state.selectedActionId) || allCards.find((item) => item.id === state.selectedActionId) || activeCards[0];
  if (!card) {
    els.actionDetail.innerHTML = `<div class="empty-state">No card available.</div>`;
    return;
  }
  const impacts = themeImpact(card.theme, state.filteredUsers);
  const sources = sourceLinesForCard(card, state.filteredUsers);
  const supporters = sortedSupportingUsers(card.theme, state.filteredUsers);
  const relatedMainCards = (state.data.mainCards || []).filter((item) => item.theme === card.theme && item.id !== card.id);
  els.actionDetail.innerHTML = `
    <article class="detail-card">
      <div class="detail-header">
        <div class="pill-row">
          ${cardPills(card)}
          <span class="pill">${esc(card.status)}</span>
        </div>
        <h2>${esc(card.title)}</h2>
        <p>${textWithPercentHovers(card.mainEvidence)}</p>
        <p><strong>${esc(cardActionLabel(card))}:</strong> ${textWithPercentHovers(card.nextAction)}</p>
      </div>
      <div class="detail-body">
        <section class="detail-section">
          <h3>Subset impact</h3>
          <div class="impact-grid">
            ${impacts.map(([label, value]) => `
              <div class="mini-card"><span>${esc(label)}</span><strong>${valueHtml(value)}</strong></div>
            `).join("")}
          </div>
        </section>

        <details class="detail-section detail-disclosure">
          <summary>
            <span>Issued from these lines</span>
            <small>${esc(sources.length)} source${sources.length === 1 ? "" : "s"}</small>
          </summary>
          <div class="evidence-list">
            ${sources.length ? sources.map((line) => evidenceLine(line)).join("") : `<div class="empty-state">No source line remains in this filtered subset.</div>`}
          </div>
        </details>

        <section class="detail-section">
          <h3>Related main cards</h3>
          <div class="evidence-list">
            ${relatedMainCards.length ? relatedMainCards.map((item) => `
              <article class="evidence-line">
                <span class="source">${esc(cardKindLabel(item))} · ${esc(item.id)}</span>
                <p><strong>${textWithPercentHovers(item.title)}</strong></p>
                ${(item.evidence || []).slice(0, 3).map((proof) => `<small>${textWithPercentHovers(proof)}</small>`).join("")}
              </article>
            `).join("") : `<div class="empty-state">No related main card in this theme.</div>`}
          </div>
        </section>

        <section class="detail-section">
          <h3>Tester examples</h3>
          <div class="evidence-list">
            ${supporters.length ? supporters.map((user) => testerExample(user)).join("") : `<div class="empty-state">No tester in the current subset matches this theme.</div>`}
          </div>
        </section>
      </div>
    </article>
  `;
  els.actionDetail.querySelectorAll("[data-user-pick]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedUserId = button.dataset.userPick;
      renderTesterList();
      renderTesterDetail();
      document.querySelector(".tester-explorer")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function evidenceLine(line) {
  return `
    <article class="evidence-line">
      <span class="source">${esc(line.source)}${line.userId ? ` · ${esc(line.userId)}` : ""}</span>
      <p>${textWithPercentHovers(line.text)}</p>
      ${line.context ? `<small>${textWithPercentHovers(line.context)}</small>` : ""}
    </article>
  `;
}

function testerExample(user) {
  const flags = user.questionnaire?.internal?.flags || [];
  const liked = user.questionnaire?.j7?.liked || [];
  const disliked = user.questionnaire?.j7?.disliked || [];
  return `
    <button class="tester-row" type="button" data-user-pick="${esc(user.id)}">
      <div class="tester-row__top">
        <strong>${esc(user.id)}</strong>
        <small>${fmtNumber(user.metrics?.activeDays)}d · ${fmtNumber(user.metrics?.activeHours, "h")} · score ${fmtNumber(user.questionnaire?.j7?.score, "/10")}</small>
      </div>
      <small>${textWithPercentHovers([flags[0], liked[0] && `Liked: ${liked[0]}`, disliked[0] && `Disliked: ${disliked[0]}`].filter(Boolean).join(" · ") || "No questionnaire line in this theme.")}</small>
    </button>
  `;
}

function usersForList() {
  const users = [...state.filteredUsers];
  if (state.sortMode === "activity") {
    users.sort((a, b) => (b.metrics?.activeDays || 0) - (a.metrics?.activeDays || 0) || (b.metrics?.activeHours || 0) - (a.metrics?.activeHours || 0));
  } else if (state.sortMode === "score") {
    users.sort((a, b) => (b.questionnaire?.j7?.score ?? -1) - (a.questionnaire?.j7?.score ?? -1));
  } else {
    users.sort((a, b) => scoreUserImpact(b) - scoreUserImpact(a));
  }
  return users;
}

function renderTesterList() {
  const users = usersForList();
  if (!users.some((user) => user.id === state.selectedUserId)) {
    state.selectedUserId = users[0]?.id || null;
  }
  els.testerList.innerHTML = users.map((user) => {
    const m = user.metrics || {};
    const score = user.questionnaire?.j7?.score;
    const barValue = Math.min(100, ((m.activeDays || 0) / Math.max(Number(els.activeDaysMin.max) || 1, 1)) * 100);
    return `
      <button class="tester-row ${user.id === state.selectedUserId ? "is-selected" : ""}" type="button" data-user-id="${esc(user.id)}">
        <div class="tester-row__top">
          <strong>${esc(user.id)}</strong>
          <small>${user.hasAllQuestionnaires ? "full chain" : [user.hasScreening && "screening", user.hasEndQuestionnaire && "end", user.hasJ7 && "J+7"].filter(Boolean).join(" + ") || "metrics only"}</small>
        </div>
        <div class="pill-row">
          ${truthySignal(user, "progressionBlock") ? `<span class="pill priority-p0">progression</span>` : ""}
          ${truthySignal(user, "coherenceFlag") ? `<span class="pill priority-p1">flag</span>` : ""}
          ${truthySignal(user, "downloadPositive") ? `<span class="pill">download +</span>` : ""}
        </div>
        <small>${fmtNumber(m.activeDays)} active days · ${fmtNumber(m.sessions)} sessions · score ${fmtNumber(score, "/10")}</small>
        <div class="bar"><span style="width:${barValue}%"></span></div>
      </button>
    `;
  }).join("") || `<div class="empty-state">No tester matches the current filters.</div>`;
  els.testerList.querySelectorAll("[data-user-id]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedUserId = button.dataset.userId;
      renderTesterList();
      renderTesterDetail();
    });
  });
  renderTesterDetail();
}

function kv(label, value) {
  const displayValue = value === null || value === undefined || value === "" ? "NA" : value;
  return `<div class="kv"><span>${esc(label)}</span><span>${valueHtml(displayValue)}</span></div>`;
}

function renderTesterDetail() {
  const user = state.filteredUsers.find((item) => item.id === state.selectedUserId);
  if (!user) {
    els.testerDetail.innerHTML = `<div class="empty-state">Select a tester to inspect their flow.</div>`;
    return;
  }
  const q = user.questionnaire || {};
  const m = user.metrics || {};
  const flags = q.internal?.flags || [];
  const confirmations = q.internal?.confirmations || [];
  const timeline = [...(user.timeline || [])].sort((a, b) => String(a.timestamp || "").localeCompare(String(b.timestamp || "")));
  els.testerDetail.innerHTML = `
    <div class="tester-detail__header">
      <div>
        <p class="eyebrow">Tester</p>
        <h2>${esc(user.id)}</h2>
        <div class="pill-row">
          ${user.hasScreening ? `<span class="pill">screening</span>` : ""}
          ${user.hasEndQuestionnaire ? `<span class="pill">end</span>` : ""}
          ${user.hasJ7 ? `<span class="pill">J+7</span>` : ""}
          ${user.hasAllQuestionnaires ? `<span class="pill theme">full chain</span>` : ""}
          ${truthySignal(user, "coherenceFlag") ? `<span class="pill priority-p1">coherence flag</span>` : ""}
        </div>
      </div>
      <div class="muted">${esc(user.platforms?.join(", ") || "NA")}<br>${esc(user.clientVersions?.join(", ") || "NA")}</div>
    </div>

    <div class="two-col">
      <section>
        <h3>Screening</h3>
        ${kv("Age", q.screening?.age)}
        ${kv("Profession", q.screening?.profession)}
        ${kv("Work rhythm", q.screening?.workRhythm)}
        ${kv("Smartphone use", q.screening?.smartphone)}
        ${kv("Wellbeing apps", q.screening?.wellnessApps)}
        ${kv("Multi-day comfort", q.screening?.multiDayComfort)}
        ${kv("Conditions", (q.screening?.conditions || []).join(" · "))}
      </section>

      <section>
        <h3>Usage metrics</h3>
        ${kv("Active days", fmtNumber(m.activeDays))}
        ${kv("Active hours", fmtNumber(m.activeHours, "h"))}
        ${kv("Sessions", fmtNumber(m.sessions))}
        ${kv("First recipe", m.reachedFirstRecipe === 1 ? `yes, ${fmtNumber(m.timeToFirstRecipeMin, " min")}` : "no")}
        ${kv("Failed merge ratio", fmtPct((m.failedMergeRatio ?? null) === null ? null : m.failedMergeRatio * 100))}
        ${kv("Grid fill", fmtPct(m.gridFillPct))}
        ${kv("BFI distinct", fmtNumber(m.bfiDistinct))}
        ${kv("Question repeats", fmtNumber(m.questionRepeats))}
        ${kv("Rituals", fmtNumber(m.ritualCompleted))}
        ${kv("Observatory visits", fmtNumber(m.observatoryVisits))}
        ${kv("Runtime errors", fmtNumber(m.runtimeErrors))}
      </section>
    </div>

    <div class="two-col">
      <section>
        <h3>End questionnaire</h3>
        ${kv("Promise", q.internal?.promise)}
        ${kv("Visual", q.internal?.visual)}
        ${kv("Frustrations", q.internal?.frustrations)}
        ${kv("Near stop", q.internal?.nearStop)}
        ${kv("Barriers", q.internal?.barriers)}
        ${kv("Rituals", q.internal?.rituals)}
        ${kv("Download now", q.internal?.download)}
      </section>
      <section>
        <h3>J+7</h3>
        ${kv("Thought of app", q.j7?.thought)}
        ${kv("Effect", q.j7?.effect)}
        ${kv("Score", q.j7?.score === null || q.j7?.score === undefined ? "NA" : `${fmtNumber(q.j7.score)}/10`)}
        ${kv("Download fuller version", q.j7?.download)}
        ${kv("Block progression", q.j7?.blockers?.progression)}
        ${kv("Block fusion", q.j7?.blockers?.fusion)}
        ${kv("Block technical", q.j7?.blockers?.technical)}
        ${kv("Liked", (q.j7?.liked || []).join(" · "))}
        ${kv("Disliked", (q.j7?.disliked || []).join(" · "))}
        ${kv("Sound", q.j7?.sound)}
      </section>
    </div>

    <section>
      <h3>Comments and coherence</h3>
      <div class="evidence-list">
        ${(q.j7?.comments || []).map((comment) => `<article class="evidence-line"><span class="source">J+7 verbatim</span><p>${textWithPercentHovers(comment)}</p></article>`).join("")}
        ${flags.map((flag) => `<article class="evidence-line"><span class="source">Coherence flag</span><p>${textWithPercentHovers(flag)}</p></article>`).join("")}
        ${confirmations.slice(0, 6).map((line) => `<article class="evidence-line"><span class="source">Confirmation</span><p>${textWithPercentHovers(line)}</p></article>`).join("")}
        ${!(q.j7?.comments || []).length && !flags.length && !confirmations.length ? `<div class="empty-state">No qualitative line attached to this tester.</div>` : ""}
      </div>
    </section>

    <section>
      <h3>Playtest flow (${timeline.length} events)</h3>
      <div class="timeline">
        ${timeline.length ? timeline.map((event) => `
          <div class="timeline-item">
            <time>${esc(event.timestamp || "NA")}</time>
            <div>
              <strong>${esc(event.event || "event")}</strong>
              <p>${textWithPercentHovers([event.platform, event.version, event.details].filter(Boolean).join(" · "))}</p>
            </div>
          </div>
        `).join("") : `<div class="empty-state">No timeline available.</div>`}
      </div>
    </section>
  `;
}

function render() {
  const filters = getFilters();
  els.activeDaysLabel.textContent = filters.activeDaysMin > 0 ? `>= ${filters.activeDaysMin} days` : "0 - max";
  state.filteredUsers = state.data.users.filter((user) => userMatchesFilters(user, filters));
  renderStats(state.filteredUsers);
  renderActionCards();
  renderActionDetail();
  renderTesterList();
}

async function boot() {
  try {
    const response = await fetch("/assets/analytics-data.json");
    if (!response.ok) throw new Error(`Data request failed: ${response.status}`);
    state.data = await response.json();
    els.generatedAt.textContent = `Generated ${state.data.generatedAt}`;
    initFilters(state.data);
    bindEvents();
    state.selectedActionId = state.data.actionCards[0]?.id || null;
    render();
  } catch (error) {
    document.querySelector("#app").innerHTML = `<main class="dashboard"><div class="empty-state">Could not load analytics data: ${esc(error.message)}</div></main>`;
  }
}

boot();
