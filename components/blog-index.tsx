import {
  ArrowRight,
  Building2,
  ChevronLeft,
  ChevronRight,
  Home,
  LineChart,
  MapPinned,
  Search,
  Star
} from "lucide-react";
import Link from "next/link";
import { BlogCard } from "@/components/blog-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { BRAND } from "@/lib/brand";
import type { Blog, BlogPagination } from "@/lib/uplift";

type BlogIndexProps = {
  blogs: Blog[];
  pagination: BlogPagination;
  currentPage: number;
  isPreview?: boolean;
};

const actionTiles = [
  {
    label: "Home Value",
    href: `${BRAND.website}/home-evaluation`,
    icon: Home
  },
  {
    label: "Property Search",
    href: `${BRAND.website}/buy-homes-for-sale`,
    icon: Search
  },
  {
    label: "Dream Home",
    href: `${BRAND.website}/buy-homes-for-sale`,
    icon: Star
  },
  {
    label: "Pre-Construction",
    href: `${BRAND.website}/pre-construction`,
    icon: Building2
  },
  {
    label: "Map Search",
    href: `${BRAND.website}/map-search`,
    icon: MapPinned
  },
  {
    label: "Market Updates",
    href: "#latest",
    icon: LineChart
  }
];

export function BlogIndex({
  blogs,
  pagination,
  currentPage,
  isPreview = false
}: BlogIndexProps) {
  const featured = blogs[0];
  const rest = blogs.slice(1);
  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < pagination.totalPages;

  return (
    <div className="site-shell">
      <main>
        <section className="blog-hero">
          <img className="hero-background" src={BRAND.images.heroKitchen} alt="" />
          <div className="hero-overlay" />
          <SiteHeader variant="hero" />

          <div className="hero-lower">
            <div className="hero-search-panel" aria-label="Real estate search">
              <span className="eyebrow">Brampton & surrounding areas</span>
              <h1>Real estate insight, listings, and market updates.</h1>
              <form action={`${BRAND.website}/search`} className="hero-search">
                <label htmlFor="hero-search" className="sr-only">
                  Search by city, neighbourhood, or MLS number
                </label>
                <input
                  id="hero-search"
                  name="query"
                  placeholder="City, neighbourhood, MLS number"
                />
                <button type="submit">
                  <Search size={18} aria-hidden="true" />
                  Search
                </button>
              </form>
              <div className="hero-mini-links">
                <a href="#latest">Latest Blog Posts</a>
                <a href={`${BRAND.website}/home-evaluation`}>Free Home Evaluation</a>
                <a href={`${BRAND.website}/contact_me`}>Contact Harman</a>
              </div>
            </div>

            <div className="hero-slide-dots" aria-hidden="true">
              <span className="active" />
              <span />
              <span />
              <span />
            </div>
          </div>
        </section>

        <section className="quick-actions" aria-label="Real estate shortcuts">
          {actionTiles.map(({ label, href, icon: Icon }) => (
            <a key={label} href={href}>
              <Icon size={20} aria-hidden="true" />
              <span>{label}</span>
            </a>
          ))}
        </section>

        <section className="content-section" id="latest">
          {isPreview ? (
            <div className="preview-banner" role="status">
              <strong>Preview mode:</strong> live Uplift posts are not connected
              in this server process, so sample blog cards are being shown.
            </div>
          ) : null}

          <div className="section-heading">
            <span className="eyebrow">
              {isPreview ? "Preview articles" : "Latest articles"}
            </span>
            <h2>Real estate guidance built for actual decisions.</h2>
            <p>
              Scan quick summaries, then open the full post for the detail,
              checklist, or market context you need.
            </p>
          </div>

          {featured ? (
            <div className="featured-layout">
              <BlogCard blog={featured} priority />

              <aside className="coverage-panel">
                <span className="eyebrow">Local coverage</span>
                <h3>Neighbourhood-aware advice</h3>
                <p>
                  Harman Homes content is shaped around how buyers and sellers
                  search across Brampton and the surrounding GTA.
                </p>
                <div className="coverage-tags">
                  {BRAND.coverage.map((area) => (
                    <span key={area}>{area}</span>
                  ))}
                </div>
              </aside>
            </div>
          ) : (
            <div className="empty-state">
              <h2>No published posts yet</h2>
              <p>
                Check back soon for market updates, buyer guides, and seller
                strategy from Harman Homes.
              </p>
            </div>
          )}

          {rest.length > 0 ? (
            <div className="blog-grid">
              {rest.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          ) : null}

          {pagination.totalPages > 1 ? (
            <nav className="pagination" aria-label="Blog pagination">
              {hasPrevious ? (
                <Link href={`/blog?page=${currentPage - 1}`}>
                  <ChevronLeft size={18} aria-hidden="true" />
                  Previous
                </Link>
              ) : (
                <span />
              )}
              <span>
                Page {pagination.page} of {pagination.totalPages}
              </span>
              {hasNext ? (
                <Link href={`/blog?page=${currentPage + 1}`}>
                  Next
                  <ChevronRight size={18} aria-hidden="true" />
                </Link>
              ) : (
                <span />
              )}
            </nav>
          ) : null}
        </section>

        <section className="cta-band">
          <div>
            <span className="eyebrow">Planning a move?</span>
            <h2>Get market context before you buy, sell, or invest.</h2>
          </div>
          <a className="solid-button light" href={`tel:${BRAND.phone}`}>
            Call {BRAND.phone}
            <ArrowRight size={18} aria-hidden="true" />
          </a>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
