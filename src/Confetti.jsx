import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

const COLORS = ["#e0b45a", "#f6e3b0", "#c23b52", "#e8798b", "#3d5bd6", "#f6ecd6", "#ffffff"];

// Canvas confetti — koi library nahi, taake page tez khule.
const Confetti = forwardRef(function Confetti(_, ref) {
  const canvasRef = useRef(null);
  const parts = useRef([]);
  const raf = useRef(0);
  const tickRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = innerWidth * dpr;
      canvas.height = innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    addEventListener("resize", resize);

    const tick = () => {
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      parts.current = parts.current.filter((p) => p.y < innerHeight + 30 && p.life > 0);
      for (const p of parts.current) {
        p.vy += 0.12;
        p.vx *= 0.995;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        p.life -= 1;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = Math.min(1, p.life / 40);
        ctx.fillStyle = p.color;
        if (p.round) {
          ctx.beginPath();
          ctx.arc(0, 0, p.s / 2, 0, 7);
          ctx.fill();
        } else ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2);
        ctx.restore();
      }
      raf.current = parts.current.length ? requestAnimationFrame(tick) : 0;
    };
    tickRef.current = tick;

    return () => {
      removeEventListener("resize", resize);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  useImperativeHandle(ref, () => ({
    burst(x = innerWidth / 2, y = innerHeight * 0.4, count = 120) {
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      for (let i = 0; i < count; i++) {
        const a = Math.random() * Math.PI * 2;
        const v = 4 + Math.random() * 8;
        parts.current.push({
          x,
          y,
          vx: Math.cos(a) * v,
          vy: Math.sin(a) * v - 5,
          s: 6 + Math.random() * 7,
          rot: Math.random() * 6,
          vr: (Math.random() - 0.5) * 0.4,
          color: COLORS[(Math.random() * COLORS.length) | 0],
          round: Math.random() < 0.3,
          life: 140 + Math.random() * 80,
        });
      }
      if (!raf.current && tickRef.current) raf.current = requestAnimationFrame(tickRef.current);
    },
  }));

  return <canvas ref={canvasRef} className="confetti" aria-hidden="true" />;
});

export default Confetti;
