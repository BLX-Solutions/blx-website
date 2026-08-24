import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../site-chrome";
import { workProjects } from "../work";

export const metadata: Metadata = {
  title: "Selected work | BLX Solutions",
  description: "Current BLX Solutions client, product and brand-development work — presented with honest project status and evidence.",
};

export default function WorkPage() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <main id="main-content" className="work-page">
        <section className="work-hero shell">
          <p className="eyebrow">Selected work</p>
          <h1>Show the thinking.<br />State the truth.</h1>
          <div className="work-hero__footer">
            <p>BLX is at the beginning of its next chapter. These projects show the real process, current evidence and work still to be completed — without invented results.</p>
            <span>03 / ACTIVE PROJECTS</span>
          </div>
        </section>
        <section className="work-list shell" aria-label="BLX projects">
          {workProjects.map((project) => (
            <Link className={`case-card ${project.accent}`} href={`/work/${project.slug}`} key={project.slug}>
              <div className="case-card__top"><span>{project.number}</span><span>{project.status}</span></div>
              <div className="case-card__signal" aria-hidden="true"><span /><span /><span /></div>
              <div><p>{project.category}</p><h2>{project.title}</h2><p>{project.summary}</p></div>
              <strong>View case study</strong>
            </Link>
          ))}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
