"use client";

import { FormEvent, useState } from "react";
import { services } from "../services";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContactForm({ initialService = "" }: { initialService?: string }) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) throw new Error(result.message || "Something went wrong.");
      setStatus("success");
      setMessage(result.message || "Thanks — your enquiry has been received.");
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <form className="enquiry-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          <span>Your name *</span>
          <input autoComplete="name" maxLength={80} name="name" required type="text" />
        </label>
        <label>
          <span>Business name</span>
          <input autoComplete="organization" maxLength={100} name="business" type="text" />
        </label>
        <label>
          <span>Email address *</span>
          <input autoComplete="email" maxLength={120} name="email" required type="email" />
        </label>
        <label>
          <span>Phone number</span>
          <input autoComplete="tel" maxLength={40} name="phone" type="tel" />
        </label>
        <label>
          <span>What can we help with? *</span>
          <select defaultValue={initialService} name="service" required>
            <option disabled value="">Choose a service</option>
            {services.map((service) => <option key={service.slug} value={service.slug}>{service.title}</option>)}
            <option value="not-sure">I&apos;m not sure yet</option>
          </select>
        </label>
        <label>
          <span>Current website</span>
          <input inputMode="url" maxLength={180} name="currentWebsite" placeholder="https://" type="url" />
        </label>
      </div>

      <label className="form-message">
        <span>Tell us about the project *</span>
        <textarea maxLength={2000} name="project" placeholder="What would you like to improve, and what would a good result look like?" required rows={7} />
      </label>

      <label className="form-consent">
        <input name="consent" required type="checkbox" value="accepted" />
        <span>I&apos;m happy for BLX Solutions to use these details to reply to my enquiry. My details will not be added to a marketing list. *</span>
      </label>

      <div className="honeypot" aria-hidden="true">
        <label>Leave this field empty<input autoComplete="off" name="companyWebsite" tabIndex={-1} type="text" /></label>
      </div>

      <div className="form-submit">
        <button className="button button--primary" disabled={status === "submitting"} type="submit">
          {status === "submitting" ? "Sending enquiry…" : "Send enquiry"}
        </button>
        <p className={`form-status form-status--${status}`} aria-live="polite">{message}</p>
      </div>
    </form>
  );
}
