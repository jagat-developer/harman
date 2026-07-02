import { ArrowUpRight, CalendarDays, Clock3 } from "lucide-react";
import Link from "next/link";
import { getBlogImage, type Blog } from "@/lib/uplift";
import { formatDate, getReadingTime, toPlainText, truncateText } from "@/lib/format";

type BlogCardProps = {
  blog: Blog;
  priority?: boolean;
};

export function BlogCard({ blog, priority = false }: BlogCardProps) {
  const image = getBlogImage(blog);
  const excerpt = truncateText(toPlainText(blog.excerpt || blog.content), 170);
  const category = blog.categories[0] || "Real Estate";
  const readingTime = getReadingTime(
    blog.content,
    blog.customFields?.readingTime
  );

  return (
    <article className={priority ? "blog-card blog-card-featured" : "blog-card"}>
      <Link className="blog-card-media" href={`/blog/${blog.slug}`}>
        <img src={image} alt="" loading={priority ? "eager" : "lazy"} />
      </Link>

      <div className="blog-card-body">
        <div className="meta-row">
          <span className="pill">{category}</span>
          <span>
            <CalendarDays size={15} aria-hidden="true" />
            {formatDate(blog.publishDate || blog.createdAt)}
          </span>
          <span>
            <Clock3 size={15} aria-hidden="true" />
            {readingTime}
          </span>
        </div>

        <h2>
          <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
        </h2>
        <p>{excerpt}</p>

        <Link className="text-link" href={`/blog/${blog.slug}`}>
          Read the insight
          <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
