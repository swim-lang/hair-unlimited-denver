"use client";

import { useEffect, useRef, useState } from "react";

const phoneDisplay = "(303) 868-1977";
const phoneHref = "tel:+13038681977";
const directionsHref =
  "https://www.google.com/maps/search/?api=1&query=7535+E+Hampden+Ave+Building+2+Suite+502+Denver+CO+80231";

const menuLinks = [
  { label: "Hair systems", href: "/#hair-systems" },
  { label: "Transformations", href: "/results" },
  { label: "How it works", href: "/#process" },
  { label: "The studio", href: "/#studio" },
  { label: "Questions", href: "/faq" },
];

export default function SiteMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        return;
      }

      if (event.key !== "Tab") return;
      const drawer = document.getElementById("site-menu-drawer");
      const focusable = drawer?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      toggleRef.current?.focus();
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <button
        className="site-menu-toggle"
        type="button"
        aria-expanded={isOpen}
        aria-controls="site-menu-drawer"
        aria-label="Open site menu"
        onClick={() => setIsOpen(true)}
        ref={toggleRef}
      >
        <span className="site-menu-bars" aria-hidden="true"><i /><i /></span>
        <span>Menu</span>
      </button>

      {isOpen && (
        <div className="site-menu-layer" onMouseDown={(event) => {
          if (event.target === event.currentTarget) closeMenu();
        }}>
          <aside id="site-menu-drawer" className="site-menu-drawer" role="dialog" aria-modal="true" aria-label="Site menu">
            <div className="site-menu-top">
              <span>Hair Unlimited</span>
              <button type="button" onClick={closeMenu} ref={closeRef} aria-label="Close site menu">Close ×</button>
            </div>

            <nav className="site-menu-nav" aria-label="Menu navigation">
              {menuLinks.map((link, index) => (
                <a href={link.href} onClick={closeMenu} key={link.label}>
                  <small>{String(index + 1).padStart(2, "0")}</small>
                  <span>{link.label}</span>
                  <b aria-hidden="true">↗</b>
                </a>
              ))}
            </nav>

            <div className="site-menu-actions">
              <a className="site-menu-primary" href="/book" onClick={closeMenu}>
                <span>Book a private consult</span><b aria-hidden="true">↗</b>
              </a>
              <div>
                <a href={phoneHref}><small>Call or text</small><strong>{phoneDisplay}</strong></a>
                <a href={directionsHref} target="_blank" rel="noreferrer"><small>On your way?</small><strong>Get directions ↗</strong></a>
              </div>
            </div>

            <div className="site-menu-bottom">
              <span>7535 E. Hampden Ave. · Building 2, Suite 502</span>
              <a href="/clients">Current clients →</a>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
