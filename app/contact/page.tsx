import type { Metadata } from "next";
import { ContactForm } from "./contact-form";
import { SiteFooter, SiteHeader } from "../site-chrome";
import { getService } from "../services";
import { contactDetails } from "../contact-details";

export const metadata: Metadata = {
  title: "Contact BLX Solutions | Start a conversation",
  description: "Tell BLX Solutions about your website, SEO or digital marketing project.",
};

type ContactPageProps = {
  searchParams: Promise<{ service?: string }>;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const requestedService = (await searchParams).service || "";
  const initialService = getService(requestedService) ? requestedService : "";

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <main id="main-content" className="contact-page">
        <section className="contact-hero shell">
          <div>
            <p className="eyebrow">Start a conversation</p>
            <h1>A useful first step.<br />No hard sell.</h1>
          </div>
          <p>Tell us where your business is now and what you would like to improve. We&apos;ll review it with human judgment and come back with a clear next step.</p>
        </section>

        <section className="contact-system shell">
          <aside>
            <span className="detail-label">What happens next</span>
            <ol>
              <li><span>01</span><p>We read your enquiry and look at the wider business context.</p></li>
              <li><span>02</span><p>We identify the most useful next step, not the biggest possible package.</p></li>
              <li><span>03</span><p>You receive a straightforward response and can decide whether to continue.</p></li>
            </ol>
            <div className="direct-contact">
              <span className="detail-label">Prefer email?</span>
              <a href={contactDetails.emailHref}>{contactDetails.email}</a>
              {contactDetails.isProvisionalEmail && <small>Temporary address — a branded domain email will replace this before launch.</small>}
            </div>
            <p className="contact-note">The enquiry form&apos;s automatic message delivery will be connected and tested before launch. Until then, this email link is the working contact route.</p>
          </aside>
          <div className="form-panel">
            <div className="form-panel__heading"><span>ENQUIRY / 001</span><span>PRIVATE</span></div>
            <h2>What are you working on?</h2>
            <ContactForm initialService={initialService} />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
