import { motion } from "framer-motion";
import { ATILLAI_ORBIT_LOGO } from "@/lib/gallery-images";

type Props = { size?: number; showText?: boolean; className?: string };

/** Luxury animated ATiLLAi logo — gold gradient hex + orbiting neuron */
export function AtilLogo({ size = 40, showText = true, className = "" }: Props) {
  // Outer ring is larger than the logo glyph so the glyph sits centered inside the orbit.
  const ring = Math.round(size * 1.35);
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <motion.div
        whileHover={{ scale: 1.06 }}
        transition={{ type: "spring", stiffness: 200, damping: 14 }}
        className="relative flex items-center justify-center"
        style={{ width: ring, height: ring }}
      >
        {/* Outer orbit ring with rotating neuron nodes — the logo glyph is centered inside */}
        <motion.svg
          aria-hidden
          width={ring}
          height={ring}
          viewBox="0 0 100 100"
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        >
          <defs>
            <linearGradient id="atil-ring" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="oklch(0.92 0.14 95)" stopOpacity="0.9" />
              <stop offset="50%" stopColor="oklch(0.75 0.18 200)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="oklch(0.62 0.18 50)" stopOpacity="0.9" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="46" fill="none" stroke="url(#atil-ring)" strokeWidth="0.8" strokeDasharray="2 3" />
          <circle cx="50" cy="50" r="42" fill="none" stroke="oklch(0.85 0.16 85 / 0.35)" strokeWidth="0.5" />
          {/* Orbit neurons */}
          <circle cx="50" cy="4" r="2.2" fill="oklch(0.95 0.12 90)" style={{ filter: "drop-shadow(0 0 4px oklch(0.85 0.18 85))" }} />
          <circle cx="50" cy="96" r="1.6" fill="oklch(0.75 0.18 200)" style={{ filter: "drop-shadow(0 0 3px oklch(0.75 0.18 200))" }} />
          <circle cx="4" cy="50" r="1.3" fill="oklch(0.92 0.14 95)" opacity="0.8" />
          <circle cx="96" cy="50" r="1.3" fill="oklch(0.92 0.14 95)" opacity="0.8" />
        </motion.svg>

        {/* Counter-rotating subtle ring for depth */}
        <motion.div
          aria-hidden
          className="absolute inset-1 rounded-full border border-amber-300/15"
          animate={{ rotate: -360 }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        />

        {/* Centered uploaded logo image */}
        <div className="relative overflow-hidden rounded-full ring-1 ring-amber-200/40" style={{ width: size, height: size }}>
          <div className="absolute inset-0 rounded-full blur-xl opacity-70" style={{ background: "var(--grad-gold)" }} />
          <img
            src={ATILLAI_ORBIT_LOGO}
            alt="ATiLLAi"
            width={size}
            height={size}
            className="relative h-full w-full rounded-full object-cover object-center"
          />
        </div>
      </motion.div>


      {showText && (
        <div dir="ltr" className="leading-none text-left">
          <div
            className="flex items-baseline text-[26px] tracking-tight"
            style={{ fontFamily: '"Cormorant Garamond", "Cormorant", Georgia, serif', fontWeight: 700 }}
          >
            <span className="text-foreground">A</span>
            <span className="bg-gradient-to-b from-[#BF953F] via-[#FCF6BA] to-[#AA771C] bg-clip-text text-transparent">T</span>
            <span className="bg-gradient-to-b from-[#BF953F] via-[#FCF6BA] to-[#AA771C] bg-clip-text text-transparent" style={{ textTransform: 'lowercase', fontSize: '0.78em' }}>i</span>
            <span className="bg-gradient-to-b from-[#BF953F] via-[#FCF6BA] to-[#AA771C] bg-clip-text text-transparent">LL</span>
            <span className="text-foreground">A</span>
            <span className="text-foreground" style={{ textTransform: 'lowercase', fontSize: '0.78em' }}>i</span>
          </div>
          <div
            className="mt-1.5 text-[9.5px] font-light uppercase tracking-[0.4em] text-muted-foreground"
            style={{ fontFamily: '"Montserrat", "Inter", sans-serif' }}
          >
            Intelligent Solutions
          </div>
        </div>
      )}

    </div>
  );
}
