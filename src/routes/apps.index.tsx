import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Smartphone, Bot, Sparkles, ArrowLeft,
  CheckCircle2, Layers, Rocket, Package, Send, X,
  Brain, Cpu, Cloud, Database, Code2, Boxes, Zap, Shield,
} from "lucide-react";
import { BackButton } from "@/components/back-button";
import { APPS } from "@/lib/apps-data";
import { AutoCover } from "@/components/auto-cover";
import { getLuxuryGalleryImage } from "@/lib/gallery-images";
import { telegramBuyLink } from "@/lib/telegram";
import { SITE_URL, DEFAULT_OG_IMAGE, breadcrumbJsonLd } from "@/lib/seo";
import { DOMAINS, filterAppSlugs, getDomain } from "@/lib/domains";


const APPS_URL = `${SITE_URL}/apps`;

export const Route = createFileRoute("/apps/")({
  validateSearch: (s: Record<string, unknown>) => ({
    domain: typeof s.domain === "string" ? s.domain : undefined,
  }),

  head: () => ({
    meta: [
      { title: "ساخت اپلیکیشن هوش مصنوعی (AI App) | ATiLLAi" },
      { name: "description", content: "ساخت اپلیکیشن موبایل هوشمند با LLM، Computer Vision و توصیه‌گر — پزشکی، حقوقی، آموزشی، تجاری و گردشگری با امکان خرید آنی نسخه آماده." },
      { name: "keywords", content: "ساخت اپلیکیشن AI, اپ هوشمند, LLM فارسی, اپ پزشکی, ATiLLAi" },
      { property: "og:title", content: "ساخت اپلیکیشن AI | ATiLLAi" },
      { property: "og:description", content: "اپلیکیشن‌های موبایل هوشمند با AI، ML و LLM." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: APPS_URL },
      { property: "og:image", content: DEFAULT_OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "ساخت اپلیکیشن AI | ATiLLAi" },
      { name: "twitter:description", content: "اپلیکیشن‌های موبایل هوشمند با AI، ML و LLM." },
      { name: "twitter:image", content: DEFAULT_OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: APPS_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbJsonLd([
            { name: "خانه", path: "/" },
            { name: "اپلیکیشن‌ها", path: "/apps" },
          ]),
        ),
      },
    ],
  }),
  component: AppsPage,
});

const FEATURES = [
  { icon: Sparkles, title: "طراحی UI/UX لوکس", desc: "رابط کاربری مدرن، انیمیشن حرفه‌ای و تجربه کاربری بی‌نقص." },
  { icon: Bot, title: "هسته هوش مصنوعی", desc: "ادغام مدل‌های Vision، NLP و LLM به صورت On-Device یا Cloud." },
  { icon: Smartphone, title: "Native و Cross-Platform", desc: "اپ Native اندروید/iOS و کراس‌پلتفرم Flutter و React Native." },
  { icon: Layers, title: "بک‌اند مقیاس‌پذیر", desc: "API حرفه‌ای، Database ابری و Realtime Sync." },
  { icon: Rocket, title: "انتشار در استورها", desc: "ثبت و انتشار در Google Play و App Store." },
  { icon: Package, title: "پشتیبانی پس از تحویل", desc: "آپدیت، رفع باگ و توسعه فیچر برای ۶ ماه رایگان." },
];

const TECH_GROUPS: { icon: typeof Brain; label: string; color: string; items: string[] }[] = [
  {
    icon: Brain,
    label: "AI / ML Frameworks",
    color: "from-fuchsia-500 to-purple-600",
    items: ["PyTorch", "TensorFlow", "JAX", "Keras", "Hugging Face", "LangChain", "LlamaIndex", "OpenAI SDK"],
  },
  {
    icon: Cpu,
    label: "On-Device & Edge AI",
    color: "from-amber-500 to-orange-600",
    items: ["TensorFlow Lite", "Core ML", "ONNX Runtime", "MediaPipe", "MLC LLM", "WebGPU", "NPU/Neural Engine", "CUDA / TensorRT"],
  },
  {
    icon: Smartphone,
    label: "Mobile & Cross-Platform",
    color: "from-sky-500 to-cyan-600",
    items: ["Swift / SwiftUI", "Kotlin / Jetpack Compose", "Flutter", "React Native", "Expo", "Capacitor"],
  },
  {
    icon: Code2,
    label: "Frontend & Web",
    color: "from-emerald-500 to-teal-600",
    items: ["Next.js", "React", "TypeScript", "TanStack Start", "Tailwind CSS", "Framer Motion", "Three.js"],
  },
  {
    icon: Cloud,
    label: "Backend & APIs",
    color: "from-indigo-500 to-blue-600",
    items: ["Node.js", "FastAPI", "Go", "Rust", "GraphQL", "gRPC", "WebSockets", "tRPC"],
  },
  {
    icon: Database,
    label: "Data & Vector DBs",
    color: "from-rose-500 to-pink-600",
    items: ["PostgreSQL", "Supabase", "Firebase", "Redis", "MongoDB", "pgvector", "Pinecone", "Qdrant", "ClickHouse"],
  },
  {
    icon: Boxes,
    label: "Cloud & DevOps",
    color: "from-violet-500 to-indigo-600",
    items: ["AWS", "GCP", "Azure", "Cloudflare", "Docker", "Kubernetes", "Terraform", "GitHub Actions"],
  },
  {
    icon: Shield,
    label: "Security & Observability",
    color: "from-slate-400 to-slate-600",
    items: ["OAuth 2.0", "JWT", "RLS", "Sentry", "OpenTelemetry", "Grafana", "Datadog"],
  },
];

function AppsPage() {
  const { domain } = Route.useSearch();
  const activeDomain = getDomain(domain);
  const allow = filterAppSlugs(domain);
  const list = allow ? APPS.filter((a) => allow.has(a.slug)) : APPS;
  const appDomains = DOMAINS.filter((d) => d.apps.length > 0);
  return (

    <section className="relative pt-32 pb-24">
      <div className="pointer-events-none absolute -top-32 -right-24 h-[28rem] w-[28rem] rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute top-40 -left-24 h-[24rem] w-[24rem] rounded-full bg-secondary/30 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-8"><BackButton /></div>

        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="relative mx-auto max-w-4xl text-center"
        >
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-sky-500 to-cyan-500 text-white shadow-glow">
            <Smartphone className="h-10 w-10" />
          </div>
          <span className="mt-6 block text-xs font-bold uppercase tracking-[0.3em] text-primary">App Development</span>
          <h1 className="mt-3 text-4xl font-black md:text-6xl">
            ساخت <span className="text-gradient-gold">اپلیکیشن‌های</span> هوشمند
          </h1>
          <p className="mt-6 text-lg leading-9 text-muted-foreground">
            از ایده تا انتشار در استورها — اپلیکیشن‌های پزشکی، حقوقی، آموزشی و تجاری با هسته هوش مصنوعی،
            طراحی Premium و کیفیت Enterprise. روی هر اپ کلیک کنید تا
            <span className="text-gradient-gold font-bold"> جزئیات، تصاویر و امکان خرید</span> را ببینید.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-br from-primary to-amber-600 px-8 py-4 text-base font-bold text-primary-foreground shadow-glow transition hover:scale-105">
              ثبت سفارش اپلیکیشن <ArrowLeft className="h-5 w-5 transition group-hover:-translate-x-1" />
            </Link>
          </div>
        </motion.div>

        <div className="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.div key={f.title}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.07 }} whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-3xl border border-border bg-card/40 p-7 backdrop-blur transition hover:border-primary/40 hover:shadow-glow">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-amber-600 text-primary-foreground shadow-glow">
                <f.icon className="h-7 w-7" />
              </div>
              <h3 className="mt-5 text-lg font-bold">{f.title}</h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="relative mt-20 overflow-hidden rounded-[2rem] border border-primary/20 bg-gradient-to-br from-card/60 via-card/30 to-card/60 p-8 backdrop-blur-xl md:p-14"
        >
          {/* Decorative aurora */}
          <div className="pointer-events-none absolute -top-32 -right-32 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl" />
          <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:radial-gradient(rgba(255,255,255,0.6)_1px,transparent_1px)] [background-size:22px_22px]" />

          <div className="relative text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5">
              <Zap className="h-3.5 w-3.5 text-primary" />
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary">Enterprise Tech Stack</span>
            </div>
            <h2 className="mt-5 text-3xl font-black md:text-5xl">
              زیرساخت <span className="text-gradient-gold">حرفه‌ای</span> ما
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-8 text-muted-foreground md:text-base">
              منتخبی از بهترین فریم‌ورک‌ها، ابزارها و پلتفرم‌های روز دنیا — از مدل‌های هوش مصنوعی و Edge AI تا
              زیرساخت ابری، Vector Database و امنیت سازمانی. هر پروژه با مدرن‌ترین Stack صنعتی ساخته می‌شود.
            </p>
          </div>

          <div className="relative mt-12 grid gap-5 md:grid-cols-2">
            {TECH_GROUPS.map((g, i) => (
              <motion.div
                key={g.label}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ y: -4 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-background/40 p-6 backdrop-blur transition hover:border-primary/40 hover:shadow-glow"
              >
                <div className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${g.color} opacity-0 blur-3xl transition group-hover:opacity-40`} />
                <div className="relative flex items-center gap-3">
                  <div className={`inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${g.color} text-white shadow-lg ring-1 ring-white/15`}>
                    <g.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-sm font-black uppercase tracking-wider text-foreground/90">{g.label}</h3>
                </div>
                <div className="relative mt-5 flex flex-wrap gap-2">
                  {g.items.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-foreground/80 transition hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats strip */}
          <div className="relative mt-10 grid grid-cols-2 gap-4 rounded-2xl border border-border bg-background/30 p-6 backdrop-blur md:grid-cols-4">
            {[
              { k: "+50", v: "تکنولوژی فعال" },
              { k: "+500", v: "پروژه تحویل‌شده" },
              { k: "99.9٪", v: "SLA پایداری" },
              { k: "24/7", v: "پشتیبانی فنی" },
            ].map((s) => (
              <div key={s.v} className="text-center">
                <div className="text-2xl font-black text-gradient-gold md:text-3xl">{s.k}</div>
                <div className="mt-1 text-xs text-muted-foreground">{s.v}</div>
              </div>
            ))}
          </div>
        </motion.div>


        <div className="mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center"
          >
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">پرتفولیو اپلیکیشن</span>
            <h2 className="mt-3 text-3xl font-black md:text-5xl">
              نمونه <span className="text-gradient-gold">اپ‌های</span> ما
            </h2>
            <p className="mt-4 text-muted-foreground">
              منتخبی از اپلیکیشن‌های هوشمند پزشکی، حقوقی، آموزشی و تجاری.
            </p>
          </motion.div>

          {/* Domain filter chips */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            <Link
              to="/apps"
              search={{ domain: undefined }}
              className={`rounded-full border px-4 py-1.5 text-xs font-bold transition ${
                !activeDomain
                  ? "border-primary/60 bg-primary/15 text-primary"
                  : "border-border bg-white/5 text-muted-foreground hover:bg-white/10"
              }`}
            >
              همه اپ‌ها
            </Link>
            {appDomains.map((d) => (
              <Link
                key={d.slug}
                to="/apps"
                search={{ domain: d.slug }}
                className={`rounded-full border px-4 py-1.5 text-xs font-bold transition ${
                  activeDomain?.slug === d.slug
                    ? "border-primary/60 bg-primary/15 text-primary"
                    : "border-border bg-white/5 text-muted-foreground hover:bg-white/10"
                }`}
              >
                {d.label}
              </Link>
            ))}
          </div>

          {activeDomain && (
            <div className="mt-6 mx-auto flex max-w-3xl items-center justify-center gap-3 rounded-2xl border border-primary/30 bg-primary/5 px-4 py-3 text-sm">
              <span className="font-bold text-primary">حوزه فعال:</span>
              <span className="text-foreground/90">{activeDomain.label}</span>
              <span className="text-muted-foreground">({list.length} اپلیکیشن)</span>
              <Link to="/apps" search={{ domain: undefined }} className="ms-auto inline-flex items-center gap-1 rounded-lg border border-border bg-white/5 px-2 py-1 text-xs text-muted-foreground hover:text-foreground">
                <X className="h-3.5 w-3.5" /> پاک کردن
              </Link>
            </div>
          )}

          {list.length === 0 ? (
            <div className="mt-12 rounded-3xl border border-border bg-card/40 p-12 text-center text-muted-foreground">
              هنوز اپلیکیشنی برای این حوزه ثبت نشده. به‌زودی اضافه می‌شود.
            </div>
          ) : (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {list.map((a, i) => {

              const Icon = a.icon;
              const buy = telegramBuyLink(`خرید اپلیکیشن ${a.title}`);
              const cover = getLuxuryGalleryImage(a.slug, a.cat, "app");
              return (
                <motion.article key={a.slug}
                  initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }} whileHover={{ y: -8 }}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card/40 backdrop-blur transition hover:border-primary/40 hover:shadow-glow">
                  <Link to="/apps/$slug" params={{ slug: a.slug }} aria-label={`مشاهده جزئیات ${a.title}`} className="absolute inset-0 z-0" />
                  <div className="relative">
                    <AutoCover Icon={Icon} color={a.color} title={a.title} tag={a.cat} height="h-48" image={cover} />
                  </div>
                  <div className="relative flex flex-1 flex-col p-7">
                  <div className={`pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br ${a.color} opacity-0 blur-3xl transition group-hover:opacity-40`} />
                  <div className={`pointer-events-none relative z-10 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${a.color} text-white shadow-lg`}>
                    <Icon className="h-7 w-7" />
                  </div>
                  <span className="pointer-events-none relative z-10 mt-5 inline-block w-fit rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[10px] font-bold text-primary">{a.cat}</span>
                  <h3 className="pointer-events-none relative z-10 mt-3 text-lg font-bold">{a.title}</h3>
                  <p className="pointer-events-none relative z-10 mt-2 text-sm leading-7 text-muted-foreground line-clamp-3">{a.short}</p>
                  <div className="pointer-events-none relative z-10 mt-4 flex flex-wrap gap-2">
                    {a.tech.slice(0, 3).map((t) => (
                      <span key={t} className="rounded-md bg-white/5 px-2 py-1 text-xs text-muted-foreground">{t}</span>
                    ))}
                  </div>
                  <div className="relative z-20 mt-auto pt-5 flex flex-wrap gap-2">
                    <Link to="/apps/$slug" params={{ slug: a.slug }}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-primary/40 bg-primary/10 px-4 py-2.5 text-sm font-bold text-primary transition hover:bg-primary/20">
                      اطلاعات بیشتر <ArrowLeft className="h-4 w-4" />
                    </Link>
                    <a href={buy} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-primary to-amber-600 px-4 py-2.5 text-sm font-bold text-primary-foreground shadow-glow transition hover:scale-[1.03]">
                      <Send className="h-4 w-4" /> خرید
                    </a>
                  </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
          )}
        </div>


        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mt-20 overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/20 to-amber-600/10 p-10 text-center backdrop-blur md:p-14"
        >
          <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
          <h3 className="mt-4 text-3xl font-black md:text-4xl">ایده اپ خود را با ما در میان بگذارید</h3>
          <p className="mt-3 text-muted-foreground">جلسه مشاوره رایگان ۳۰ دقیقه‌ای با کارشناسان ATiLLAi.</p>
          <Link to="/contact" className="mt-7 inline-flex items-center gap-3 rounded-2xl bg-gradient-to-br from-primary to-amber-600 px-8 py-4 text-base font-bold text-primary-foreground shadow-glow transition hover:scale-105">
            شروع پروژه <ArrowLeft className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
