import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Factory, GraduationCap, HeartPulse, Landmark, ShoppingCart, Banknote, ArrowLeft, Send, X } from "lucide-react";
import { BackButton } from "@/components/back-button";
import { PROJECTS } from "@/lib/projects-data";
import { AutoCover } from "@/components/auto-cover";
import { getLuxuryGalleryImage } from "@/lib/gallery-images";
import { telegramBuyLink } from "@/lib/telegram";
import { SITE_URL, DEFAULT_OG_IMAGE, breadcrumbJsonLd } from "@/lib/seo";
import { DOMAINS, filterProjectSlugs, getDomain } from "@/lib/domains";


const PROJECTS_URL = `${SITE_URL}/projects`;

export const Route = createFileRoute("/projects/")({
  validateSearch: (s: Record<string, unknown>) => ({
    domain: typeof s.domain === "string" ? s.domain : undefined,
  }),
  head: () => ({
    meta: [
      { title: "نمونه پروژه‌های هوش مصنوعی ATiLLAi | صنعتی، پزشکی و دانشگاهی" },
      { name: "description", content: "نمونه پروژه‌های ATiLLAi در حوزه‌های صنعتی، دانشگاهی، پزشکی، مالی و دولتی همراه با امکان خرید کد کامل و مستندات." },
      { name: "keywords", content: "نمونه پروژه هوش مصنوعی, پروژه یادگیری ماشین آماده, پروژه deep learning, ATiLLAi" },
      { property: "og:title", content: "نمونه پروژه‌های ATiLLAi" },
      { property: "og:description", content: "نمونه پروژه‌های موفق ATiLLAi در حوزه‌های صنعتی، پزشکی و دانشگاهی." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: PROJECTS_URL },
      { property: "og:image", content: DEFAULT_OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "نمونه پروژه‌های ATiLLAi" },
      { name: "twitter:description", content: "نمونه پروژه‌های موفق ATiLLAi." },
      { name: "twitter:image", content: DEFAULT_OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: PROJECTS_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbJsonLd([
            { name: "خانه", path: "/" },
            { name: "پروژه‌ها", path: "/projects" },
          ]),
        ),
      },
    ],
  }),
  component: ProjectsPage,
});


const CATS = [
  { icon: Factory, name: "صنعتی", count: 120, color: "from-orange-500 to-red-500" },
  { icon: GraduationCap, name: "دانشگاهی", count: 230, color: "from-purple-500 to-indigo-500" },
  { icon: HeartPulse, name: "پزشکی", count: 64, color: "from-pink-500 to-rose-500" },
  { icon: Landmark, name: "دولتی", count: 41, color: "from-amber-500 to-yellow-500" },
  { icon: ShoppingCart, name: "تجاری", count: 85, color: "from-emerald-500 to-teal-500" },
  { icon: Banknote, name: "مالی و بانکی", count: 38, color: "from-cyan-500 to-blue-500" },
];

function ProjectsPage() {
  const { domain } = Route.useSearch();
  const activeDomain = getDomain(domain);
  const allow = filterProjectSlugs(domain);
  const list = allow ? PROJECTS.filter((p) => allow.has(p.slug)) : PROJECTS;
  // Domains available for projects
  const projectDomains = DOMAINS.filter((d) => d.projects.length > 0);
  return (
    <section className="relative pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-8"><BackButton /></div>
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">پرتفولیو</span>
          <h1 className="mt-4 text-4xl font-black md:text-6xl">
            نمونه <span className="text-gradient-gold">پروژه‌های</span> ما
          </h1>
          <p className="mt-5 text-muted-foreground">
            بیش از ۱٬۰۰۰ پروژه موفق در حوزه‌های مختلف. روی هر پروژه کلیک کنید تا جزئیات، تصاویر محیط و امکان خرید کد کامل را ببینید.
          </p>
        </motion.div>

        {/* Domain filter chips */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          <Link
            to="/projects"
            search={{ domain: undefined }}
            className={`rounded-full border px-4 py-1.5 text-xs font-bold transition ${
              !activeDomain
                ? "border-primary/60 bg-primary/15 text-primary"
                : "border-border bg-white/5 text-muted-foreground hover:bg-white/10"
            }`}
          >
            همه پروژه‌ها
          </Link>
          {projectDomains.map((d) => (
            <Link
              key={d.slug}
              to="/projects"
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
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="mt-6 mx-auto flex max-w-3xl items-center justify-center gap-3 rounded-2xl border border-primary/30 bg-primary/5 px-4 py-3 text-sm"
          >
            <span className="font-bold text-primary">حوزه فعال:</span>
            <span className="text-foreground/90">{activeDomain.label}</span>
            <span className="text-muted-foreground">({list.length} پروژه)</span>
            <Link to="/projects" search={{ domain: undefined }} className="ms-auto inline-flex items-center gap-1 rounded-lg border border-border bg-white/5 px-2 py-1 text-xs text-muted-foreground hover:text-foreground">
              <X className="h-3.5 w-3.5" /> پاک کردن
            </Link>
          </motion.div>
        )}

        {!activeDomain && (
        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {CATS.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card/40 p-5 text-center backdrop-blur"
            >
              <div className={`mx-auto inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${c.color} text-white shadow-lg`}>
                <c.icon className="h-6 w-6" />
              </div>
              <div className="mt-3 text-2xl font-black text-gradient-gold">+{c.count}</div>
              <div className="text-xs text-muted-foreground">{c.name}</div>
            </motion.div>
          ))}
        </div>
        )}

        {list.length === 0 ? (
          <div className="mt-16 rounded-3xl border border-border bg-card/40 p-12 text-center text-muted-foreground">
            هنوز پروژه‌ای برای این حوزه ثبت نشده. به‌زودی اضافه می‌شود.
          </div>
        ) : (
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => {

            const Icon = p.icon;
            const buy = telegramBuyLink(`خرید کد کامل پروژه ${p.title}`);
            const cover = getLuxuryGalleryImage(p.slug, p.cat, "project");
            return (
              <motion.article
                key={p.slug}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                whileHover={{ y: -6 }}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card/40 backdrop-blur transition hover:border-primary/40 hover:shadow-glow"
              >
                <Link to="/projects/$slug" params={{ slug: p.slug }} aria-label={`مشاهده جزئیات ${p.title}`} className="absolute inset-0 z-0" />
                <div className="relative">
                  <AutoCover Icon={Icon} color={p.color} title={p.title} tag={p.cat} height="h-48" image={cover} />
                </div>
                <div className="relative flex flex-1 flex-col p-7">
                <div className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${p.color} opacity-0 blur-3xl transition group-hover:opacity-50`} />
                <div className="pointer-events-none relative z-10 flex items-center justify-between">
                  <span className="inline-block rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[10px] font-bold text-primary">{p.cat}</span>
                  <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${p.color} text-white`}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <h3 className="pointer-events-none relative z-10 mt-4 text-lg font-bold leading-7">{p.title}</h3>
                <p className="pointer-events-none relative z-10 mt-2 line-clamp-2 text-sm leading-7 text-muted-foreground">{p.summary}</p>
                <div className="pointer-events-none relative z-10 mt-4 flex flex-wrap gap-2">
                  {p.tech.slice(0, 4).map((t) => (
                    <span key={t} className="rounded-md bg-white/5 px-2 py-1 text-xs text-muted-foreground">{t}</span>
                  ))}
                </div>
                <div className="relative z-20 mt-auto pt-5 flex flex-wrap gap-2">
                  <Link to="/projects/$slug" params={{ slug: p.slug }}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-primary/40 bg-primary/10 px-4 py-2.5 text-sm font-bold text-primary transition hover:bg-primary/20">
                    اطلاعات بیشتر <ArrowLeft className="h-4 w-4" />
                  </Link>
                  <a href={buy} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-primary to-amber-600 px-4 py-2.5 text-sm font-bold text-primary-foreground shadow-glow transition hover:scale-[1.03]">
                    <Send className="h-4 w-4" /> خرید کد
                  </a>
                </div>
                </div>
              </motion.article>
            );
          })}
        </div>
        )}
      </div>

    </section>
  );
}
