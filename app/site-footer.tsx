import { sitePath } from "./site-path";

const phoneDisplay = "(303) 868-1977";
const phoneHref = "tel:+13038681977";
const directionsHref =
  "https://www.google.com/maps/search/?api=1&query=7535+E+Hampden+Ave+Building+2+Suite+502+Denver+CO+80231";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-top" data-reveal>
        <div className="footer-about">
          <h2>Denver · Since 1989</h2>
          <p>Private, custom non-surgical hair replacement in Denver since 1989.</p>
        </div>
        <nav aria-label="Footer navigation">
          <div>
            <small>Explore</small>
            <a href={sitePath("/#hair-systems")}>Hair Systems</a>
            <a href={sitePath("/results")}>Results</a>
            <a href={sitePath("/#process")}>How It Works</a>
            <a href={sitePath("/faq")}>Questions</a>
          </div>
          <div>
            <small>Start here</small>
            <a href={sitePath("/book")}>Book a Private Consult</a>
            <a href={sitePath("/clients")}>Current Clients</a>
            <a href={phoneHref}>Call / Text</a>
            <a href={directionsHref} target="_blank" rel="noreferrer">Get Directions</a>
          </div>
          <div>
            <small>Visit</small>
            <address>7535 E. Hampden Ave.<br />Building 2, Suite 502<br />Denver, CO 80231</address>
            <a href={phoneHref}>{phoneDisplay}</a>
          </div>
        </nav>
      </div>
      <div className="footer-wordmark display" data-reveal>Hair Unlimited</div>
      <div className="footer-legal">
        <span>© 2026 Hair Unlimited of Denver · Privacy · Accessibility</span>
        <a href={phoneHref}>Call or text {phoneDisplay}</a>
      </div>
    </footer>
  );
}
