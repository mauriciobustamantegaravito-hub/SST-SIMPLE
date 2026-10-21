"use client";

import { useEffect, useRef, useState } from "react";

type Particle = { x: number; y: number; vx: number; vy: number; radius: number; color: string };

const COLORS = ["#075844", "#0b7a55", "#ef641c", "#d69b00", "#202326"];

function createParticles(width: number, height: number) {
  const count = width < 600 ? 18 : 30;
  return Array.from({ length: count }, (_, index): Particle => {
    const angle = (index / count) * Math.PI * 2;
    const speed = 18 + (index % 5) * 4;
    return {
      x: ((index * 83) % 100) / 100 * width,
      y: ((index * 47 + 17) % 100) / 100 * height,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      radius: 4 + (index % 4) * 1.8,
      color: COLORS[index % COLORS.length],
    };
  });
}

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    let particles: Particle[] = [];
    let lastTime = performance.now();
    let width = 0;
    let height = 0;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      particles = createParticles(width, height);
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      const linkDistance = width < 600 ? 112 : 150;
      context.lineWidth = 1.5;

      for (let first = 0; first < particles.length; first += 1) {
        for (let second = first + 1; second < particles.length; second += 1) {
          const a = particles[first];
          const b = particles[second];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const distance = Math.hypot(dx, dy);
          if (distance < linkDistance) {
            context.globalAlpha = Math.max(0.08, 0.48 * (1 - distance / linkDistance));
            context.strokeStyle = distance < 64 ? "#064f3c" : "#0c8b5d";
            context.beginPath();
            context.moveTo(a.x, a.y);
            context.lineTo(b.x, b.y);
            context.stroke();
          }
        }
      }

      for (const particle of particles) {
        context.globalAlpha = 1;
        context.fillStyle = particle.color;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fill();
        context.strokeStyle = "#fff1c6";
        context.lineWidth = 1.5;
        context.stroke();
      }
    };

    const tick = (time: number) => {
      const delta = Math.min((time - lastTime) / 1000, 0.04);
      lastTime = time;
      if (!reduceMotion) {
        for (const particle of particles) {
          particle.x += particle.vx * delta;
          particle.y += particle.vy * delta;
          if (particle.x < -30) particle.x = width + 30;
          if (particle.x > width + 30) particle.x = -30;
          if (particle.y < -30) particle.y = height + 30;
          if (particle.y > height + 30) particle.y = -30;
        }

        for (let first = 0; first < particles.length; first += 1) {
          for (let second = first + 1; second < particles.length; second += 1) {
            const a = particles[first];
            const b = particles[second];
            const dx = b.x - a.x;
            const dy = b.y - a.y;
            const distance = Math.hypot(dx, dy);
            const minimum = a.radius + b.radius + 5;
            if (distance > 0 && distance < minimum) {
              const nx = dx / distance;
              const ny = dy / distance;
              const relativeVelocity = (a.vx - b.vx) * nx + (a.vy - b.vy) * ny;
              if (relativeVelocity > 0) {
                a.vx -= relativeVelocity * nx;
                a.vy -= relativeVelocity * ny;
                b.vx += relativeVelocity * nx;
                b.vy += relativeVelocity * ny;
              }
              const push = (minimum - distance) * 0.52;
              a.x -= nx * push; a.y -= ny * push;
              b.x += nx * push; b.y += ny * push;
            }
          }
        }
      }
      draw();
    };

    resize();
    tick(performance.now());
    window.addEventListener("resize", resize, { passive: true });
    const interval = reduceMotion ? undefined : window.setInterval(() => tick(performance.now()), 33);
    return () => { window.removeEventListener("resize", resize); if (interval !== undefined) window.clearInterval(interval); };
  }, []);

  return <div className="ambient-field" aria-hidden="true"><canvas ref={canvasRef} className="ambient-canvas" /></div>;
}

export function AnimatedScore({ target = 68 }: { target?: number }) {
  const scoreRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const element = scoreRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setStarted(true);
      observer.disconnect();
    }, { threshold: 0.35, rootMargin: "0px 0px -10% 0px" });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      const timeout = window.setTimeout(() => setValue(target), 0);
      return () => window.clearTimeout(timeout);
    }

    const start = performance.now();
    const duration = 1800;
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [started, target]);

  return (
    <div ref={scoreRef} className="score" role="progressbar" aria-label="Avance 5S" aria-valuemin={0} aria-valuemax={100} aria-valuenow={value}>
      <svg className="score-ring" viewBox="0 0 120 120" aria-hidden="true">
        <circle className="score-ring-track" cx="60" cy="60" r="52" />
        <circle
          className="score-ring-progress"
          cx="60"
          cy="60"
          r="52"
          style={{ strokeDashoffset: `${326.73 - (326.73 * value) / 100}` }}
        />
      </svg>
      <div className="score-content">
        <strong aria-live="polite">{value}</strong>
        <small>avance 5S</small>
      </div>
    </div>
  );
}

