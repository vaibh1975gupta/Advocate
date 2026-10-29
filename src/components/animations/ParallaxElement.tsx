"use client";

import React, { useEffect, useRef } from "react";

interface ParallaxElementProps {
  children: React.ReactNode;
  speed?: number; // e.g. -0.2 (floats up faster) or 0.2 (moves down slower)
  className?: string;
  axis?: "y" | "x";
  rotate?: number; // subtle rotation multiplier
  disabledOnMobile?: boolean;
}

export function ParallaxElement({
  children,
  speed = 0.15,
  className = "",
  axis = "y",
  rotate = 0,
  disabledOnMobile = false,
}: ParallaxElementProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check user preference for reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const isMobile = window.innerWidth < 768;
    if (disabledOnMobile && isMobile) return;

    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!elementRef.current) {
            ticking = false;
            return;
          }

          const rect = elementRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;

          // Only compute transform when element is near or within viewport
          if (rect.bottom >= -150 && rect.top <= windowHeight + 150) {
            const viewportCenter = windowHeight / 2;
            const elementCenter = rect.top + rect.height / 2;
            const distanceFromCenter = elementCenter - viewportCenter;
            const translation = distanceFromCenter * speed;

            if (axis === "y") {
              const rotationVal = rotate ? distanceFromCenter * rotate * 0.01 : 0;
              elementRef.current.style.transform = `translate3d(0, ${translation.toFixed(2)}px, 0) rotate(${rotationVal.toFixed(2)}deg)`;
            } else {
              elementRef.current.style.transform = `translate3d(${translation.toFixed(2)}px, 0, 0)`;
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [speed, axis, rotate, disabledOnMobile]);

  return (
    <div
      ref={elementRef}
      className={`will-change-transform ${className}`}
      style={{ transform: "translate3d(0, 0, 0)" }}
    >
      {children}
    </div>
  );
}
