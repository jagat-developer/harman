import {
  ArrowUpRight,
  Mail,
  MapPin,
  Menu,
  Phone,
  Search
} from "lucide-react";
import Link from "next/link";
import { BRAND } from "@/lib/brand";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand-lockup" href="/" aria-label="Harman Homes blog">
        <span className="brand-mark">
          <img src={BRAND.images.logo} alt="" />
        </span>
        <span>
          <strong>{BRAND.agent}</strong>
          <small>{BRAND.legalName}</small>
        </span>
      </Link>

      <nav className="primary-nav" aria-label="Primary navigation">
        <Link href="/blog">
          <Search size={16} aria-hidden="true" />
          Blog
        </Link>
        <Link href="/brand-guide">
          <Menu size={16} aria-hidden="true" />
          Brand Guide
        </Link>
        <a href={`${BRAND.website}/buy-homes-for-sale`} target="_blank">
          <MapPin size={16} aria-hidden="true" />
          Listings
        </a>
      </nav>

      <div className="header-actions">
        <a className="ghost-button compact" href={`tel:${BRAND.phone}`}>
          <Phone size={16} aria-hidden="true" />
          {BRAND.phone}
        </a>
        <a className="solid-button compact" href={BRAND.email}>
          <Mail size={16} aria-hidden="true" />
          Email
          <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </div>
    </header>
  );
}
