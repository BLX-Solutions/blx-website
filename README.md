<p align="center">
  <img src="assets/brand/blx-solutions-logo.svg" alt="BLX Solutions — Digital Marketing" width="640">
</p>

# BLX Solutions Website

Official website project for **BLX Solutions**.

> Websites and digital marketing for small local businesses.

## Current status

Phase 1 development is underway. The repository now contains the first working **Signal System** homepage slice:

- Responsive navigation and hero
- Human-led strategy messaging
- Signal-card interaction concept
- Four-service bento grid
- BLX design tokens and responsive CSS
- Reduced-motion accessibility support
- Current BLX logo and favicon

The full **BLX Compile** opening and route-transition engine is deliberately reserved for a later phase, after the stable pages and content are established.

## Run it locally

You will need Node.js 22 or newer.

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

To verify a production build:

```bash
npm run build
```

## Current brand asset

The logo above is the current official BLX Solutions logo for this project. It is provisional and may be refined or replaced as the brand develops.

Source file: [assets/brand/blx-solutions-logo.svg](assets/brand/blx-solutions-logo.svg)

## Locked design direction

> **The Signal System, powered by BLX Compile transitions.**

The finished pages will use a clean bento-grid structure, expressive typography, restrained glass surfaces and purposeful micro-interactions. Technical complexity will be concentrated in the opening and page-transition experiences.

Guiding principle:

> **Visually simple. Technically sophisticated. Strategically clear.**

See the full [design direction](docs/DESIGN-DIRECTION.md), [roadmap](docs/ROADMAP.md) and [technical foundation](docs/TECHNICAL-FOUNDATION.md).

## Approved foundation

- Next.js App Router
- TypeScript
- Custom CSS and reusable design tokens
- npm
- Cloudflare planned for production hosting closer to launch

No hosting setup is required for local development.
