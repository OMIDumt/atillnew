import type { ScreenKind } from "@/lib/screen-kinds";

type Props = {
  kind: ScreenKind;
  color: string; // tailwind gradient "from-x to-y"
  title?: string;
  subtitle?: string;
};

/**
 * Domain-specific, fully-SVG "screenshots" that visually represent
 * each project / app (no external images). Each kind is a unique scene.
 */
export function DomainScreen({ kind, color, title, subtitle }: Props) {
  return (
    <Frame color={color} title={title} subtitle={subtitle} kind={kind}>
      {render(kind)}
    </Frame>
  );
}

function render(kind: ScreenKind) {
  switch (kind) {
    case "mammography":    return <Mammography />;
    case "mri-brain":      return <MRIBrain />;
    case "retina":         return <Retina />;
    case "ecg":            return <ECG />;
    case "vitals":         return <Vitals />;
    case "skin-scan":      return <SkinScan />;
    case "dental-xray":    return <DentalXRay />;
    case "pill":           return <PillID />;
    case "pediatric-bot":  return <PediatricBot />;
    case "mental-mood":    return <MentalMood />;
    case "defect-grid":    return <DefectGrid />;
    case "vibration":      return <Vibration />;
    case "ppe-cctv":       return <PPECctv />;
    case "weld-xray":      return <WeldXRay />;
    case "fraud-graph":    return <FraudGraph />;
    case "recommender":    return <Recommender />;
    case "city-traffic":   return <CityTraffic />;
    case "bayes-chart":    return <BayesChart />;
    case "llm-train":      return <LLMTrain />;
    case "chat-rtl":       return <ChatRTL />;
    case "legal-doc":      return <LegalDoc />;
    case "pose-tracking":  return <PoseTracking />;
    case "tutor-quiz":     return <TutorQuiz />;
    case "crm-pipeline":   return <CRMPipeline />;
    case "map-tour":       return <MapTour />;
    case "plate-anpr":     return <PlateANPR />;
    case "leaf-disease":   return <LeafDisease />;
    case "stt-waveform":   return <STTWave />;
  }
}

/* ---------- Frame ---------- */
function Frame({
  color, title, subtitle, kind, children,
}: { color: string; title?: string; subtitle?: string; kind: ScreenKind; children: React.ReactNode }) {
  const isPhone = kind === "skin-scan" || kind === "pediatric-bot" || kind === "mental-mood" || kind === "chat-rtl" || kind === "pose-tracking" || kind === "map-tour";
  if (isPhone) {
    return (
      <div className="relative mx-auto aspect-[9/16] w-full max-w-[260px] overflow-hidden rounded-[2.2rem] border-[7px] border-black/80 bg-black shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] ring-1 ring-white/10">
        <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-30`} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,rgba(255,255,255,0.18),transparent_60%)]" />
        <div className="pointer-events-none absolute -inset-12 bg-[conic-gradient(from_0deg,rgba(251,191,36,0.18),rgba(168,85,247,0.14),rgba(14,165,233,0.18),rgba(251,191,36,0.18))] opacity-40 blur-2xl" />
        <div className="absolute left-1/2 top-1.5 z-10 h-4 w-20 -translate-x-1/2 rounded-full bg-black" />
        <div className="relative flex h-full flex-col p-3 pt-7 text-white">
          {title && (
            <div className="mb-2 flex items-center justify-between">
              <div className="text-[11px] font-black leading-tight">{title}</div>
              <span className="rounded-full bg-emerald-500/20 px-1.5 py-0.5 text-[8px] font-bold text-emerald-300 ring-1 ring-emerald-400/40">LIVE</span>
            </div>
          )}
          <div className="relative flex-1 overflow-hidden rounded-2xl bg-black/40 ring-1 ring-white/10">
            {children}
            <div className="pointer-events-none absolute -inset-x-1/2 -top-1/2 h-[200%] w-[200%] rotate-[18deg] bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
            <div className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_0_60px_rgba(0,0,0,0.55)]" />
          </div>
          {subtitle && <div className="mt-2 text-[9px] opacity-70">{subtitle}</div>}
        </div>
      </div>
    );
  }
  // dashboard / window
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0a0d12] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] ring-1 ring-white/5">
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-[0.22]`} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(255,255,255,0.10),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_85%,rgba(251,191,36,0.10),transparent_55%)]" />
      <div className="pointer-events-none absolute -inset-16 bg-[conic-gradient(from_120deg,rgba(251,191,36,0.10),rgba(99,102,241,0.10),rgba(14,165,233,0.10),rgba(251,191,36,0.10))] opacity-50 blur-3xl" />
      <div className="relative flex items-center gap-1.5 border-b border-white/10 bg-black/50 px-3 py-2 backdrop-blur">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/80 shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80 shadow-[0_0_8px_rgba(234,179,8,0.6)]" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-500/80 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
        <div className="mx-auto flex items-center gap-1.5 rounded-md bg-white/10 px-3 py-0.5 text-[10px] text-white/70 ring-1 ring-white/10">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          atil.ai · {kind}
        </div>
        <span className="rounded-full border border-amber-400/40 bg-amber-400/15 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-amber-300">Pro</span>
      </div>
      <div className="relative h-[calc(100%-2rem)] p-3 text-white">
        {title && (
          <div className="mb-2 flex items-center justify-between">
            <div className="text-[11px] font-black tracking-wide">{title}</div>
            <div className="flex items-center gap-1.5">
              <span className="rounded-full bg-emerald-500/20 px-1.5 py-0.5 text-[8px] font-bold text-emerald-300 ring-1 ring-emerald-400/40">LIVE</span>
              <span className="text-[8px] font-bold text-white/40">v4.2</span>
            </div>
          </div>
        )}
        <div className="relative h-[calc(100%-1.25rem)] overflow-hidden rounded-xl bg-black/50 ring-1 ring-white/10">
          {children}
          <div className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:repeating-linear-gradient(0deg,#fff_0px,#fff_1px,transparent_1px,transparent_3px)]" />
          <div className="pointer-events-none absolute -inset-x-1/2 -top-1/2 h-[200%] w-[200%] rotate-[18deg] bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />
          <div className="pointer-events-none absolute inset-0 rounded-xl shadow-[inset_0_0_80px_rgba(0,0,0,0.6)]" />
        </div>
      </div>
    </div>
  );
}

/* ===== Primitives ===== */
const C = "stroke-current text-white/70";

/* ----- Medical ----- */
function Mammography() {
  return (
    <svg viewBox="0 0 400 220" className="absolute inset-0 h-full w-full">
      <defs>
        <radialGradient id="breast" cx="50%" cy="55%" r="55%">
          <stop offset="0%" stopColor="#f4e1d4" />
          <stop offset="60%" stopColor="#8a5b48" />
          <stop offset="100%" stopColor="#1a0f0c" />
        </radialGradient>
        <radialGradient id="lesion" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff5d8f" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#ffae00" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#ffae00" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="220" fill="#08060a" />
      <ellipse cx="200" cy="120" rx="140" ry="95" fill="url(#breast)" />
      <ellipse cx="245" cy="100" rx="40" ry="28" fill="url(#lesion)" />
      <rect x="218" y="80" width="56" height="42" fill="none" stroke="#ff3d71" strokeWidth="1.5" strokeDasharray="3 3" />
      <text x="222" y="76" fill="#ff3d71" fontSize="9" fontWeight="700">malignant · 0.94</text>
      {/* side panel */}
      <g transform="translate(8,8)">
        <rect width="86" height="56" rx="6" fill="rgba(0,0,0,0.55)" stroke="rgba(255,255,255,0.15)" />
        <text x="8" y="16" fill="#ffcb5b" fontSize="9" fontWeight="800">BI-RADS 4C</text>
        <text x="8" y="30" fill="#ddd" fontSize="8">ViT-L · GradCAM</text>
        <text x="8" y="44" fill="#9be29b" fontSize="8">AUC 0.97</text>
      </g>
    </svg>
  );
}

function MRIBrain() {
  return (
    <svg viewBox="0 0 400 220" className="absolute inset-0 h-full w-full">
      <rect width="400" height="220" fill="#04060a" />
      {[40, 165, 290].map((cx, i) => (
        <g key={cx}>
          <defs>
            <radialGradient id={`b${i}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#cfd6e0" />
              <stop offset="80%" stopColor="#3a4654" />
              <stop offset="100%" stopColor="#0c1018" />
            </radialGradient>
          </defs>
          <ellipse cx={cx + 50} cy="110" rx="55" ry="70" fill={`url(#b${i})`} />
          <path d={`M${cx + 25} 90 Q${cx + 50} 60 ${cx + 75} 90 Q${cx + 70} 130 ${cx + 50} 150 Q${cx + 30} 130 ${cx + 25} 90Z`}
            fill="none" stroke="#5e6f86" strokeWidth="0.8" />
          {/* tumor overlay */}
          <ellipse cx={cx + 60} cy="100" rx="14" ry="10" fill="#ff4d6d" opacity="0.55" />
          <ellipse cx={cx + 60} cy="100" rx="8" ry="6" fill="#ffd166" opacity="0.7" />
          <text x={cx + 8} y="190" fill="#bcd3f5" fontSize="9" fontWeight="700">{["Axial","Sagittal","Coronal"][i]}</text>
        </g>
      ))}
      <g transform="translate(8,8)">
        <rect width="96" height="44" rx="6" fill="rgba(0,0,0,0.6)" stroke="rgba(255,255,255,0.15)" />
        <text x="8" y="16" fill="#7ee8fa" fontSize="9" fontWeight="800">nnU-Net 3D</text>
        <text x="8" y="30" fill="#9be29b" fontSize="8">Dice 0.91 · BraTS</text>
      </g>
    </svg>
  );
}

function Retina() {
  return (
    <svg viewBox="0 0 400 220" className="absolute inset-0 h-full w-full">
      <defs>
        <radialGradient id="ret" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffb74a" />
          <stop offset="60%" stopColor="#a83a1a" />
          <stop offset="100%" stopColor="#1a0703" />
        </radialGradient>
      </defs>
      <rect width="400" height="220" fill="#04030a" />
      <circle cx="180" cy="110" r="100" fill="url(#ret)" />
      {/* vessels */}
      <g stroke="#5b0e0e" strokeWidth="1.2" fill="none" opacity="0.85">
        <path d="M180 110 Q150 60 100 50" /><path d="M180 110 Q220 60 270 50" />
        <path d="M180 110 Q140 160 100 180" /><path d="M180 110 Q230 160 280 180" />
        <path d="M180 110 Q165 90 130 95" /><path d="M180 110 Q200 130 240 130" />
      </g>
      {/* lesions */}
      {[[150,80,4],[210,130,3],[155,140,3.5],[200,75,2.5],[170,60,2]].map(([x,y,r],i)=>(
        <circle key={i} cx={x} cy={y} r={r} fill="#ffe66d" stroke="#fff" strokeWidth="0.6" />
      ))}
      {/* class bar */}
      <g transform="translate(290,30)">
        {["No","Mild","Mod","Severe","PDR"].map((t,i)=>(
          <g key={t} transform={`translate(0,${i*30})`}>
            <text x="0" y="10" fill="#ddd" fontSize="9">{t}</text>
            <rect x="40" y="2" width="60" height="10" rx="2" fill="rgba(255,255,255,0.12)" />
            <rect x="40" y="2" width={[10,18,52,40,22][i]} height="10" rx="2"
              fill={i===2?"#ff5d8f":"#7ee8fa"} />
          </g>
        ))}
      </g>
    </svg>
  );
}

function ECG() {
  // generate an ECG-like polyline
  const pts: string[] = [];
  for (let i = 0; i < 400; i++) {
    const x = i;
    const t = i % 80;
    let y = 110;
    if (t === 18) y = 100;
    else if (t === 20) y = 60;       // R
    else if (t === 22) y = 140;      // S
    else if (t === 24) y = 110;
    else if (t === 35) y = 100;      // T
    else if (t === 38) y = 95;
    else if (t === 41) y = 110;
    else y = 110 + Math.sin(i / 4) * 1.5;
    pts.push(`${x},${y}`);
  }
  return (
    <svg viewBox="0 0 400 220" className="absolute inset-0 h-full w-full">
      <rect width="400" height="220" fill="#02100a" />
      {/* grid */}
      {Array.from({ length: 22 }).map((_, i) => (
        <line key={"v"+i} x1={i*20} y1="0" x2={i*20} y2="220" stroke="#0e3a26" strokeWidth="0.5" />
      ))}
      {Array.from({ length: 12 }).map((_, i) => (
        <line key={"h"+i} x1="0" y1={i*20} x2="400" y2={i*20} stroke="#0e3a26" strokeWidth="0.5" />
      ))}
      <polyline points={pts.join(" ")} fill="none" stroke="#39ff88" strokeWidth="1.8" />
      <g transform="translate(8,8)">
        <rect width="120" height="48" rx="6" fill="rgba(0,0,0,0.6)" stroke="rgba(255,255,255,0.15)" />
        <text x="8" y="16" fill="#39ff88" fontSize="10" fontWeight="800">HR 78 bpm</text>
        <text x="8" y="30" fill="#ddd" fontSize="9">Lead II · 25 mm/s</text>
        <text x="8" y="42" fill="#ffd166" fontSize="9">SVT detected · 1D-CNN</text>
      </g>
    </svg>
  );
}

function Vitals() {
  const bars = [55, 62, 48, 80, 71, 90, 66, 78, 84, 60, 73, 88];
  return (
    <svg viewBox="0 0 400 220" className="absolute inset-0 h-full w-full">
      <rect width="400" height="220" fill="#06070d" />
      {/* tiles */}
      {[
        { x: 8, y: 8, t: "HR", v: "78", u: "bpm", c: "#ff5d8f" },
        { x: 100, y: 8, t: "SpO₂", v: "97%", u: "", c: "#7ee8fa" },
        { x: 192, y: 8, t: "BP", v: "118/76", u: "", c: "#ffd166" },
        { x: 296, y: 8, t: "Temp", v: "36.7°", u: "", c: "#a78bfa" },
      ].map((m) => (
        <g key={m.t} transform={`translate(${m.x},${m.y})`}>
          <rect width="92" height="56" rx="8" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" />
          <text x="8" y="16" fill="#aaa" fontSize="9">{m.t}</text>
          <text x="8" y="38" fill={m.c} fontSize="18" fontWeight="800">{m.v}</text>
          <text x="60" y="38" fill="#888" fontSize="9">{m.u}</text>
        </g>
      ))}
      {/* trend */}
      <g transform="translate(8,76)">
        <rect width="384" height="136" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" />
        <polyline
          points={bars.map((b, i) => `${20 + i * 30},${120 - b}`).join(" ")}
          fill="none" stroke="#7ee8fa" strokeWidth="2" />
        {bars.map((b, i) => (
          <circle key={i} cx={20 + i * 30} cy={120 - b} r="2.5" fill="#fff" />
        ))}
        <text x="12" y="14" fill="#7ee8fa" fontSize="9" fontWeight="800">24h trend</text>
      </g>
    </svg>
  );
}

function SkinScan() {
  return (
    <svg viewBox="0 0 200 320" className="absolute inset-0 h-full w-full">
      <defs>
        <radialGradient id="skin" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#f4cbac" />
          <stop offset="100%" stopColor="#7a4a36" />
        </radialGradient>
      </defs>
      <rect width="200" height="320" fill="#0c0710" />
      <rect x="20" y="40" width="160" height="200" rx="14" fill="url(#skin)" />
      <ellipse cx="110" cy="135" rx="22" ry="16" fill="#3a1a10" />
      <ellipse cx="106" cy="130" rx="10" ry="7" fill="#1a0808" />
      <rect x="82" y="113" width="56" height="46" fill="none" stroke="#ff3d71" strokeWidth="1.5" strokeDasharray="3 3" />
      <g transform="translate(20,250)">
        <rect width="160" height="56" rx="10" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)" />
        <text x="10" y="18" fill="#ff3d71" fontSize="10" fontWeight="800">Melanoma · 0.88</text>
        <text x="10" y="34" fill="#ddd" fontSize="9">Asymmetry · Border ✓</text>
        <text x="10" y="48" fill="#9be29b" fontSize="9">Consult dermatologist</text>
      </g>
    </svg>
  );
}

function DentalXRay() {
  return (
    <svg viewBox="0 0 400 220" className="absolute inset-0 h-full w-full">
      <rect width="400" height="220" fill="#0a0a0c" />
      <path d="M40 130 Q200 30 360 130 L360 175 Q200 110 40 175 Z" fill="#1c2230" stroke="#3a4660" />
      {/* teeth */}
      {Array.from({ length: 14 }).map((_, i) => {
        const x = 60 + i * 22;
        const y = 130 - Math.sin((i / 13) * Math.PI) * 60;
        return <rect key={i} x={x} y={y} width="16" height="32" rx="3" fill="#e8e8ee" stroke="#5b6479" />;
      })}
      {/* caries markers */}
      {[2, 6, 11].map((i) => {
        const x = 60 + i * 22 + 8;
        const y = 130 - Math.sin((i / 13) * Math.PI) * 60 + 14;
        return <g key={i}>
          <circle cx={x} cy={y} r="6" fill="none" stroke="#ff3d71" strokeWidth="1.5" />
          <text x={x + 8} y={y - 6} fill="#ff3d71" fontSize="8" fontWeight="700">caries</text>
        </g>;
      })}
      <g transform="translate(8,8)">
        <rect width="120" height="44" rx="6" fill="rgba(0,0,0,0.55)" stroke="rgba(255,255,255,0.15)" />
        <text x="8" y="16" fill="#ffd166" fontSize="9" fontWeight="800">Panoramic · YOLOv8</text>
        <text x="8" y="30" fill="#9be29b" fontSize="8">3 findings · mAP 0.89</text>
      </g>
    </svg>
  );
}

function PillID() {
  return (
    <svg viewBox="0 0 400 220" className="absolute inset-0 h-full w-full">
      <rect width="400" height="220" fill="#08070d" />
      {/* pills */}
      {[
        { x: 60, y: 70, c: "#ff5d8f", w: 70, h: 28 },
        { x: 70, y: 130, c: "#7ee8fa", w: 56, h: 26 },
      ].map((p, i) => (
        <g key={i}>
          <rect x={p.x} y={p.y} width={p.w} height={p.h} rx={p.h / 2} fill={p.c} />
          <line x1={p.x + p.w / 2} y1={p.y} x2={p.x + p.w / 2} y2={p.y + p.h} stroke="rgba(0,0,0,0.4)" />
        </g>
      ))}
      <rect x="40" y="50" width="120" height="130" fill="none" stroke="#ffd166" strokeWidth="1.5" strokeDasharray="4 3" />
      <g transform="translate(180,18)">
        {[
          { n: "Amoxicillin 500mg", s: 0.97 },
          { n: "Ibuprofen 400mg",   s: 0.84 },
          { n: "Cetirizine 10mg",   s: 0.61 },
        ].map((m, i) => (
          <g key={m.n} transform={`translate(0,${i * 56})`}>
            <rect width="200" height="48" rx="8" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" />
            <text x="10" y="18" fill="#fff" fontSize="11" fontWeight="700">{m.n}</text>
            <rect x="10" y="26" width="180" height="6" rx="3" fill="rgba(255,255,255,0.1)" />
            <rect x="10" y="26" width={180 * m.s} height="6" rx="3" fill={i === 0 ? "#9be29b" : "#7ee8fa"} />
            <text x="170" y="42" fill="#9be29b" fontSize="9">{Math.round(m.s * 100)}%</text>
          </g>
        ))}
      </g>
    </svg>
  );
}

function PediatricBot() {
  return (
    <svg viewBox="0 0 200 320" className="absolute inset-0 h-full w-full">
      <rect width="200" height="320" fill="#0b0814" />
      <g transform="translate(10,16)">
        {[
          { who: "👩‍👧", t: "تب ۳۸ و سرفه از دیشب", me: false, c: "#7ee8fa" },
          { who: "🤖", t: "آیا گلودرد یا کهیر دیده شده؟", me: true, c: "#a78bfa" },
          { who: "👩‍👧", t: "گلودرد دارد. ۴ ساله است.", me: false, c: "#7ee8fa" },
          { who: "🤖", t: "احتمال عفونت گلو • مراجعه ۲۴h", me: true, c: "#a78bfa" },
        ].map((b, i) => (
          <g key={i} transform={`translate(0,${i * 56})`}>
            <rect x={b.me ? 24 : 0} y="0" width="156" height="44" rx="10"
              fill={b.me ? "rgba(167,139,250,0.18)" : "rgba(126,232,250,0.14)"} stroke={`${b.c}55`} />
            <text x={b.me ? 36 : 12} y="18" fill="#fff" fontSize="9" fontWeight="700">{b.who}</text>
            <text x={b.me ? 36 : 12} y="34" fill="#e5e5ef" fontSize="9">{b.t}</text>
          </g>
        ))}
      </g>
    </svg>
  );
}

function MentalMood() {
  return (
    <svg viewBox="0 0 200 320" className="absolute inset-0 h-full w-full">
      <defs>
        <radialGradient id="aur" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#1a103a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="200" height="320" fill="#0a081a" />
      <circle cx="100" cy="120" r="80" fill="url(#aur)" />
      <circle cx="100" cy="120" r="58" fill="none" stroke="#a78bfa" strokeWidth="1.5" strokeDasharray="4 4" />
      <text x="100" y="118" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="900">7.2</text>
      <text x="100" y="138" textAnchor="middle" fill="#bdb6f6" fontSize="9">Mood Score · 7d</text>
      {/* weekly mood dots */}
      <g transform="translate(20,230)">
        {[5,6,4,7,8,6,7].map((v,i)=>(
          <g key={i}>
            <circle cx={i*24+8} cy={50-v*5} r="5" fill={["#ff6b6b","#ffae00","#ffae00","#9be29b","#7ee8fa","#a78bfa","#9be29b"][i]} />
            <text x={i*24+2} y="68" fill="#888" fontSize="8">{["S","M","T","W","T","F","S"][i]}</text>
          </g>
        ))}
      </g>
    </svg>
  );
}

function DefectGrid() {
  return (
    <svg viewBox="0 0 400 220" className="absolute inset-0 h-full w-full">
      <defs>
        <pattern id="steel" width="20" height="20" patternUnits="userSpaceOnUse">
          <rect width="20" height="20" fill="#28323c" />
          <path d="M0 10 L20 10" stroke="#1c2530" strokeWidth="0.6" />
          <path d="M10 0 L10 20" stroke="#1c2530" strokeWidth="0.6" />
        </pattern>
      </defs>
      <rect width="400" height="220" fill="url(#steel)" />
      {/* scratches */}
      <path d="M40 60 L380 80" stroke="#7a8693" strokeWidth="0.8" opacity="0.6" />
      <path d="M20 160 L370 150" stroke="#7a8693" strokeWidth="0.6" opacity="0.5" />
      {/* defects */}
      {[
        { x: 80, y: 50, w: 60, h: 30, lbl: "scratch · 0.92" },
        { x: 220, y: 110, w: 50, h: 40, lbl: "pitted · 0.87" },
        { x: 310, y: 60, w: 40, h: 30, lbl: "patches · 0.74" },
      ].map((d, i) => (
        <g key={i}>
          <rect x={d.x} y={d.y} width={d.w} height={d.h} fill="none" stroke="#ff3d71" strokeWidth="1.5" />
          <rect x={d.x} y={d.y - 14} width="100" height="12" fill="#ff3d71" />
          <text x={d.x + 4} y={d.y - 4} fill="#fff" fontSize="8" fontWeight="700">{d.lbl}</text>
        </g>
      ))}
      <g transform="translate(8,8)">
        <rect width="110" height="40" rx="6" fill="rgba(0,0,0,0.55)" stroke="rgba(255,255,255,0.15)" />
        <text x="8" y="16" fill="#ffd166" fontSize="9" fontWeight="800">YOLOv8 · QC line</text>
        <text x="8" y="30" fill="#9be29b" fontSize="8">mAP 0.89 · 38ms</text>
      </g>
    </svg>
  );
}

function Vibration() {
  // FFT-like spectrum
  const bars = Array.from({ length: 60 }).map((_, i) =>
    20 + Math.abs(Math.sin(i / 3)) * 70 + (i === 28 ? 80 : 0) + (i === 42 ? 50 : 0));
  return (
    <svg viewBox="0 0 400 220" className="absolute inset-0 h-full w-full">
      <rect width="400" height="220" fill="#050b14" />
      {/* spectrum */}
      <g transform="translate(20,30)">
        {bars.map((h, i) => (
          <rect key={i} x={i * 6} y={160 - h} width="4" height={h}
            fill={i === 28 ? "#ff3d71" : i === 42 ? "#ffd166" : "#7ee8fa"} opacity="0.9" />
        ))}
        <line x1="0" y1="160" x2="360" y2="160" stroke="#244" />
        <text x="0" y="178" fill="#7ee8fa" fontSize="8">FFT · vibration spectrum (Hz)</text>
        <text x="160" y="20" fill="#ff3d71" fontSize="9" fontWeight="800">⚠ bearing fault peak</text>
      </g>
      <g transform="translate(8,8)">
        <rect width="140" height="18" rx="4" fill="rgba(0,0,0,0.5)" stroke="rgba(255,255,255,0.12)" />
        <text x="8" y="13" fill="#ffd166" fontSize="9" fontWeight="800">RUL: 142h · Confidence 0.91</text>
      </g>
    </svg>
  );
}

function PPECctv() {
  return (
    <svg viewBox="0 0 400 220" className="absolute inset-0 h-full w-full">
      <defs>
        <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1a2230" />
          <stop offset="1" stopColor="#0a0e16" />
        </linearGradient>
      </defs>
      <rect width="400" height="220" fill="url(#floor)" />
      {/* girders */}
      <path d="M0 70 L400 70" stroke="#3a4658" strokeWidth="2" />
      <path d="M0 70 L60 0 M120 70 L180 0 M240 70 L300 0 M360 70 L400 10" stroke="#3a4658" strokeWidth="1" />
      {/* workers */}
      {[{ x: 70, ok: true }, { x: 180, ok: false }, { x: 290, ok: true }].map((w, i) => (
        <g key={i} transform={`translate(${w.x},120)`}>
          <ellipse cx="0" cy="-30" rx="10" ry="12" fill="#f1c19a" />
          {w.ok && <path d="M-12 -32 Q0 -50 12 -32 Z" fill="#ffd166" />}
          <rect x="-12" y="-18" width="24" height="36" rx="3" fill="#ff8c42" />
          <line x1="-8" y1="20" x2="-8" y2="40" stroke="#1a1a1a" strokeWidth="3" />
          <line x1="8" y1="20" x2="8" y2="40" stroke="#1a1a1a" strokeWidth="3" />
          <rect x="-22" y="-58" width="44" height="100" fill="none"
            stroke={w.ok ? "#9be29b" : "#ff3d71"} strokeWidth="1.5" />
          <text x="-22" y="-62" fill={w.ok ? "#9be29b" : "#ff3d71"} fontSize="8" fontWeight="800">
            {w.ok ? "PPE ✓ 0.96" : "NO HELMET · 0.92"}
          </text>
        </g>
      ))}
      <g transform="translate(8,8)">
        <rect width="130" height="18" rx="4" fill="rgba(0,0,0,0.55)" stroke="rgba(255,255,255,0.15)" />
        <text x="8" y="13" fill="#ff3d71" fontSize="9" fontWeight="800">⚠ 1 violation · Camera #07</text>
      </g>
    </svg>
  );
}

function WeldXRay() {
  return (
    <svg viewBox="0 0 400 220" className="absolute inset-0 h-full w-full">
      <defs>
        <linearGradient id="weld" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3a3a3a" />
          <stop offset="0.5" stopColor="#bcbcbc" />
          <stop offset="1" stopColor="#3a3a3a" />
        </linearGradient>
      </defs>
      <rect width="400" height="220" fill="#0a0a0a" />
      <rect x="0" y="90" width="400" height="50" fill="url(#weld)" />
      {/* bead texture */}
      {Array.from({ length: 30 }).map((_, i) => (
        <ellipse key={i} cx={10 + i * 14} cy="115" rx="7" ry="20" fill="#888" opacity="0.4" />
      ))}
      {/* defects */}
      {[{ x: 110, t: "porosity" }, { x: 230, t: "crack" }, { x: 320, t: "slag" }].map((d, i) => (
        <g key={i}>
          <circle cx={d.x} cy="115" r="14" fill="none" stroke="#ff3d71" strokeWidth="1.5" />
          <text x={d.x - 22} y="90" fill="#ff3d71" fontSize="9" fontWeight="700">{d.t}</text>
        </g>
      ))}
      <g transform="translate(8,8)">
        <rect width="120" height="40" rx="6" fill="rgba(0,0,0,0.55)" stroke="rgba(255,255,255,0.15)" />
        <text x="8" y="16" fill="#ffd166" fontSize="9" fontWeight="800">RT-Weld · U-Net</text>
        <text x="8" y="30" fill="#9be29b" fontSize="8">IoU 0.83 · ISO 5817</text>
      </g>
    </svg>
  );
}

function FraudGraph() {
  const nodes = [
    { x: 200, y: 110, r: 18, c: "#ff3d71" },
    { x: 90, y: 60, r: 10, c: "#7ee8fa" }, { x: 90, y: 160, r: 10, c: "#7ee8fa" },
    { x: 310, y: 60, r: 10, c: "#7ee8fa" }, { x: 310, y: 160, r: 10, c: "#7ee8fa" },
    { x: 40, y: 110, r: 8, c: "#a78bfa" }, { x: 360, y: 110, r: 8, c: "#a78bfa" },
    { x: 150, y: 30, r: 7, c: "#ffd166" }, { x: 250, y: 30, r: 7, c: "#ffd166" },
    { x: 150, y: 190, r: 7, c: "#ffd166" }, { x: 250, y: 190, r: 7, c: "#ffd166" },
  ];
  return (
    <svg viewBox="0 0 400 220" className="absolute inset-0 h-full w-full">
      <rect width="400" height="220" fill="#05070d" />
      <g stroke="#445" strokeWidth="0.8">
        {nodes.slice(1).map((n, i) => (
          <line key={i} x1={200} y1={110} x2={n.x} y2={n.y} />
        ))}
        <line x1="90" y1="60" x2="40" y2="110" />
        <line x1="90" y1="160" x2="40" y2="110" />
        <line x1="310" y1="60" x2="360" y2="110" />
        <line x1="310" y1="160" x2="360" y2="110" />
        <line x1="90" y1="60" x2="150" y2="30" />
        <line x1="310" y1="60" x2="250" y2="30" />
      </g>
      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r={n.r + 4} fill={n.c} opacity="0.15" />
          <circle cx={n.x} cy={n.y} r={n.r} fill={n.c} />
        </g>
      ))}
      <text x="200" y="115" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="800">FRAUD</text>
      <g transform="translate(8,8)">
        <rect width="160" height="40" rx="6" fill="rgba(0,0,0,0.6)" stroke="rgba(255,255,255,0.15)" />
        <text x="8" y="16" fill="#ff3d71" fontSize="9" fontWeight="800">Ring detected · 11 accts</text>
        <text x="8" y="30" fill="#9be29b" fontSize="8">GraphSAGE · AUC 0.99</text>
      </g>
    </svg>
  );
}

function Recommender() {
  return (
    <svg viewBox="0 0 400 220" className="absolute inset-0 h-full w-full">
      <rect width="400" height="220" fill="#06070d" />
      {/* user avatar */}
      <g transform="translate(14,14)">
        <circle cx="20" cy="20" r="20" fill="#a78bfa" />
        <text x="20" y="24" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="800">U</text>
        <text x="50" y="18" fill="#fff" fontSize="11" fontWeight="700">For you</text>
        <text x="50" y="32" fill="#888" fontSize="9">CF · Two-Tower · 1.3M items</text>
      </g>
      {/* product cards */}
      {[0,1,2,3].map((i) => (
        <g key={i} transform={`translate(${20 + i * 92},80)`}>
          <rect width="80" height="120" rx="10" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" />
          <rect x="8" y="8" width="64" height="60" rx="6" fill={["#ff5d8f","#7ee8fa","#ffd166","#9be29b"][i]} opacity="0.85" />
          <rect x="8" y="76" width="50" height="8" rx="2" fill="rgba(255,255,255,0.3)" />
          <rect x="8" y="88" width="34" height="6" rx="2" fill="rgba(255,255,255,0.2)" />
          <text x="8" y="110" fill="#9be29b" fontSize="9" fontWeight="800">★ {(0.95 - i * 0.07).toFixed(2)}</text>
        </g>
      ))}
    </svg>
  );
}

function CityTraffic() {
  return (
    <svg viewBox="0 0 400 220" className="absolute inset-0 h-full w-full">
      <rect width="400" height="220" fill="#06070d" />
      {/* map */}
      <g transform="translate(8,8)">
        <rect width="240" height="200" rx="10" fill="#0e1422" stroke="rgba(255,255,255,0.08)" />
        <path d="M20 40 L220 40 M20 100 L220 100 M20 160 L220 160 M60 20 L60 180 M140 20 L140 180 M200 20 L200 180"
          stroke="#243044" strokeWidth="1.5" />
        {/* hotspots */}
        <circle cx="60" cy="40" r="10" fill="#ff3d71" opacity="0.7" />
        <circle cx="140" cy="100" r="14" fill="#ffd166" opacity="0.7" />
        <circle cx="200" cy="160" r="8" fill="#9be29b" opacity="0.7" />
        <text x="10" y="194" fill="#7ee8fa" fontSize="9">Tabriz · live traffic</text>
      </g>
      {/* kpis */}
      <g transform="translate(260,16)">
        {[
          { t: "Avg speed", v: "34 km/h", c: "#ffd166" },
          { t: "Congestion", v: "62%", c: "#ff3d71" },
          { t: "AQI", v: "78", c: "#9be29b" },
        ].map((m, i) => (
          <g key={m.t} transform={`translate(0,${i * 56})`}>
            <rect width="130" height="48" rx="8" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" />
            <text x="10" y="18" fill="#aaa" fontSize="9">{m.t}</text>
            <text x="10" y="38" fill={m.c} fontSize="16" fontWeight="800">{m.v}</text>
          </g>
        ))}
      </g>
    </svg>
  );
}

function BayesChart() {
  return (
    <svg viewBox="0 0 400 220" className="absolute inset-0 h-full w-full">
      <rect width="400" height="220" fill="#06070d" />
      <g transform="translate(20,20)">
        <line x1="0" y1="170" x2="360" y2="170" stroke="#445" />
        <line x1="0" y1="0" x2="0" y2="170" stroke="#445" />
        {/* posterior */}
        <path d="M0 170 Q90 30 180 30 Q270 30 360 170" fill="rgba(126,232,250,0.18)" stroke="#7ee8fa" strokeWidth="2" />
        {/* prior */}
        <path d="M0 170 Q90 80 180 80 Q270 80 360 170" fill="none" stroke="#a78bfa" strokeWidth="1.5" strokeDasharray="4 3" />
        {/* samples */}
        {Array.from({ length: 60 }).map((_, i) => {
          const x = 10 + i * 6 + (Math.sin(i) * 2);
          const y = 165 - Math.abs(Math.sin((i - 28) / 8)) * 70;
          return <circle key={i} cx={x} cy={y} r="1.6" fill="#ffd166" />;
        })}
        <text x="2" y="14" fill="#7ee8fa" fontSize="9" fontWeight="800">Posterior</text>
        <text x="2" y="26" fill="#a78bfa" fontSize="9">Prior</text>
        <text x="240" y="14" fill="#ffd166" fontSize="9">MCMC samples · 5k</text>
      </g>
    </svg>
  );
}

function LLMTrain() {
  // dropping loss curves
  const t = Array.from({ length: 80 });
  const train = t.map((_, i) => 3.6 * Math.exp(-i / 22) + 0.6 + Math.sin(i / 3) * 0.05);
  const val   = t.map((_, i) => 3.6 * Math.exp(-i / 25) + 0.8 + Math.sin(i / 4) * 0.07);
  const sx = (i: number) => 20 + i * 4.4;
  const sy = (v: number) => 180 - (4 - v) * 36;
  return (
    <svg viewBox="0 0 400 220" className="absolute inset-0 h-full w-full">
      <rect width="400" height="220" fill="#06070d" />
      <line x1="20" y1="180" x2="380" y2="180" stroke="#445" />
      <line x1="20" y1="20"  x2="20"  y2="180" stroke="#445" />
      <polyline fill="none" stroke="#7ee8fa" strokeWidth="2" points={train.map((v, i) => `${sx(i)},${sy(v)}`).join(" ")} />
      <polyline fill="none" stroke="#ff5d8f" strokeWidth="2" strokeDasharray="4 3" points={val.map((v, i) => `${sx(i)},${sy(v)}`).join(" ")} />
      <g transform="translate(28,28)">
        <text fill="#7ee8fa" fontSize="9" fontWeight="800">train_loss</text>
        <text y="14" fill="#ff5d8f" fontSize="9" fontWeight="800">val_loss</text>
        <text y="34" fill="#9be29b" fontSize="9">epoch 80 · BLEU 38.2</text>
      </g>
      <g transform="translate(260,18)">
        <rect width="120" height="44" rx="6" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" />
        <text x="8" y="16" fill="#ffd166" fontSize="9" fontWeight="800">LoRA · 7B Persian</text>
        <text x="8" y="30" fill="#aaa" fontSize="9">A100 · 4×24GB</text>
      </g>
    </svg>
  );
}

function ChatRTL() {
  return (
    <svg viewBox="0 0 200 320" className="absolute inset-0 h-full w-full">
      <rect width="200" height="320" fill="#0b0814" />
      <g transform="translate(10,16)">
        {[
          { me: false, t: "گزارش فروش فصل آخر را خلاصه کن" },
          { me: true,  t: "رشد ۱۸٪، حاشیه سود ۲۴٪، ۳ منطقه افت داشتند." },
          { me: false, t: "نمودار بده" },
          { me: true,  t: "📈 آماده شد. روند ۹۰ روزه + پیش‌بینی ۳۰ روز." },
        ].map((b, i) => (
          <g key={i} transform={`translate(0,${i * 60})`}>
            <rect x={b.me ? 20 : 0} y="0" width="160" height="48" rx="12"
              fill={b.me ? "rgba(255,205,91,0.15)" : "rgba(126,232,250,0.12)"}
              stroke={b.me ? "rgba(255,205,91,0.4)" : "rgba(126,232,250,0.35)"} />
            <text x={b.me ? 32 : 12} y="20" fill={b.me ? "#ffd166" : "#7ee8fa"} fontSize="8" fontWeight="800">
              {b.me ? "AtilGPT" : "شما"}
            </text>
            <text x={b.me ? 32 : 12} y="36" fill="#e5e5ef" fontSize="9" direction="rtl">{b.t}</text>
          </g>
        ))}
      </g>
    </svg>
  );
}

function LegalDoc() {
  return (
    <svg viewBox="0 0 400 220" className="absolute inset-0 h-full w-full">
      <rect width="400" height="220" fill="#06070d" />
      {/* document */}
      <g transform="translate(14,14)">
        <rect width="200" height="190" rx="6" fill="#f3eee4" />
        <rect x="14" y="14" width="170" height="8" fill="#0a0a0a" />
        {Array.from({ length: 14 }).map((_, i) => (
          <rect key={i} x="14" y={32 + i * 11} width={i % 4 === 3 ? 120 : 170} height="4" fill="#777" />
        ))}
        {/* highlights */}
        <rect x="14" y="65" width="170" height="11" fill="#ffe66d" opacity="0.6" />
        <rect x="14" y="120" width="120" height="11" fill="#ff8c42" opacity="0.55" />
      </g>
      {/* findings */}
      <g transform="translate(228,18)">
        {[
          { t: "بند ۷ — ریسک جریمه", c: "#ff3d71" },
          { t: "بند ۱۲ — ابهام تعهد", c: "#ffd166" },
          { t: "ماده ۲۱ — مطابق قانون", c: "#9be29b" },
          { t: "پیشنهاد اصلاح متن", c: "#7ee8fa" },
        ].map((m, i) => (
          <g key={i} transform={`translate(0,${i * 44})`}>
            <rect width="160" height="36" rx="6" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" />
            <circle cx="12" cy="18" r="5" fill={m.c} />
            <text x="24" y="22" fill="#fff" fontSize="9" fontWeight="700" direction="rtl">{m.t}</text>
          </g>
        ))}
      </g>
    </svg>
  );
}

function PoseTracking() {
  return (
    <svg viewBox="0 0 200 320" className="absolute inset-0 h-full w-full">
      <rect width="200" height="320" fill="#06070d" />
      {/* skeleton */}
      <g stroke="#7ee8fa" strokeWidth="2" fill="#7ee8fa">
        <circle cx="100" cy="70" r="14" fill="#7ee8fa" />
        <line x1="100" y1="84" x2="100" y2="160" />
        <line x1="100" y1="100" x2="60" y2="140" />
        <line x1="100" y1="100" x2="140" y2="140" />
        <line x1="60" y1="140" x2="50" y2="190" />
        <line x1="140" y1="140" x2="150" y2="190" />
        <line x1="100" y1="160" x2="80" y2="230" />
        <line x1="100" y1="160" x2="120" y2="230" />
        <line x1="80" y1="230" x2="70" y2="290" />
        <line x1="120" y1="230" x2="130" y2="290" />
        {[ [60,140],[140,140],[50,190],[150,190],[80,230],[120,230],[100,160],[70,290],[130,290] ].map(([x,y],i)=>(
          <circle key={i} cx={x} cy={y} r="3" />
        ))}
      </g>
      <g transform="translate(8,8)">
        <rect width="130" height="18" rx="4" fill="rgba(0,0,0,0.5)" />
        <text x="6" y="13" fill="#9be29b" fontSize="9" fontWeight="800">Squat · form 92%</text>
      </g>
      <g transform="translate(8,300)">
        <text fill="#ffd166" fontSize="9" fontWeight="700">۱۲/۱۵ تکرار</text>
      </g>
    </svg>
  );
}

function TutorQuiz() {
  return (
    <svg viewBox="0 0 400 220" className="absolute inset-0 h-full w-full">
      <rect width="400" height="220" fill="#06070d" />
      <g transform="translate(20,20)">
        <text fill="#7ee8fa" fontSize="10" fontWeight="800">سؤال ۳ از ۱۰ · ریاضی</text>
        <text y="22" fill="#fff" fontSize="13" fontWeight="700" direction="rtl">حد lim x→0 (sin x / x) برابر است با:</text>
        {["۰","۱","∞","تعریف نشده"].map((o, i) => (
          <g key={o} transform={`translate(0,${44 + i * 32})`}>
            <rect width="360" height="26" rx="6"
              fill={i === 1 ? "rgba(155,226,155,0.18)" : "rgba(255,255,255,0.04)"}
              stroke={i === 1 ? "#9be29b" : "rgba(255,255,255,0.1)"} />
            <text x="14" y="18" fill={i === 1 ? "#9be29b" : "#ddd"} fontSize="11" fontWeight="700">{o}</text>
            {i === 1 && <text x="320" y="18" fill="#9be29b" fontSize="10" fontWeight="800">✓</text>}
          </g>
        ))}
      </g>
    </svg>
  );
}

function CRMPipeline() {
  return (
    <svg viewBox="0 0 400 220" className="absolute inset-0 h-full w-full">
      <rect width="400" height="220" fill="#06070d" />
      {["Lead","Qualify","Proposal","Won"].map((s, i) => (
        <g key={s} transform={`translate(${10 + i * 96},10)`}>
          <rect width="86" height="200" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)" />
          <text x="8" y="16" fill={["#7ee8fa","#ffd166","#a78bfa","#9be29b"][i]} fontSize="9" fontWeight="800">{s}</text>
          {Array.from({ length: 3 - (i % 2) }).map((_, j) => (
            <g key={j} transform={`translate(6,${28 + j * 50})`}>
              <rect width="74" height="42" rx="6" fill="rgba(255,255,255,0.06)" />
              <rect x="6" y="6" width="40" height="6" rx="2" fill="rgba(255,255,255,0.3)" />
              <rect x="6" y="18" width="60" height="4" rx="2" fill="rgba(255,255,255,0.15)" />
              <text x="6" y="36" fill="#9be29b" fontSize="9" fontWeight="700">${(4 + j) * 12}k</text>
            </g>
          ))}
        </g>
      ))}
    </svg>
  );
}

function MapTour() {
  return (
    <svg viewBox="0 0 200 320" className="absolute inset-0 h-full w-full">
      <rect width="200" height="320" fill="#0e1422" />
      {/* streets */}
      <g stroke="#243044" strokeWidth="1.5">
        <path d="M0 80 L200 80" /><path d="M0 160 L200 160" /><path d="M0 240 L200 240" />
        <path d="M50 0 L50 320" /><path d="M120 0 L120 320" />
      </g>
      {/* river */}
      <path d="M0 200 Q80 220 200 180" fill="none" stroke="#3a6fb0" strokeWidth="6" opacity="0.7" />
      {/* pins */}
      {[{x:70,y:60,c:"#ff3d71",t:"بازار"},{x:130,y:140,c:"#ffd166",t:"کلیسا"},{x:60,y:230,c:"#7ee8fa",t:"موزه"},{x:150,y:260,c:"#9be29b",t:"کاخ"}].map((p,i)=>(
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="14" fill={p.c} opacity="0.25" />
          <circle cx={p.x} cy={p.y} r="6" fill={p.c} stroke="#fff" strokeWidth="1.5" />
        </g>
      ))}
      <g transform="translate(10,10)">
        <rect width="100" height="22" rx="6" fill="rgba(0,0,0,0.6)" />
        <text x="8" y="15" fill="#fff" fontSize="9" fontWeight="800">تور یک‌روزه تبریز</text>
      </g>
    </svg>
  );
}

function PlateANPR() {
  return (
    <svg viewBox="0 0 400 220" className="absolute inset-0 h-full w-full">
      <rect width="400" height="220" fill="#04050a" />
      {/* car */}
      <g transform="translate(60,60)">
        <rect x="0" y="40" width="220" height="60" rx="12" fill="#1d2630" />
        <path d="M30 40 Q60 0 110 0 L180 0 Q220 0 240 40 Z" fill="#1d2630" />
        <rect x="60" y="14" width="50" height="22" rx="3" fill="#7ee8fa" opacity="0.4" />
        <rect x="130" y="14" width="50" height="22" rx="3" fill="#7ee8fa" opacity="0.4" />
        <circle cx="50" cy="110" r="20" fill="#0a0a0a" stroke="#444" />
        <circle cx="200" cy="110" r="20" fill="#0a0a0a" stroke="#444" />
        {/* plate */}
        <rect x="80" y="75" width="90" height="22" rx="2" fill="#f4f4f4" stroke="#888" />
        <text x="86" y="91" fill="#0a0a0a" fontSize="13" fontWeight="800">۲۲ ج ۵۴۸ - ۳۳</text>
      </g>
      <rect x="120" y="125" width="120" height="32" fill="none" stroke="#9be29b" strokeWidth="1.5" strokeDasharray="3 3" />
      <text x="120" y="120" fill="#9be29b" fontSize="9" fontWeight="800">PLATE · 0.97</text>
      <g transform="translate(8,8)">
        <rect width="170" height="18" rx="4" fill="rgba(0,0,0,0.55)" />
        <text x="6" y="13" fill="#7ee8fa" fontSize="9" fontWeight="800">ANPR · YOLO+CRNN · 38ms</text>
      </g>
    </svg>
  );
}

function LeafDisease() {
  return (
    <svg viewBox="0 0 400 220" className="absolute inset-0 h-full w-full">
      <defs>
        <radialGradient id="leaf" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#7bc96f" />
          <stop offset="80%" stopColor="#1f4d1f" />
        </radialGradient>
      </defs>
      <rect width="400" height="220" fill="#06120a" />
      <path d="M200 30 Q60 110 200 200 Q340 110 200 30 Z" fill="url(#leaf)" />
      <path d="M200 30 L200 200 M200 60 L130 100 M200 60 L270 100 M200 100 L120 140 M200 100 L280 140 M200 140 L140 175 M200 140 L260 175"
        stroke="#0d2d0d" strokeWidth="1.2" fill="none" />
      {/* lesions */}
      {[{x:160,y:100,r:9},{x:230,y:130,r:11},{x:190,y:160,r:7}].map((s,i)=>(
        <g key={i}>
          <circle cx={s.x} cy={s.y} r={s.r + 3} fill="#5a2a0a" opacity="0.7" />
          <circle cx={s.x} cy={s.y} r={s.r} fill="#a64a1a" />
          <circle cx={s.x - 2} cy={s.y - 2} r={s.r / 2.5} fill="#3a1208" />
        </g>
      ))}
      <g transform="translate(8,8)">
        <rect width="160" height="40" rx="6" fill="rgba(0,0,0,0.55)" stroke="rgba(255,255,255,0.15)" />
        <text x="8" y="16" fill="#ffd166" fontSize="9" fontWeight="800">Tomato · Early Blight</text>
        <text x="8" y="30" fill="#9be29b" fontSize="8">Confidence 0.94 · spray today</text>
      </g>
    </svg>
  );
}

function STTWave() {
  // a stylized audio waveform with transcript
  const bars = Array.from({ length: 90 }).map((_, i) => {
    const env = Math.sin((i / 89) * Math.PI);
    const noise = 0.3 + Math.abs(Math.sin(i * 1.7)) * 0.7;
    return 6 + env * noise * 60;
  });
  return (
    <svg viewBox="0 0 400 220" className="absolute inset-0 h-full w-full">
      <rect width="400" height="220" fill="#06070d" />
      <g transform="translate(8,18)">
        <text fill="#7ee8fa" fontSize="9" fontWeight="800">گفتار فارسی · ۱۲ ثانیه</text>
        {bars.map((h, i) => (
          <rect key={i} x={i * 4} y={70 - h / 2} width="2.5" height={h}
            fill={i > 60 ? "#ff5d8f" : "#7ee8fa"} opacity="0.9" />
        ))}
      </g>
      <g transform="translate(8,140)">
        <rect width="384" height="60" rx="8" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" />
        <text x="10" y="22" fill="#ddd" fontSize="10" fontWeight="700" direction="rtl">
          «گزارش فروش هفتگی را برایم بفرست و</text>
        <text x="10" y="40" fill="#ddd" fontSize="10" fontWeight="700" direction="rtl">
          نمودار رشد ۳ ماه گذشته را اضافه کن.»</text>
        <text x="10" y="54" fill="#9be29b" fontSize="8">WER 5.8% · Whisper-fa</text>
      </g>
    </svg>
  );
}
