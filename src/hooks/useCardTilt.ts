import { useRef, useState, useCallback } from "react";

interface CardTiltOptions {
  /** Max tilt angle in degrees (default 8) */
  intensity?: number;
  /** Show a moving glare highlight (default true) */
  glare?: boolean;
}

/**
 * Applies a CSS 3D perspective-tilt on mouse-over to any card element.
 * Mount the returned `ref` on the element you want to tilt, spread
 * `style` and the two event handlers on the same element.
 */
export function useCardTilt({
  intensity = 8,
  glare = true,
}: CardTiltOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});
  const [glarePos, setGlarePos] = useState<{ x: number; y: number } | null>(
    null
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5; // –0.5 → 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5; // –0.5 → 0.5
      setTiltStyle({
        transform: `perspective(900px) rotateX(${(-y * intensity).toFixed(
          2
        )}deg) rotateY(${(x * intensity).toFixed(2)}deg) scale3d(1.04,1.04,1.04)`,
        transition: "transform 0.08s linear",
        willChange: "transform",
      });
      if (glare) setGlarePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    },
    [intensity, glare]
  );

  const handleMouseLeave = useCallback(() => {
    setTiltStyle({
      transform:
        "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)",
      transition: "transform 0.45s ease",
      willChange: "auto",
    });
    setGlarePos(null);
  }, []);

  /** Overlay style for the moving glare highlight. Render this as an
   *  absolutely-positioned sibling inside the tilted element. */
  const glareStyle: React.CSSProperties | undefined =
    glare && glarePos
      ? {
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          pointerEvents: "none",
          zIndex: 10,
          background: `radial-gradient(circle at ${glarePos.x}px ${glarePos.y}px, rgba(255,255,255,0.14) 0%, transparent 65%)`,
        }
      : undefined;

  return {
    ref,
    style: tiltStyle,
    glareStyle,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
  };
}
