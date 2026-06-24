import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Send, Sparkles, Target, Layers, TrendingUp, BarChart3, BookOpen, ExternalLink } from "lucide-react";
import { BackButton } from "@/components/back-button";
import { ScreenCarousel } from "@/components/screen-carousel";
import { getProjectBySlug, PROJECTS, type ProjectDetail } from "@/lib/projects-data";
import { getCategoryContent } from "@/lib/category-content";
import { getScreenKinds } from "@/lib/screen-kinds";
import { AutoCover } from "@/components/auto-cover";
import { getLuxuryGalleryImage } from "@/lib/gallery-images";
import { telegramBuyLink, TELEGRAM_URL } from "@/lib/telegram";
import { SITE_URL, DEFAULT_OG_IMAGE, breadcrumbJsonLd } from "@/lib/seo";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }): { slug: string } => {
    const project = getProjectBySlug(params.slug);
    if (!project) throw notFound();
    return { slug: params.slug };
  },
  head: ({ loaderData }) => {
    const project = loaderData ? getProjectBySlug(loaderData.slug) : null;
    if (!project) return { meta: [{ title: "پروژه | ATiLLAi" }] };
    const url = `${SITE_URL}/projects/${project.slug}`;
    const image = DEFAULT_OG_IMAGE;
    return {
      meta: [
        { title: `${project.title.slice(0, 50)} | ATiLLAi` },
        { name: "description", content: project.summary },
        { property: "og:title", content: `${project.title} | ATiLLAi` },
        { property: "og:description", content: project.summary },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "og:image", content: image },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: project.title },
        { name: "twitter:description", content: project.summary },
        { name: "twitter:image", content: image },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: project.title,
            description: project.summary,
            url,
            image,
            author: { "@type": "Organization", name: "ATiLLAi", url: SITE_URL },
            inLanguage: "fa-IR",
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbJsonLd([
              { name: "خانه", path: "/" },
              { name: "پروژه‌ها", path: "/projects" },
              { name: project.title, path: `/projects/${project.slug}` },
            ]),
          ),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <section className="pt-40 pb-24 text-center">
      <h1 className="text-3xl font-black">پروژه یافت نشد</h1>
      <Link to="/projects" className="mt-6 inline-block text-primary">بازگشت به نمونه کارها</Link>
    </section>
  ),
  errorComponent: () => (
    <section className="pt-40 pb-24 text-center">
      <h1 className="text-2xl font-black">خطا</h1>
      <p className="mt-4 text-muted-foreground">یک خطای غیرمنتظره رخ داد. لطفاً دوباره تلاش کنید.</p>
    </section>
  ),
  component: ProjectDetailPage,
});

function ProjectDetailPage() {
  const { slug } = Route.useLoaderData();
  const p = getProjectBySlug(slug)!;
  const Icon = p.icon;
  const others = PROJECTS.filter((x) => x.slug !== p.slug && x.cat === p.cat).slice(0, 3);
  const cc = getCategoryContent(p.cat);
  const kinds = getScreenKinds(p.slug, p.screens.length);
  const luxuryImage = getLuxuryGalleryImage(p.slug, p.cat, "project");
  const baseScreens = p.screens.map((s: ProjectDetail["screens"][number], i: number) => ({ ...s, tag: `Screen ${i + 1}`, kind: kinds[i] }));
  const carouselScreens = baseScreens.map((s) => ({ ...s, coverImage: luxuryImage }));
  const buyLink = telegramBuyLink(`کد کامل پروژه ${p.title}`);
  const consultLink = telegramBuyLink(`مشاوره درباره پروژه ${p.title}`);

  return (
    <section className="relative pt-32 pb-24">
      <div className={`pointer-events-none absolute -top-32 right-0 h-[28rem] w-[28rem] rounded-full bg-gradient-to-br ${p.color} opacity-20 blur-3xl`} />
      <div className="pointer-events-none absolute top-40 -left-32 h-[24rem] w-[24rem] rounded-full bg-primary/15 blur-3xl" />

      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8"><BackButton /></div>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-border bg-card/40 p-8 backdrop-blur md:p-12"
        >
          <div className={`absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br ${p.color} opacity-30 blur-3xl`} />
          <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <span className="inline-block rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[10px] font-bold text-primary">{p.cat}</span>
              <h1 className="mt-3 text-3xl font-black leading-tight md:text-5xl">{p.title}</h1>
              <p className="mt-4 text-lg leading-9 text-muted-foreground">{p.summary}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={buyLink} target="_blank" rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-br from-primary to-amber-600 px-7 py-4 text-base font-bold text-primary-foreground shadow-glow transition hover:scale-105">
                  <Send className="h-5 w-5" /> خرید کد کامل پروژه
                </a>
                <a href={consultLink} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl border border-border bg-white/5 px-6 py-4 text-base font-semibold backdrop-blur transition hover:bg-white/10">
                  مشاوره و قرارداد
                </a>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                دکمه‌ها به تلگرام شما متصل می‌شوند — بدون درگاه پرداخت، توافق مستقیم و امن.
              </p>
            </div>
            <div className={`inline-flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br ${p.color} text-white shadow-glow md:h-32 md:w-32`}>
              <Icon className="h-12 w-12 md:h-16 md:w-16" />
            </div>
          </div>
        </motion.div>

        {/* Signature cover */}
        <div className="mt-12 overflow-hidden rounded-3xl border border-border shadow-glow">
          <AutoCover Icon={Icon} color={p.color} title={p.title} tag="Signature · 4K" height="h-72 md:h-96" variant="hero" image={luxuryImage} />
        </div>

        {/* Carousel of Screens */}
        <Section icon={Sparkles} eyebrow="گالری محیط پروژه" title="پیش‌نمایش زنده محصول">
          <ScreenCarousel screens={carouselScreens} icon={Icon} color={p.color} />
        </Section>

        {/* Sample Output */}
        <Section icon={BarChart3} eyebrow="نمونه خروجی" title="معیارهای کلیدی پروژه">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {cc.outputs.map((o, i) => (
              <motion.div key={o.metric}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="relative overflow-hidden rounded-2xl border border-border bg-card/40 p-6 backdrop-blur">
                <div className={`absolute -right-6 -top-6 h-20 w-20 rounded-full bg-gradient-to-br ${p.color} opacity-20 blur-2xl`} />
                <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary">{o.metric}</div>
                <div className="mt-2 text-3xl font-black text-gradient-gold">{o.value}</div>
                <div className="mt-2 text-xs leading-6 text-muted-foreground">{o.note}</div>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Problem & Solution */}
        <Section icon={Target} eyebrow="مسئله و راه‌حل" title="چه چالشی را حل کردیم">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card/40 p-7 backdrop-blur">
              <div className="text-xs font-bold uppercase tracking-[0.25em] text-rose-400">مسئله</div>
              <p className="mt-3 leading-8 text-foreground">{p.problem}</p>
            </div>
            <div className="rounded-2xl border border-primary/30 bg-primary/5 p-7 backdrop-blur">
              <div className="text-xs font-bold uppercase tracking-[0.25em] text-primary">راه‌حل</div>
              <p className="mt-3 leading-8 text-foreground">{p.solution}</p>
            </div>
          </div>
        </Section>

        {/* Results */}
        <Section icon={TrendingUp} eyebrow="دستاوردها" title="نتایج واقعی پروژه">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {p.results.map((r: string, i: number) => (
              <motion.div key={r}
                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${p.color} p-6 text-white shadow-xl`}>
                <CheckCircle2 className="h-5 w-5 opacity-80" />
                <div className="mt-2 text-sm font-bold leading-7">{r}</div>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Features */}
        <Section icon={Sparkles} eyebrow="قابلیت‌ها" title="آنچه پروژه ارائه می‌دهد">
          <div className="grid gap-3 md:grid-cols-2">
            {p.features.map((f: string) => (
              <div key={f} className="flex items-start gap-3 rounded-2xl border border-border bg-card/40 p-4 backdrop-blur">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm leading-7">{f}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* Tech */}
        <Section icon={Layers} eyebrow="تکنولوژی‌ها" title="Stack استفاده‌شده">
          <div className="flex flex-wrap gap-3">
            {p.tech.map((t: string) => (
              <span key={t} className="glass rounded-full px-5 py-2 text-sm font-semibold hover:bg-primary/10 hover:text-primary">{t}</span>
            ))}
          </div>
        </Section>

        {/* Latest Articles */}
        <Section icon={BookOpen} eyebrow="Latest Articles" title={`آخرین مقالات در حوزه ${p.cat}`}>
          <div className="grid gap-4 md:grid-cols-2">
            {cc.articles.slice(0, 5).map((art, i) => (
              <motion.a key={art.title} href={art.href} target="_blank" rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card/40 p-5 backdrop-blur transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow">
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-block rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[10px] font-bold text-primary">{art.tag}</span>
                  <span className="text-[10px] font-bold text-muted-foreground">{art.year}</span>
                </div>
                <h4 className="mt-3 text-base font-bold leading-7 transition group-hover:text-primary">{art.title}</h4>
                <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{art.source}</span>
                  <ExternalLink className="h-3.5 w-3.5 opacity-60 transition group-hover:opacity-100" />
                </div>
              </motion.a>
            ))}
          </div>
        </Section>



        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mt-16 overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/20 to-amber-600/10 p-10 text-center backdrop-blur md:p-14">
          <h3 className="text-3xl font-black md:text-4xl">به این پروژه نیاز دارید؟</h3>
          <p className="mt-3 text-muted-foreground">کد کامل، مستندات و پشتیبانی پیاده‌سازی، مستقیم در تلگرام.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a href={buyLink} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-br from-primary to-amber-600 px-8 py-4 text-base font-bold text-primary-foreground shadow-glow transition hover:scale-105">
              <Send className="h-5 w-5" /> خرید کد + قرارداد
            </a>
            <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl border border-border bg-white/5 px-6 py-4 text-base font-semibold backdrop-blur transition hover:bg-white/10">
              ارتباط مستقیم با مدیر فنی
            </a>
          </div>
        </motion.div>

        {/* Related */}
        {others.length > 0 && (
          <Section icon={Sparkles} eyebrow="پروژه‌های مشابه" title={`بیشتر در حوزه ${p.cat}`}>
            <div className="grid gap-4 md:grid-cols-3">
              {others.map((o) => {
                const OIcon = o.icon;
                return (
                  <Link key={o.slug} to="/projects/$slug" params={{ slug: o.slug }}
                    className="group rounded-2xl border border-border bg-card/40 p-5 backdrop-blur transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow">
                    <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${o.color} text-white`}>
                      <OIcon className="h-5 w-5" />
                    </div>
                    <h4 className="mt-3 text-sm font-bold leading-7">{o.title}</h4>
                    <div className="mt-3 inline-flex items-center gap-1 text-xs text-primary">
                      مشاهده <ArrowLeft className="h-3 w-3" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </Section>
        )}
      </div>
    </section>
  );
}

function Section({ icon: Icon, eyebrow, title, children }: {
  icon: typeof CheckCircle2; eyebrow: string; title: string; children: React.ReactNode;
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }} className="mt-14">
      <div className="mb-6 flex items-center gap-3">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary"><Icon className="h-5 w-5" /></div>
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">{eyebrow}</div>
          <h2 className="text-2xl font-black md:text-3xl">{title}</h2>
        </div>
      </div>
      {children}
    </motion.div>
  );
}
