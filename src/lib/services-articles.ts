/**
 * Unique up-to-date articles and trends for each service slug.
 * Used in /services/$slug to make each page feel uniquely informative.
 */
export type Article = { title: string; tag: string; summary: string; date: string };

export const SERVICE_ARTICLES: Record<string, { trends: string[]; articles: Article[]; faq: { q: string; a: string }[] }> = {
  "deep-learning": {
    trends: [
      "ظهور Vision Mamba به‌جای ViT با هزینه محاسباتی ۵ برابر کمتر",
      "Diffusion Transformers جایگزین UNet در مدل‌های تولید تصویر",
      "Test-time Training و Self-Improving Models روی Edge Devices",
      "Mixture-of-Experts (MoE) استاندارد جدید مدل‌های ۱۰۰B+",
    ],
    articles: [
      { date: "اردیبهشت ۱۴۰۴", tag: "Vision", title: "مقایسه عملی ViT، Swin و Mamba روی دیتاست پزشکی فارسی", summary: "بنچ‌مارک سه معماری روی ۵۰ هزار تصویر MRI با تمرکز بر دقت و سرعت Inference روی GPU خانگی." },
      { date: "فروردین ۱۴۰۴", tag: "LLM", title: "Fine-tune مدل LLaMA 3.2 با QLoRA روی یک کارت RTX 4090", summary: "آموزش گام‌به‌گام Fine-tune مدل ۷۰B با تکنیک‌های Quantization و LoRA با حداقل سخت‌افزار." },
      { date: "اسفند ۱۴۰۳", tag: "Optimization", title: "Knowledge Distillation برای استقرار مدل عمیق روی موبایل", summary: "کوچک‌سازی مدل از ۲۰۰M به ۱۰M پارامتر بدون از دست دادن دقت قابل توجه." },
    ],
    faq: [
      { q: "حداقل سخت‌افزار برای پروژه Deep Learning چقدر است؟", a: "برای مدل‌های متوسط RTX 3060 با ۱۲GB VRAM کافی است. برای LLM و مدل‌های بزرگ سرور A100 یا H100 پیشنهاد می‌شود — که در صورت نیاز ما زیرساخت تأمین می‌کنیم." },
      { q: "آیا تفسیرپذیری مدل تضمین می‌شود؟", a: "بله، تمام مدل‌های ما با Grad-CAM، SHAP یا LIME تفسیر می‌شوند و گزارش بصری ارائه می‌شود." },
    ],
  },
  "machine-learning": {
    trends: [
      "AutoML و H2O جایگزین Pipeline دستی در ۷۰٪ پروژه‌های صنعتی",
      "Causal ML برای فهم علت معلولی بجای صرف همبستگی",
      "Feature Store متمرکز با Feast استاندارد جدید سازمانی",
      "Explainable Boosting Machines (EBM) جایگزین Black-box",
    ],
    articles: [
      { date: "اردیبهشت ۱۴۰۴", tag: "AutoML", title: "مقایسه عملی Optuna، Ray Tune و AutoGluon", summary: "بنچ‌مارک سه ابزار AutoML روی ۱۰ دیتاست واقعی صنعتی." },
      { date: "فروردین ۱۴۰۴", tag: "MLOps", title: "Feature Store: راهکار حرفه‌ای مدیریت Feature در سازمان", summary: "معماری و پیاده‌سازی Feature Store با Feast و Redis برای تیم‌های Data Science." },
      { date: "اسفند ۱۴۰۳", tag: "Causal", title: "چرا باید از Causal Inference در پروژه ML استفاده کنیم", summary: "تفاوت Correlation و Causation و معرفی DoWhy و EconML." },
    ],
    faq: [
      { q: "آیا روی داده‌های کوچک هم می‌توان مدل ML خوب ساخت؟", a: "بله، با تکنیک‌های Few-shot Learning، Data Augmentation و Transfer Learning حتی با چند صد نمونه نتیجه قابل قبول می‌گیریم." },
      { q: "تفاوت AutoML با مدل دستی چیست؟", a: "AutoML سرعت بالا و Baseline قوی می‌دهد، اما برای دقت نهایی بهینه نیاز به تخصص دستی است که ما ترکیب هر دو را ارائه می‌دهیم." },
    ],
  },
  "statistical-analysis": {
    trends: [
      "آمار بیزی با Stan و PyMC جایگزین Frequentist در پزشکی",
      "Bayesian Networks در علوم اجتماعی و رفتاری",
      "Multilevel Models (HLM) استاندارد طلایی پایان‌نامه‌های جدید",
      "Power Analysis اجباری قبل از شروع پژوهش",
    ],
    articles: [
      { date: "اردیبهشت ۱۴۰۴", tag: "SEM", title: "PLS-SEM یا CB-SEM؟ راهنمای انتخاب در پایان‌نامه", summary: "تفاوت روش‌های مدل‌سازی معادلات ساختاری و مثال عملی با SmartPLS." },
      { date: "فروردین ۱۴۰۴", tag: "Bayesian", title: "آمار بیزی برای پایان‌نامه ارشد در ۳ ساعت", summary: "آموزش سریع PyMC با مثال‌های واقعی پایان‌نامه." },
      { date: "اسفند ۱۴۰۳", tag: "Meta-Analysis", title: "روش‌شناسی متاآنالیز سیستماتیک با PRISMA 2024", summary: "گایدلاین به‌روز PRISMA و ابزار CMA برای متاآنالیز پزشکی." },
    ],
    faq: [
      { q: "چه آزمونی برای فرضیه من مناسب است؟", a: "بستگی به نوع متغیر، توزیع و طرح پژوهش دارد. در جلسه مشاوره رایگان ابتدا متغیرها را بررسی و آزمون مناسب پیشنهاد می‌دهیم." },
      { q: "آیا گزارش به سبک APA تحویل می‌شود؟", a: "بله، فصل ۴ کامل با جداول APA-7 و تفسیر فارسی + خروجی نرم‌افزار تحویل می‌شود." },
    ],
  },
  "data-science": {
    trends: [
      "Lakehouse با Iceberg و Delta جایگزین Data Warehouse سنتی",
      "dbt + Airflow استاندارد جدید Pipeline سازمانی",
      "Streaming-first Architecture با Kafka و Flink",
      "Self-service BI با Apache Superset جایگزین Tableau گران‌قیمت",
    ],
    articles: [
      { date: "اردیبهشت ۱۴۰۴", tag: "Architecture", title: "Lakehouse با Apache Iceberg: آینده انبار داده", summary: "چرا Iceberg در حال جایگزینی Snowflake در شرکت‌های بزرگ است." },
      { date: "فروردین ۱۴۰۴", tag: "dbt", title: "dbt برای تیم‌های Data Engineering فارسی‌زبان", summary: "راه‌اندازی dbt-core، تست و مستندسازی Pipeline داده." },
      { date: "اسفند ۱۴۰۳", tag: "BI", title: "ساخت داشبورد مدیریتی Real-time با Superset و Kafka", summary: "از منبع داده تا داشبورد در یک سشن کارگاهی." },
    ],
    faq: [
      { q: "حجم داده ما کم است، آیا نیاز به Big Data داریم؟", a: "خیر — تا سطح ۱۰۰GB با PostgreSQL و Pandas راحت می‌توان کار کرد. ما بر اساس حجم واقعی شما معماری بهینه پیشنهاد می‌دهیم." },
      { q: "آیا مهاجرت از Excel به Data Warehouse انجام می‌دهید؟", a: "بله، یکی از خدمات پرتقاضای ما طراحی DWH و مهاجرت از Excel/Access برای کسب‌وکارهای متوسط است." },
    ],
  },
  "time-series": {
    trends: [
      "TimesFM و Chronos مدل‌های Foundation برای سری زمانی",
      "Temporal Fusion Transformer استاندارد جدید پیش‌بینی",
      "Probabilistic Forecasting با Quantile Loss",
      "Hierarchical Reconciliation برای پیش‌بینی چند سطحی",
    ],
    articles: [
      { date: "اردیبهشت ۱۴۰۴", tag: "Foundation Models", title: "TimesFM گوگل: انقلاب Zero-shot در پیش‌بینی سری زمانی", summary: "بدون آموزش روی داده خود، با دقت قابل قبول پیش‌بینی کنید." },
      { date: "فروردین ۱۴۰۴", tag: "Finance", title: "پیش‌بینی قیمت طلا با Prophet و رویدادهای ژئوپلیتیک", summary: "ترکیب مدل آماری با Feature خبری برای دقت بالاتر." },
      { date: "اسفند ۱۴۰۳", tag: "Energy", title: "پیش‌بینی مصرف برق با LSTM چندمتغیره", summary: "پروژه واقعی شرکت توزیع برق آذربایجان شرقی." },
    ],
    faq: [
      { q: "افق پیش‌بینی شما تا چند روز است؟", a: "بستگی به سری دارد. برای فروش روزانه تا ۹۰ روز و برای مالی روزانه ۵-۲۰ روز با اطمینان بالا." },
      { q: "آیا عدم قطعیت پیش‌بینی محاسبه می‌شود؟", a: "بله، با Quantile Regression یا Bayesian Forecasting بازه اطمینان P10، P50، P90 ارائه می‌شود." },
    ],
  },
  "thesis-implementation": {
    trends: [
      "تأکید کمیته‌ها روی Reproducibility و Open Source",
      "استفاده از Streamlit برای دموی پایان‌نامه",
      "اجبار Comparison با ۳ روش State-of-the-Art اخیر",
      "Code Availability شرط ضروری در ژورنال Q1",
    ],
    articles: [
      { date: "اردیبهشت ۱۴۰۴", tag: "Reproducibility", title: "چگونه پایان‌نامه‌ای Reproducible بنویسیم", summary: "از Git و Docker تا انتشار در Zenodo برای DOI رسمی." },
      { date: "فروردین ۱۴۰۴", tag: "Demo", title: "ساخت دموی تعاملی پایان‌نامه با Streamlit در ۱ ساعت", summary: "افزایش کیفیت دفاع با دموی Live از مدل." },
      { date: "اسفند ۱۴۰۳", tag: "Defense", title: "۱۰ سؤال پرتکرار جلسه دفاع و پاسخ حرفه‌ای", summary: "آماده‌سازی روانی و فنی برای جلسه دفاع." },
    ],
    faq: [
      { q: "زمان اجرای پایان‌نامه چقدر است؟", a: "ارشد معمولاً ۲-۳ ماه، دکتری ۴-۸ ماه — بسته به پیچیدگی موضوع." },
      { q: "آیا تضمین کیفیت می‌دهید؟", a: "بله، تا قبولی نهایی پایان‌نامه پشتیبانی می‌کنیم و در صورت نیاز اصلاحات رایگان انجام می‌شود." },
    ],
  },
  "scientific-writing": {
    trends: [
      "افزایش ۳ برابری زمان ریویو در ژورنال‌های Q1",
      "Open Access اجباری در بسیاری گرنت‌های اروپایی",
      "AI Detector حساسیت بالا — نگارش انسانی ضروری",
      "Preregistration و Registered Reports رشد سریع",
    ],
    articles: [
      { date: "اردیبهشت ۱۴۰۴", tag: "Journal Selection", title: "چطور ژورنال مناسب برای مقاله انتخاب کنیم؟", summary: "ابزار JournalFinder، JCR و معیارهای انتخاب IF و Scope." },
      { date: "فروردین ۱۴۰۴", tag: "Editing", title: "اشتباهات گرامری پرتکرار نویسندگان غیرانگلیسی‌زبان", summary: "۲۰ اشتباه که باعث Reject فوری می‌شود." },
      { date: "اسفند ۱۴۰۳", tag: "Response", title: "نوشتن Response to Reviewer حرفه‌ای", summary: "تکنیک‌های دیپلماتیک پاسخ به Reviewer سختگیر." },
    ],
    faq: [
      { q: "زمان پذیرش مقاله Q1 چقدر است؟", a: "معمولاً ۶ تا ۱۲ ماه از سابمیت تا Accept در ژورنال‌های معتبر." },
      { q: "آیا گواهی ادیت نیتیو می‌دهید؟", a: "بله، گواهی رسمی ادیت نیتیو با امضای ویراستار ارائه می‌شود." },
    ],
  },
  "ai-apps": {
    trends: [
      "On-device LLM با Phi-3 و Gemma 2B روی موبایل",
      "Flutter 3.22 با Impeller جایگزین Skia",
      "React Native New Architecture استاندارد جدید",
      "WebAssembly برای اجرای مدل AI در PWA",
    ],
    articles: [
      { date: "اردیبهشت ۱۴۰۴", tag: "On-Device", title: "اجرای LLM فارسی روی موبایل با MLC-LLM", summary: "بدون اینترنت، با حفظ حریم خصوصی کامل." },
      { date: "فروردین ۱۴۰۴", tag: "Flutter", title: "ادغام TensorFlow Lite در Flutter به ساده‌ترین روش", summary: "از آموزش تا استقرار در Google Play." },
      { date: "اسفند ۱۴۰۳", tag: "UX", title: "اصول طراحی UX برای اپ‌های AI", summary: "چگونه عدم قطعیت مدل را به کاربر نشان دهیم." },
    ],
    faq: [
      { q: "هزینه ساخت اپ AI چقدر است؟", a: "بسته به پیچیدگی از ۵۰ تا ۵۰۰ میلیون تومان. در جلسه مشاوره رایگان برآورد دقیق ارائه می‌دهیم." },
      { q: "زمان تحویل اپ چقدر است؟", a: "MVP در ۴-۶ هفته، نسخه کامل در ۳-۶ ماه." },
    ],
  },
  "smart-website": {
    trends: [
      "Next.js 15 با React Server Components",
      "ادغام چت‌بات LLM در ۸۰٪ وبسایت‌های جدید",
      "Edge Computing با Cloudflare Workers و Vercel Edge",
      "Astro و Qwik جایگزین SPA سنگین",
    ],
    articles: [
      { date: "اردیبهشت ۱۴۰۴", tag: "SEO", title: "SEO تخصصی برای وبسایت‌های فارسی‌زبان در ۱۴۰۴", summary: "تکنیک‌های جدید Google AI Overview و Schema." },
      { date: "فروردین ۱۴۰۴", tag: "AI Chat", title: "افزودن چت‌بات RAG به وبسایت در ۱ روز", summary: "با LangChain و Pinecone." },
      { date: "اسفند ۱۴۰۳", tag: "Performance", title: "بهینه‌سازی Core Web Vitals تا نمره ۹۹", summary: "از Image Optimization تا CDN." },
    ],
    faq: [
      { q: "آیا وبسایت Responsive و RTL تحویل می‌شود؟", a: "بله، تمام وبسایت‌های ما کاملاً RTL و سازگار با موبایل و تبلت هستند." },
      { q: "هاست و دامنه شامل پکیج است؟", a: "بله، ۱ سال هاست ابری و دامنه .ir/.com رایگان." },
    ],
  },
  "mlops": {
    trends: [
      "Kubernetes-native ML با KubeFlow 1.9",
      "Vector Database استاندارد جدید برای RAG",
      "FinOps for ML: کنترل هزینه GPU در ابر",
      "Continuous Training (CT) جایگزین Periodic Retraining",
    ],
    articles: [
      { date: "اردیبهشت ۱۴۰۴", tag: "Serving", title: "vLLM یا TGI؟ مقایسه عملی برای استقرار LLM", summary: "بنچ‌مارک throughput و latency در workload واقعی." },
      { date: "فروردین ۱۴۰۴", tag: "Monitoring", title: "Model Drift Detection با Evidently AI", summary: "تشخیص افت کیفیت مدل قبل از فاجعه." },
      { date: "اسفند ۱۴۰۳", tag: "Cost", title: "کاهش ۶۰٪ هزینه GPU با Spot Instance و Batch Inference", summary: "استراتژی‌های FinOps برای تیم ML." },
    ],
    faq: [
      { q: "روی چه ابرهایی کار می‌کنید؟", a: "AWS، GCP، Azure و سرورهای On-Prem ایرانی (آروان، ابرآسیا، توربو)." },
      { q: "SLA چقدر تضمین می‌کنید؟", a: "۹۹.۹٪ آپتایم با Auto-scaling و Multi-zone Deployment." },
    ],
  },
  "training": {
    trends: [
      "تقاضای کارگاه LLM و RAG در شرکت‌ها افزایش ۴۰۰٪",
      "آموزش ترکیبی آنلاین + پروژه عملی استاندارد جدید",
      "Microlearning و دوره‌های ۲-۴ ساعته جای دوره‌های طولانی",
      "گواهی Skill-based بجای Certificate سنتی",
    ],
    articles: [
      { date: "اردیبهشت ۱۴۰۴", tag: "LLM", title: "دوره عملی Fine-tune LLM در ۸ ساعت", summary: "از Zero تا استقرار مدل اختصاصی شرکت." },
      { date: "فروردین ۱۴۰۴", tag: "Python", title: "Python برای Data Science: مسیر ۳ ماهه", summary: "نقشه راه آموزشی استاندارد بازار کار." },
      { date: "اسفند ۱۴۰۳", tag: "Career", title: "چطور رزومه ML Engineer قوی بنویسیم", summary: "نکات کاربردی برای ورود به بازار کار." },
    ],
    faq: [
      { q: "دوره حضوری برگزار می‌کنید؟", a: "بله، در تبریز حضوری و در سایر شهرها آنلاین Live." },
      { q: "آیا گواهی معتبر است؟", a: "گواهی ATiLLAi با QR Code قابل اعتبارسنجی آنلاین صادر می‌شود." },
    ],
  },
  "proposal-defense": {
    trends: [
      "تأکید روی Novelty و گپ پژوهشی واضح",
      "افزایش پروپوزال‌های Interdisciplinary",
      "ضرورت Citation از منابع ۲ سال اخیر",
      "Visual Abstract جزو الزامات جدید",
    ],
    articles: [
      { date: "اردیبهشت ۱۴۰۴", tag: "Topics", title: "۲۰ موضوع داغ پایان‌نامه AI در ۱۴۰۴", summary: "موضوعاتی با گپ پژوهشی و امکان دفاع موفق." },
      { date: "فروردین ۱۴۰۴", tag: "Writing", title: "ساختار استاندارد پروپوزال دکتری", summary: "از Statement of Problem تا Timeline." },
      { date: "اسفند ۱۴۰۳", tag: "Defense", title: "زبان بدن و فن بیان در جلسه دفاع", summary: "تکنیک‌های اعتمادبه‌نفس در ۲۰ دقیقه دفاع." },
    ],
    faq: [
      { q: "چطور موضوع نوآور پیدا کنیم؟", a: "از Literature Review اخیر، شناسایی Limitation مقالات و ترکیب با حوزه‌های مجاور." },
      { q: "آیا کمک به اخذ گرنت می‌کنید؟", a: "بله، نگارش پروپوزال گرنت داخلی و بین‌المللی نیز جزو خدمات ماست." },
    ],
  },
};

export const getServiceExtras = (slug: string) => SERVICE_ARTICLES[slug];
