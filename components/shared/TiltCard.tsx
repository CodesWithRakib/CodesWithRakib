"use client";

import * as React from "react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
  glare?: boolean;
}

export function TiltCard({
  children,
  className = "",
  maxTilt = 8,
  scale = 1.015,
  glare = true,
}: TiltCardProps) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [transform, setTransform] = React.useState<string>("");
  const [glareStyle, setGlareStyle] = React.useState<React.CSSProperties>({
    opacity: 0,
  });
  const [isHovered, setIsHovered] = React.useState(false);

  const isTouchOrReducedMotion = React.useSyncExternalStore(
    (callback) => {
      if (typeof window === "undefined") return () => {};
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", callback);
      return () => mq.removeEventListener("change", callback);
    },
    () => {
      if (typeof window === "undefined") return false;
      const hasTouch = "ontouchstart" in window || (navigator.maxTouchPoints > 0);
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      return hasTouch || prefersReducedMotion;
    },
    () => false
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchOrReducedMotion || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    const rotateX = (-y * maxTilt * 2).toFixed(2);
    const rotateY = (x * maxTilt * 2).toFixed(2);

    setTransform(
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`
    );

    if (glare) {
      const glareX = Math.round((x + 0.5) * 100);
      const glareY = Math.round((y + 0.5) * 100);
      setGlareStyle({
        opacity: 0.15,
        background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 60%)`,
      });
    }
  };

  const handleMouseEnter = () => {
    if (isTouchOrReducedMotion) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (isTouchOrReducedMotion) return;
    setIsHovered(false);
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    setGlareStyle({ opacity: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transform || undefined,
        transition: isHovered
          ? "transform 0.12s ease-out"
          : "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        transformStyle: "preserve-3d",
      }}
      className={`relative ${className}`}
    >
      {children}
      {glare && !isTouchOrReducedMotion && (
        <div
          aria-hidden="true"
          style={{
            ...glareStyle,
            transition: "opacity 0.3s ease-out",
          }}
          className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] mix-blend-overlay"
        />
      )}
    </div>
  );
}
