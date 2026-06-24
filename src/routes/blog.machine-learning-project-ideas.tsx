import { createFileRoute, Link } from "@tanstack/react-router";
import { BackButton } from "@/components/back-button";
import { DEFAULT_OG_IMAGE, faqJsonLd, howToJsonLd, breadcrumbJsonLd } from "@/lib/seo";

const CANONICAL = "https://atil-ai-hub.lovable.app/blog/machine-learning-project-ideas";

const BLOG_FAQ = [
  { q: "بهترین ایده پروژه یادگیری ماشین برای پایان‌نامه چیست؟", a: "ایده‌ای که سه ویژگی داشته باشد: دیتاست در دسترس، یک بازخورد قابل اندازه‌گیری (Metric) و یک کاربرد واقعی. ایده‌های پزشکی مانند تشخیص رتینوپاتی دیابتی و NLP فارسی مانند خلاصه‌سازی متن ایده‌های قوی هستند." },
  { q: "چه دیتاست‌هایی برای شروع مناسب‌اند؟", a: "Kaggle، Hugging Face Datasets، UCI ML Repository، PhysioNet برای داده پزشکی و OpenStreetMap برای داده‌های جغرافیایی." },
  { q: "حداقل سخت‌افزار لازم چیست؟", a: "برای اکثر پروژه‌های تصویری متوسط، یک GPU با ۸–۱۲ گیگ VRAM (مثل RTX 3060) کافی است. برای LLM و مدل‌های بزرگ می‌توانید از Colab Pro، Kaggle Kernels یا سرورهای A100 اجاره‌ای استفاده کنید." },
  { q: "چطور پروژه‌ام را به Production برسانم؟", a: "از FastAPI یا BentoML برای سرویس مدل، Docker برای کانتینرسازی، و Cloud Run / Render / Railway برای استقرار سریع استفاده کنید. تیم ATiLLAi خدمات MLOps کامل ارائه می‌دهد." },
];

const BLOG_HOWTO = [
  { name: "انتخاب موضوع", text: "موضوعی انتخاب کنید که داده، متریک و کاربرد واقعی داشته باشد." },
  { name: "تهیه دیتاست", text: "از Kaggle / Hugging Face Datasets دیتاست مناسب را دانلود و پاک‌سازی کنید." },
  { name: "Baseline ساده", text: "ابتدا یک مدل ساده (Logistic Regression / Random Forest) به‌عنوان baseline اجرا کنید." },
  { name: "مدل پیشرفته", text: "سپس به مدل عمیق (CNN / Transformer / LSTM) ارتقا دهید و با baseline مقایسه کنید." },
  { name: "ارزیابی و تفسیر", text: "متریک مناسب (F1، AUC، RMSE …) را گزارش کنید و با Grad-CAM/SHAP تفسیر دهید." },
  { name: "استقرار و ارائه", text: "مدل را با FastAPI سرو کنید و در یک داشبورد Streamlit/Gradio نمایش دهید." },
];

export const Route = createFileRoute("/blog/machine-learning-project-ideas")({
  head: () => ({
    meta: [
      { title: "۳۰+ ایده پروژه یادگیری ماشین | ATiLLAi" },
      { name: "description", content: "فهرست ایده‌های حرفه‌ای پروژه یادگیری ماشین و دیپ‌لرنینگ در حوزه پزشکی، مالی، حقوقی، صنعتی و NLP فارسی — مناسب پایان‌نامه و پورتفولیو." },
      { name: "keywords", content: "ایده پروژه یادگیری ماشین, پایان‌نامه هوش مصنوعی, پروژه دیپ لرنینگ, ML project ideas, ATiLLAi" },
      { property: "og:title", content: "ایده‌های پروژه یادگیری ماشین | ATiLLAi" },
      { property: "og:description", content: "ایده‌های پورتفولیومحور ML/DL برای دانشجویان سال آخر و پژوهشگران." },
      { property: "og:url", content: CANONICAL },
      { property: "og:type", content: "article" },
      { property: "og:image", content: DEFAULT_OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "ایده‌های پروژه یادگیری ماشین | ATiLLAi" },
      { name: "twitter:description", content: "ایده‌های پورتفولیومحور ML/DL برای دانشجویان سال آخر و پژوهشگران." },
      { name: "twitter:image", content: DEFAULT_OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "۳۰+ ایده پروژه یادگیری ماشین برای دانشجویان و پژوهشگران",
          description: "ایده‌های پورتفولیومحور ML/DL برای دانشجویان سال آخر و پژوهشگران.",
          image: DEFAULT_OG_IMAGE,
          author: { "@type": "Organization", name: "ATiLLAi" },
          publisher: { "@type": "Organization", name: "ATiLLAi", logo: { "@type": "ImageObject", url: DEFAULT_OG_IMAGE } },
          mainEntityOfPage: CANONICAL,
          inLanguage: "fa-IR",
        }),
      },
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd(BLOG_FAQ)) },
      {
        type: "application/ld+json",
        children: JSON.stringify(
          howToJsonLd({
            name: "چطور یک پروژه یادگیری ماشین حرفه‌ای انجام دهیم؟",
            description: "گام‌های انتخاب موضوع تا استقرار یک پروژه ML برای پایان‌نامه یا پورتفولیو.",
            totalTime: "P30D",
            steps: BLOG_HOWTO,
          }),
        ),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbJsonLd([
            { name: "خانه", path: "/" },
            { name: "وبلاگ", path: "/blog/machine-learning-project-ideas" },
            { name: "ایده‌های پروژه ML", path: "/blog/machine-learning-project-ideas" },
          ]),
        ),
      },
    ],
  }),
  component: BlogPost,
});

type Section = { domain: string; ideas: { title: string; desc: string }[] };

const SECTIONS: Section[] = [
  {
    domain: "پزشکی و سلامت",
    ideas: [
      { title: "تشخیص تومور مغزی با U-Net", desc: "سگمنتیشن MRI با شبکه U-Net و مجموعه‌داده BraTS." },
      { title: "طبقه‌بندی سرطان سینه با Vision Transformer", desc: "آموزش ViT روی تصاویر هیستوپاتولوژی." },
      { title: "تشخیص رتینوپاتی دیابتی", desc: "مدل CNN روی تصاویر فوندوس چشم." },
      { title: "آریتمی قلبی از سیگنال ECG", desc: "شبکه LSTM/CNN-1D برای داده‌های MIT-BIH." },
      { title: "پیش‌بینی بقای ICU با XGBoost", desc: "مدل‌سازی روی MIMIC-III." },
    ],
  },
  {
    domain: "مالی و بانکی",
    ideas: [
      { title: "تشخیص تقلب بانکی Real-time", desc: "مدل‌های Gradient Boosting + Kafka stream." },
      { title: "پیش‌بینی قیمت سهام با Transformer", desc: "ترکیب مدل‌های زمانی و خبر." },
      { title: "ارزیابی اعتبار وام (Credit Scoring)", desc: "مدل قابل تفسیر با SHAP." },
    ],
  },
  {
    domain: "حقوقی و متن",
    ideas: [
      { title: "دستیار حقوقی مبتنی بر LLM فارسی", desc: "RAG روی مجموعه قوانین." },
      { title: "خلاصه‌سازی آراء قضایی", desc: "Fine-tune مدل T5/MT5." },
      { title: "طبقه‌بندی نوع دعوی", desc: "Text classification با ParsBERT." },
    ],
  },
  {
    domain: "بینایی صنعتی",
    ideas: [
      { title: "تشخیص نقص جوش با YOLOv8", desc: "Real-time defect detection روی خط تولید." },
      { title: "شناسایی ورق فولاد معیوب", desc: "Segmentation با Mask R-CNN." },
      { title: "تشخیص کلاه ایمنی کارگران", desc: "مدل YOLO برای ایمنی محیط کار." },
      { title: "پلاک‌خوان فارسی", desc: "OCR ترکیبی YOLO + CRNN." },
    ],
  },
  {
    domain: "NLP و LLM فارسی",
    ideas: [
      { title: "Fine-tune مدل زبانی فارسی", desc: "آموزش LoRA روی LLaMA/Qwen." },
      { title: "تبدیل گفتار فارسی به متن (STT)", desc: "Fine-tune Whisper روی داده‌های فارسی." },
      { title: "چت‌بات سلامت روان فارسی", desc: "RAG + safety guardrails." },
    ],
  },
  {
    domain: "صنعت، انرژی و شهر هوشمند",
    ideas: [
      { title: "نگه‌داری پیش‌بینانه توربین", desc: "مدل Anomaly Detection روی داده سنسور." },
      { title: "تشخیص نشتی خط لوله نفت", desc: "تحلیل صوتی و ارتعاش با CNN." },
      { title: "پیش‌بینی بار شبکه برق", desc: "مدل LSTM چندمتغیره." },
      { title: "بهینه‌سازی مسیر لجستیک", desc: "Reinforcement Learning + OR-Tools." },
      { title: "تحلیل شهر هوشمند تبریز", desc: "Time-series ترافیک و آلودگی هوا." },
    ],
  },
];

function BlogPost() {
  return (
    <article className="relative pt-32 pb-24">
      <div className="mx-auto max-w-4xl px-4">
        <div className="mb-8"><BackButton /></div>
        <header className="mb-12 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">راهنمای جامع</span>
          <h1 className="mt-4 text-4xl font-black md:text-5xl">
            <span className="text-gradient-gold">۳۰+ ایده پروژه یادگیری ماشین</span>
            <span className="block mt-2 text-2xl md:text-3xl">برای دانشجویان و پژوهشگران</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-muted-foreground leading-8">
            اگر دنبال ایده‌ای حرفه‌ای، پورتفولیومحور و قابل‌اجرا برای پایان‌نامه، مقاله یا رزومه هستید،
            این فهرست را با دقت انتخاب کرده‌ایم. هر ایده در یکی از حوزه‌های فعال تیم ATiLLAi قابل
            مشاوره و اجرا است.
          </p>
        </header>

        <div className="space-y-10">
          {SECTIONS.map((s) => (
            <section key={s.domain}>
              <h2 className="mb-4 text-2xl font-bold text-gradient-gold">{s.domain}</h2>
              <ul className="space-y-3">
                {s.ideas.map((i) => (
                  <li key={i.title} className="glass rounded-2xl p-5">
                    <h3 className="text-lg font-bold">{i.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground leading-7">{i.desc}</p>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="mt-16 rounded-3xl border border-primary/30 bg-primary/5 p-8 text-center">
          <h2 className="text-2xl font-bold">به اجرای حرفه‌ای پروژه‌تان نیاز دارید؟</h2>
          <p className="mt-3 text-muted-foreground">
            تیم ATiLLAi در تمام مراحل مشاوره، کدنویسی، نوشتن پایان‌نامه و دیپلوی همراه شماست.
          </p>
          <Link
            to="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-br from-primary to-amber-600 px-6 py-3 font-bold text-primary-foreground shadow-glow"
            aria-label="رفتن به صفحه ثبت سفارش پروژه"
          >
            ثبت سفارش پروژه
          </Link>
        </div>
      </div>
    </article>
  );
}
