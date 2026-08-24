import Link from "next/link";
import { services } from "./services";
import { SiteFooter, SiteHeader } from "./site-chrome";
import { workProjects } from "./work";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />

      <main id="main-content">
        <section className="hero shell" id="top">
          <div className="hero-copy">
            <p className="eyebrow">Websites and digital marketing for small local businesses</p>
            <h1>
              <span>Smarter digital tools.</span>
              <span className="signal-line">Human-led strategy.</span>
              <span>Better solutions.</span>
            </h1>
            <p className="hero-intro">
              BLX Solutions combines web design, SEO, AI visibility and practical
              digital marketing with human judgment, clear strategy and an
              understanding of your business.
            </p>
            <div className="hero-actions">
              <Link className="button button--primary" href="/contact">Get a free website review</Link>
              <Link className="button button--secondary" href="/contact">Request a quote</Link>
              <Link className="text-link" href="/contact">Send a message</Link>
            </div>
          </div>

          <div className="signal-grid" aria-label="BLX approach">
            <article className="signal-card signal-card--lead">
              <span className="card-label">Signal 01</span>
              <div className="pulse" aria-hidden="true" />
              <h2>Human strategy</h2>
              <p>Judgment, context and direction remain at the centre.</p>
            </article>
            <article className="signal-card">
              <span className="card-label">Signal 02</span>
              <div className="code-mark" aria-hidden="true">&lt;/&gt;</div>
              <h2>Web design</h2>
            </article>
            <article className="signal-card signal-card--blue">
              <span className="card-label">Signal 03</span>
              <div className="growth-mark" aria-hidden="true">↗</div>
              <h2>Digital growth</h2>
            </article>
          </div>
        </section>

        <div className="trust-strip" aria-label="Working principles">
          <div className="shell trust-strip__inner">
            <span>Built for real businesses</span><span>Human oversight</span>
            <span>Clear handover</span><span>No empty jargon</span>
          </div>
        </div>

        <section className="services shell" id="services">
          <div className="section-heading">
            <div><p className="eyebrow">What we do</p><h2>Useful digital work,<br />connected by strategy.</h2></div>
            <p>Each service works independently. Together, they form a clearer and more effective digital presence.</p>
          </div>
          <div className="service-grid">
            {services.map((service) => (
              <Link className={service.className} href={`/services/${service.slug}`} key={service.number}>
                <span className="service-number">{service.number}</span>
                <div><h3>{service.title}</h3><p>{service.shortDescription}</p></div>
                <span className="card-arrow" aria-hidden="true">View service</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="selected-work shell" id="work">
          <div className="section-heading">
            <div><p className="eyebrow">Selected work</p><h2>Real projects.<br />Honest status.</h2></div>
            <p>Work in progress can still demonstrate useful thinking. These case studies separate completed evidence from future ambition.</p>
          </div>
          <div className="selected-work__grid">
            {workProjects.map((project) => (
              <Link className={`case-card ${project.accent}`} href={`/work/${project.slug}`} key={project.slug}>
                <div className="case-card__top"><span>{project.number}</span><span>{project.status}</span></div>
                <div className="case-card__signal" aria-hidden="true"><span /><span /><span /></div>
                <div><p>{project.category}</p><h3>{project.title}</h3><p>{project.summary}</p></div>
                <strong>View case study</strong>
              </Link>
            ))}
          </div>
          <Link className="text-link selected-work__link" href="/work">Explore all selected work</Link>
        </section>

        <section className="approach shell" id="approach">
          <div className="approach-card">
            <p className="eyebrow">The BLX approach</p>
            <h2>AI can accelerate the work.<br />It should never replace the thinking.</h2>
            <p>Tools help us move faster and see more. Human experience decides what fits your audience, your goals and your business.</p>
          </div>
          <div className="phase-card">
            <span className="card-label">Coming in phase two</span>
            <div className="compile-preview"><span>BLX</span><span className="compile-cursor" aria-hidden="true" /></div>
            <p>The full BLX Compile page-transition system will turn navigation into part of the story.</p>
          </div>
        </section>

        <section className="founder-signal shell">
          <div>
            <p className="eyebrow">Experience behind the system</p>
            <h2>BLX is new.<br />The digital experience isn&apos;t.</h2>
          </div>
          <div className="founder-signal__copy">
            <p>BLX is led by Luke Brown, with experience spanning e-commerce, website delivery, SEO, paid search, digital strategy, reporting and client relationships.</p>
            <div className="experience-tags" aria-label="Areas of experience"><span>E-commerce</span><span>Website delivery</span><span>PPC</span><span>Client accounts</span></div>
            <Link className="text-link" href="/about">Read the BLX story</Link>
          </div>
        </section>

        <section className="contact shell" id="contact">
          <p className="eyebrow">Start a conversation</p>
          <h2>Tell us what you want<br />your business to become.</h2>
          <p>Share a few useful details and we&apos;ll use them to understand the right next step for your business.</p>
          <Link className="button button--primary" href="/contact">Start your enquiry</Link>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
