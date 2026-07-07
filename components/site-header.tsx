import {
  ArrowUpRight,
  ChevronDown,
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
  {
    label: "Pre-Construction",
    href: `${BRAND.website}/list/pre-construction-condos`
  },
  {
    label: "Solds",
    href: `${BRAND.website}/property_find_results&propertyClass=Any&sold=on`,
    hasMenu: true
  },
  {
    label: "Buy",
    href: `${BRAND.website}/node/add/dream_home/lead_form_view?step=1`,
    hasMenu: true
  },
  {
    label: "Sell",
    href: `${BRAND.website}/node/add/free_home_valuation/lead_form_view?step=1`,
    hasMenu: true
  },
  { label: "Map Search", href: `${BRAND.website}/propertySearch` },
  { label: "Contact Me", href: `${BRAND.website}/node/add/contactSite` },
  { label: "Useful Tools", href: `${BRAND.website}/freeReport`, hasMenu: true },
  {
    label: "More Info",
    href: `${BRAND.website}/selling_tips.links.HarmanSangha`,
    hasMenu: true
  }
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
              <MapPin size={13} aria-hidden="true" />
            ) : null}
            {item.label}
            {item.hasMenu ? <ChevronDown size={12} aria-hidden="true" /> : null}
          </a>
        ))}
        {!isHero ? (
          <Link href="/blog">
            <Search size={13} aria-hidden="true" />
            Blog
          </Link>
        ) : null}
      </nav>

      {isHero ? (
        <span className="mobile-menu-label">
          <Menu size={14} aria-hidden="true" />
          Menu
        </span>
      ) : null}

      <div className={isHero ? "header-actions hero-header-actions" : "header-actions"}>
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
