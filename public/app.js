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
  sortScore: document.querySelector("#sortScore"),
  langEn: document.querySelector("#langEn"),
  langFr: document.querySelector("#langFr")
};

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
    "section.screening": "Screening",
    "section.usage": "Usage metrics",
    "section.endQuestionnaire": "End questionnaire",
    "section.j7": "J+7",
    "section.comments": "Comments and coherence",
    "section.flow": "Playtest flow ({count} events)",
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
    "section.screening": "Screening",
    "section.usage": "Métriques d'usage",
    "section.endQuestionnaire": "Questionnaire de fin",
    "section.j7": "J+7",
    "section.comments": "Commentaires et coherence",
    "section.flow": "Parcours de playtest ({count} événements)",
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

const CARD_COPY = {
  en: {
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
      nextAction: "Tutoriel v2, objectif final explicite, et polish de la sélection, de la caméra et du déplacement.",
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
      nextAction: "Clarifier la logique du hub : rendre visibles les affordances hors journal, les instrumenter et expliquer pourquoi revenir.",
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
      nextAction: "Ajouter le support codex, le recyclage, le rituel d'inversion, la mémoire de recettes et la prévention des impasses de grille.",
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
      nextAction: "Retravailler l'audio vers un design sonore plus ambiant, optionnel et situationnel.",
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
      nextAction: "Corriger le wording et la répétition des items, ajouter une progression/des objectifs plus clairs, et améliorer l'interprétation personnalisée des résultats.",
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
  return `${numberFormatter().format(n)}${suffix}`;
}

function fmtPct(value) {
  const n = num(value);
  if (n === null) return "NA";
  const rounded = Math.round(n);
  const detailed = `${numberFormatter().format(n)}%`;
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

function renderStats(users) {
  const s = computeStats(users);
  const cards = [
    [t("stat.filteredTesters"), fmtNumber(s.total), percent(s.total, state.data.users.length), "var(--blue)"],
    [t("stat.screeningCoverage"), fmtPct(percent(s.screening, s.total)), percent(s.screening, s.total), "var(--green)"],
    [t("stat.endQuestionnaire"), fmtPct(percent(s.end, s.total)), percent(s.end, s.total), "var(--green)"],
    [t("stat.j7Coverage"), fmtPct(percent(s.j7, s.total)), percent(s.j7, s.total), "var(--violet)"],
    [t("stat.fullChain"), fmtPct(percent(s.fullChain, s.total)), percent(s.fullChain, s.total), "var(--violet)"],
    [t("stat.medianActiveDays"), fmtNumber(s.activeDaysMedian), Math.min(100, (s.activeDaysMedian || 0) * 5), "var(--blue)"],
    [t("stat.medianActiveHours"), fmtNumber(s.activeHoursMedian, "h"), Math.min(100, (s.activeHoursMedian || 0) * 20), "var(--blue)"],
    [t("stat.d7Retained"), fmtPct(s.d7), s.d7, "var(--green)"],
    [t("stat.firstRecipeReached"), fmtPct(s.firstRecipe), s.firstRecipe, "var(--green)"],
    [t("stat.j7ScoreAvg"), fmtNumber(s.j7Score, "/10"), (s.j7Score || 0) * 10, "var(--amber)"],
    [t("stat.progressionBlock"), fmtPct(s.progressionBlock), s.progressionBlock, "var(--red)"],
    [t("stat.downloadPositive"), fmtPct(s.downloadPositive), s.downloadPositive, "var(--green)"]
  ];
  els.statsGrid.innerHTML = cards.map(([label, value, bar, color]) => `
    <article class="stat-card">
      <div class="label">${esc(label)}</div>
      <div class="value">${valueHtml(value)}</div>
      ${spark(bar, color)}
    </article>
  `).join("");
  els.subsetSentence.textContent = t("overview.subsetSentence", { shown: s.total, total: state.data.users.length, flags: s.flags });
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
  const rows = items[theme] || [
    ["Relevant users", relevant.length],
    ["Active days median", fmtNumber(median(relevant.map((u) => u.metrics?.activeDays)))],
    ["J+7 score", fmtNumber(mean(relevant.map((u) => u.questionnaire?.j7?.score)), "/10")],
    ["Download positive", fmtPct(percent(relevant.filter((u) => truthySignal(u, "downloadPositive")).length, relevant.length))],
    ["Flags", relevant.filter((u) => truthySignal(u, "coherenceFlag")).length],
    ["J+7 users", relevant.filter((u) => u.hasJ7).length]
  ];
  return rows.map(([label, value]) => [IMPACT_LABELS[state.lang]?.[label] || label, value]);
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
  const allCards = [...(state.data.mainCards || []), ...(state.data.actionCards || [])].map(localizedCard);
  const card = activeCards.find((item) => item.id === state.selectedActionId) || allCards.find((item) => item.id === state.selectedActionId) || activeCards[0];
  if (!card) {
    els.actionDetail.innerHTML = `<div class="empty-state">${esc(t("detail.noCard"))}</div>`;
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
        <p>${textWithPercentHovers(card.mainEvidence)}</p>
        <p><strong>${esc(cardActionLabel(card))}:</strong> ${textWithPercentHovers(card.nextAction)}</p>
      </div>
      <div class="detail-body">
        <section class="detail-section">
          <h3>${esc(t("detail.subsetImpact"))}</h3>
          <div class="impact-grid">
            ${impacts.map(([label, value]) => `
              <div class="mini-card"><span>${esc(label)}</span><strong>${valueHtml(value)}</strong></div>
            `).join("")}
          </div>
        </section>

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
  return `
    <article class="evidence-line">
      <span class="source">${esc(localizedLine.source)}${localizedLine.userId ? ` · ${esc(localizedLine.userId)}` : ""}</span>
      <p>${textWithPercentHovers(localizedLine.text)}</p>
      ${localizedLine.context ? `<small>${textWithPercentHovers(localizedLine.context)}</small>` : ""}
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
        <small>${fmtNumber(user.metrics?.activeDays)}${state.lang === "fr" ? "j" : "d"} · ${fmtNumber(user.metrics?.activeHours, "h")} · ${esc(t("tester.score"))} ${fmtNumber(user.questionnaire?.j7?.score, "/10")}</small>
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
          ${truthySignal(user, "coherenceFlag") ? `<span class="pill priority-p1">${esc(t("tester.flag"))}</span>` : ""}
          ${truthySignal(user, "downloadPositive") ? `<span class="pill">${esc(t("tester.downloadPositive"))}</span>` : ""}
        </div>
        <small>${fmtNumber(m.activeDays)} ${esc(t("tester.activeDays"))} · ${fmtNumber(m.sessions)} ${esc(t("tester.sessions"))} · ${esc(t("tester.score"))} ${fmtNumber(score, "/10")}</small>
        <div class="bar"><span style="width:${barValue}%"></span></div>
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

function kv(label, value) {
  const displayValue = value === null || value === undefined || value === "" ? "NA" : value;
  return `<div class="kv"><span>${esc(label)}</span><span>${valueHtml(displayValue)}</span></div>`;
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
          ${truthySignal(user, "coherenceFlag") ? `<span class="pill priority-p1">${esc(t("tester.coherenceFlag"))}</span>` : ""}
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
        ${kv(t("kv.activeDays"), fmtNumber(m.activeDays))}
        ${kv(t("kv.activeHours"), fmtNumber(m.activeHours, "h"))}
        ${kv(t("kv.sessions"), fmtNumber(m.sessions))}
        ${kv(t("kv.firstRecipe"), m.reachedFirstRecipe === 1 ? t("kv.firstRecipeYes", { value: fmtNumber(m.timeToFirstRecipeMin) }) : t("kv.no"))}
        ${kv(t("kv.failedMerge"), fmtPct((m.failedMergeRatio ?? null) === null ? null : m.failedMergeRatio * 100))}
        ${kv(t("kv.gridFill"), fmtPct(m.gridFillPct))}
        ${kv(t("kv.bfiDistinct"), fmtNumber(m.bfiDistinct))}
        ${kv(t("kv.questionRepeats"), fmtNumber(m.questionRepeats))}
        ${kv(t("kv.rituals"), fmtNumber(m.ritualCompleted))}
        ${kv(t("kv.observatoryVisits"), fmtNumber(m.observatoryVisits))}
        ${kv(t("kv.runtimeErrors"), fmtNumber(m.runtimeErrors))}
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
        ${kv(t("kv.score"), q.j7?.score === null || q.j7?.score === undefined ? "NA" : `${fmtNumber(q.j7.score)}/10`)}
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
        ${flags.map((flag) => `<article class="evidence-line"><span class="source">${esc(sourceLabel("Coherence flag"))}</span><p>${textWithPercentHovers(flag)}</p></article>`).join("")}
        ${confirmations.slice(0, 6).map((line) => `<article class="evidence-line"><span class="source">${esc(sourceLabel("Confirmation"))}</span><p>${textWithPercentHovers(line)}</p></article>`).join("")}
        ${!(q.j7?.comments || []).length && !flags.length && !confirmations.length ? `<div class="empty-state">${esc(t("section.noQualitative"))}</div>` : ""}
      </div>
    </section>

    <section>
      <h3>${esc(t("section.flow", { count: timeline.length }))}</h3>
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
  renderActionCards();
  renderActionDetail();
  renderTesterList();
}

async function boot() {
  try {
    renderChrome();
    const response = await fetch("/assets/analytics-data.json");
    if (!response.ok) throw new Error(t("app.dataRequestFailed", { status: response.status }));
    state.data = await response.json();
    renderChrome();
    initFilters(state.data);
    bindEvents();
    state.selectedActionId = state.data.mainCards?.[0]?.id || state.data.actionCards[0]?.id || null;
    render();
  } catch (error) {
    document.querySelector("#app").innerHTML = `<main class="dashboard"><div class="empty-state">${esc(t("app.loadError", { message: error.message }))}</div></main>`;
  }
}

boot();
