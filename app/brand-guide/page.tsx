import type { Metadata } from "next";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Blog Brand Guide",
  description:
    "Brand guide, theme, and component direction for the Harman Homes blog."
};

const principles = [
  "Lead with Harman Sangha and RE/MAX credibility.",
  "Use clean editorial layouts for trust and readability.",
  "Keep buttons charcoal or RE/MAX red, with restrained blue accents.",
  "Use real agent, brokerage, property, and market imagery whenever available."
];

export default function BrandGuidePage() {
  return (
    <div className="site-shell">
      <SiteHeader />

      <main className="brand-guide-page">
        <section className="guide-hero">
          <span className="eyebrow">Brand guide</span>
          <h1>Harman Homes blog design system</h1>
          <p>
            A focused theme for market education: professional, local, readable,
            and closely tied to Harman's existing real estate presence.
          </p>
        </section>

        <section className="guide-grid">
          <div className="guide-panel wide">
            <h2>Core palette</h2>
            <div className="swatch-grid">
              {Object.entries(BRAND.palette).map(([name, value]) => (
                <div className="swatch" key={name}>
                  <span style={{ background: value }} />
                  <strong>{name}</strong>
                  <code>{value}</code>
                </div>
              ))}
            </div>
          </div>

          <div className="guide-panel">
            <h2>Typography</h2>
            <p className="serif-sample">PT Serif for editorial headlines.</p>
            <p className="sans-sample">Poppins for navigation, UI, and body copy.</p>
          </div>

          <div className="guide-panel">
            <h2>Voice</h2>
            <ul className="check-list">
              {principles.map((item) => (
                <li key={item}>
                  <CheckCircle2 size={17} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="guide-panel wide component-sample">
            <h2>Components</h2>
            <div className="sample-actions">
              <a className="solid-button" href="/blog">
                Latest articles
                <ArrowRight size={18} aria-hidden="true" />
              </a>
              <a className="ghost-button" href={`tel:${BRAND.phone}`}>
                Call Harman
              </a>
            </div>
            <div className="sample-card">
              <span className="pill">Market Updates</span>
              <h3>Brampton real estate insight with a practical next step.</h3>
              <p>
                Cards should be scannable, image-led, and restrained, with
                enough metadata for readers to understand relevance quickly.
              </p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
