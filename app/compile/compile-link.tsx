"use client";

import { MouseEvent, ReactNode } from "react";
import Link from "next/link";
import { useCompile } from "./compile-provider";

type CompileLinkProps = {
  href: string;
  label: string;
  className?: string;
  children: ReactNode;
};

export function CompileLink({ href, label, className, children }: CompileLinkProps) {
  const { compile, prefetch, busy } = useCompile();

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    compile({ href, label });
  }

  return (
    <Link aria-disabled={busy || undefined} className={className} href={href} onClick={handleClick} onFocus={() => prefetch(href)} onPointerEnter={() => prefetch(href)}>
      {children}
    </Link>
  );
}
