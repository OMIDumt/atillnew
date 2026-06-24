import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowLeft, Sparkles, Layers, Rocket, Package, Workflow } from "lucide-react";
import type { ElementType } from "react";
import { BackButton } from "@/components/back-button";
import { getServiceBySlug, SERVICE_DETAILS } from "@/lib/services-data";
import { getServiceExtras } from "@/lib/services-articles";
import { telegramBuyLink } from "@/lib/telegram";
import { Newspaper, TrendingUp as TrendUp, HelpCircle, Send } from "lucide-react";
import { SITE_URL, DEFAULT_OG_IMAGE, abs, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }): { slug: string } => {
    const service = getServiceBySlug(params.slug);
    if (!service) throw notFound();
    return { slug: params.slug };
  },
  head: ({ loaderData }) => {
    const service = loaderData ? getServiceBySlug(loaderData.slug) : null;
    if (!service) return { meta: [{ title: "خدمت | ATiLLAi" }] };
    const url = `${SITE_URL}/services/${service.slug}`;
    const extras = getServiceExtras(service.slug);
    const faqs = extras?.faq ?? [];
    return {
      meta: [
        { title: `${service.title} | ATiLLAi` },
        { name: "description", content: service.desc },
        { name: "keywords", content: `${service.title}, ATiLLAi, هوش مصنوعی, یادگیری ماشین, مشاوره پروژه` },
        { property: "og:title", content: `${service.title} | ATiLLAi` },
        { property: "og:description", content: service.tagline ?? service.desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "og:image", content: DEFAULT_OG_IMAGE },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: `${service.title} | ATiLLAi` },
        { name: "twitter:description", content: service.tagline ?? service.desc },
        { name: "twitter:image", content: DEFAULT_OG_IMAGE },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: service.title,
            description: service.desc,
            url,
            image: DEFAULT_OG_IMAGE,
            provider: {
              "@type": "Organization",
              name: "ATiLLAi",
              url: SITE_URL,
            },
            areaServed: "IR",
            serviceType: service.title,
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbJsonLd([
              { name: "خانه", path: "/" },
              { name: "خدمات", path: "/services" },
              { name: service.title, path: `/services/${service.slug}` },
            ]),
          ),
        },
        ...(faqs.length
          ? [
              {
                type: "application/ld+json",
                children: JSON.stringify(faqJsonLd(faqs)),
              },
            ]
          : []),
      ],
    };
  },
  notFoundComponent: () => (
    <section className="pt-40 pb-24 text-center">
      <h1 className="text-3xl font-black">خدمت یافت نشد</h1>
      <Link to="/services" className="mt-6 inline-block text-primary">بازگشت به خدمات</Link>
    </section>
  ),
  errorComponent: () => (
    <section className="pt-40 pb-24 text-center">
      <h1 className="text-2xl font-black">خطا در بارگذاری</h1>
      <p className="mt-4 text-muted-foreground">یک خطای غیرمنتظره رخ داد. لطفاً دوباره تلاش کنید.</p>
    </section>
  ),
  component: ServiceDetailPage,
});

void abs;

function ServiceDetailPage() {
  const { slug } = Route.useLoaderData();
  const service = getServiceBySlug(slug)!;
  const Icon = service.icon;
  const others = SERVICE_DETAILS.filter((s) => s.slug !== service.slug).slice(0, 4);
  const extras = getServiceExtras(service.slug);
  const orderLink = telegramBuyLink(`سفارش خدمت ${service.title}`);

  return (
    <section className="relative pt-32 pb-24">
      <div className={`pointer-events-none absolute -top-32 right-0 h-[28rem] w-[28rem] rounded-full bg-gradient-to-br ${service.color} opacity-20 blur-3xl`} />
      <div className="pointer-events-none absolute top-40 -left-32 h-[24rem] w-[24rem] rounded-full bg-primary/15 blur-3xl" />

      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8 flex items-center gap-3">
          <BackButton />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-border bg-card/40 p-10 backdrop-blur md:p-14"
        >
          <div className={`absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br ${service.color} opacity-30 blur-3xl`} />
          <div className="relative">
            <div className={`inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br ${service.color} text-white shadow-glow`}>
              <Icon className="h-10 w-10" />
            </div>
            <span className="mt-6 block text-xs font-bold uppercase tracking-[0.3em] text-primary">خدمت تخصصی</span>
            <h1 className="mt-3 text-4xl font-black md:text-6xl">{service.title}</h1>
            <p className="mt-4 text-xl text-gradient-gold font-bold">{service.tagline}</p>
            <p className="mt-5 max-w-3xl text-lg leading-9 text-muted-foreground">{service.desc}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-br from-primary to-amber-600 px-7 py-4 text-base font-bold text-primary-foreground shadow-glow transition hover:scale-105">
                دریافت مشاوره رایگان
                <ArrowLeft className="h-5 w-5 transition group-hover:-translate-x-1" />
              </Link>
              <Link to="/projects" className="inline-flex items-center gap-2 rounded-2xl border border-border bg-white/5 px-6 py-4 text-base font-semibold backdrop-blur transition hover:bg-white/10">
                مشاهده نمونه پروژه‌ها
              </Link>
            </div>
          </div>
        </motion.div>

        <SectionBlock icon={Sparkles} title="ویژگی‌های کلیدی" eyebrow="آنچه ارائه می‌دهیم">
          <div className="grid gap-4 md:grid-cols-2">
            {service.features.map((f: string, i: number) => (
              <motion.div
                key={f}
                initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-start gap-3 rounded-2xl border border-border bg-card/40 p-5 backdrop-blur transition hover:border-primary/40"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm leading-7">{f}</span>
              </motion.div>
            ))}
          </div>
        </SectionBlock>

        <SectionBlock icon={Rocket} title="کاربردهای واقعی" eyebrow="چه چیزی می‌سازیم">
          <div className="grid gap-5 md:grid-cols-3">
            {service.useCases.map((u: { title: string; desc: string }, i: number) => (
              <motion.div
                key={u.title}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-3xl border border-border bg-card/40 p-7 backdrop-blur transition hover:border-primary/40 hover:shadow-glow"
              >
                <div className={`absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${service.color} opacity-0 blur-3xl transition group-hover:opacity-40`} />
                <h3 className="relative text-lg font-bold">{u.title}</h3>
                <p className="relative mt-3 text-sm leading-7 text-muted-foreground">{u.desc}</p>
              </motion.div>
            ))}
          </div>
        </SectionBlock>

        <SectionBlock icon={Layers} title="تکنولوژی‌های ما" eyebrow="ابزارها">
          <div className="flex flex-wrap gap-3">
            {service.technologies.map((t: string, i: number) => (
              <motion.span
                key={t}
                initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="glass rounded-full px-5 py-2 text-sm font-semibold text-foreground transition hover:bg-primary/10 hover:text-primary"
              >
                {t}
              </motion.span>
            ))}
          </div>
        </SectionBlock>

        <SectionBlock icon={Workflow} title="فرایند اجرا" eyebrow="چطور پیش می‌رویم">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {service.process.map((p: { step: string; desc: string }, i: number) => (
              <motion.div
                key={p.step}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative overflow-hidden rounded-3xl border border-border bg-card/40 p-6 backdrop-blur"
              >
                <div className="text-5xl font-black text-gradient-gold opacity-30">۰{i + 1}</div>
                <h3 className="mt-3 text-lg font-bold">{p.step}</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </SectionBlock>

        <SectionBlock icon={Package} title="تحویل نهایی" eyebrow="چه دریافت می‌کنید">
          <div className="flex flex-wrap gap-3">
            {service.deliverables.map((d: string) => (
              <span key={d} className="inline-flex items-center gap-2 rounded-2xl border border-primary/30 bg-primary/10 px-5 py-3 text-sm font-semibold text-primary">
                <CheckCircle2 className="h-4 w-4" />
                {d}
              </span>
            ))}
          </div>
        </SectionBlock>

        {extras && (
          <>
            <SectionBlock icon={TrendUp} title="ترندهای روز این حوزه" eyebrow="۱۴۰۴">
              <div className="grid gap-3 md:grid-cols-2">
                {extras.trends.map((t, i) => (
                  <motion.div key={t}
                    initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-5 backdrop-blur">
                    <TrendUp className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span className="text-sm leading-7">{t}</span>
                  </motion.div>
                ))}
              </div>
            </SectionBlock>

            <SectionBlock icon={Newspaper} title="مقالات و منابع اخیر" eyebrow="به‌روز در این زمینه">
              <div className="grid gap-5 md:grid-cols-3">
                {extras.articles.map((a, i) => (
                  <motion.article key={a.title}
                    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }} whileHover={{ y: -6 }}
                    className="group relative overflow-hidden rounded-3xl border border-border bg-card/40 p-6 backdrop-blur transition hover:border-primary/40 hover:shadow-glow">
                    <div className={`absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${service.color} opacity-0 blur-3xl transition group-hover:opacity-40`} />
                    <div className="relative flex items-center justify-between text-xs">
                      <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-bold text-primary">{a.tag}</span>
                      <span className="text-muted-foreground">{a.date}</span>
                    </div>
                    <h3 className="relative mt-4 text-base font-bold leading-7">{a.title}</h3>
                    <p className="relative mt-2 text-sm leading-7 text-muted-foreground">{a.summary}</p>
                  </motion.article>
                ))}
              </div>
            </SectionBlock>

            <SectionBlock icon={HelpCircle} title="پرسش‌های پرتکرار" eyebrow="FAQ">
              <div className="grid gap-3 md:grid-cols-2">
                {extras.faq.map((f) => (
                  <div key={f.q} className="rounded-2xl border border-border bg-card/40 p-5 backdrop-blur">
                    <div className="text-sm font-bold text-foreground">{f.q}</div>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">{f.a}</p>
                  </div>
                ))}
              </div>
            </SectionBlock>
          </>
        )}

        <SectionBlock icon={Sparkles} title="سایر خدمات مرتبط" eyebrow="بیشتر کاوش کنید">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {others.map((o) => {
              const OIcon = o.icon;
              return (
                <Link
                  key={o.slug}
                  to="/services/$slug"
                  params={{ slug: o.slug }}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card/40 p-5 backdrop-blur transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow"
                >
                  <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${o.color} text-white`}>
                    <OIcon className="h-5 w-5" />
                  </div>
                  <h4 className="mt-3 text-sm font-bold">{o.title}</h4>
                </Link>
              );
            })}
          </div>
        </SectionBlock>

        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mt-20 overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/20 to-amber-600/10 p-10 text-center backdrop-blur md:p-14"
        >
          <h3 className="text-3xl font-black md:text-4xl">آماده شروع پروژه هستید؟</h3>
          <p className="mt-3 text-muted-foreground">سفارش مستقیم در تلگرام — بدون درگاه پرداخت.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a href={orderLink} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-br from-primary to-amber-600 px-8 py-4 text-base font-bold text-primary-foreground shadow-glow transition hover:scale-105">
              <Send className="h-5 w-5" /> سفارش و قرارداد در تلگرام
            </a>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-2xl border border-border bg-white/5 px-6 py-4 text-base font-semibold backdrop-blur transition hover:bg-white/10">
              تماس با کارشناسان <ArrowLeft className="h-5 w-5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SectionBlock({
  icon: Icon, eyebrow, title, children,
}: { icon: ElementType; eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="mt-16"
    >
      <div className="mb-7 flex items-center gap-3">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">{eyebrow}</div>
          <h2 className="text-2xl font-black md:text-3xl">{title}</h2>
        </div>
      </div>
      {children}
    </motion.div>
  );
}
