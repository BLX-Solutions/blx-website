export const compileTimings = {
  mobile: {
    revealCode: 260,
    navigate: 1720,
    resolve: 300,
    close: 760,
    safetyReset: 3800,
  },
  desktop: {
    revealCode: 120,
    navigate: 760,
    resolve: 160,
    close: 460,
    safetyReset: 2200,
  },
} as const;

export type CompileTiming = typeof compileTimings.mobile;

type CompileRecipe = {
  activity: string;
  lines: (label: string, href: string) => string[];
};

const compileRecipes: Record<string, CompileRecipe> = {
  "01": {
    activity: "Shaping business goals into interface logic",
    lines: (label, href) => [
      `const brief = blx.capture("${label}");`,
      "const structure = await blx.shape(brief);",
      `route.mount(structure, "${href}");`,
      `render("human-led");`,
    ],
  },
  "02": {
    activity: "Mapping search intent into relevance signals",
    lines: (label, href) => [
      `const query = blx.listen("${label}");`,
      "const relevance = await blx.map(query);",
      `route.resolve(relevance, "${href}");`,
      `render("discoverable");`,
    ],
  },
  "03": {
    activity: "Aligning channels with a clear objective",
    lines: (label, href) => [
      `const objective = blx.focus("${label}");`,
      "const campaign = await blx.align(objective);",
      `route.launch(campaign, "${href}");`,
      `render("measurable");`,
    ],
  },
  "04": {
    activity: "Packaging knowledge for confident ownership",
    lines: (label, href) => [
      `const ownership = blx.prepare("${label}");`,
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
