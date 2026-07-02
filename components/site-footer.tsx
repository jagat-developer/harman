import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { BRAND } from "@/lib/brand";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <Link className="brand-lockup footer-brand" href="/">
            <span className="brand-mark">
              <img src={BRAND.images.logo} alt="" />
            </span>
            <span>
              <strong>{BRAND.agent}</strong>
              <small>{BRAND.legalName}</small>
            </span>
          </Link>
          <p>
            Brampton and GTA real estate insight for buyers, sellers, investors,
            and families planning their next move.
          </p>
        </div>

        <div className="footer-links">
          <a href={`tel:${BRAND.phone}`}>
            <Phone size={16} aria-hidden="true" />
            {BRAND.phone}
          </a>
          <a href={BRAND.email}>
            <Mail size={16} aria-hidden="true" />
            Email Harman
          </a>
          <a href="https://maps.google.com/?q=2720%20N%20Park%20Dr%20%2350%20Brampton%20Ontario%20L6S%200E9">
            <MapPin size={16} aria-hidden="true" />
            Brampton office
          </a>
        </div>

        <div className="footer-links">
          <Link href="/blog">Latest insights</Link>
          <a href={`${BRAND.website}/home-evaluation`} target="_blank">
            Home evaluation
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
          <a href={`${BRAND.website}/contact_me`} target="_blank">
            Contact
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="footer-legal">
        <span>
          RE/MAX Gold Realty Inc., Brokerage independently owned and operated.
        </span>
        <span>REALTOR and MLS trademarks belong to their respective owners.</span>
      </div>
    </footer>
  );
}
