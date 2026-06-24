type Props = {
  src: string;
  color: string;
  title?: string;
  subtitle?: string;
  alt?: string;
};

/**
 * Luxury framed AI cover photo for the carousel "cover" slide.
 * Matches the visual language of DomainScreen but features the real render.
 */
export function CoverPhoto({ src, color, title, subtitle, alt }: Props) {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black shadow-[0_30px_80px_-20px_rgba(0,0,0,0.85)] ring-1 ring-white/10">
      {/* Ambient halo */}
      <div className={`pointer-events-none absolute -inset-20 bg-gradient-to-br ${color} opacity-30 blur-3xl`} />
      <div className="pointer-events-none absolute -inset-16 bg-[conic-gradient(from_120deg,rgba(251,191,36,0.18),rgba(99,102,241,0.18),rgba(14,165,233,0.18),rgba(251,191,36,0.18))] opacity-50 blur-3xl" />

      {/* Window chrome */}
      <div className="relative z-10 flex items-center gap-1.5 border-b border-white/10 bg-black/60 px-3 py-2 backdrop-blur">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/80 shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80 shadow-[0_0_8px_rgba(234,179,8,0.6)]" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-500/80 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
        <div className="mx-auto flex items-center gap-1.5 rounded-md bg-white/10 px-3 py-0.5 text-[10px] text-white/70 ring-1 ring-white/10">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          atil.ai · cover
        </div>
        <span className="rounded-full border border-amber-400/40 bg-amber-400/15 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-amber-300">4K</span>
      </div>

      {/* Image stage */}
      <div className="relative z-10 h-[calc(100%-2rem)] overflow-hidden">
        <img
          src={src}
          alt={alt ?? title ?? "cover"}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Cinematic overlays */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="pointer-events-none absolute -inset-x-1/2 -top-1/2 h-[200%] w-[200%] rotate-[18deg] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_90px_rgba(0,0,0,0.7)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:repeating-linear-gradient(0deg,#fff_0px,#fff_1px,transparent_1px,transparent_3px)]" />

        {/* Captions */}
        {title && (
          <div className="absolute right-3 top-3 flex items-center gap-1.5">
            <span className="rounded-full bg-emerald-500/20 px-1.5 py-0.5 text-[8px] font-bold text-emerald-300 ring-1 ring-emerald-400/40">LIVE</span>
            <span className="rounded-full bg-white/10 px-1.5 py-0.5 text-[8px] font-bold text-white/70 ring-1 ring-white/15">AI · v4.2</span>
          </div>
        )}
        {(title || subtitle) && (
          <div className="absolute inset-x-3 bottom-3 text-white">
            {title && <div className="text-[12px] font-black drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">{title}</div>}
            {subtitle && <div className="mt-0.5 text-[10px] opacity-80 drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]">{subtitle}</div>}
          </div>
        )}
      </div>
    </div>
  );
}
