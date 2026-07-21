import type { Metadata } from "next";
import SiteFooter from "../site-footer";
import SiteHeader from "../site-header";
import { sitePath } from "../site-path";

const faqs = [
  {
    question: "What is non-surgical hair replacement?",
    answer: "It is a custom hair system that adds coverage and density without surgery. The hairline, color, texture, density, base and cut can all be tailored so the finished result works with your own hair and face.",
  },
  {
    question: "What happens during the first consultation?",
    answer: "You meet privately with the studio manager to talk through what has changed, what you want and how you live. You can see options, ask direct questions and understand the likely process before deciding what comes next.",
  },
  {
    question: "How long should I plan for the consultation?",
    answer: "Plan for about an hour for an in-studio consultation. That leaves enough time to discuss your goals, look at coverage and matching needs, and talk through a realistic care plan without rushing.",
  },
  {
    question: "Will a hair system look natural?",
    answer: "A natural result depends on the details working together. Hairline, color, curl, texture, density, fit and cut are considered as one system. The goal is for people to notice you, not the hair.",
  },
  {
    question: "Can I shower, work out or swim in it?",
    answer: "Modern systems are designed for daily life, including showers, exercise and occasional swimming. The exact guidance depends on the attachment method and your routine. Chlorine, salt water, heat and rough handling can shorten the life of the hair, so the studio will give you specific care instructions.",
  },
  {
    question: "How often will I need maintenance?",
    answer: "Maintenance varies with the system, attachment method, scalp, hair growth and lifestyle. Ongoing appointments usually cover cleaning, refitting, blending and styling. Your schedule should be clear before you commit.",
  },
  {
    question: "How long does a hair system last?",
    answer: "There is no single lifespan for every system. Base material, realism, frequency of wear and care all affect longevity. More delicate, natural-looking materials may need replacement sooner than heavier materials designed for durability.",
  },
  {
    question: "How much does it cost?",
    answer: "Pricing depends on coverage, materials, customization and ongoing service. The private consultation is the right place to get a recommendation and a clear quote based on what you actually need.",
  },
  {
    question: "Do you work with both men and women?",
    answer: "Yes. Hair Unlimited works with men and women of different ages and with different types of hair loss. Every recommendation begins with the person, not a standard package.",
  },
  {
    question: "Is the process private?",
    answer: "Privacy is built into the experience. Consultations and appointments take place in a discreet studio setting, with one-to-one conversations and a team that understands how personal hair loss can feel.",
  },
] as const;

export const metadata: Metadata = {
  title: "Hair System Questions | Hair Unlimited of Denver",
  description: "Straightforward answers about private consultations, custom hair systems, maintenance and daily life.",
};

export default function FAQPage() {
  return (
    <>
      <SiteHeader />
      <main className="faq-page">
        <section className="faq-hero">
        <div className="faq-hero-title">
          <span>Questions / straight answers</span>
          <h1 className="display">Ask<br />anything.</h1>
        </div>
        <div className="faq-hero-copy">
          <span>FAQ preview</span>
          <p>Hair loss is personal. The answers should be clear. Start here, then bring every other question to a private consultation.</p>
          <small>Draft content for studio review</small>
        </div>
        </section>

        <section className="faq-content">
        <div className="faq-content-intro">
          <span>Good to know</span>
          <h2>Before you book.</h2>
        </div>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <details key={faq.question} open={index === 0}>
              <summary>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{faq.question}</strong>
                <b aria-hidden="true">+</b>
              </summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
        </section>

        <section className="faq-cta">
        <div>
          <span>Ready for a real answer?</span>
          <h2 className="display">Talk it through privately.</h2>
        </div>
        <a className="button button-dark" href={sitePath("/book")}>
          <span>Book a private consult</span>
          <span aria-hidden="true">↗</span>
        </a>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
