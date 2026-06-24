import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/** Subtle golden cursor-following ambient glow — desktop only */
export function CursorGlow() {
  const [pos, setPos] = useState({ x: -400, y: -400 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none)").matches) return;
    setVisible(true);
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  if (!visible) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed -z-10 h-[480px] w-[480px] rounded-full opacity-60 mix-blend-screen"
      animate={{ x: pos.x - 240, y: pos.y - 240 }}
      transition={{ type: "spring", stiffness: 60, damping: 18, mass: 0.6 }}
      style={{
        background:
          "radial-gradient(closest-side, oklch(0.85 0.16 85 / 0.18), transparent 70%)",
      }}
    />
  );
}
