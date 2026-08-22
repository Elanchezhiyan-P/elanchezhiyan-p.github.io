import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

interface ParticleBackgroundProps {
  /** `true` (default): a fixed, viewport-sized backdrop behind the whole page.
   *  `false`: scoped to whatever `relative`/`overflow-hidden` parent it's placed in. */
  fixed?: boolean;
  /** Extra classes for the wrapping element. */
  className?: string;
  /** Roughly how many particles to show — kept low by design; this is ambience, not a network. */
  count?: number;
}

/**
 * Ambient drifting dots — a quiet atmosphere, not a neural-network graphic.
 * No connecting lines, no mouse interaction, slow drift, soft glow, a single
 * theme-aware accent at low opacity. `fixed` mode sizes to the viewport and
 * sits behind everything (-z-10); non-fixed mode sizes to its parent via
 * ResizeObserver for scoping to one section.
 */
export const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
  fixed = true,
  className = "",
  count = 26,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const getAccentColor = () => {
      const isGreenTheme =
        document.documentElement.classList.contains("theme-green");
      return isGreenTheme ? "34, 197, 94" : "37, 99, 235";
    };

    const createParticles = (width: number, height: number) => {
      const isSmall = width < 640;
      const target = Math.max(6, Math.round(count * (isSmall ? 0.45 : 1)));
      particlesRef.current = Array.from({ length: target }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        size: Math.random() * 1.8 + 1.2,
        opacity: Math.random() * 0.18 + 0.08,
      }));
    };

    const resize = () => {
      const rect = fixed
        ? { width: window.innerWidth, height: window.innerHeight }
        : container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      createParticles(rect.width, rect.height);
    };

    const draw = () => {
      const rect = fixed
        ? { width: window.innerWidth, height: window.innerHeight }
        : container.getBoundingClientRect();
      const rgb = getAccentColor();
      ctx.clearRect(0, 0, rect.width, rect.height);

      particlesRef.current.forEach((particle) => {
        if (!prefersReducedMotion) {
          particle.x += particle.vx;
          particle.y += particle.vy;
          if (particle.x < 0 || particle.x > rect.width) particle.vx *= -1;
          if (particle.y < 0 || particle.y > rect.height) particle.vy *= -1;
        }

        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = `rgb(${rgb})`;
        ctx.shadowBlur = particle.size * 4;
        ctx.shadowColor = `rgb(${rgb})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      if (!prefersReducedMotion) {
        animationRef.current = requestAnimationFrame(draw);
      }
    };

    resize();
    draw();

    const handleWindowResize = () => resize();
    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (prefersReducedMotion) draw();
    });

    if (fixed) {
      window.addEventListener("resize", handleWindowResize);
    } else {
      resizeObserver.observe(container);
    }

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", handleWindowResize);
      resizeObserver.disconnect();
    };
  }, [count, fixed]);

  return (
    <div
      ref={containerRef}
      className={
        fixed
          ? `fixed inset-0 -z-10 pointer-events-none ${className}`
          : `absolute inset-0 -z-10 pointer-events-none overflow-hidden ${className}`
      }
      aria-hidden="true"
    >
      <canvas ref={canvasRef} />
    </div>
  );
};
