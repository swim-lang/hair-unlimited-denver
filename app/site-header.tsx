import SiteMenu from "./site-menu";

const navLinks = [
  { label: "Hair systems", href: "/#hair-systems" },
  { label: "Transformations", href: "/results" },
  { label: "How it works", href: "/#process" },
  { label: "The studio", href: "/#studio" },
  { label: "Questions", href: "/faq" },
];

export default function SiteHeader() {
  return (
    <header className="site-header">
      <a className="header-lockup" href="/" aria-label="Hair Unlimited home">
        <img className="header-monogram" src="/hu-lettermark-gothic-final.svg" alt="" aria-hidden="true" />
        <span className="header-mark">Hair Unlimited</span>
      </a>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {navLinks.map((link) => (
          <a href={link.href} key={link.label}>{link.label}</a>
        ))}
      </nav>

      <div className="site-header-actions">
        <a className="header-book" href="/book">Book a private consult</a>
        <SiteMenu />
      </div>
    </header>
  );
}
