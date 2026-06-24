// Per-slug luxury cover images — uploaded to CDN, persistent across deploys.
// Backwards-compatible: old generic categories kept under LUXURY_GALLERY_IMAGES.

export const COVER_IMAGES = {
  medicalImaging: "/__l5e/assets-v1/aecb88ab-1f5c-4d43-9b80-d5819d59fe09/cov-medical-imaging.jpg",
  cardioSignal: "/__l5e/assets-v1/44026098-5f26-4244-b913-d9bb71492d99/cov-cardio-signal.jpg",
  medicalMobile: "/__l5e/assets-v1/52bf0872-5784-422e-8528-b27f8c59c2e5/cov-medical-mobile.jpg",
  industrialDefect: "/__l5e/assets-v1/f6068d90-c70b-4968-aa97-e0629bb84e17/cov-industrial-defect.jpg",
  predictiveMaintenance: "/__l5e/assets-v1/0bebc5e4-00d2-4682-977b-6b952de08061/cov-predictive-maintenance.jpg",
  smartCity: "/__l5e/assets-v1/56dc39da-7186-4bc3-803a-1e7bef85d316/cov-smart-city.jpg",
  fintechFraud: "/__l5e/assets-v1/b174465b-481b-4d3e-98db-5a58dc613e56/cov-fintech-fraud.jpg",
  quantFinance: "/__l5e/assets-v1/40956ce4-9ef7-4dac-aa5c-4fbc18b916d9/cov-quant-finance.jpg",
  recommender: "/__l5e/assets-v1/87a908fc-494d-4a59-8aab-8a2e8ac2807f/cov-recommender.jpg",
  llmKnowledge: "/__l5e/assets-v1/842d621a-b834-4ec8-a4a3-7581ae9d3f98/cov-llm-knowledge.jpg",
  speechStt: "/__l5e/assets-v1/50f60c73-631b-4a17-810b-2508fa5ab93f/cov-speech-stt.jpg",
  agriculture: "/__l5e/assets-v1/fb84f676-f1e0-44e5-879c-15df3139be56/cov-agriculture.jpg",
} as const;

// Legacy aliases (existing call-sites may import this)
export const LUXURY_GALLERY_IMAGES = {
  medical: COVER_IMAGES.medicalImaging,
  industrial: COVER_IMAGES.industrialDefect,
  finance: COVER_IMAGES.fintechFraud,
  city: COVER_IMAGES.smartCity,
  knowledge: COVER_IMAGES.llmKnowledge,
  mobile: COVER_IMAGES.medicalMobile,
} as const;

// PROJECTS — slug → cover
const PROJECT_COVERS: Record<string, string> = {
  // Medical imaging
  "breast-cancer-vit": COVER_IMAGES.medicalImaging,
  "brain-tumor-segmentation": COVER_IMAGES.medicalImaging,
  "diabetic-retinopathy": COVER_IMAGES.medicalImaging,
  // Cardio / clinical signals
  "ecg-arrhythmia": COVER_IMAGES.cardioSignal,
  "icu-survival-xgboost": COVER_IMAGES.cardioSignal,
  // Industrial defect / CV
  "steel-defect-yolov8": COVER_IMAGES.industrialDefect,
  "safety-helmet-detection": COVER_IMAGES.industrialDefect,
  "weld-defect-detection": COVER_IMAGES.industrialDefect,
  // Predictive maintenance / asset health
  "turbine-predictive-maintenance": COVER_IMAGES.predictiveMaintenance,
  "aviation-anomaly-detection": COVER_IMAGES.predictiveMaintenance,
  "oil-pipeline-leak-detection": COVER_IMAGES.predictiveMaintenance,
  "power-grid-load-forecast": COVER_IMAGES.predictiveMaintenance,
  // Smart city / logistics
  "smart-city-tabriz": COVER_IMAGES.smartCity,
  "logistics-route-optimization": COVER_IMAGES.smartCity,
  // Fintech
  "bank-fraud-realtime": COVER_IMAGES.fintechFraud,
  "phd-bayesian-finance": COVER_IMAGES.quantFinance,
  // Recommender
  "recommendation-engine": COVER_IMAGES.recommender,
  // LLM
  "persian-llm-finetune": COVER_IMAGES.llmKnowledge,
};

// APPS — slug → cover
const APP_COVERS: Record<string, string> = {
  // Mobile medical
  "skin-diagnosis": COVER_IMAGES.medicalMobile,
  "dental-ai": COVER_IMAGES.medicalMobile,
  "ophthalmology-app": COVER_IMAGES.medicalMobile,
  "pediatric-symptom-checker": COVER_IMAGES.medicalMobile,
  "pill-identifier": COVER_IMAGES.medicalMobile,
  // Mental / wellness
  "mental-health-companion": COVER_IMAGES.cardioSignal,
  "fitness-coach-ai": COVER_IMAGES.cardioSignal,
  // LLM / assistants
  "persian-llm-assistant": COVER_IMAGES.llmKnowledge,
  "legal-assistant": COVER_IMAGES.llmKnowledge,
  "ai-tutor": COVER_IMAGES.llmKnowledge,
  "tourism-guide": COVER_IMAGES.llmKnowledge,
  // Speech
  "persian-stt": COVER_IMAGES.speechStt,
  // Commerce
  "ecommerce-recommender": COVER_IMAGES.recommender,
  "smart-crm": COVER_IMAGES.fintechFraud,
  // Vision (city)
  "plate-recognition": COVER_IMAGES.smartCity,
  // Agri
  "agriculture-ai": COVER_IMAGES.agriculture,
};

import { getCover } from "./cover-images";

import skinDx1 from "@/assets/covers/skin-diagnosis-screens-1.png.asset.json";
import skinDx2 from "@/assets/covers/skin-diagnosis-screens-2.png.asset.json";
import skinDx3 from "@/assets/covers/skin-diagnosis-screens-3.png.asset.json";
import dentalAiHero from "@/assets/covers/dental-ai-screens.png.asset.json";
import dentalAiCover from "@/assets/covers/dental-ai-cover.png.asset.json";
import mammoAi0 from "@/assets/covers/mammo-ai-screen-0.png.asset.json";
import mammoAi1 from "@/assets/covers/mammo-ai-screen-1.png.asset.json";
import mammoAi2 from "@/assets/covers/mammo-ai-screen-2.png.asset.json";
import mammoAi3 from "@/assets/covers/mammo-ai-screen-3.png.asset.json";
import ophHero from "@/assets/ophthalmology/hero.png.asset.json";
import ophFundus from "@/assets/ophthalmology/fundus.png.asset.json";
import ophReport from "@/assets/ophthalmology/report.png.asset.json";
import ophArchive from "@/assets/ophthalmology/archive.png.asset.json";
import ophLiveDemo from "@/assets/ophthalmology/livedemo.png.asset.json";
import ophDoctor from "@/assets/ophthalmology/doctor.png.asset.json";
import ophAccuracy from "@/assets/ophthalmology/accuracy.png.asset.json";
import ophSecurity from "@/assets/ophthalmology/security.png.asset.json";
import ecgMonitor from "@/assets/ecg/monitor.png.asset.json";
import ecgDetection from "@/assets/ecg/detection.png.asset.json";
import ecgPatient from "@/assets/ecg/patient.png.asset.json";
import ecgReport from "@/assets/ecg/report.png.asset.json";

// Per-slug gallery image overrides (single screen replaces full carousel).
export const GALLERY_OVERRIDES: Record<string, string> = {
  "skin-diagnosis": skinDx1.url,
  "dental-ai": dentalAiCover.url,
  "mammo-ai": mammoAi0.url,
  "ophthalmology-app": ophHero.url,
  "ecg-arrhythmia": ecgMonitor.url,
};

// Per-slug MULTI-image gallery — one image per carousel screen.
export const GALLERY_MULTI_OVERRIDES: Record<string, string[]> = {
  "skin-diagnosis": [skinDx1.url, skinDx2.url, skinDx3.url],
  "dental-ai": [dentalAiCover.url, dentalAiHero.url, dentalAiCover.url],
  "mammo-ai": [mammoAi0.url, mammoAi1.url, mammoAi2.url, mammoAi3.url],
  "ophthalmology-app": [
    ophHero.url, ophFundus.url, ophReport.url, ophArchive.url,
    ophLiveDemo.url, ophDoctor.url, ophAccuracy.url, ophSecurity.url,
  ],
  "ecg-arrhythmia": [ecgMonitor.url, ecgDetection.url, ecgPatient.url, ecgReport.url],
};

// Per-slug accessible alt text for each carousel image (SEO + a11y).
export const GALLERY_ALT_OVERRIDES: Record<string, string[]> = {
  "skin-diagnosis": [
    "اپلیکیشن DermAI — صفحه آپلود تصویر ضایعه پوستی و تشخیص هوش مصنوعی ملانوما",
    "اپلیکیشن DermAI — نمایش نتیجه تحلیل تصویر پوست با درصد اطمینان مدل یادگیری عمیق",
    "اپلیکیشن DermAI — داشبورد پیگیری بیماری پوستی، تاریخچه اسکن‌ها و توصیه پزشکی",
  ],
  "dental-ai": [
    "اپلیکیشن DentAI — صفحه اصلی هوش مصنوعی تشخیص پوسیدگی و سلامت دندان از روی رادیوگرافی",
    "اپلیکیشن DentAI — تحلیل تصویر دندانپزشکی توسط مدل بینایی ماشین و گزارش درمان",
    "اپلیکیشن DentAI — داشبورد بیمار، نوبت‌دهی هوشمند و توصیه‌های دندانپزشکی مبتنی بر AI",
  ],
  "mammo-ai": [
    "اپلیکیشن Mammo AI — صفحه اصلی دستیار هوشمند ماموگرافی، تحلیل خودکار تصاویر و ارزیابی ریسک سرطان پستان",
    "اپلیکیشن Mammo AI — داشبورد تحلیل تصویر ماموگرافی با هایلایت ناحیه مشکوک و دسته‌بندی BI-RADS 4A",
    "اپلیکیشن Mammo AI — گزارش جامع و ساختاریافته تجویز ماموگرافی با خروجی PDF برای پزشک و بیمار",
    "اپلیکیشن Mammo AI — مقایسه هوشمند تصاویر ماموگرافی فعلی و قبلی بیمار جهت پایش روند تغییرات",
  ],
  "ophthalmology-app": [
    "اپ چشم‌پزشکی هوشمند آتیلای — صفحه هیرو با تصویر فوندوس و تحلیل هوش مصنوعی شبکیه",
    "اپ چشم‌پزشکی آتیلای — اسکن فوندوس و تشخیص رتینوپاتی دیابتی متوسط با احتمال ۸۷ درصد",
    "اپ چشم‌پزشکی آتیلای — گزارش هوشمند AI شامل امتیاز ریسک ۷۲ و احتمال بیماری‌های شبکیه",
    "اپ چشم‌پزشکی آتیلای — آرشیو بیماران، جستجو و مشاهده پرونده کامل بیمار",
    "اپ چشم‌پزشکی آتیلای — دموی زنده عملکرد مدل هوش مصنوعی روی تصاویر فوندوس",
    "اپ چشم‌پزشکی آتیلای — بررسی توسط پزشک متخصص و مزایای استفاده در کلینیک",
    "اپ چشم‌پزشکی آتیلای — دقت مدل هوش مصنوعی ۹۵.۴ درصد بر اساس داده‌های بالینی",
    "اپ چشم‌پزشکی آتیلای — امنیت و ذخیره‌سازی ابری با رمزنگاری در سطح سازمانی",
  ],
  "ecg-arrhythmia": [
    "پروژه تشخیص آریتمی قلبی با 1D-CNN — داشبورد ECG Monitor، نمایش بلادرنگ سیگنال Lead II و ضربان قلب",
    "پروژه تشخیص آریتمی قلبی — هایلایت لحظه‌ای PVC روی سیگنال ECG و توزیع احتمال ۱۲ کلاس آریتمی",
    "پروژه تشخیص آریتمی قلبی — اپ موبایل بیمار با هشدار آریتمی، گزارش روزانه و میانگین ضربان قلب",
    "پروژه تشخیص آریتمی قلبی — نمونه خروجی گزارش پایش ECG قابل دانلود همراه با جدول رویدادها و نمودار",
  ],
};

export function getGalleryOverride(slug: string): string | undefined {
  return GALLERY_OVERRIDES[slug];
}

export function getGalleryMultiOverride(slug: string): string[] | undefined {
  return GALLERY_MULTI_OVERRIDES[slug];
}

export function getGalleryAltOverride(slug: string): string[] | undefined {
  return GALLERY_ALT_OVERRIDES[slug];
}

export function getLuxuryGalleryImage(slug: string, category: string, type: "project" | "app" = "project") {
  // Per-slug unique cover (highest priority — each project/app has its own dedicated image)
  const unique = getCover(slug);
  if (unique) return unique;

  const direct = type === "project" ? PROJECT_COVERS[slug] : APP_COVERS[slug];
  if (direct) return direct;

  // Category-based fallback
  if (category.includes("پزشکی") || category.includes("سلامت")) {
    return type === "app" ? COVER_IMAGES.medicalMobile : COVER_IMAGES.medicalImaging;
  }
  if (category.includes("صنعتی")) return COVER_IMAGES.industrialDefect;
  if (category.includes("مالی") || category.includes("بانکی") || category.includes("کسب‌وکار")) return COVER_IMAGES.fintechFraud;
  if (category.includes("تجاری") || category.includes("فروشگاهی")) return COVER_IMAGES.recommender;
  if (category.includes("دولتی")) return COVER_IMAGES.smartCity;
  if (category.includes("گردشگری")) return COVER_IMAGES.llmKnowledge;
  if (category.includes("کشاورزی")) return COVER_IMAGES.agriculture;
  if (category.includes("صوت")) return COVER_IMAGES.speechStt;
  if (category.includes("دستیار") || category.includes("حقوقی") || category.includes("آموزشی") || category.includes("دانشگاهی")) return COVER_IMAGES.llmKnowledge;
  if (category.includes("بینایی")) return COVER_IMAGES.industrialDefect;

  return type === "app" ? COVER_IMAGES.medicalMobile : COVER_IMAGES.industrialDefect;
}

import atillaiLogo from "@/assets/atillai.jpg";
import nilixBotAsset from "@/assets/brand/nilix-bot.png.asset.json";

export const ATILLAI_ORBIT_LOGO = atillaiLogo;
export const NILIX_BOT_LOGO = nilixBotAsset.url;
