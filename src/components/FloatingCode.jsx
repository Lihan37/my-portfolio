import { useMemo } from "react";

/** Floating code symbols (text + SVG), evenly spread across the viewport — lighter/softer. */
export default function FloatingCode() {
  // --- layout/density ---
  const COLS = 8;
  const ROWS = 6;
  const DENSITY = 1;

  // --- visual softness controls ---
  const OPACITY_MIN = 0.10; // lower = lighter at rest
  const OPACITY_MAX = 0.32; // lower = lighter at mid-float
  const SIZE_BASE   = 0.7;  // was 0.8
  const SIZE_RAND   = 1.3;  // was 1.6
  const BLEND_MODE  = "screen"; // try "plus-lighter" if your browser supports it

  const TOKENS = [
    "</>", "{ }", "=>", "const", "async", "await", "npm", "yarn",
    "React()", "useEffect()", "map()", "reduce()", "Promise", "fetch()",
    "req.res", "try{}", "catch()", "return", "() => {}", "JSON.parse()",
  ];

  const Svgs = {
    CodeIcon: (props) => (
      <svg width="16" height="16" viewBox="0 0 24 24" {...props}>
        <path d="M9 18 3 12l6-6M15 6l6 6-6 6"
          stroke="currentColor" strokeWidth="2" fill="none"
          strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    BraceIcon: (props) => (
      <svg width="16" height="16" viewBox="0 0 24 24" {...props}>
        <path d="M10 4c-2 1-3 .5-3 3v3c0 1-.5 2-2 2 1 0 2 1 2 2v3c0 2 1 2 3 3M14 4c2 1 3 .5 3 3v3c0 1 .5 2 2 2-1 0-2 1-2 2v3c0 2-1 2-3 3"
          stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
      </svg>
    ),
    ReactIcon: (props) => (
      <svg width="16" height="16" viewBox="0 0 24 24" {...props}>
        <circle cx="12" cy="12" r="2.1" fill="currentColor"/>
        <ellipse cx="12" cy="12" rx="9" ry="3.6" fill="none" stroke="currentColor" strokeWidth="1.4"/>
        <ellipse cx="12" cy="12" rx="9" ry="3.6" fill="none" stroke="currentColor" strokeWidth="1.4" transform="rotate(60 12 12)"/>
        <ellipse cx="12" cy="12" rx="9" ry="3.6" fill="none" stroke="currentColor" strokeWidth="1.4" transform="rotate(120 12 12)"/>
      </svg>
    ),
  };

  const items = useMemo(() => {
    const out = [];
    const cellW = 100 / COLS;
    const cellH = 100 / ROWS;

    const pick = () => {
      const r = Math.random();
      if (r < 0.25) return { type: "svg", which: "ReactIcon" };
      if (r < 0.50) return { type: "svg", which: "CodeIcon" };
      if (r < 0.65) return { type: "svg", which: "BraceIcon" };
      return { type: "text", txt: TOKENS[(Math.random() * TOKENS.length) | 0] };
    };

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        for (let d = 0; d < DENSITY; d++) {
          const jitterX = (Math.random() * 0.6 - 0.3) * cellW;
          const jitterY = (Math.random() * 0.6 - 0.3) * cellH;
          const baseLeft = c * cellW + cellW / 2 + jitterX;
          const baseTop  = r * cellH + cellH / 2 + jitterY;

          const scale = SIZE_BASE + Math.random() * SIZE_RAND;
          const dur = 12 + Math.random() * 14;
          const delay = Math.random() * 8;
          const driftX = (Math.random() - 0.5) * 30;
          const driftY = (Math.random() - 0.5) * 30;

          out.push({
            posLeft: `${baseLeft}%`,
            posTop: `${baseTop}%`,
            scale, dur, delay, driftX, driftY,
            token: pick(),
          });
        }
      }
    }
    return out;
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <style>{`
        @keyframes codeFloat {
          0%   { transform: translate(0, 0) scale(var(--s)) rotate(0deg);    opacity:${OPACITY_MIN}; }
          50%  { transform: translate(var(--dx), var(--dy)) scale(calc(var(--s) * 1.04)) rotate(3deg); opacity:${OPACITY_MAX}; }
          100% { transform: translate(0, 0) scale(var(--s)) rotate(0deg);    opacity:${OPACITY_MIN}; }
        }
        @media (prefers-reduced-motion: reduce) {
          .lwh-code { animation: none !important; opacity: ${OPACITY_MIN} !important; }
        }
      `}</style>

      {items.map((it, idx) => {
        const commonStyle = {
          top: it.posTop,
          left: it.posLeft,
          transform: "translate(calc(var(--mx,0) * 8px), calc(var(--my,0) * 6px))",
          animation: `codeFloat ${it.dur}s ease-in-out ${it.delay}s infinite`,
          "--s": it.scale,
          "--dx": `${it.driftX}px`,
          "--dy": `${it.driftY}px`,
          mixBlendMode: BLEND_MODE,
          filter: "blur(0.15px)", // micro-soften edges without losing clarity
        };

        if (it.token.type === "text") {
          return (
            <span
              key={idx}
              className="lwh-code absolute text-[9px] md:text-[10px] lg:text-xs font-mono text-cyan-300/45 select-none"
              style={commonStyle}
            >
              {it.token.txt}
            </span>
          );
        }

        const Icon =
          it.token.which === "ReactIcon" ? Svgs.ReactIcon :
          it.token.which === "BraceIcon" ? Svgs.BraceIcon :
          Svgs.CodeIcon;

        return (
          <span
            key={idx}
            className="lwh-code absolute text-cyan-300/45 select-none"
            style={commonStyle}
          >
            <Icon style={{ display: "block", opacity: 0.8 }} />
          </span>
        );
      })}
    </div>
  );
}
