import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Send, Sparkles, Smartphone, Layers, Star, BarChart3, BookOpen, ExternalLink } from "lucide-react";
import { BackButton } from "@/components/back-button";
import { MockScreen } from "@/components/mock-screen";
import { ScreenCarousel } from "@/components/screen-carousel";
import { getAppBySlug, APPS, type AppDetail } from "@/lib/apps-data";
import { getCategoryContent } from "@/lib/category-content";
import { getScreenKinds } from "@/lib/screen-kinds";
import { AutoCover } from "@/components/auto-cover";
import { getLuxuryGalleryImage, getGalleryOverride, getGalleryMultiOverride, getGalleryAltOverride } from "@/lib/gallery-images";
import { telegramBuyLink, TELEGRAM_URL } from "@/lib/telegram";
import { SITE_URL, DEFAULT_OG_IMAGE, breadcrumbJsonLd } from "@/lib/seo";

export const Route = createFileRoute("/apps/$slug")({
  loader: ({ params }): { slug: string } => {
    const app = getAppBySlug(params.slug);
    if (!app) throw notFound();
    return { slug: params.slug };
  },
  head: ({ loaderData }) => {
    const app = loaderData ? getAppBySlug(loaderData.slug) : null;
    if (!app) return { meta: [{ title: "اپلیکیشن | ATiLLAi" }] };
    const url = `${SITE_URL}/apps/${app.slug}`;
    const image = DEFAULT_OG_IMAGE;
    return {
      meta: [
        { title: `${app.title.slice(0, 50)} | ATiLLAi` },
        { name: "description", content: app.short },
        { property: "og:title", content: `${app.title} | ATiLLAi` },
        { property: "og:description", content: app.short },
        { property: "og:type", content: "product" },
        { property: "og:url", content: url },
        { property: "og:image", content: image },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: app.title },
        { name: "twitter:description", content: app.short },
        { name: "twitter:image", content: image },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: app.title,
            description: app.short,
            url,
            image,
            applicationCategory: "MobileApplication",
            operatingSystem: "Android, iOS",
            offers: { "@type": "Offer", priceCurrency: "IRR", price: "0", availability: "https://schema.org/InStock", url },
            publisher: { "@type": "Organization", name: "ATiLLAi", url: SITE_URL },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbJsonLd([
              { name: "خانه", path: "/" },
              { name: "اپلیکیشن‌ها", path: "/apps" },
              { name: app.title, path: `/apps/${app.slug}` },
            ]),
          ),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <section className="pt-40 pb-24 text-center">
      <h1 className="text-3xl font-black">اپ یافت نشد</h1>
      <Link to="/apps" className="mt-6 inline-block text-primary">بازگشت به اپ‌ها</Link>
    </section>
  ),
  errorComponent: () => (
    <section className="pt-40 pb-24 text-center">
      <h1 className="text-2xl font-black">خطا</h1>
      <p className="mt-4 text-muted-foreground">یک خطای غیرمنتظره رخ داد. لطفاً دوباره تلاش کنید.</p>
    </section>
  ),
  component: AppDetailPage,
});

function AppDetailPage() {
  const { slug } = Route.useLoaderData();
  const a = getAppBySlug(slug)!;
  const Icon = a.icon;
  const others = APPS.filter((x) => x.slug !== a.slug && x.cat === a.cat).slice(0, 3);
  const cc = getCategoryContent(a.cat);
  const galleryOverride = getGalleryOverride(a.slug);
  const galleryMulti = getGalleryMultiOverride(a.slug);
  const galleryAlts = getGalleryAltOverride(a.slug);
  const luxuryImage = galleryOverride ?? getLuxuryGalleryImage(a.slug, a.cat, "app");
  const screensSource = galleryMulti
    ? a.screens.concat(a.screens).concat(a.screens).slice(0, galleryMulti.length)
    : galleryOverride ? a.screens.slice(0, 1) : a.screens;
  const kinds = getScreenKinds(a.slug, screensSource.length);
  const baseScreens = screensSource.map((s: AppDetail["screens"][number], i: number) => ({ ...s, tag: `Screen ${i + 1}`, kind: kinds[i] }));
  const carouselScreens = baseScreens.map((s, idx) => ({
    ...s,
    coverImage: galleryMulti ? galleryMulti[idx] : luxuryImage,
    coverAlt: galleryAlts?.[idx] ?? `${a.title} — ${s.title}`,
  }));
  const buyLink = telegramBuyLink(`خرید اپلیکیشن ${a.title}`);
  const customLink = telegramBuyLink(`سفارش اپ سفارشی شبیه ${a.title}`);

  return (
    <section className="relative pt-32 pb-24">
      <div className={`pointer-events-none absolute -top-32 right-0 h-[28rem] w-[28rem] rounded-full bg-gradient-to-br ${a.color} opacity-20 blur-3xl`} />
      <div className="pointer-events-none absolute top-40 -left-32 h-[24rem] w-[24rem] rounded-full bg-primary/15 blur-3xl" />

      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8"><BackButton /></div>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="relative grid gap-10 overflow-hidden rounded-3xl border border-border bg-card/40 p-8 backdrop-blur md:grid-cols-[1.2fr_1fr] md:p-12"
        >
          <div className={`absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br ${a.color} opacity-30 blur-3xl`} />
          <div className="relative">
            <span className="inline-block rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[10px] font-bold text-primary">{a.cat}</span>
            <h1 className="mt-3 text-3xl font-black leading-tight md:text-5xl">{a.title}</h1>
            <p className="mt-4 text-lg leading-9 text-muted-foreground">{a.longDesc}</p>
            <div className="mt-5 flex items-center gap-2 text-amber-400">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              <span className="text-xs text-muted-foreground mr-2">رتبه‌بندی توسعه‌دهنده ۴.۹/۵</span>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={buyLink} target="_blank" rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-br from-primary to-amber-600 px-7 py-4 text-base font-bold text-primary-foreground shadow-glow transition hover:scale-105">
                <Send className="h-5 w-5" /> خرید اپلیکیشن
              </a>
              <a href={customLink} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl border border-border bg-white/5 px-6 py-4 text-base font-semibold backdrop-blur transition hover:bg-white/10">
                سفارش نسخه اختصاصی
              </a>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              خرید و قرارداد مستقیم در تلگرام — بدون درگاه پرداخت.
            </p>
          </div>
          <div className="relative flex items-center justify-center">
            <MockScreen title={a.title} subtitle={a.short} icon={Icon} color={a.color} variant="phone" />
          </div>
        </motion.div>

        {/* Signature cover */}
        <div className="mt-12 overflow-hidden rounded-3xl border border-border shadow-glow">
          <AutoCover Icon={Icon} color={a.color} title={a.title} tag="Signature · 4K" height="h-72 md:h-96" variant="hero" image={luxuryImage} />
        </div>

        {/* Carousel */}
        <Section icon={Smartphone} eyebrow="محیط اپلیکیشن" title="گالری زنده اپ">
          <ScreenCarousel screens={carouselScreens} icon={Icon} color={a.color} />
        </Section>

        {/* Sample Output */}
        <Section icon={BarChart3} eyebrow="نمونه خروجی" title="عملکرد واقعی اپ">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {cc.outputs.map((o, i) => (
              <motion.div key={o.metric}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="relative overflow-hidden rounded-2xl border border-border bg-card/40 p-6 backdrop-blur">
                <div className={`absolute -right-6 -top-6 h-20 w-20 rounded-full bg-gradient-to-br ${a.color} opacity-20 blur-2xl`} />
                <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary">{o.metric}</div>
                <div className="mt-2 text-3xl font-black text-gradient-gold">{o.value}</div>
                <div className="mt-2 text-xs leading-6 text-muted-foreground">{o.note}</div>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Features */}
        <Section icon={Sparkles} eyebrow="ویژگی‌ها" title="قابلیت‌های کلیدی اپ">
          <div className="grid gap-3 md:grid-cols-2">
            {a.features.map((f: string) => (
              <div key={f} className="flex items-start gap-3 rounded-2xl border border-border bg-card/40 p-4 backdrop-blur">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm leading-7">{f}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* Tech */}
        <Section icon={Layers} eyebrow="تکنولوژی" title="Stack اپلیکیشن">
          <div className="flex flex-wrap gap-3">
            {a.tech.map((t: string) => (
              <span key={t} className="glass rounded-full px-5 py-2 text-sm font-semibold hover:bg-primary/10 hover:text-primary">{t}</span>
            ))}
          </div>
        </Section>

        {/* Latest Articles */}
        <Section icon={BookOpen} eyebrow="Latest Articles" title={`آخرین مقالات در حوزه ${a.cat}`}>
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
          <h3 className="text-3xl font-black md:text-4xl">این اپ را می‌خواهید؟</h3>
          <p className="mt-3 text-muted-foreground">نسخه آماده یا سفارشی شده برند خودتان، مستقیم در تلگرام.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a href={buyLink} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-br from-primary to-amber-600 px-8 py-4 text-base font-bold text-primary-foreground shadow-glow transition hover:scale-105">
              <Send className="h-5 w-5" /> خرید + قرارداد
            </a>
            <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl border border-border bg-white/5 px-6 py-4 text-base font-semibold backdrop-blur transition hover:bg-white/10">
              ارتباط مستقیم
            </a>
          </div>
        </motion.div>

        {/* Related */}
        {others.length > 0 && (
          <Section icon={Smartphone} eyebrow="اپ‌های مشابه" title={`بیشتر در ${a.cat}`}>
            <div className="grid gap-4 md:grid-cols-3">
              {others.map((o) => {
                const OIcon = o.icon;
                return (
                  <Link key={o.slug} to="/apps/$slug" params={{ slug: o.slug }}
                    className="group rounded-2xl border border-border bg-card/40 p-5 backdrop-blur transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow">
                    <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${o.color} text-white`}>
                      <OIcon className="h-5 w-5" />
                    </div>
                    <h4 className="mt-3 text-sm font-bold leading-7">{o.title}</h4>
                    <p className="mt-2 text-xs text-muted-foreground line-clamp-2">{o.short}</p>
                    <div className="mt-3 inline-flex items-center gap-1 text-xs text-primary">ادامه مطلب <ArrowLeft className="h-3 w-3" /></div>
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
