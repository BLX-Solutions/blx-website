import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="BLX Solutions home">
        <img src="/blx-solutions-logo.svg" alt="BLX Solutions" />
      </Link>
      <nav aria-label="Main navigation">
        <Link href="/#services">Services</Link>
        <Link href="/#approach">Approach</Link>
        <Link href="/#work">Work</Link>
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
      <p>© 2026 BLX Solutions. Human-led digital strategy.</p>
    </footer>
  );
}
