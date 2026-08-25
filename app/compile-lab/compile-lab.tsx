"use client";

import { CSSProperties, MouseEvent, useEffect, useRef, useState } from "react";
import { getCompileRecipe } from "../compile/compile-config";
import styles from "./compile-lab.module.css";

type LabPhase = "idle" | "primed" | "opening" | "code" | "building" | "resolved";
type Origin = { top: number; left: number; width: number; height: number };

const labServices = [
  { route: "01", title: "Website design", slug: "website-design", headline: "A website built around the way your business actually works." },
  { route: "02", title: "SEO & AI visibility", slug: "seo-ai-visibility", headline: "Be easier to find — and easier to understand." },
  { route: "03", title: "Digital marketing", slug: "digital-marketing", headline: "Marketing activity with a reason behind it." },
  { route: "04", title: "Support & handover", slug: "website-support-handover", headline: "Support that does not create dependence." },
] as const;

export function CompileLab() {
  const phone = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);
  const [phase, setPhase] = useState<LabPhase>("idle");
  const [selected, setSelected] = useState(labServices[0]);
  const [origin, setOrigin] = useState<Origin>({ top: 0, left: 0, width: 0, height: 0 });
  const recipe = getCompileRecipe(selected.route, selected.title, `/services/${selected.slug}`);

  function clearTimers() {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
  }

  useEffect(() => clearTimers, []);

  function schedule(action: () => void, delay: number) {
    const timer = window.setTimeout(action, delay);
    timers.current.push(timer);
  }

  function runCompile(event: MouseEvent<HTMLButtonElement>, service: typeof labServices[number]) {
    if (phase !== "idle" || !phone.current) return;
    clearTimers();
    const card = event.currentTarget.getBoundingClientRect();
    const frame = phone.current.getBoundingClientRect();
    setSelected(service);
    setOrigin({ top: card.top - frame.top, left: card.left - frame.left, width: card.width, height: card.height });
    setPhase("primed");
    schedule(() => setPhase("opening"), 40);
    schedule(() => setPhase("code"), 430);
    schedule(() => setPhase("building"), 1530);
    schedule(() => setPhase("resolved"), 2050);
  }

  function reset() {
    clearTimers();
    setPhase("idle");
  }

  const originStyle = {
    "--lab-top": `${origin.top}px`,
    "--lab-left": `${origin.left}px`,
    "--lab-width": `${origin.width}px`,
    "--lab-height": `${origin.height}px`,
  } as CSSProperties;

  return (
    <main className={styles.lab}>
      <section className={styles.controls}>
        <p className={styles.eyebrow}>Development only</p>
        <h1>BLX Compile Lab</h1>
        <p>Use the phone to replay the mobile-first transition without changing routes.</p>
        <div className={styles.readout}>
          <span>Current state</span>
          <strong>{phase}</strong>
          <span>Selected route</span>
          <strong>{selected.route} / {selected.title}</strong>
        </div>
        <button className={styles.reset} disabled={phase === "idle"} onClick={reset}>Reset phone</button>
        <p className={styles.note}>This route returns a 404 in production and is excluded from search indexing.</p>
      </section>

      <section className={styles.device} aria-label="Mobile transition simulator">
        <div className={styles.phone} ref={phone}>
          <div className={styles.status}><span>9:41</span><span>BLX / 5G</span></div>
          <div className={styles.viewport}>
            {phase === "resolved" ? (
              <article className={styles.destination}>
                <div className={styles.destinationMeta}><span>BLX / SERVICES / {selected.route}</span><span>HUMAN-LED</span></div>
                <p className={styles.destinationEyebrow}>{selected.title}</p>
                <h2>{selected.headline}</h2>
                <p>Strategy, structure and technology resolving into one clear next step.</p>
                <button type="button" onClick={reset}>Choose another service</button>
              </article>
            ) : (
              <div className={styles.serviceView}>
                <div><span>BLX SOLUTIONS</span><span>MENU</span></div>
                <p>Choose a service</p>
                <h2>Useful digital work,<br />connected by strategy.</h2>
                <div className={styles.cards}>
                  {labServices.map((service) => (
                    <button key={service.route} onClick={(event) => runCompile(event, service)} type="button">
                      <span>{service.route}</span><strong>{service.title}</strong><small>EXPLORE</small>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className={styles.morph} data-phase={phase} style={originStyle}>
              <div className={styles.morphBar}><span>BLX COMPILE / {selected.route}</span><span>{phase === "building" ? "BUILDING" : "PROCESSING"}</span></div>
              <div className={styles.morphBody}>
                <p>{recipe.activity}</p>
                <div className={styles.code}>
                  {recipe.lines.map((line, index) => <code key={line}><span>{String(index + 1).padStart(2, "0")}</span>{line}</code>)}
                </div>
                <div className={styles.blueprint}><span /><span /><span /></div>
                <div className={styles.progress}><span /></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
