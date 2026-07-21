"use client";

import type { FormEvent } from "react";
import { useMemo, useState } from "react";

const phoneDisplay = "(303) 868-1977";
const phoneHref = "tel:+13038681977";

const stylists = [
  {
    id: "stylist-a",
    name: "Stylist A",
    specialties: "Custom systems · Refit · Styling",
    times: ["9:30 AM", "11:00 AM", "1:30 PM", "3:00 PM"],
  },
  {
    id: "stylist-b",
    name: "Stylist B",
    specialties: "Maintenance · Cut and blend · Color",
    times: ["10:00 AM", "12:30 PM", "2:00 PM", "4:30 PM"],
  },
] as const;

const visitTypes = [
  { id: "system-service", name: "System service", duration: "60 min" },
  { id: "cut-blend", name: "Cut and blend", duration: "45 min" },
  { id: "color-adjustment", name: "Color or adjustment", duration: "75 min" },
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

export default function ClientBooking() {
  const dates = useMemo(getUpcomingDates, []);
  const [step, setStep] = useState<Step>(1);
  const [stylistId, setStylistId] = useState("");
  const [visitId, setVisitId] = useState("");
  const [dateId, setDateId] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [notes, setNotes] = useState("");

  const stylist = stylists.find((item) => item.id === stylistId);
  const visit = visitTypes.find((item) => item.id === visitId);
  const selectedDate = dates.find((item) => item.id === dateId);
  const canContinue = Boolean(stylist && visit && selectedDate && time);

  const chooseStylist = (id: string) => {
    setStylistId(id);
    setDateId("");
    setTime("");
    setStep(2);
  };

  const submitBooking = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (name.trim() && mobile.trim()) setStep(4);
  };

  const resetBooking = () => {
    setStylistId("");
    setVisitId("");
    setDateId("");
    setTime("");
    setName("");
    setMobile("");
    setNotes("");
    setStep(1);
  };

  return (
    <main className="client-portal">
      <header className="client-header">
        <a className="header-lockup" href="/" aria-label="Return to Hair Unlimited home">
          <img className="header-monogram" src="/hu-lettermark-gothic-final.svg" alt="" aria-hidden="true" />
          <span className="header-mark">Hair Unlimited</span>
        </a>
        <a className="client-support" href={phoneHref}>
          <span>Need help?</span>
          <strong>{phoneDisplay}</strong>
        </a>
      </header>

      <div className="client-main">
        <section className="client-intro">
          <div className="portal-eyebrow">
            <span>Current client booking</span>
            <span>Interactive demo</span>
          </div>
          <h1 className="display client-title">Book your<br />next visit.</h1>
          <p>This prototype shows how current clients could choose their stylist and book without calling the studio.</p>
        </section>

        <div className="booking-layout">
          <section className="booking-card" aria-live="polite">
            <div className="booking-progress" aria-label="Booking progress">
              {([
                { number: 1, label: "Stylist" },
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
                <h2>Choose your stylist.</h2>
                <p className="step-lead">Start with the person who already knows your hair and service history.</p>
                <div className="stylist-grid">
                  {stylists.map((item, index) => (
                    <button className="stylist-choice" type="button" onClick={() => chooseStylist(item.id)} key={item.id}>
                      <span className="choice-number">0{index + 1}</span>
                      <strong>{item.name}</strong>
                      <small>{item.specialties}</small>
                      <span className="choice-action">View availability <b aria-hidden="true">↗</b></span>
                    </button>
                  ))}
                </div>
                <p className="prototype-note">Placeholder names can be replaced with the real team later.</p>
              </div>
            )}

            {step === 2 && stylist && (
              <div className="booking-step">
                <button className="text-back" type="button" onClick={() => setStep(1)}>← Change stylist</button>
                <span className="step-kicker">Step 02 · {stylist.name}</span>
                <h2>Pick a time.</h2>

                <fieldset className="booking-fieldset">
                  <legend>What do you need?</legend>
                  <div className="visit-options">
                    {visitTypes.map((item) => (
                      <button
                        className={visitId === item.id ? "is-selected" : ""}
                        type="button"
                        aria-pressed={visitId === item.id}
                        onClick={() => setVisitId(item.id)}
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
                      {stylist.times.map((item, index) => (
                        <button
                          className={time === item ? "is-selected" : ""}
                          type="button"
                          aria-pressed={time === item}
                          onClick={() => setTime(item)}
                          key={item}
                          disabled={(dates.indexOf(selectedDate) + index) % 5 === 4}
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

            {step === 3 && stylist && visit && selectedDate && (
              <form className="booking-step booking-form" onSubmit={submitBooking}>
                <button className="text-back" type="button" onClick={() => setStep(2)}>← Change time</button>
                <span className="step-kicker">Step 03</span>
                <h2>Your details.</h2>
                <p className="step-lead">We would use this information to confirm the appointment and send a reminder.</p>

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
                    <span>Anything we should know? <em>Optional</em></span>
                    <textarea value={notes} onChange={(event) => setNotes(event.target.value)} rows={4} />
                  </label>
                </div>

                <button className="portal-primary" type="submit">
                  Book this time <span aria-hidden="true">↗</span>
                </button>
                <p className="prototype-note">Demo only. Submitting this form will not create a real appointment.</p>
              </form>
            )}

            {step === 4 && stylist && visit && selectedDate && (
              <div className="booking-step confirmation-step">
                <span className="confirmation-mark" aria-hidden="true">✓</span>
                <span className="step-kicker">Demo complete</span>
                <h2>You&apos;re penciled in.</h2>
                <p>{name}, this is what a confirmed appointment with {stylist.name} could look like.</p>
                <div className="confirmation-details">
                  <span>{visit.name}</span>
                  <strong>{selectedDate.full} at {time}</strong>
                </div>
                <button className="portal-primary" type="button" onClick={resetBooking}>
                  Start the demo again <span aria-hidden="true">→</span>
                </button>
                <a className="portal-secondary" href="/">Return to the website</a>
              </div>
            )}
          </section>

          <aside className="booking-summary">
            <span className="summary-label">Your visit</span>
            <div className="summary-row">
              <span>Stylist</span>
              <strong>{stylist?.name ?? "Not selected"}</strong>
            </div>
            <div className="summary-row">
              <span>Service</span>
              <strong>{visit?.name ?? "Not selected"}</strong>
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
