export type WorkProject = {
  slug: string;
  number: string;
  title: string;
  category: string;
  status: string;
  summary: string;
  challenge: string;
  approach: string;
  evidence: string[];
  next: string;
  accent: string;
};

export const workProjects: WorkProject[] = [
  {
    slug: "circus-ibiza",
    number: "01",
    title: "The Circus — Ibiza",
    category: "Client website redesign",
    status: "In progress",
    summary: "A WordPress redesign balancing polished beauty-salon trust with a modern, editorial Ibiza personality.",
    challenge: "The existing site needs a clearer mobile journey, stronger treatment discovery and a more distinctive visual identity without turning the experience into a circus gimmick.",
    approach: "The redesign uses structured treatment cards, confident black-and-sage contrast, stronger booking calls to action and an image-led story grounded in the real salon.",
    evidence: ["New homepage and supporting-page drafts", "Responsive refinement across key sections", "Reviews, booking and legal-content integration", "SEO and performance launch plan"],
    next: "Complete content, responsive QA, performance work and launch measurement. Any future results will be added only after they are measured.",
    accent: "case-card--sage",
  },
  {
    slug: "grocery-comparison-prototype",
    number: "02",
    title: "Grocery comparison prototype",
    category: "Internal product prototype",
    status: "Prototype checkpoint",
    summary: "A health-focused UK grocery concept that compares suitable products, not simply the cheapest item with a similar name.",
    challenge: "Typical comparison tools struggle with natural-language requirements, strict allergens, nutrition priorities and the trade-off between a cheaper basket and a genuinely suitable one.",
    approach: "The prototype starts with Tesco and Aldi, translates shopper requirements into explainable rules, and explores basket rankings around price, protein, fibre, carbohydrates and suitability.",
    evidence: ["Human-readable validation rules", "Strict allergen protection", "Transparent near-match handling", "Competition-style basket rankings"],
    next: "The project is paused at a clean version-one checkpoint while BLX prioritises its business website. It remains an honest product-thinking and development case study.",
    accent: "case-card--amber",
  },
  {
    slug: "blx-signal-system",
    number: "03",
    title: "The BLX Signal System",
    category: "Brand and web system",
    status: "In active development",
    summary: "BLX Solutions building its own digital presence as a reusable demonstration of strategy, design and careful technical ambition.",
    challenge: "Create something futuristic enough to be memorable without sacrificing speed, clarity, accessibility or hundreds of unnecessary development hours.",
    approach: "A visually restrained system of typography, bento layouts and signal cues provides the stable foundation. Complexity is reserved for the reusable BLX Compile transition engine.",
    evidence: ["Reusable design tokens and page structure", "Four genuine service routes", "Accessible enquiry-system foundation", "Reduced-motion and responsive behaviour"],
    next: "Complete the stable content and credibility layers, then prototype BLX Compile against real routes rather than building animation around empty pages.",
    accent: "case-card--blue",
  },
];

export function getWorkProject(slug: string) {
  return workProjects.find((project) => project.slug === slug);
}
