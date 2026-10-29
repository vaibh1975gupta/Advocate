"use client";

import React, { useEffect, useState } from "react";

export function MouseSpotlight() {
  const [position, setPosition] = useState({ x: -1000, y: -1000 });
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    let animationFrameId: number;
    let targetX = -1000;
    let targetY = -1000;
    let currentX = -1000;
    let currentY = -1000;

    const handlePointerMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setOpacity(1);
    };

    const handleMouseLeave = () => {
      setOpacity(0);
    };

    const render = () => {
      // Smooth lerp easing towards cursor
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      setPosition({ x: currentX, y: currentY });
      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-30 transition-opacity duration-500 overflow-hidden"
      style={{ opacity }}
      aria-hidden="true"
    >
      {/* Outer ambient glow */}
      <div
        className="absolute w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl pointer-events-none"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          background: "radial-gradient(circle, rgba(185, 154, 91, 0.12) 0%, rgba(185, 154, 91, 0.04) 40%, transparent 70%)",
        }}
      />
      {/* Inner focal highlight */}
      <div
        className="absolute w-48 h-48 -translate-x-1/2 -translate-y-1/2 rounded-full blur-xl pointer-events-none"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          background: "radial-gradient(circle, rgba(255, 255, 255, 0.18) 0%, rgba(185, 154, 91, 0.1) 50%, transparent 80%)",
        }}
      />
    </div>
  );
}
