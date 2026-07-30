import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type ImageItem = {
  src: string;
  alt?: string;
};

export type DeviceVariant = "phone" | "tablet";

export type PhoneCarouselProps = {
  images: ImageItem[];
  className?: string;
  autoPlayInterval?: number;
  /** "phone" renders a tall portrait mockup; "tablet" renders a wider landscape mockup, better suited to desktop/web screenshots. */
  variant?: DeviceVariant;
};

const FRAME_CONFIG: Record<
  DeviceVariant,
  { stageHeight: string; frameSize: string; spacing: number; rotation: number }
> = {
  phone: {
    stageHeight: "h-[440px]",
    frameSize: "h-[400px] w-[200px]",
    spacing: 120,
    rotation: 25,
  },
  tablet: {
    stageHeight: "h-[340px]",
    frameSize: "h-[280px] w-[380px]",
    spacing: 210,
    rotation: 18,
  },
};

export function PhoneCarousel({
  images,
  className,
  autoPlayInterval = 3500,
  variant = "phone",
}: PhoneCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const count = images.length;
  const config = FRAME_CONFIG[variant];

  const goTo = useCallback(
    (index: number) => setActiveIndex(((index % count) + count) % count),
    [count],
  );
  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  useEffect(() => {
    if (isPaused || count <= 1) return;
    const timer = window.setInterval(next, autoPlayInterval);
    return () => window.clearInterval(timer);
  }, [isPaused, next, autoPlayInterval, count]);

  if (count === 0) return null;

  return (
    <div
      className={cn("relative flex w-full flex-col items-center gap-6", className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className={cn("relative w-full max-w-3xl [perspective:1200px]", config.stageHeight)}>
        {images.map((image, index) => {
          let offset = index - activeIndex;
          if (offset > count / 2) offset -= count;
          if (offset < -count / 2) offset += count;

          if (Math.abs(offset) > 2) return null;

          const isActive = offset === 0;

          return (
            <button
              key={image.src + index}
              type="button"
              aria-label={image.alt ?? `Show image ${index + 1}`}
              onClick={() => goTo(index)}
              className={cn(
                "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden border-neutral-900 bg-neutral-900 shadow-2xl transition-all duration-500 ease-out dark:border-neutral-800",
                config.frameSize,
                variant === "phone"
                  ? "rounded-[2.25rem] border-[6px]"
                  : "rounded-[1.25rem] border-[10px]",
                isActive ? "cursor-default" : "cursor-pointer",
              )}
              style={{
                transform: `translate(-50%, -50%) translateX(${offset * config.spacing}px) rotateY(${offset * -config.rotation}deg) scale(${isActive ? 1 : 0.85})`,
                zIndex: 10 - Math.abs(offset),
                opacity: Math.abs(offset) > 1 ? 0 : 1,
              }}
              tabIndex={isActive ? -1 : 0}
            >
              {variant === "phone" ? (
                <span
                  aria-hidden="true"
                  className="absolute left-1/2 top-0 z-10 h-5 w-24 -translate-x-1/2 rounded-b-2xl bg-neutral-900 dark:bg-neutral-800"
                />
              ) : (
                <span
                  aria-hidden="true"
                  className="absolute left-1/2 top-0.5 z-10 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-neutral-700"
                />
              )}
              <span
                className={cn(
                  "block h-full w-full overflow-hidden bg-muted",
                  variant === "phone" ? "rounded-[1.75rem]" : "rounded-md",
                )}
              >
                <img
                  src={image.src}
                  alt={image.alt ?? ""}
                  className={cn(
                    "h-full w-full object-cover",
                    variant === "tablet" && "object-top",
                  )}
                  loading="lazy"
                  draggable={false}
                />
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-label="Previous"
          onClick={prev}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-accent"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-1.5">
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => goTo(index)}
              className={cn(
                "h-1.5 rounded-full transition-all",
                index === activeIndex
                  ? "w-6 bg-foreground"
                  : "w-1.5 bg-muted-foreground/40",
              )}
            />
          ))}
        </div>

        <button
          type="button"
          aria-label="Next"
          onClick={next}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-accent"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
