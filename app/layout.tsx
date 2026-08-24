import type { Metadata } from "next";
import "./globals.css";
import { CompileProvider } from "./compile/compile-provider";

export const metadata: Metadata = {
  title: "BLX Solutions | Human-led digital strategy",
  description:
    "Web design, SEO, AI visibility and practical digital marketing for small local businesses.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body><CompileProvider>{children}</CompileProvider></body>
    </html>
  );
}
