"use client";

import { useEffect, useRef, useState } from "react";
import { transformations } from "./transformations";

export default function ResultsGallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const isOpen = selectedIndex !== null;

  const closeLightbox = () => setSelectedIndex(null);
  const showPrevious = () => {
    setSelectedIndex((current) => current === null ? null : (current - 1 + transformations.length) % transformations.length);
  };
  const showNext = () => {
    setSelectedIndex((current) => current === null ? null : (current + 1) % transformations.length);
  };

  useEffect(() => {
    if (!isOpen) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedIndex(null);
      if (event.key === "ArrowLeft") {
        setSelectedIndex((current) => current === null ? null : (current - 1 + transformations.length) % transformations.length);
      }
      if (event.key === "ArrowRight") {
        setSelectedIndex((current) => current === null ? null : (current + 1) % transformations.length);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus();
    };
  }, [isOpen]);

  const selected = selectedIndex === null ? null : transformations[selectedIndex];

  return (
    <main className="portfolio-page">
      <header className="client-header portfolio-header">
        <a className="header-lockup" href="/" aria-label="Return to Hair Unlimited home">
          <img className="header-monogram" src="/hu-lettermark-gothic-final.svg" alt="" aria-hidden="true" />
          <span className="header-mark">Hair Unlimited</span>
        </a>
        <a className="header-book" href="/book">Book a private consult</a>
      </header>

      <section className="portfolio-hero">
        <div className="portfolio-eyebrow">
          <span>Real clients</span>
          <span>Before / after</span>
        </div>
        <div className="portfolio-hero-main">
          <h1 className="display">The work<br />speaks for itself.</h1>
          <div>
            <p>Every result starts with a different face, hairline, texture and life. These are real transformations from the Hair Unlimited portfolio.</p>
            <span>Eight clients · No stock photography</span>
          </div>
        </div>
      </section>

      <section className="portfolio-grid" aria-label="Client transformation gallery">
        {transformations.map((item, index) => (
          <figure className="portfolio-card" key={item.name}>
            <button type="button" onClick={() => setSelectedIndex(index)} aria-label={`View ${item.name}'s transformation larger`}>
              <img src={item.image} alt={`${item.name} before and after custom hair replacement`} />
              <span>View larger <b aria-hidden="true">↗</b></span>
            </button>
            <figcaption>
              <small>{String(index + 1).padStart(2, "0")} · Before / after</small>
              <div>
                <strong>{item.name}, {item.age}</strong>
                <span>{item.role}</span>
              </div>
            </figcaption>
          </figure>
        ))}
      </section>

      <section className="portfolio-cta">
        <div>
          <span>See yourself differently.</span>
          <h2 className="display">Start privately.</h2>
        </div>
        <a className="button button-dark" href="/book">
          <span>Book a private consult</span>
          <span aria-hidden="true">↗</span>
        </a>
      </section>

      {selected && (
        <div className="portfolio-lightbox" role="dialog" aria-modal="true" aria-label={`${selected.name} before and after`} onMouseDown={(event) => {
          if (event.target === event.currentTarget) closeLightbox();
        }}>
          <button className="lightbox-close" type="button" onClick={closeLightbox} ref={closeButtonRef} aria-label="Close transformation viewer">Close ×</button>
          <button className="lightbox-arrow lightbox-previous" type="button" onClick={showPrevious} aria-label="Previous transformation">←</button>
          <figure>
            <img src={selected.image} alt={`${selected.name} before and after custom hair replacement`} />
            <figcaption>
              <span>{String((selectedIndex ?? 0) + 1).padStart(2, "0")} / {String(transformations.length).padStart(2, "0")}</span>
              <strong>{selected.name}, {selected.age}</strong>
              <small>{selected.role}</small>
            </figcaption>
          </figure>
          <button className="lightbox-arrow lightbox-next" type="button" onClick={showNext} aria-label="Next transformation">→</button>
        </div>
      )}
    </main>
  );
}
