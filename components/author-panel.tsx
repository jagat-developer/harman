import { Award, Mail, Phone, ShieldCheck } from "lucide-react";
import { BRAND } from "@/lib/brand";

export function AuthorPanel() {
  return (
    <aside className="author-panel" aria-label="Author information">
      <img src={BRAND.images.agent} alt="Harman Sangha" />
      <div>
        <span className="eyebrow">Local market guidance</span>
        <h2>{BRAND.agent}</h2>
        <p>
          Sales Representative with RE/MAX Gold Realty, focused on residential,
          commercial, land, and investment real estate across Brampton and the GTA.
        </p>
      </div>
      <ul className="trust-list">
        <li>
          <ShieldCheck size={17} aria-hidden="true" />
          RE/MAX Gold Realty Inc.
        </li>
        <li>
          <Award size={17} aria-hidden="true" />
          Brampton, Caledon, Mississauga & GTA
        </li>
        <li>
          <Phone size={17} aria-hidden="true" />
          <a href={`tel:${BRAND.phone}`}>{BRAND.phone}</a>
        </li>
        <li>
          <Mail size={17} aria-hidden="true" />
          <a href={BRAND.email}>Email Harman</a>
        </li>
      </ul>
    </aside>
  );
}
