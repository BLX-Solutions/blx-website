"use client";

import { createContext, CSSProperties, ReactNode, useCallback, useContext, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { compileTimings, CompileTiming, getCompileRecipe } from "./compile-config";

type CompilePhase = "idle" | "opening" | "code" | "routing" | "resolved" | "closing";
type CompileOrigin = { top: number; left: number; width: number; height: number };
type CompileRequest = { href: string; label: string; route: string; origin: CompileOrigin };
type CompileContextValue = {
  compile: (request: CompileRequest) => void;
  prefetch: (href: string) => void;
  busy: boolean;
};

const CompileContext = createContext<CompileContextValue | null>(null);

export function useCompile() {
  const value = useContext(CompileContext);
  if (!value) throw new Error("useCompile must be used inside CompileProvider");
  return value;
}

export function CompileProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const timers = useRef<number[]>([]);
  const sourcePath = useRef(pathname);
  const activeTimings = useRef<CompileTiming>(compileTimings.mobile);
  const [phase, setPhase] = useState<CompilePhase>("idle");
  const [request, setRequest] = useState<CompileRequest>({ href: "", label: "", route: "01", origin: { top: 0, left: 0, width: 0, height: 0 } });
  const busy = phase !== "idle";

  const schedule = useCallback((action: () => void, delay: number) => {
    const timer = window.setTimeout(action, delay);
    timers.current.push(timer);
  }, []);

  const clearTimers = useCallback(() => {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  useEffect(() => {
    if (!busy) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [busy]);

  useEffect(() => {
    if (phase !== "routing" || pathname === sourcePath.current) return;
    setPhase("resolved");
    schedule(() => setPhase("closing"), activeTimings.current.resolve);
    schedule(() => setPhase("idle"), activeTimings.current.close);
  }, [pathname, phase, schedule]);

  const compile = useCallback((nextRequest: CompileRequest) => {
    if (busy) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      router.push(nextRequest.href);
      return;
    }

    clearTimers();
    const timings = window.matchMedia("(max-width: 700px)").matches
      ? compileTimings.mobile
      : compileTimings.desktop;
    activeTimings.current = timings;
    sourcePath.current = pathname;
    setRequest(nextRequest);
    setPhase("opening");
    schedule(() => setPhase("code"), timings.revealCode);
    schedule(() => {
      setPhase("routing");
      router.push(nextRequest.href);
    }, timings.navigate);
    schedule(() => setPhase("idle"), timings.safetyReset);
  }, [busy, clearTimers, pathname, router, schedule]);

  const status = phase === "resolved" || phase === "closing"
    ? `${request.label} page ready.`
    : phase === "idle" ? "" : `Compiling ${request.label} page.`;
  const recipe = getCompileRecipe(request.route, request.label, request.href);
  const originStyle = {
    "--compile-top": `${request.origin.top}px`,
    "--compile-left": `${request.origin.left}px`,
    "--compile-width": `${request.origin.width}px`,
    "--compile-height": `${request.origin.height}px`,
  } as CSSProperties;

  return (
    <CompileContext.Provider value={{ compile, prefetch: router.prefetch, busy }}>
      {children}
      <div className="compile-overlay" data-phase={phase} aria-hidden="true" style={originStyle}>
        <div className="compile-surface">
          <div className="compile-overlay__bar"><span>BLX COMPILE / ROUTE {request.route}</span><span>{phase === "resolved" || phase === "closing" ? "RESOLVED" : "PROCESSING"}</span></div>
          <div className="compile-overlay__body">
            <p className="compile-overlay__label">{recipe.activity}</p>
            <div className="compile-code" aria-hidden="true">
              {recipe.lines.map((line, index) => (
                <div className="compile-code__line" key={`${line}-${index}`} style={{ "--line": index } as CSSProperties}>
                  <span>{String(index + 1).padStart(2, "0")}</span><code>{line}</code>
                </div>
              ))}
            </div>
            <div className="compile-blueprint" aria-hidden="true"><span /><span /><span /></div>
            <div className="compile-progress"><span /></div>
            <div className="compile-destination"><span>DESTINATION</span><strong>{request.href || "/services/website-design"}</strong></div>
          </div>
        </div>
      </div>
      <p className="sr-only" role="status" aria-live="polite">{status}</p>
    </CompileContext.Provider>
  );
}
