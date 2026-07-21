import RevealOnScroll from "./reveal-on-scroll";

const phoneDisplay = "(303) 868-1977";
const phoneHref = "tel:+13038681977";
const directionsHref =
  "https://www.google.com/maps/search/?api=1&query=7535+E+Hampden+Ave+Building+2+Suite+502+Denver+CO+80231";

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true">{diagonal ? "↗" : "→"}</span>;
}

function BookingLink({ className = "button button-dark" }: { className?: string }) {
  return (
    <a className={className} href="/book">
      <span>Book a private consult</span>
      <Arrow diagonal />
    </a>
  );
}

export default function Home() {
  return (
    <main>
      <RevealOnScroll />
      <header className="site-header">
        <a className="header-lockup" href="#top" aria-label="Hair Unlimited home">
          <img className="header-monogram" src="/hu-lettermark-gothic-final.svg" alt="" aria-hidden="true" />
          <span className="header-mark">Hair Unlimited</span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#hair-systems">Hair systems</a>
          <a href="#results">Results</a>
          <a href="#studio">The studio</a>
          <a href={phoneHref}>Call / text</a>
        </nav>
        <BookingLink className="header-book" />
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="eyebrow-with-rule">
            <span className="short-rule" />
            <span>Private hair replacement · Denver since 1989</span>
          </div>

          <h1 className="display hero-title">
            Look like
            <br />
            yourself
            <br />
            again.
          </h1>

          <div className="hero-bottom">
            <div className="hero-intro">
              <p>Custom non-surgical hair systems, precisely matched and fitted in a private Denver studio.</p>
            </div>
            <div className="hero-actions">
              <BookingLink />
              <a className="button button-outline" href="#results">
                <span>See real results</span>
                <Arrow />
              </a>
            </div>
          </div>
        </div>

        <figure className="hero-result">
          <div className="hero-photo hero-before" role="img" aria-label="Client before a custom hair system" />
          <div className="hero-photo hero-after" role="img" aria-label="Client after a custom hair system" />
          <figcaption>Real client · Custom system</figcaption>
        </figure>
      </section>

      <section className="feeling dark-section">
        <video className="feeling-video" autoPlay muted loop playsInline preload="metadata" aria-hidden="true">
          <source src="/videos/pexels-gustavo-fring-5450152.mp4" type="video/mp4" />
        </video>
        <div className="feeling-scrim" aria-hidden="true" />
        <div className="section-kicker section-kicker-dark">
          <span>The feeling</span>
          <span>If you&apos;re here, you&apos;ve probably tried to ignore it.</span>
        </div>
        <div className="feeling-grid" data-reveal>
          <h2 className="display feeling-title">
            Thinning.
            <br />
            Receding.
            <br />
            Starting over.
          </h2>
          <div className="feeling-copy">
            <p className="lead">Hair loss is personal. The answer shouldn&apos;t feel like a sales pitch.</p>
            <p>Whether you&apos;ve just noticed a change or you&apos;re ready to replace a system that never felt right, the first step is a private, honest conversation.</p>
            <div className="micro-proof"><span />No pressure. No generic plan.</div>
          </div>
        </div>
      </section>

      <section className="approach" id="hair-systems">
        <div className="section-kicker">
          <span>The approach</span>
          <span>Custom hair · Private care · Denver</span>
        </div>
        <div className="approach-main" data-reveal>
          <div>
            <h2 className="display approach-title">Custom hair.<br />Precise fit.</h2>
            <p className="approach-copy">Your hairline, color, texture, density, cut and routine are considered together. The result should feel like you, not a product.</p>
          </div>
          <aside className="since-card">
            <small>Experience / continuity</small>
            <div>
              <strong>Serving Denver</strong>
              <span>Since<br />1989.</span>
            </div>
            <p>One studio. Long relationships. A stylist who knows your history.</p>
          </aside>
        </div>
        <div className="benefits">
          <article data-reveal>
            <h3>Made to match you.</h3>
            <p>Color, texture, density and hairline are matched with a trained eye.</p>
          </article>
          <article data-reveal>
            <h3>Made to disappear.</h3>
            <p>A precise fit, custom cut and natural blend, all handled privately.</p>
          </article>
          <article data-reveal>
            <h3>Made for real life.</h3>
            <p>A clear care plan and ongoing appointments that fit your routine.</p>
          </article>
        </div>
      </section>

      <section className="results" id="results">
        <div className="section-kicker">
          <span>Real results</span>
          <span>Real clients · Honest color · No stock photos</span>
        </div>
        <div className="results-intro" data-reveal>
          <h2 className="display results-title">The work<br />speaks for itself.</h2>
          <div>
            <p>Natural hairlines. Precise color. Styles chosen for the person, not the category.</p>
            <a className="button button-dark" href="#result-gallery">
              <span>View transformations</span>
              <Arrow />
            </a>
          </div>
        </div>
        <div className="result-gallery" id="result-gallery">
          <figure className="result-card" data-reveal>
            <img src="/images/crysta-before-after.jpg" alt="Woman before and after a custom hair piece" />
            <figcaption>
              <small>Before / after · Custom piece</small>
              <span>Curl, color and coverage matched to her own hair.</span>
            </figcaption>
          </figure>
          <figure className="result-card" data-reveal>
            <img src="/images/scott-before-after.jpg" alt="Man before and after a custom hair system" />
            <figcaption>
              <small>Before / after · Custom system</small>
              <span>A natural hairline shaped for the face.</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="process" id="process">
        <div className="process-intro dark-section">
          <div className="section-kicker section-kicker-dark">
            <span>How it works</span>
            <span>Private from day one</span>
          </div>
          <div className="process-copy" data-reveal>
            <h2 className="display process-title">Old-school<br />care.<br />None of the<br />friction.</h2>
            <p>A real person who knows your hair, plus online booking, clear reminders and a straightforward plan for what comes next.</p>
          </div>
        </div>
        <div className="steps" data-reveal>
          <div className="steps-header">
            <h2>From first call to full fit.</h2>
            <span>4 steps</span>
          </div>
          <ol>
            <li>
              <span className="step-number">01</span>
              <div><h3>Book privately.</h3><p>Choose a time online, or call or text if you&apos;d rather talk first.</p></div>
            </li>
            <li>
              <span className="step-number">02</span>
              <div><h3>Talk it through.</h3><p>We look at your hair, your routine and what you want to change.</p></div>
            </li>
            <li>
              <span className="step-number">03</span>
              <div><h3>Match and make.</h3><p>Fit, color, texture, density and style are planned together.</p></div>
            </li>
            <li>
              <span className="step-number">04</span>
              <div><h3>Fit it. Live in it.</h3><p>Leave styled, informed and clear on maintenance and rebooking.</p></div>
            </li>
          </ol>
        </div>
      </section>

      <section className="studio" id="studio">
        <div className="section-kicker">
          <span>The studio</span>
          <span>Independent · Experienced · Denver</span>
        </div>
        <div className="studio-main" data-reveal>
          <h2 className="display studio-title">Private<br />by default.</h2>
          <div className="studio-copy">
            <p>No crowded clinic. No rotating cast. Start with a private, no-pressure consultation and stay with people who know your hair.</p>
            <blockquote>
              <p>“He nailed my natural curls and hair color.”</p>
              <cite>Client review · Denver</cite>
            </blockquote>
          </div>
        </div>
        <div className="studio-details" data-reveal>
          <div><small>Visit / Hampden</small><address>7535 E. Hampden Ave.<br />Building 2, Suite 502</address></div>
          <div><small>Call / text</small><a href={phoneHref}>{phoneDisplay}</a></div>
          <div><a className="button button-dark" href={directionsHref} target="_blank" rel="noreferrer"><span>Meet the studio</span><Arrow /></a></div>
        </div>
      </section>

      <section className="final-cta" data-reveal>
        <div>
          <small>Free private consultation · No pressure</small>
          <h2 className="display">Ready when you are.</h2>
        </div>
        <BookingLink />
      </section>

      <footer className="site-footer">
        <div className="footer-top" data-reveal>
          <div className="footer-about">
            <h2>Denver · Since 1989</h2>
            <p>Private, custom non-surgical hair replacement in Denver since 1989.</p>
          </div>
          <nav aria-label="Footer navigation">
            <div>
              <small>Explore</small>
              <a href="#hair-systems">Hair Systems</a>
              <a href="#results">Results</a>
              <a href="#studio">The Studio</a>
              <a href="#process">Questions</a>
            </div>
            <div>
              <small>Start here</small>
              <a href="/book">Book a Private Consult</a>
              <a href="/clients">Current Clients</a>
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
    </main>
  );
}
