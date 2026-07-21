import SiteMenu from "./site-menu";
import { sitePath } from "./site-path";

const navLinks = [
  { label: "Hair systems", href: "/#hair-systems" },
  { label: "Transformations", href: "/results" },
  { label: "How it works", href: "/#process" },
  { label: "Questions", href: "/faq" },
];

export default function SiteHeader() {
  return (
    <header className="site-header">
      <a className="header-lockup" href={sitePath("/")} aria-label="Hair Unlimited home">
        <img className="header-monogram" src={sitePath("/hu-lettermark-gothic-final.svg")} alt="" aria-hidden="true" />
        <span className="header-mark">Hair Unlimited</span>
      </a>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {navLinks.map((link) => (
          <a href={sitePath(link.href)} key={link.label}>{link.label}</a>
        ))}
      </nav>

      <div className="site-header-actions">
        <a className="header-book" href={sitePath("/book")}>Book a private consult</a>
        <SiteMenu />
      </div>
    </header>
  );
}
