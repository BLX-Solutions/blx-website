import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter, SiteHeader } from "../../site-chrome";
import { getWorkProject, workProjects } from "../../work";

type WorkPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return workProjects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: WorkPageProps): Promise<Metadata> {
  const project = getWorkProject((await params).slug);
  if (!project) return {};
  return { title: `${project.title} | BLX Solutions work`, description: project.summary };
}

export default async function WorkCaseStudy({ params }: WorkPageProps) {
  const project = getWorkProject((await params).slug);
  if (!project) notFound();

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <main id="main-content" className="case-page">
        <section className={`case-hero shell ${project.accent}`}>
          <div className="case-hero__meta"><span>WORK / {project.number}</span><span>{project.status}</span></div>
          <p className="eyebrow">{project.category}</p>
          <h1>{project.title}</h1>
          <p>{project.summary}</p>
        </section>

        <section className="case-story shell">
          <article><span className="detail-label">The challenge</span><h2>What needed solving.</h2><p>{project.challenge}</p></article>
          <article><span className="detail-label">The approach</span><h2>How the work is being shaped.</h2><p>{project.approach}</p></article>
        </section>

        <section className="case-evidence shell">
          <div><p className="eyebrow">Current evidence</p><h2>What exists today.</h2></div>
          <ol>{project.evidence.map((item, index) => <li key={item}><span>0{index + 1}</span><strong>{item}</strong></li>)}</ol>
        </section>

        <section className="case-next shell">
          <span className="detail-label">Next checkpoint</span>
          <p>{project.next}</p>
          <div><Link className="button button--secondary" href="/work">All selected work</Link><Link className="button button--primary" href="/contact">Discuss a project</Link></div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
