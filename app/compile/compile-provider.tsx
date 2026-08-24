"use client";

import { createContext, CSSProperties, ReactNode, useCallback, useContext, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { compileTimings, createCompileLines } from "./compile-config";

type CompilePhase = "idle" | "opening" | "code" | "routing" | "resolved" | "closing";
type CompileRequest = { href: string; label: string };
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
  const [phase, setPhase] = useState<CompilePhase>("idle");
  const [request, setRequest] = useState<CompileRequest>({ href: "", label: "" });
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
    if (phase !== "routing" || pathname === sourcePath.current) return;
    setPhase("resolved");
    schedule(() => setPhase("closing"), compileTimings.resolve);
    schedule(() => setPhase("idle"), compileTimings.close);
  }, [pathname, phase, schedule]);

  const compile = useCallback((nextRequest: CompileRequest) => {
    if (busy) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      router.push(nextRequest.href);
      return;
    }

    clearTimers();
    sourcePath.current = pathname;
    setRequest(nextRequest);
    setPhase("opening");
    schedule(() => setPhase("code"), compileTimings.revealCode);
    schedule(() => {
      setPhase("routing");
      router.push(nextRequest.href);
    }, compileTimings.navigate);
    schedule(() => setPhase("idle"), compileTimings.safetyReset);
  }, [busy, clearTimers, pathname, router, schedule]);

  const status = phase === "resolved" || phase === "closing"
    ? `${request.label} page ready.`
    : phase === "idle" ? "" : `Compiling ${request.label} page.`;

  return (
    <CompileContext.Provider value={{ compile, prefetch: router.prefetch, busy }}>
      {children}
      <div className="compile-overlay" data-phase={phase} aria-hidden="true">
        <div className="compile-overlay__bar"><span>BLX COMPILE / ROUTE 001</span><span>{phase === "resolved" || phase === "closing" ? "RESOLVED" : "PROCESSING"}</span></div>
        <div className="compile-overlay__body">
          <p className="compile-overlay__label">Transforming interface into route logic</p>
          <div className="compile-code" aria-hidden="true">
            {createCompileLines(request.label, request.href).map((line, index) => (
              <div className="compile-code__line" key={`${line}-${index}`} style={{ "--line": index } as CSSProperties}>
                <span>{String(index + 1).padStart(2, "0")}</span><code>{line}</code>
              </div>
            ))}
          </div>
          <div className="compile-progress"><span /></div>
          <div className="compile-destination"><span>DESTINATION</span><strong>{request.href || "/services/website-design"}</strong></div>
        </div>
      </div>
      <p className="sr-only" role="status" aria-live="polite">{status}</p>
    </CompileContext.Provider>
  );
}
