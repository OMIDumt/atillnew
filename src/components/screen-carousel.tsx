import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Tag, LayoutGrid, GalleryHorizontalEnd } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import type { LucideIcon } from "lucide-react";
import { MockScreen } from "@/components/mock-screen";
import { DomainScreen } from "@/components/domain-screen";
import { CoverPhoto } from "@/components/cover-photo";
import type { ScreenKind } from "@/lib/screen-kinds";

export type CarouselScreen = {
  title: string;
  subtitle: string;
  variant: "phone" | "dashboard" | "card";
  tag?: string;
  kind?: ScreenKind;
  coverImage?: string;
  coverAlt?: string;
};

type Props = {
  screens: CarouselScreen[];
  icon: LucideIcon;
  color: string;
  autoplayMs?: number;
};

export function ScreenCarousel({ screens, icon, color, autoplayMs = 4200 }: Props) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [mode, setMode] = useState<"showcase" | "slider">("showcase");
  const [sliderApi, setSliderApi] = useState<CarouselApi | null>(null);
  const [sliderIdx, setSliderIdx] = useState(0);
  const n = screens.length;

  useEffect(() => {
    if (paused || n <= 1 || mode !== "showcase") return;
    const t = setInterval(() => setI((x) => (x + 1) % n), autoplayMs);
    return () => clearInterval(t);
  }, [paused, n, autoplayMs, mode]);

  useEffect(() => {
    if (!sliderApi) return;
    const onSel = () => setSliderIdx(sliderApi.selectedScrollSnap());
    onSel();
    sliderApi.on("select", onSel);
    sliderApi.on("reInit", onSel);
    return () => {
      sliderApi.off("select", onSel);
    };
  }, [sliderApi]);

  const go = (d: number) => setI((x) => (x + d + n) % n);
  const current = screens[i];

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Mode toggle */}
      <div className="mb-4 flex items-center justify-end">
        <div className="inline-flex items-center gap-1 rounded-full border border-border bg-card/60 p-1 backdrop-blur">
          <button
            onClick={() => setMode("showcase")}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold transition ${
              mode === "showcase" ? "bg-primary text-primary-foreground shadow" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <LayoutGrid className="h-3.5 w-3.5" /> نمایشی
          </button>
          <button
            onClick={() => setMode("slider")}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold transition ${
              mode === "slider" ? "bg-primary text-primary-foreground shadow" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <GalleryHorizontalEnd className="h-3.5 w-3.5" /> اسلایدر
          </button>
        </div>
      </div>

      {mode === "slider" ? (
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card/40 p-4 backdrop-blur md:p-6">
          <div className={`pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gradient-to-br ${color} opacity-20 blur-3xl`} />
          <Carousel opts={{ loop: true, direction: "rtl" }} setApi={setSliderApi} className="relative">
            <CarouselContent>
              {screens.map((s, idx) => (
                <CarouselItem key={`slide-${idx}`} className="md:basis-4/5 lg:basis-3/4">
                  <div className="relative overflow-hidden rounded-2xl border border-border bg-black/30">
                    {s.coverImage ? (
                      <img
                        src={s.coverImage}
                        alt={s.coverAlt ?? s.title}
                        loading="lazy"
                        className="h-[300px] w-full object-cover md:h-[460px]"
                      />
                    ) : (
                      <div className={`flex h-[300px] w-full items-center justify-center bg-gradient-to-br ${color} md:h-[460px]`}>
                        <span className="text-2xl font-black text-white/90">{s.title}</span>
                      </div>
                    )}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-5 md:p-7">
                      <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/15 px-2.5 py-1 text-[10px] font-bold text-primary backdrop-blur">
                        <Tag className="h-3 w-3" /> {s.tag ?? `اسلاید ${idx + 1} از ${n}`}
                      </div>
                      <h3 className="mt-2 text-xl font-black text-white md:text-2xl">{s.title}</h3>
                      <p className="mt-1 line-clamp-2 text-sm leading-7 text-white/80">{s.subtitle}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 right-auto md:left-4" />
            <CarouselNext className="right-2 left-auto md:right-4" />
          </Carousel>

          <div className="mt-4 flex items-center justify-center gap-1.5">
            {screens.map((_, idx) => (
              <button
                key={idx}
                aria-label={`اسلاید ${idx + 1}`}
                onClick={() => sliderApi?.scrollTo(idx)}
                className={`h-2 rounded-full transition-all ${idx === sliderIdx ? "w-8 bg-gradient-to-r from-primary to-amber-500" : "w-2 bg-white/20 hover:bg-white/40"}`}
              />
            ))}
          </div>
        </div>
      ) : (
      <>
      <div className="relative overflow-hidden rounded-3xl border border-border bg-card/40 p-6 backdrop-blur md:p-10">
        <div className={`pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gradient-to-br ${color} opacity-20 blur-3xl`} />
        <div className="pointer-events-none absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

        <div className="relative grid items-center gap-8 md:grid-cols-[1fr_1.2fr]">
          {/* Stage */}
          <div className="relative mx-auto flex min-h-[280px] w-full max-w-md items-center justify-center md:min-h-[360px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -10 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="w-full"
              >
                {current.coverImage ? (
                  <CoverPhoto
                    src={current.coverImage}
                    color={color}
                    title={current.title}
                    subtitle={current.subtitle}
                    alt={current.coverAlt}
                  />
                ) : current.kind ? (
                  <DomainScreen
                    kind={current.kind}
                    color={color}
                    title={current.title}
                    subtitle={current.subtitle}
                  />
                ) : (
                  <MockScreen
                    title={current.title}
                    subtitle={current.subtitle}
                    icon={icon}
                    color={color}
                    variant={current.variant}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Caption */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={`cap-${i}`}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[10px] font-bold text-primary">
                  <Tag className="h-3 w-3" /> {current.tag ?? `اسکرین ${i + 1} از ${n}`}
                </div>
                <h3 className="mt-3 text-2xl font-black leading-tight md:text-3xl">{current.title}</h3>
                <p className="mt-3 leading-8 text-muted-foreground">{current.subtitle}</p>

                <div className="mt-6 flex items-center gap-3">
                  <button
                    onClick={() => go(-1)}
                    aria-label="قبلی"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white/5 backdrop-blur transition hover:bg-primary/15 hover:text-primary"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => go(1)}
                    aria-label="بعدی"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white/5 backdrop-blur transition hover:bg-primary/15 hover:text-primary"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>

                  <div className="flex items-center gap-1.5">
                    {screens.map((_, idx) => (
                      <button
                        key={idx}
                        aria-label={`اسکرین ${idx + 1}`}
                        onClick={() => setI(idx)}
                        className={`h-2 rounded-full transition-all ${idx === i ? "w-8 bg-gradient-to-r from-primary to-amber-500" : "w-2 bg-white/20 hover:bg-white/40"}`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {screens.map((s, idx) => (
          <button
            key={s.title + idx}
            onClick={() => setI(idx)}
            className={`group relative overflow-hidden rounded-xl border text-right backdrop-blur transition ${
              idx === i ? "border-primary/60 bg-primary/10" : "border-border bg-card/40 hover:border-primary/30"
            }`}
          >
            {s.coverImage && (
              <div className="relative h-16 w-full overflow-hidden">
                <img src={s.coverImage} alt={s.coverAlt ?? s.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-90 transition group-hover:opacity-100 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              </div>
            )}
            <div className="p-2">
              <div className="text-[10px] font-bold text-primary">
                {s.tag ?? `#${idx + 1}`}
              </div>
              <div className="mt-1 line-clamp-1 text-xs font-semibold">{s.title}</div>
              <div className="line-clamp-1 text-[10px] text-muted-foreground">{s.subtitle}</div>
            </div>
          </button>
        ))}
      </div>
      </>
      )}
    </div>
  );
}

