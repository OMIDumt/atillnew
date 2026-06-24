import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Menu, X, Globe, ChevronDown, Home, Sparkles, Smartphone, FolderKanban, User, Mail, Baby, GraduationCap, Briefcase, FileText, ToyBrick, type LucideIcon } from "lucide-react";
import { AtilLogo } from "@/components/atil-logo";
import { PromoBanner } from "@/components/promo-banner";
import { useI18n, LANG_LABEL, type Lang } from "@/lib/i18n";
import { SERVICE_DETAILS } from "@/lib/services-data";
import { APPS } from "@/lib/apps-data";
import { PROJECTS } from "@/lib/projects-data";

type SubItem = { to: string; params?: Record<string, string>; label: string; sub?: string; Icon?: LucideIcon };
type NavItem = { to: string; key: string; Icon: LucideIcon; children?: SubItem[] };

const serviceChildren: SubItem[] = SERVICE_DETAILS.slice(0, 8).map((s) => ({
  to: "/services/$slug", params: { slug: s.slug }, label: s.title, sub: s.tagline, Icon: s.icon,
}));
const appChildren: SubItem[] = APPS.slice(0, 8).map((a) => ({
  to: "/apps/$slug", params: { slug: a.slug }, label: a.title, sub: a.cat, Icon: a.icon,
}));
const projectChildren: SubItem[] = PROJECTS.slice(0, 8).map((p) => ({
  to: "/projects/$slug", params: { slug: p.slug }, label: p.title, sub: p.cat, Icon: p.icon,
}));

const kidsChildren: SubItem[] = [
  { to: "/kids-test", label: "تست شخصیت کودک", sub: "۶ تا ۱۲ سال", Icon: Baby },
  { to: "/kids-test", label: "تست استعداد نوجوان", sub: "۱۳ تا ۱۸ سال", Icon: GraduationCap },
  { to: "/kids-test", label: "راهنمای شغلی", sub: "مسیر آینده فرزند", Icon: Briefcase },
  { to: "/kids-test", label: "نمونه گزارش", sub: "نمونهٔ نتیجه تست", Icon: FileText },
];

const NAV: NavItem[] = [
  { to: "/", key: "nav.home", Icon: Home },
  { to: "/services", key: "nav.services", Icon: Sparkles, children: serviceChildren },
  { to: "/apps", key: "nav.apps", Icon: Smartphone, children: appChildren },
  { to: "/projects", key: "nav.projects", Icon: FolderKanban, children: projectChildren },
  { to: "/kids-test", key: "nav.kids", Icon: ToyBrick, children: kidsChildren },
  { to: "/about", key: "nav.about", Icon: User },
  { to: "/contact", key: "nav.contact", Icon: Mail },
];


function LangPicker() {
  const { lang, setLang, t } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);
  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((s) => !s)}
        aria-label={t("lang.label")}
        className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-foreground/90 backdrop-blur transition hover:border-primary/40 hover:bg-primary/10"
      >
        <Globe className="h-4 w-4" />
        <span>{LANG_LABEL[lang]}</span>
        <ChevronDown className="h-3.5 w-3.5 opacity-60" />
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass absolute end-0 mt-2 min-w-[10rem] overflow-hidden rounded-xl p-1"
        >
          {(Object.keys(LANG_LABEL) as Lang[]).map((l) => (
            <button
              key={l}
              onClick={() => { setLang(l); setOpen(false); }}
              className={`block w-full rounded-lg px-3 py-2 text-start text-sm transition ${
                lang === l ? "bg-primary/15 text-primary" : "text-foreground/85 hover:bg-white/5"
              }`}
            >
              {LANG_LABEL[l]}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
}

function NavLinkWithDropdown({ item, t }: { item: NavItem; t: (k: string) => string }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onEnter = () => { if (closeTimer.current) clearTimeout(closeTimer.current); setOpen(true); };
  const onLeave = () => { closeTimer.current = setTimeout(() => setOpen(false), 120); };

  const wrapRef = useRef<HTMLDivElement>(null);

  // Close on Escape and on outside click; restore focus to trigger
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        (wrapRef.current?.querySelector<HTMLAnchorElement>("a[data-nav-trigger]"))?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  // Close when focus leaves the entire wrapper (Tab past last item)
  const onBlurCapture = (e: React.FocusEvent) => {
    if (!wrapRef.current?.contains(e.relatedTarget as Node)) setOpen(false);
  };

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={() => item.children && setOpen(true)}
      onBlur={onBlurCapture}
    >
      <Link
        to={item.to}
        data-nav-trigger
        aria-haspopup={item.children ? "menu" : undefined}
        aria-expanded={item.children ? open : undefined}
        onKeyDown={(e) => {
          if (!item.children) return;
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setOpen(true);
            setTimeout(() => {
              wrapRef.current?.querySelector<HTMLAnchorElement>("[data-submenu-item]")?.focus();
            }, 50);
          }
        }}
        className="group relative inline-flex items-center gap-1.5 whitespace-nowrap rounded-xl px-2 py-2 text-sm text-muted-foreground outline-none transition hover:text-foreground focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-amber-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        activeProps={{ className: "text-foreground" }}
      >
        <span className="relative flex h-7 w-7 items-center justify-center overflow-hidden rounded-lg border border-amber-300/15 bg-gradient-to-br from-amber-400/10 to-white/[0.02] text-amber-200/90 transition-all duration-300 group-hover:scale-110 group-hover:border-amber-300/60 group-hover:text-amber-200 group-hover:shadow-[0_0_18px_-4px_rgba(251,191,36,0.6)]">
          <item.Icon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-[8deg]" />
          <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-amber-200/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        </span>
        <span className="relative whitespace-nowrap">
          {t(item.key)}
          <span className="pointer-events-none absolute -bottom-1 start-0 h-px w-0 bg-gradient-to-r from-amber-300 to-transparent transition-all duration-500 group-hover:w-full" />
        </span>
        {item.children && <ChevronDown className={`h-3 w-3 opacity-60 transition-transform duration-300 ${open ? "rotate-180 text-amber-300" : ""}`} />}
      </Link>

      <AnimatePresence>
        {item.children && open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.94, clipPath: "inset(0 50% 0 50% round 16px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, clipPath: "inset(0 0% 0 0% round 16px)" }}
            exit={{ opacity: 0, y: 6, scale: 0.96, clipPath: "inset(0 40% 0 40% round 16px)" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            role="menu"
            className="absolute left-1/2 top-full z-50 w-[28rem] max-w-[92vw] -translate-x-1/2 pt-3"
          >
            {/* invisible bridge to avoid hover gap */}
            <div className="relative overflow-hidden rounded-2xl border border-amber-300/40 bg-zinc-950/98 p-2 shadow-[0_24px_70px_-10px_rgba(0,0,0,0.85)] ring-1 ring-amber-300/30 backdrop-blur-xl">
              {/* Sweeping shimmer on open */}
              <motion.span
                aria-hidden
                initial={{ x: "-120%" }}
                animate={{ x: "120%" }}
                transition={{ duration: 1.1, ease: "easeOut" }}
                className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-amber-200/15 to-transparent blur-xl"
              />
              {/* Soft aurora glow */}
              <motion.span
                aria-hidden
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="pointer-events-none absolute -top-10 left-1/2 h-24 w-40 -translate-x-1/2 rounded-full bg-amber-300/20 blur-3xl"
              />
              <span className="pointer-events-none absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 rounded-sm border-l border-t border-amber-300/50 bg-zinc-950/98" />
              <div className="relative grid grid-cols-2 gap-1">
                {item.children.map((c, i) => (
                  <motion.div
                    key={c.label}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: 0.02 * i }}
                  >
                    <Link
                      to={c.to}
                      params={c.params as never}
                      data-submenu-item
                      role="menuitem"
                      onClick={() => setOpen(false)}
                      className="group/sub flex items-start gap-2.5 rounded-xl px-3 py-2.5 text-start outline-none transition-all duration-200 hover:-translate-y-0.5 hover:bg-gradient-to-br hover:from-amber-400/20 hover:to-transparent focus-visible:bg-amber-400/20 focus-visible:ring-2 focus-visible:ring-amber-300/70"
                    >
                      {c.Icon && (
                        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-amber-300/40 bg-amber-400/15 text-amber-100 transition-all duration-300 group-hover/sub:scale-110 group-hover/sub:border-amber-300/70 group-hover/sub:shadow-[0_0_14px_-4px_rgba(251,191,36,0.7)]">
                          <c.Icon className="h-3.5 w-3.5" />
                        </span>
                      )}
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-xs font-semibold text-white transition-colors group-hover/sub:text-amber-200">{c.label}</span>
                        {c.sub && <span className="block truncate text-[10px] text-zinc-400">{c.sub}</span>}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
              <Link
                to={item.to}
                onClick={() => setOpen(false)}
                role="menuitem"
                className="mt-1 block rounded-xl border border-amber-300/30 bg-amber-400/10 px-3 py-2 text-center text-xs font-semibold text-amber-100 outline-none transition hover:bg-amber-400/25 hover:text-white focus-visible:ring-2 focus-visible:ring-amber-300/70"
              >
                {t(item.key)} →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


function MobileNavItem({ item, t, onNavigate }: { item: NavItem; t: (k: string) => string; onNavigate: () => void }) {
  const [open, setOpen] = useState(false);
  const hasChildren = !!item.children;
  return (
    <div>
      <div className="flex items-center">
        <Link
          to={item.to}
          onClick={onNavigate}
          className="flex flex-1 items-center gap-2.5 rounded-lg px-4 py-3 text-sm text-muted-foreground hover:bg-white/5 hover:text-foreground"
          activeProps={{ className: "text-foreground bg-white/5" }}
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-amber-300/20 bg-amber-400/10 text-amber-200">
            <item.Icon className="h-3.5 w-3.5" />
          </span>
          {t(item.key)}
        </Link>
        {hasChildren && (
          <button
            onClick={() => setOpen((s) => !s)}
            aria-label="toggle"
            className="rounded-lg p-2 text-muted-foreground hover:text-foreground"
          >
            <ChevronDown className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`} />
          </button>
        )}
      </div>
      {hasChildren && open && (
        <div className="ms-10 mt-1 space-y-0.5 border-s border-amber-300/15 ps-2">
          {item.children!.map((c) => (
            <Link
              key={c.label}
              to={c.to}
              params={c.params as never}
              onClick={onNavigate}
              className="block truncate rounded-lg px-3 py-2 text-xs text-muted-foreground hover:bg-white/5 hover:text-amber-200"
            >
              {c.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const { t } = useI18n();
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      if (open) {
        setHidden(false);
      } else if (y > 140 && y > lastY.current + 4) {
        setHidden(true);
      } else if (y < lastY.current - 4 || y < 60) {
        setHidden(false);
      }
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: hidden ? -120 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "py-2" : "py-4"}`}
    >

      <div className="mx-auto max-w-7xl px-4">
        <div className={`flex items-center justify-between gap-3 rounded-2xl border border-amber-300/20 bg-zinc-950/85 px-4 py-3 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.7)] backdrop-blur-2xl backdrop-saturate-150 transition-all ${scrolled ? "bg-zinc-950/95 shadow-soft" : ""}`}>
          <Link to="/" aria-label="ATiLLAi" className="group">
            <AtilLogo size={40} />
          </Link>

          <nav className="hidden lg:flex items-center gap-0.5 flex-nowrap">
            {NAV.map((n) => (
              <NavLinkWithDropdown key={n.to} item={n} t={t} />
            ))}
          </nav>


          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <LangPicker />
            <Link to="/contact" className="btn-luxury text-sm whitespace-nowrap">
              <span className="btn-luxury-sheen" />
              <span className="relative">{t("cta.order")}</span>
            </Link>
          </div>

          <button className="lg:hidden rounded-lg p-2 text-foreground" onClick={() => setOpen((s) => !s)} aria-label="menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass mt-2 max-h-[80vh] overflow-y-auto rounded-2xl p-3 lg:hidden"
          >
            {NAV.map((n) => (
              <MobileNavItem key={n.to} item={n} t={t} onNavigate={() => setOpen(false)} />
            ))}

            <div className="mt-2 px-2"><LangPicker /></div>
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="btn-luxury mt-3 w-full text-sm"
            >
              <span className="btn-luxury-sheen" />
              <span className="relative">{t("cta.order")}</span>
            </Link>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}
