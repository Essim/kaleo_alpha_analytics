const els = {
  generatedAt: document.querySelector("#generatedAt"),
  filterCollapseToggle: document.querySelector("#filterCollapseToggle"),
  resetFilters: document.querySelector("#resetFilters"),
  searchInput: document.querySelector("#searchInput"),
  ageFilter: document.querySelector("#ageFilter"),
  platformFilter: document.querySelector("#platformFilter"),
  wellnessFilter: document.querySelector("#wellnessFilter"),
  downloadFilter: document.querySelector("#downloadFilter"),
  activeDaysMin: document.querySelector("#activeDaysMin"),
  activeDaysMetricLabel: document.querySelector("#activeDaysMetricLabel"),
  activeDaysLabel: document.querySelector("#activeDaysLabel"),
  screeningOnly: document.querySelector("#screeningOnly"),
  endOnly: document.querySelector("#endOnly"),
  j7Only: document.querySelector("#j7Only"),
  allQuestionnairesOnly: document.querySelector("#allQuestionnairesOnly"),
  flagsOnly: document.querySelector("#flagsOnly"),
  progressionOnly: document.querySelector("#progressionOnly"),
  subsetSentence: document.querySelector("#subsetSentence"),
  overviewSection: document.querySelector(".overview"),
  statsGrid: document.querySelector("#statsGrid"),
  kpiSection: document.querySelector("#kpiSection"),
  kpiSentence: document.querySelector("#kpiSentence"),
  kpiGrid: document.querySelector("#kpiGrid"),
  workbench: document.querySelector("#workbench"),
  j7MacroSection: document.querySelector("#j7MacroSection"),
  j7MacroSentence: document.querySelector("#j7MacroSentence"),
  j7MacroGrid: document.querySelector("#j7MacroGrid"),
  themeFilter: document.querySelector("#themeFilter"),
  mainCardsTab: document.querySelector("#mainCardsTab"),
  moreCardsTab: document.querySelector("#moreCardsTab"),
  cardViewModeToggle: document.querySelector("#cardViewModeToggle"),
  actionCards: document.querySelector("#actionCards"),
  actionDetail: document.querySelector("#actionDetail"),
  detailPane: document.querySelector(".detail-pane"),
  testerExplorer: document.querySelector(".tester-explorer"),
  testerList: document.querySelector("#testerList"),
  testerDetail: document.querySelector("#testerDetail"),
  sortImpact: document.querySelector("#sortImpact"),
  sortActivity: document.querySelector("#sortActivity"),
  sortScore: document.querySelector("#sortScore"),
  showOverviewSection: document.querySelector("#showOverviewSection"),
  showKpiSection: document.querySelector("#showKpiSection"),
  showCardsSection: document.querySelector("#showCardsSection"),
  showJ7Section: document.querySelector("#showJ7Section"),
  showTesterSection: document.querySelector("#showTesterSection"),
  langEn: document.querySelector("#langEn"),
  langFr: document.querySelector("#langFr")
};

const SECTION_KEYS = ["overview", "kpis", "cards", "j7", "tester"];
const DEFAULT_VISIBLE_SECTIONS = {
  overview: true,
  kpis: true,
  cards: true,
  j7: true,
  tester: true
};

function loadVisibleSections() {
  try {
    return { ...DEFAULT_VISIBLE_SECTIONS, ...JSON.parse(localStorage.getItem("kaleotopiaVisibleSections") || "{}") };
  } catch {
    return { ...DEFAULT_VISIBLE_SECTIONS };
  }
}

const UI = {
  en: {
    "app.title": "Analytics Visualizer",
    "app.documentTitle": "Kaleotopia Alpha Analytics Visualizer",
    "app.loadingData": "Loading data",
    "app.localIds": "Local tester ids only",
    "language.aria": "Language",
    "app.generatedAt": "Generated {date}",
    "app.loadError": "Could not load analytics data: {message}",
    "app.dataRequestFailed": "Data request failed: {status}",
    "filters.aria": "Dynamic filters",
    "filters.title": "Filter testers",
    "filters.collapse": "Collapse filter panel",
    "filters.expand": "Expand filter panel",
    "filters.reset": "Reset",
    "filters.search": "Search tester",
    "filters.searchPlaceholder": "KT-001, version, platform",
    "filters.age": "Age",
    "filters.platform": "Platform",
    "filters.wellbeing": "Wellbeing apps",
    "filters.downloadIntent": "J+7 download intent",
    "filters.activeDays": "Active days",
    "filters.hasScreening": "Has screening",
    "filters.hasEnd": "Has end questionnaire",
    "filters.hasJ7": "Has J+7",
    "filters.fullChain": "Full questionnaire chain",
    "filters.flagsOnly": "Coherence flags only",
    "filters.progressionOnly": "Progression block signal",
    "filters.allAges": "All ages",
    "filters.allPlatforms": "All platforms",
    "filters.allProfiles": "All profiles",
    "filters.allIntents": "All intents",
    "filters.allThemes": "All card themes",
    "filters.activeDaysMin": ">= {count} days",
    "filters.activeDaysAll": "0 - max",
    "sections.menuTitle": "Display sections",
    "sections.overview": "Macro overview",
    "sections.kpis": "KPI dashboard",
    "sections.cards": "Macro cards",
    "sections.j7Macro": "J+7 macro",
    "sections.tester": "Tester flow",
    "overview.eyebrow": "Live subset",
    "overview.title": "Macro view",
    "overview.computing": "Computing filtered population.",
    "overview.subsetSentence": "{shown} / {total} testers in the current subset. {flags} coherence flag carriers remain visible.",
    "cards.eyebrow": "Macro actions",
    "cards.title": "Cards",
    "cards.tabAria": "Card set",
    "cards.mainTab": "Main cards",
    "cards.moreTab": "More cards",
    "cards.themeAria": "Card theme",
    "cards.viewModeAria": "Switch card display mode",
    "cards.switchToDetailed": "Switch to detailed card view",
    "cards.switchToSimple": "Switch to simple card view",
    "kpis.eyebrow": "22 KPI set",
    "kpis.title": "KPI dashboard",
    "kpis.computing": "Computing KPI distribution.",
    "kpis.sentence": "{count} filtered testers · dynamic statistics over numeric KPI values.",
    "kpis.noData": "No numeric KPI value for this subset.",
    "kpis.n": "n",
    "kpis.mean": "mean",
    "kpis.median": "median",
    "kpis.std": "std dev",
    "kpis.q1": "Q1",
    "kpis.q3": "Q3",
    "j7Macro.eyebrow": "Post-alpha questionnaire",
    "j7Macro.title": "J+7 macro",
    "j7Macro.computing": "Computing J+7 distribution.",
    "j7Macro.sentence": "{count} J+7 respondents in the current filtered subset.",
    "j7Macro.noData": "No J+7 respondent in this subset.",
    "j7Macro.count": "count",
    "j7Macro.share": "share",
    "j7Macro.score": "Overall score",
    "j7Macro.thought": "Thought of the app",
    "j7Macro.effect": "Perceived positive effect",
    "j7Macro.frequency": "Natural frequency",
    "j7Macro.sound": "Sound usage",
    "j7Macro.download": "Download intent",
    "j7Macro.beta": "Beta recontact",
    "j7Macro.blockers": "Blockers",
    "j7Macro.liked": "Liked aspects",
    "j7Macro.disliked": "Disliked aspects",
    "context.title": "Criticality by context",
    "context.age": "Age",
    "context.platform": "Platform",
    "context.noData": "No contextual split available in this subset.",
    "card.kind.strength": "Strength",
    "card.kind.weakness": "Weakness",
    "card.kind.card": "Card",
    "card.action.strength": "Leverage",
    "card.action.weakness": "Action",
    "card.action.default": "Next",
    "detail.noCard": "No card available.",
    "detail.subsetImpact": "Subset impact",
    "detail.issuedFrom": "Issued from these lines",
    "detail.sourceSingular": "source",
    "detail.sourcePlural": "sources",
    "detail.noSource": "No source line remains in this filtered subset.",
    "detail.relatedMainCards": "Related main cards",
    "detail.noRelated": "No related main card in this theme.",
    "detail.testerExamples": "Tester examples",
    "detail.noTesterTheme": "No tester in the current subset matches this theme.",
    "tester.eyebrow": "Drill down",
    "tester.title": "Tester flow",
    "tester.sortImpact": "Impact",
    "tester.sortActivity": "Activity",
    "tester.sortScore": "Score",
    "tester.score": "score",
    "tester.liked": "Liked",
    "tester.disliked": "Disliked",
    "tester.noQuestionnaireLine": "No questionnaire line in this theme.",
    "tester.fullChain": "full chain",
    "tester.screening": "screening",
    "tester.end": "end",
    "tester.metricsOnly": "metrics only",
    "tester.progression": "progression",
    "tester.flag": "flag",
    "tester.downloadPositive": "download +",
    "tester.activeDays": "active days",
    "tester.sessions": "sessions",
    "tester.empty": "No tester matches the current filters.",
    "tester.select": "Select a tester to inspect their flow.",
    "tester.header": "Tester",
    "tester.coherenceFlag": "coherence flag",
    "tester.sortBy": "Sort list by",
    "tester.sortAria": "Sort tester list",
    "section.screening": "Screening",
    "section.usage": "Usage metrics",
    "section.endQuestionnaire": "End questionnaire",
    "section.j7": "J+7",
    "section.comments": "Comments and coherence",
    "section.flow": "Playtest flow ({count} events)",
    "section.flowChartTitle": "Event density over time",
    "section.flowChartSubtitle": "{buckets} time buckets · {duration} span · peak {peak} events",
    "section.flowChartFormula": "Graph formula: valid timestamped events are sorted by time. The interval from first to last event is divided into equal-width time buckets; each bar counts events whose timestamp falls in that bucket. The highlighted peak is the bucket with the highest event count. Marker positions use (event timestamp - first timestamp) / total observed duration.",
    "section.flowChartNoTime": "No timestamped event can be charted.",
    "section.flowChartKeyEvents": "Highlighted analysis points",
    "chart.events": "{count} events",
    "chart.event": "{count} event",
    "chart.peak": "Peak",
    "chart.start": "Start",
    "chart.end": "End",
    "chart.durationDays": "{count}d",
    "chart.durationHours": "{count}h",
    "chart.durationMinutes": "{count}m",
    "chart.durationSeconds": "{count}s",
    "section.noQualitative": "No qualitative line attached to this tester.",
    "section.noTimeline": "No timeline available.",
    "kv.age": "Age",
    "kv.profession": "Profession",
    "kv.workRhythm": "Work rhythm",
    "kv.smartphone": "Smartphone use",
    "kv.wellbeing": "Wellbeing apps",
    "kv.multiDay": "Multi-day comfort",
    "kv.conditions": "Conditions",
    "kv.activeDays": "Active days",
    "kv.activeHours": "Active hours",
    "kv.sessions": "Sessions",
    "kv.firstRecipe": "First recipe",
    "kv.firstRecipeYes": "yes, {value} min",
    "kv.no": "no",
    "kv.failedMerge": "Failed merge ratio",
    "kv.gridFill": "Grid fill",
    "kv.bfiDistinct": "BFI distinct",
    "kv.questionRepeats": "Question repeats",
    "kv.rituals": "Rituals",
    "kv.observatoryVisits": "Observatory visits",
    "kv.runtimeErrors": "Runtime errors",
    "kv.promise": "Promise",
    "kv.visual": "Visual",
    "kv.frustrations": "Frustrations",
    "kv.nearStop": "Near stop",
    "kv.barriers": "Barriers",
    "kv.downloadNow": "Download now",
    "kv.thought": "Thought of app",
    "kv.effect": "Effect",
    "kv.score": "Score",
    "kv.downloadFuller": "Download fuller version",
    "kv.blockProgression": "Block progression",
    "kv.blockFusion": "Block fusion",
    "kv.blockTechnical": "Block technical",
    "kv.liked": "Liked",
    "kv.disliked": "Disliked",
    "kv.sound": "Sound",
    "stat.filteredTesters": "Filtered testers",
    "stat.screeningCoverage": "Screening coverage",
    "stat.endQuestionnaire": "End questionnaire",
    "stat.j7Coverage": "J+7 coverage",
    "stat.fullChain": "Full chain",
    "stat.medianActiveDays": "Median active days",
    "stat.medianActiveHours": "Median active hours",
    "stat.d7Retained": "D7 retained",
    "stat.firstRecipeReached": "First recipe reached",
    "stat.j7ScoreAvg": "J+7 score avg",
    "stat.progressionBlock": "Progression block",
    "stat.downloadPositive": "Download positive"
  },
  fr: {
    "app.title": "Visualiseur analytique",
    "app.documentTitle": "Visualiseur analytique alpha Kaleotopia",
    "app.loadingData": "Chargement des données",
    "app.localIds": "Identifiants testeurs locaux uniquement",
    "language.aria": "Langue",
    "app.generatedAt": "Généré le {date}",
    "app.loadError": "Impossible de charger les données analytiques : {message}",
    "app.dataRequestFailed": "Requête de données échouée : {status}",
    "filters.aria": "Filtres dynamiques",
    "filters.title": "Filtrer les testeurs",
    "filters.collapse": "Replier le panneau de filtres",
    "filters.expand": "Déplier le panneau de filtres",
    "filters.reset": "Réinitialiser",
    "filters.search": "Rechercher un testeur",
    "filters.searchPlaceholder": "KT-001, version, plateforme",
    "filters.age": "Âge",
    "filters.platform": "Plateforme",
    "filters.wellbeing": "Apps bien-être",
    "filters.downloadIntent": "Intention de téléchargement J+7",
    "filters.activeDays": "Jours actifs",
    "filters.hasScreening": "A répondu au screening",
    "filters.hasEnd": "A répondu au questionnaire de fin",
    "filters.hasJ7": "A répondu au J+7",
    "filters.fullChain": "Chaîne questionnaire complète",
    "filters.flagsOnly": "Signaux de cohérence seulement",
    "filters.progressionOnly": "Signal de blocage de progression",
    "filters.allAges": "Tous les âges",
    "filters.allPlatforms": "Toutes les plateformes",
    "filters.allProfiles": "Tous les profils",
    "filters.allIntents": "Toutes les intentions",
    "filters.allThemes": "Tous les thèmes de cartes",
    "filters.activeDaysMin": ">= {count} jours",
    "filters.activeDaysAll": "0 - max",
    "sections.menuTitle": "Afficher les sections",
    "sections.overview": "Vue macro",
    "sections.kpis": "Tableau KPI",
    "sections.cards": "Cartes macro",
    "sections.j7Macro": "Macro J+7",
    "sections.tester": "Parcours testeur",
    "overview.eyebrow": "Sous-population active",
    "overview.title": "Vue macro",
    "overview.computing": "Calcul de la population filtrée.",
    "overview.subsetSentence": "{shown} / {total} testeurs dans la sous-population actuelle. {flags} porteurs de signal de cohérence restent visibles.",
    "cards.eyebrow": "Actions macro",
    "cards.title": "Cartes",
    "cards.tabAria": "Jeu de cartes",
    "cards.mainTab": "Cartes principales",
    "cards.moreTab": "Autres cartes",
    "cards.themeAria": "Thème de carte",
    "cards.viewModeAria": "Changer le mode d'affichage des cartes",
    "cards.switchToDetailed": "Passer en affichage détaillé des cartes",
    "cards.switchToSimple": "Passer en affichage simple des cartes",
    "kpis.eyebrow": "Liste des 22 KPI",
    "kpis.title": "Tableau KPI",
    "kpis.computing": "Calcul de la distribution KPI.",
    "kpis.sentence": "{count} testeurs filtrés · statistiques dynamiques sur les valeurs KPI numériques.",
    "kpis.noData": "Aucune valeur KPI numérique pour cette sous-population.",
    "kpis.n": "n",
    "kpis.mean": "moy.",
    "kpis.median": "médiane",
    "kpis.std": "écart-type",
    "kpis.q1": "Q1",
    "kpis.q3": "Q3",
    "j7Macro.eyebrow": "Questionnaire post-alpha",
    "j7Macro.title": "Macro J+7",
    "j7Macro.computing": "Calcul de la distribution J+7.",
    "j7Macro.sentence": "{count} répondants J+7 dans la sous-population filtrée.",
    "j7Macro.noData": "Aucun répondant J+7 dans cette sous-population.",
    "j7Macro.count": "nombre",
    "j7Macro.share": "part",
    "j7Macro.score": "Note globale",
    "j7Macro.thought": "Souvenir de l'app",
    "j7Macro.effect": "Effet positif perçu",
    "j7Macro.frequency": "Fréquence naturelle",
    "j7Macro.sound": "Usage du son",
    "j7Macro.download": "Intention de téléchargement",
    "j7Macro.beta": "Recontact bêta",
    "j7Macro.blockers": "Blocages",
    "j7Macro.liked": "Aspects appréciés",
    "j7Macro.disliked": "Aspects moins appréciés",
    "context.title": "Criticité par contexte",
    "context.age": "Âge",
    "context.platform": "Plateforme",
    "context.noData": "Aucune répartition contextuelle disponible dans cette sous-population.",
    "card.kind.strength": "Force",
    "card.kind.weakness": "Faiblesse",
    "card.kind.card": "Carte",
    "card.action.strength": "À exploiter",
    "card.action.weakness": "Action",
    "card.action.default": "Suite",
    "detail.noCard": "Aucune carte disponible.",
    "detail.subsetImpact": "Impact sur la sous-population",
    "detail.issuedFrom": "Issu de ces lignes",
    "detail.sourceSingular": "source",
    "detail.sourcePlural": "sources",
    "detail.noSource": "Aucune ligne source ne reste dans cette sous-population filtrée.",
    "detail.relatedMainCards": "Cartes principales liées",
    "detail.noRelated": "Aucune carte principale liée à ce thème.",
    "detail.testerExamples": "Exemples de testeurs",
    "detail.noTesterTheme": "Aucun testeur de la sous-population actuelle ne correspond à ce thème.",
    "tester.eyebrow": "Explorer",
    "tester.title": "Parcours testeur",
    "tester.sortImpact": "Impact",
    "tester.sortActivity": "Activité",
    "tester.sortScore": "Score",
    "tester.score": "score",
    "tester.liked": "Apprécié",
    "tester.disliked": "Moins apprécié",
    "tester.noQuestionnaireLine": "Aucune ligne de questionnaire dans ce thème.",
    "tester.fullChain": "chaîne complète",
    "tester.screening": "screening",
    "tester.end": "fin",
    "tester.metricsOnly": "métriques seules",
    "tester.progression": "progression",
    "tester.flag": "signal",
    "tester.downloadPositive": "téléchargement +",
    "tester.activeDays": "jours actifs",
    "tester.sessions": "sessions",
    "tester.empty": "Aucun testeur ne correspond aux filtres actuels.",
    "tester.select": "Sélectionnez un testeur pour inspecter son parcours.",
    "tester.header": "Testeur",
    "tester.coherenceFlag": "signal de cohérence",
    "tester.sortBy": "Trier la liste par",
    "tester.sortAria": "Trier la liste des testeurs",
    "section.screening": "Screening",
    "section.usage": "Métriques d'usage",
    "section.endQuestionnaire": "Questionnaire de fin",
    "section.j7": "J+7",
    "section.comments": "Commentaires et cohérence",
    "section.flow": "Parcours de playtest ({count} événements)",
    "section.flowChartTitle": "Densité d'événements dans le temps",
    "section.flowChartSubtitle": "{buckets} tranches temporelles · durée {duration} · pic {peak} événements",
    "section.flowChartFormula": "Formule du graphique : les événements avec timestamp valide sont triés par temps. L'intervalle entre premier et dernier événement est divisé en tranches temporelles de largeur égale ; chaque barre compte les événements dont le timestamp tombe dans cette tranche. Le pic mis en avant est la tranche avec le plus grand nombre d'événements. La position des marqueurs utilise (timestamp de l'événement - premier timestamp) / durée totale observée.",
    "section.flowChartNoTime": "Aucun événement horodaté ne peut être représenté.",
    "section.flowChartKeyEvents": "Points d'analyse mis en avant",
    "chart.events": "{count} événements",
    "chart.event": "{count} événement",
    "chart.peak": "Pic",
    "chart.start": "Début",
    "chart.end": "Fin",
    "chart.durationDays": "{count}j",
    "chart.durationHours": "{count}h",
    "chart.durationMinutes": "{count}min",
    "chart.durationSeconds": "{count}s",
    "section.noQualitative": "Aucune ligne qualitative rattachée à ce testeur.",
    "section.noTimeline": "Aucune timeline disponible.",
    "kv.age": "Âge",
    "kv.profession": "Profession",
    "kv.workRhythm": "Rythme de travail",
    "kv.smartphone": "Usage smartphone",
    "kv.wellbeing": "Apps bien-être",
    "kv.multiDay": "Confort multi-jours",
    "kv.conditions": "Conditions",
    "kv.activeDays": "Jours actifs",
    "kv.activeHours": "Heures actives",
    "kv.sessions": "Sessions",
    "kv.firstRecipe": "Première recette",
    "kv.firstRecipeYes": "oui, {value} min",
    "kv.no": "non",
    "kv.failedMerge": "Taux de fusions échouées",
    "kv.gridFill": "Remplissage de grille",
    "kv.bfiDistinct": "BFI distinct",
    "kv.questionRepeats": "Questions répétées",
    "kv.rituals": "Rituels",
    "kv.observatoryVisits": "Visites observatoire",
    "kv.runtimeErrors": "Erreurs runtime",
    "kv.promise": "Promesse",
    "kv.visual": "Visuel",
    "kv.frustrations": "Frustrations",
    "kv.nearStop": "Près de l'abandon",
    "kv.barriers": "Freins",
    "kv.downloadNow": "Téléchargement maintenant",
    "kv.thought": "Souvenir de l'app",
    "kv.effect": "Effet",
    "kv.score": "Score",
    "kv.downloadFuller": "Télécharger une version plus complète",
    "kv.blockProgression": "Blocage progression",
    "kv.blockFusion": "Blocage fusion",
    "kv.blockTechnical": "Blocage technique",
    "kv.liked": "Apprécié",
    "kv.disliked": "Moins apprécié",
    "kv.sound": "Son",
    "stat.filteredTesters": "Testeurs filtrés",
    "stat.screeningCoverage": "Couverture screening",
    "stat.endQuestionnaire": "Questionnaire de fin",
    "stat.j7Coverage": "Couverture J+7",
    "stat.fullChain": "Chaîne complète",
    "stat.medianActiveDays": "Jours actifs médians",
    "stat.medianActiveHours": "Heures actives médianes",
    "stat.d7Retained": "Retenus J+7",
    "stat.firstRecipeReached": "Première recette atteinte",
    "stat.j7ScoreAvg": "Score J+7 moyen",
    "stat.progressionBlock": "Blocage progression",
    "stat.downloadPositive": "Téléchargement positif"
  }
};

const themeLabels = {
  en: {
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
  },
  fr: {
    guidance: "Guidage",
    fusion: "Fusion/grille",
    questionnaire: "Questions",
    results: "Resultats",
    audio: "Audio",
    technical: "Technique",
    retention: "Retention",
    visual: "Visuel",
    ritual: "Rituels",
    product: "Produit"
  }
};

const STATUS_LABELS = {
  en: {
    "Strength": "Strength",
    "Weakness": "Weakness",
    "Partiel / en cours": "Partial / in progress",
    "Integre a revalider": "Integrated, needs validation",
    "A faire": "To do",
    "A faire / partiel tres leger": "To do / very light partial work",
    "Partiel / a corriger": "Partial / needs correction",
    "A faire / a verifier": "To do / verify",
    "Partiel / a specifier": "Partial / specify",
    "Integre a durcir": "Integrated / harden",
    "Partiel / a suivre": "Partial / monitor",
    "Partiel / a reprendre": "Partial / revisit",
    "Partiel / a revalider": "Partial / revalidate",
    "Partiel / a clarifier": "Partial / clarify"
  },
  fr: {
    "Strength": "Force",
    "Weakness": "Faiblesse",
    "Partiel / en cours": "Partiel / en cours",
    "Integre a revalider": "Intégré, à revalider",
    "A faire": "À faire",
    "A faire / partiel tres leger": "À faire / partiel très léger",
    "Partiel / a corriger": "Partiel / à corriger",
    "A faire / a verifier": "À faire / à vérifier",
    "Partiel / a specifier": "Partiel / à spécifier",
    "Integre a durcir": "Intégré / à durcir",
    "Partiel / a suivre": "Partiel / à suivre",
    "Partiel / a reprendre": "Partiel / à reprendre",
    "Partiel / a revalider": "Partiel / à revalider",
    "Partiel / a clarifier": "Partiel / à clarifier"
  }
};

const SOURCE_LABELS = {
  en: {
    "Strength summary": "Strength summary",
    "Strength action": "Strength action",
    "Strength evidence": "Strength evidence",
    "Weakness summary": "Weakness summary",
    "Weakness action": "Weakness action",
    "Weakness evidence": "Weakness evidence",
    "Action card": "Action card",
    "Entry point": "Entry point",
    "J+7 verbatim": "J+7 verbatim",
    "Bug report": "Bug report",
    "Coherence flag": "Coherence flag",
    "Coherence confirmation": "Coherence confirmation",
    "Confirmation": "Confirmation"
  },
  fr: {
    "Strength summary": "Synthèse force",
    "Strength action": "Action force",
    "Strength evidence": "Preuve force",
    "Weakness summary": "Synthèse faiblesse",
    "Weakness action": "Action faiblesse",
    "Weakness evidence": "Preuve faiblesse",
    "Action card": "Carte d'action",
    "Entry point": "Point d'entrée",
    "J+7 verbatim": "Verbatim J+7",
    "Bug report": "Rapport de bug",
    "Coherence flag": "Signal de cohérence",
    "Coherence confirmation": "Confirmation de cohérence",
    "Confirmation": "Confirmation"
  }
};

const SOURCE_LINE_COPY = {
  fr: {
    "EP-01-questionnaireWarning": {
      label: "Guidage / but de progression",
      text: "Blocage de progression J+7 25/43 (58,1 %) ; prise en main parmi les moins appréciés 21/43 (48,8 %) ; complexité comme frein d'usage régulier 14/43 (32,6 %)"
    },
    "EP-01-bugWarning": {
      label: "Guidage / but de progression",
      text: "8 / 37 bug reports OCR dédupliqués catégorisés guidage/progression bloquée"
    },
    "EP-01-metricConfirmation": {
      label: "Guidage / but de progression",
      text: "La première recette est atteinte par 84,7 %, mais les jours actifs médians sont à 3,00 et le J+7 à 23,6 %. first_post_onboarding_action est à 44,2 %, mais cet événement est partiellement limité par l'instrumentation."
    },
    "EP-01-interpretation": {
      label: "Guidage / but de progression",
      text: "Le premier moment aha existe, mais l'app n'explique pas encore assez clairement vers quoi le joueur construit après cette première découverte."
    },
    "EP-02-questionnaireWarning": {
      label: "Fusion des tuiles et saturation de grille",
      text: "Blocage fusion J+7 6/43 (14,0 %) ; expérience de jeu parmi les moins appréciées 13/43 (30,2 %) ; commentaires mentionnant fusion/tuile/grille/objet 15/43 (34,9 %)"
    },
    "EP-02-bugWarning": {
      label: "Fusion des tuiles et saturation de grille",
      text: "10 / 37 bug reports dédupliqués catégorisés tuile/fusion/grille/rituel"
    },
    "EP-02-metricConfirmation": {
      label: "Fusion des tuiles et saturation de grille",
      text: "Ratio médian de fusions échouées 29,6 % ; remplissage final médian de grille 42,0 % ; interactions médianes par recette 35,2."
    },
    "EP-02-interpretation": {
      label: "Fusion des tuiles et saturation de grille",
      text: "La fusion est à la fois exploration et friction ; l'absence de mémoire de recettes/d'objectif transforme la saturation en blocage perçu."
    },
    "EP-03-questionnaireWarning": {
      label: "Répétition du questionnaire / charge BFI",
      text: "Expérience de questionnement parmi les moins appréciées en J+7 13/43 (30,2 %) ; expérience de questionnement appréciée 16/43 (37,2 %) ; commentaires mentionnant des questions répétées 6/43 (14,0 %)"
    },
    "EP-03-bugWarning": {
      label: "Répétition du questionnaire / charge BFI",
      text: "4 / 37 bug reports catégorisés UI/logique questionnaire"
    },
    "EP-03-metricConfirmation": {
      label: "Répétition du questionnaire / charge BFI",
      text: "Médiane de questions BFI distinctes 3 / 60 ; proxy de complétion médian 5,0 % ; répétitions exactes question_shown 1741/4381 (39,7 %) ; secondes/question médianes 6,16."
    },
    "EP-03-interpretation": {
      label: "Répétition du questionnaire / charge BFI",
      text: "La charge ne vient pas du temps par question ; elle vient de la répétition sémantique perçue et de la lenteur à rendre visible la valeur du phénotype final."
    },
    "EP-04-questionnaireWarning": {
      label: "Observatoire / valeur des résultats",
      text: "Consultation des résultats appréciée en J+7 18/43 (41,9 %) ; commentaires mentionnant résultat/observatoire/carnet 2/43 (4,7 %)"
    },
    "EP-04-bugWarning": {
      label: "Observatoire / valeur des résultats",
      text: "6 / 37 bug reports catégorisés observatoire/journal/résultats"
    },
    "EP-04-metricConfirmation": {
      label: "Observatoire / valeur des résultats",
      text: "Visites observatoire médianes 3 ; taux médian d'ouverture du journal 100,0 % ; taux médian de visites hors journal 0,0 %."
    },
    "EP-04-interpretation": {
      label: "Observatoire / valeur des résultats",
      text: "L'observatoire est valorisé lorsqu'il donne un feedback personnalité/résultats, mais ses autres interactions sont sous-utilisées ou sous-instrumentées."
    },
    "EP-05-questionnaireWarning": {
      label: "Musique / son",
      text: "J+7 : 6/43 (14,0 %) ont joué sans son parce que le son ne plaisait pas ; commentaires son mentionnant musique/stress/dislike 5/43 (11,6 %)"
    },
    "EP-05-bugWarning": {
      label: "Musique / son",
      text: "2 / 37 bug reports catégorisés audio"
    },
    "EP-05-metricConfirmation": {
      label: "Musique / son",
      text: "Taux médian de sessions avec volume appareil non nul 64,3 % ; le KPI ne permet pas de savoir si la musique Kaleotopia était activée ou perçue."
    },
    "EP-05-interpretation": {
      label: "Musique / son",
      text: "L'audio est un enjeu qualitatif de design ; la télémétrie actuelle est insuffisante pour prouver autre chose qu'une plausibilité."
    },
    "EP-06-questionnaireWarning": {
      label: "Risque technique, notifications et modales",
      text: "Blocage technique J+7 3/43 (7,0 %) ; les bug reports sont plus forts que le questionnaire sur ce point."
    },
    "EP-06-bugWarning": {
      label: "Risque technique, notifications et modales",
      text: "16 / 37 bug reports catégorisés technique/runtime/modale ; 15 avaient une exception de notification dans les logs récents."
    },
    "EP-06-metricConfirmation": {
      label: "Risque technique, notifications et modales",
      text: "Erreurs runtime pour 100 sessions médianes 25,0 ; p95 de chargement médian 4 629 ms ; sessions suspectes de crash médianes 3."
    },
    "EP-06-interpretation": {
      label: "Risque technique, notifications et modales",
      text: "Le confondant technique est assez fort pour que le faible engagement ne puisse pas être lu uniquement comme un désintérêt produit."
    },
    "EP-07-questionnaireWarning": {
      label: "Forces : visuels, valeur personnalité, appétence bêta",
      text: "Graphismes appréciés en J+7 20/43 (46,5 %) ; ont pensé à l'app parfois/souvent 26/43 (60,5 %) ; téléchargeraient oui/probablement 33/43 (76,7 %) ; contact bêta accepté 33/43 (76,7 %)"
    },
    "EP-07-bugWarning": {
      label: "Forces : visuels, valeur personnalité, appétence bêta",
      text: "Les bug reports n'annulent pas le signal de valeur central ; beaucoup relèvent de frictions d'implémentation autour d'une expérience que les utilisateurs veulent encore voir clarifiée."
    },
    "EP-07-metricConfirmation": {
      label: "Forces : visuels, valeur personnalité, appétence bêta",
      text: "Les utilisateurs appariés LimeSurvey sont plus engagés que l'ensemble : heures actives médianes 0,68 pour tous les utilisateurs vs 1,36 h de médiane screening apparié dans summary_statistics_limesurvey_users_all_kpis.csv."
    },
    "EP-07-interpretation": {
      label: "Forces : visuels, valeur personnalité, appétence bêta",
      text: "Le concept a de l'attraction, surtout la personnalité/résultats et l'atmosphère visuelle, mais il a besoin d'objectifs plus clairs et de moins de friction."
    }
  }
};

const IMPACT_LABELS = {
  fr: {
    "Relevant users": "Utilisateurs concernés",
    "J+7 progression block": "Blocage progression J+7",
    "Median active days": "Jours actifs médians",
    "Full chain users": "Utilisateurs chaîne complète",
    "Coherence flags": "Signaux de cohérence",
    "First recipe reached": "Première recette atteinte",
    "Failed merge median": "Médiane fusions échouées",
    "Grid fill median": "Remplissage grille médian",
    "Interactions / recipe": "Interactions / recette",
    "Runtime error users": "Utilisateurs avec erreur runtime",
    "J+7 fusion blocks": "Blocages fusion J+7",
    "BFI distinct median": "Médiane BFI distinct",
    "Question repeats median": "Médiane questions répétées",
    "Question instances median": "Médiane instances questionnaire",
    "J+7 disliked questions": "Questions moins appréciées J+7",
    "Seconds / question": "Secondes / question",
    "Observatory visits median": "Visites observatoire médianes",
    "Journal open median": "Ouverture journal médiane",
    "J+7 liked results": "Résultats appréciés J+7",
    "Download positive": "Téléchargement positif",
    "Score avg": "Score moyen",
    "Liked music": "Musique appréciée",
    "Disliked music": "Musique moins appréciée",
    "Volume session median": "Sessions volume non nul médianes",
    "J+7 sound answers": "Réponses son J+7",
    "Strict contradictions": "Contradictions strictes",
    "Notification error users": "Utilisateurs avec erreur notification",
    "p95 load median": "Chargement p95 médian",
    "Low FPS median": "FPS bas médian",
    "Tech blocks J+7": "Blocages techniques J+7",
    "D7 retained": "Retenus J+7",
    "Median active hours": "Heures actives médianes",
    "High J+7 score": "Scores J+7 élevés",
    "J+7 liked graphics": "Graphismes appréciés J+7",
    "High score users": "Utilisateurs à score élevé",
    "Rituals median": "Rituels médians",
    "Completion median": "Complétion médiane",
    "Power users": "Power users",
    "J+7 positive download": "Téléchargement positif J+7",
    "Progression blocks": "Blocages progression",
    "Active days median": "Jours actifs médians",
    "J+7 score": "Score J+7",
    "Flags": "Signaux",
    "J+7 users": "Utilisateurs J+7"
  }
};

const METRIC_SOURCE_LOOKUP = {
  activeHours: { metric: "total_active_hours", group: "activeTime" },
  sessions: { metric: "session_count", group: "activeTime" },
  activeDays: { metric: "active_days_count", group: "retention" },
  retainedD7: { metric: "retained_d7", group: "retention" },
  timeToFirstRecipe: { metric: "time_to_recipe_1_min", group: "firstRecipe" },
  reachedFirstRecipe: { metric: "reached_recipe_1", group: "firstRecipe" },
  failedMergeRatio: { metric: "failed_merge_ratio", group: "objects" },
  gridFillPct: { metric: "final_fill_rate_pct", group: "grid" },
  bfiDistinct: { metric: "bfi_questions_distinct_shown", group: "bfi" },
  questionRepeats: { group: "questionRepeats" },
  ritualCompleted: { metric: "ritual_completed_count", group: "ritual" },
  ritualCompletionRate: { metric: "ritual_completion_rate", group: "ritual" },
  questionnaireInstances: { metric: "questionnaire_instances", group: "questionnaireLoad" },
  secondsPerQuestion: { metric: "seconds_per_question", group: "questionnaireLoad" },
  observatoryVisits: { metric: "observatory_visit_count", group: "observatory" },
  journalOpenRate: { metric: "journal_open_rate", group: "observatory" },
  runtimeErrors: { group: "runtimeEvents" },
  notificationRuntimeErrors: { group: "notificationEvents" },
  p95LoadMs: { metric: "p95_load_ms", group: "technical" },
  lowFpsRate: { metric: "low_fps_rate", group: "technical" },
  interactionsPerRecipe: { metric: "interactions_per_recipe", group: "recipeEfficiency" },
  soundSessionRate: { metric: "device_volume_nonzero_session_rate", group: "audio" },
  j7Score: { group: "j7Score" },
  screeningCompleted: { group: "screeningCompleted" },
  endCompleted: { group: "endCompleted" },
  j7Completed: { group: "j7Completed" },
  fullChain: { group: "fullChain" },
  coherenceFlag: { group: "coherenceFlag" },
  progressionBlock: { group: "progressionBlock" },
  fusionBlock: { group: "fusionBlock" },
  technicalBlock: { group: "technicalBlock" },
  notificationIssue: { group: "notificationIssue" },
  likedGraphics: { group: "likedGraphics" },
  likedMusic: { group: "likedMusic" },
  dislikedMusic: { group: "dislikedMusic" },
  questionnaireFriction: { group: "questionnaireFriction" },
  resultsInterest: { group: "resultsInterest" },
  ritualEngaged: { group: "ritualEngaged" },
  downloadPositive: { group: "downloadPositive" },
  highScore: { group: "highScore" },
  powerUser: { group: "powerUser" }
};

const METRIC_FORMULA_GROUPS = {
  en: {
    activeTime: "Per tester: total_active_hours = active seconds / 3600. Active seconds are the sum of session_end.session_duration_s; when session_end is missing, sessions are reconstructed by summing gaps between successive events, each gap capped at 300 seconds. The same KPI row also tracks observed/reconstructed session_count.",
    retention: "install_day = min(PLAYER_START_DATE, first event date). active_days_count = count distinct active local dates. An active date requires a useful event or playtest_launch/session/gameStarted. retained_d7 = 1 when the tester is active on install_day + 7, otherwise 0.",
    firstRecipe: "t0 = tutorial_completed timestamp; fallback is first_post_onboarding_action, then first useful event. Recipes are tile_merge events with first_time = 1, sorted by timestamp. reached_recipe_1 = 1 if at least one first-time recipe exists. time_to_recipe_1_min = first recipe timestamp - t0, in minutes.",
    objects: "failed_merge_ratio = merge_cancelled / (merge_cancelled + tile_merge). Null/NA when the denominator is missing or zero.",
    grid: "final_fill_rate_pct = the last logged grid fill percentage for the tester/grid. The KPI family also stores max fill, final filled tiles, and sample count; this website displays the final fill percentage.",
    bfi: "bfi_questions_distinct_shown = count distinct (questionnaire_id, question_id) from question_shown. It measures questions shown, not questions answered.",
    questionRepeats: "questionRepeats = count of repeated exact question_shown occurrences for the same tester after the first occurrence of the same question key.",
    ritual: "ritual_completed_count = count distinct ritual_id in ritual_completed. ritual_completion_rate = completed ritual events / opened ritual events; null/NA when there is no opened ritual denominator.",
    questionnaireLoad: "questionnaire_instances counts in-game questionnaire runs. seconds_per_question = questionnaire duration_s / max(question_count, 1), using questionnaire_summary/questionnaire_completed data when available.",
    observatory: "observatory_visit_count = count observatory_entered grouped by tester and observatory session. journal_open_rate = visits with journal_opened / observatory visits.",
    runtimeEvents: "runtimeErrors = count of runtime_error events attributed to this tester in the analytics flow.",
    notificationEvents: "notificationRuntimeErrors = count of runtime_error events classified as notification-related for this tester.",
    technical: "p95_load_ms is the 95th percentile of logged load_time_ms.duration_ms for the tester. low_fps_rate = count(perf_sample with avg_fps < 25 or min_fps < 20) / perf_sample_count.",
    recipeEfficiency: "interactions_per_recipe = tile_interactions / max(first_time_recipes, 1), where tile_interactions include tile_click, tile_pickup, tile_drop, tile_swap, tile_merge, and merge_cancelled.",
    audio: "device_volume_nonzero_session_rate = sessions with at least one non-zero device-volume sample / sessions with volume samples. It is a device-volume proxy, not proof that Kaleotopia music was audible or liked.",
    j7Score: "Raw J+7 questionnaire numeric answer to the global alpha experience score, parsed as a number on a 0-10 scale.",
    screeningCompleted: "hasScreening is true when a LimeSurvey screening response was matched to the local tester id.",
    endCompleted: "hasEndQuestionnaire is true when the in-game/end questionnaire was matched to the local tester id or completion event.",
    j7Completed: "hasJ7 is true when a J+7 LimeSurvey response was matched to the local tester id.",
    fullChain: "hasAllQuestionnaires is true only when the tester has screening + end questionnaire + J+7 responses.",
    coherenceFlag: "coherenceFlag is true when the qualitative coherence analysis produced at least one warning/flag for the tester.",
    progressionBlock: "progressionBlock is true when the J+7 progression blocker is yes, or end-questionnaire barriers mention what to do/progression, or the coherence flags include a progression block.",
    fusionBlock: "fusionBlock is true when the J+7 fusion blocker is yes, or end-questionnaire frustrations mention fusion/recipes, or failed_merge_ratio >= 0.30.",
    technicalBlock: "technicalBlock is true when the J+7 technical blocker is yes, or the tester has runtimeErrors > 0.",
    notificationIssue: "notificationIssue is true when notification runtime errors exist, or coherence/frustration text mentions notifications.",
    likedGraphics: "likedGraphics is true when J+7 marks graphics among liked aspects, or the end questionnaire visual answer mentions a positive/pleasant visual signal.",
    likedMusic: "likedMusic is true when J+7 marks music among liked aspects.",
    dislikedMusic: "dislikedMusic is true when J+7 marks music among disliked aspects, or the J+7 sound answer says the music did not please the tester.",
    questionnaireFriction: "questionnaireFriction is true when J+7 dislikes the questioning experience, or end-questionnaire frustrations mention questionnaires, or questionRepeats >= 10.",
    resultsInterest: "resultsInterest is true when J+7 likes results consultation, or observatoryVisits > 0.",
    ritualEngaged: "ritualEngaged is true when ritualCompleted >= 5.",
    downloadPositive: "downloadPositive is true when the J+7 fuller-version download answer is Oui or Probablement.",
    highScore: "highScore is true when the J+7 global score is >= 7/10.",
    powerUser: "powerUser is true when activeDays >= 7 or activeHours >= 2."
  },
  fr: {
    activeTime: "Par testeur : total_active_hours = secondes actives / 3600. Les secondes actives additionnent session_end.session_duration_s ; si session_end manque, les sessions sont reconstruites par somme des écarts entre événements successifs, chaque écart étant plafonné à 300 secondes. La même famille KPI suit aussi session_count observé/reconstruit.",
    retention: "install_day = min(PLAYER_START_DATE, date du premier event). active_days_count = nombre de dates locales actives distinctes. Une date active exige un event utile ou playtest_launch/session/gameStarted. retained_d7 = 1 si le testeur est actif à install_day + 7, sinon 0.",
    firstRecipe: "t0 = timestamp tutorial_completed ; fallback : first_post_onboarding_action, puis premier event utile. Les recettes sont les tile_merge avec first_time = 1, triées par timestamp. reached_recipe_1 = 1 s'il existe au moins une première recette. time_to_recipe_1_min = timestamp de première recette - t0, en minutes.",
    objects: "failed_merge_ratio = merge_cancelled / (merge_cancelled + tile_merge). Null/NA si le dénominateur manque ou vaut zéro.",
    grid: "final_fill_rate_pct = dernier pourcentage de remplissage de grille loggé pour le testeur/la grille. La famille KPI stocke aussi le remplissage max, les tuiles finales et le nombre d'échantillons ; ce site affiche le remplissage final.",
    bfi: "bfi_questions_distinct_shown = nombre distinct de (questionnaire_id, question_id) dans question_shown. Cela mesure les questions montrées, pas les questions répondues.",
    questionRepeats: "questionRepeats = nombre d'occurrences question_shown exactes répétées pour le même testeur après la première occurrence de la même clé de question.",
    ritual: "ritual_completed_count = nombre distinct de ritual_id dans ritual_completed. ritual_completion_rate = événements ritual_completed / événements ritual_opened ; null/NA lorsqu'il n'y a pas de dénominateur opened.",
    questionnaireLoad: "questionnaire_instances compte les passages de questionnaire in-game. seconds_per_question = duration_s du questionnaire / max(question_count, 1), depuis questionnaire_summary/questionnaire_completed quand disponible.",
    observatory: "observatory_visit_count = nombre d'observatory_entered groupés par testeur et session d'observatoire. journal_open_rate = visites avec journal_opened / visites observatoire.",
    runtimeEvents: "runtimeErrors = nombre d'events runtime_error attribués à ce testeur dans le flux analytique.",
    notificationEvents: "notificationRuntimeErrors = nombre d'events runtime_error classés comme liés aux notifications pour ce testeur.",
    technical: "p95_load_ms est le 95e percentile de load_time_ms.duration_ms loggé pour le testeur. low_fps_rate = count(perf_sample avec avg_fps < 25 ou min_fps < 20) / perf_sample_count.",
    recipeEfficiency: "interactions_per_recipe = tile_interactions / max(first_time_recipes, 1), où tile_interactions inclut tile_click, tile_pickup, tile_drop, tile_swap, tile_merge et merge_cancelled.",
    audio: "device_volume_nonzero_session_rate = sessions avec au moins un échantillon de volume appareil non nul / sessions avec échantillons de volume. C'est un proxy de volume appareil, pas une preuve que la musique Kaleotopia était audible ou appréciée.",
    j7Score: "Réponse numérique brute du questionnaire J+7 à la note globale de l'expérience alpha, parsée comme nombre sur une échelle 0-10.",
    screeningCompleted: "hasScreening vaut true lorsqu'une réponse LimeSurvey de screening est appariée à l'identifiant testeur local.",
    endCompleted: "hasEndQuestionnaire vaut true lorsque le questionnaire in-game/de fin est apparié à l'identifiant testeur local ou à un événement de complétion.",
    j7Completed: "hasJ7 vaut true lorsqu'une réponse LimeSurvey J+7 est appariée à l'identifiant testeur local.",
    fullChain: "hasAllQuestionnaires vaut true uniquement si le testeur possède screening + questionnaire de fin + réponse J+7.",
    coherenceFlag: "coherenceFlag vaut true lorsque l'analyse qualitative de cohérence produit au moins un avertissement/signal pour ce testeur.",
    progressionBlock: "progressionBlock vaut true si le blocage progression J+7 est oui, ou si les freins du questionnaire de fin mentionnent quoi faire/progression, ou si les flags de cohérence incluent un blocage progression.",
    fusionBlock: "fusionBlock vaut true si le blocage fusion J+7 est oui, ou si les frustrations de fin mentionnent fusion/recettes, ou si failed_merge_ratio >= 0,30.",
    technicalBlock: "technicalBlock vaut true si le blocage technique J+7 est oui, ou si runtimeErrors > 0.",
    notificationIssue: "notificationIssue vaut true si des erreurs runtime de notification existent, ou si les textes de cohérence/frustration mentionnent les notifications.",
    likedGraphics: "likedGraphics vaut true si le J+7 cite les graphismes parmi les aspects appréciés, ou si la réponse visuelle de fin mentionne un signal visuel positif/agréable.",
    likedMusic: "likedMusic vaut true si le J+7 cite la musique parmi les aspects appréciés.",
    dislikedMusic: "dislikedMusic vaut true si le J+7 cite la musique parmi les aspects moins appréciés, ou si la réponse son J+7 indique que la musique n'a pas plu.",
    questionnaireFriction: "questionnaireFriction vaut true si le J+7 n'apprécie pas l'expérience de questionnement, ou si les frustrations de fin mentionnent les questionnaires, ou si questionRepeats >= 10.",
    resultsInterest: "resultsInterest vaut true si le J+7 apprécie la consultation des résultats, ou si observatoryVisits > 0.",
    ritualEngaged: "ritualEngaged vaut true si ritualCompleted >= 5.",
    downloadPositive: "downloadPositive vaut true si la réponse J+7 de téléchargement d'une version plus complète est Oui ou Probablement.",
    highScore: "highScore vaut true si le score global J+7 est >= 7/10.",
    powerUser: "powerUser vaut true si activeDays >= 7 ou activeHours >= 2."
  }
};

const THEME_MATCH_FORMULAS = {
  en: {
    guidance: "Relevant guidance users = progressionBlock.",
    fusion: "Relevant fusion/grid users = fusionBlock OR failedMergeRatio >= 0.30 OR gridFillPct >= 50.",
    questionnaire: "Relevant questionnaire users = questionnaireFriction OR questionRepeats >= 5.",
    results: "Relevant results users = resultsInterest OR observatoryVisits > 0.",
    audio: "Relevant audio users = likedMusic OR dislikedMusic OR any J+7 sound answer.",
    technical: "Relevant technical users = technicalBlock OR notificationIssue.",
    retention: "Relevant retention users = downloadPositive OR powerUser OR retainedD7 = 1.",
    visual: "Relevant visual users = likedGraphics.",
    ritual: "Relevant ritual users = ritualEngaged.",
    product: "Relevant product users = coherenceFlag OR hasJ7."
  },
  fr: {
    guidance: "Utilisateurs guidage concernés = progressionBlock.",
    fusion: "Utilisateurs fusion/grille concernés = fusionBlock OU failedMergeRatio >= 0,30 OU gridFillPct >= 50.",
    questionnaire: "Utilisateurs questionnaire concernés = questionnaireFriction OU questionRepeats >= 5.",
    results: "Utilisateurs résultats concernés = resultsInterest OU observatoryVisits > 0.",
    audio: "Utilisateurs audio concernés = likedMusic OU dislikedMusic OU toute réponse son J+7.",
    technical: "Utilisateurs technique concernés = technicalBlock OU notificationIssue.",
    retention: "Utilisateurs rétention concernés = downloadPositive OU powerUser OU retainedD7 = 1.",
    visual: "Utilisateurs visuel concernés = likedGraphics.",
    ritual: "Utilisateurs rituel concernés = ritualEngaged.",
    product: "Utilisateurs produit concernés = coherenceFlag OU hasJ7."
  }
};

const CARD_COPY = {
  en: {
    "MC-W01": {
      nextAction: [
        "- Improve onboarding (Onboarding Beta script)",
        "- Tease advanced play at the end of onboarding",
        "- Codex/Telescope/Map and closing rewards"
      ].join("\n")
    },
    "MC-W02": {
      nextAction: [
        "- Make all features accessible",
        "- Centralize map and telescope usage (introduced during onboarding)",
        "- Notification system (red dots) when elements need consulting"
      ].join("\n")
    },
    "MC-W03": {
      nextAction: [
        "- Add Codex support (consultation screen for known/to-discover tiles)",
        "- Recycling that lets players change their tiles",
        "- Invert planting and pruning rituals to make the first recipes more attractive and natural",
        "- Improve the tutorial to avoid situations where the player is lost (stronger guidance)"
      ].join("\n")
    },
    "MC-W04": {
      nextAction: [
        "- Rework audio toward a less continuously musical solution",
        "- More ambient sounds and breathing without music",
        "- Use music at key moments (ritual, unlock, reward, etc.)"
      ].join("\n")
    },
    "MC-W05": {
      nextAction: [
        "- Rework the wording of presented questions",
        "- Stop repeating the Big Five once it is complete (before several months)",
        "- Observatory notifications when a questionnaire is completed",
        "- Improve result interpretation (for example: Big Five -> written text)",
        "- Applies only to questions asked during rituals. Standardized questionnaires do not need rewording"
      ].join("\n")
    },
    "MC-S01": {
      evidence: [
        "Top positive mention: 20/43 J+7 respondents, 46.5%, cited graphic rendering among the most appreciated aspects.",
        "Stronger than other positive items: graphics exceeded results consultation (18/43) and questioning (16/43).",
        "Weaker negative signal: only 8/43, 18.6%, cited graphics among least appreciated; the positive signal exceeds the negative by +12 respondents.",
        "Qualitative support: KT-359 wrote that the design was good and pleasant for navigation.",
        "Recognized despite criticism: KT-324 concluded \"cela reste une belle application\", while asking for more concrete solutions."
      ]
    },
    "MC-S03": {
      evidence: [
        "A light positive effect exists: 16/43 J+7 respondents, 37.2%, declared at least a slight positive effect.",
        "Explicit ritualization: KT-362 wrote \"C'est devenu un rituel\" and showed a very engaged flow: 23 active days, 114 sessions, 10.7 active hours, J+7 score 8.",
        "Rest/relaxation explicit: KT-272 wrote \"C’était reposant\", then \"Sympa, relaxant\"; their flow was heavy: 17 active days, 66 sessions, 25.2 active hours.",
        "Relaxation explicit: KT-227 wrote \"Je ressens une certaine détente lorsque je suis sur l’application\"; flow: 12 active days, 37 sessions, J+7 score 7.",
        "Audio positive for some: KT-178 wrote \"La musique invite à la détente, apaise l'esprit\"; this does not cancel the negative audio signal, but reveals polarized sound-design potential."
      ]
    }
  },
  fr: {
    "MC-S01": {
      title: "Atmosphère visuelle : le rendu graphique est le positif le plus cité en J+7",
      mainEvidence: "20/43 répondants J+7, soit 46,5 %, citent le rendu graphique parmi les aspects les plus appréciés.",
      nextAction: "Préserver la direction visuelle et l'utiliser comme accroche principale, tout en clarifiant le guidage et la valeur d'usage.",
      evidence: [
        "Premier positif cité : 20/43 répondants J+7, soit 46,5 %, citent le rendu graphique parmi les aspects les plus appréciés.",
        "Signal plus fort que les autres items positifs : le rendu graphique dépasse la consultation des résultats (18/43) et le questionnement (16/43).",
        "Signal négatif plus faible : seulement 8/43, soit 18,6 %, citent le rendu graphique parmi les moins appréciés ; le solde positif brut est donc de +12 répondants.",
        "Appui qualitatif : KT-359 indique que le design est bon et agréable pour la navigation.",
        "Reconnaissance malgré critiques : KT-324 conclut \"cela reste une belle application\", tout en demandant davantage de solutions concrètes."
      ]
    },
    "MC-S02": {
      title: "Promesse personnalité/résultats : questions et résultats attirent ; les demandes portent sur la clarté, pas sur un rejet du concept",
      mainEvidence: "18/43 répondants J+7, soit 41,9 %, apprécient la consultation des résultats de personnalité ; 16/43, soit 37,2 %, apprécient le questionnement.",
      nextAction: "Conserver la promesse personnalité/résultats, mais rendre l'interprétation plus claire, plus sûre et plus actionnable.",
      evidence: [
        "Résultats fortement appréciés : 18/43 répondants J+7, soit 41,9 %, citent la consultation des résultats de personnalité parmi les aspects les plus appréciés.",
        "Questionnement également attractif : 16/43, soit 37,2 %, citent l'expérience de questionnement parmi les aspects les plus appréciés.",
        "Commentaires orientés amélioration : l'analyse qualitative repère 15 commentaires liés aux résultats/personnalité, provenant de 10 utilisateurs distincts.",
        "Attente explicite d'analyse : KT-359 écrit qu'il/elle a hâte de lire les analyses et que certains résultats correspondent assez bien.",
        "Pertinence reconnue après coup : KT-257 mentionne la pertinence du rendu sur la personnalité après avoir répondu aux questions."
      ]
    },
    "MC-S03": {
      title: "Potentiel relaxant : certains utilisateurs décrivent explicitement l'app comme reposante, relaxante ou ritualisée",
      mainEvidence: "16/43 répondants J+7, soit 37,2 %, déclarent au moins un léger effet positif.",
      nextAction: "Concevoir des sessions calmes, courtes et répétables ; transformer cet effet en boucle rituelle intentionnelle plutôt qu'accidentelle.",
      evidence: [
        "Un effet positif léger existe : 16/43 répondants J+7, soit 37,2 %, déclarent au moins un léger effet positif.",
        "Ritualisation explicite : KT-362 écrit \"C'est devenu un rituel\" et présente un flow très engagé : 23 jours actifs, 114 sessions, 10,7 h actives, score J+7 8.",
        "Repos/relaxation explicites : KT-272 écrit \"C’était reposant\" puis \"Sympa, relaxant\" ; son flow est important : 17 jours actifs, 66 sessions, 25,2 h actives.",
        "Détente explicite : KT-227 écrit \"Je ressens une certaine détente lorsque je suis sur l’application\" ; flow : 12 jours actifs, 37 sessions, score J+7 7.",
        "Audio positif chez certains : KT-178 écrit \"La musique invite à la détente, apaise l'esprit\" ; cela n'annule pas le signal audio négatif, mais révèle un potentiel sonore polarisé."
      ]
    },
    "MC-S04": {
      title: "Appétence future : la majorité des répondants J+7 téléchargerait probablement ou certainement une version plus complète et accepte le recontact bêta",
      mainEvidence: "33/43 répondants J+7, soit 76,7 %, répondent Oui ou Probablement pour une version plus complète.",
      nextAction: "Maintenir le funnel bêta/recontact actif et cadrer la version complète autour de la prévention, de bénéfices concrets, de niveaux et de tuiles plus riches.",
      evidence: [
        "Téléchargement probable ou certain : 33/43 répondants J+7, soit 76,7 %, répondent Oui ou Probablement pour une version plus complète.",
        "Recontact bêta accepté : 33/43, soit 76,7 %, acceptent d'être recontactés pour le playtest bêta.",
        "Mémoire post-test : 26/43, soit 60,5 %, disent avoir pensé parfois ou souvent à l'application depuis la fin du test.",
        "Cadence naturelle crédible : 36/43, soit 83,7 %, imaginent une fréquence naturelle quotidienne ou de quelques fois par semaine.",
        "Population screenée prédisposée au multi-jours : 369/373, soit 98,9 %, se disent à l'aise avec une application mobile sur plusieurs jours, sans problème ou si elle n'est pas trop contraignante."
      ]
    },
    "MC-W01": {
      title: "But et progression restent sous-expliqués après l'onboarding",
      mainEvidence: "25/43 répondants J+7, soit 58,1 %, déclarent avoir été bloqués parce qu'ils ne comprenaient pas comment progresser.",
      nextAction: [
        "- Amélioration de l'onboarding (script Onboarding Beta)",
        "- Teaser partie avancée à la fin de l'onboarding",
        "- Codex/Télescope/Carte et récompenses de clôture"
      ].join("\n"),
      evidence: [
        "Blocage principal en J+7 : 25/43 répondants, soit 58,1 %, déclarent avoir été bloqués parce qu'ils ne comprenaient pas comment progresser.",
        "Prise en main très critiquée : 21/43, soit 48,8 %, citent la prise en main, la navigation ou la manipulation parmi les aspects les moins appréciés.",
        "Frein d'usage régulier : 14/43, soit 32,6 %, citent la complexité comme frein ; 10/43, soit 23,3 %, citent le manque d'accompagnement.",
        "Bug reports convergents : 8/37 rapports dédupliqués sont classés guidance_or_blocked_progress.",
        "Le premier wow ne suffit pas : la première recette est atteinte par 84,7 %, mais les jours actifs médians restent à 3,0 et la rétention J+7 moyenne à 23,6 %."
      ]
    },
    "MC-W02": {
      title: "La valeur de l'observatoire hors carnet/résultats est faible ou sous-instrumentée",
      mainEvidence: "Chez les utilisateurs qui visitent l'observatoire, le taux médian d'ouverture du journal est de 100,0 %, tandis que l'usage hors journal est quasiment absent.",
      nextAction: [
        "- Rendre toutes les features accessibles",
        "- Centraliser l'usage de la carte et du télescope (présentés à l'onboarding)",
        "- Système de notifications (red dots) quand il y a des éléments à consulter"
      ].join("\n"),
      evidence: [
        "L'observatoire est surtout un chemin vers le journal : chez les utilisateurs qui le visitent, le taux médian d'ouverture du journal est de 100,0 %.",
        "L'activité hors journal est presque absente : le taux médian de visites observatoire hors journal est de 0,0 %.",
        "Le contournement du journal est presque absent : le journal_bypass_rate médian est aussi de 0,0 %, ce qui suggère peu d'usage autonome de l'observatoire.",
        "Les visites existent mais restent concentrées : le nombre médian de visites observatoire est de 3,0 ; le lieu est vu, mais son usage semble étroit.",
        "Retours terrain : 6/37 bug reports sont classés observatory_journal_results, avec des signaux récurrents comme l'impossibilité d'ouvrir certains éléments ou la difficulté à trouver un autre lieu."
      ]
    },
    "MC-W03": {
      title: "La fusion des tuiles manque d'affordance, de mémoire de recettes et de gestion de grille",
      mainEvidence: "La friction fusion/grille apparaît dans les blocages J+7, le gameplay moins apprécié, les commentaires, les bug reports et les métriques de fusion.",
      nextAction: [
        "- Ajout du Codex (écran de consultation des tuiles connues/à découvrir)",
        "- Recyclage qui permet de changer ses tuiles",
        "- Inverser rituel plantation et élagage pour rendre les premières recettes plus attrayantes et naturelles",
        "- Amélioration du tutoriel pour éviter les situations où le joueur est perdu (guidage plus fort)"
      ].join("\n"),
      evidence: [
        "Blocage explicite de fusion : 6/43 répondants J+7, soit 14,0 %, disent avoir été bloqués parce qu'ils ne comprenaient pas comment fusionner les tuiles.",
        "Expérience de jeu critiquée : 13/43, soit 30,2 %, citent le gameplay (rituels, fusions, aménagement) parmi les aspects les moins appréciés.",
        "Commentaires nombreux : 15/43 répondants J+7, soit 34,9 %, mentionnent fusion, tuiles, grille ou objets comme point de friction.",
        "Bug reports convergents : 10/37 bug reports sont classés tile_fusion_grid_ritual.",
        "Confirmation métrique : le ratio médian de fusions échouées est de 29,6 %, le remplissage final médian de 42,0 %, et les interactions médianes par recette sont de 35,2."
      ]
    },
    "MC-W04": {
      title: "L'audio produit un signal négatif petit mais très net",
      mainEvidence: "6/43 répondants J+7, soit 14,0 %, ont joué sans le son parce que la musique ou le design sonore ne leur plaisait pas.",
      nextAction: [
        "- Retravailler l'audio vers une solution moins continuellement musicale",
        "- Plus forte présence de sons ambiants et respirations sans musique",
        "- Utilisation des musiques aux moments clefs (rituel, déblocage, récompense, etc.)"
      ].join("\n"),
      evidence: [
        "Rejet direct du son : 6/43 répondants J+7, soit 14,0 %, disent avoir joué sans le son parce que la musique ou le design sonore ne leur plaisait pas.",
        "Musique parmi les moins appréciés : 6/43, soit 14,0 %, citent la musique parmi les aspects les moins appréciés.",
        "Commentaires qualitatifs nets : 5/43 répondants, soit 11,6 %, formulent des commentaires de type stressant, désagréable ou dislike.",
        "Bug reports audio : 2/37 bug reports sont classés audio.",
        "Instrumentation insuffisante : le taux médian de sessions avec volume appareil non nul est de 64,3 %, mais cela ne prouve pas que la musique Kaleotopia était active ou appréciée."
      ]
    },
    "MC-W05": {
      title: "La progression Big Five est trop lente pour rendre les items répétés ou semi-opposés acceptables",
      mainEvidence: "13/43 répondants J+7, soit 30,2 %, citent l'expérience de questionnement parmi les aspects les moins appréciés.",
      nextAction: [
        "- Retravailler le wording des questions présentées",
        "- Ne plus répéter le Big Five une fois qu'il est terminé (avant quelques mois)",
        "- Notifications observatoire lorsqu'on termine un questionnaire",
        "- Améliorer l'interprétation des résultats (exemple Big Five -> texte rédigé)",
        "- Ne concerne que les questions posées lors des rituels. Les questionnaires standardisés n'ont pas besoin de rewording"
      ].join("\n"),
      evidence: [
        "Questionnement critiqué : 13/43 répondants J+7, soit 30,2 %, citent l'expérience de questionnement parmi les aspects les moins appréciés.",
        "Commentaires sur la répétition : 6/43 répondants J+7, soit 14,0 %, mentionnent explicitement des questions répétitives ou redondantes.",
        "Métrique de répétition exacte : les répétitions exactes de questions atteignent 39,7 % dans le flow mesuré.",
        "Progression lente : le proxy médian de complétion BFI reste à 5,0 %, donc les items répétés ou semi-opposés ne donnent souvent pas assez de valeur perçue.",
        "Pas un problème de durée par question : le temps médian par question est de 6,16 s ; la friction vient surtout de la répétition perçue et du faible retour de valeur."
      ]
    },
    "AC-01": {
      title: "Onboarding bêta : objectif, boucle, bénéfice, premiers pas",
      mainEvidence: "25/43 blocages de progression J+7 ; 21/43 citent la prise en main parmi les moins appréciés ; OnboardingBetaDirector existe",
      nextAction: "Finaliser les textes, la récupération, le parcours non-joueur et les métriques d'onboarding"
    },
    "AC-02": {
      title: "Tutoriel manipulation/fusion et cohérence du wording",
      mainEvidence: "TutorialGrid et les indices de tuiles existent ; un bug report indique que le wording contredit l'icône de validation",
      nextAction: "Aligner le wording avec les gestes réels et faire une QA avec des non-joueurs"
    },
    "AC-03": {
      title: "Feedback de fusion : succès, échec, recette débloquée",
      mainEvidence: "MergeUI/MergeManager/MergeResultVisualiser existent ; ratio médian de fusions échouées 29,6 %",
      nextAction: "Ajouter une aide contextuelle après échecs répétés et logger les paires échouées"
    },
    "AC-04": {
      title: "Codex / livre de recettes / objets découverts",
      mainEvidence: "Le codex existe ; les utilisateurs demandent un livre de recettes ; bug reports sur l'animation du codex et les noms longs",
      nextAction: "Corriger l'animation et les libellés longs ; afficher recettes connues/inconnues et le nombre restant"
    },
    "AC-05": {
      title: "Saturation de grille : recycler, supprimer, agrandir, prévenir les impasses",
      mainEvidence: "RecyclingStation existe ; rapports de grille pleine/sans possibilité de fusion ; demandes de suppression/agrandissement",
      nextAction: "Exposer le recyclage plus tôt ; définir la politique d'extension ; ajouter des alertes d'impasse"
    },
    "AC-06": {
      title: "États des rituels : disponible, cooldown, récompenses en attente, déjà fait",
      mainEvidence: "CTA/feedback rituel implémenté ; rapports de texte bloquant et de mauvais comptage de rituel",
      nextAction: "QA de chaque état de rituel et correction des compteurs/messages bloquants"
    },
    "AC-07": {
      title: "Objectifs quotidiens / mini-challenges / objectifs secondaires",
      mainEvidence: "Demandes J+7 de mini-challenges, d'objectifs et de choses à gagner",
      nextAction: "Créer des objectifs de session courts et des objectifs de progression à moyen terme"
    },
    "AC-08": {
      title: "Rythme et activités pendant les attentes/cooldowns",
      mainEvidence: "Commentaires sur l'attente trop longue et le jeu lent/ennuyeux ; le debug skip n'est pas une UX",
      nextAction: "Expliquer l'attente, ajouter des activités courtes, revoir la cadence"
    },
    "AC-09": {
      title: "Big5/OCEAN : anti-répétition et progression linéaire",
      mainEvidence: "Correctifs QuestionnaireManager et QuestionHistoryData ; les répétitions exactes étaient à 39,7 %",
      nextAction: "Valider l'absence de boucle OCEAN précoce en bêta et mesurer la répétition perçue"
    },
    "AC-10": {
      title: "UI questionnaire : validation, bouton Terminer, sélection, animation",
      mainEvidence: "QuestionnaireUIRitual a des verrous d'interaction ; un bug report indique que Terminer est cliquable sans réponse",
      nextAction: "Définir la sémantique de Terminer et empêcher/renommer la fin prématurée"
    },
    "AC-11": {
      title: "Résultats Big5 : progression, interprétation, incertitude",
      mainEvidence: "Big5ProgressDisplay/PlayerProfileManager existent ; rapports d'absence de bilan clair et d'anxiété liée au résultat",
      nextAction: "Ajouter des synthèses de jalons claires et un wording prudent sur l'incertitude"
    },
    "AC-12": {
      title: "Solutions de prévention santé mentale, exercices, ressources",
      mainEvidence: "Le J+7 demande des solutions de prévention ; commentaires demandant exercices/articles/clés",
      nextAction: "Créer un module de contenus/recommandations validés avec disclaimers sûrs"
    },
    "AC-13": {
      title: "Personnalisation des décors Big5 et évolution visible de l'observatoire",
      mainEvidence: "TraitDrivenSceneryController et assets de décor OCEAN existent ; les utilisateurs veulent voir l'évolution/zoomer",
      nextAction: "Rendre les déblocages visibles et inspectables ; mesurer les revisites après déblocage"
    },
    "AC-14": {
      title: "Navigation observatoire, carte, télescope, autre lieu",
      mainEvidence: "Téléporteur de carte et visite d'observatoire existent ; rapports indiquant que l'autre lieu et l'ouverture d'éléments d'observatoire ne sont pas intuitifs",
      nextAction: "Clarifier les interactions, recentrer les indices, instrumenter l'usage hors journal"
    },
    "AC-15": {
      title: "Pile de modales, fuite d'input, overlays bloquants",
      mainEvidence: "UIModalStack existe ; 16/37 rapports techniques/modales et overlays bloquants récents",
      nextAction: "Exécuter des smoke tests sur toutes les modales et logger les événements de pile modale"
    },
    "AC-16": {
      title: "Journal/carnet et pages de résultats",
      mainEvidence: "La modale Journal existe ; taux d'ouverture du journal élevé ; rapports d'absence de bilan/problèmes UI",
      nextAction: "QA des pages, états vides, limites d'historique et comportement de fermeture"
    },
    "AC-17": {
      title: "Layout mobile : portrait, safe area, textes longs, tablette",
      mainEvidence: "Portrait forcé ; bug reports sur texte long, fond trop étroit, tablette/layout",
      nextAction: "Lancer une matrice de QA mobile/tablette et corriger les libellés longs"
    },
    "AC-18": {
      title: "Consentement, données, flow légal bêta",
      mainEvidence: "Alpha gate retiré ; panneau de conditions bêta existant ; rapport indiquant que la question data arrive trop tôt",
      nextAction: "Spécifier le flow légal bêta et les docs/persistances lisibles"
    },
    "AC-19": {
      title: "Notifications et rappels",
      mainEvidence: "NotificationManager existe mais seules des invocations d'exemple sont trouvées ; aucune notification reçue ; 15 logs d'exception notification",
      nextAction: "Implémenter le flow produit de notifications, permissions, planification et télémétrie"
    },
    "AC-20": {
      title: "Contrôles audio/musique et refonte sonore",
      mainEvidence: "Mute existe ; 6/43 n'aiment pas le son ; rapports de musique stressante/insupportable",
      nextAction: "Ajouter des contrôles persistants par type et redesigner/tester la musique"
    },
    "AC-21": {
      title: "Overlay de bug report et qualité des rapports",
      mainEvidence: "BugReportOverlay existe ; 11/37 rapports vides/non catégorisés",
      nextAction: "Ajouter screenshot, fiabilité de transport, localisation et champs de contexte"
    },
    "AC-22": {
      title: "Performance, chargement, stabilité runtime",
      mainEvidence: "Transitions optimisées ; p95 de chargement médian 4629 ms ; app bloquée à 92 % ; erreurs runtime",
      nextAction: "Corriger les stacks principales, définir des budgets de chargement, tester cold start/réseau faible"
    },
    "AC-23": {
      title: "Polish visuel : texte, rendu, props bloquants, textures",
      mainEvidence: "Rapports de noms longs, lanterne bloquant un rituel, texture du télescope, problèmes de rendu",
      nextAction: "QA visuelle scène par scène et règles de libellés longs"
    },
    "AC-24": {
      title: "Rituels spécifiques : taille, rocher, pousse, compteurs",
      mainEvidence: "Indices rocher et correctifs rituels existent ; rapports sur direction du désherbage, arrosage, ordre de plantation, mauvais compteurs",
      nextAction: "QA de chaque geste rituel et correction des compteurs/ordres/directions"
    },
    "AC-25": {
      title: "Sécurité clipping/sol des animaux",
      mainEvidence: "AnimatedElement a une téléportation de sécurité mais pas de preuve de clamp au sol ; bug précédent de chat qui clippe",
      nextAction: "Contraindre hauteur/sol et tester tous les animaux/compositions"
    },
    "AC-26": {
      title: "Plus de contenu : zones, niveaux, tuiles, variété",
      mainEvidence: "Zones Fatigue/Anxiety et nouveaux assets existent ; les utilisateurs demandent plus de niveaux/tuiles",
      nextAction: "Relier le nouveau contenu aux objectifs et mesurer nouveauté/épuisement du contenu"
    },
    "AC-27": {
      title: "Présence d'avatar/personnage",
      mainEvidence: "Un commentaire J+7 demande un avatar/personnage ; aucun avatar joueur trouvé",
      nextAction: "Arbitrer l'adéquation produit et prototyper si aligné"
    },
    "AC-28": {
      title: "Densité visuelle, charge cognitive, esthétique accessible",
      mainEvidence: "Les graphismes sont appréciés par beaucoup, mais certains rapportent un design surchargé/peu attractif",
      nextAction: "Auditer la hiérarchie visuelle et les options mode calme/VFX réduits"
    },
    "AC-29": {
      title: "Version, cycle de playtest, clarté debug/lock",
      mainEvidence: "Cycle alpha retiré ; debug skip/reset ajouté ; rapport sur l'affichage de version",
      nextAction: "Aligner l'affichage version, la politique de build debug et le cycle/lock bêta"
    },
    "AC-30": {
      title: "Instrumentation des cartes d'action bêta et des KPIs",
      mainEvidence: "Plusieurs KPIs alpha sont sous-instrumentés ; les nouvelles features doivent produire des preuves",
      nextAction: "Ajouter les événements onboarding, codex, recyclage, notifications, audio, modales et objectifs"
    }
  }
};

const state = {
  data: null,
  filteredUsers: [],
  selectedActionId: null,
  selectedUserId: null,
  lang: localStorage.getItem("kaleotopiaAnalyticsLang") || "en",
  cardTab: "main",
  cardViewMode: localStorage.getItem("kaleotopiaCardViewMode") || "simple",
  filtersCollapsed: localStorage.getItem("kaleotopiaFiltersCollapsed") === "true",
  visibleSections: loadVisibleSections(),
  sortMode: "impact"
};

function t(key, vars = {}) {
  const template = UI[state.lang]?.[key] || UI.en[key] || key;
  return template.replaceAll(/\{(\w+)\}/g, (_, name) => String(vars[name] ?? ""));
}

function locale() {
  return state.lang === "fr" ? "fr-FR" : "en-US";
}

function numberFormatter() {
  return new Intl.NumberFormat(locale(), { maximumFractionDigits: 1 });
}

function themeLabel(theme) {
  return themeLabels[state.lang]?.[theme] || themeLabels.en[theme] || theme;
}

function statusLabel(status) {
  return STATUS_LABELS[state.lang]?.[status] || STATUS_LABELS.en[status] || status || "";
}

function sourceLabel(source) {
  return SOURCE_LABELS[state.lang]?.[source] || SOURCE_LABELS.en[source] || source || "";
}

function rawCardById(id) {
  return [...(state.data?.mainCards || []), ...(state.data?.actionCards || [])].find((card) => card.id === id);
}

function localizedCard(card) {
  if (!card) return card;
  const copy = CARD_COPY[state.lang]?.[card.id] || CARD_COPY.en?.[card.id] || {};
  return {
    ...card,
    ...copy,
    status: statusLabel(card.status)
  };
}

function localizedSourceLine(line) {
  if (!line?.cardId) {
    const copy = SOURCE_LINE_COPY[state.lang]?.[line.id] || {};
    return {
      ...line,
      ...copy,
      source: sourceLabel(line.source)
    };
  }
  const card = localizedCard(rawCardById(line.cardId));
  let text = line.text;
  const evidenceMatch = line.id.match(/-EV(\d+)$/);
  if (line.id.endsWith("-SUMMARY") || line.id.endsWith("-E")) text = card?.mainEvidence || text;
  if (line.id.endsWith("-ACTION") || line.id.endsWith("-N")) text = card?.nextAction || text;
  if (evidenceMatch) text = card?.evidence?.[Number(evidenceMatch[1]) - 1] || text;
  return {
    ...line,
    source: sourceLabel(line.source),
    label: card?.title || line.label,
    text
  };
}

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

function yesValue(value) {
  return String(value || "").trim().toLowerCase() === "oui";
}

function median(values) {
  const clean = values.map(num).filter((v) => v !== null).sort((a, b) => a - b);
  if (!clean.length) return null;
  const mid = Math.floor(clean.length / 2);
  return clean.length % 2 ? clean[mid] : (clean[mid - 1] + clean[mid]) / 2;
}

function quantile(values, q) {
  const clean = values.map(num).filter((v) => v !== null).sort((a, b) => a - b);
  if (!clean.length) return null;
  if (clean.length === 1) return clean[0];
  const pos = (clean.length - 1) * q;
  const lower = Math.floor(pos);
  const upper = Math.ceil(pos);
  if (lower === upper) return clean[lower];
  return clean[lower] + (clean[upper] - clean[lower]) * (pos - lower);
}

function mean(values) {
  const clean = values.map(num).filter((v) => v !== null);
  if (!clean.length) return null;
  return clean.reduce((sum, value) => sum + value, 0) / clean.length;
}

function stdDev(values) {
  const clean = values.map(num).filter((v) => v !== null);
  if (clean.length < 2) return null;
  const avg = mean(clean);
  const variance = clean.reduce((sum, value) => sum + ((value - avg) ** 2), 0) / (clean.length - 1);
  return Math.sqrt(variance);
}

function metricStats(values) {
  const clean = values.map(num).filter((v) => v !== null);
  return {
    n: clean.length,
    mean: mean(clean),
    median: median(clean),
    std: stdDev(clean),
    q1: quantile(clean, 0.25),
    q3: quantile(clean, 0.75)
  };
}

function percent(part, total) {
  if (!total) return null;
  return (part / total) * 100;
}

function numericCount(values) {
  return values.map(num).filter((v) => v !== null).length;
}

function countBy(values) {
  const counts = new Map();
  values.flat().map((value) => String(value ?? "").trim()).filter(Boolean).forEach((value) => {
    counts.set(value, (counts.get(value) || 0) + 1);
  });
  return [...counts.entries()].map(([label, count]) => ({ label, count })).sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}

function lineJoin(lines) {
  return lines.filter(Boolean).join("\n\n");
}

function sourceMetricMeta(metricKey) {
  const lookup = METRIC_SOURCE_LOOKUP[metricKey];
  if (!lookup?.metric || !state.data?.metricDictionary) return "";
  const row = state.data.metricDictionary.find((item) => item.metric === lookup.metric);
  if (!row) return lookup.metric;
  return `${row.kpiId} · ${row.metric}`;
}

function sourceMetricFormula(metricKey) {
  const lookup = METRIC_SOURCE_LOOKUP[metricKey];
  if (!lookup) return "";
  const groupFormula = METRIC_FORMULA_GROUPS[state.lang]?.[lookup.group] || METRIC_FORMULA_GROUPS.en[lookup.group] || "";
  const source = sourceMetricMeta(metricKey);
  if (!source) return groupFormula;
  const label = state.lang === "fr" ? "Source KPI" : "Source KPI";
  return lineJoin([groupFormula, `${label}: ${source}`]);
}

function aggregationFormula(type, context = {}) {
  const lang = state.lang;
  const scope = context.scope || (lang === "fr" ? "la sous-population filtrée actuelle" : "the current filtered subset");
  const sample = context.sample !== undefined ? context.sample : "n";
  if (lang === "fr") {
    if (type === "percent") {
      return `Valeur affichée = numérateur / dénominateur × 100. Valeurs actuelles : ${context.numerator ?? "n"} / ${context.denominator ?? "N"}. L'affichage est arrondi à l'unité ; survolez le pourcentage lui-même pour voir la valeur décimale exacte.`;
    }
    if (type === "median") {
      return `Valeur affichée = médiane sur ${scope}. Les valeurs null/NA sont exclues. Méthode : trier les ${sample} valeurs numériques ; si n est impair, prendre la valeur centrale ; si n est pair, prendre la moyenne des deux valeurs centrales. La médiane est Q2 ; lorsque des quartiles sont affichés, Q1/Q3 utilisent le même échantillon trié, comme médianes des moitiés basse/haute.`;
    }
    if (type === "mean") {
      return `Valeur affichée = moyenne arithmétique sur ${scope} : somme des valeurs numériques / nombre de valeurs numériques. Les valeurs null/NA sont exclues. Taille d'échantillon actuelle : ${sample}.`;
    }
    if (type === "std") {
      return `Valeur affichée = écart-type échantillon sur ${scope}. Les valeurs null/NA sont exclues. Formule : racine carrée de Σ(x - moyenne)^2 / (n - 1). Taille d'échantillon actuelle : ${sample}.`;
    }
    if (type === "quartile") {
      return `Valeur affichée = quartile sur ${scope}. Les valeurs numériques sont triées ; la position est interpolée linéairement sur (n - 1) × q, avec q=0.25 pour Q1 et q=0.75 pour Q3.`;
    }
    if (type === "count") {
      return `Valeur affichée = nombre de ${scope}${context.condition ? ` qui vérifient : ${context.condition}` : ""}.`;
    }
    if (type === "direct") {
      return `Valeur affichée = valeur calculée pour ce testeur, parsée en nombre quand nécessaire. NA si la valeur source est manquante ou non numérique.`;
    }
    if (type === "bar") {
      return `Barre affichée = activeDays du testeur / maximum du slider "Jours actifs" × 100, borné entre 0 et 100. C'est une jauge visuelle de position dans la sous-population, pas un KPI séparé.`;
    }
    return "";
  }
  if (type === "percent") {
    return `Displayed value = numerator / denominator × 100. Current values: ${context.numerator ?? "n"} / ${context.denominator ?? "N"}. The display is rounded to the nearest unit; hover the percentage itself to see the exact decimal value.`;
  }
  if (type === "median") {
    return `Displayed value = median over ${scope}. Null/NA values are excluded. Method: sort the ${sample} numeric values ascending; if n is odd, take the middle value; if n is even, average the two middle values. The median is Q2; when quartiles are shown, Q1/Q3 use the same sorted sample as lower/upper-half medians.`;
  }
  if (type === "mean") {
    return `Displayed value = arithmetic mean over ${scope}: sum of numeric values / count of numeric values. Null/NA values are excluded. Current numeric sample size: ${sample}.`;
  }
  if (type === "std") {
    return `Displayed value = sample standard deviation over ${scope}. Null/NA values are excluded. Formula: square root of Σ(x - mean)^2 / (n - 1). Current numeric sample size: ${sample}.`;
  }
  if (type === "quartile") {
    return `Displayed value = quartile over ${scope}. Numeric values are sorted; the position is linearly interpolated on (n - 1) × q, with q=0.25 for Q1 and q=0.75 for Q3.`;
  }
  if (type === "count") {
    return `Displayed value = count of ${scope}${context.condition ? ` matching: ${context.condition}` : ""}.`;
  }
  if (type === "direct") {
    return `Displayed value = this tester's calculated value, parsed as a number when needed. NA if the source value is missing or non-numeric.`;
  }
  if (type === "bar") {
    return `Displayed bar = tester activeDays / active-days slider maximum × 100, clamped between 0 and 100. It is a visual position gauge, not a separate KPI.`;
  }
  return "";
}

function metricFormula(metricKey, aggregation = "direct", context = {}) {
  return lineJoin([
    aggregationFormula(aggregation, context),
    sourceMetricFormula(metricKey)
  ]);
}

function tooltipAttrs(text) {
  return text ? `data-tooltip="${esc(text)}"` : "";
}

function setupInstantTooltips() {
  if (window.__kaleotopiaInstantTooltipsReady) return;
  window.__kaleotopiaInstantTooltipsReady = true;
  const tooltip = document.querySelector(".instant-tooltip") || document.createElement("div");
  tooltip.className = "instant-tooltip";
  tooltip.hidden = true;
  if (!tooltip.isConnected) document.body.append(tooltip);
  let activeTarget = null;

  const hide = () => {
    activeTarget = null;
    tooltip.hidden = true;
  };

  const show = (target) => {
    const text = target?.getAttribute("data-tooltip");
    if (!text) return hide();
    activeTarget = target;
    tooltip.textContent = text;
    tooltip.hidden = false;
    tooltip.style.left = "0px";
    tooltip.style.top = "0px";
    tooltip.style.setProperty("--tooltip-arrow-left", "50%");

    const targetRect = target.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    const gap = 10;
    const margin = 8;
    const placeAbove = targetRect.top >= tooltipRect.height + gap + margin;
    const top = placeAbove ? targetRect.top - tooltipRect.height - gap : targetRect.bottom + gap;
    const unclampedLeft = targetRect.left + targetRect.width / 2 - tooltipRect.width / 2;
    const maxLeft = window.innerWidth - tooltipRect.width - margin;
    const left = Math.max(margin, Math.min(unclampedLeft, maxLeft));
    const arrowLeft = Math.max(12, Math.min(targetRect.left + targetRect.width / 2 - left, tooltipRect.width - 12));

    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${Math.max(margin, top)}px`;
    tooltip.style.setProperty("--tooltip-arrow-left", `${arrowLeft}px`);
    tooltip.dataset.placement = placeAbove ? "top" : "bottom";
  };

  const handleEnter = (event) => {
    const target = event.target.closest?.("[data-tooltip]");
    if (!target || target.contains(event.relatedTarget)) return;
    show(target);
  };
  const handleLeave = (event) => {
    if (!activeTarget || !activeTarget.contains(event.target)) return;
    if (activeTarget.contains(event.relatedTarget)) return;
    hide();
  };
  document.addEventListener("pointerover", handleEnter);
  document.addEventListener("pointerout", handleLeave);
  document.addEventListener("mouseover", handleEnter);
  document.addEventListener("mouseout", handleLeave);
  document.addEventListener("focusin", (event) => {
    const target = event.target.closest?.("[data-tooltip]");
    if (target) show(target);
  });
  document.addEventListener("focusout", (event) => {
    if (activeTarget && activeTarget.contains(event.target)) hide();
  });
  window.addEventListener("scroll", hide, true);
  window.addEventListener("resize", hide);
}

function termDefinition(key) {
  const definitions = {
    en: {
      coherenceFlag: "Coherence flag: a warning created by comparing questionnaires, bug reports and usage metrics. It marks a potential inconsistency, confirmation or important analytical entry point that deserves review.",
      subset: "Filtered subset: the tester population that remains after applying the active filters on the left.",
      impactScore: "Impact score: an internal sorting score used to surface testers with stronger warnings or richer evidence first. It is not a scientific KPI by itself."
    },
    fr: {
      coherenceFlag: "Signal de cohérence : avertissement créé en croisant questionnaires, bug reports et métriques d'usage. Il marque une incohérence possible, une confirmation ou un point d'entrée analytique important à examiner.",
      subset: "Sous-population filtrée : population de testeurs restante après application des filtres actifs à gauche.",
      impactScore: "Score d'impact : score interne de tri qui remonte d'abord les testeurs avec signaux forts ou preuves plus riches. Ce n'est pas un KPI scientifique autonome."
    }
  };
  return definitions[state.lang]?.[key] || definitions.en[key] || "";
}

function formulaTip(formula) {
  if (!formula) return "";
  const label = state.lang === "fr" ? "Formule" : "Formula";
  return `<span class="formula-tip" tabindex="0" aria-label="${esc(`${label}: ${formula}`)}" ${tooltipAttrs(formula)}></span>`;
}

function metricLabel(label, formula) {
  const labelHtml = /coherence|cohérence/i.test(label)
    ? `<span class="defined-term" ${tooltipAttrs(termDefinition("coherenceFlag"))}>${esc(label)}</span>`
    : esc(label);
  return `<span class="metric-label"><span class="metric-label__text">${labelHtml}</span>${formulaTip(formula)}</span>`;
}

function fmtNumber(value, suffix = "") {
  const n = num(value);
  if (n === null) return "NA";
  return `${numberFormatter().format(n)}${suffix}`;
}

function fmtPct(value) {
  const n = num(value);
  if (n === null) return "NA";
  const rounded = Math.round(n);
  const detailed = `${numberFormatter().format(n)}%`;
  return {
    html: `<span class="pct-value" ${tooltipAttrs(percentTooltip(detailed))}>${esc(rounded)}%</span>`,
    text: `${rounded}%`,
    detailed
  };
}

function percentTooltip(detailed) {
  return state.lang === "fr"
    ? `Valeur exacte : ${detailed}\nFormule générale : numérateur / dénominateur × 100. Voir l'icône de formule du métrique pour le numérateur et le dénominateur précis.`
    : `Exact value: ${detailed}\nGeneral formula: numerator / denominator × 100. See the metric formula icon for the precise numerator and denominator.`;
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
      html += `<span class="pct-value" ${tooltipAttrs(percentTooltip(detailed))}>${esc(rounded)}%</span>`;
    } else {
      html += esc(match[0]);
    }
    lastIndex = match.index + match[0].length;
  }
  html += esc(text.slice(lastIndex));
  return html;
}

function actionContentHtml(value) {
  const lines = String(value ?? "").split(/\n+/).map((line) => line.trim()).filter(Boolean);
  const bulletLines = lines
    .map((line) => line.match(/^[-*]\s+(.+)$/)?.[1]?.trim())
    .filter(Boolean);
  if (lines.length > 1 && bulletLines.length === lines.length) {
    return `<ul class="action-list">${bulletLines.map((line) => `<li>${textWithPercentHovers(line)}</li>`).join("")}</ul>`;
  }
  return `<p>${textWithPercentHovers(value)}</p>`;
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
  optionList(els.ageFilter, data.users.map((u) => u.questionnaire?.screening?.age), t("filters.allAges"));
  optionList(els.platformFilter, data.users.flatMap((u) => u.platforms || []), t("filters.allPlatforms"));
  optionList(els.wellnessFilter, data.users.map((u) => u.questionnaire?.screening?.wellnessApps), t("filters.allProfiles"));
  optionList(els.downloadFilter, data.users.map((u) => u.questionnaire?.j7?.download), t("filters.allIntents"));
  const themeValues = [...(data.mainCards || []), ...(data.actionCards || [])].map((c) => c.theme).map((theme) => themeLabels.en[theme] ? theme : "product");
  optionList(els.themeFilter, themeValues, t("filters.allThemes"));
  [...els.themeFilter.options].forEach((option) => {
    if (option.value) option.textContent = themeLabel(option.value);
  });
  const maxActiveDays = Math.max(...data.users.map((u) => u.metrics?.activeDays || 0), 1);
  els.activeDaysMin.max = String(Math.ceil(maxActiveDays));
}

function refreshFilterLabels() {
  if (!state.data) return;
  const values = {
    age: els.ageFilter.value,
    platform: els.platformFilter.value,
    wellness: els.wellnessFilter.value,
    download: els.downloadFilter.value,
    theme: els.themeFilter.value
  };
  initFilters(state.data);
  els.ageFilter.value = values.age;
  els.platformFilter.value = values.platform;
  els.wellnessFilter.value = values.wellness;
  els.downloadFilter.value = values.download;
  els.themeFilter.value = values.theme;
}

function setFiltersCollapsed(enabled) {
  state.filtersCollapsed = Boolean(enabled);
  localStorage.setItem("kaleotopiaFiltersCollapsed", String(state.filtersCollapsed));
  document.body.classList.toggle("filters-collapsed", state.filtersCollapsed);
  renderChrome();
}

function saveVisibleSections() {
  localStorage.setItem("kaleotopiaVisibleSections", JSON.stringify(state.visibleSections));
}

function setSectionVisibility(key, visible) {
  state.visibleSections[key] = Boolean(visible);
  saveVisibleSections();
  applySectionVisibility();
}

function applySectionVisibility() {
  els.overviewSection.hidden = !state.visibleSections.overview;
  els.kpiSection.hidden = !state.visibleSections.kpis;
  els.workbench.hidden = !state.visibleSections.cards;
  els.j7MacroSection.hidden = !state.visibleSections.j7;
  els.testerExplorer.hidden = !state.visibleSections.tester;
}

function renderChrome() {
  document.documentElement.lang = state.lang;
  document.title = t("app.documentTitle");
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    node.setAttribute("placeholder", t(node.dataset.i18nPlaceholder));
  });
  document.querySelectorAll("[data-i18n-aria-label]").forEach((node) => {
    node.setAttribute("aria-label", t(node.dataset.i18nAriaLabel));
  });
  els.langEn.classList.toggle("active", state.lang === "en");
  els.langFr.classList.toggle("active", state.lang === "fr");
  els.generatedAt.textContent = state.data ? t("app.generatedAt", { date: state.data.generatedAt }) : t("app.loadingData");
  document.body.classList.toggle("filters-collapsed", state.filtersCollapsed);
  const filterToggleLabel = state.filtersCollapsed ? t("filters.expand") : t("filters.collapse");
  els.filterCollapseToggle.removeAttribute("title");
  els.filterCollapseToggle.setAttribute("data-tooltip", filterToggleLabel);
  els.filterCollapseToggle.setAttribute("aria-label", filterToggleLabel);
  els.filterCollapseToggle.classList.toggle("is-collapsed", state.filtersCollapsed);
  [
    [els.showOverviewSection, "overview"],
    [els.showKpiSection, "kpis"],
    [els.showCardsSection, "cards"],
    [els.showJ7Section, "j7"],
    [els.showTesterSection, "tester"]
  ].forEach(([checkbox, key]) => { checkbox.checked = state.visibleSections[key]; });
  els.sortImpact.removeAttribute("title");
  els.sortActivity.removeAttribute("title");
  els.sortScore.removeAttribute("title");
  els.activeDaysMin.removeAttribute("title");
  els.activeDaysMin.removeAttribute("data-tooltip");
  els.activeDaysMetricLabel.removeAttribute("title");
  els.sortImpact.setAttribute("data-tooltip", sortFormula("impact"));
  els.sortActivity.setAttribute("data-tooltip", sortFormula("activity"));
  els.sortScore.setAttribute("data-tooltip", sortFormula("score"));
  els.activeDaysMetricLabel.setAttribute("data-tooltip", sourceMetricFormula("activeDays"));
  const switchLabel = state.cardViewMode === "simple" ? t("cards.switchToDetailed") : t("cards.switchToSimple");
  els.cardViewModeToggle.removeAttribute("title");
  els.cardViewModeToggle.setAttribute("data-tooltip", switchLabel);
  els.cardViewModeToggle.setAttribute("aria-label", switchLabel);
  els.cardViewModeToggle.classList.toggle("is-detail-mode", state.cardViewMode === "detail");
  const flagsLabel = els.flagsOnly.closest("label")?.querySelector("span");
  if (flagsLabel) flagsLabel.setAttribute("data-tooltip", termDefinition("coherenceFlag"));
  applySectionVisibility();
}

function bindEvents() {
  els.filterCollapseToggle.addEventListener("click", () => {
    setFiltersCollapsed(!state.filtersCollapsed);
  });

  [
    [els.showOverviewSection, "overview"],
    [els.showKpiSection, "kpis"],
    [els.showCardsSection, "cards"],
    [els.showJ7Section, "j7"],
    [els.showTesterSection, "tester"]
  ].forEach(([checkbox, key]) => {
    checkbox.addEventListener("input", () => setSectionVisibility(key, checkbox.checked));
  });

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
      els.endOnly,
      els.j7Only,
      els.allQuestionnairesOnly,
      els.flagsOnly,
      els.progressionOnly
    ].forEach((el) => { el.checked = false; });
    els.screeningOnly.checked = true;
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

  els.cardViewModeToggle.addEventListener("click", () => {
    state.cardViewMode = state.cardViewMode === "simple" ? "detail" : "simple";
    localStorage.setItem("kaleotopiaCardViewMode", state.cardViewMode);
    renderChrome();
    renderActionCards();
  });

  [
    [els.langEn, "en"],
    [els.langFr, "fr"]
  ].forEach(([button, lang]) => {
    button.addEventListener("click", () => {
      if (state.lang === lang) return;
      state.lang = lang;
      localStorage.setItem("kaleotopiaAnalyticsLang", lang);
      renderChrome();
      refreshFilterLabels();
      render();
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

function statFormula(key, s, users) {
  const j7Users = users.filter((u) => u.hasJ7);
  const withScore = j7Users.filter((u) => num(u.questionnaire?.j7?.score) !== null);
  const countScope = state.lang === "fr" ? "testeurs qui passent tous les filtres actifs" : "testers passing every active filter";
  const filteredScope = state.lang === "fr" ? "les testeurs filtrés actuels" : "the current filtered testers";
  const j7Scope = state.lang === "fr" ? "les répondants J+7 dans la sous-population filtrée" : "J+7 respondents in the filtered subset";
  const withScoresScope = state.lang === "fr" ? "les répondants J+7 avec score numérique" : "J+7 respondents with numeric scores";
  switch (key) {
    case "filteredTesters":
      return lineJoin([
        aggregationFormula("count", { scope: countScope }),
        state.lang === "fr"
          ? `Dénominateur de référence pour les couvertures globales : ${state.data.users.length} testeurs dans le dataset anonymisé.`
          : `Reference denominator for global coverage: ${state.data.users.length} testers in the anonymized dataset.`
      ]);
    case "screeningCoverage":
      return lineJoin([
        aggregationFormula("percent", { numerator: s.screening, denominator: s.total }),
        sourceMetricFormula("screeningCompleted")
      ]);
    case "endQuestionnaire":
      return lineJoin([
        aggregationFormula("percent", { numerator: s.end, denominator: s.total }),
        sourceMetricFormula("endCompleted")
      ]);
    case "j7Coverage":
      return lineJoin([
        aggregationFormula("percent", { numerator: s.j7, denominator: s.total }),
        sourceMetricFormula("j7Completed")
      ]);
    case "fullChain":
      return lineJoin([
        aggregationFormula("percent", { numerator: s.fullChain, denominator: s.total }),
        sourceMetricFormula("fullChain")
      ]);
    case "medianActiveDays":
      return metricFormula("activeDays", "median", { scope: filteredScope, sample: numericCount(users.map((u) => u.metrics?.activeDays)) });
    case "medianActiveHours":
      return metricFormula("activeHours", "median", { scope: filteredScope, sample: numericCount(users.map((u) => u.metrics?.activeHours)) });
    case "d7Retained":
      return lineJoin([
        aggregationFormula("percent", { numerator: users.filter((u) => u.metrics?.retainedD7 === 1).length, denominator: users.length }),
        sourceMetricFormula("retainedD7")
      ]);
    case "firstRecipeReached":
      return lineJoin([
        aggregationFormula("percent", { numerator: users.filter((u) => u.metrics?.reachedFirstRecipe === 1).length, denominator: users.length }),
        sourceMetricFormula("reachedFirstRecipe")
      ]);
    case "j7ScoreAvg":
      return metricFormula("j7Score", "mean", { scope: withScoresScope, sample: withScore.length });
    case "progressionBlock":
      return lineJoin([
        aggregationFormula("percent", { numerator: j7Users.filter((u) => truthySignal(u, "progressionBlock")).length, denominator: j7Users.length }),
        sourceMetricFormula("progressionBlock")
      ]);
    case "downloadPositive":
      return lineJoin([
        aggregationFormula("percent", { numerator: j7Users.filter((u) => truthySignal(u, "downloadPositive")).length, denominator: j7Users.length }),
        sourceMetricFormula("downloadPositive")
      ]);
    default:
      return aggregationFormula("count", { scope: filteredScope });
  }
}

function renderStats(users) {
  const s = computeStats(users);
  const cards = [
    { key: "filteredTesters", label: t("stat.filteredTesters"), value: fmtNumber(s.total), bar: percent(s.total, state.data.users.length), color: "var(--blue)" },
    { key: "screeningCoverage", label: t("stat.screeningCoverage"), value: fmtPct(percent(s.screening, s.total)), bar: percent(s.screening, s.total), color: "var(--green)" },
    { key: "endQuestionnaire", label: t("stat.endQuestionnaire"), value: fmtPct(percent(s.end, s.total)), bar: percent(s.end, s.total), color: "var(--green)" },
    { key: "j7Coverage", label: t("stat.j7Coverage"), value: fmtPct(percent(s.j7, s.total)), bar: percent(s.j7, s.total), color: "var(--violet)" },
    { key: "fullChain", label: t("stat.fullChain"), value: fmtPct(percent(s.fullChain, s.total)), bar: percent(s.fullChain, s.total), color: "var(--violet)" },
    { key: "medianActiveDays", label: t("stat.medianActiveDays"), value: fmtNumber(s.activeDaysMedian), bar: Math.min(100, (s.activeDaysMedian || 0) * 5), color: "var(--blue)" },
    { key: "medianActiveHours", label: t("stat.medianActiveHours"), value: fmtNumber(s.activeHoursMedian, "h"), bar: Math.min(100, (s.activeHoursMedian || 0) * 20), color: "var(--blue)" },
    { key: "d7Retained", label: t("stat.d7Retained"), value: fmtPct(s.d7), bar: s.d7, color: "var(--green)" },
    { key: "firstRecipeReached", label: t("stat.firstRecipeReached"), value: fmtPct(s.firstRecipe), bar: s.firstRecipe, color: "var(--green)" },
    { key: "j7ScoreAvg", label: t("stat.j7ScoreAvg"), value: fmtNumber(s.j7Score, "/10"), bar: (s.j7Score || 0) * 10, color: "var(--amber)" },
    { key: "progressionBlock", label: t("stat.progressionBlock"), value: fmtPct(s.progressionBlock), bar: s.progressionBlock, color: "var(--red)" },
    { key: "downloadPositive", label: t("stat.downloadPositive"), value: fmtPct(s.downloadPositive), bar: s.downloadPositive, color: "var(--green)" }
  ];
  els.statsGrid.innerHTML = cards.map((card) => {
    const formula = statFormula(card.key, s, users);
    return `
    <article class="stat-card">
      <div class="label">${metricLabel(card.label, formula)}</div>
      <div class="value">${valueHtml(card.value)}</div>
      ${spark(card.bar, card.color)}
    </article>
  `;
  }).join("");
  els.subsetSentence.textContent = t("overview.subsetSentence", { shown: s.total, total: state.data.users.length, flags: s.flags });
  els.subsetSentence.setAttribute("data-tooltip", lineJoin([termDefinition("subset"), termDefinition("coherenceFlag")]));
}

function metricShortLabel(metric) {
  return String(metric || "")
    .replace(/^KPI_\d+_[^_]+__/, "")
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function kpiFormula(def, statType, sample) {
  return lineJoin([
    aggregationFormula(statType, {
      scope: state.lang === "fr" ? "la sous-population filtrée actuelle" : "the current filtered subset",
      sample
    }),
    def?.formula ? `${state.lang === "fr" ? "Formule source" : "Source formula"}: ${def.formula}` : "",
    def?.limits ? `${state.lang === "fr" ? "Limites" : "Limits"}: ${def.limits}` : ""
  ]);
}

function renderKpiSection(users) {
  const groups = state.data.kpiGroups || [];
  els.kpiSentence.textContent = t("kpis.sentence", { count: users.length });
  if (!groups.length) {
    els.kpiGrid.innerHTML = `<div class="empty-state">${esc(t("kpis.noData"))}</div>`;
    return;
  }
  els.kpiGrid.innerHTML = groups.map((group) => {
    const rows = (group.metrics || [])
      .map((metric) => {
        const values = users.map((user) => user.kpis?.[metric.key]);
        return { metric, stats: metricStats(values) };
      })
      .filter((row) => row.stats.n > 0)
      .slice(0, 3);
    return `
      <article class="kpi-card">
        <header>
          <span>${esc(group.id)}</span>
          <h3>${esc(group.name)}</h3>
        </header>
        ${rows.length ? `
          <table class="metric-table">
            <thead>
              <tr>
                <th>${esc(state.lang === "fr" ? "Métrique" : "Metric")}</th>
                <th>${esc(t("kpis.n"))}</th>
                <th>${esc(t("kpis.median"))}</th>
                <th>${esc(t("kpis.mean"))}</th>
                <th>${esc(t("kpis.std"))}</th>
              </tr>
            </thead>
            <tbody>
              ${rows.map(({ metric, stats }) => `
                <tr>
                  <td>${metricLabel(metricShortLabel(metric.metric), kpiFormula(metric, "median", stats.n))}</td>
                  <td>${esc(stats.n)}</td>
                  <td ${tooltipAttrs(kpiFormula(metric, "median", stats.n))}>${esc(fmtNumber(stats.median))}</td>
                  <td ${tooltipAttrs(kpiFormula(metric, "mean", stats.n))}>${esc(fmtNumber(stats.mean))}</td>
                  <td ${tooltipAttrs(kpiFormula(metric, "std", stats.n))}>${esc(fmtNumber(stats.std))}</td>
                </tr>
                <tr class="quartile-row">
                  <td colspan="5">${esc(t("kpis.q1"))}: ${esc(fmtNumber(stats.q1))} · ${esc(t("kpis.q3"))}: ${esc(fmtNumber(stats.q3))}${formulaTip(kpiFormula(metric, "quartile", stats.n))}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        ` : `<div class="empty-state">${esc(t("kpis.noData"))}</div>`}
      </article>
    `;
  }).join("");
}

function distributionBars(entries, total) {
  if (!entries.length || !total) return `<div class="empty-state">${esc(t("j7Macro.noData"))}</div>`;
  return `<div class="distribution-list">
    ${entries.slice(0, 8).map((entry) => {
      const share = percent(entry.count, total) || 0;
      return `
        <div class="distribution-row">
          <div>
            <strong>${esc(entry.label)}</strong>
            <span>${esc(entry.count)} · ${valueHtml(fmtPct(share))}</span>
          </div>
          ${spark(share, "var(--blue)")}
        </div>
      `;
    }).join("")}
  </div>`;
}

function renderJ7DistributionCard(title, entries, total) {
  const top = entries[0];
  return `
    <article class="j7-card">
      <header>
        <h3>${esc(title)}</h3>
        <span>${esc(t("j7Macro.count"))}: ${esc(total)}</span>
      </header>
      ${top ? `<p>${esc(state.lang === "fr" ? "Top réponse" : "Top answer")}: <strong>${esc(top.label)}</strong></p>` : ""}
      ${distributionBars(entries, total)}
    </article>
  `;
}

function blockerLabels(blockers = {}) {
  return Object.entries(blockers)
    .filter(([, value]) => yesValue(value))
    .map(([key]) => ({
      progression: state.lang === "fr" ? "Progression incomprise" : "Progression unclear",
      fusion: state.lang === "fr" ? "Fusion incomprise" : "Fusion unclear",
      technical: state.lang === "fr" ? "Blocage technique" : "Technical block"
    })[key] || key);
}

function renderJ7Macro(users) {
  const j7Users = users.filter((user) => user.hasJ7);
  els.j7MacroSentence.textContent = t("j7Macro.sentence", { count: j7Users.length });
  if (!j7Users.length) {
    els.j7MacroGrid.innerHTML = `<div class="empty-state">${esc(t("j7Macro.noData"))}</div>`;
    return;
  }
  const scoreStats = metricStats(j7Users.map((user) => user.questionnaire?.j7?.score));
  const scoreCard = `
    <article class="j7-card j7-card--score">
      <header>
        <h3>${esc(t("j7Macro.score"))}</h3>
        <span>${esc(t("kpis.n"))}: ${esc(scoreStats.n)}</span>
      </header>
      <div class="score-stat-grid">
        <div><span>${esc(t("kpis.median"))}</span><strong>${esc(fmtNumber(scoreStats.median, "/10"))}</strong></div>
        <div><span>${esc(t("kpis.mean"))}</span><strong>${esc(fmtNumber(scoreStats.mean, "/10"))}</strong></div>
        <div><span>${esc(t("kpis.std"))}</span><strong>${esc(fmtNumber(scoreStats.std))}</strong></div>
        <div><span>${esc(t("kpis.q1"))}/${esc(t("kpis.q3"))}</span><strong>${esc(fmtNumber(scoreStats.q1))} / ${esc(fmtNumber(scoreStats.q3))}</strong></div>
      </div>
    </article>
  `;
  const cards = [
    scoreCard,
    renderJ7DistributionCard(t("j7Macro.thought"), countBy(j7Users.map((user) => user.questionnaire?.j7?.thought)), j7Users.length),
    renderJ7DistributionCard(t("j7Macro.effect"), countBy(j7Users.map((user) => user.questionnaire?.j7?.effect)), j7Users.length),
    renderJ7DistributionCard(t("j7Macro.frequency"), countBy(j7Users.map((user) => user.questionnaire?.j7?.naturalFrequency)), j7Users.length),
    renderJ7DistributionCard(t("j7Macro.sound"), countBy(j7Users.map((user) => user.questionnaire?.j7?.sound)), j7Users.length),
    renderJ7DistributionCard(t("j7Macro.download"), countBy(j7Users.map((user) => user.questionnaire?.j7?.download)), j7Users.length),
    renderJ7DistributionCard(t("j7Macro.beta"), countBy(j7Users.map((user) => user.questionnaire?.j7?.beta)), j7Users.length),
    renderJ7DistributionCard(t("j7Macro.blockers"), countBy(j7Users.map((user) => blockerLabels(user.questionnaire?.j7?.blockers))), j7Users.length),
    renderJ7DistributionCard(t("j7Macro.liked"), countBy(j7Users.map((user) => user.questionnaire?.j7?.liked || [])), j7Users.length),
    renderJ7DistributionCard(t("j7Macro.disliked"), countBy(j7Users.map((user) => user.questionnaire?.j7?.disliked || [])), j7Users.length)
  ];
  els.j7MacroGrid.innerHTML = cards.join("");
}

function actionCardsForView() {
  const filters = getFilters();
  const source = state.cardTab === "main" ? (state.data.mainCards || []) : (state.data.actionCards || []);
  return source
    .filter((card) => !filters.theme || card.theme === filters.theme)
    .sort((a, b) => {
      if (state.cardTab === "main") return a.id.localeCompare(b.id);
      return b.severity - a.severity || a.id.localeCompare(b.id);
    })
    .map(localizedCard);
}

function cardKindLabel(card) {
  if (card.kind === "strength") return t("card.kind.strength");
  if (card.kind === "weakness") return t("card.kind.weakness");
  return card.priority || t("card.kind.card");
}

function cardActionLabel(card) {
  if (card.kind === "strength") return t("card.action.strength");
  if (card.kind === "weakness") return t("card.action.weakness");
  return t("card.action.default");
}

function cardPills(card) {
  if (card.kind) {
    return `
      <span class="pill kind-${esc(card.kind)}">${esc(cardKindLabel(card))}</span>
      <span class="pill theme">${esc(themeLabel(card.theme))}</span>
    `;
  }
  return `
    <span class="pill priority-${esc(card.priority.toLowerCase())}">${esc(card.priority)}</span>
    <span class="pill theme">${esc(themeLabel(card.theme))}</span>
  `;
}

function renderActionCards() {
  const cards = actionCardsForView();
  if (!cards.some((card) => card.id === state.selectedActionId)) {
    state.selectedActionId = null;
  }
  const simpleMode = state.cardViewMode === "simple";
  els.actionCards.classList.toggle("is-simple-mode", simpleMode);
  els.actionCards.innerHTML = cards.map((card) => `
    <button class="action-card ${card.kind ? "main-card" : ""} ${simpleMode ? "is-simple-card" : "is-detail-card"} ${card.id === state.selectedActionId ? "is-selected" : ""}" data-action-id="${esc(card.id)}" data-priority="${esc(card.priority || "")}" data-kind="${esc(card.kind || "")}" type="button">
      <div class="card-kicker">
        ${cardPills(card)}
      </div>
      <h3>${esc(card.title)}</h3>
      ${simpleMode ? "" : `
        <p>${textWithPercentHovers(card.mainEvidence)}</p>
        <div class="card-action-summary">
          <strong>${esc(cardActionLabel(card))}:</strong>
          ${actionContentHtml(card.nextAction)}
        </div>
      `}
    </button>
  `).join("");
  els.actionCards.querySelectorAll("[data-action-id]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedActionId = state.selectedActionId === button.dataset.actionId ? null : button.dataset.actionId;
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

function themeMatchFormula(theme) {
  return THEME_MATCH_FORMULAS[state.lang]?.[theme] || THEME_MATCH_FORMULAS.en[theme] || THEME_MATCH_FORMULAS.en.product;
}

function relevantScope(theme) {
  return state.lang === "fr"
    ? `les utilisateurs concernés par le thème ${themeLabel(theme)} dans la sous-population filtrée`
    : `users relevant to the ${themeLabel(theme)} theme within the filtered subset`;
}

function currentSubsetScope() {
  return state.lang === "fr" ? "la sous-population filtrée actuelle" : "the current filtered subset";
}

function rawJ7Formula(description) {
  return state.lang === "fr"
    ? `Valeur affichée = comptage de réponses brutes J+7 : ${description}. Les textes de réponse restent dans leur langue originale.`
    : `Displayed value = count of raw J+7 responses: ${description}. Response text remains in its original language.`;
}

function impactFormula(label, theme, users, relevant, j7Users) {
  const relevantText = relevantScope(theme);
  const subsetText = currentSubsetScope();
  const scoreSample = numericCount(relevant.map((u) => u.questionnaire?.j7?.score));
  switch (label) {
    case "Relevant users":
      return aggregationFormula("count", { scope: subsetText, condition: themeMatchFormula(theme) });
    case "J+7 progression block":
      return lineJoin([
        aggregationFormula("percent", { numerator: users.filter((u) => truthySignal(u, "progressionBlock")).length, denominator: j7Users.length }),
        sourceMetricFormula("progressionBlock")
      ]);
    case "Median active days":
    case "Active days median":
      return metricFormula("activeDays", "median", { scope: relevantText, sample: numericCount(relevant.map((u) => u.metrics?.activeDays)) });
    case "Median active hours":
      return metricFormula("activeHours", "median", { scope: relevantText, sample: numericCount(relevant.map((u) => u.metrics?.activeHours)) });
    case "Full chain users":
      return lineJoin([
        aggregationFormula("count", { scope: subsetText, condition: "hasAllQuestionnaires = true" }),
        sourceMetricFormula("fullChain")
      ]);
    case "Coherence flags":
    case "Flags":
      return lineJoin([
        aggregationFormula("count", { scope: theme === "visual" ? relevantText : subsetText, condition: "coherenceFlag = true" }),
        sourceMetricFormula("coherenceFlag")
      ]);
    case "First recipe reached":
      return lineJoin([
        aggregationFormula("percent", { numerator: users.filter((u) => u.metrics?.reachedFirstRecipe === 1).length, denominator: users.length }),
        sourceMetricFormula("reachedFirstRecipe")
      ]);
    case "Failed merge median":
      return metricFormula("failedMergeRatio", "median", { scope: relevantText, sample: numericCount(relevant.map((u) => u.metrics?.failedMergeRatio)) });
    case "Grid fill median":
      return metricFormula("gridFillPct", "median", { scope: relevantText, sample: numericCount(relevant.map((u) => u.metrics?.gridFillPct)) });
    case "Interactions / recipe":
      return metricFormula("interactionsPerRecipe", "median", { scope: relevantText, sample: numericCount(relevant.map((u) => u.metrics?.interactionsPerRecipe)) });
    case "Runtime error users":
      return lineJoin([
        aggregationFormula("count", { scope: relevantText, condition: "runtimeErrors > 0" }),
        sourceMetricFormula("runtimeErrors")
      ]);
    case "J+7 fusion blocks":
      return rawJ7Formula(state.lang === "fr" ? "blocker fusion = Oui parmi les utilisateurs concernés" : "fusion blocker = Oui among relevant users");
    case "BFI distinct median":
      return metricFormula("bfiDistinct", "median", { scope: relevantText, sample: numericCount(relevant.map((u) => u.metrics?.bfiDistinct)) });
    case "Question repeats median":
      return metricFormula("questionRepeats", "median", { scope: relevantText, sample: numericCount(relevant.map((u) => u.metrics?.questionRepeats)) });
    case "Question instances median":
      return metricFormula("questionnaireInstances", "median", { scope: relevantText, sample: numericCount(relevant.map((u) => u.metrics?.questionnaireInstances)) });
    case "J+7 disliked questions":
      return rawJ7Formula(state.lang === "fr" ? "option de questionnement présente dans les aspects les moins appréciés" : "questioning option present in least-liked aspects");
    case "Seconds / question":
      return metricFormula("secondsPerQuestion", "median", { scope: relevantText, sample: numericCount(relevant.map((u) => u.metrics?.secondsPerQuestion)) });
    case "Observatory visits median":
      return metricFormula("observatoryVisits", "median", { scope: relevantText, sample: numericCount(relevant.map((u) => u.metrics?.observatoryVisits)) });
    case "Journal open median":
      return metricFormula("journalOpenRate", "median", { scope: relevantText, sample: numericCount(relevant.map((u) => u.metrics?.journalOpenRate)) });
    case "J+7 liked results":
      return rawJ7Formula(state.lang === "fr" ? "option résultats/personnalité présente dans les aspects les plus appréciés" : "results/personality option present in most-liked aspects");
    case "Download positive":
    case "J+7 positive download":
      return lineJoin([
        aggregationFormula("percent", { numerator: relevant.filter((u) => truthySignal(u, "downloadPositive")).length, denominator: relevant.length }),
        sourceMetricFormula("downloadPositive")
      ]);
    case "Score avg":
    case "J+7 score":
      return metricFormula("j7Score", "mean", { scope: relevantText, sample: scoreSample });
    case "Liked music":
      return lineJoin([
        aggregationFormula("count", { scope: relevantText, condition: "likedMusic = true" }),
        sourceMetricFormula("likedMusic")
      ]);
    case "Disliked music":
      return lineJoin([
        aggregationFormula("count", { scope: relevantText, condition: "dislikedMusic = true" }),
        sourceMetricFormula("dislikedMusic")
      ]);
    case "Volume session median":
      return metricFormula("soundSessionRate", "median", { scope: relevantText, sample: numericCount(relevant.map((u) => u.metrics?.soundSessionRate)) });
    case "J+7 sound answers":
      return rawJ7Formula(state.lang === "fr" ? "réponse son J+7 non vide parmi les utilisateurs concernés" : "non-empty J+7 sound answer among relevant users");
    case "Strict contradictions":
      return lineJoin([
        aggregationFormula("count", { scope: relevantText, condition: "soundSessionRate = 0 and J+7 sound answer mentions speakers/headphones" }),
        sourceMetricFormula("soundSessionRate")
      ]);
    case "Notification error users":
      return lineJoin([
        aggregationFormula("count", { scope: relevantText, condition: "notificationRuntimeErrors > 0" }),
        sourceMetricFormula("notificationRuntimeErrors")
      ]);
    case "p95 load median":
      return metricFormula("p95LoadMs", "median", { scope: relevantText, sample: numericCount(relevant.map((u) => u.metrics?.p95LoadMs)) });
    case "Low FPS median":
      return metricFormula("lowFpsRate", "median", { scope: relevantText, sample: numericCount(relevant.map((u) => u.metrics?.lowFpsRate)) });
    case "Tech blocks J+7":
      return rawJ7Formula(state.lang === "fr" ? "blocker technique = Oui parmi les utilisateurs concernés" : "technical blocker = Oui among relevant users");
    case "D7 retained":
      return lineJoin([
        aggregationFormula("percent", { numerator: relevant.filter((u) => u.metrics?.retainedD7 === 1).length, denominator: relevant.length }),
        sourceMetricFormula("retainedD7")
      ]);
    case "High J+7 score":
    case "High score users":
      return lineJoin([
        aggregationFormula("count", { scope: relevantText, condition: "J+7 score >= 7/10" }),
        sourceMetricFormula("highScore")
      ]);
    case "J+7 liked graphics":
      return rawJ7Formula(state.lang === "fr" ? "option rendu graphique présente dans les aspects les plus appréciés" : "graphic rendering option present in most-liked aspects");
    case "Rituals median":
      return metricFormula("ritualCompleted", "median", { scope: relevantText, sample: numericCount(relevant.map((u) => u.metrics?.ritualCompleted)) });
    case "Completion median":
      return metricFormula("ritualCompletionRate", "median", { scope: relevantText, sample: numericCount(relevant.map((u) => u.metrics?.ritualCompletionRate)) });
    case "Power users":
      return lineJoin([
        aggregationFormula("count", { scope: relevantText, condition: "activeDays >= 7 OR activeHours >= 2" }),
        sourceMetricFormula("powerUser")
      ]);
    case "Progression blocks":
      return lineJoin([
        aggregationFormula("count", { scope: relevantText, condition: "progressionBlock = true" }),
        sourceMetricFormula("progressionBlock")
      ]);
    case "J+7 users":
      return lineJoin([
        aggregationFormula("count", { scope: relevantText, condition: "hasJ7 = true" }),
        sourceMetricFormula("j7Completed")
      ]);
    default:
      return aggregationFormula("count", { scope: relevantText });
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
  const rows = items[theme] || [
    ["Relevant users", relevant.length],
    ["Active days median", fmtNumber(median(relevant.map((u) => u.metrics?.activeDays)))],
    ["J+7 score", fmtNumber(mean(relevant.map((u) => u.questionnaire?.j7?.score)), "/10")],
    ["Download positive", fmtPct(percent(relevant.filter((u) => truthySignal(u, "downloadPositive")).length, relevant.length))],
    ["Flags", relevant.filter((u) => truthySignal(u, "coherenceFlag")).length],
    ["J+7 users", relevant.filter((u) => u.hasJ7).length]
  ];
  return rows.map(([label, value]) => ({
    rawLabel: label,
    label: IMPACT_LABELS[state.lang]?.[label] || label,
    value,
    formula: impactFormula(label, theme, users, relevant, j7Users)
  }));
}

function scoreUserImpact(user) {
  return (truthySignal(user, "coherenceFlag") ? 8 : 0)
    + (truthySignal(user, "progressionBlock") ? 5 : 0)
    + (truthySignal(user, "fusionBlock") ? 3 : 0)
    + (truthySignal(user, "technicalBlock") ? 3 : 0)
    + (truthySignal(user, "lowScore") ? 3 : 0)
    + Math.min(user.metrics?.activeDays || 0, 10) * 0.3;
}

function impactScoreFormula() {
  return state.lang === "fr"
    ? "Score d'impact testeur = 8 si coherenceFlag + 5 si progressionBlock + 3 si fusionBlock + 3 si technicalBlock + 3 si lowScore + min(activeDays, 10) × 0,3. Ce score sert uniquement au tri/priorisation des exemples, pas comme KPI scientifique autonome."
    : "Tester impact score = 8 if coherenceFlag + 5 if progressionBlock + 3 if fusionBlock + 3 if technicalBlock + 3 if lowScore + min(activeDays, 10) × 0.3. This score is only used to sort/prioritize examples, not as a standalone scientific KPI.";
}

function sortFormula(mode) {
  if (mode === "impact") return impactScoreFormula();
  if (mode === "activity") {
    return lineJoin([
      state.lang === "fr"
        ? "Tri activité = activeDays décroissant, puis activeHours décroissant en cas d'égalité."
        : "Activity sort = activeDays descending, then activeHours descending on ties.",
      sourceMetricFormula("activeDays"),
      sourceMetricFormula("activeHours")
    ]);
  }
  return lineJoin([
    state.lang === "fr"
      ? "Tri score = score global J+7 décroissant. Les valeurs manquantes sont traitées comme -1 pour rester en bas de liste."
      : "Score sort = J+7 global score descending. Missing values are treated as -1 so they stay at the bottom of the list.",
    sourceMetricFormula("j7Score")
  ]);
}

function testerSummaryFormula() {
  return lineJoin([
    metricFormula("activeDays", "direct"),
    metricFormula("activeHours", "direct"),
    metricFormula("sessions", "direct"),
    sourceMetricFormula("j7Score")
  ]);
}

function testerBarFormula() {
  return lineJoin([
    aggregationFormula("bar"),
    sourceMetricFormula("activeDays")
  ]);
}

function firstRecipeFormula() {
  return lineJoin([
    aggregationFormula("direct"),
    sourceMetricFormula("reachedFirstRecipe"),
    sourceMetricFormula("timeToFirstRecipe")
  ]);
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

function contextBreakdownRows(card, users, dimension) {
  const groups = new Map();
  users.forEach((user) => {
    const labels = dimension === "platform"
      ? (user.platforms || [])
      : [user.questionnaire?.screening?.age].filter(Boolean);
    labels.forEach((label) => {
      if (!label) return;
      if (!groups.has(label)) groups.set(label, { label, total: 0, affected: 0 });
      const group = groups.get(label);
      group.total += 1;
      if (userMatchesTheme(user, card.theme)) group.affected += 1;
    });
  });
  const rows = [...groups.values()]
    .filter((row) => row.total > 0)
    .map((row) => ({ ...row, rate: percent(row.affected, row.total) || 0 }));
  if (dimension === "age") {
    return rows.sort((a, b) => ageSortValue(a.label) - ageSortValue(b.label) || a.label.localeCompare(b.label));
  }
  return rows.sort((a, b) => b.rate - a.rate || b.affected - a.affected || a.label.localeCompare(b.label));
}

function ageSortValue(label) {
  const text = String(label || "").toLowerCase();
  if (text.includes("moins")) return -1;
  const number = text.match(/\d+/);
  if (number) return Number(number[0]);
  if (text.includes("+") || text.includes("plus")) return Number.POSITIVE_INFINITY;
  return Number.POSITIVE_INFINITY;
}

function contextBarList(rows) {
  if (!rows.length) return `<div class="empty-state">${esc(t("context.noData"))}</div>`;
  return `<div class="context-bars">
    ${rows.slice(0, 8).map((row) => `
      <div class="context-bar-row">
        <div>
          <strong>${esc(row.label)}</strong>
          <span>${esc(row.affected)}/${esc(row.total)} · ${valueHtml(fmtPct(row.rate))}</span>
        </div>
        ${spark(row.rate, row.rate >= 50 ? "var(--red)" : "var(--amber)")}
      </div>
    `).join("")}
  </div>`;
}

function renderContextBreakdowns(card, users) {
  const ageRows = contextBreakdownRows(card, users, "age");
  const platformRows = contextBreakdownRows(card, users, "platform");
  return `
    <section class="detail-section context-section">
      <h3>${esc(t("context.title"))}${formulaTip(state.lang === "fr"
        ? "Pour chaque groupe : utilisateurs de la sous-population filtrée qui correspondent au thème de la carte / utilisateurs du groupe × 100. Un utilisateur peut compter dans plusieurs plateformes si plusieurs plateformes sont observées."
        : "For each group: users in the filtered subset matching the card theme / users in that group × 100. A user can count in multiple platforms when multiple platforms are observed.")}</h3>
      <div class="context-grid">
        <article>
          <h4>${esc(t("context.age"))}</h4>
          ${contextBarList(ageRows)}
        </article>
        <article>
          <h4>${esc(t("context.platform"))}</h4>
          ${contextBarList(platformRows)}
        </article>
      </div>
    </section>
  `;
}

function renderActionDetail() {
  const activeCards = actionCardsForView();
  const allCards = [...(state.data.mainCards || []), ...(state.data.actionCards || [])].map(localizedCard);
  const card = state.selectedActionId
    ? activeCards.find((item) => item.id === state.selectedActionId) || allCards.find((item) => item.id === state.selectedActionId)
    : null;
  els.workbench.classList.toggle("is-detail-open", Boolean(card));
  els.workbench.classList.toggle("is-detail-closed", !card);
  els.detailPane.hidden = !card;
  if (!card) {
    els.actionDetail.innerHTML = "";
    return;
  }
  const impacts = themeImpact(card.theme, state.filteredUsers);
  const sources = sourceLinesForCard(card, state.filteredUsers);
  const supporters = sortedSupportingUsers(card.theme, state.filteredUsers);
  const relatedMainCards = (state.data.mainCards || []).filter((item) => item.theme === card.theme && item.id !== card.id).map(localizedCard);
  els.actionDetail.innerHTML = `
    <article class="detail-card">
      <div class="detail-header">
        <div class="pill-row">
          ${cardPills(card)}
        <span class="pill">${esc(card.status)}</span>
        </div>
        <h2>${esc(card.title)}</h2>
        <div class="detail-action detail-action--${esc(card.kind || "default")}">
          <span>${esc(cardActionLabel(card))}</span>
          ${actionContentHtml(card.nextAction)}
        </div>
        <p class="detail-main-evidence">${textWithPercentHovers(card.mainEvidence)}</p>
      </div>
      <div class="detail-body">
        <section class="detail-section">
          <h3>${esc(t("detail.subsetImpact"))}</h3>
          <div class="impact-grid">
            ${impacts.map((item) => `
              <div class="mini-card"><span>${metricLabel(item.label, item.formula)}</span><strong>${valueHtml(item.value)}</strong></div>
            `).join("")}
          </div>
        </section>

        ${renderContextBreakdowns(card, state.filteredUsers)}

        <details class="detail-section detail-disclosure">
          <summary>
            <span>${esc(t("detail.issuedFrom"))}</span>
            <small>${esc(sources.length)} ${esc(t(sources.length === 1 ? "detail.sourceSingular" : "detail.sourcePlural"))}</small>
          </summary>
          <div class="evidence-list">
            ${sources.length ? sources.map((line) => evidenceLine(line)).join("") : `<div class="empty-state">${esc(t("detail.noSource"))}</div>`}
          </div>
        </details>

        <section class="detail-section">
          <h3>${esc(t("detail.relatedMainCards"))}</h3>
          <div class="evidence-list">
            ${relatedMainCards.length ? relatedMainCards.map((item) => `
              <article class="evidence-line">
                <span class="source">${esc(cardKindLabel(item))} · ${esc(item.id)}</span>
                <p><strong>${textWithPercentHovers(item.title)}</strong></p>
                ${(item.evidence || []).slice(0, 3).map((proof) => `<small>${textWithPercentHovers(proof)}</small>`).join("")}
              </article>
            `).join("") : `<div class="empty-state">${esc(t("detail.noRelated"))}</div>`}
          </div>
        </section>

        <section class="detail-section">
          <h3>${esc(t("detail.testerExamples"))}</h3>
          <div class="evidence-list">
            ${supporters.length ? supporters.map((user) => testerExample(user)).join("") : `<div class="empty-state">${esc(t("detail.noTesterTheme"))}</div>`}
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
  const localizedLine = localizedSourceLine(line);
  const sourceTooltip = /coherence|cohérence/i.test(localizedLine.source) ? termDefinition("coherenceFlag") : "";
  const lineText = /-(ACTION|N)$/.test(localizedLine.id || "") ? actionContentHtml(localizedLine.text) : `<p>${textWithPercentHovers(localizedLine.text)}</p>`;
  return `
    <article class="evidence-line">
      <span class="source" ${tooltipAttrs(sourceTooltip)}>${esc(localizedLine.source)}${localizedLine.userId ? ` · ${esc(localizedLine.userId)}` : ""}</span>
      ${lineText}
      ${localizedLine.context ? `<small>${textWithPercentHovers(localizedLine.context)}</small>` : ""}
    </article>
  `;
}

function testerExample(user) {
  const flags = user.questionnaire?.internal?.flags || [];
  const liked = user.questionnaire?.j7?.liked || [];
  const disliked = user.questionnaire?.j7?.disliked || [];
  const summaryFormula = testerSummaryFormula();
  return `
    <button class="tester-row" type="button" data-user-pick="${esc(user.id)}">
      <div class="tester-row__top">
        <strong>${esc(user.id)}</strong>
        <small ${tooltipAttrs(summaryFormula)}>${fmtNumber(user.metrics?.activeDays)}${state.lang === "fr" ? "j" : "d"} · ${fmtNumber(user.metrics?.activeHours, "h")} · ${esc(t("tester.score"))} ${fmtNumber(user.questionnaire?.j7?.score, "/10")}</small>
      </div>
      <small>${textWithPercentHovers([flags[0], liked[0] && `${t("tester.liked")}: ${liked[0]}`, disliked[0] && `${t("tester.disliked")}: ${disliked[0]}`].filter(Boolean).join(" · ") || t("tester.noQuestionnaireLine"))}</small>
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
  const summaryFormula = testerSummaryFormula();
  const barFormula = testerBarFormula();
  els.testerList.innerHTML = users.map((user) => {
    const m = user.metrics || {};
    const score = user.questionnaire?.j7?.score;
    const barValue = Math.min(100, ((m.activeDays || 0) / Math.max(Number(els.activeDaysMin.max) || 1, 1)) * 100);
    return `
      <button class="tester-row ${user.id === state.selectedUserId ? "is-selected" : ""}" type="button" data-user-id="${esc(user.id)}">
        <div class="tester-row__top">
          <strong>${esc(user.id)}</strong>
          <small>${user.hasAllQuestionnaires ? t("tester.fullChain") : [user.hasScreening && t("tester.screening"), user.hasEndQuestionnaire && t("tester.end"), user.hasJ7 && "J+7"].filter(Boolean).join(" + ") || t("tester.metricsOnly")}</small>
        </div>
        <div class="pill-row">
          ${truthySignal(user, "progressionBlock") ? `<span class="pill priority-p0">${esc(t("tester.progression"))}</span>` : ""}
          ${truthySignal(user, "coherenceFlag") ? `<span class="pill priority-p1" ${tooltipAttrs(termDefinition("coherenceFlag"))}>${esc(t("tester.flag"))}</span>` : ""}
          ${truthySignal(user, "downloadPositive") ? `<span class="pill">${esc(t("tester.downloadPositive"))}</span>` : ""}
        </div>
        <small ${tooltipAttrs(summaryFormula)}>${fmtNumber(m.activeDays)} ${esc(t("tester.activeDays"))} · ${fmtNumber(m.sessions)} ${esc(t("tester.sessions"))} · ${esc(t("tester.score"))} ${fmtNumber(score, "/10")}</small>
        <div class="bar" ${tooltipAttrs(barFormula)}><span style="width:${barValue}%"></span></div>
      </button>
    `;
  }).join("") || `<div class="empty-state">${esc(t("tester.empty"))}</div>`;
  els.testerList.querySelectorAll("[data-user-id]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedUserId = button.dataset.userId;
      renderTesterList();
      renderTesterDetail();
    });
  });
  renderTesterDetail();
}

function kv(label, value, formula = "") {
  const displayValue = value === null || value === undefined || value === "" ? "NA" : value;
  return `<div class="kv"><span>${formula ? metricLabel(label, formula) : esc(label)}</span><span>${valueHtml(displayValue)}</span></div>`;
}

function parseTimelineTimestamp(timestamp) {
  const raw = String(timestamp || "").trim();
  if (!raw) return null;
  const normalized = raw.includes("T") ? raw : raw.replace(" ", "T");
  const time = new Date(normalized).getTime();
  return Number.isFinite(time) ? time : null;
}

function formatChartDateTime(time) {
  return new Intl.DateTimeFormat(locale(), {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  }).format(new Date(time));
}

function formatChartTick(time) {
  return new Intl.DateTimeFormat(locale(), {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(time));
}

function formatEventCount(count) {
  return t(count === 1 ? "chart.event" : "chart.events", { count: fmtNumber(count) });
}

function formatFlowDuration(ms) {
  const seconds = Math.max(1, ms / 1000);
  if (seconds >= 172800) return t("chart.durationDays", { count: fmtNumber(seconds / 86400) });
  if (seconds >= 7200) return t("chart.durationHours", { count: fmtNumber(seconds / 3600) });
  if (seconds >= 120) return t("chart.durationMinutes", { count: fmtNumber(seconds / 60) });
  return t("chart.durationSeconds", { count: fmtNumber(seconds) });
}

function eventDetails(event) {
  return [event.platform, event.version, event.details].filter(Boolean).join(" · ");
}

function flowHighlightCopy(key) {
  const copy = {
    en: {
      start: ["Start", "First app/playtest-start event. Useful as the zero point of the reconstructed journey."],
      gate: ["Alpha access", "Alpha gate or email registration event. Useful to separate access friction from later gameplay friction."],
      onboarding: ["Onboarding", "Tutorial completion. Useful to compare post-onboarding behavior with reported progression clarity."],
      firstAction: ["First action", "First post-onboarding action. Useful to estimate whether the player understood what to do next."],
      firstRecipe: ["First recipe", "First successful recipe/merge. Useful to compare affordance and recipe-memory complaints with actual progression."],
      mergeBlocked: ["Merge blocked", "First cancelled merge. Useful to detect fusion/grid friction in the measured flow."],
      ritual: ["Ritual", "First ritual completion. Useful to identify whether the loop became repeatable or ritualized."],
      observatory: ["Observatory", "First observatory entry. Useful to see whether results/personality value was actually explored."],
      journal: ["Journal", "First journal opening. Useful to distinguish observatory visits from result consultation."],
      questionnaire: ["Questionnaire", "First in-game questionnaire signal. Useful to locate questioning friction in the activity curve."],
      endQuestionnaire: ["End questionnaire", "In-game/end questionnaire completion or answer. Useful to connect immediate feedback with prior play behavior."],
      j7: ["J+7", "Post-alpha J+7 submission. Useful to connect delayed feedback with the full measured path."],
      technical: ["Technical signal", "Runtime error or heavy loading signal. Useful to compare reported technical issues with logged failures."],
      peak: ["Peak", "Highest event-count bucket. Useful to identify the densest activity moment in the reconstructed flow."]
    },
    fr: {
      start: ["Début", "Premier événement de lancement app/playtest. Sert de point zéro du parcours reconstitué."],
      gate: ["Accès alpha", "Événement de gate alpha ou d'enregistrement email. Utile pour séparer la friction d'accès de la friction de jeu."],
      onboarding: ["Onboarding", "Complétion du tutoriel. Utile pour comparer le comportement post-onboarding avec la clarté de progression déclarée."],
      firstAction: ["Première action", "Première action après onboarding. Utile pour estimer si le joueur a compris quoi faire ensuite."],
      firstRecipe: ["Première recette", "Première recette/fusion réussie. Utile pour confronter affordance et mémoire des recettes à la progression réelle."],
      mergeBlocked: ["Fusion bloquée", "Première fusion annulée. Utile pour détecter une friction fusion/grille dans le parcours mesuré."],
      ritual: ["Rituel", "Première complétion de rituel. Utile pour identifier si la boucle devient répétable ou ritualisée."],
      observatory: ["Observatoire", "Première entrée dans l'observatoire. Utile pour voir si la valeur résultats/personnalité a réellement été explorée."],
      journal: ["Carnet", "Première ouverture du carnet. Utile pour distinguer visite de l'observatoire et consultation des résultats."],
      questionnaire: ["Questionnaire", "Premier signal de questionnaire in-game. Utile pour localiser la friction de questionnement dans la courbe d'activité."],
      endQuestionnaire: ["Questionnaire fin", "Complétion ou réponse au questionnaire in-game/de fin. Utile pour relier le feedback immédiat au parcours précédent."],
      j7: ["J+7", "Soumission du questionnaire J+7 post-alpha. Utile pour relier le feedback différé au parcours complet mesuré."],
      technical: ["Signal technique", "Erreur runtime ou signal de chargement lourd. Utile pour comparer les problèmes techniques déclarés aux échecs loggés."],
      peak: ["Pic", "Tranche avec le plus grand nombre d'événements. Utile pour identifier le moment le plus dense du parcours reconstitué."]
    }
  };
  return copy[state.lang]?.[key] || copy.en[key] || [key, ""];
}

function loadDurationMs(event) {
  const match = String(event.details || "").match(/duration_ms=(\d+(?:\.\d+)?)/);
  return match ? Number(match[1]) : null;
}

function flowHighlightRules() {
  return [
    { key: "start", className: "start", match: (event) => ["gameStarted", "newPlayer", "first_event"].includes(event.event) },
    { key: "gate", className: "start", match: (event) => ["alpha_gate_completed", "playtest_email_registered"].includes(event.event) },
    { key: "onboarding", className: "guidance", match: (event) => event.event === "tutorial_completed" },
    { key: "firstAction", className: "guidance", match: (event) => event.event === "first_post_onboarding_action" },
    { key: "firstRecipe", className: "success", match: (event) => event.event === "first_tile_merge" || (event.event === "tile_merge" && /first_time=1/.test(String(event.details || ""))) },
    { key: "mergeBlocked", className: "warning", match: (event) => event.event === "merge_cancelled" },
    { key: "ritual", className: "success", match: (event) => ["first_ritual_completed", "ritual_completed"].includes(event.event) },
    { key: "observatory", className: "results", match: (event) => ["first_observatory_entered", "observatory_entered"].includes(event.event) },
    { key: "journal", className: "results", match: (event) => ["first_journal_opened", "journal_opened"].includes(event.event) },
    { key: "questionnaire", className: "questionnaire", match: (event) => ["question_shown", "questionnaire_completed", "questionnaire_summary"].includes(event.event) },
    { key: "endQuestionnaire", className: "questionnaire", match: (event) => ["end_questionnaire_completed", "end_questionnaire_answer", "end_questionnaire_comment"].includes(event.event) },
    { key: "j7", className: "questionnaire", match: (event) => event.event === "j7_submitted" },
    { key: "technical", className: "technical", match: (event) => event.event === "runtime_error" || (event.event === "load_time_ms" && (loadDurationMs(event) || 0) >= 3000) }
  ];
}

function buildFlowMarkers(events, start, span, peakBucket) {
  const seenIndexes = new Set();
  const markers = [];
  flowHighlightRules().forEach((rule) => {
    const event = events.find((item) => !seenIndexes.has(item.index) && rule.match(item));
    if (!event) return;
    seenIndexes.add(event.index);
    const [label, reason] = flowHighlightCopy(rule.key);
    markers.push({
      key: rule.key,
      className: rule.className,
      label,
      reason,
      time: event.time,
      event
    });
  });
  if (peakBucket) {
    const [label, reason] = flowHighlightCopy("peak");
    markers.push({
      key: "peak",
      className: "peak",
      label,
      reason,
      time: start + (peakBucket.index + 0.5) * (span / peakBucket.totalBuckets),
      count: peakBucket.count,
      windowStart: peakBucket.start,
      windowEnd: peakBucket.end
    });
  }
  return markers.sort((a, b) => a.time - b.time).map((marker, index) => ({ ...marker, lane: index % 3 }));
}

function renderFlowChart(timeline) {
  const events = timeline
    .map((event, index) => ({ ...event, index, time: parseTimelineTimestamp(event.timestamp) }))
    .filter((event) => event.time !== null)
    .sort((a, b) => a.time - b.time || a.index - b.index);
  if (!events.length) return `<div class="empty-state">${esc(t("section.flowChartNoTime"))}</div>`;

  const start = events[0].time;
  const end = events[events.length - 1].time;
  const span = Math.max(end - start, 1);
  const bucketCount = Math.min(42, Math.max(8, Math.ceil(Math.sqrt(events.length) * 2.2)));
  const bucketSize = span / bucketCount;
  const buckets = Array.from({ length: bucketCount }, (_, index) => ({
    index,
    count: 0,
    start: start + index * bucketSize,
    end: index === bucketCount - 1 ? end : start + (index + 1) * bucketSize
  }));
  events.forEach((event) => {
    const bucketIndex = Math.min(bucketCount - 1, Math.floor(((event.time - start) / span) * bucketCount));
    buckets[bucketIndex].count += 1;
  });
  const maxCount = Math.max(...buckets.map((bucket) => bucket.count), 1);
  const peakBucket = buckets.reduce((best, bucket) => bucket.count > best.count ? bucket : best, buckets[0]);
  const peakMeta = { ...peakBucket, totalBuckets: bucketCount };
  const markers = buildFlowMarkers(events, start, span, peakMeta);

  const width = 760;
  const height = 210;
  const margin = { top: 24, right: 16, bottom: 42, left: 42 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;
  const slotWidth = chartWidth / bucketCount;
  const barGap = Math.min(3, Math.max(1, slotWidth * 0.18));
  const barWidth = Math.max(1, slotWidth - barGap);
  const px = (value) => Number(value.toFixed(2));
  const xForTime = (time) => margin.left + Math.max(0, Math.min(1, (time - start) / span)) * chartWidth;
  const chartFormula = t("section.flowChartFormula");
  const bars = buckets.map((bucket) => {
    const barHeight = (bucket.count / maxCount) * chartHeight;
    const x = margin.left + bucket.index * slotWidth + barGap / 2;
    const y = margin.top + chartHeight - barHeight;
    const tooltip = lineJoin([
      formatEventCount(bucket.count),
      `${formatChartDateTime(bucket.start)} -> ${formatChartDateTime(bucket.end)}`
    ]);
    return `<rect class="flow-chart__bar ${bucket.index === peakBucket.index ? "is-peak" : ""}" x="${px(x)}" y="${px(y)}" width="${px(barWidth)}" height="${px(barHeight)}" rx="2" ${tooltipAttrs(tooltip)}></rect>`;
  }).join("");
  const markerSvg = markers.map((marker) => {
    const x = px(xForTime(marker.time));
    const dotY = margin.top + 10 + marker.lane * 14;
    const eventName = marker.event?.event || t("chart.peak");
    const detail = marker.event ? eventDetails(marker.event) : `${formatEventCount(marker.count)} · ${formatChartDateTime(marker.windowStart)} -> ${formatChartDateTime(marker.windowEnd)}`;
    const tooltip = lineJoin([
      `${marker.label}: ${eventName}`,
      formatChartDateTime(marker.time),
      marker.reason,
      detail
    ]);
    return `
      <line class="flow-marker flow-marker--${esc(marker.className)}" x1="${x}" y1="${margin.top}" x2="${x}" y2="${margin.top + chartHeight}" ${tooltipAttrs(tooltip)}></line>
      <circle class="flow-marker-dot flow-marker-dot--${esc(marker.className)}" cx="${x}" cy="${px(dotY)}" r="4.5" ${tooltipAttrs(tooltip)}></circle>
    `;
  }).join("");
  const highlightList = markers.map((marker) => {
    const eventName = marker.event?.event || t("chart.peak");
    const detail = marker.event ? eventDetails(marker.event) : `${formatEventCount(marker.count)} · ${formatChartDateTime(marker.windowStart)} -> ${formatChartDateTime(marker.windowEnd)}`;
    const tooltip = lineJoin([
      `${marker.label}: ${eventName}`,
      formatChartDateTime(marker.time),
      marker.reason,
      detail
    ]);
    return `
      <span class="flow-highlight flow-highlight--${esc(marker.className)}" ${tooltipAttrs(tooltip)}>
        <span aria-hidden="true"></span>
        <strong>${esc(marker.label)}</strong>
        <small>${esc(formatChartTick(marker.time))}</small>
      </span>
    `;
  }).join("");

  return `
    <div class="flow-chart-card">
      <div class="flow-chart-card__header">
        <div>
          <h4>${esc(t("section.flowChartTitle"))}${formulaTip(chartFormula)}</h4>
          <p>${esc(t("section.flowChartSubtitle", { buckets: bucketCount, duration: formatFlowDuration(span), peak: maxCount }))}</p>
        </div>
        <div class="flow-chart-card__scale">
          <span>${esc(formatEventCount(maxCount))}</span>
          <span>0</span>
        </div>
      </div>
      <div class="flow-chart-scroll">
        <svg class="flow-chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(t("section.flowChartTitle"))}">
          <line class="flow-axis" x1="${margin.left}" y1="${margin.top + chartHeight}" x2="${margin.left + chartWidth}" y2="${margin.top + chartHeight}"></line>
          <line class="flow-axis" x1="${margin.left}" y1="${margin.top}" x2="${margin.left}" y2="${margin.top + chartHeight}"></line>
          <text class="flow-axis-label" x="${margin.left}" y="${height - 14}">${esc(t("chart.start"))}: ${esc(formatChartTick(start))}</text>
          <text class="flow-axis-label flow-axis-label--end" x="${margin.left + chartWidth}" y="${height - 14}">${esc(t("chart.end"))}: ${esc(formatChartTick(end))}</text>
          <text class="flow-axis-label" x="8" y="${margin.top + 4}">${esc(fmtNumber(maxCount))}</text>
          <text class="flow-axis-label" x="18" y="${margin.top + chartHeight + 4}">0</text>
          ${bars}
          ${markerSvg}
        </svg>
      </div>
      <div class="flow-highlights">
        <span>${esc(t("section.flowChartKeyEvents"))}</span>
        <div>${highlightList}</div>
      </div>
    </div>
  `;
}

function renderTesterDetail() {
  const user = state.filteredUsers.find((item) => item.id === state.selectedUserId);
  if (!user) {
    els.testerDetail.innerHTML = `<div class="empty-state">${esc(t("tester.select"))}</div>`;
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
        <p class="eyebrow">${esc(t("tester.header"))}</p>
        <h2>${esc(user.id)}</h2>
        <div class="pill-row">
          ${user.hasScreening ? `<span class="pill">${esc(t("tester.screening"))}</span>` : ""}
          ${user.hasEndQuestionnaire ? `<span class="pill">${esc(t("tester.end"))}</span>` : ""}
          ${user.hasJ7 ? `<span class="pill">J+7</span>` : ""}
          ${user.hasAllQuestionnaires ? `<span class="pill theme">${esc(t("tester.fullChain"))}</span>` : ""}
          ${truthySignal(user, "coherenceFlag") ? `<span class="pill priority-p1" ${tooltipAttrs(termDefinition("coherenceFlag"))}>${esc(t("tester.coherenceFlag"))}</span>` : ""}
        </div>
      </div>
      <div class="muted">${esc(user.platforms?.join(", ") || "NA")}<br>${esc(user.clientVersions?.join(", ") || "NA")}</div>
    </div>

    <div class="two-col">
      <section>
        <h3>${esc(t("section.screening"))}</h3>
        ${kv(t("kv.age"), q.screening?.age)}
        ${kv(t("kv.profession"), q.screening?.profession)}
        ${kv(t("kv.workRhythm"), q.screening?.workRhythm)}
        ${kv(t("kv.smartphone"), q.screening?.smartphone)}
        ${kv(t("kv.wellbeing"), q.screening?.wellnessApps)}
        ${kv(t("kv.multiDay"), q.screening?.multiDayComfort)}
        ${kv(t("kv.conditions"), (q.screening?.conditions || []).join(" · "))}
      </section>

      <section>
        <h3>${esc(t("section.usage"))}</h3>
        ${kv(t("kv.activeDays"), fmtNumber(m.activeDays), metricFormula("activeDays", "direct"))}
        ${kv(t("kv.activeHours"), fmtNumber(m.activeHours, "h"), metricFormula("activeHours", "direct"))}
        ${kv(t("kv.sessions"), fmtNumber(m.sessions), metricFormula("sessions", "direct"))}
        ${kv(t("kv.firstRecipe"), m.reachedFirstRecipe === 1 ? t("kv.firstRecipeYes", { value: fmtNumber(m.timeToFirstRecipeMin) }) : t("kv.no"), firstRecipeFormula())}
        ${kv(t("kv.failedMerge"), fmtPct((m.failedMergeRatio ?? null) === null ? null : m.failedMergeRatio * 100), metricFormula("failedMergeRatio", "direct"))}
        ${kv(t("kv.gridFill"), fmtPct(m.gridFillPct), metricFormula("gridFillPct", "direct"))}
        ${kv(t("kv.bfiDistinct"), fmtNumber(m.bfiDistinct), metricFormula("bfiDistinct", "direct"))}
        ${kv(t("kv.questionRepeats"), fmtNumber(m.questionRepeats), metricFormula("questionRepeats", "direct"))}
        ${kv(t("kv.rituals"), fmtNumber(m.ritualCompleted), metricFormula("ritualCompleted", "direct"))}
        ${kv(t("kv.observatoryVisits"), fmtNumber(m.observatoryVisits), metricFormula("observatoryVisits", "direct"))}
        ${kv(t("kv.runtimeErrors"), fmtNumber(m.runtimeErrors), metricFormula("runtimeErrors", "direct"))}
      </section>
    </div>

    <div class="two-col">
      <section>
        <h3>${esc(t("section.endQuestionnaire"))}</h3>
        ${kv(t("kv.promise"), q.internal?.promise)}
        ${kv(t("kv.visual"), q.internal?.visual)}
        ${kv(t("kv.frustrations"), q.internal?.frustrations)}
        ${kv(t("kv.nearStop"), q.internal?.nearStop)}
        ${kv(t("kv.barriers"), q.internal?.barriers)}
        ${kv(t("kv.rituals"), q.internal?.rituals)}
        ${kv(t("kv.downloadNow"), q.internal?.download)}
      </section>
      <section>
        <h3>${esc(t("section.j7"))}</h3>
        ${kv(t("kv.thought"), q.j7?.thought)}
        ${kv(t("kv.effect"), q.j7?.effect)}
        ${kv(t("kv.score"), q.j7?.score === null || q.j7?.score === undefined ? "NA" : `${fmtNumber(q.j7.score)}/10`, metricFormula("j7Score", "direct"))}
        ${kv(t("kv.downloadFuller"), q.j7?.download)}
        ${kv(t("kv.blockProgression"), q.j7?.blockers?.progression)}
        ${kv(t("kv.blockFusion"), q.j7?.blockers?.fusion)}
        ${kv(t("kv.blockTechnical"), q.j7?.blockers?.technical)}
        ${kv(t("kv.liked"), (q.j7?.liked || []).join(" · "))}
        ${kv(t("kv.disliked"), (q.j7?.disliked || []).join(" · "))}
        ${kv(t("kv.sound"), q.j7?.sound)}
      </section>
    </div>

    <section>
      <h3>${esc(t("section.comments"))}</h3>
      <div class="evidence-list">
        ${(q.j7?.comments || []).map((comment) => `<article class="evidence-line"><span class="source">${esc(sourceLabel("J+7 verbatim"))}</span><p>${textWithPercentHovers(comment)}</p></article>`).join("")}
        ${flags.map((flag) => `<article class="evidence-line"><span class="source" ${tooltipAttrs(termDefinition("coherenceFlag"))}>${esc(sourceLabel("Coherence flag"))}</span><p>${textWithPercentHovers(flag)}</p></article>`).join("")}
        ${confirmations.slice(0, 6).map((line) => `<article class="evidence-line"><span class="source">${esc(sourceLabel("Confirmation"))}</span><p>${textWithPercentHovers(line)}</p></article>`).join("")}
        ${!(q.j7?.comments || []).length && !flags.length && !confirmations.length ? `<div class="empty-state">${esc(t("section.noQualitative"))}</div>` : ""}
      </div>
    </section>

    <section>
      <h3>${esc(t("section.flow", { count: timeline.length }))}</h3>
      ${timeline.length ? renderFlowChart(timeline) : ""}
      <div class="timeline">
        ${timeline.length ? timeline.map((event) => `
          <div class="timeline-item">
            <time>${esc(event.timestamp || "NA")}</time>
            <div>
              <strong>${esc(event.event || "event")}</strong>
              <p>${textWithPercentHovers([event.platform, event.version, event.details].filter(Boolean).join(" · "))}</p>
            </div>
          </div>
        `).join("") : `<div class="empty-state">${esc(t("section.noTimeline"))}</div>`}
      </div>
    </section>
  `;
}

function render() {
  const filters = getFilters();
  els.activeDaysLabel.textContent = filters.activeDaysMin > 0 ? t("filters.activeDaysMin", { count: filters.activeDaysMin }) : t("filters.activeDaysAll");
  state.filteredUsers = state.data.users.filter((user) => userMatchesFilters(user, filters));
  renderStats(state.filteredUsers);
  renderKpiSection(state.filteredUsers);
  renderActionCards();
  renderActionDetail();
  renderJ7Macro(state.filteredUsers);
  renderTesterList();
  applySectionVisibility();
}

async function boot() {
  try {
    setupInstantTooltips();
    renderChrome();
    const response = await fetch("/assets/analytics-data.json");
    if (!response.ok) throw new Error(t("app.dataRequestFailed", { status: response.status }));
    state.data = await response.json();
    renderChrome();
    initFilters(state.data);
    bindEvents();
    state.selectedActionId = null;
    render();
  } catch (error) {
    document.querySelector("#app").innerHTML = `<main class="dashboard"><div class="empty-state">${esc(t("app.loadError", { message: error.message }))}</div></main>`;
  }
}

boot();
