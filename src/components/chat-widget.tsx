import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles, Loader2, Globe, Bot, Copy, Check, Trash2, Phone, MessageSquare, Mail } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { chatConsult } from "@/lib/chat.functions";
import BotLogo from "@/assets/bot-logo.png";

type Msg = { role: "user" | "assistant"; content: string };
type LangKey = "fa" | "en" | "ar" | "tr";

const STORAGE_PREFIX = "ATiLLAi:chat:v2:";
const TELEGRAM_URL = "https://t.me/MahdiPourabdollah_Ai";
const PHONE_URL = "tel:+989105557133";
const EMAIL_URL = "mailto:Atilla.DatascienceGroup.1401@gmail.com";

const QUICK_REPLIES: Record<LangKey, { label: string; prompt: string }[]> = {
  fa: [
    { label: "💰 قیمت پروژه", prompt: "هزینه یک پروژه را چطور تخمین می‌زنید؟" },
    { label: "📞 صحبت با کارشناس", prompt: "می‌خواهم با یک کارشناس انسانی صحبت کنم." },
    { label: "🎓 پروژه پایان‌نامه", prompt: "برای پایان‌نامه چه خدماتی ارائه می‌دهید؟" },
    { label: "💬 چت‌بات سازمانی", prompt: "می‌خواهم یک چت‌بات سازمانی با LLM فارسی بسازم." },
  ],
  en: [
    { label: "💰 Pricing", prompt: "How do you estimate the price of a project?" },
    { label: "📞 Talk to a human", prompt: "I want to talk to a human expert." },
    { label: "🎓 Thesis project", prompt: "What services do you offer for thesis projects?" },
    { label: "💬 Enterprise chatbot", prompt: "I want to build an enterprise chatbot with a Persian LLM." },
  ],
  ar: [
    { label: "💰 السعر", prompt: "كيف تقدّرون سعر المشروع؟" },
    { label: "📞 خبير بشري", prompt: "أرغب بالتحدث مع خبير بشري." },
    { label: "🎓 مشروع تخرج", prompt: "ما هي خدماتكم لمشاريع التخرج؟" },
    { label: "💬 شات بوت مؤسسي", prompt: "أرغب ببناء شات بوت مؤسسي مع LLM يدعم العربية والفارسية." },
  ],
  tr: [
    { label: "💰 Fiyatlandırma", prompt: "Bir projenin fiyatını nasıl tahmin ediyorsunuz?" },
    { label: "📞 Uzmanla görüş", prompt: "Bir uzmanla görüşmek istiyorum." },
    { label: "🎓 Tez projesi", prompt: "Tez projeleri için hangi hizmetleri sunuyorsunuz?" },
    { label: "💬 Kurumsal chatbot", prompt: "Farsça LLM ile kurumsal bir chatbot kurmak istiyorum." },
  ],
};

const TEASER: Record<LangKey, string> = {
  fa: "سلام! کمکی از من ساخته است؟ ✨",
  en: "Hi! Need help with an AI project? ✨",
  ar: "مرحبًا! هل أساعدك في مشروع ذكاء اصطناعي؟ ✨",
  tr: "Merhaba! YZ projenizde yardımcı olabilir miyim? ✨",
};

// Strip leftover markdown symbols some models occasionally emit (we instruct the model not to use them).
function cleanMarkdown(text: string): string {
  return text
    // **bold** / __bold__  →  bold
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/__(.+?)__/g, "$1")
    // *italic* / _italic_  →  italic (avoid touching bullets that start a line)
    .replace(/(^|[^*])\*(?!\s)([^*\n]+?)\*(?!\*)/g, "$1$2")
    .replace(/(^|[^_])_(?!\s)([^_\n]+?)_(?!_)/g, "$1$2")
    // `code` → code
    .replace(/`([^`\n]+)`/g, "$1")
    // ###/##/# headings → plain line
    .replace(/^#{1,6}\s+/gm, "")
    // Markdown bullets "- " or "* " at line start → "• "
    .replace(/^\s*[-*]\s+/gm, "• ");
}

// Render text with auto-linking for /paths, https URLs, @telegram handles and phone numbers.
function renderRich(text: string): ReactNode {
  const cleaned = cleanMarkdown(text);
  const tokens = cleaned.split(/(https?:\/\/\S+|\s\/[a-zA-Z0-9_-]+(?:\/[a-zA-Z0-9_-]+)*|@[A-Za-z0-9_]{3,}|\+?\d[\d\s()-]{7,}\d)/g);
  return tokens.map((tok, i) => {
    if (!tok) return null;
    if (/^https?:\/\//.test(tok)) {
      return <a key={i} href={tok} target="_blank" rel="noopener noreferrer" className="text-amber-300 underline-offset-2 hover:underline break-all">{tok}</a>;
    }
    if (/^\s\/[a-zA-Z0-9_-]/.test(tok)) {
      const path = tok.trim();
      return <span key={i}> <a href={path} className="text-amber-300 underline-offset-2 hover:underline">{path}</a></span>;
    }
    if (/^@[A-Za-z0-9_]{3,}$/.test(tok)) {
      return <a key={i} href={`https://t.me/${tok.slice(1)}`} target="_blank" rel="noopener noreferrer" className="text-amber-300 underline-offset-2 hover:underline">{tok}</a>;
    }
    if (/^\+?\d[\d\s()-]{7,}\d$/.test(tok)) {
      return <a key={i} href={`tel:${tok.replace(/[^\d+]/g, "")}`} className="text-amber-300 underline-offset-2 hover:underline">{tok}</a>;
    }
    return <span key={i}>{tok}</span>;
  });
}

type LangPack = {
  label: string;
  dir: "rtl" | "ltr";
  title: string;
  status: string;
  welcome: string;
  placeholder: string;
  thinking: string;
  errorMsg: string;
  poweredBy: string;
  pickTopic: string;
  categories: { key: string; label: string; icon: string }[];
  topics: { icon: string; label: string; prompt: string; cat: string }[];
};


const LANGS: Record<LangKey, LangPack> = {
  fa: {
    label: "فارسی",
    dir: "rtl",
    title: "Nilix — دستیار هوشمند ATiLLAi",
    status: "آنلاین · پاسخ < ۳۰ ثانیه",
    welcome: "سلام 👋 من Nilix هستم، دستیار هوشمند چندزبانه ATiLLAi.\nبرای شروع یکی از موضوعات زیر را انتخاب کنید یا سوال خودتان را بنویسید 👇",
    placeholder: "سوال خود را بنویسید…",
    thinking: "در حال نوشتن…",
    errorMsg: "خطایی رخ داد. لطفاً دوباره تلاش کنید یا با ما تماس بگیرید.",
    poweredBy: "ATiLLAi Assistant · Multilingual",
    pickTopic: "موضوع گفت‌وگو را انتخاب کنید",
    categories: [
      { key: "family", label: "مشاوره و خانواده", icon: "👨‍👩‍👧" },
      { key: "academic", label: "پایان‌نامه و مقاله", icon: "🎓" },
      { key: "business", label: "کسب‌وکار و فناوری", icon: "🏭" },
      { key: "support", label: "پشتیبانی و قیمت", icon: "💬" },
    ],
    topics: [
      { icon: "🧒", label: "مشاوره کودکان (شخصیت و استعداد)", prompt: "سلام؛ برای فرزندم می‌خواهم در زمینهٔ شناخت شخصیت، استعدادیابی شغلی و مسیر رشد مهارت‌های هوش مصنوعی مشاورهٔ تخصصی بگیرم. لطفاً تست کودکان ATiLLAi، مراحل جلسات، خروجی گزارش حرفه‌ای و هزینهٔ کامل را توضیح دهید." , cat: "family" },
      { icon: "👨‍👩‍👧", label: "تربیت دیجیتال و خانواده", prompt: "به‌عنوان والدین می‌خواهم در مورد تربیت دیجیتال، مدیریت زمان استفاده از فناوری و ورود اصولی فرزندم به دنیای AI مشاورهٔ تخصصی بگیرم. چه برنامه و بسته‌ای پیشنهاد می‌کنید؟" , cat: "family" },
      { icon: "🎓", label: "پایان‌نامه ارشد / دکترا", prompt: "می‌خواهم برای پروژه پایان‌نامه ارشد/دکترا در حوزه هوش مصنوعی مشاوره بگیرم. لطفاً متدولوژی، مراحل اجرا، تضمین کیفیت، زمان‌بندی و قیمت‌گذاری شفاف را بفرمایید." , cat: "academic" },
      { icon: "🏭", label: "پروژه صنعتی / سازمانی", prompt: "برای شرکت‌مان به یک راهکار AI صنعتی (Computer Vision، Predictive Maintenance، Anomaly Detection یا Forecasting) نیاز داریم. نمونه‌کارها، معماری پیشنهادی و فرایند تحویل را توضیح دهید." , cat: "business" },
      { icon: "📱", label: "ساخت اپلیکیشن AI", prompt: "می‌خواهم یک اپلیکیشن موبایل/وب با هستهٔ هوش مصنوعی (چت‌بات، توصیه‌گر، تحلیل تصویر یا صدا) بسازم. گزینه‌های فنی، استک پیشنهادی و برآورد هزینه چیست؟" , cat: "business" },
      { icon: "💬", label: "چت‌بات سازمانی / LLM فارسی", prompt: "به یک چت‌بات سازمانی حرفه‌ای مبتنی بر LLM فارسی با RAG، اتصال به دیتابیس داخلی و پنل مدیریت نیاز داریم. هزینه، زمان تحویل و SLA پشتیبانی را بفرمایید." , cat: "business" },
      { icon: "📄", label: "مقاله ISI / Q1", prompt: "برای نگارش، ادیت و سابمیت مقاله ISI / Q1 در حوزه AI به کمک نیاز دارم. مراحل، تضمین کیفیت و شانس پذیرش را توضیح دهید." , cat: "academic" },
      { icon: "💰", label: "هزینه و زمان تحویل", prompt: "هزینه و زمان تحویل تقریبی پروژه‌های ATiLLAi چقدر است؟ لطفاً پکیج‌های دانشجویی، صنعتی و سازمانی را با هم مقایسه کنید." , cat: "support" },
      { icon: "📞", label: "ارتباط با کارشناس", prompt: "می‌خواهم با یک کارشناس انسانی ATiLLAi صحبت کنم. لطفاً راه‌های ارتباطی مستقیم (تلگرام، واتساپ، تلفن، ایمیل) و ساعات پاسخگویی را بفرمایید." , cat: "support" },
    ],
  },
  en: {
    label: "English",
    dir: "ltr",
    title: "Nilix — ATiLLAi Smart Assistant",
    status: "Online · replies in < 30s",
    welcome: "Hi 👋 I'm Nilix, ATiLLAi's multilingual AI assistant.\nPick a topic below or just type your question 👇",
    placeholder: "Type your question…",
    thinking: "Typing…",
    errorMsg: "Something went wrong. Please try again or contact us directly.",
    poweredBy: "ATiLLAi Assistant · Multilingual",
    pickTopic: "Pick a topic to start",
    categories: [
      { key: "family", label: "Kids & Family", icon: "👨‍👩‍👧" },
      { key: "academic", label: "Thesis & Papers", icon: "🎓" },
      { key: "business", label: "Business & Tech", icon: "🏭" },
      { key: "support", label: "Support & Pricing", icon: "💬" },
    ],
    topics: [
      { icon: "🧒", label: "Kids consulting (personality & talent)", prompt: "Hi, I'd like professional consulting for my child on personality discovery, career-talent assessment, and an AI-skills growth path. Please explain the ATiLLAi Kids test, session flow, the professional report, and full pricing." , cat: "family" },
      { icon: "👨‍👩‍👧", label: "Family & digital parenting", prompt: "As a parent I want expert guidance on digital parenting, screen-time management, and introducing my child to AI in a healthy, structured way. Which package do you recommend?" , cat: "family" },
      { icon: "🎓", label: "Thesis / PhD project", prompt: "I need consulting for my MSc/PhD AI project. Please walk me through methodology, milestones, quality assurance, timeline and transparent pricing." , cat: "academic" },
      { icon: "🏭", label: "Industrial / Enterprise AI", prompt: "Our company needs an industrial AI solution (Computer Vision, Predictive Maintenance, Anomaly Detection or Forecasting). Please share case studies, proposed architecture and delivery process." , cat: "business" },
      { icon: "📱", label: "Build an AI app", prompt: "I want to build a mobile/web app with an AI core (chatbot, recommender, image or speech analysis). What are the technical options, recommended stack and estimated cost?" , cat: "business" },
      { icon: "💬", label: "Enterprise chatbot / Persian LLM", prompt: "We need an enterprise chatbot with a Persian-capable LLM, RAG, internal DB integration and an admin panel. Please share cost, timeline and support SLA." , cat: "business" },
      { icon: "📄", label: "ISI / Q1 paper", prompt: "I need help writing, editing and submitting an ISI / Q1 paper in AI. Please describe the steps, quality assurance and acceptance support." , cat: "academic" },
      { icon: "💰", label: "Pricing & timeline", prompt: "What is the typical price and delivery time for ATiLLAi projects? Please compare student, industrial and enterprise packages." , cat: "support" },
      { icon: "📞", label: "Talk to a human expert", prompt: "I'd like to talk to a human ATiLLAi expert. Please share direct contact options (Telegram, WhatsApp, phone, email) and working hours." , cat: "support" },
    ],
  },
  ar: {
    label: "العربية",
    dir: "rtl",
    title: "Nilix — مساعد ATiLLAi الذكي",
    status: "متصل · الرد خلال ٣٠ ثانية",
    welcome: "مرحبًا 👋 أنا Nilix، المساعد الذكي متعدد اللغات في ATiLLAi.\nاختر موضوعًا أو اكتب سؤالك مباشرة 👇",
    placeholder: "اكتب سؤالك…",
    thinking: "جارٍ الكتابة…",
    errorMsg: "حدث خطأ. يرجى المحاولة مرة أخرى أو التواصل معنا.",
    poweredBy: "ATiLLAi Assistant · متعدد اللغات",
    pickTopic: "اختر موضوع المحادثة",
    categories: [
      { key: "family", label: "الأطفال والأسرة", icon: "👨‍👩‍👧" },
      { key: "academic", label: "الأطروحات والأبحاث", icon: "🎓" },
      { key: "business", label: "الأعمال والتقنية", icon: "🏭" },
      { key: "support", label: "الدعم والأسعار", icon: "💬" },
    ],
    topics: [
      { icon: "🧒", label: "استشارة الأطفال (الشخصية والمواهب)", prompt: "أرغب باستشارة احترافية لطفلي حول اكتشاف الشخصية، تقييم الميول المهنية ومسار تطوير مهارات الذكاء الاصطناعي. يرجى شرح اختبار ATiLLAi للأطفال، خطوات الجلسات، التقرير الاحترافي والتكلفة الكاملة." , cat: "family" },
      { icon: "👨‍👩‍👧", label: "التربية الرقمية والأسرة", prompt: "كأبٍ/أمّ أرغب باستشارة متخصصة حول التربية الرقمية، إدارة وقت الشاشات وإدخال طفلي إلى عالم الذكاء الاصطناعي بشكل صحي ومنظم. ما الباقة المقترحة؟" , cat: "family" },
      { icon: "🎓", label: "مشروع ماجستير / دكتوراه", prompt: "أحتاج استشارة لمشروع الماجستير/الدكتوراه في الذكاء الاصطناعي. اشرحوا لي المنهجية، المراحل، ضمان الجودة، الجدول الزمني والتسعير الشفاف." , cat: "academic" },
      { icon: "🏭", label: "مشروع صناعي / مؤسسي", prompt: "نحتاج حلًا صناعيًا بالذكاء الاصطناعي (رؤية حاسوبية، صيانة تنبؤية، كشف الشذوذ أو التنبؤ). شاركوا أعمالكم السابقة، البنية المقترحة وعملية التسليم." , cat: "business" },
      { icon: "📱", label: "بناء تطبيق ذكي", prompt: "أرغب ببناء تطبيق موبايل/ويب بنواة ذكاء اصطناعي (شات بوت، نظام توصية، تحليل صور أو صوت). ما الخيارات التقنية والتقدير المبدئي للتكلفة؟" , cat: "business" },
      { icon: "💬", label: "شات بوت مؤسسي / LLM", prompt: "نحتاج شات بوت مؤسسي مع نموذج LLM يدعم العربية والفارسية مع RAG وربط بقاعدة البيانات الداخلية ولوحة إدارة. التكلفة، الزمن واتفاقية الدعم؟" , cat: "business" },
      { icon: "📄", label: "نشر بحث ISI / Q1", prompt: "أحتاج مساعدة في كتابة وتحرير وإرسال بحث ISI / Q1 في مجال الذكاء الاصطناعي. اشرحوا الخطوات وضمان الجودة." , cat: "academic" },
      { icon: "💰", label: "التكلفة وزمن التسليم", prompt: "ما هي التكلفة التقريبية وزمن التسليم لمشاريع ATiLLAi؟ قارنوا بين الباقات الطلابية والصناعية والمؤسسية." , cat: "support" },
      { icon: "📞", label: "التحدث مع خبير", prompt: "أرغب بالتحدث مع خبير بشري من ATiLLAi. شاركوا وسائل التواصل المباشر (تلغرام، واتساب، هاتف، بريد) وساعات العمل." , cat: "support" },
    ],
  },
  tr: {
    label: "Türkçe",
    dir: "ltr",
    title: "Nilix — ATiLLAi Akıllı Asistan",
    status: "Çevrimiçi · < 30 sn yanıt",
    welcome: "Merhaba 👋 Ben Nilix, ATiLLAi'nin çok dilli yapay zekâ asistanıyım.\nBir konu seçin ya da sorunuzu yazın 👇",
    placeholder: "Sorunuzu yazın…",
    thinking: "Yazıyor…",
    errorMsg: "Bir hata oluştu. Lütfen tekrar deneyin veya bize ulaşın.",
    poweredBy: "ATiLLAi Assistant · Çok Dilli",
    pickTopic: "Bir konu seçin",
    categories: [
      { key: "family", label: "Çocuk & Aile", icon: "👨‍👩‍👧" },
      { key: "academic", label: "Tez & Makale", icon: "🎓" },
      { key: "business", label: "İş & Teknoloji", icon: "🏭" },
      { key: "support", label: "Destek & Fiyat", icon: "💬" },
    ],
    topics: [
      { icon: "🧒", label: "Çocuk danışmanlığı (kişilik & yetenek)", prompt: "Çocuğum için kişilik keşfi, kariyer-yetenek değerlendirmesi ve yapay zekâ becerileri gelişim yolu konusunda profesyonel danışmanlık almak istiyorum. ATiLLAi Çocuk testini, seans akışını, profesyonel raporu ve tam fiyatı açıklar mısınız?" , cat: "family" },
      { icon: "👨‍👩‍👧", label: "Aile & dijital ebeveynlik", prompt: "Ebeveyn olarak dijital ebeveynlik, ekran süresi yönetimi ve çocuğumun yapay zekâ dünyasına sağlıklı bir şekilde girişi konusunda uzman danışmanlık istiyorum. Hangi paketi önerirsiniz?" , cat: "family" },
      { icon: "🎓", label: "Tez / Doktora projesi", prompt: "Yüksek lisans/doktora yapay zekâ projem için danışmanlık almak istiyorum. Metodoloji, aşamalar, kalite güvencesi, zaman çizelgesi ve şeffaf fiyatlandırmayı paylaşır mısınız?" , cat: "academic" },
      { icon: "🏭", label: "Endüstriyel / Kurumsal AI", prompt: "Şirketimiz için endüstriyel bir yapay zekâ çözümüne (Computer Vision, Predictive Maintenance, Anomaly Detection veya Forecasting) ihtiyacımız var. Referanslarınızı, mimariyi ve teslim sürecini paylaşın." , cat: "business" },
      { icon: "📱", label: "AI uygulama geliştirme", prompt: "Yapay zekâ çekirdekli bir mobil/web uygulama (sohbet botu, öneri sistemi, görüntü/ses analizi) yapmak istiyorum. Teknik seçenekler, önerilen yığın ve tahmini maliyet nedir?" , cat: "business" },
      { icon: "💬", label: "Kurumsal chatbot / Farsça LLM", prompt: "Farsça destekli LLM, RAG, iç veritabanı entegrasyonu ve yönetim paneli olan kurumsal bir chatbot istiyoruz. Maliyet, süre ve destek SLA'sını paylaşın." , cat: "business" },
      { icon: "📄", label: "ISI / Q1 makale", prompt: "Yapay zekâ alanında ISI / Q1 makale yazımı, düzenleme ve sunumu için yardıma ihtiyacım var. Adımları ve kalite güvencesini açıklayın." , cat: "academic" },
      { icon: "💰", label: "Fiyat & teslim süresi", prompt: "ATiLLAi projelerinin tipik fiyatı ve teslim süresi nedir? Öğrenci, endüstriyel ve kurumsal paketleri karşılaştırın." , cat: "support" },
      { icon: "📞", label: "Uzmanla görüşme", prompt: "Bir ATiLLAi uzmanıyla görüşmek istiyorum. Doğrudan iletişim seçeneklerini (Telegram, WhatsApp, telefon, e-posta) ve çalışma saatlerini paylaşın." , cat: "support" },
    ],
  },
};

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<LangKey>("fa");
  const [langMenu, setLangMenu] = useState(false);
  const pack = LANGS[lang];
  const welcome = useMemo<Msg>(() => ({ role: "assistant", content: pack.welcome }), [pack.welcome]);
  const [messages, setMessages] = useState<Msg[]>([welcome]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [showTeaser, setShowTeaser] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const send = useServerFn(chatConsult);

  // Load persisted language + messages on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const savedLang = window.localStorage.getItem(`${STORAGE_PREFIX}lang`) as LangKey | null;
      if (savedLang && ["fa", "en", "ar", "tr"].includes(savedLang)) setLang(savedLang);
      const raw = window.localStorage.getItem(`${STORAGE_PREFIX}msgs:${savedLang ?? "fa"}`);
      if (raw) {
        const parsed = JSON.parse(raw) as Msg[];
        if (Array.isArray(parsed) && parsed.length > 0) setMessages(parsed);
      }
    } catch {
      /* ignore */
    }
    // Show teaser after a delay if the chat hasn't been opened
    const t = window.setTimeout(() => setShowTeaser(true), 6000);
    return () => window.clearTimeout(t);
  }, []);

  // Reset conversation visually on language change, but keep per-language history
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(`${STORAGE_PREFIX}lang`, lang);
    try {
      const raw = window.localStorage.getItem(`${STORAGE_PREFIX}msgs:${lang}`);
      if (raw) {
        const parsed = JSON.parse(raw) as Msg[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
          return;
        }
      }
    } catch {
      /* ignore */
    }
    setMessages([welcome]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  // Persist messages per language
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(`${STORAGE_PREFIX}msgs:${lang}`, JSON.stringify(messages.slice(-40)));
    } catch {
      /* ignore */
    }
  }, [messages, lang]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open, loading]);

  useEffect(() => {
    if (open) setShowTeaser(false);
  }, [open]);

  async function dispatch(text: string) {
    if (!text.trim() || loading) return;
    const userMsg: Msg = { role: "user", content: text.trim() };
    const next: Msg[] = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await send({
        data: {
          messages: [
            { role: "user", content: `[LANG=${lang}] Please reply in the user's language (${pack.label}). Keep the same friendly, professional tone.` },
            ...messages,
            userMsg,
          ],
        },
      });
      setMessages((m) => [...m, { role: "assistant", content: res.reply }]);
    } catch {
      setMessages((m) => [...m, { role: "assistant", content: pack.errorMsg }]);
    } finally {
      setLoading(false);
    }
  }

  function handleSend(e?: React.FormEvent) {
    e?.preventDefault();
    dispatch(input);
  }

  function clearConversation() {
    setMessages([welcome]);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(`${STORAGE_PREFIX}msgs:${lang}`);
    }
  }

  async function copyMessage(idx: number, content: string) {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedIdx(idx);
      window.setTimeout(() => setCopiedIdx((c) => (c === idx ? null : c)), 1500);
    } catch {
      /* ignore */
    }
  }

  const lastIsAssistant = messages.length > 1 && messages[messages.length - 1].role === "assistant";

  return (
    <>
      {/* Teaser bubble */}
      <AnimatePresence>
        {!open && showTeaser && (
          <motion.button
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            onClick={() => setOpen(true)}
            dir={pack.dir}
            className="fixed bottom-24 left-6 z-[59] max-w-[16rem] rounded-2xl border border-amber-300/30 bg-[#0a0c14]/95 px-3.5 py-2.5 text-start text-xs font-semibold text-white shadow-2xl backdrop-blur-xl hover:border-amber-300/60"
          >
            <span className="block leading-snug">{TEASER[lang]}</span>
            <span className="absolute -bottom-1 start-6 h-3 w-3 rotate-45 border-b border-e border-amber-300/30 bg-[#0a0c14]" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating launcher */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, type: "spring" }}
        onClick={() => setOpen((s) => !s)}
        aria-label="Chat with ATiLLAi assistant"
        className="fixed bottom-6 left-6 z-[60] group"
      >
        <span className="absolute -inset-3 rounded-full bg-[conic-gradient(from_0deg,rgba(99,102,241,0.6),rgba(168,85,247,0.5),rgba(14,165,233,0.6),rgba(99,102,241,0.6))] opacity-60 blur-xl transition group-hover:opacity-90 animate-pulse" />
        <span className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-sky-500 text-white shadow-glow ring-2 ring-white/20">
          {open ? (
            <X className="h-6 w-6" />
          ) : (
            <img
              src={BotLogo}
              alt="Nilix"
              className="h-full w-full object-cover"
            />
          )}
        </span>
        {!open && (
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-primary" />
          </span>
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            dir={pack.dir}
            className="fixed bottom-24 left-6 z-[60] w-[calc(100vw-3rem)] max-w-sm"
          >
            {/* Animated gold gradient frame */}
            <div className="relative rounded-[28px] p-[1.5px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.9)]">
              <motion.div
                aria-hidden
                className="absolute inset-0 rounded-[28px] opacity-90"
                style={{
                  background:
                    "conic-gradient(from 0deg, oklch(0.92 0.14 90), oklch(0.55 0.18 270), oklch(0.65 0.18 200), oklch(0.92 0.14 90))",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              />
              <div className="relative flex h-[36rem] flex-col overflow-hidden rounded-[26px] border border-white/10 bg-[#0a0c14]/95 backdrop-blur-2xl">
                {/* Ambient aura */}
                <div className="pointer-events-none absolute -inset-20 bg-[conic-gradient(from_120deg,rgba(251,191,36,0.18),rgba(168,85,247,0.14),rgba(14,165,233,0.18),rgba(251,191,36,0.18))] blur-3xl opacity-50" />
                {/* Subtle grid texture */}
                <div className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:24px_24px]" />

                {/* Header */}
                <div className="relative flex items-center gap-3 border-b border-white/10 bg-gradient-to-br from-primary/25 via-amber-600/10 to-transparent px-4 py-3.5">
                  <div className="relative">
                    <span className="absolute -inset-1 rounded-full bg-gradient-to-br from-primary to-amber-600 opacity-60 blur-md" />
                    <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-sky-500 shadow-glow ring-2 ring-white/20">
                      <img
                        src={BotLogo}
                        alt="Nilix"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-[#0a0c14] shadow-[0_0_10px_rgba(52,211,153,0.7)]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    {(() => {
                      const parts = pack.title.split(/\s[—–-]\s/);
                      const first = parts[0];
                      const rest = parts.slice(1).join(" — ");
                      return (
                        <div className="font-ai-display leading-[1.15] tracking-[0.02em] drop-shadow-[0_1px_6px_rgba(251,191,36,0.25)]">
                          <div className="text-[13px] font-semibold text-amber-200/90">{first}</div>
                          {rest && (
                            <div className="text-[11px] font-light text-white/75">{rest}</div>
                          )}
                        </div>
                      );
                    })()}

                    <div className="mt-1 flex items-center gap-1.5 text-[10px] text-emerald-300/90">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {pack.status}
                    </div>
                  </div>

                  {/* Clear */}
                  <button
                    onClick={clearConversation}
                    aria-label="Clear conversation"
                    title="Clear"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:border-rose-300/50 hover:text-rose-300"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>

                  {/* Language picker */}
                  <div className="relative">
                    <button
                      onClick={() => setLangMenu((s) => !s)}
                      aria-label="Change language"
                      className="flex items-center gap-1 rounded-full border border-amber-300/30 bg-amber-400/10 px-2.5 py-1.5 text-[11px] font-bold text-amber-200 transition hover:bg-amber-400/20 hover:border-amber-300/60"
                    >
                      <Globe className="h-3.5 w-3.5" />
                      {pack.label}
                    </button>
                    <AnimatePresence>
                      {langMenu && (
                        <motion.div
                          initial={{ opacity: 0, y: -6, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -6, scale: 0.95 }}
                          className="absolute end-0 top-10 z-10 w-40 overflow-hidden rounded-2xl border border-amber-300/20 bg-[#0e1119]/95 shadow-2xl backdrop-blur-xl"
                        >
                          {(Object.keys(LANGS) as LangKey[]).map((k) => (
                            <button
                              key={k}
                              onClick={() => { setLang(k); setLangMenu(false); }}
                              className={`flex w-full items-center justify-between px-3.5 py-2.5 text-xs font-semibold transition hover:bg-amber-400/10 ${k === lang ? "text-amber-300" : "text-white/80"}`}
                            >
                              <span>{LANGS[k].label}</span>
                              {k === lang && <span className="text-amber-300">✓</span>}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>


              {/* Messages */}
              <div ref={scrollRef} className="relative flex-1 space-y-3 overflow-y-auto px-4 py-4">
                {messages.map((m, i) => {
                  const isUser = m.role === "user";
                  const isLastAssistant = !isUser && i === messages.length - 1 && !loading;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex flex-col gap-1 ${isUser ? (pack.dir === "rtl" ? "items-start" : "items-end") : (pack.dir === "rtl" ? "items-end" : "items-start")}`}
                    >
                      <div
                        className={`group relative max-w-[85%] whitespace-pre-wrap break-words rounded-2xl px-3.5 py-2.5 text-sm leading-7 shadow-lg ${
                          isUser
                            ? "bg-gradient-to-br from-primary to-amber-600 text-primary-foreground shadow-[0_8px_24px_-8px_rgba(251,191,36,0.5)] ring-1 ring-amber-300/30"
                            : "bg-gradient-to-br from-white/[0.08] to-white/[0.03] text-white ring-1 ring-white/10 backdrop-blur"
                        }`}
                      >
                        {isUser ? m.content : renderRich(m.content)}
                        {!isUser && (
                          <button
                            onClick={() => copyMessage(i, m.content)}
                            aria-label="Copy"
                            className="absolute -top-2 end-2 hidden h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-[#0a0c14] text-white/70 transition hover:text-amber-300 group-hover:flex"
                          >
                            {copiedIdx === i ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                          </button>
                        )}
                      </div>

                      {/* Contact CTA bar after the last assistant message */}
                      {isLastAssistant && messages.length > 1 && (
                        <div className="mt-1 flex flex-wrap gap-1.5">
                          <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-full border border-sky-300/30 bg-sky-400/10 px-2.5 py-1 text-[11px] font-bold text-sky-200 transition hover:bg-sky-400/20">
                            <MessageSquare className="h-3 w-3" /> Telegram
                          </a>
                          <a href={PHONE_URL} className="inline-flex items-center gap-1 rounded-full border border-emerald-300/30 bg-emerald-400/10 px-2.5 py-1 text-[11px] font-bold text-emerald-200 transition hover:bg-emerald-400/20">
                            <Phone className="h-3 w-3" /> 09105557133
                          </a>
                          <a href="/contact" className="inline-flex items-center gap-1 rounded-full border border-amber-300/30 bg-amber-400/10 px-2.5 py-1 text-[11px] font-bold text-amber-200 transition hover:bg-amber-400/20">
                            <Mail className="h-3 w-3" /> /contact
                          </a>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
                {loading && (
                  <div className={`flex ${pack.dir === "rtl" ? "justify-end" : "justify-start"}`}>
                    <div className="flex items-center gap-2 rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.03] px-3.5 py-2.5 text-sm text-amber-200/90 ring-1 ring-amber-300/20">
                      <Loader2 className="h-3.5 w-3.5 animate-spin text-amber-300" /> {pack.thinking}
                    </div>
                  </div>
                )}

                {/* Topic chips — grouped by category, show only on first turn */}
                {messages.length === 1 && !loading && (
                  <div className="space-y-3 pt-4">
                    <div className="flex items-center gap-2 font-ai-display text-[10px] font-bold uppercase tracking-[0.28em] text-gradient-gold">
                      <Sparkles className="h-3.5 w-3.5 text-amber-300" /> {pack.pickTopic}
                    </div>
                    {pack.categories.map((cat) => {
                      const items = pack.topics.filter((t) => t.cat === cat.key);
                      if (!items.length) return null;
                      return (
                        <div key={cat.key} className="space-y-1.5">
                          <div className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.2em] text-amber-200/80">
                            <span className="text-sm">{cat.icon}</span>
                            <span>{cat.label}</span>
                            <span className="h-px flex-1 bg-gradient-to-r from-amber-300/40 to-transparent" />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            {items.map((t, idx) => (
                              <motion.button
                                key={t.label}
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.03 * idx }}
                                onClick={() => dispatch(t.prompt)}
                                className="group relative overflow-hidden rounded-xl border border-amber-300/15 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-2.5 text-start text-xs text-white/90 transition hover:-translate-y-0.5 hover:border-amber-400/60 hover:bg-amber-400/[0.1] hover:shadow-[0_8px_20px_-8px_rgba(251,191,36,0.4)]"
                              >
                                <div className="flex items-center gap-2">
                                  <span className="text-base drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">{t.icon}</span>
                                  <span className="font-bold leading-tight tracking-wide">{t.label}</span>
                                </div>
                                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.12] to-transparent transition duration-700 group-hover:translate-x-full" />
                              </motion.button>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}


                {/* Quick replies after assistant turns */}
                {lastIsAssistant && !loading && messages.length > 1 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {QUICK_REPLIES[lang].map((q) => (
                      <button
                        key={q.label}
                        onClick={() => dispatch(q.prompt)}
                        className="rounded-full border border-amber-300/20 bg-white/[0.04] px-3 py-1.5 text-[11px] font-semibold text-amber-100/90 transition hover:border-amber-300/60 hover:bg-amber-400/10 hover:text-amber-100"
                      >
                        {q.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>


              {/* Composer */}
              <form onSubmit={handleSend} className="relative flex items-center gap-2 border-t border-white/10 bg-black/40 p-3">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={pack.placeholder}
                  className="flex-1 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white outline-none ring-amber-400/40 placeholder:text-white/40 transition focus:ring-2"
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  aria-label="Send"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-amber-600 text-primary-foreground shadow-glow transition hover:scale-105 disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>

              <div className="relative border-t border-white/5 bg-black/60 px-3 py-2 text-center font-ai-display text-[9px] font-bold uppercase tracking-[0.32em] text-amber-200/50">
                {pack.poweredBy}
              </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
