import { useEffect, useRef } from "react";

/** Canvas-based particle trail (pointer-events: none). Respects reduced motion. */
export default function CursorTrail() {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const particles = useRef([]);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: true });
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const { innerWidth: w, innerHeight: h } = window;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const addParticles = (x, y) => {
      for (let i = 0; i < 5; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.6 + Math.random() * 1.4;
        particles.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed + 0.4,
          life: 1, // 0..1
          size: 2 + Math.random() * 3,
          hue: 190 + Math.random() * 40, // cyan-blue range
        });
      }
      if (particles.current.length > 400)
        particles.current.splice(0, particles.current.length - 400);
    };

    const onMove = (e) => {
      addParticles(e.clientX, e.clientY);
    };
    window.addEventListener("mousemove", onMove);

    const tick = () => {
      const { innerWidth: w, innerHeight: h } = window;
      ctx.clearRect(0, 0, w, h);

      // slight composite glow
      ctx.globalCompositeOperation = "lighter";
      for (let i = particles.current.length - 1; i >= 0; i--) {
        const p = particles.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy *= 0.98;
        p.vx *= 0.98;
        p.life -= 0.02;

        if (p.life <= 0) {
          particles.current.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 90%, 60%, ${0.14 * p.life})`;
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0" // ← was -z-10
      aria-hidden="true"
    />
  );
}
