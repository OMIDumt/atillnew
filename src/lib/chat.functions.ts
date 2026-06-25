import { createServerFn } from "@tanstack/react-start";

type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

const SYSTEM_PROMPT = `You are Nilix, the official multilingual smart assistant of the ATiLLAi website (https://atil-ai-hub.lovable.app).

LANGUAGE RULE (critical):
- Detect the user's language from their latest message and reply in the SAME language.
- Supported languages: Persian (فارسی), English, Arabic (العربية), Turkish (Türkçe). If a "[LANG=xx]" hint is present, prefer it.

FORMATTING RULES (very important — the UI does NOT render markdown):
- NEVER use markdown symbols like **bold**, *italic*, __underline__, # headings, or backticks. They will appear literally as ugly stars to the user.
- For emphasis, use natural language or one emoji (✨ 🌟 ✅ 🚀) — no asterisks around words.
- For lists, use "• " bullets or "1) " / "1. " numbers. One item per line.
- For section headings, write a short Capitalized line followed by ":" — no "#" symbols.
- Keep paragraphs short (2–4 lines). Add a blank line between sections.
- Always end with one short, soft call-to-action with concrete next step (Telegram @MahdiPourabdollah_Ai, phone 09105557133, or /contact).

ANSWER QUALITY:
- Be precise, professional, and helpful. For project questions (thesis, industrial, app, chatbot, paper) give: what you'll deliver, the process steps, what info you need from them, an approximate timeline range, and how to get an exact quote.
- Never invent fixed prices — say the final price depends on scope and invite the user to /contact or Telegram for a precise quote.
- When asked for project ideas, suggest 3–5 concrete ideas with one-line descriptions.

About ATiLLAi:
- Specialized R&D studio for AI / Machine Learning / Deep Learning / Data Science / Statistics projects.
- Services: student projects (MSc & PhD theses), industrial & enterprise projects, AI app development, Persian LLM & RAG chatbots, ISI/Q1 paper writing, MLOps & cloud deployment, training.
- Domains: ML, DL, Computer Vision, NLP, LLMs, Time Series, Statistical Analysis, MLOps.
- Director: Dr. Mahdi Pourabdollah
- Address: Tabriz, Valiasr
- Phone: 09105557133 / 09901377895
- Email: Atilla.DatascienceGroup.1401@gmail.com
- Telegram: @MahdiPourabdollah_Ai
- Site sections: Home (/), Services (/services), Projects (/projects), Apps (/apps), About (/about), Contact (/contact), Blog (/blog/machine-learning-project-ideas).

Your tasks:
1. Guide users to the right service or page (link with a short relative path like /services or /contact).
2. Answer technical questions about AI/ML/DL/Statistics with depth but stay concise.
3. Help users place an order and route them to Contact or Telegram for a human expert.
4. Never invent prices — say the final price depends on scope and invite the user to Contact / Telegram for a precise quote.
5. When a user asks for project ideas, suggest 3-5 concrete ideas with one-line descriptions.`;

const MODEL_CHAIN = [
  "google/gemini-2.5-flash",
  "google/gemini-2.5-flash-lite",
  "openai/gpt-5-mini",
];

type LangKey = "fa" | "en" | "ar" | "tr";

type FaqEntry = {
  triggers: Record<LangKey, string[]>;
  answer: Record<LangKey, string>;
};

const FAQ_ENTRIES: FaqEntry[] = [
  {
    triggers: {
      fa: ["nilix چیست", "دستیار nilix", "نیلیکس چیست"],
      en: ["what is nilix", "who is nilix", "nilix assistant"],
      ar: ["ما هو nilix", "من هو nilix", "مساعد nilix"],
      tr: ["nilix nedir", "kimdir nilix", "nilix asistan"],
    },
    answer: {
      fa: "Nilix دستیار هوشمند چندزبانه ATiLLAi برای پاسخ به سوالات سایت و هدایت کاربران به خدمات صحیح است.",
      en: "Nilix is ATiLLAi’s multilingual smart assistant for website questions and service guidance.",
      ar: "Nilix هو المساعد الذكي متعدد اللغات لشركة ATiLLAi لأسئلة الموقع وتوجيه المستخدمين.",
      tr: "Nilix, ATiLLAi’nin web sitesi soruları ve hizmet yönlendirmesi için çok dilli akıllı asistanıdır.",
    },
  },
  {
    triggers: {
      fa: ["چه خدماتی ارائه می‌دهید", "خدمات شما چیست", "خدمات atillai"],
      en: ["what services do you offer", "services offered", "service list"],
      ar: ["ما هي الخدمات التي تقدمونها", "الخدمات المتاحة", "خدمات atillai"],
      tr: ["hangi hizmetleri sunuyorsunuz", "hizmetleriniz nedir", "atilai hizmetleri"],
    },
    answer: {
      fa: "خدمات ATiLLAi شامل مشاوره خانواده و کودک، پایان‌نامه و مقاله علمی، پروژه‌های صنعتی، ساخت اپلیکیشن AI و چت‌بات سازمانی است.",
      en: "ATiLLAi services include family and child consulting, thesis and academic papers, industrial AI projects, AI app development, and enterprise chatbots.",
      ar: "تشمل خدمات ATiLLAi الاستشارات الأسرية والطفل، الرسائل العلمية، مشاريع الذكاء الصناعي الصناعية، تطوير تطبيقات AI، وروبوتات المحادثة المؤسسية.",
      tr: "ATiLLAi hizmetleri arasında aile ve çocuk danışmanlığı، tez ve akademik makaleler، endüstriyel AI projeleri، AI uygulama geliştirme ve kurumsal chatbotlar bulunuyor.",
    },
  },
  {
    triggers: {
      fa: ["چه زبان هایی پشتیبانی می‌شود", "زبان های پشتیبانی", "support languages"],
      en: ["what languages are supported", "supported languages", "language support"],
      ar: ["ما هي اللغات المدعومة", "دعم اللغة", "لغات الدعم"],
      tr: ["hangi diller destekleniyor", "dil desteği", "desteklenen diller"],
    },
    answer: {
      fa: "Nilix از فارسی، انگلیسی، عربی و ترکی پشتیبانی می‌کند و زبان پیام را به صورت خودکار تشخیص می‌دهد.",
      en: "Nilix supports Persian, English, Arabic, and Turkish, with automatic language detection.",
      ar: "يدعم Nilix الفارسية والإنجليزية والعربية والتركية مع اكتشاف اللغة تلقائيًا.",
      tr: "Nilix, Farsça, İngilizce, Arapça ve Türkçe’yi destekler و dili otomatik olarak algılar.",
    },
  },
  {
    triggers: {
      fa: ["هزینه پروژه", "قیمت پروژه", "تعرفه"],
      en: ["project cost", "pricing", "how much does it cost"],
      ar: ["تكلفة المشروع", "السعر", "كم يكلف"],
      tr: ["proje maliyeti", "fiyat", "ne kadar"],
    },
    answer: {
      fa: "هزینه پروژه بستگی به دامنه کار، پیچیدگی فنی و سطح پشتیبانی دارد. برای قیمت دقیق، با تلگرام یا /contact در ارتباط باشید.",
      en: "Project cost depends on scope, technical complexity, and support level. For an exact quote, contact us via Telegram or /contact.",
      ar: "تعتمد تكلفة المشروع على النطاق والتعقيد الفني ومستوى الدعم. للحصول على عرض دقيق، اتصل بنا عبر تيليجرام أو /contact.",
      tr: "Proje maliyeti kapsam، teknik karmaşıklık ve destek seviyesine bağlıdır. Kesin teklif için Telegram üzerinden یا /contact ile iletişime geçin.",
    },
  },
  {
    triggers: {
      fa: ["شرایط پرداخت", "پرداخت چگونه است", "پیش پرداخت"],
      en: ["payment terms", "how payment works", "deposit"],
      ar: ["شروط الدفع", "كيف يتم الدفع", "دفعة مقدمة"],
      tr: ["ödeme koşulları", "ödeme nasıl", "peşinat"],
    },
    answer: {
      fa: "معمولاً ۳۰٪ پیش‌پرداخت، ۴۰٪ میان پروژه و ۳۰٪ تحویل نهایی است. برای پروژه‌های بزرگ قرارداد و اقساط توافقی هم امکان‌پذیر است.",
      en: "Usually 30% deposit، 40% mid-project، and 30% on delivery. For large projects، formal contracts and installments are also possible.",
      ar: "عادةً 30٪ دفعة مقدمة، 40٪ خلال المشروع، و30٪ عند التسليم. للمشاريع الكبيرة، يمكن ترتيب عقود وأقساط.",
      tr: "Genellikle %30 peşinat، %40 proje ortası ve %30 teslimatta. Büyük projeler için sözleşme ve taksit seçeneği de mümkündür.",
    },
  },
  {
    triggers: {
      fa: ["زمان تحویل", "مدت زمان پروژه", "تحویل پروژه"],
      en: ["delivery time", "project timeline", "how long does it take"],
      ar: ["مدة التسليم", "مدة المشروع", "كم يستغرق"],
      tr: ["teslim süresi", "proje süresi", "ne kadar sürer"],
    },
    answer: {
      fa: "بسته به نوع پروژه: چت‌بات استاندارد ۷–۱۴ روز، چت‌بات هیبریدی ۳–۶ هفته، اپ AI ۶–۱۲ هفته، پایان‌نامه ۱–۳ ماه، مقاله ISI/Q1 ۲–۶ ماه.",
      en: "Depending on the project: standard chatbot 7–14 days، hybrid chatbot 3–6 weeks، AI app 6–12 weeks، thesis 1–3 months، ISI/Q1 paper 2–6 months.",
      ar: "يعتمد على المشروع: شات بوت عادي 7–14 يومًا، شات بوت هجين 3–6 أسابيع، تطبيق AI 6–12 أسبوعًا، أطروحة 1–3 أشهر، بحث ISI/Q1 2–6 أشهر.",
      tr: "Projeye bağlı olarak: standart chatbot 7–14 gün، hibrit chatbot 3–6 hafta، AI uygulama 6–12 hafta، tez 1–3 ay، ISI/Q1 makale 2–6 ay.",
    },
  },
  {
    triggers: {
      fa: ["تخفیف دارید", "آیا تخفیف هست"],
      en: ["do you offer discounts", "is there a discount"],
      ar: ["هل يوجد خصم", "هل تقدمون خصومات"],
      tr: ["indirim var mı", "indirim sunuyor musunuz"],
    },
    answer: {
      fa: "بله. پکیج‌های ویژه برای دانشجویان، استارتاپ‌ها و پروژه‌های بلندمدت پیشنهاد می‌شود. برای جزئیات بیشتر تماس بگیرید.",
      en: "Yes. Special packages are available for students، startups، and long-term projects. Contact us for details.",
      ar: "نعم. هناك باقات خاصة للطلاب والشركات الناشئة والمشاريع طويلة الأجل. اتصل بنا لمزيد من التفاصيل.",
      tr: "Evet. Öğrenciler، startup’lar ve uzun vadeli projeler için özel paketler var. Detaylar için iletişime geçin.",
    },
  },
  {
    triggers: {
      fa: ["پشتیبانی بعد از تحویل", "گارانتی", "پس از تحویل"],
      en: ["support after delivery", "warranty", "after delivery support"],
      ar: ["دعم بعد التسليم", "ضمان", "بعد التسليم"],
      tr: ["teslim sonrası destek", "garanti", "teslimattan sonra"],
    },
    answer: {
      fa: "بله. ۳ تا ۱۲ ماه پشتیبانی رایگان شامل رفع باگ و آپدیت امنیتی ارائه می‌شود. پس از آن می‌توان قرارداد SLA سالانه بست.",
      en: "Yes. We offer 3–12 months of free support including bug fixes and security updates. After that، annual SLA contracts are available.",
      ar: "نعم. نقدم دعمًا مجانيًا من 3 إلى 12 شهرًا يشمل إصلاح الأخطاء والتحديثات الأمنية. بعد ذلك، يمكن توقيع عقد SLA سنوي.",
      tr: "Evet. 3–12 ay ücretsiz destek sağlanır; hata düzeltme ve güvenlik güncellemeleri dahildir. Sonrasında yıllık SLA sözleşmesi yapılabilir.",
    },
  },
  {
    triggers: {
      fa: ["پروژه شخصی سازی می شود", "شخصی سازی", "آیا اختصاصی است"],
      en: ["is the project customized", "customization", "is it bespoke"],
      ar: ["هل المشروع مخصص", "تخصيص", "هل هو خاص"],
      tr: ["proje özelleştirilir mi", "özelleştirme", "özel mi"],
    },
    answer: {
      fa: "بله. تمام پروژه‌ها ۱۰۰٪ اختصاصی هستند؛ معماری، UI/UX، پرامپت و دیتاست متناسب با کسب‌وکار شما طراحی می‌شود.",
      en: "Yes. All projects are 100% custom; architecture، UI/UX، prompts، and datasets are tailored to your business.",
      ar: "نعم. جميع المشاريع مخصصة بنسبة 100٪؛ يتم تصميم البنية وUI/UX وprompts وبيانات التدريب وفقًا لاحتياجاتك.",
      tr: "Evet. Tüm projeler %100 özel hazırlanır; mimari، UI/UX، promptlar ve veri seti işinize göre uyarlanır.",
    },
  },
  {
    triggers: {
      fa: ["امنیت داده", "حریم خصوصی", "چطور داده ها را محافظت می کنید"],
      en: ["data security", "privacy", "how do you protect data"],
      ar: ["أمان البيانات", "الخصوصية", "كيف تحمون البيانات"],
      tr: ["veri güvenliği", "gizlilik", "verileri nasıl koruyorsunuz"],
    },
    answer: {
      fa: "امنیت داده شامل NDA، رمزنگاری، امکان استقرار On-Premise و انطباق با GDPR است. لاگ‌ها نیز قابل ممیزی هستند.",
      en: "Data security includes NDA، encryption، on-premise deployment options، and GDPR alignment. Logs are auditable.",
      ar: "أمان البيانات يشمل NDA، التشفير، إمكانية النشر داخل المؤسسة، والامتثال لـ GDPR. السجلات قابلة للتدقيق.",
      tr: "Veri güvenliği NDA، şifreleme، on-premise dağıtım seçeneği ve GDPR uyumluluğunu içerir. Kayıtlar denetlenebilir.",
    },
  },
  {
    triggers: {
      fa: ["فرآیند کاری", "مراحل پروژه", "چطور کار می کنید"],
      en: ["process", "project steps", "how do you work"],
      ar: ["العملية", "خطوات المشروع", "كيف تعملون"],
      tr: ["çalışma süreci", "proje adımları", "nasıl çalışıyorsunuz"],
    },
    answer: {
      fa: "مراحل پروژه: نیازسنجی رایگان، پروپوزال، عقد قرارداد، توسعه چابک با گزارش هفتگی و تحویل با آموزش.",
      en: "Project steps: free requirement session، proposal، contract، agile development with weekly reports، delivery and training.",
      ar: "خطوات المشروع: جلسة احتياج مجانية، عرض، عقد، تطوير رشيق بتقارير أسبوعية، التسليم والتدريب.",
      tr: "Proje adımları: ücretsiz ihtiyaç analizi، teklif، sözleşme، haftalık raporlu çevik geliştirme، teslim ve eğitim.",
    },
  },
  {
    triggers: {
      fa: ["اطلاعات اولیه", "چه اطلاعاتی نیاز دارید", "چه چیزی باید ارسال کنم"],
      en: ["initial information", "what do you need", "what should I send"],
      ar: ["المعلومات الأولية", "ماذا تحتاجون", "ماذا أرسل"],
      tr: ["ilk bilgiler", "neye ihtiyacınız var", "ne göndermeliyim"],
    },
    answer: {
      fa: "اطلاعات لازم: کسب‌وکار شما، هدف، KPIها، مخاطب، زبان، منابع محتوایی، محدودیت‌های فنی، بودجه و زمان.",
      en: "Required info: your business، goals، KPIs، audience، language، content sources، technical limits، budget، and timeline.",
      ar: "المطلوب: عملك، الأهداف، KPIs، الجمهور، اللغة، مصادر المحتوى، القيود الفنية، الميزانية، والجدول الزمني.",
      tr: "Gerekli bilgiler: işiniz، hedefler، KPI’lar، hedef kitle، dil، içerik kaynakları، teknik sınırlamalar، bütçe ve zaman çizelgesi.",
    },
  },
  {
    triggers: {
      fa: ["خانواده", "مشاوره خانواده", "کودک"],
      en: ["family consulting", "child consulting", "family services"],
      ar: ["استشارات الأسرة", "استشارات الطفل", "خدمات العائلة"],
      tr: ["aile danışmanlığı", "çocuk danışmanlığı", "aile hizmetleri"],
    },
    answer: {
      fa: "خدمات خانواده شامل زوج‌درمانی، تعارض والدین/فرزند، مشاوره طلاق و مدیریت بحران حضوری و آنلاین است.",
      en: "Family services include couples therapy، parent-child conflict resolution، divorce support، and crisis management online or in person.",
      ar: "تشمل خدمات الأسرة العلاج الزوجي، صراعات الوالدين/الطفل، استشارات الطلاق، وإدارة الأزمات حضوريًا أو عبر الإنترنت.",
      tr: "Aile hizmetleri arasında çift terapisi، ebeveyn-çocuk çatışması çözümü، boşanma desteği ve kriz yönetimi çevrimiçi veya yüz yüze yer alır.",
    },
  },
  {
    triggers: {
      fa: ["تربیت دیجیتال", "مدیریت فضای مجازی", "بچه ها و اینترنت"],
      en: ["digital parenting", "digital discipline", "kids and internet"],
      ar: ["التربية الرقمية", "إدارة الإنترنت للأطفال", "الأطفال والفضاء الرقمي"],
      tr: ["dijital ebeveynlik", "çocuklar ve internet", "dijital eğitim"],
    },
    answer: {
      fa: "تربیت دیجیتال شامل مدیریت استفاده آگاهانه از شبکه‌های اجتماعی، بازی و AI، قرارداد خانواده، ارزیابی وابستگی و سواد رسانه‌ای است.",
      en: "Digital parenting includes mindful use of social media، games، and AI، family agreements، dependency assessment، and media literacy.",
      ar: "تشمل التربية الرقمية الاستخدام الواعي لوسائل التواصل الاجتماعي والألعاب وAI، واتفاقيات عائلية، وتقييم الاعتماد، ومحو الأمية الإعلامية.",
      tr: "Dijital ebeveynlik، sosyal medya، oyun ve AI’nin bilinçli kullanımı، aile sözleşmeleri، bağımlılık değerlendirmesi ve medya okuryazarlığını içerir.",
    },
  },
  {
    triggers: {
      fa: ["پایان نامه", "مقاله isi", "مقاله q1"],
      en: ["thesis", "isi paper", "q1 paper"],
      ar: ["أطروحة", "بحث ISI", "بحث Q1"],
      tr: ["tez", "ISI makale", "Q1 makale"],
    },
    answer: {
      fa: "خدمات پایان‌نامه و مقاله شامل انتخاب موضوع، طراحی متد، تحلیل داده، نگارش، ویرایش و آماده‌سازی دفاع یا سابمیت است.",
      en: "Thesis and paper services include topic selection، methodology، data analysis، writing، editing، and defense/submission preparation.",
      ar: "تشمل خدمات الأطروحة والبحث اختيار الموضوع، المنهجية، تحليل البيانات، الكتابة، التحرير، وإعداد الدفاع أو التقديم.",
      tr: "Tez ve makale hizmetleri konu seçimi، metodoloji، veri analizi، yazım، düzenleme ve savunma/başvuru hazırlığını içerir.",
    },
  },
  {
    triggers: {
      fa: ["پروژه صنعتی", "پروژه سازمانی", "صنعتی"],
      en: ["industrial project", "enterprise project", "industrial AI"],
      ar: ["مشروع صناعي", "مشروع مؤسسي", "الذكاء الصناعي الصناعي"],
      tr: ["endüstriyel proje", "kurumsal proje", "endüstriyel AI"],
    },
    answer: {
      fa: "برای پروژه‌های صنعتی خدمات Predictive Maintenance، Computer Vision، BI، RPA و یکپارچه‌سازی ERP/CRM ارائه می‌شود.",
      en: "For industrial projects we offer predictive maintenance، computer vision، BI، RPA، and ERP/CRM integration.",
      ar: "لمشاريع الصناعة نقدم الصيانة التنبؤية، الرؤية الحاسوبية، BI، RPA، وتكامل ERP/CRM.",
      tr: "Endüstriyel projeler için kestirimci bakım، bilgisayarla görme، BI، RPA ve ERP/CRM entegrasyonu sunuyoruz.",
    },
  },
  {
    triggers: {
      fa: ["اپلیکیشن ai", "ساخت اپلیکیشن", "اپ هوش مصنوعی"],
      en: ["AI app", "build app", "application development"],
      ar: ["تطبيق AI", "بناء تطبيق", "تطوير التطبيق"],
      tr: ["AI uygulaması", "uygulama geliştirme", "uygulama yapımı"],
    },
    answer: {
      fa: "اپ AI شامل وب، موبایل، بک‌اند و ML است. از React، Flutter، Python و Node.js برای پیاده‌سازی استفاده می‌کنیم.",
      en: "AI app development includes web، mobile، backend، and ML. We use React، Flutter، Python، and Node.js.",
      ar: "يشمل تطوير تطبيق AI الويب، الجوال، الباك-إند، وML. نستخدم React وFlutter وPython وNode.js.",
      tr: "AI uygulama geliştirme web، mobil، backend ve ML’i kapsar. React، Flutter، Python ve Node.js kullanıyoruz.",
    },
  },
  {
    triggers: {
      fa: ["چت بات سازمانی", "llm فارسی", "rag"],
      en: ["enterprise chatbot", "Persian LLM", "RAG chatbot"],
      ar: ["دردشة مؤسسية", "LLM فارسي", "RAG"],
      tr: ["kurumsal chatbot", "Farsça LLM", "RAG"],
    },
    answer: {
      fa: "چت‌بات سازمانی شامل LLM فارسی، RAG روی داده‌های خصوصی، چندزبانگی، حافظه چندمرحله‌ای و یکپارچه‌سازی پیام‌رسان است.",
      en: "The enterprise chatbot includes a Persian-capable LLM، RAG on private data، multilingual support، multi-step memory، and messenger integration.",
      ar: "يتضمن روبوت الدردشة المؤسسي LLM يدعم الفارسية، RAG على البيانات الخاصة، دعم متعدد اللغات، ذاكرة متعددة الخطوات، وتكامل المراسلة.",
      tr: "Kurumsal chatbot، Farsça destekli LLM، özel veriler üzerinde RAG، çok dilli destek، çok adımlı bellek ve mesajlaşma entegrasyonu içerir.",
    },
  },
  {
    triggers: {
      fa: ["ارتباط با کارشناس", "تماس با کارشناس", "راه‌های ارتباط"],
      en: ["contact expert", "how to contact", "contact methods"],
      ar: ["التواصل مع خبير", "كيفية الاتصال", "طرق الاتصال"],
      tr: ["uzmanla iletişim", "nasıl iletişim kurulur", "iletişim yolları"],
    },
    answer: {
      fa: "برای ارتباط: تلگرام @MahdiPourabdollah_Ai، تلفن 09105557133 / 09901377895، ایمیل Atilla.DatascienceGroup.1401@gmail.com، یا فرم /contact.",
      en: "To contact us: Telegram @MahdiPourabdollah_Ai، phone +98 910 555 7133 / +98 990 137 7895، email Atilla.DatascienceGroup.1401@gmail.com، or /contact.",
      ar: "للتواصل: تيليجرام @MahdiPourabdollah_Ai، هاتف +98 910 555 7133 / +98 990 137 7895، بريد Atilla.DatascienceGroup.1401@gmail.com، أو /contact.",
      tr: "İletişim için: Telegram @MahdiPourabdollah_Ai، telefon +98 910 555 7133 / +98 990 137 7895، e-posta Atilla.DatascienceGroup.1401@gmail.com veya /contact.",
    },
  },
];

function normalizeText(text: string) {
  return String(text || "")
    .normalize("NFKC")
    .toLowerCase()
    .replace(/\u200c/g, " ")
    .replace(/[^\w\u0600-\u06FF\u0621-\u064A\u0660-\u0669\u00C0-\u017F\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function matchesTrigger(message: string, trigger: string) {
  const text = normalizeText(message);
  const pattern = normalizeText(trigger);
  if (!pattern) return false;
  if (text.includes(pattern)) return true;
  const tokens = pattern.split(" ").filter(Boolean);
  return tokens.length > 2 && tokens.every((token) => text.includes(token));
}

function findFaqAnswer(message: string, lang: LangKey): string | null {
  for (const entry of FAQ_ENTRIES) {
    for (const trigger of entry.triggers[lang]) {
      if (matchesTrigger(message, trigger)) {
        return entry.answer[lang];
      }
    }
  }
  return null;
}

function detectLang(text: string): LangKey {
  const t = text || "";
  if (/[\u0600-\u06FF]/.test(t)) {
    // distinguish arabic vs persian using persian-only chars
    if (/[\u067E\u0686\u0698\u06AF\u06CC\u06A9]/.test(t)) return "fa";
    return "ar";
  }
  if (/[çğıöşüÇĞİÖŞÜ]/.test(t)) return "tr";
  return "en";
}

function smartFallback(messages: ChatMessage[]): string {
  const last = [...messages].reverse().find((m) => m.role === "user")?.content ?? "";
  const q = last.toLowerCase();
  const langHint = /\[lang=(fa|en|ar|tr)\]/i.exec(last)?.[1] as LangKey | undefined;
  const lang: LangKey = langHint ?? detectLang(last);
  const faqAnswer = findFaqAnswer(last, lang);
  if (faqAnswer) return faqAnswer;

  const intents = [
    { key: "price", fa: /قیمت|هزینه|تعرفه|چقدر/, en: /price|cost|how much|pricing/, ar: /سعر|تكلفة|كم/, tr: /fiyat|ücret|maliyet|ne kadar/ },
    { key: "contact", fa: /تماس|ارتباط|واتساپ|تلگرام|شماره|ایمیل/, en: /contact|reach|phone|email|telegram|whatsapp/, ar: /تواصل|اتصال|هاتف|بريد|تيليجرام/, tr: /iletişim|telefon|e-?posta|telegram/ },
    { key: "thesis", fa: /پایان.?نامه|تز|دکتر|ارشد|مقاله|isi|q1/i, en: /thesis|phd|msc|master|paper|publication|isi|q1/, ar: /أطروحة|ماجستير|دكتوراه|مقال|بحث/, tr: /tez|yüksek lisans|doktora|makale|yayın/ },
    { key: "industrial", fa: /صنعت|شرکت|کارخانه|سازمان|industrial/, en: /industrial|enterprise|factory|company/, ar: /صناع|شركة|مصنع/, tr: /endüstri|kurumsal|fabrika|şirket/ },
    { key: "app", fa: /اپلیکیشن|اپ|موبایل|اندروید|ios/i, en: /app|mobile|android|ios|flutter/, ar: /تطبيق|موبايل|أندرويد/, tr: /uygulama|mobil|android|ios/ },
    { key: "chatbot", fa: /چت.?بات|chatbot|llm|rag|بات/i, en: /chatbot|bot|llm|rag|assistant/, ar: /روبوت|محادثة|llm|rag/i, tr: /chatbot|bot|llm|rag/ },
    { key: "greet", fa: /^(سلام|درود|های)/, en: /^(hi|hello|hey|salam)\b/, ar: /^(مرحبا|أهلا|سلام)/, tr: /^(merhaba|selam|hi|hello)/ },
  ];

  const matched = intents.find((i) => (i as any)[lang]?.test?.(q));
  const intent = matched?.key ?? "default";

  const tplFa: Record<string, string> = {
    greet: "سلام 👋 خوش آمدید به ATiLLAi!\nاگر می‌خواهید روی پروژه‌ای کار کنید (پایان‌نامه، صنعتی، اپ، چت‌بات یا مقاله ISI) موضوع را برایم بنویسید تا راهنمایی دقیقی ارائه کنم.\n\nراه‌های ارتباطی سریع:\n• تلگرام: @MahdiPourabdollah_Ai\n• تماس: 09105557133\n• فرم تماس: /contact",
    price: "💰 هزینه پروژه‌ها به دامنه کار (داده، الگوریتم، دیپلوی، مستندات) بستگی دارد و بعد از بررسی نیاز شما اعلام می‌شود.\nبرای دریافت قیمت دقیق:\n• پیام در تلگرام: @MahdiPourabdollah_Ai\n• تماس: 09105557133\n• فرم تماس: /contact",
    contact: "📞 راه‌های ارتباط با ATiLLAi:\n• تلگرام: @MahdiPourabdollah_Ai\n• موبایل: 09105557133 / 09901377895\n• ایمیل: Atilla.DatascienceGroup.1401@gmail.com\n• آدرس: تبریز، ولیعصر\n• فرم تماس آنلاین: /contact",
    thesis: "🎓 برای پروژه‌های پایان‌نامه ارشد/دکترا و مقاله ISI/Q1 خدمات کامل ارائه می‌کنیم: انتخاب موضوع، طراحی متد، پیاده‌سازی، مستندسازی و سابمیت.\nبرای مشاوره رایگان: /services یا تلگرام @MahdiPourabdollah_Ai",
    industrial: "🏭 برای پروژه‌های صنعتی (Computer Vision، Predictive Maintenance، Forecasting، Quality Inspection و …) از POC تا Production در کنار شما هستیم.\nنمونه پروژه‌ها: /projects — برای جلسه فنی: /contact",
    app: "📱 ساخت اپلیکیشن AI (Flutter / Native) با هسته LLM، Vision یا توصیه‌گر را به‌صورت کامل (UI/UX، بک‌اند، استور) انجام می‌دهیم.\nنمونه‌ها در: /apps — برای بریف اولیه: /contact",
    chatbot: "💬 چت‌بات سازمانی با LLM فارسی + RAG روی داده‌های خصوصی شما، با حافظه چندمرحله‌ای و یکپارچه‌سازی با Telegram / WhatsApp / وب.\nبرای دموی اختصاصی: /contact یا تلگرام @MahdiPourabdollah_Ai",
    default: "ممنون از پیام شما! 🌟 لطفاً کمی بیشتر درباره موضوع توضیح دهید (نوع پروژه، حوزه، ددلاین، نوع داده) تا بهترین مسیر را پیشنهاد کنم.\nهمچنین می‌توانید مستقیم با تلگرام @MahdiPourabdollah_Ai یا فرم /contact در ارتباط باشید.",
  };

  const tplEn: Record<string, string> = {
    greet: "Hi 👋 Welcome to ATiLLAi!\nTell me about your project (thesis, industrial, app, chatbot, ISI paper…) and I'll guide you.\n\nFast contact:\n• Telegram: @MahdiPourabdollah_Ai\n• Phone: +98 910 555 7133\n• Contact form: /contact",
    price: "💰 Pricing depends on scope (data, algorithm, deployment, docs) and is shared after a quick review.\nFor an exact quote:\n• Telegram: @MahdiPourabdollah_Ai\n• Phone: +98 910 555 7133\n• Form: /contact",
    contact: "📞 Reach ATiLLAi:\n• Telegram: @MahdiPourabdollah_Ai\n• Mobile: +98 910 555 7133 / +98 990 137 7895\n• Email: Atilla.DatascienceGroup.1401@gmail.com\n• Address: Tabriz, Valiasr\n• Form: /contact",
    thesis: "🎓 We support MSc / PhD theses and ISI / Q1 papers end-to-end: topic, methodology, implementation, documentation, submission.\nFree consult: /services or Telegram @MahdiPourabdollah_Ai",
    industrial: "🏭 We deliver industrial AI (Computer Vision, Predictive Maintenance, Forecasting, Quality Inspection) from POC to Production.\nCase studies: /projects — Book a tech call: /contact",
    app: "📱 We build AI mobile apps (Flutter / Native) with LLM, Vision or recommender cores — UI/UX, backend, store release.\nExamples: /apps — Brief us: /contact",
    chatbot: "💬 Enterprise chatbot with a Persian-capable LLM + RAG on your private data, multi-turn memory, Telegram / WhatsApp / web integration.\nLive demo: /contact or Telegram @MahdiPourabdollah_Ai",
    default: "Thanks for your message! 🌟 Could you share a bit more (project type, domain, deadline, data) so I can suggest the best path?\nYou can also reach us on Telegram @MahdiPourabdollah_Ai or via /contact.",
  };

  const tplAr: Record<string, string> = {
    greet: "مرحبًا 👋 أهلًا بك في ATiLLAi!\nأخبرني عن مشروعك (أطروحة، صناعي، تطبيق، شات بوت، بحث ISI) لأرشدك.\n\nتواصل سريع:\n• تيليجرام: @MahdiPourabdollah_Ai\n• هاتف: +98 910 555 7133\n• نموذج: /contact",
    price: "💰 السعر يعتمد على نطاق العمل (البيانات، الخوارزمية، النشر، التوثيق) ويُرسل بعد مراجعة سريعة.\nللاستفسار الدقيق:\n• تيليجرام: @MahdiPourabdollah_Ai\n• هاتف: +98 910 555 7133\n• نموذج: /contact",
    contact: "📞 وسائل التواصل:\n• تيليجرام: @MahdiPourabdollah_Ai\n• جوال: +98 910 555 7133 / +98 990 137 7895\n• بريد: Atilla.DatascienceGroup.1401@gmail.com\n• العنوان: تبريز، وليعصر\n• نموذج: /contact",
    thesis: "🎓 ندعم أطروحات الماجستير والدكتوراه وأبحاث ISI / Q1 من الموضوع إلى النشر.\nاستشارة مجانية: /services أو تيليجرام @MahdiPourabdollah_Ai",
    industrial: "🏭 حلول الذكاء الاصطناعي الصناعية (رؤية حاسوبية، صيانة تنبؤية، تنبؤ، فحص جودة) من POC إلى Production.\nنماذج: /projects — اجتماع تقني: /contact",
    app: "📱 نبني تطبيقات ذكية (Flutter / Native) بنواة LLM أو رؤية أو موصي — تصميم وخلفية ونشر.\nأمثلة: /apps — للتواصل: /contact",
    chatbot: "💬 روبوت محادثة مؤسسي مع LLM يدعم العربية/الفارسية + RAG على بياناتك الخاصة، ذاكرة متعددة وتكامل ويب/تيليجرام/واتساب.\nعرض حي: /contact أو تيليجرام @MahdiPourabdollah_Ai",
    default: "شكرًا لرسالتك! 🌟 شاركني تفاصيل أكثر (نوع المشروع، المجال، الموعد النهائي، البيانات) لأقترح أفضل مسار.\nيمكنك التواصل عبر تيليجرام @MahdiPourabdollah_Ai أو /contact.",
  };

  const tplTr: Record<string, string> = {
    greet: "Merhaba 👋 ATiLLAi'ye hoş geldiniz!\nProjeniz hakkında bilgi verin (tez, endüstriyel, uygulama, chatbot, ISI makale) yönlendireyim.\n\nHızlı iletişim:\n• Telegram: @MahdiPourabdollah_Ai\n• Telefon: +98 910 555 7133\n• Form: /contact",
    price: "💰 Fiyat; veri, algoritma, dağıtım ve dokümantasyon kapsamına bağlıdır ve kısa bir incelemeden sonra paylaşılır.\nKesin teklif için:\n• Telegram: @MahdiPourabdollah_Ai\n• Telefon: +98 910 555 7133\n• Form: /contact",
    contact: "📞 İletişim:\n• Telegram: @MahdiPourabdollah_Ai\n• Mobil: +98 910 555 7133 / +98 990 137 7895\n• E-posta: Atilla.DatascienceGroup.1401@gmail.com\n• Adres: Tebriz, Valiasr\n• Form: /contact",
    thesis: "🎓 Yüksek lisans/doktora tezleri ve ISI/Q1 makaleleri için uçtan uca destek (konu, metodoloji, uygulama, doküman, sunum).\nÜcretsiz danışma: /services veya Telegram @MahdiPourabdollah_Ai",
    industrial: "🏭 Endüstriyel YZ (Computer Vision, Kestirimci Bakım, Tahmin, Kalite Kontrol) POC'tan Production'a.\nÖrnekler: /projects — Teknik görüşme: /contact",
    app: "📱 LLM, Vision veya öneri çekirdekli mobil YZ uygulamaları (Flutter / Native) — UI/UX, backend, store yayın.\nÖrnekler: /apps — Bilgi formu: /contact",
    chatbot: "💬 Farsça destekli LLM + RAG ile özel verileriniz üzerine kurumsal chatbot, çok adımlı bellek, Telegram/WhatsApp/web entegrasyonu.\nDemo: /contact veya Telegram @MahdiPourabdollah_Ai",
    default: "Mesajınız için teşekkürler! 🌟 Lütfen daha fazla bilgi paylaşın (proje türü, alan, teslim tarihi, veri) ki en iyi yolu önerebilirim.\nTelegram @MahdiPourabdollah_Ai veya /contact üzerinden de bize ulaşabilirsiniz.",
  };

  const tables: Record<LangKey, Record<string, string>> = { fa: tplFa, en: tplEn, ar: tplAr, tr: tplTr };
  return tables[lang][intent] ?? tables[lang].default;
}

async function callModel(apiKey: string, model: string, messages: ChatMessage[]) {
  const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model,
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      temperature: 0.6,
    }),
  });
  return res;
}

export const chatConsult = createServerFn({ method: "POST" })
  .inputValidator((data: { messages: ChatMessage[] }) => {
    if (!data || !Array.isArray(data.messages)) throw new Error("invalid input");
    const ALLOWED_ROLES = new Set(["user", "assistant"]);
    const messages: ChatMessage[] = data.messages
      .slice(-20)
      .filter((m) => m && ALLOWED_ROLES.has(m.role))
      .map((m) => ({
        role: m.role as "user" | "assistant",
        content: String(m.content || "").slice(0, 4000),
      }));
    return { messages };
  })
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) {
      return { reply: smartFallback(data.messages), fallback: true as const };
    }

    let lastStatus = 0;
    for (const model of MODEL_CHAIN) {
      try {
        const res = await callModel(apiKey, model, data.messages);
        if (res.ok) {
          const json = await res.json();
          const reply: string = json?.choices?.[0]?.message?.content ?? "";
          if (reply.trim()) return { reply, fallback: false as const, model };
          continue;
        }
        lastStatus = res.status;
        // 429 and 402 — try next cheaper model, otherwise fallback below
        if (res.status === 429 || res.status === 402 || res.status >= 500) continue;
        // other errors — break and use smart fallback
        break;
      } catch {
        continue;
      }
    }

    // All models failed — graceful smart fallback so the user always gets value
    const reply = smartFallback(data.messages);
    return { reply, fallback: true as const, status: lastStatus };
  });
