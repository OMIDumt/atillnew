// Curated mapping of tech-domain → relevant project / app slugs.
// Used by Home page Domains section and by /projects, /apps filtering.

export type DomainSlug =
  | "computer-vision"
  | "nlp"
  | "llm"
  | "image-classification"
  | "recommender"
  | "sentiment"
  | "rl"
  | "gen-ai"
  | "anomaly"
  | "cv-industrial"
  | "medical"
  | "financial"
  | "mlops"
  | "automl"
  | "edge-ai"
  | "speech"
  | "time-series"
  | "fraud"
  | "data-analytics"
  | "forecasting"
  | "chatbot"
  | "agriculture"
  | "iot-smart-city";

export type Domain = {
  slug: DomainSlug;
  label: string;
  short?: string;
  projects: string[]; // project slugs
  apps: string[];    // app slugs
};

export const DOMAINS: Domain[] = [
  {
    slug: "computer-vision",
    label: "بینایی کامپیوتر",
    short: "Computer Vision",
    projects: [
      "breast-cancer-vit", "brain-tumor-segmentation", "diabetic-retinopathy",
      "steel-defect-yolov8", "safety-helmet-detection", "weld-defect-detection",
      "smart-city-tabriz",
    ],
    apps: ["skin-diagnosis", "dental-ai", "ophthalmology-app", "pill-identifier", "agriculture-ai", "plate-recognition"],
  },
  {
    slug: "image-classification",
    label: "تشخیص و طبقه‌بندی تصویر",
    projects: [
      "breast-cancer-vit", "brain-tumor-segmentation", "diabetic-retinopathy",
      "steel-defect-yolov8", "weld-defect-detection",
    ],
    apps: ["skin-diagnosis", "dental-ai", "ophthalmology-app", "pill-identifier", "agriculture-ai"],
  },
  {
    slug: "cv-industrial",
    label: "Computer Vision صنعتی",
    projects: [
      "steel-defect-yolov8", "safety-helmet-detection", "weld-defect-detection",
      "smart-city-tabriz",
    ],
    apps: ["plate-recognition"],
  },
  {
    slug: "nlp",
    label: "پردازش زبان طبیعی",
    short: "NLP",
    projects: ["persian-llm-finetune"],
    apps: ["persian-llm-assistant", "legal-assistant", "ai-tutor", "mental-health-companion", "tourism-guide"],
  },
  {
    slug: "llm",
    label: "مدل‌های زبانی بزرگ (LLM)",
    projects: ["persian-llm-finetune"],
    apps: ["persian-llm-assistant", "legal-assistant", "ai-tutor", "mental-health-companion", "tourism-guide"],
  },
  {
    slug: "gen-ai",
    label: "Generative AI",
    projects: ["persian-llm-finetune"],
    apps: ["persian-llm-assistant", "legal-assistant", "ai-tutor", "tourism-guide"],
  },
  {
    slug: "chatbot",
    label: "چت‌بات و دستیار هوشمند",
    projects: [],
    apps: ["persian-llm-assistant", "legal-assistant", "mental-health-companion", "ai-tutor", "tourism-guide"],
  },
  {
    slug: "speech",
    label: "تشخیص گفتار و صوت",
    short: "Speech & STT",
    projects: [],
    apps: ["persian-stt"],
  },
  {
    slug: "sentiment",
    label: "تحلیل احساسات",
    projects: [],
    apps: ["mental-health-companion"],
  },
  {
    slug: "recommender",
    label: "سیستم‌های توصیه‌گر",
    projects: ["recommendation-engine"],
    apps: ["ecommerce-recommender"],
  },
  {
    slug: "rl",
    label: "Reinforcement Learning",
    projects: ["logistics-route-optimization"],
    apps: [],
  },
  {
    slug: "anomaly",
    label: "Anomaly Detection",
    projects: [
      "turbine-predictive-maintenance", "aviation-anomaly-detection",
      "oil-pipeline-leak-detection", "bank-fraud-realtime",
    ],
    apps: [],
  },
  {
    slug: "medical",
    label: "Medical AI",
    projects: [
      "breast-cancer-vit", "brain-tumor-segmentation", "diabetic-retinopathy",
      "ecg-arrhythmia", "icu-survival-xgboost",
    ],
    apps: [
      "skin-diagnosis", "dental-ai", "ophthalmology-app",
      "pediatric-symptom-checker", "pill-identifier", "mental-health-companion",
    ],
  },
  {
    slug: "financial",
    label: "Financial ML",
    projects: ["bank-fraud-realtime", "phd-bayesian-finance"],
    apps: ["smart-crm"],
  },
  {
    slug: "fraud",
    label: "Fraud Detection",
    projects: ["bank-fraud-realtime"],
    apps: [],
  },
  {
    slug: "mlops",
    label: "MLOps و استقرار مدل",
    projects: [
      "turbine-predictive-maintenance", "power-grid-load-forecast",
      "aviation-anomaly-detection", "bank-fraud-realtime", "smart-city-tabriz",
    ],
    apps: [],
  },
  {
    slug: "edge-ai",
    label: "Edge AI و On-Device",
    projects: ["steel-defect-yolov8", "safety-helmet-detection"],
    apps: [
      "skin-diagnosis", "dental-ai", "ophthalmology-app",
      "fitness-coach-ai", "agriculture-ai", "pill-identifier",
      "plate-recognition", "persian-stt",
    ],
  },
  {
    slug: "time-series",
    label: "Time Series و سری‌های زمانی",
    projects: [
      "power-grid-load-forecast", "turbine-predictive-maintenance",
      "phd-bayesian-finance", "ecg-arrhythmia",
    ],
    apps: [],
  },
  {
    slug: "forecasting",
    label: "پیش‌بینی و Forecasting",
    projects: [
      "power-grid-load-forecast", "phd-bayesian-finance",
      "turbine-predictive-maintenance",
    ],
    apps: ["smart-crm"],
  },
  {
    slug: "data-analytics",
    label: "تحلیل داده و BI",
    projects: [
      "icu-survival-xgboost", "phd-bayesian-finance", "power-grid-load-forecast",
      "bank-fraud-realtime", "recommendation-engine",
    ],
    apps: ["smart-crm"],
  },
  {
    slug: "automl",
    label: "AutoML و بهینه‌سازی مدل",
    projects: ["icu-survival-xgboost", "bank-fraud-realtime"],
    apps: [],
  },
  {
    slug: "agriculture",
    label: "هوش مصنوعی کشاورزی",
    projects: [],
    apps: ["agriculture-ai"],
  },
  {
    slug: "iot-smart-city",
    label: "IoT و شهر هوشمند",
    projects: ["smart-city-tabriz", "oil-pipeline-leak-detection", "safety-helmet-detection", "power-grid-load-forecast"],
    apps: ["plate-recognition"],
  },
];

export const getDomain = (slug?: string): Domain | undefined =>
  DOMAINS.find((d) => d.slug === slug);

export const filterProjectSlugs = (slug?: string): Set<string> | null => {
  const d = getDomain(slug);
  if (!d) return null;
  return new Set(d.projects);
};

export const filterAppSlugs = (slug?: string): Set<string> | null => {
  const d = getDomain(slug);
  if (!d) return null;
  return new Set(d.apps);
};
