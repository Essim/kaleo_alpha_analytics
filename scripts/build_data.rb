require "csv"
require "json"
require "digest"
require "fileutils"
require "set"

PROJECT_ROOT = File.expand_path("..", __dir__)
SOURCE_ROOT = File.expand_path("..", PROJECT_ROOT)
DETAIL_DIR = File.join(SOURCE_ROOT, "Detailed analysis")
OUT_DIR = File.join(PROJECT_ROOT, "public", "assets")
OUT_FILE = File.join(OUT_DIR, "analytics-data.json")
PRIVATE_DIR = File.join(PROJECT_ROOT, "private")
MAP_FILE = File.join(PRIVATE_DIR, "anonymization_map.csv")

FileUtils.mkdir_p(OUT_DIR)
FileUtils.mkdir_p(PRIVATE_DIR)

EMAIL_PATTERN = /\b[A-Z0-9._%+\-]+@[A-Z0-9.\-]+\.[A-Z]{2,}\b/i

def csv_rows(path)
  return [] unless File.exist?(path)
  CSV.read(path, headers: true).map(&:to_h)
end

def norm_key(value)
  value.to_s.downcase.strip.gsub(/\s+/, "")
end

def num(value)
  text = value.to_s.strip.gsub(",", ".")
  return nil if text.empty? || text == "NA"
  Float(text)
rescue
  nil
end

def int(value)
  n = num(value)
  n.nil? ? nil : n.round
end

def yes?(value)
  value.to_s.strip.casecmp("Oui").zero?
end

def selected_options(row, prefix)
  row.select { |key, value| key.start_with?(prefix) && yes?(value) }
     .keys
     .map { |key| key[/\[(.*)\]\z/, 1] || key }
     .reject { |label| label =~ /Aucun|Non je n/ }
end

def compact_text(*values)
  values.flatten.map { |v| v.to_s.strip }.reject(&:empty?).uniq
end

def theme_for(text)
  t = text.to_s.downcase
  return "guidance" if t.match?(/progress|onboarding|prise en main|guidance|but|objectif|quoi faire|finalit/)
  return "fusion" if t.match?(/fusion|recette|grid|grille|tuile|tile|plateforme|objet/)
  return "questionnaire" if t.match?(/question|big five|bfi|répét|repet|personnalit/)
  return "results" if t.match?(/résultat|result|observatoire|journal|phénotyp/)
  return "audio" if t.match?(/audio|son|musique|sound/)
  return "technical" if t.match?(/bug|tech|runtime|crash|load|fps|performance|notification/)
  return "retention" if t.match?(/rétention|retention|download|télécharg|beta|recontact|retour|habitude|rituel quotidien/)
  return "visual" if t.match?(/visuel|graph|artistique|atmosph|rendu/)
  return "ritual" if t.match?(/rituel|ritual/)
  "product"
end

def severity_from_priority(priority)
  case priority.to_s.upcase
  when "P0" then 4
  when "P1" then 3
  when "P2" then 2
  else 1
  end
end

def stable_hash(value)
  Digest::SHA256.hexdigest(value.to_s)[0, 12]
end

def email_from_key(value)
  key = norm_key(value)
  key.include?("@") ? key : ""
end

def mask_email(email)
  local, domain = email.to_s.split("@", 2)
  return email.to_s if local.to_s.empty? || domain.to_s.empty?
  tld_last = domain.split(".").last.to_s[-1]
  "#{local[0]}***@***.**#{tld_last || "*"}"
end

def scrub_public_value(value)
  case value
  when Hash
    value.transform_values { |nested| scrub_public_value(nested) }
  when Array
    value.map { |nested| scrub_public_value(nested) }
  when String
    value.gsub(EMAIL_PATTERN) { |email| mask_email(email) }
  else
    value
  end
end

all_flow = csv_rows(File.join(DETAIL_DIR, "all_user_flow.csv"))
screening_rows = csv_rows(File.join(DETAIL_DIR, "screening_matched_enriched.csv"))
j7_rows = csv_rows(File.join(DETAIL_DIR, "j7_responses_enriched.csv"))
coherence_rows = csv_rows(File.join(DETAIL_DIR, "questionnaire_internal_j7_coherence_by_user.csv"))
flag_rows = csv_rows(File.join(DETAIL_DIR, "questionnaire_internal_j7_coherence_flags.csv"))
action_rows = csv_rows(File.join(DETAIL_DIR, "Dev_vs_alpha_action_cards.csv"))
evidence_rows = csv_rows(File.join(DETAIL_DIR, "Cartes_forces_faiblesses_FR.csv"))
entry_rows = csv_rows(File.join(DETAIL_DIR, "entry_points.csv"))
bug_rows = csv_rows(File.join(DETAIL_DIR, "bug_reports_extracted.csv"))
qual_rows = csv_rows(File.join(DETAIL_DIR, "j7_qualitative_examples_with_flow.csv"))
all_questionnaire_index = csv_rows(File.join(DETAIL_DIR, "Users answered all questionnaires", "_index.csv"))
kpi_dictionary = csv_rows(File.join(SOURCE_ROOT, "KPIs", "KPI_metric_dictionary.csv"))
kpi_user_rows = csv_rows(File.join(SOURCE_ROOT, "KPIs", "metrics_by_user_all_kpis.csv"))

participant_by_key = {}
all_flow.each do |row|
  key = norm_key(row["user_key_norm"] || row["user_key"])
  next if key.empty?
  participant_by_key[key] = row["participant_id"].to_s.strip unless row["participant_id"].to_s.strip.empty?
end
screening_rows.each do |row|
  key = norm_key(row["user_key_norm"] || row["user_key"])
  next if key.empty?
  participant_by_key[key] ||= row["participant_id"].to_s.strip unless row["participant_id"].to_s.strip.empty?
end
j7_rows.each do |row|
  key = norm_key(row["user_key_norm"] || row["matched_user_key_norm"] || row["email_norm"])
  next if key.empty?
  participant_by_key[key] ||= row["participant_id"].to_s.strip unless row["participant_id"].to_s.strip.empty?
end

kpi_by_key = kpi_user_rows.to_h do |row|
  key = norm_key(row["user_key"])
  values = {}
  row.each do |field, value|
    next if field == "user_key"
    parsed = num(value)
    values[field] = parsed unless parsed.nil?
  end
  [key, values]
end

local_id_by_key = {}
all_keys = (all_flow.map { |r| norm_key(r["user_key_norm"] || r["user_key"]) } |
            screening_rows.map { |r| norm_key(r["user_key_norm"] || r["user_key"]) } |
            j7_rows.map { |r| norm_key(r["user_key_norm"] || r["matched_user_key_norm"] || r["email_norm"]) } |
            kpi_user_rows.map { |r| norm_key(r["user_key"]) }).reject(&:empty?).sort
existing_id_by_key = {}
if File.exist?(MAP_FILE)
  CSV.foreach(MAP_FILE, headers: true) do |row|
    key = norm_key(row["original_user_id"])
    local_id = row["local_user_id"].to_s.strip
    next if key.empty? || local_id.empty?
    existing_id_by_key[key] = local_id
  end
end
used_ids = existing_id_by_key.values.to_set
max_id_number = used_ids.map { |local_id| local_id[/\AKT-(\d+)\z/, 1].to_i }.max || 0
all_keys.each do |key|
  if existing_id_by_key[key]
    local_id_by_key[key] = existing_id_by_key[key]
    next
  end
  begin
    max_id_number += 1
    candidate = "KT-#{max_id_number.to_s.rjust(3, "0")}"
  end while used_ids.include?(candidate)
  used_ids << candidate
  local_id_by_key[key] = candidate
end

CSV.open(MAP_FILE, "w") do |csv|
  csv << ["local_user_id", "original_user_id", "participant_id", "email", "masked_email", "source_key_hash"]
  all_keys.each do |key|
    email = email_from_key(key)
    csv << [
      local_id_by_key[key],
      key,
      participant_by_key[key],
      email,
      email.empty? ? "" : mask_email(email),
      stable_hash(key)
    ]
  end
end

tester_ref_by_quote = lambda do |quote|
  needle = quote.to_s.downcase
  row = qual_rows.find { |candidate| candidate.values.join(" ").downcase.include?(needle) } ||
        j7_rows.find { |candidate| candidate.values.join(" ").downcase.include?(needle) }
  key_source = row && (row["user_key"] || row["user_key_norm"] || row["matched_user_key_norm"] || row["email_norm"] || row["email"])
  local_id_by_key[norm_key(key_source)] || "one tester"
end

screening_by_key = screening_rows.to_h { |row| [norm_key(row["user_key_norm"] || row["user_key"]), row] }
j7_by_key = j7_rows.to_h { |row| [norm_key(row["user_key_norm"] || row["matched_user_key_norm"] || row["email_norm"]), row] }
coherence_by_key = coherence_rows.to_h { |row| [norm_key(row["user_key_norm"]), row] }
all_questionnaires_by_key = all_questionnaire_index.to_h { |row| [norm_key(row["user_key"]), row] }

timeline_by_key = {}
all_questionnaire_index.each do |row|
  key = norm_key(row["user_key"])
  folder = row["folder"].to_s
  path = File.join(folder, "key_events.csv")
  next if key.empty? || !File.exist?(path)
  timeline_by_key[key] = csv_rows(path).map do |event|
    {
      "timestamp" => event["timestamp"],
      "event" => event["event_name"],
      "session" => event["session_id"],
      "version" => event["client_version"],
      "platform" => event["platform"],
      "details" => event["details"]
    }
  end
end

def synthetic_timeline(row)
  event_pairs = [
    ["screening", row["screening_submitted_at"]],
    ["first_event", row["first_event_at"]],
    ["alpha_gate_completed", row["first_alpha_gate_completed_at"]],
    ["tutorial_completed", row["first_tutorial_completed_at"]],
    ["first_post_onboarding_action", row["first_first_post_onboarding_action_at"]],
    ["first_tile_merge", row["first_tile_merge_at"]],
    ["first_ritual_completed", row["first_ritual_completed_at"]],
    ["first_observatory_entered", row["first_observatory_entered_at"]],
    ["first_journal_opened", row["first_journal_opened_at"]],
    ["end_questionnaire_completed", row["first_end_questionnaire_completed_at"]],
    ["j7_submitted", row["j7_Date de soumission"]]
  ]
  event_pairs.select { |_, ts| ts.to_s.strip != "" }
             .map { |event, ts| { "timestamp" => ts, "event" => event, "session" => nil, "version" => nil, "platform" => row["platforms"], "details" => "synthetic milestone" } }
             .sort_by { |e| e["timestamp"].to_s }
end

def signal_from_user(metrics, j7, coherence)
  end_frustrations = coherence["end_q4_frustrations"].to_s
  end_barriers = coherence["end_q8_barriers"].to_s
  flags = coherence["coherence_flags"].to_s
  confirmations = coherence["coherence_confirmations"].to_s
  download = j7["Si l'application était disponible dans une version plus étoffée, avec des questions spécifiques sur la santé mentale, une orientation vers des solutions de prévention adaptées, ainsi que davantage de niveaux de jeu et de tuiles , est-ce que vous la téléchargeriez ?"].to_s.strip
  score = num(j7["Sur 10, quelle note donneriez-vous à l'expérience globale de cette version Alpha ?"])
  {
    "progressionBlock" => yes?(j7["Avez-vous été bloqué.e à un moment durant le playtest ? Si oui, pourquoi ? [Je n’ai pas compris comment progresser dans le jeu]"]) || end_barriers.match?(/quoi faire|progression/i) || flags.match?(/Blocage progression/i),
    "fusionBlock" => yes?(j7["Avez-vous été bloqué.e à un moment durant le playtest ? Si oui, pourquoi ? [Je n’ai pas compris comment fusionner les tuiles]"]) || end_frustrations.match?(/Fusion|recettes/i) || metrics["failedMergeRatio"].to_f >= 0.3,
    "technicalBlock" => yes?(j7["Avez-vous été bloqué.e à un moment durant le playtest ? Si oui, pourquoi ? [Un bug ou problème technique m’a empêché de continuer]"]) || metrics["runtimeErrors"].to_i > 0,
    "notificationIssue" => metrics["notificationRuntimeErrors"].to_i > 0 || flags.match?(/notification/i) || end_frustrations.match?(/Notification/i),
    "likedGraphics" => yes?(j7["Quels aspects de l'expérience avez-vous le plus appréciés ? [Le rendu graphique]"]) || coherence["end_q3_visual"].to_s.match?(/Oui|agréable/i),
    "likedMusic" => yes?(j7["Quels aspects de l'expérience avez-vous le plus appréciés ? [La musique]"]),
    "dislikedMusic" => yes?(j7["Quels aspects de l'expérience avez-vous le moins appréciés ? [La musique]"]) || j7["Avez-vous joué avec le son ?"].to_s.match?(/ne m.a pas plu/i),
    "questionnaireFriction" => yes?(j7["Quels aspects de l'expérience avez-vous le moins appréciés ? [L'expérience de questionnement (test de personnalité)]"]) || end_frustrations.match?(/Questionnaires/i) || metrics["questionRepeats"].to_i >= 10,
    "resultsInterest" => yes?(j7["Quels aspects de l'expérience avez-vous le plus appréciés ? [L'expérience de consultation des résultats (test de personnalité)]"]) || metrics["observatoryVisits"].to_i > 0,
    "ritualEngaged" => metrics["ritualCompleted"].to_i >= 5,
    "downloadPositive" => ["Oui", "Probablement"].include?(download),
    "lowScore" => !score.nil? && score <= 4,
    "highScore" => !score.nil? && score >= 7,
    "coherenceFlag" => flags.strip != "",
    "coherenceConfirmed" => confirmations.strip != "",
    "powerUser" => metrics["activeDays"].to_f >= 7 || metrics["activeHours"].to_f >= 2.0
  }
end

users = all_flow.map.with_index do |row, index|
  key = norm_key(row["user_key_norm"] || row["user_key"])
  next if key.empty?
  screening = screening_by_key[key] || {}
  j7 = j7_by_key[key] || {}
  coherence = coherence_by_key[key] || {}
  local_id = local_id_by_key[key] || "KT-#{(index + 1).to_s.rjust(3, "0")}"
  metrics = {
    "activeHours" => num(row["KPI_01_Temps__total_active_hours"]),
    "sessions" => int(row["KPI_01_Temps__session_count"] || row["event_session_count"]),
    "activeDays" => int(row["KPI_12_Retention__active_days_count"]),
    "retainedD7" => int(row["KPI_12_Retention__retained_d7"]),
    "distinctObjects" => num(row["KPI_05_Objets__distinct_objects_discovered"]),
    "failedMergeRatio" => num(row["KPI_05_Objets__failed_merge_ratio"]),
    "gridFillPct" => num(row["KPI_07_Grid__final_fill_rate_pct"]),
    "bfiDistinct" => num(row["KPI_08_Questions_BFI__bfi_questions_distinct_shown"]),
    "bfiCompletionPct" => num(row["KPI_08_Questions_BFI__completion_pct_proxy"]),
    "ritualCompleted" => num(row["KPI_06_Rituels__ritual_completed_count"]),
    "ritualCompletionRate" => num(row["KPI_06_Rituels__ritual_completion_rate"]),
    "questionnaireInstances" => num(row["KPI_19_Questionnaire_Load__questionnaire_instances"]),
    "secondsPerQuestion" => num(row["KPI_19_Questionnaire_Load__seconds_per_question"]),
    "observatoryVisits" => num(row["KPI_18_Observatoire__observatory_visit_count"]),
    "journalOpenRate" => num(row["KPI_18_Observatoire__journal_open_rate"]),
    "runtimeErrorsPer100Sessions" => num(row["KPI_20_Tech_Risk__runtime_errors_per_100_sessions"]),
    "p95LoadMs" => num(row["KPI_20_Tech_Risk__p95_load_ms"]),
    "lowFpsRate" => num(row["KPI_20_Tech_Risk__low_fps_rate"]),
    "timeToFirstRecipeMin" => num(row["KPI_14_First_Recipe__time_to_recipe_1_min"]),
    "reachedFirstRecipe" => int(row["KPI_14_First_Recipe__reached_recipe_1"]),
    "interactionsPerRecipe" => num(row["KPI_15_Recipe_Efficiency__interactions_per_recipe"]),
    "topTileShare" => num(row["KPI_16_Tile_Concentration__top_tile_share"]),
    "soundSessionRate" => num(row["KPI_09_Musique__device_volume_nonzero_session_rate"]),
    "questionTotal" => int(row["question_shown_total"]),
    "questionDistinct" => int(row["question_shown_distinct"]),
    "questionRepeats" => int(row["question_shown_exact_repeat_count"]),
    "runtimeErrors" => int(row["runtime_error_events"]),
    "notificationRuntimeErrors" => int(row["notification_runtime_error_events"]),
    "endQuestionnaireCompleted" => int(row["end_questionnaire_completed_count"] || row["end_questionnaire_completed_events"])
  }
  questionnaire = {
    "screening" => {
      "submittedAt" => screening["submitted_at"] || row["screening_submitted_at"],
      "age" => screening["Dans quelle tranche d’âge êtes-vous ?"] || row["screening_Dans quelle tranche d’âge êtes-vous ?"],
      "profession" => screening["Quelle est votre situation professionnelle actuelle ?"] || row["screening_Quelle est votre situation professionnelle actuelle ?"],
      "workRhythm" => screening["Quel est votre rythme de travail ?"] || row["screening_Quel est votre rythme de travail ?"],
      "smartphone" => screening["À quelle fréquence utilisez-vous votre smartphone ?"] || row["screening_À quelle fréquence utilisez-vous votre smartphone ?"],
      "wellnessApps" => screening["Utilisez-vous des applications mobiles de bien-être, santé ou développement personnel ?"] || row["screening_Utilisez-vous des applications mobiles de bien-être, santé ou développement personnel ?"],
      "multiDayComfort" => screening["Seriez-vous à l’aise avec l’utilisation d’une application mobile pendant plusieurs jours consécutifs ?"] || row["screening_Seriez-vous à l’aise avec l’utilisation d’une application mobile pendant plusieurs jours consécutifs ?"],
      "conditions" => selected_options(screening, "Dans quelle(s) condition(s) utiliseriez-vous une application mobile sur plusieurs jours ?")
    },
    "internal" => {
      "completedAt" => coherence["end_completed_at"] || row["first_end_questionnaire_completed_at"],
      "promise" => coherence["end_q1_promise"],
      "visual" => coherence["end_q3_visual"],
      "frustrations" => coherence["end_q4_frustrations"],
      "nearStop" => coherence["end_q5_near_stop"],
      "frequency" => coherence["end_q6_frequency"],
      "barriers" => coherence["end_q8_barriers"],
      "rituals" => coherence["end_q9_rituals"],
      "download" => coherence["end_q10_download"],
      "confirmations" => coherence["coherence_confirmations"].to_s.split(" || ").reject(&:empty?),
      "flags" => coherence["coherence_flags"].to_s.split(" || ").reject(&:empty?)
    },
    "j7" => {
      "submittedAt" => j7["Date de soumission"] || row["j7_Date de soumission"],
      "thought" => j7["Depuis la fin du test, avez-vous pensé à l'application ?"] || row["j7_Depuis la fin du test, avez-vous pensé à l'application ?"],
      "effect" => j7["Dans quelle mesure cette expérience a-t-elle eu un effet positif sur vous, même léger ?"] || row["j7_Dans quelle mesure cette expérience a-t-elle eu un effet positif sur vous, même léger ?"],
      "blockers" => {
        "progression" => j7["Avez-vous été bloqué.e à un moment durant le playtest ? Si oui, pourquoi ? [Je n’ai pas compris comment progresser dans le jeu]"],
        "fusion" => j7["Avez-vous été bloqué.e à un moment durant le playtest ? Si oui, pourquoi ? [Je n’ai pas compris comment fusionner les tuiles]"],
        "technical" => j7["Avez-vous été bloqué.e à un moment durant le playtest ? Si oui, pourquoi ? [Un bug ou problème technique m’a empêché de continuer]"]
      },
      "liked" => selected_options(j7, "Quels aspects de l'expérience avez-vous le plus appréciés ?"),
      "disliked" => selected_options(j7, "Quels aspects de l'expérience avez-vous le moins appréciés ?"),
      "sound" => j7["Avez-vous joué avec le son ?"],
      "naturalFrequency" => j7["Quelle fréquence d'utilisation vous semblerait naturelle pour ce type d'application ?"] || row["j7_Quelle fréquence d'utilisation vous semblerait naturelle pour ce type d'application ?"],
      "score" => num(j7["Sur 10, quelle note donneriez-vous à l'expérience globale de cette version Alpha ?"] || row["j7_Sur 10, quelle note donneriez-vous à l'expérience globale de cette version Alpha ?"]),
      "download" => j7["Si l'application était disponible dans une version plus étoffée, avec des questions spécifiques sur la santé mentale, une orientation vers des solutions de prévention adaptées, ainsi que davantage de niveaux de jeu et de tuiles , est-ce que vous la téléchargeriez ?"] || row["j7_Si l'application était disponible dans une version plus étoffée, avec des questions spécifiques sur la santé mentale, une orientation vers des solutions de prévention adaptées, ainsi que davantage de niveaux de jeu et de tuiles , est-ce que vous la téléchargeriez ?"],
      "comments" => compact_text(
        j7["Depuis la fin du test, avez-vous pensé à l'application ? [Commentaire]"],
        j7["Dans quelle mesure cette expérience a-t-elle eu un effet positif sur vous, même léger ? [Commentaire]"],
        j7["Avez-vous joué avec le son ? [Commentaire]"],
        j7["Y a-t-il quelque chose qui vous semblait bien pendant le test, mais qui vous paraît moins convaincant avec le recul ?"],
        j7["À l'inverse, y a-t-il quelque chose que vous n'aviez pas apprécié sur le moment, mais qui vous semble plus pertinent maintenant ?"],
        j7["Sur 10, quelle note donneriez-vous à l'expérience globale de cette version Alpha ? [Commentaire]"],
        j7["Si l'application était disponible dans une version plus étoffée, avec des questions spécifiques sur la santé mentale, une orientation vers des solutions de prévention adaptées, ainsi que davantage de niveaux de jeu et de tuiles , est-ce que vous la téléchargeriez ? [Commentaire]"],
        j7["Y a-il autre chose que vous souhaiteriez partager ?"]
      )
    }
  }
  timeline = timeline_by_key[key] || synthetic_timeline(row)
  {
    "id" => local_id,
    "hasScreening" => questionnaire["screening"]["submittedAt"].to_s.strip != "",
    "hasEndQuestionnaire" => metrics["endQuestionnaireCompleted"].to_i > 0 || questionnaire["internal"]["completedAt"].to_s.strip != "",
    "hasJ7" => questionnaire["j7"]["submittedAt"].to_s.strip != "",
    "hasAllQuestionnaires" => all_questionnaires_by_key.key?(key),
    "platforms" => row["platforms"].to_s.split(";").reject(&:empty?),
    "clientVersions" => row["client_versions"].to_s.split(";").reject(&:empty?),
    "firstEventAt" => row["first_event_at"],
    "lastEventAt" => row["last_event_at"],
    "metrics" => metrics,
    "kpis" => kpi_by_key[key] || {},
    "questionnaire" => questionnaire,
    "signals" => signal_from_user(metrics, j7, coherence),
    "timeline" => timeline
  }
end.compact

evidence_cards = evidence_rows.map do |row|
  proofs = (1..5).map { |i| row["preuve_#{i}"] }.compact.reject(&:empty?)
  text = ([row["carte_fr"]] + proofs).join(" ")
  {
    "id" => row["id"],
    "type" => row["type"],
    "title" => row["carte_fr"],
    "theme" => theme_for(text),
    "proofs" => proofs
  }
end

entry_points = entry_rows.map.with_index do |row, index|
  text = row.values.join(" ")
  {
    "id" => "EP-#{(index + 1).to_s.rjust(2, "0")}",
    "title" => row["entry_point"],
    "theme" => theme_for(text),
    "questionnaireWarning" => row["questionnaire_warning"],
    "bugWarning" => row["bug_warning"],
    "metricConfirmation" => row["metric_confirmation"],
    "interpretation" => row["interpretation"]
  }
end

action_cards = action_rows.map do |row|
  text = row.values.join(" ")
  theme = theme_for(text)
  {
    "id" => row["id"],
    "title" => row["card"],
    "status" => row["status"],
    "priority" => row["priority"],
    "severity" => severity_from_priority(row["priority"]),
    "theme" => theme,
    "mainEvidence" => row["main_evidence"],
    "nextAction" => row["next_action"],
    "relatedEvidenceIds" => evidence_cards.select { |e| e["theme"] == theme }.map { |e| e["id"] },
    "relatedEntryIds" => entry_points.select { |e| e["theme"] == theme }.map { |e| e["id"] }
  }
end

main_cards = [
  {
    "id" => "MC-S01",
    "kind" => "strength",
    "title" => "Visual atmosphere: graphics are the most cited positive feature in J+7",
    "theme" => "visual",
    "status" => "Strength",
    "severity" => 2,
    "mainEvidence" => "28/55 J+7 respondents, 50.9%, cited graphic rendering among the most appreciated aspects.",
    "nextAction" => "Preserve the visual direction and use it as the front-facing hook while improving guidance and value clarity.",
    "evidence" => [
      "Top positive mention: 28/55 J+7 respondents, 50.9%, cited graphic rendering among the most appreciated aspects.",
      "Stronger than other positive items: graphics exceeded results consultation (22/55) and questioning (21/55).",
      "Weaker negative signal: only 8/55, 14.5%, cited graphics among least appreciated; the positive signal exceeds the negative by +20 respondents.",
      "Qualitative support: #{tester_ref_by_quote.call("design est bien et agréable")} wrote that the design was good and pleasant for navigation.",
      "Recognized despite criticism: #{tester_ref_by_quote.call("cela reste une belle application")} concluded that it remains a beautiful app, while asking for more concrete solutions."
    ]
  },
  {
    "id" => "MC-S02",
    "kind" => "strength",
    "title" => "Personality/results promise: questions and results attract; requests point to clarity, not concept rejection",
    "theme" => "results",
    "status" => "Strength",
    "severity" => 2,
    "mainEvidence" => "22/55 J+7 respondents, 40.0%, appreciated consulting personality results; 21/55, 38.2%, appreciated questioning.",
    "nextAction" => "Keep the personality/results promise, but make interpretation clearer, safer and more actionable.",
    "evidence" => [
      "Results strongly appreciated: 22/55 J+7 respondents, 40.0%, cited personality result consultation among the most appreciated aspects.",
      "Questioning also attractive: 21/55, 38.2%, cited the questioning experience among the most appreciated aspects.",
      "Improvement-oriented comments: qualitative analysis found 16 comments linked to results/personality from 11 distinct users.",
      "Explicit expectation of analysis: #{tester_ref_by_quote.call("hâte de lire les analyses")} wrote that they were looking forward to reading the analyses and that some results matched quite well.",
      "Retrospective relevance: #{tester_ref_by_quote.call("pertinence du rendu sur la personnalité")} mentioned the relevance of the personality rendering after answering the questions."
    ]
  },
  {
    "id" => "MC-S03",
    "kind" => "strength",
    "title" => "Relaxing potential: some users explicitly describe the app as restful, relaxing or ritual-like",
    "theme" => "ritual",
    "status" => "Strength",
    "severity" => 2,
    "mainEvidence" => "24/55 J+7 respondents, 43.6%, reported at least a slight positive effect.",
    "nextAction" => "Design for calm, short and repeatable sessions; turn this into an intentional ritual loop rather than an accidental effect.",
    "evidence" => [
      "A light positive effect exists: 24/55 J+7 respondents, 43.6%, declared at least a slight positive effect.",
      "Explicit ritualization: #{tester_ref_by_quote.call("C'est devenu un rituel")} wrote \"It became a ritual\" and showed a very engaged flow: 23 active days, 114 sessions, 10.7 active hours, J+7 score 8.",
      "Rest/relaxation explicit: #{tester_ref_by_quote.call("Sympa, relaxant")} wrote that the experience was restful, then \"nice, relaxing\"; their flow was heavy: 17 active days, 66 sessions, 25.2 active hours.",
      "Relaxation explicit: #{tester_ref_by_quote.call("certaine détente")} wrote that they felt some relaxation when using the app; flow: 12 active days, 37 sessions, J+7 score 7.",
      "Audio positive for some: #{tester_ref_by_quote.call("La musique invite à la détente")} wrote that music invites relaxation and calms the mind; this does not cancel the negative audio signal, but reveals polarized sound-design potential."
    ]
  },
  {
    "id" => "MC-S04",
    "kind" => "strength",
    "title" => "Future appetite: most J+7 respondents would probably or definitely download a fuller version and accept beta recontact",
    "theme" => "retention",
    "status" => "Strength",
    "severity" => 2,
    "mainEvidence" => "44/55 J+7 respondents, 80.0%, answered Yes or Probably for a fuller version.",
    "nextAction" => "Keep the beta/recontact funnel active and frame the fuller version around prevention, concrete benefits, levels and richer tiles.",
    "evidence" => [
      "Probable or definite download: 44/55 J+7 respondents, 80.0%, answered Yes or Probably for a fuller version.",
      "Beta recontact accepted: 44/55, 80.0%, accepted being recontacted for the beta playtest.",
      "Post-test memory: 36/55, 65.5%, said they had thought about the app sometimes or often since the end of the test.",
      "Natural cadence remains credible: 47/55, 85.5%, imagine a natural frequency of daily or a few times per week.",
      "Screened population predisposed to multi-day use: 369/373, 98.9%, said they were comfortable with a multi-day app, either without issue or if it was not too constraining."
    ]
  },
  {
    "id" => "MC-W01",
    "kind" => "weakness",
    "title" => "Purpose and progression remain under-explained after onboarding",
    "theme" => "guidance",
    "status" => "Weakness",
    "severity" => 4,
    "mainEvidence" => "30/55 J+7 respondents, 54.5%, said they were blocked because they did not understand how to progress.",
    "nextAction" => "Tutorial v2, explicit final objective, and polish for selection, camera and movement.",
    "evidence" => [
      "Primary J+7 block: 30/55 respondents, 54.5%, said they were blocked because they did not understand how to progress.",
      "Onboarding/handling highly criticized: 25/55, 45.5%, cited handling, navigation or manipulation among the least appreciated aspects.",
      "Regular-use brake: 16/55, 29.1%, cited complexity as a usage brake; 11/55, 20.0%, cited lack of support.",
      "Convergent bug reports: 8/37 deduplicated bug reports were classified as guidance_or_blocked_progress.",
      "The first wow is not enough: first recipe is reached by 84.7%, but median active days remain 3.0 and average J+7 retention is 23.6%."
    ]
  },
  {
    "id" => "MC-W02",
    "kind" => "weakness",
    "title" => "Observatory value outside the journal/results path is weak or under-instrumented",
    "theme" => "results",
    "status" => "Weakness",
    "severity" => 3,
    "mainEvidence" => "Among users who visit the observatory, the median journal open rate is 100.0%, while non-journal observatory use is nearly absent.",
    "nextAction" => "Clarify hub logic: make non-journal observatory affordances visible, instrument them, and explain why users should return.",
    "evidence" => [
      "The observatory is mostly a path to the journal: among users who visit it, the median journal open rate is 100.0%.",
      "Non-journal activity is nearly absent: the median non-journal observatory visit rate is 0.0%.",
      "Journal bypass is nearly absent: the median journal_bypass_rate is also 0.0%, suggesting little autonomous observatory use.",
      "Visits exist but remain concentrated: the median observatory visit count is 3.0; the place is seen, but usage appears narrow.",
      "Field reports: 6/37 bug reports were classified as observatory_journal_results, with recurring signals such as being unable to open elements or difficulty finding another place."
    ]
  },
  {
    "id" => "MC-W03",
    "kind" => "weakness",
    "title" => "Tile fusion lacks affordance, recipe memory and grid management",
    "theme" => "fusion",
    "status" => "Weakness",
    "severity" => 4,
    "mainEvidence" => "Fusion/grid friction appears across J+7 blockers, least-liked gameplay, comments, bug reports and merge metrics.",
    "nextAction" => "Add codex support, recycling, inversion ritual, recipe memory and grid expansion/dead-end prevention.",
    "evidence" => [
      "Explicit fusion block: 7/55 J+7 respondents, 12.7%, said they were blocked because they did not understand how to merge tiles.",
      "Gameplay experience criticized: 15/55, 27.3%, cited gameplay (rituals, fusions, layout) among the least appreciated aspects.",
      "Numerous comments: 18/55 J+7 respondents, 32.7%, mentioned fusion, tiles, grid or objects as a friction point.",
      "Convergent bug reports: 10/37 bug reports were classified as tile_fusion_grid_ritual.",
      "Metric confirmation: failed merge ratio median is 29.6%, final fill median is 42.0%, and median interactions per recipe are 35.2."
    ]
  },
  {
    "id" => "MC-W04",
    "kind" => "weakness",
    "title" => "Audio produces a small but sharp negative signal",
    "theme" => "audio",
    "status" => "Weakness",
    "severity" => 3,
    "mainEvidence" => "7/55 J+7 respondents, 12.7%, played without sound because music or sound design did not please them.",
    "nextAction" => "Rework audio toward a more ambient, optional and situational sound design.",
    "evidence" => [
      "Direct sound rejection: 7/55 J+7 respondents, 12.7%, said they played without sound because music or sound design did not please them.",
      "Music among least appreciated: 7/55, 12.7%, cited music among the least appreciated aspects.",
      "Clear qualitative comments: 4/55 respondents, 7.3%, formulated comments such as stressful, unpleasant or dislike.",
      "Audio bug reports: 2/37 bug reports were classified as audio.",
      "Instrumentation remains insufficient: median sessions with non-zero device volume is 64.3%, but this does not prove that Kaleotopia music was active or appreciated."
    ]
  },
  {
    "id" => "MC-W05",
    "kind" => "weakness",
    "title" => "Big Five progress is too slow for repeated or semi-opposite items to feel worthwhile",
    "theme" => "questionnaire",
    "status" => "Weakness",
    "severity" => 3,
    "mainEvidence" => "14/55 J+7 respondents, 25.5%, cited the questioning experience among the least appreciated aspects.",
    "nextAction" => "Fix item wording and repetition, add clearer progress/objectives, and improve custom result interpretation.",
    "evidence" => [
      "Questioning criticized: 14/55 J+7 respondents, 25.5%, cited the questioning experience among the least appreciated aspects.",
      "Repetition comments: 9/55 J+7 respondents, 16.4%, explicitly mentioned repetitive or redundant questions.",
      "Exact repeat metric: exact question repeats reached 39.7% in the measured question flow.",
      "Slow progress: median BFI completion proxy remains 5.0%, so repeated or semi-opposite items often fail to feel worthwhile.",
      "Not a per-question duration problem: median seconds per question is 6.16s; friction comes more from perceived repetition and weak value feedback."
    ]
  }
]

qualitative_examples = qual_rows.map.with_index do |row, index|
  key = norm_key(row["user_key"])
  text = [row["question"], row["comment"], row["flow_summary"]].join(" ")
  {
    "id" => "QX-#{(index + 1).to_s.rjust(3, "0")}",
    "userId" => local_id_by_key[key],
    "theme" => theme_for(text),
    "question" => row["question"],
    "comment" => row["comment"],
    "flowSummary" => row["flow_summary"]
  }
end

bugs = bug_rows.map.with_index do |row, index|
  text = [row["description"], row["categories"]].join(" ")
  {
    "id" => "BUG-#{(index + 1).to_s.rjust(3, "0")}",
    "timestamp" => row["timestamp"],
    "description" => row["description"],
    "version" => row["app_version"],
    "platform" => row["platform"],
    "notificationException" => row["notification_exception_in_recent_logs"],
    "categories" => row["categories"].to_s.split(/[;,]/).map(&:strip).reject(&:empty?),
    "theme" => theme_for(text)
  }
end

coherence_lines = flag_rows.map.with_index do |row, index|
  key = norm_key(row["user_key_norm"])
  {
    "id" => "COH-#{(index + 1).to_s.rjust(3, "0")}",
    "type" => row["type"],
    "userId" => local_id_by_key[key],
    "theme" => theme_for(row["message"]),
    "message" => row["message"]
  }
end

source_lines = []
main_cards.each do |card|
  source_lines << { "id" => "#{card["id"]}-SUMMARY", "cardId" => card["id"], "source" => "#{card["status"]} summary", "theme" => card["theme"], "label" => card["title"], "text" => card["mainEvidence"] }
  source_lines << { "id" => "#{card["id"]}-ACTION", "cardId" => card["id"], "source" => "#{card["status"]} action", "theme" => card["theme"], "label" => card["title"], "text" => card["nextAction"] }
  card["evidence"].each_with_index do |evidence, index|
    source_lines << { "id" => "#{card["id"]}-EV#{index + 1}", "cardId" => card["id"], "source" => "#{card["status"]} evidence", "theme" => card["theme"], "label" => card["title"], "text" => evidence }
  end
end
action_cards.each do |card|
  source_lines << { "id" => "#{card["id"]}-E", "cardId" => card["id"], "source" => "Action card", "theme" => card["theme"], "label" => card["title"], "text" => card["mainEvidence"] }
  source_lines << { "id" => "#{card["id"]}-N", "cardId" => card["id"], "source" => "Action card", "theme" => card["theme"], "label" => card["title"], "text" => card["nextAction"] }
end
entry_points.each do |entry|
  %w[questionnaireWarning bugWarning metricConfirmation interpretation].each do |field|
    source_lines << { "id" => "#{entry["id"]}-#{field}", "source" => "Entry point", "theme" => entry["theme"], "label" => entry["title"], "text" => entry[field] }
  end
end
qualitative_examples.each do |example|
  source_lines << { "id" => example["id"], "source" => "J+7 verbatim", "theme" => example["theme"], "label" => example["question"], "userId" => example["userId"], "text" => example["comment"], "context" => example["flowSummary"] }
end
bugs.each do |bug|
  source_lines << { "id" => bug["id"], "source" => "Bug report", "theme" => bug["theme"], "label" => bug["categories"].join(", "), "text" => bug["description"], "context" => [bug["platform"], bug["version"]].compact.join(" / ") }
end
coherence_lines.each do |line|
  source_lines << { "id" => line["id"], "source" => line["type"] == "flag" ? "Coherence flag" : "Coherence confirmation", "theme" => line["theme"], "label" => line["userId"], "userId" => line["userId"], "text" => line["message"] }
end

metric_dictionary = kpi_dictionary.first(160).map do |row|
  {
    "kpiId" => row["kpi_id"],
    "name" => row["kpi_name"],
    "metric" => row["metric"],
    "key" => "#{row["kpi_id"]}__#{row["metric"]}",
    "formula" => row["formula_context"],
    "limits" => row["limits"]
  }
end

kpi_groups = metric_dictionary.group_by { |row| row["kpiId"] }.map do |kpi_id, rows|
  {
    "id" => kpi_id,
    "name" => rows.first["name"],
    "metrics" => rows.map do |row|
      {
        "key" => row["key"],
        "metric" => row["metric"],
        "formula" => row["formula"],
        "limits" => row["limits"]
      }
    end
  }
end

data = {
  "generatedAt" => Time.now.strftime("%Y-%m-%d %H:%M:%S %z"),
  "privacy" => {
    "mode" => "anonymized",
    "note" => "Raw emails and source user ids are not exported to the deployable website. Public users are referenced only by local ids such as KT-001. The conversion table is generated in private/anonymization_map.csv and is outside the deployed assets directory."
  },
  "counts" => {
    "users" => users.size,
    "mainCards" => main_cards.size,
    "actionCards" => action_cards.size,
    "entryPoints" => entry_points.size,
    "bugReports" => bugs.size,
    "qualitativeExamples" => qualitative_examples.size
  },
  "users" => users,
  "mainCards" => main_cards,
  "actionCards" => action_cards,
  "entryPoints" => entry_points,
  "bugs" => bugs,
  "qualitativeExamples" => qualitative_examples,
  "coherenceLines" => coherence_lines,
  "sourceLines" => source_lines,
  "metricDictionary" => metric_dictionary,
  "kpiGroups" => kpi_groups
}

public_data = scrub_public_value(data)
File.write(OUT_FILE, JSON.pretty_generate(public_data))
puts "Wrote #{OUT_FILE}"
puts "Wrote #{MAP_FILE}"
puts JSON.pretty_generate(data["counts"])
