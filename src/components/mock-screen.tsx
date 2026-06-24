import type { LucideIcon } from "lucide-react";

type Props = {
  title: string;
  subtitle?: string;
  icon: LucideIcon;
  color: string; // tailwind gradient like "from-pink-500 to-rose-500"
  variant?: "phone" | "dashboard" | "card";
};

/**
 * Stylized in-browser "screenshot" mockups for portfolio items.
 * Pure CSS — fast, themed, no external assets.
 */
export function MockScreen({ title, subtitle, icon: Icon, color, variant = "dashboard" }: Props) {
  if (variant === "phone") {
    return (
      <div className="relative mx-auto aspect-[9/16] w-full max-w-[220px] overflow-hidden rounded-[2rem] border-[6px] border-black/70 bg-black shadow-2xl">
        <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-90`} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
        <div className="absolute left-1/2 top-2 h-4 w-16 -translate-x-1/2 rounded-full bg-black" />
        <div className="relative flex h-full flex-col items-center justify-center px-4 text-center text-white">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
            <Icon className="h-7 w-7" />
          </div>
          <div className="mt-4 text-sm font-black leading-tight">{title}</div>
          {subtitle && <div className="mt-1 text-[10px] opacity-80">{subtitle}</div>}
          <div className="mt-5 flex gap-1.5">
            <span className="h-1.5 w-6 rounded-full bg-white/80" />
            <span className="h-1.5 w-3 rounded-full bg-white/40" />
            <span className="h-1.5 w-3 rounded-full bg-white/40" />
          </div>
        </div>
      </div>
    );
  }

  if (variant === "card") {
    return (
      <div className={`relative aspect-video overflow-hidden rounded-2xl bg-gradient-to-br ${color} p-6 shadow-xl`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_50%)]" />
        <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        <div className="relative flex h-full flex-col justify-between text-white">
          <Icon className="h-8 w-8 opacity-80" />
          <div>
            <div className="text-lg font-black leading-tight">{title}</div>
            {subtitle && <div className="mt-1 text-xs opacity-80">{subtitle}</div>}
          </div>
        </div>
      </div>
    );
  }

  // dashboard
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black/80 shadow-2xl">
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-25`} />
      {/* window chrome */}
      <div className="flex items-center gap-1.5 border-b border-white/10 bg-black/40 px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
        <div className="mx-auto rounded bg-white/10 px-3 py-0.5 text-[10px] text-white/60">atil.ai/app</div>
      </div>
      <div className="grid h-[calc(100%-2rem)] grid-cols-[60px_1fr] text-white">
        <div className="flex flex-col items-center gap-2 border-l border-white/10 bg-black/40 py-3">
          <div className={`inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${color}`}>
            <Icon className="h-4 w-4" />
          </div>
          <span className="mt-2 h-1.5 w-6 rounded bg-white/30" />
          <span className="h-1.5 w-6 rounded bg-white/20" />
          <span className="h-1.5 w-6 rounded bg-white/20" />
        </div>
        <div className="space-y-2 p-3">
          <div className="text-xs font-bold">{title}</div>
          {subtitle && <div className="text-[10px] opacity-70">{subtitle}</div>}
          <div className="mt-2 grid grid-cols-3 gap-1.5">
            <div className={`h-8 rounded bg-gradient-to-br ${color} opacity-80`} />
            <div className="h-8 rounded bg-white/10" />
            <div className="h-8 rounded bg-white/10" />
          </div>
          <div className="mt-1 flex h-12 items-end gap-1">
            {[35, 60, 45, 80, 55, 90, 70, 50].map((h, i) => (
              <div key={i} style={{ height: `${h}%` }} className={`flex-1 rounded-t bg-gradient-to-t ${color} opacity-80`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
