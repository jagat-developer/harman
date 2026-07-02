import {
  ArrowRight,
  Building2,
  ChevronLeft,
  ChevronRight,
  Home,
  LineChart,
  MapPinned,
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
      <SiteHeader />

      <main>
        <section className="blog-hero">
          <div className="hero-copy">
            <span className="eyebrow">Harman Homes Market Notes</span>
            <h1>Brampton & GTA real estate insight with local proof.</h1>
            <p>
              Practical buyer guides, seller strategy, market updates, and
              neighbourhood context from Harman Sangha and RE/MAX Gold Realty.
            </p>

            <div className="hero-actions">
              <a className="solid-button" href="#latest">
                Latest articles
                <ArrowRight size={18} aria-hidden="true" />
              </a>
              <a
                className="ghost-button"
                href={`${BRAND.website}/home-evaluation`}
                target="_blank"
              >
                Home value
                <Home size={18} aria-hidden="true" />
              </a>
            </div>

            <div className="hero-stats" aria-label="Service highlights">
              <span>
                <strong>13+</strong>
                years experience
              </span>
              <span>
                <strong>GTA</strong>
                neighbourhood coverage
              </span>
              <span>
                <strong>RE/MAX</strong>
                Gold Realty
              </span>
            </div>
          </div>

          <div className="hero-visual" aria-label="Harman Sangha">
            <img src={BRAND.images.agentHero} alt="Harman Sangha" />
            <div className="hero-credential">
              <span className="status-dot" />
              <span>
                <strong>{BRAND.agent}</strong>
                <small>{BRAND.role}</small>
              </span>
            </div>
          </div>
        </section>

        <section className="feature-band" aria-label="Blog themes">
          <div>
            <LineChart size={21} aria-hidden="true" />
            Market data made useful
          </div>
          <div>
            <Building2 size={21} aria-hidden="true" />
            Residential, commercial & land
          </div>
          <div>
            <MapPinned size={21} aria-hidden="true" />
            Brampton, Caledon & nearby GTA
          </div>
          <div>
            <Star size={21} aria-hidden="true" />
            Buyer and seller strategy
          </div>
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
