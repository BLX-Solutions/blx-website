export type Service = {
  number: string;
  slug: string;
  title: string;
  shortDescription: string;
  headline: string;
  introduction: string;
  challenge: string;
  response: string;
  outcomes: string[];
  className: string;
};

export const services: Service[] = [
  {
    number: "01",
    slug: "website-design",
    title: "Website design",
    shortDescription:
      "Fast, polished websites shaped around your real goals — never a generic template with your logo dropped in.",
    headline: "A website built around the way your business actually works.",
    introduction:
      "BLX designs clear, memorable websites for small businesses that need to look credible, explain their value and turn attention into genuine enquiries.",
    challenge:
      "Many small-business websites look acceptable but make visitors work too hard. The message is unclear, the mobile experience is awkward, and the next step is easy to miss.",
    response:
      "We start with your customers and your commercial goal, then shape the structure, content and visual system around them. Technology supports the result; it never dictates it.",
    outcomes: ["A clear customer journey", "Responsive, accessible pages", "A website you can confidently own"],
    className: "service-card service-card--wide",
  },
  {
    number: "02",
    slug: "seo-ai-visibility",
    title: "SEO & AI visibility",
    shortDescription:
      "A clear foundation that helps the right people discover you through search engines and emerging AI search.",
    headline: "Be easier to find — and easier to understand.",
    introduction:
      "Search visibility now means helping both people and intelligent systems understand who you help, what you offer and why your business is relevant.",
    challenge:
      "A business can offer excellent work and still remain invisible when its website structure, local signals and service language do not match the way customers search.",
    response:
      "We improve the technical and editorial foundations, strengthen local relevance and make your expertise clearer — without chasing shortcuts or filling pages with empty keywords.",
    outcomes: ["Stronger local search foundations", "Clearer service relevance", "Content ready for evolving search behaviour"],
    className: "service-card",
  },
  {
    number: "03",
    slug: "digital-marketing",
    title: "Digital marketing",
    shortDescription:
      "Practical campaigns and content direction built around your audience, budget and next business goal.",
    headline: "Marketing activity with a reason behind it.",
    introduction:
      "BLX helps small businesses choose practical digital activity that supports a real objective instead of producing content simply to stay busy.",
    challenge:
      "It is easy to spread time and budget across too many channels without knowing what each one is meant to achieve or how it supports the wider customer journey.",
    response:
      "We focus the message, channel and next action around your audience. Every recommendation is reviewed through human judgment and the reality of your business.",
    outcomes: ["A focused marketing direction", "More consistent brand communication", "Activity tied to useful goals"],
    className: "service-card",
  },
  {
    number: "04",
    slug: "website-support-handover",
    title: "Website support & handover",
    shortDescription:
      "Dependable ongoing help when you want it, or a clear handover that leaves you confidently in control.",
    headline: "Support that does not create dependence.",
    introduction:
      "Choose ongoing technical support when it provides value, or receive a practical handover that helps you manage the essentials yourself.",
    challenge:
      "Small businesses are often trapped between vague maintenance plans and websites they are afraid to touch. Neither makes ownership feel straightforward.",
    response:
      "We explain what matters, document the setup and agree a support model around real needs. You stay informed and retain control of your website and accounts.",
    outcomes: ["A clear, documented handover", "Practical training where useful", "Flexible help without unnecessary retainers"],
    className: "service-card service-card--wide",
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
