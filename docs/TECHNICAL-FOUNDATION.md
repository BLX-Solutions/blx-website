# BLX Solutions Technical Foundation

**Status: Approved — 24 August 2026**

## Approved stack

- **Framework:** Next.js App Router
- **Language:** TypeScript
- **Styling:** CSS Modules, global CSS and reusable CSS variables/design tokens
- **Animation:** CSS for routine effects; Motion for React for advanced interaction and layout animation
- **Page transitions:** React/Next View Transitions, enhanced by the isolated BLX Compile module
- **Package manager:** npm
- **Version control:** GitHub at `BLX-Solutions/blx-website`
- **Intended production host:** Cloudflare Workers through the OpenNext adapter

## Development approach

The website will be built locally before permanent hosting is configured.

During development:

1. Run the website using the local Next.js development server.
2. Store and review all work through GitHub.
3. Test the Signal System, responsive layouts and BLX Compile locally.
4. Create temporary shareable previews only when useful.
5. Configure Cloudflare and connect the final domain closer to launch.

No Cloudflare account configuration, paid plan or live domain is required to begin development.

## Styling decision

The project will use custom CSS rather than Tailwind for the initial build.

This supports:

- A genuinely custom Signal System
- Direct learning of CSS Grid, variables, responsive layouts and animation
- Clear separation between design tokens and component-specific styling
- Easier control of glass surfaces, kinetic typography and bespoke interactions

## Animation boundary

Use CSS for:

- Hover colours
- Button feedback
- Glass highlights
- Simple transforms and reveals
- Reduced-motion fallbacks

Use Motion for React only where it adds meaningful value:

- Cursor-responsive bento cards
- Shared-layout transformations
- Complex sequencing
- Exit animations
- BLX Compile prototypes

## BLX Compile architecture

BLX Compile begins as an isolated, configurable module inside this website project.

The project-specific layer supplies:

- BLX branding
- Service content
- Relevant code snippets
- Route and page configuration

The reusable engine manages:

- Transition stages
- Animation timing
- Destination preloading
- Session and repeat-visit behaviour
- Reduced-motion alternatives
- Browser-navigation compatibility

After the homepage entry and one service transition are validated, the reusable parts may be extracted into a separate internal BLX toolkit.

## Hosting decision

Cloudflare Workers is the intended production target because it supports the selected Next.js architecture and provides a suitable path for custom domains and future server-side functionality.

Hosting remains provisional until production deployment is required. The website must not depend unnecessarily on Cloudflare-specific features during the early phases.
