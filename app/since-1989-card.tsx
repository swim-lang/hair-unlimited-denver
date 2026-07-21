"use client";

import { useEffect, useRef, useState } from "react";
import { sitePath } from "./site-path";

const startYear = 2025;
const endYear = 1989;
const duration = 1400;

export default function Since1989Card() {
  const cardRef = useRef<HTMLElement>(null);
  const [year, setYear] = useState(startYear);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    let frame = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          setYear(endYear);
          return;
        }

        const startedAt = performance.now();

        const tick = (now: number) => {
          const progress = Math.min((now - startedAt) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setYear(Math.round(startYear - (startYear - endYear) * eased));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };

        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.55 },
    );

    observer.observe(card);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <aside className="since-card" ref={cardRef} tabIndex={0}>
      <img className="since-card-gif" src={sitePath("/images/rock-band-1989-hover.gif")} alt="" aria-hidden="true" />
      <small>Experience / continuity</small>
      <div className="since-card-year">
        <strong>Serving Denver</strong>
        <span>Since<br />{year}.</span>
      </div>
      <p>One studio. Long relationships. A stylist who knows your history.</p>
    </aside>
  );
}
