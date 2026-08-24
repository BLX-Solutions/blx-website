import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter, SiteHeader } from "../../site-chrome";
import { getService, services } from "../../services";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) return {};

  return {
    title: `${service.title} | BLX Solutions`,
    description: service.shortDescription,
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const service = getService((await params).slug);
  if (!service) notFound();

  const currentIndex = services.findIndex(({ slug }) => slug === service.slug);
  const nextService = services[(currentIndex + 1) % services.length];

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <main id="main-content" className="service-page">
        <section className="service-hero shell">
          <div className="service-hero__meta">
            <span>BLX / SERVICES / {service.number}</span>
            <span>HUMAN-LED</span>
          </div>
          <p className="eyebrow">{service.title}</p>
          <h1>{service.headline}</h1>
          <p className="service-hero__intro">{service.introduction}</p>
          <Link className="button button--primary service-hero__cta" href={`/contact?service=${service.slug}`}>Discuss this service</Link>
        </section>

        <section className="service-detail shell">
          <article>
            <span className="detail-label">The challenge</span>
            <h2>What gets in the way.</h2>
            <p>{service.challenge}</p>
          </article>
          <article className="service-detail__response">
            <span className="detail-label">The BLX response</span>
            <h2>Strategy before activity.</h2>
            <p>{service.response}</p>
          </article>
        </section>

        <section className="outcomes shell">
          <div className="outcomes__heading">
            <p className="eyebrow">Useful outcomes</p>
            <h2>What the work<br />should leave behind.</h2>
          </div>
          <ol>
            {service.outcomes.map((outcome, index) => (
              <li key={outcome}><span>0{index + 1}</span><strong>{outcome}</strong></li>
            ))}
          </ol>
        </section>

        <section className="service-next shell">
          <div>
            <p className="eyebrow">Continue exploring</p>
            <p>Next signal</p>
            <h2>{nextService.title}</h2>
          </div>
          <Link className="button button--primary" href={`/services/${nextService.slug}`}>
            View service
          </Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
