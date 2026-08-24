export const compileTimings = {
  revealCode: 360,
  navigate: 1180,
  resolve: 420,
  close: 820,
  safetyReset: 3200,
} as const;

export function createCompileLines(label: string, href: string) {
  return [
    `const signal = blx.capture("${label}");`,
    `signal.strategy = "human-led";`,
    `signal.destination = "${href}";`,
    "await blx.compile(signal);",
    "render(signal.destination);",
  ];
}
