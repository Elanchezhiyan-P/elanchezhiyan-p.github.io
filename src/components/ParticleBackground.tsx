import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
}

export const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();
  const mousePos = useRef<{ x: number; y: number } | null>(null);
  const resizeTimeout = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Resize canvas to full window size
    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Get theme-aware colors
    const getThemeColors = () => {
      const isGreenTheme =
        document.documentElement.classList.contains("theme-green");
      if (isGreenTheme) {
        return [
          "rgba(34, 197, 94, 0.6)", // Green
          "rgba(16, 185, 129, 0.5)", // Emerald
          "rgba(5, 150, 105, 0.4)", // Teal
          "rgba(34, 197, 94, 0.5)", // Green
          "rgba(20, 184, 166, 0.4)", // Cyan
        ];
      } else {
        return [
          "rgba(59, 130, 246, 0.6)", // Blue
          "rgba(147, 51, 234, 0.5)", // Purple
          "rgba(79, 70, 229, 0.4)", // Indigo
          "rgba(34, 197, 94, 0.5)", // Green
          "rgba(168, 85, 247, 0.4)", // Violet
        ];
      }
    };

    const createParticles = () => {
      const particleCount = window.innerWidth < 768 ? 50 : 120;
      const colors = getThemeColors();
      particlesRef.current = [];
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 3,
          vy: (Math.random() - 0.5) * 3,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.6 + 0.2,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    const drawParticle = (particle: Particle) => {
      ctx.save();
      ctx.globalAlpha = particle.opacity;
      ctx.fillStyle = particle.color;
      ctx.shadowBlur = particle.size * 3;
      ctx.shadowColor = particle.color;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const drawConnections = () => {
      const particles = particlesRef.current;
      const isGreenTheme =
        document.documentElement.classList.contains("theme-green");
      const connectionColor = isGreenTheme
        ? "rgba(34, 197, 94, 0.5)"
        : "rgba(59, 130, 246, 0.5)";

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            const opacity = ((150 - distance) / 150) * 0.3;
            ctx.save();
            ctx.globalAlpha = opacity;
            ctx.strokeStyle = connectionColor;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }
    };

    const updateParticles = () => {
      const mouse = mousePos.current;
      particlesRef.current.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x <= 0) {
          particle.x = 0;
          particle.vx *= -1;
        } else if (particle.x >= canvas.width) {
          particle.x = canvas.width;
          particle.vx *= -1;
        }
        if (particle.y <= 0) {
          particle.y = 0;
          particle.vy *= -1;
        } else if (particle.y >= canvas.height) {
          particle.y = canvas.height;
          particle.vy *= -1;
        }

        if (mouse) {
          const dx = particle.x - mouse.x;
          const dy = particle.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            const force = (150 - dist) / 150;
            particle.vx += (dx / dist) * force * 1.5;
            particle.vy += (dy / dist) * force * 1.5;
          }
        }

        // Add subtle random movement to keep particles active
        particle.vx += (Math.random() - 0.5) * 0.1;
        particle.vy += (Math.random() - 0.5) * 0.1;

        // Reduce damping to keep particles moving
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        // Ensure minimum velocity to prevent complete stopping
        const minVelocity = 0.5;
        if (
          Math.abs(particle.vx) < minVelocity &&
          Math.abs(particle.vy) < minVelocity
        ) {
          particle.vx = (Math.random() - 0.5) * 2;
          particle.vy = (Math.random() - 0.5) * 2;
        }

        particle.opacity += (Math.random() - 0.5) * 0.02;
        particle.opacity = Math.max(0.1, Math.min(0.8, particle.opacity));
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      updateParticles();
      drawConnections();
      particlesRef.current.forEach(drawParticle);
      animationRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mousePos.current = null;
    };

    // Debounced resize handler to avoid frequent re-creation of particles
    const handleResize = () => {
      if (resizeTimeout.current) {
        clearTimeout(resizeTimeout.current);
      }
      resizeTimeout.current = window.setTimeout(() => {
        resizeCanvas();
        createParticles();
      }, 200);
    };

    resizeCanvas();
    createParticles();
    animate();

    window.addEventListener("resize", handleResize);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      if (resizeTimeout.current) {
        clearTimeout(resizeTimeout.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[-1]"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        background: "transparent",
      }}
    />
  );
};
