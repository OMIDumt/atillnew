import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "fa" | "en" | "ar" | "tr";

type Dict = Record<string, string>;
const DICTS: Record<Lang, Dict> = {
  fa: {
    "nav.home": "خانه", "nav.services": "خدمات", "nav.apps": "اپلیکیشن‌ها",
    "nav.projects": "پروژه‌ها", "nav.kids": "تست کودکان", "nav.about": "درباره ما", "nav.contact": "تماس",
    "cta.order": "ثبت سفارش پروژه",
    "hero.badge": "مرجع تخصصی مشاوره، آموزش و اجرای پروژه‌های هوش مصنوعی، یادگیری ماشین و علم داده",
    "hero.l1": "هوش مصنوعی؛ نقطه آغاز تحول کسب‌وکار شما", "hero.l2": "", "hero.l3": "",
    "lang.label": "زبان",
  },
  en: {
    "nav.home": "Home", "nav.services": "Services", "nav.apps": "Apps",
    "nav.projects": "Projects", "nav.kids": "Kids Test", "nav.about": "About", "nav.contact": "Contact",
    "cta.order": "Start Your Project",
    "hero.badge": "Expert Consulting & Delivery for AI, Machine Learning and Data Science Projects",
    "hero.l1": "Artificial Intelligence — the Starting Point of Your Business Transformation", "hero.l2": "", "hero.l3": "",
    "lang.label": "Language",
  },
  ar: {
    "nav.home": "الرئيسية", "nav.services": "الخدمات", "nav.apps": "التطبيقات",
    "nav.projects": "المشاريع", "nav.kids": "اختبار الأطفال", "nav.about": "من نحن", "nav.contact": "تواصل",
    "cta.order": "ابدأ مشروعك",
    "hero.badge": "استوديو الذكاء الاصطناعي للمؤسسات",
    "hero.l1": "الذكاء الاصطناعي؛ نقطة انطلاق تحوّل أعمالك", "hero.l2": "", "hero.l3": "",
    "lang.label": "اللغة",
  },
  tr: {
    "nav.home": "Anasayfa", "nav.services": "Hizmetler", "nav.apps": "Uygulamalar",
    "nav.projects": "Projeler", "nav.kids": "Çocuk Testi", "nav.about": "Hakkımızda", "nav.contact": "İletişim",
    "cta.order": "Projeyi Başlat",
    "hero.badge": "Kurumsal Yapay Zekâ Stüdyosu",
    "hero.l1": "Yapay zekâ; işletmenizin dönüşümünün başlangıç noktası", "hero.l2": "", "hero.l3": "",
    "lang.label": "Dil",
  },
};

const DIRS: Record<Lang, "rtl" | "ltr"> = { fa: "rtl", en: "ltr", ar: "rtl", tr: "ltr" };

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: string) => string; dir: "rtl" | "ltr" };
const I18nCtx = createContext<Ctx>({ lang: "fa", setLang: () => {}, t: (k) => k, dir: "rtl" });

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fa");
  useEffect(() => {
    try {
      const saved = localStorage.getItem("ATiLLAi.lang") as Lang | null;
      if (saved && DICTS[saved]) setLangState(saved);
    } catch {}
  }, []);
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
      document.documentElement.dir = DIRS[lang];
    }
  }, [lang]);
  const setLang = (l: Lang) => {
    setLangState(l);
    try { localStorage.setItem("ATiLLAi.lang", l); } catch {}
  };
  const t = (k: string) => DICTS[lang][k] ?? DICTS.fa[k] ?? k;
  return <I18nCtx.Provider value={{ lang, setLang, t, dir: DIRS[lang] }}>{children}</I18nCtx.Provider>;
}

export const useI18n = () => useContext(I18nCtx);

export const LANG_LABEL: Record<Lang, string> = {
  fa: "فارسی", en: "English", ar: "العربية", tr: "Türkçe",
};
