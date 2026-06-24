import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Mail, MessageCircle, Send, Phone, MapPin, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { BackButton } from "@/components/back-button";
import { SITE_URL, DEFAULT_OG_IMAGE, breadcrumbJsonLd } from "@/lib/seo";

const CONTACT_URL = `${SITE_URL}/contact`;

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "تماس با ATiLLAi | مشاوره رایگان پروژه‌های هوش مصنوعی" },
      { name: "description", content: "برای ثبت سفارش پروژه هوش مصنوعی، یادگیری ماشین، آمار یا اپلیکیشن AI با ATiLLAi در تماس باشید. مشاوره رایگان از طریق تلگرام، تلفن و ایمیل." },
      { name: "keywords", content: "تماس ATiLLAi, مشاوره هوش مصنوعی, ثبت سفارش پروژه, تلگرام ATiLLAi, تبریز" },
      { property: "og:title", content: "تماس با ATiLLAi" },
      { property: "og:description", content: "ثبت سفارش پروژه و دریافت مشاوره رایگان از تیم ATiLLAi." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: CONTACT_URL },
      { property: "og:image", content: DEFAULT_OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "تماس با ATiLLAi" },
      { name: "twitter:description", content: "ثبت سفارش پروژه و دریافت مشاوره رایگان." },
      { name: "twitter:image", content: DEFAULT_OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: CONTACT_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "تماس با ATiLLAi",
          url: CONTACT_URL,
          mainEntity: {
            "@type": "Organization",
            name: "ATiLLAi",
            url: SITE_URL,
            email: "Atilla.DatascienceGroup.1401@gmail.com",
            telephone: "+98-910-555-7133",
            address: { "@type": "PostalAddress", streetAddress: "Valiasr", addressLocality: "Tabriz", addressCountry: "IR" },
            contactPoint: [{
              "@type": "ContactPoint",
              telephone: "+98-910-555-7133",
              contactType: "customer support",
              availableLanguage: ["Persian", "English", "Arabic", "Turkish"],
            }],
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbJsonLd([
            { name: "خانه", path: "/" },
            { name: "تماس با ما", path: "/contact" },
          ]),
        ),
      },
    ],
  }),
  component: ContactPage,
});

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <section className="relative pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-8"><BackButton /></div>
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">در ارتباط باشید</span>
          <h1 className="mt-4 text-4xl font-black md:text-6xl">
            <span className="text-gradient-gold">ثبت سفارش</span> پروژه
          </h1>
          <p className="mt-5 text-muted-foreground">
            فرم زیر را تکمیل کنید؛ کارشناسان ما در کوتاه‌ترین زمان با شما تماس می‌گیرند.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="space-y-4 lg:col-span-1"
          >
            {[
              { icon: Mail, title: "ایمیل اصلی", value: "Atilla.DatascienceGroup.1401@gmail.com", href: "mailto:Atilla.DatascienceGroup.1401@gmail.com", ltr: true },
              { icon: Mail, title: "ایمیل مدیریت", value: "dr.m.pourabdollah.ai@gmail.com", href: "mailto:dr.m.pourabdollah.ai@gmail.com", ltr: true },
              { icon: Mail, title: "ایمیل پشتیبانی", value: "mahdi.poorabdollah@gmail.com", href: "mailto:mahdi.poorabdollah@gmail.com", ltr: true },
              { icon: Phone, title: "تلفن همراه ۱", value: "+98 910 555 7133", href: "tel:+989105557133", ltr: true },
              { icon: Phone, title: "تلفن همراه ۲", value: "+98 990 137 7895", href: "tel:+989901377895", ltr: true },
              { icon: Send, title: "تلگرام", value: "@MahdiPourabdollah_Ai", href: "https://t.me/MahdiPourabdollah_Ai" },
              { icon: MessageCircle, title: "واتساپ", value: "+98 910 555 7133", href: "https://wa.me/989105557133", ltr: true },
              { icon: MapPin, title: "آدرس", value: "تبریز، خیابان ولیعصر" },
            ].map((c) => (
              <a key={c.title} href={c.href ?? "#"} target={c.href?.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="glass flex items-center gap-4 rounded-2xl p-4 transition hover:scale-[1.02]">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-amber-600 text-primary-foreground">
                  <c.icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs text-muted-foreground">{c.title}</div>
                  <div className="font-bold text-sm truncate" dir={c.ltr ? "ltr" : undefined}>{c.value}</div>
                </div>
              </a>
            ))}
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="glass relative rounded-3xl p-8 lg:col-span-2"
          >
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="نام و نام خانوادگی" name="name" required />
              <Field label="ایمیل" name="email" type="email" required />
              <Field label="شماره تماس" name="phone" />
              <SelectField label="نوع پروژه" name="type" options={[
                "دانشجویی / پایان‌نامه",
                "صنعتی",
                "شرکت خصوصی",
                "دولتی / سازمانی",
                "مشاوره",
              ]} />
            </div>
            <SelectField className="mt-5" label="حوزه تخصصی" name="domain" options={[
              "یادگیری ماشین",
              "یادگیری عمیق",
              "بینایی کامپیوتر",
              "پردازش زبان طبیعی",
              "تحلیل آماری",
              "علم داده",
              "سایر",
            ]} />
            <div className="mt-5">
              <label htmlFor="contact-description" className="mb-2 block text-sm font-semibold">شرح پروژه</label>
              <textarea
                id="contact-description"
                name="description"
                rows={5}
                required
                placeholder="درباره پروژه‌تان توضیح دهید..."
                className="w-full rounded-2xl border border-input bg-background/40 px-4 py-3 text-sm outline-none ring-primary/40 transition focus:ring-2"
              />
            </div>

            <button
              type="submit"
              className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-br from-primary to-amber-600 px-6 py-4 text-base font-bold text-primary-foreground shadow-glow transition hover:scale-[1.01]"
            >
              {sent ? "✓ درخواست شما ثبت شد" : "ارسال درخواست"} <ArrowLeft className="h-5 w-5" />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  const id = `contact-${name}`;
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold">{label}</label>
      <input
        id={id}
        type={type}
        name={name}
        required={required}
        className="w-full rounded-2xl border border-input bg-background/40 px-4 py-3 text-sm outline-none ring-primary/40 transition focus:ring-2"
      />
    </div>
  );
}

function SelectField({ label, name, options, className = "" }: { label: string; name: string; options: string[]; className?: string }) {
  const id = `contact-${name}`;
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold">{label}</label>
      <select
        id={id}
        name={name}
        className="w-full rounded-2xl border border-input bg-background/80 px-4 py-3 text-sm outline-none ring-primary/40 transition focus:ring-2"
      >
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}
