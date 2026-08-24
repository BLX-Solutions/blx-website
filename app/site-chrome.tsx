import Link from "next/link";
import { contactDetails } from "./contact-details";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="BLX Solutions home">
        <img src="/blx-solutions-logo.svg" alt="BLX Solutions" />
      </Link>
      <nav aria-label="Main navigation">
        <Link href="/#services">Services</Link>
        <Link href="/#approach">Approach</Link>
        <Link href="/work">Work</Link>
        <Link href="/about">About</Link>
        <Link className="nav-cta" href="/contact">Request a quote</Link>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer shell">
      <Link href="/" aria-label="BLX Solutions home">
        <img src="/blx-solutions-logo.svg" alt="BLX Solutions" />
      </Link>
      <div className="site-footer__details">
        <a href={contactDetails.emailHref}>{contactDetails.email}</a>
        <p>© 2026 BLX Solutions. Human-led digital strategy.</p>
      </div>
    </footer>
  );
}
