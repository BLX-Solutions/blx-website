export const compileTimings = {
  revealCode: 360,
  navigate: 1850,
  resolve: 420,
  close: 820,
  safetyReset: 4200,
} as const;

type CompileRecipe = {
  activity: string;
  lines: (label: string, href: string) => string[];
};

const compileRecipes: Record<string, CompileRecipe> = {
  "01": {
    activity: "Shaping business goals into interface logic",
    lines: (label, href) => [
      `const brief = blx.capture("${label}");`,
      `brief.intent = "credible + clear";`,
      "const structure = await blx.shape(brief);",
      `route.mount(structure, "${href}");`,
      `render("human-led");`,
    ],
  },
  "02": {
    activity: "Mapping search intent into relevance signals",
    lines: (label, href) => [
      `const query = blx.listen("${label}");`,
      `query.signals = ["search", "local", "AI"];`,
      "const relevance = await blx.map(query);",
      `route.resolve(relevance, "${href}");`,
      `render("discoverable");`,
    ],
  },
  "03": {
    activity: "Aligning channels with a clear objective",
    lines: (label, href) => [
      `const objective = blx.focus("${label}");`,
      `objective.channels = "purpose-led";`,
      "const campaign = await blx.align(objective);",
      `route.launch(campaign, "${href}");`,
      `render("measurable");`,
    ],
  },
  "04": {
    activity: "Packaging knowledge for confident ownership",
    lines: (label, href) => [
      `const ownership = blx.prepare("${label}");`,
      `ownership.mode = "supported, not dependent";`,
      "const handover = await blx.document(ownership);",
      `route.transfer(handover, "${href}");`,
      `render("in control");`,
    ],
  },
};

export function getCompileRecipe(route: string, label: string, href: string) {
  const recipe = compileRecipes[route] ?? compileRecipes["01"];
  return { activity: recipe.activity, lines: recipe.lines(label, href) };
}
