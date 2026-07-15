/**
 * RevealSection
 *
 * Wraps children with a scroll-triggered entrance animation.
 * Uses IntersectionObserver — triggers once when the element
 * enters the viewport. Respects prefers-reduced-motion.
 *
 * direction: "up" (default) | "left" | "right"
 * delay: extra ms delay added when revealed (for stagger effects)
 */
import React, { useEffect, useRef } from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "left" | "right";
  delay?: number;     // ms
  threshold?: number; // 0–1, portion of element visible before triggering
  as?: keyof JSX.IntrinsicElements;
}

const RevealSection: React.FC<Props> = ({
  children,
  className = "",
  direction = "up",
  delay = 0,
  threshold = 0.12,
  as: Tag = "div",
}) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Skip animation for users who prefer reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("sr-revealed");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transitionDelay = delay ? `${delay}ms` : "";
          el.classList.add("sr-revealed");
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, threshold]);

  const dirClass =
    direction === "left"
      ? "sr-reveal-left"
      : direction === "right"
      ? "sr-reveal-right"
      : "sr-reveal-up";

  return (
    // @ts-ignore — dynamic tag with ref
    <Tag ref={ref} className={`${dirClass} ${className}`}>
      {children}
    </Tag>
  );
};

export default RevealSection;
