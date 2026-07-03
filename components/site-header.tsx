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

type SiteHeaderProps = {
  variant?: "default" | "hero";
};

const navItems = [
  { label: "Home", href: BRAND.website },
  { label: "Pre-Construction", href: `${BRAND.website}/pre-construction` },
  { label: "Sold", href: `${BRAND.website}/sold-listings` },
  { label: "Buy", href: `${BRAND.website}/buy-homes-for-sale` },
  { label: "Sell", href: `${BRAND.website}/home-evaluation` },
  { label: "Map Search", href: `${BRAND.website}/map-search` },
  { label: "Contact Me", href: `${BRAND.website}/contact_me` }
];

export function SiteHeader({ variant = "default" }: SiteHeaderProps) {
  const isHero = variant === "hero";

  return (
    <header className={isHero ? "site-header site-header-hero" : "site-header"}>
      <Link className="brand-lockup" href="/" aria-label="Harman Homes blog">
        <span className="brand-mark">
          <img src={BRAND.images.logo} alt="" />
        </span>
        {isHero ? (
          <span className="brand-agent-photo">
            <img src={BRAND.images.agent} alt="" />
          </span>
        ) : null}
        <span>
          <strong>{BRAND.agent}</strong>
          <small>{isHero ? BRAND.role : BRAND.legalName}</small>
          {isHero ? <small>{BRAND.phone}</small> : null}
        </span>
      </Link>

      <nav className="primary-nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <a key={item.label} href={item.href}>
            {item.label === "Map Search" ? (
              <MapPin size={15} aria-hidden="true" />
            ) : null}
            {item.label}
          </a>
        ))}
        <Link href="/blog">
          <Search size={15} aria-hidden="true" />
          Blog
        </Link>
      </nav>

      {isHero ? (
        <span className="mobile-menu-label">
          <Menu size={14} aria-hidden="true" />
          Menu
        </span>
      ) : null}

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
