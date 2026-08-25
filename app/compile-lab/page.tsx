import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CompileLab } from "./compile-lab";

export const metadata: Metadata = {
  title: "BLX Compile Lab",
  robots: { index: false, follow: false },
};

export default function CompileLabPage() {
  if (process.env.NODE_ENV !== "development") notFound();
  return <CompileLab />;
}
