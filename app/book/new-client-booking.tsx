"use client";

import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { sitePath } from "../site-path";

const phoneDisplay = "(303) 868-1977";
const phoneHref = "tel:+13038681977";
const consultationHost = "Studio manager";
const consultationTimes = ["9:30 AM", "11:00 AM", "1:30 PM", "3:00 PM", "4:30 PM"];

const needs = [
  {
    id: "new-hair-loss",
    name: "Hair loss is new",
    description: "Thinning, receding or a change you want to understand.",
  },
  {
    id: "replace-system",
    name: "Replace a system",
    description: "You wear hair now and want a better match, fit or experience.",
  },
  {
    id: "explore-options",
    name: "Explore your options",
    description: "You are early in the process and want an honest conversation.",
  },
] as const;

const consultationTypes = [
  { id: "studio-consult", name: "Private studio consultation", duration: "60 min" },
  { id: "phone-intro", name: "Phone introduction", duration: "15 min" },
] as const;

type Step = 1 | 2 | 3 | 4;

function getUpcomingDates() {
  const dates: Array<{ id: string; day: string; date: string; full: string }> = [];
  const cursor = new Date();
  cursor.setHours(12, 0, 0, 0);
  cursor.setDate(cursor.getDate() + 1);

  while (dates.length < 6) {
    if (cursor.getDay() !== 0) {
      dates.push({
        id: cursor.toISOString().slice(0, 10),
        day: new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(cursor),
        date: new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(cursor),
        full: new Intl.DateTimeFormat("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
        }).format(cursor),
      });
    }
    cursor.setDate(cursor.getDate() + 1);
  }

  return dates;
}

export default function NewClientBooking() {
  const dates = useMemo(getUpcomingDates, []);
  const [step, setStep] = useState<Step>(1);
  const [needId, setNeedId] = useState("");
  const [consultationId, setConsultationId] = useState("");
  const [dateId, setDateId] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  const need = needs.find((item) => item.id === needId);
  const consultation = consultationTypes.find((item) => item.id === consultationId);
  const selectedDate = dates.find((item) => item.id === dateId);
  const canContinue = Boolean(need && consultation && selectedDate && time);

  const chooseNeed = (id: string) => {
    setNeedId(id);
    setConsultationId("");
    setDateId("");
    setTime("");
    setStep(2);
  };

  const submitBooking = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (name.trim() && mobile.trim() && email.trim()) setStep(4);
  };

  const resetBooking = () => {
    setNeedId("");
    setConsultationId("");
    setDateId("");
    setTime("");
    setName("");
    setMobile("");
    setEmail("");
    setNotes("");
    setStep(1);
  };

  return (
    <main className="client-portal new-client-portal">
      <div className="client-main">
        <section className="client-intro">
          <div className="portal-eyebrow">
            <span>New client consultation</span>
            <span>Interactive demo</span>
          </div>
          <h1 className="display client-title new-client-title">Start with a<br />private consult.</h1>
          <p>Tell us what is changing and reserve a private first appointment with the studio manager without a phone call.</p>
        </section>

        <div className="booking-layout new-booking-layout">
          <section className="booking-card new-booking-card" aria-live="polite">
            <div className="booking-progress" aria-label="Booking progress">
              {([
                { number: 1, label: "Your needs" },
                { number: 2, label: "Date and time" },
                { number: 3, label: "Details" },
              ] as const).map(({ number, label }) => (
                <div className={step === number ? "is-current" : step > number ? "is-complete" : ""} key={label}>
                  <span>0{number}</span>
                  <strong>{label}</strong>
                </div>
              ))}
            </div>

            {step === 1 && (
              <div className="booking-step">
                <span className="step-kicker">Step 01</span>
                <h2>What brings you in?</h2>
                <p className="step-lead">A little context helps make the first conversation more useful. Choose the closest fit.</p>
                <div className="stylist-grid choice-grid-three">
                  {needs.map((item, index) => (
                    <button className="stylist-choice need-choice" type="button" onClick={() => chooseNeed(item.id)} key={item.id}>
                      <span className="choice-number">0{index + 1}</span>
                      <strong>{item.name}</strong>
                      <small>{item.description}</small>
                      <span className="choice-action">Choose this <b aria-hidden="true">→</b></span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && need && (
              <div className="booking-step">
                <button className="text-back" type="button" onClick={() => setStep(1)}>← Change answer</button>
                <span className="step-kicker">Step 02 · {consultationHost}</span>
                <h2>Choose a time.</h2>
                <p className="step-lead">Every new client starts with the studio manager for a private, no-pressure conversation.</p>

                <fieldset className="booking-fieldset">
                  <legend>How would you like to start?</legend>
                  <div className="visit-options consult-options">
                    {consultationTypes.map((item) => (
                      <button
                        className={consultationId === item.id ? "is-selected" : ""}
                        type="button"
                        aria-pressed={consultationId === item.id}
                        onClick={() => setConsultationId(item.id)}
                        key={item.id}
                      >
                        <strong>{item.name}</strong>
                        <span>{item.duration}</span>
                      </button>
                    ))}
                  </div>
                </fieldset>

                <fieldset className="booking-fieldset">
                  <legend>Choose a date</legend>
                  <div className="date-options">
                    {dates.map((item) => (
                      <button
                        className={dateId === item.id ? "is-selected" : ""}
                        type="button"
                        aria-pressed={dateId === item.id}
                        onClick={() => { setDateId(item.id); setTime(""); }}
                        key={item.id}
                      >
                        <span>{item.day}</span>
                        <strong>{item.date}</strong>
                      </button>
                    ))}
                  </div>
                </fieldset>

                {selectedDate && (
                  <fieldset className="booking-fieldset time-fieldset">
                    <legend>Available on {selectedDate.full}</legend>
                    <div className="time-options">
                      {consultationTimes.map((item, index) => (
                        <button
                          className={time === item ? "is-selected" : ""}
                          type="button"
                          aria-pressed={time === item}
                          onClick={() => setTime(item)}
                          key={item}
                          disabled={(dates.indexOf(selectedDate) + index) % 6 === 5}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                )}

                <button className="portal-primary" type="button" disabled={!canContinue} onClick={() => setStep(3)}>
                  Continue to details <span aria-hidden="true">→</span>
                </button>
              </div>
            )}

            {step === 3 && need && consultation && selectedDate && (
              <form className="booking-step booking-form" onSubmit={submitBooking}>
                <button className="text-back" type="button" onClick={() => setStep(2)}>← Change time</button>
                <span className="step-kicker">Step 03</span>
                <h2>Your details.</h2>
                <p className="step-lead">This information would be used to confirm the consultation and send a private reminder.</p>

                <div className="form-grid">
                  <label>
                    <span>Name</span>
                    <input value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" required />
                  </label>
                  <label>
                    <span>Mobile number</span>
                    <input type="tel" value={mobile} onChange={(event) => setMobile(event.target.value)} autoComplete="tel" required />
                  </label>
                  <label className="notes-field">
                    <span>Email</span>
                    <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required />
                  </label>
                  <label className="notes-field">
                    <span>Anything you would like us to know? <em>Optional</em></span>
                    <textarea value={notes} onChange={(event) => setNotes(event.target.value)} rows={4} />
                  </label>
                </div>

                <button className="portal-primary" type="submit">
                  Reserve consultation <span aria-hidden="true">↗</span>
                </button>
                <p className="prototype-note">Demo only. Submitting this form will not create a real appointment.</p>
              </form>
            )}

            {step === 4 && need && consultation && selectedDate && (
              <div className="booking-step confirmation-step">
                <span className="confirmation-mark" aria-hidden="true">✓</span>
                <span className="step-kicker">Demo complete</span>
                <h2>Your consultation is held.</h2>
                <p>{name}, this is what a confirmed first appointment with the studio manager could look like.</p>
                <div className="confirmation-details">
                  <span>{consultation.name}</span>
                  <strong>{selectedDate.full} at {time}</strong>
                </div>
                <button className="portal-primary" type="button" onClick={resetBooking}>
                  Start the demo again <span aria-hidden="true">→</span>
                </button>
                <a className="portal-secondary" href={sitePath("/")}>Return to the website</a>
              </div>
            )}
          </section>

          <aside className="booking-summary new-client-summary">
            <span className="summary-label">Your consultation</span>
            <div className="summary-row">
              <span>What brings you in</span>
              <strong>{need?.name ?? "Not selected"}</strong>
            </div>
            <div className="summary-row">
              <span>Meet with</span>
              <strong>{consultationHost}</strong>
            </div>
            <div className="summary-row">
              <span>Visit</span>
              <strong>{consultation?.name ?? "Not selected"}</strong>
            </div>
            <div className="summary-row">
              <span>Date</span>
              <strong>{selectedDate?.full ?? "Not selected"}</strong>
            </div>
            <div className="summary-row">
              <span>Time</span>
              <strong>{time || "Not selected"}</strong>
            </div>
            <div className="summary-help">
              <span>Prefer to call?</span>
              <a href={phoneHref}>{phoneDisplay}</a>
            </div>
            <p>Prototype booking flow. No appointment data is saved or sent.</p>
          </aside>
        </div>
      </div>
    </main>
  );
}
