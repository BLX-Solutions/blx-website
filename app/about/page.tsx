import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../site-chrome";
import { experienceTimeline, widerProjects } from "../experience";

export const metadata: Metadata = {
  title: "About BLX Solutions | Digital experience with human judgment",
  description: "Meet the experience and working principles behind BLX Solutions — web design and digital marketing for small local businesses.",
};

export default function AboutPage() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <main id="main-content" className="about-page">
        <section className="about-hero shell">
          <p className="eyebrow">About BLX Solutions</p>
          <h1>A new business.<br />Experience built over time.</h1>
          <div className="about-hero__intro">
            <p>BLX Solutions is led by Luke Brown, bringing together experience across customer service, e-commerce, website delivery, SEO, paid search, reporting and client account management.</p>
            <p>The aim is simple: use modern tools intelligently while keeping strategy, context and final judgment firmly human.</p>
          </div>
        </section>

        <section className="experience shell">
          <div className="experience__heading"><p className="eyebrow">Experience timeline</p><h2>Digital work grounded<br />in business reality.</h2></div>
          <ol>
            {experienceTimeline.map((item) => (
              <li key={item.period}>
                <span>{item.period}</span>
                <h3>{item.role}</h3>
                <p>{item.description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="working-process shell" id="process">
          <div className="section-heading">
            <div><p className="eyebrow">How BLX works</p><h2>Clear stages.<br />No mystery layer.</h2></div>
            <p>Clients should understand what is happening, why it matters and what they will own when the work is complete.</p>
          </div>
          <ol className="process-grid">
            <li><span>01</span><h3>Understand</h3><p>Listen to the business, the audience and the real problem before proposing activity.</p></li>
            <li><span>02</span><h3>Prioritise</h3><p>Choose the clearest useful next step rather than automatically recommending the largest package.</p></li>
            <li><span>03</span><h3>Build and review</h3><p>Use appropriate tools to work efficiently, with human review guiding every important decision.</p></li>
            <li><span>04</span><h3>Handover or support</h3><p>Leave the client informed and in control, with continued help available where it adds value.</p></li>
          </ol>
        </section>

        <section className="wider-work shell">
          <div><p className="eyebrow">Beyond job titles</p><h2>Curiosity has always<br />been part of the work.</h2></div>
          <ul>{widerProjects.map((project) => <li key={project}>{project}</li>)}</ul>
        </section>

        <section className="about-cta shell">
          <p className="eyebrow">Work with BLX</p>
          <h2>Bring the business context.<br />We&apos;ll help shape the digital answer.</h2>
          <div><Link className="button button--primary" href="/contact">Start a conversation</Link><Link className="button button--secondary" href="/work">View selected work</Link></div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
