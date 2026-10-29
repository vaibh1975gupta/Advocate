"use client";

import React, { useEffect, useRef } from "react";
import { Scale, BookOpen, Shield, Landmark } from "lucide-react";

interface ParallaxWatermarkProps {
  icon?: "scale" | "book" | "shield" | "landmark";
  speed?: number;
  className?: string;
  size?: number;
  rotate?: number;
}

export function ParallaxFloatingWatermark({
  icon = "scale",
  speed = -0.12,
  className = "",
  size = 400,
  rotate = 5,
}: ParallaxWatermarkProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!ref.current) {
            ticking = false;
            return;
          }

          const rect = ref.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;

          if (rect.bottom >= -200 && rect.top <= windowHeight + 200) {
            const viewportCenter = windowHeight / 2;
            const elementCenter = rect.top + rect.height / 2;
            const distanceFromCenter = elementCenter - viewportCenter;
            const translateY = distanceFromCenter * speed;
            const currentRotate = rotate + distanceFromCenter * 0.01;

            ref.current.style.transform = `translate3d(0, ${translateY.toFixed(2)}px, 0) rotate(${currentRotate.toFixed(2)}deg)`;
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [speed, rotate]);

  const renderIcon = () => {
    const props = {
      style: { width: `${size}px`, height: `${size}px` },
      className: "stroke-[0.6] text-gold-500/10",
    };

    switch (icon) {
      case "scale":
        return <Scale {...props} />;
      case "book":
        return <BookOpen {...props} />;
      case "shield":
        return <Shield {...props} />;
      case "landmark":
        return <Landmark {...props} />;
      default:
        return <Scale {...props} />;
    }
  };

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none will-change-transform ${className}`}
    >
      {renderIcon()}
    </div>
  );
}
