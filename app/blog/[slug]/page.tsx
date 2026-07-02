import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock3, Tags } from "lucide-react";
import Link from "next/link";
import { ArticleBody } from "@/components/article-body";
import { AuthorPanel } from "@/components/author-panel";
import { BlogCard } from "@/components/blog-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { formatDate, getReadingTime } from "@/lib/format";
import { getBlogBySlug, getBlogImage, getBlogs, getRelatedBlogs } from "@/lib/uplift";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const { blogs } = await getBlogs({ limit: 30 });
  return blogs.map((blog) => ({ slug: blog.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const result = await getBlogBySlug(slug);

  if (!result) {
    return {
      title: "Blog post not found"
    };
  }

  const { blog } = result;
  const description = blog.meta?.seoDescription || blog.excerpt;
  const title = blog.meta?.seoTitle || blog.title;
  const image = getBlogImage(blog);

  return {
    title,
    description,
    alternates: {
      canonical: `/blog/${blog.slug}`
    },
    openGraph: {
      title: blog.meta?.ogTitle || title,
      description: blog.meta?.ogDescription || description,
      type: "article",
      images: [
        {
          url: image,
          alt: blog.title
        }
      ]
    }
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const result = await getBlogBySlug(slug);

  if (!result) {
    notFound();
  }

  const { blog } = result;
  const related = await getRelatedBlogs(blog.slug, blog.categories[0]);
  const readingTime = getReadingTime(
    blog.content,
    blog.customFields?.readingTime
  );

  return (
    <div className="site-shell">
      <SiteHeader />

      <main>
        <article className="article-shell">
          <div className="article-kicker">
            <Link href="/blog">
              <ArrowLeft size={17} aria-hidden="true" />
              Back to blog
            </Link>
          </div>

          <header className="article-hero">
            <div className="article-title-block">
              <div className="meta-row">
                <span className="pill">{blog.categories[0] || "Real Estate"}</span>
                <span>
                  <CalendarDays size={15} aria-hidden="true" />
                  {formatDate(blog.publishDate || blog.createdAt)}
                </span>
                <span>
                  <Clock3 size={15} aria-hidden="true" />
                  {readingTime}
                </span>
              </div>
              <h1>{blog.title}</h1>
              <p>{blog.excerpt}</p>
            </div>

            <div className="article-hero-card">
              <img
                src={getBlogImage(blog)}
                alt=""
                loading="eager"
              />
            </div>
          </header>

          <div className="article-layout">
            <div>
              <ArticleBody content={blog.content} />

              {blog.tags.length > 0 ? (
                <div className="tag-row" aria-label="Article tags">
                  <Tags size={17} aria-hidden="true" />
                  {blog.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              ) : null}
            </div>

            <AuthorPanel />
          </div>
        </article>

        {related.length > 0 ? (
          <section className="content-section related-section">
            <div className="section-heading compact-heading">
              <span className="eyebrow">Keep reading</span>
              <h2>More local guidance</h2>
            </div>
            <div className="blog-grid">
              {related.map((item) => (
                <BlogCard key={item.id} blog={item} />
              ))}
            </div>
          </section>
        ) : null}
      </main>

      <SiteFooter />
    </div>
  );
}
