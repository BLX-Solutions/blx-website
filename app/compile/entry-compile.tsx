"use client";

import { CSSProperties, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

type EntryPhase = "boot" | "code" | "building" | "resolved" | "idle";

const entryCode = [
  "const signal = blx.capture(location.pathname);",
  "const strategy = await blx.align(signal);",
  "interface.mount(strategy, { humanLed: true });",
  "render(\"BLX Solutions\");",
];

export function EntryCompile() {
  const pathname = usePathname();
  const isDevelopmentLab = pathname === "/compile-lab" || pathname === "/responsive-lab";
  const timers = useRef<number[]>([]);
  const [phase, setPhase] = useState<EntryPhase>("boot");

  useEffect(() => {
    const internalNavigationAt = Number(sessionStorage.getItem("blx-internal-navigation") || 0);
    sessionStorage.removeItem("blx-internal-navigation");
    const followsInternalNavigation = Date.now() - internalNavigationAt < 10000;

    if (isDevelopmentLab || followsInternalNavigation || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("idle");
      return;
    }

    const mobile = window.matchMedia("(max-width: 700px)").matches;
    const timing = mobile
      ? { code: 90, building: 720, resolved: 1320, idle: 1680 }
      : { code: 50, building: 360, resolved: 650, idle: 900 };

    const schedule = (nextPhase: EntryPhase, delay: number) => {
      timers.current.push(window.setTimeout(() => setPhase(nextPhase), delay));
    };

    schedule("code", timing.code);
    schedule("building", timing.building);
    schedule("resolved", timing.resolved);
    schedule("idle", timing.idle);

    return () => {
      timers.current.forEach(window.clearTimeout);
      timers.current = [];
    };
  }, []);

  useEffect(() => {
    if (phase === "idle" || isDevelopmentLab) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [isDevelopmentLab, phase]);

  const status = phase === "resolved"
    ? "BLX Solutions ready."
    : phase === "idle" ? "" : "Compiling BLX Solutions.";

  return (
    <>
      <div className="entry-compile" data-phase={phase} aria-hidden="true">
        <div className="entry-compile__grid" />
        <div className="entry-compile__bar">
          <span>BLX COMPILE / INITIALISE</span>
          <span>{phase === "building" ? "BUILDING" : phase === "resolved" ? "READY" : "PROCESSING"}</span>
        </div>
        <div className="entry-compile__stage">
          <p>Translating strategy into a working digital system</p>
          <div className="entry-compile__code">
            {entryCode.map((line, index) => (
              <div className="entry-compile__line" key={line} style={{ "--entry-line": index } as CSSProperties}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <code>{line}</code>
              </div>
            ))}
          </div>
          <div className="entry-compile__assembly"><span /><span /><span /></div>
          <div className="entry-compile__brand"><strong>BLX</strong><span>SOLUTIONS</span></div>
          <div className="entry-compile__progress"><span /></div>
        </div>
      </div>
      <p className="sr-only" role="status" aria-live="polite">{status}</p>
    </>
  );
}
