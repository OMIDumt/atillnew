import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Brain, Bot, BarChart3, Database, LineChart, Code2, Atom,
  Network, Cpu, Workflow, ShieldCheck, ArrowLeft,
  FileText, Smartphone, Globe, Cloud, Presentation, BookOpen,
  Rocket, Search, PenTool, Languages,
} from "lucide-react";
import { BackButton } from "@/components/back-button";
import { SITE_URL, DEFAULT_OG_IMAGE, breadcrumbJsonLd } from "@/lib/seo";

const SERVICES_URL = `${SITE_URL}/services`;

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "خدمات هوش مصنوعی، یادگیری ماشین و آمار | ATiLLAi" },
      { name: "description", content: "خدمات تخصصی ATiLLAi شامل یادگیری ماشین، یادگیری عمیق، تحلیل آماری، علم داده، NLP فارسی، Computer Vision، MLOps، مقاله‌نویسی ISI و ساخت اپلیکیشن AI." },
      { name: "keywords", content: "خدمات هوش مصنوعی, یادگیری ماشین, یادگیری عمیق, NLP فارسی, مقاله ISI, MLOps, ATiLLAi" },
      { property: "og:title", content: "خدمات تخصصی ATiLLAi" },
      { property: "og:description", content: "خدمات تخصصی ATiLLAi در حوزه AI، ML، DL، آمار و MLOps." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SERVICES_URL },
      { property: "og:image", content: DEFAULT_OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "خدمات تخصصی ATiLLAi" },
      { name: "twitter:description", content: "خدمات تخصصی ATiLLAi در حوزه AI، ML، DL، آمار و MLOps." },
      { name: "twitter:image", content: DEFAULT_OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: SERVICES_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "خدمات ATiLLAi",
          url: SERVICES_URL,
          itemListElement: [
            "Deep Learning", "Machine Learning", "Statistical Analysis", "Data Science",
            "Time Series Forecasting", "Computer Vision", "NLP & LLM", "ISI Paper Writing",
            "MLOps & Cloud Deployment", "AI Mobile App Development",
          ].map((name, i) => ({ "@type": "ListItem", position: i + 1, name })),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbJsonLd([
            { name: "خانه", path: "/" },
            { name: "خدمات", path: "/services" },
          ]),
        ),
      },
    ],
  }),
  component: ServicesPage,
});

const SERVICES = [
  { icon: Brain, title: "یادگیری عمیق (Deep Learning)", desc: "طراحی و آموزش شبکه‌های عصبی مدرن: CNN، RNN، LSTM، Transformer، GAN، Diffusion و LLM." },
  { icon: Bot, title: "یادگیری ماشین (Machine Learning)", desc: "پیاده‌سازی الگوریتم‌های نظارت‌شده، بدون نظارت، تقویتی، Ensemble و Boosting." },
  { icon: BarChart3, title: "تحلیل آماری پیشرفته", desc: "آزمون فرض، رگرسیون، آنالیز واریانس، مدل‌سازی چندمتغیره، Bayesian Statistics." },
  { icon: Database, title: "علم داده و Big Data", desc: "پاکسازی، تحلیل و بصری‌سازی داده‌های کلان، طراحی Pipeline داده، Feature Engineering." },
  { icon: LineChart, title: "پیش‌بینی سری زمانی", desc: "مدل‌سازی ARIMA، SARIMA، Prophet، LSTM برای پیش‌بینی فروش، قیمت، تقاضا و بازار." },
  { icon: Atom, title: "بینایی کامپیوتر", desc: "تشخیص شیء، Segmentation، تحلیل تصویر پزشکی، OCR و سیستم‌های نظارتی هوشمند." },
  { icon: Network, title: "پردازش زبان طبیعی (NLP)", desc: "چت‌بات، خلاصه‌سازی، ترجمه ماشینی، تحلیل احساسات و ساخت LLM اختصاصی فارسی." },
  { icon: Code2, title: "پیاده‌سازی پایان‌نامه", desc: "اجرای کامل پایان‌نامه‌های کارشناسی، ارشد و دکتری به همراه مستندسازی و دفاعیه." },
  { icon: FileText, title: "مقاله‌نویسی ISI و Q1", desc: "نگارش، ادیت، ترجمه تخصصی و سابمیت مقالات در ژورنال‌های ISI، Scopus، IEEE و Springer." },
  { icon: PenTool, title: "نگارش پروپوزال و پروپوزال دکتری", desc: "تدوین حرفه‌ای پروپوزال ارشد و دکتری با موضوعات نو و مرور ادبیات کامل." },
  { icon: Languages, title: "ترجمه تخصصی متون فنی", desc: "ترجمه دقیق مقالات، کتاب و مستندات فنی AI، ML و آمار با حفظ اصطلاحات تخصصی." },
  { icon: Smartphone, title: "ساخت اپلیکیشن موبایل AI", desc: "طراحی و توسعه اپ اندروید، iOS و کراس‌پلتفرم با هسته هوش مصنوعی." },
  { icon: Globe, title: "طراحی وبسایت و داشبورد هوشمند", desc: "وبسایت‌های مدرن، پنل‌های تحلیلی Real-time و داشبوردهای BI با Power BI و Tableau." },
  { icon: Cloud, title: "MLOps و استقرار ابری", desc: "Dockerize، Kubernetes، CI/CD، Monitoring و استقرار مدل روی AWS، GCP و Azure." },
  { icon: Cpu, title: "Edge AI و IoT", desc: "اجرای مدل‌های هوش مصنوعی روی Raspberry Pi، Jetson Nano و میکروکنترلرها." },
  { icon: Rocket, title: "Generative AI و LLM Fine-tuning", desc: "ساخت Agent‌های هوشمند، RAG، Fine-tune مدل‌های LLaMA، Mistral و GPT." },
  { icon: Workflow, title: "اتوماسیون و RPA هوشمند", desc: "طراحی Agent‌ها و ربات‌های اتوماسیون فرایندهای کسب‌وکار با n8n و LangChain." },
  { icon: Presentation, title: "تدریس و کارگاه سازمانی", desc: "دوره‌های خصوصی، گروهی و سازمانی Python، ML، DL، LLM و علم داده." },
  { icon: BookOpen, title: "مشاوره موضوع و دفاع پایان‌نامه", desc: "انتخاب موضوع نوآور، طراحی اسلاید دفاع و کوچینگ جلسه دفاعیه." },
  { icon: Search, title: "Systematic Review و Meta-Analysis", desc: "مرور سیستماتیک مقالات، متاآنالیز و Bibliometric Analysis در حوزه‌های پزشکی و مهندسی." },
  { icon: ShieldCheck, title: "مشاوره و ممیزی پروژه‌های AI", desc: "ارزیابی، انتخاب تکنولوژی، طراحی نقشه راه و ممیزی فنی مدل‌های موجود سازمان." },
];

export default function ServicesPage() {
  return (
    <section className="relative pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-8"><BackButton /></div>
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">خدمات کامل</span>
          <h1 className="mt-4 text-4xl font-black md:text-6xl">
            تمام آنچه برای <span className="text-gradient-gold">پروژه</span> نیاز دارید
          </h1>
          <p className="mt-5 text-muted-foreground">
            از مشاوره اولیه تا تحویل نهایی و پشتیبانی، خدمات تخصصی ATiLLAi در کنار شماست.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-3xl border border-border bg-card/40 p-7 backdrop-blur transition hover:border-primary/40 hover:shadow-glow"
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-3xl opacity-0 transition group-hover:opacity-100" />
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-amber-600 text-primary-foreground shadow-glow">
                <s.icon className="h-7 w-7" />
              </div>
              <h3 className="mt-5 text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-br from-primary to-amber-600 px-8 py-4 text-base font-bold text-primary-foreground shadow-glow transition hover:scale-105"
          >
            دریافت مشاوره رایگان <ArrowLeft className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
