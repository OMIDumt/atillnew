import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Tag } from "lucide-react";
import { Link } from "@tanstack/react-router";

const STORAGE_KEY = "ATiLLAi.promo.dismissed.v1";

export function PromoBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const dismiss = () => {
    setVisible(false);
    try { localStorage.setItem(STORAGE_KEY, "1"); } catch {}
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-[55] overflow-hidden border-t border-amber-300/30 bg-gradient-to-r from-amber-500/15 via-amber-300/10 to-amber-500/15 backdrop-blur-xl"
          role="region"
          aria-label="پیشنهاد ویژه"
        >
          <motion.span
            aria-hidden
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 3.5, ease: "linear", repeat: Infinity }}
            className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-amber-200/25 to-transparent blur-md"
          />
          <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-4 py-2 text-center text-[12.5px] sm:text-[13.5px]">
            <span className="hidden h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-amber-300/40 bg-amber-400/15 text-amber-200 sm:inline-flex">
              <Tag className="h-3.5 w-3.5" />
            </span>
            <p className="font-medium text-foreground/95">
              <Sparkles className="me-1 inline h-3.5 w-3.5 text-amber-300" />
              پیشنهاد ویژه: تا{" "}
              <span className="font-black text-gradient-gold">٣٠٪ تخفیف</span>{" "}
              روی اپلیکیشن‌ها و پروژه‌های منتخب — با کد{" "}
              <span className="mx-1 inline-block rounded-md border border-amber-300/40 bg-amber-400/15 px-2 py-0.5 font-mono text-[12px] font-bold tracking-wider text-amber-200">
                ATiLLAi30
              </span>
              <Link to="/apps" className="ms-2 font-bold text-amber-200 underline-offset-4 hover:underline">
                مشاهده اپ‌ها
              </Link>
              <span className="mx-1 text-foreground/40">·</span>
              <Link to="/projects" className="font-bold text-amber-200 underline-offset-4 hover:underline">
                پروژه‌ها
              </Link>
            </p>
            <button
              onClick={dismiss}
              aria-label="بستن"
              className="absolute end-3 rounded-md p-1 text-foreground/60 transition hover:bg-white/10 hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
