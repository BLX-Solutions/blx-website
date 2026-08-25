"use client";

import { PointerEvent, ReactNode } from "react";

export function ResponsiveSignalCard({ children }: { children: ReactNode }) {
  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    if (event.pointerType === "touch") return;
    const card = event.currentTarget;
    const bounds = card.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;

    card.style.setProperty("--signal-x", `${x * 100}%`);
    card.style.setProperty("--signal-y", `${y * 100}%`);
    card.style.setProperty("--signal-rotate-x", `${(0.5 - y) * 3}deg`);
    card.style.setProperty("--signal-rotate-y", `${(x - 0.5) * 3}deg`);
  }

  function resetPointer(event: PointerEvent<HTMLElement>) {
    const card = event.currentTarget;
    card.style.setProperty("--signal-x", "50%");
    card.style.setProperty("--signal-y", "50%");
    card.style.setProperty("--signal-rotate-x", "0deg");
    card.style.setProperty("--signal-rotate-y", "0deg");
  }

  return (
    <article
      className="signal-card signal-card--lead signal-card--responsive"
      onPointerLeave={resetPointer}
      onPointerMove={handlePointerMove}
    >
      {children}
    </article>
  );
}
