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
