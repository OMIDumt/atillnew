import { Link } from "@tanstack/react-router";
import { Mail, Phone, Send, MapPin, Sparkles } from "lucide-react";
import { AtilLogo } from "@/components/atil-logo";

export function SiteFooter() {
  return (
    <footer className="relative mt-32 overflow-hidden">
      {/* Top luxury hairline + glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/80 to-transparent" />
      <div className="absolute inset-x-0 -top-px h-24 bg-gradient-to-b from-primary/[0.06] via-transparent to-transparent" />
      {/* Aurora background blobs */}
      <div className="pointer-events-none absolute -top-32 right-1/3 h-72 w-72 rounded-full bg-primary/15 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-32 left-1/4 h-72 w-72 rounded-full bg-secondary/20 blur-[120px]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:repeating-linear-gradient(45deg,#fff_0px,#fff_1px,transparent_1px,transparent_22px)]" />

      <div className="relative mx-auto max-w-7xl px-4 pt-20 pb-32 md:pb-24">
        <div className="grid gap-14 md:grid-cols-4">
          {/* Brand block */}
          <div className="md:col-span-2">
            <AtilLogo size={48} />
            <p className="mt-6 max-w-md font-couture text-[14px] leading-[2.1] text-foreground/85">
              مرجع تخصصی مشاوره و اجرای پروژه‌های
              <span className="mx-1 text-gradient-gold font-bold">هوش مصنوعی، یادگیری ماشین و آمار</span>
              برای دانشجویان، شرکت‌های خصوصی و سازمان‌های صنعتی و دولتی.
            </p>
            <div className="mt-6 inline-flex items-center gap-3 rounded-2xl border border-primary/25 bg-primary/[0.06] px-4 py-2.5 text-sm font-semibold text-foreground/90 backdrop-blur">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="font-luxe tracking-wide">تبریز · خیابان ولیعصر</span>
              <span className="ms-1 inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]" />
            </div>
          </div>

          <div>
            <h4 className="font-ai-display text-[11px] font-bold uppercase tracking-[0.35em] text-gradient-gold">
              دسترسی سریع
            </h4>
            <div className="mt-1 h-px w-12 bg-gradient-to-r from-primary/70 to-transparent" />
            <ul className="mt-5 space-y-3 font-luxe text-[14px] text-foreground/75">
              {[
                { to: "/services", label: "خدمات تخصصی" },
                { to: "/projects", label: "نمونه پروژه‌ها" },
                { to: "/apps", label: "اپلیکیشن‌های AI" },
                { to: "/about", label: "درباره ما" },
                { to: "/contact", label: "ثبت سفارش" },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="group inline-flex items-center gap-2 transition hover:text-primary"
                  >
                    <span className="h-1 w-1 rounded-full bg-primary/50 transition group-hover:scale-150 group-hover:bg-primary" />
                    <span className="transition group-hover:tracking-wider">{l.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-ai-display text-[11px] font-bold uppercase tracking-[0.35em] text-gradient-gold">
              ارتباط با ما
            </h4>
            <div className="mt-1 h-px w-12 bg-gradient-to-r from-primary/70 to-transparent" />
            <ul className="mt-5 space-y-4 font-luxe text-[14px] text-foreground/85">
              <li className="group flex items-center gap-3 min-w-0">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-primary/30 bg-primary/[0.08] text-primary transition group-hover:scale-110">
                  <Mail className="h-3.5 w-3.5" />
                </span>
                <a
                  href="mailto:Atilla.DatascienceGroup.1401@gmail.com"
                  dir="ltr"
                  title="Atilla.DatascienceGroup.1401@gmail.com"
                  style={{ fontFamily: '"Inter", "Manrope", ui-sans-serif, system-ui, sans-serif', letterSpacing: '0', whiteSpace: 'nowrap', fontSize: 'clamp(9.5px, 0.92vw, 11.5px)' }}
                  className="group/mail relative inline-block min-w-0 flex-1 font-medium leading-snug text-white transition-colors duration-300 hover:text-amber-200"
                >
                  Atilla.DatascienceGroup.1401@gmail.com
                  <span className="pointer-events-none absolute inset-x-0 -bottom-0.5 h-px scale-x-0 origin-left bg-gradient-to-r from-amber-300/0 via-amber-300/80 to-amber-300/0 transition-transform duration-500 group-hover/mail:scale-x-100" />
                </a>
              </li>
              <li className="group flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-primary/30 bg-primary/[0.08] text-primary transition group-hover:scale-110">
                  <Phone className="h-4 w-4" />
                </span>
                <a href="tel:+989105557133" dir="ltr" style={{ fontFamily: '"Inter", "Manrope", sans-serif', letterSpacing: '0.08em' }} className="text-[13.5px] font-semibold transition hover:text-primary">
                  +98 910 555 7133
                </a>
              </li>
              <li className="group flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-primary/30 bg-primary/[0.08] text-primary transition group-hover:scale-110">
                  <Phone className="h-4 w-4" />
                </span>
                <a href="tel:+989901377895" dir="ltr" style={{ fontFamily: '"Inter", "Manrope", sans-serif', letterSpacing: '0.08em' }} className="text-[13.5px] font-semibold transition hover:text-primary">
                  +98 990 137 7895
                </a>
              </li>
              <li className="group flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-primary/30 bg-primary/[0.08] text-primary transition group-hover:scale-110">
                  <Send className="h-4 w-4" />
                </span>
                <a href="https://t.me/MahdiPourabdollah_Ai" target="_blank" rel="noopener noreferrer" style={{ fontFamily: '"Inter", "Manrope", sans-serif', letterSpacing: '0.02em' }} className="text-[13.5px] font-medium transition hover:text-primary">
                  @MahdiPourabdollah_Ai
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Decorative divider */}
        <div className="mt-16 flex items-center gap-4">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-primary/40" />
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-primary/40 bg-background text-primary shadow-glow">
            <Sparkles className="h-3.5 w-3.5" />
          </span>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-primary/40" />
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 text-center md:flex-row md:flex-wrap md:gap-3 md:text-start">
          <p style={{ fontFamily: '"Inter", "Manrope", sans-serif' }} className="text-[10.5px] uppercase leading-relaxed tracking-[0.18em] text-foreground/65 sm:text-[11.5px] sm:tracking-[0.22em] md:text-[12px] md:tracking-[0.24em]">
            © {new Date().getFullYear()} <span style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }} className="text-gradient-gold font-bold text-[13px] normal-case tracking-normal sm:text-[14px]">ATiLLAi.ir</span> — تمامی حقوق محفوظ است
          </p>
          <p style={{ fontFamily: '"Cormorant Garamond", "Playfair Display", Georgia, serif' }} className="text-[12.5px] italic leading-relaxed tracking-wide text-foreground/85 sm:text-[13.5px] md:text-[14px]">
            Designed by <span className="text-gradient-gold font-bold not-italic">Dr. Mahdi Pourabdollah</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
