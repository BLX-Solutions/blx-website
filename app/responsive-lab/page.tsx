import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import styles from "./responsive-lab.module.css";

export const metadata: Metadata = {
  title: "BLX Responsive Lab",
  robots: { index: false, follow: false },
};

const scale = 0.42;
const devices = [
  { label: "Mobile / 390", width: 390, height: 844 },
  { label: "Tablet / 768", width: 768, height: 1024 },
  { label: "Desktop / 1366", width: 1366, height: 900 },
];

export default function ResponsiveLabPage() {
  if (process.env.NODE_ENV !== "development") notFound();

  return (
    <main className={styles.lab}>
      <header><span>DEVELOPMENT ONLY</span><h1>BLX Responsive Review</h1></header>
      <section className={styles.devices}>
        {devices.map((device) => (
          <article key={device.label}>
            <div><strong>{device.label}</strong><span>{device.width} × {device.height}</span></div>
            <div className={styles.frame} style={{ width: device.width * scale, height: device.height * scale } as CSSProperties}>
              <iframe
                aria-label={`${device.label} homepage preview`}
                src="/"
                style={{ height: device.height, transform: `scale(${scale})`, width: device.width }}
                title={`${device.label} homepage preview`}
              />
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
