import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Award, BookOpen, Code, Target } from "lucide-react";
import { BackButton } from "@/components/back-button";
import { SITE_URL, DEFAULT_OG_IMAGE, breadcrumbJsonLd } from "@/lib/seo";

const ABOUT_URL = `${SITE_URL}/about`;

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "درباره ATiLLAi | تیم تخصصی هوش مصنوعی و علم داده" },
      { name: "description", content: "ATiLLAi مرجع تخصصی هوش مصنوعی و علم داده با بیش از ۱۰ سال تجربه در پروژه‌های دانشگاهی، صنعتی و دولتی؛ تیم دکتری‌ها و متخصصان AI/ML." },
      { name: "keywords", content: "درباره ATiLLAi, تیم هوش مصنوعی, متخصص یادگیری ماشین, دکتر مهدی پورعبدالله, تبریز" },
      { property: "og:title", content: "درباره ATiLLAi | تیم تخصصی هوش مصنوعی" },
      { property: "og:description", content: "تیم متخصص ATiLLAi با تجربه‌ای جهانی در AI، ML و آمار." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: ABOUT_URL },
      { property: "og:image", content: DEFAULT_OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "درباره ATiLLAi" },
      { name: "twitter:description", content: "تیم متخصص ATiLLAi با تجربه‌ای جهانی در AI، ML و آمار." },
      { name: "twitter:image", content: DEFAULT_OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: ABOUT_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "درباره ATiLLAi",
          url: ABOUT_URL,
          about: { "@type": "Organization", name: "ATiLLAi", url: SITE_URL },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbJsonLd([
            { name: "خانه", path: "/" },
            { name: "درباره ما", path: "/about" },
          ]),
        ),
      },
    ],
  }),
  component: AboutPage,
});

const values = [
  { icon: Award, title: "تخصص و کیفیت", desc: "تیمی از دکتری‌ها و متخصصان برتر هوش مصنوعی و آمار." },
  { icon: Target, title: "تعهد به نتیجه", desc: "هدف ما حل واقعی مسئله شما و رسیدن به خروجی حرفه‌ای است." },
  { icon: BookOpen, title: "روزآمدی علمی", desc: "همیشه با جدیدترین مقالات و تکنولوژی‌های جهان همگام هستیم." },
  { icon: Code, title: "کد تمیز و مستند", desc: "تمامی پروژه‌ها با کد استاندارد، تست‌پذیر و مستندسازی کامل." },
];

export default function AboutPage() {
  return (
    <section className="relative pt-32 pb-24">
      <div className="mx-auto max-w-5xl px-4">
        <div className="mb-8"><BackButton /></div>
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="text-center"
        >
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">درباره ATiLLAi</span>
          <h1 className="mt-4 text-4xl font-black md:text-6xl">
            <span className="text-gradient-gold">مرجعی</span> برای آینده هوشمند
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-9 text-muted-foreground">
            ATiLLAi یک مرکز تخصصی در زمینه آمار، هوش مصنوعی، یادگیری ماشین و یادگیری عمیق است
            که با تکیه بر تیمی از متخصصان حرفه‌ای، خدمات مشاوره و اجرای پروژه را برای
            دانشجویان، شرکت‌های خصوصی و سازمان‌های صنعتی و دولتی ارائه می‌دهد.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="glass mt-16 rounded-3xl p-10"
        >
          <h2 className="text-2xl font-black md:text-3xl">ماموریت ما</h2>
          <p className="mt-4 leading-9 text-muted-foreground">
            ما باور داریم هوش مصنوعی نباید یک تکنولوژی پیچیده و دور از دسترس باشد.
            ماموریت ATiLLAi این است که با مشاوره دقیق، پیاده‌سازی حرفه‌ای و پشتیبانی پایدار،
            دسترسی به دانش روز هوش مصنوعی را برای همه — از یک دانشجوی کارشناسی گرفته تا
            بزرگ‌ترین سازمان‌ها — هموار سازد.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-3xl border border-border bg-card/40 p-7 backdrop-blur transition hover:border-primary/40 hover:shadow-glow"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-amber-600 text-primary-foreground">
                <v.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-bold">{v.title}</h3>
              <p className="mt-2 leading-7 text-muted-foreground">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
