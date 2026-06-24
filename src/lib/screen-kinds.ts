// Map each project/app slug to 3 domain-specific visual "kinds"
// consumed by <DomainScreen>. Order = carousel order.

export type ScreenKind =
  | "mammography" | "mri-brain" | "retina" | "ecg" | "vitals"
  | "skin-scan" | "dental-xray" | "pill" | "pediatric-bot" | "mental-mood"
  | "defect-grid" | "vibration" | "ppe-cctv" | "weld-xray"
  | "fraud-graph" | "recommender" | "city-traffic" | "bayes-chart" | "llm-train"
  | "chat-rtl" | "legal-doc" | "pose-tracking" | "tutor-quiz"
  | "crm-pipeline" | "map-tour" | "plate-anpr" | "leaf-disease"
  | "stt-waveform";

const MAP: Record<string, ScreenKind[]> = {
  // ===== PROJECTS =====
  "breast-cancer-vit":           ["mammography", "mammography", "vitals"],
  "brain-tumor-segmentation":    ["mri-brain", "mri-brain", "vitals"],
  "diabetic-retinopathy":        ["retina", "retina", "vitals"],
  "ecg-arrhythmia":              ["ecg", "ecg", "vitals", "ecg"],
  "icu-survival-xgboost":        ["vitals", "bayes-chart", "vitals"],
  "steel-defect-yolov8":         ["defect-grid", "defect-grid", "vibration"],
  "turbine-predictive-maintenance":["vibration", "vibration", "bayes-chart"],
  "safety-helmet-detection":     ["ppe-cctv", "ppe-cctv", "defect-grid"],
  "weld-defect-detection":       ["weld-xray", "weld-xray", "defect-grid"],
  "bank-fraud-realtime":         ["fraud-graph", "fraud-graph", "bayes-chart"],
  "recommendation-engine":       ["recommender", "recommender", "bayes-chart"],
  "smart-city-tabriz":           ["city-traffic", "map-tour", "city-traffic"],
  "persian-llm-finetune":        ["llm-train", "chat-rtl", "llm-train"],
  "phd-bayesian-finance":        ["bayes-chart", "bayes-chart", "vibration"],
  "oil-pipeline-leak-detection": ["map-tour", "vibration", "defect-grid"],
  "power-grid-load-forecast":    ["bayes-chart", "vibration", "bayes-chart"],
  "logistics-route-optimization":["map-tour", "city-traffic", "map-tour"],
  "aviation-anomaly-detection":  ["vibration", "bayes-chart", "defect-grid"],

  // ===== APPS =====
  "skin-diagnosis":              ["skin-scan", "skin-scan", "vitals"],
  "dental-ai":                   ["dental-xray", "dental-xray", "vitals"],
  "ophthalmology-app":           ["retina", "retina", "vitals"],
  "legal-assistant":             ["legal-doc", "chat-rtl", "legal-doc"],
  "pediatric-symptom-checker":   ["pediatric-bot", "chat-rtl", "vitals"],
  "pill-identifier":             ["pill", "pill", "vitals"],
  "mental-health-companion":     ["mental-mood", "chat-rtl", "mental-mood"],
  "fitness-coach-ai":            ["pose-tracking", "pose-tracking", "vitals"],
  "persian-llm-assistant":       ["chat-rtl", "chat-rtl", "llm-train"],
  "ecommerce-recommender":       ["recommender", "recommender", "bayes-chart"],
  "plate-recognition":           ["plate-anpr", "plate-anpr", "defect-grid"],
  "persian-stt":                 ["stt-waveform", "stt-waveform", "chat-rtl"],
  "ai-tutor":                    ["tutor-quiz", "tutor-quiz", "bayes-chart"],
  "smart-crm":                   ["crm-pipeline", "crm-pipeline", "bayes-chart"],
  "tourism-guide":               ["map-tour", "map-tour", "chat-rtl"],
  "agriculture-ai":              ["leaf-disease", "leaf-disease", "map-tour"],
};

export function getScreenKinds(slug: string, count: number): ScreenKind[] {
  const base = MAP[slug];
  if (base) return base.slice(0, count);
  // category-agnostic fallback
  const fall: ScreenKind[] = ["vitals", "bayes-chart", "chat-rtl"];
  return fall.slice(0, count);
}
