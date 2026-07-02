import { BRAND } from "@/lib/brand";
import { getReadingTime, toPlainText, truncateText } from "@/lib/format";

const API_BASE = "https://api.upliftai.co/api/public/v1";

export type BlogMeta = {
  seoTitle?: string;
  seoDescription?: string;
  focusKeyword?: string;
  keywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogType?: string;
  ogUrl?: string;
  ogSiteName?: string;
  ogLocale?: string;
  articleAuthor?: string;
  articleSection?: string;
  articleTags?: string[];
};

export type Blog = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  status: "PUBLISH" | "DRAFT" | string;
  publishDate?: string;
  publishTime?: string;
  featuredImage?: string;
  categories: string[];
  tags: string[];
  seoScore?: number;
  createdAt?: string;
  updatedAt?: string;
  authorName?: string;
  authorUrl?: string;
  meta?: BlogMeta;
  customFields?: Record<string, unknown>;
};

export type BlogPagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

type BlogListPayload = {
  success: boolean;
  data?: {
    blogs?: Partial<Blog>[];
    pagination?: Partial<BlogPagination>;
  };
  error?: string;
};

type BlogDetailPayload = {
  success: boolean;
  data?: {
    blog?: Partial<Blog>;
  };
  error?: string;
};

export type BlogListResult = {
  blogs: Blog[];
  pagination: BlogPagination;
  isPreview: boolean;
};

const fallbackBlogs: Blog[] = [
  {
    id: "preview-brampton-market",
    title: "Brampton Market Signals Buyers Should Watch This Month",
    slug: "brampton-market-signals-buyers-should-watch",
    excerpt:
      "A practical look at inventory, offer strategy, and what serious buyers should understand before writing in a fast-moving Brampton market.",
    content: `
      <p>Brampton buyers are watching three signals closely: fresh inventory, days on market, and how often well-priced homes still attract multiple offers. A slower week does not always mean a softer market; it can simply mean the best listings have not arrived yet.</p>
      <h2>Start with the neighbourhood, not just the price</h2>
      <p>Detached, semi-detached, townhouse, and condo markets can behave differently even inside the same postal code. A useful search strategy compares recent solds, active competition, and upcoming listing windows before deciding how aggressive to be.</p>
      <h2>Know your walk-away number</h2>
      <p>Pre-approval is only the beginning. Buyers should define comfort around payment, closing costs, land transfer tax, and renovation buffer before entering negotiation.</p>
      <p>For a property-specific read, review comparable sales with a local agent before making your first offer.</p>
    `,
    status: "PUBLISH",
    publishDate: "2026-04-28",
    featuredImage: BRAND.images.blogFallbacks.market,
    categories: ["Market Updates"],
    tags: ["Brampton", "buyers", "market update"],
    authorName: BRAND.agent,
    authorUrl: BRAND.website,
    customFields: {
      readingTime: "3 min read"
    },
    meta: {
      seoTitle: "Brampton Real Estate Market Signals",
      seoDescription:
        "Inventory, sold data, and offer strategy signals Brampton home buyers should watch."
    }
  },
  {
    id: "preview-home-evaluation",
    title: "How to Prepare for a Strong Home Evaluation in the GTA",
    slug: "prepare-for-strong-home-evaluation-gta",
    excerpt:
      "What sellers can organize before an evaluation so pricing, presentation, and timing are grounded in real market evidence.",
    content: `
      <p>A strong home evaluation starts before the walkthrough. Sellers get better advice when they prepare documents, recent upgrades, utility details, and a clear picture of their ideal timeline.</p>
      <h2>Bring the upgrade story</h2>
      <p>Receipts, permit details, appliance age, roof age, mechanical updates, and renovation scope help distinguish cosmetic appeal from durable value.</p>
      <h2>Compare against active competition</h2>
      <p>The right list price is shaped by what buyers can choose today, not only what sold last season. Current competition matters because it frames buyer expectations.</p>
      <p>When presentation, timing, and pricing work together, sellers can launch with more confidence and less second-guessing.</p>
    `,
    status: "PUBLISH",
    publishDate: "2026-04-22",
    featuredImage: BRAND.images.blogFallbacks.selling,
    categories: ["Selling"],
    tags: ["home evaluation", "sellers", "GTA"],
    authorName: BRAND.agent,
    authorUrl: BRAND.website,
    customFields: {
      readingTime: "4 min read"
    },
    meta: {
      seoTitle: "Prepare for a GTA Home Evaluation",
      seoDescription:
        "A seller-focused checklist for stronger real estate pricing conversations in Brampton and the GTA."
    }
  },
  {
    id: "preview-first-time-buyer",
    title: "First-Time Buyer Questions to Ask Before Touring Homes",
    slug: "first-time-buyer-questions-before-touring-homes",
    excerpt:
      "A focused checklist for first-time buyers comparing neighbourhoods, financing, closing costs, and long-term fit.",
    content: `
      <p>Touring homes is exciting, but first-time buyers make better decisions when they answer a few practical questions before stepping inside the first property.</p>
      <h2>What monthly payment still feels comfortable?</h2>
      <p>Approval amount and comfort amount are not always the same. Build the search around the payment you can sustain after closing costs, moving costs, and maintenance.</p>
      <h2>What lifestyle does the location need to support?</h2>
      <p>Commute, schools, transit, parking, family plans, and rental potential all shape whether a property is a fit beyond the photos.</p>
      <p>The goal is not to slow the search down. It is to make every showing more useful.</p>
    `,
    status: "PUBLISH",
    publishDate: "2026-04-15",
    featuredImage: BRAND.images.blogFallbacks.buying,
    categories: ["Buying"],
    tags: ["first-time buyers", "Ontario", "Brampton"],
    authorName: BRAND.agent,
    authorUrl: BRAND.website,
    customFields: {
      readingTime: "3 min read"
    },
    meta: {
      seoTitle: "First-Time Buyer Questions Before Touring Homes",
      seoDescription:
        "Questions Ontario first-time buyers should answer before starting home tours."
    }
  }
];

function getToken() {
  return process.env.UPLIFT_API_TOKEN || process.env.NEXT_PUBLIC_UPLIFT_API_TOKEN;
}

function normalizeArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === "string");
}

export function getBlogImage(blog: Pick<Blog, "featuredImage" | "categories" | "tags">) {
  if (blog.featuredImage?.trim()) {
    return blog.featuredImage;
  }

  const labels = [...blog.categories, ...blog.tags].join(" ").toLowerCase();

  if (labels.includes("buy")) {
    return BRAND.images.blogFallbacks.buying;
  }

  if (labels.includes("sell") || labels.includes("evaluation")) {
    return BRAND.images.blogFallbacks.selling;
  }

  if (labels.includes("market") || labels.includes("guide")) {
    return BRAND.images.blogFallbacks.market;
  }

  return BRAND.images.blogFallbacks.default;
}

function normalizeBlog(value: Partial<Blog>, index = 0): Blog {
  const title = value.title?.trim() || "Untitled real estate insight";
  const content = value.content || "";
  const excerpt =
    value.excerpt?.trim() || truncateText(toPlainText(content), 180);
  const slug =
    value.slug?.trim() ||
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  return {
    id: value.id || `${slug}-${index}`,
    title,
    slug,
    excerpt,
    content,
    status: value.status || "PUBLISH",
    publishDate: value.publishDate || value.createdAt,
    publishTime: value.publishTime,
    featuredImage: value.featuredImage,
    categories: normalizeArray(value.categories),
    tags: normalizeArray(value.tags),
    seoScore: value.seoScore,
    createdAt: value.createdAt,
    updatedAt: value.updatedAt,
    authorName: value.authorName || BRAND.agent,
    authorUrl: value.authorUrl || BRAND.website,
    meta: value.meta || {},
    customFields: {
      ...value.customFields,
      readingTime: getReadingTime(content, value.customFields?.readingTime)
    }
  };
}

async function fetchUplift<T>(path: string, params?: Record<string, string>) {
  const token = getToken();

  if (!token) {
    throw new Error("UPLIFT_API_TOKEN is not configured.");
  }

  const url = new URL(`${API_BASE}${path}`);
  Object.entries(params || {}).forEach(([key, value]) => {
    if (value) {
      url.searchParams.set(key, value);
    }
  });

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json"
    },
    next: {
      revalidate: 300
    }
  });

  if (!response.ok) {
    throw new Error(`Uplift API request failed with ${response.status}.`);
  }

  const payload = (await response.json()) as T & {
    success?: boolean;
    error?: string;
  };

  if (payload.success === false) {
    throw new Error(payload.error || "Uplift API request failed.");
  }

  return payload;
}

export async function getBlogs({
  page = 1,
  limit = 10,
  status = "PUBLISH"
}: {
  page?: number;
  limit?: number;
  status?: "PUBLISH" | "DRAFT" | "ALL";
} = {}): Promise<BlogListResult> {
  try {
    const payload = await fetchUplift<BlogListPayload>("/blogs", {
      page: String(page),
      limit: String(limit),
      status
    });

    const blogs = (payload.data?.blogs || []).map(normalizeBlog);
    const pagination = payload.data?.pagination || {};

    return {
      blogs,
      pagination: {
        page: pagination.page || page,
        limit: pagination.limit || limit,
        total: pagination.total || blogs.length,
        totalPages: pagination.totalPages || Math.max(1, Math.ceil(blogs.length / limit))
      },
      isPreview: false
    };
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "Uplift blog list unavailable:",
        error instanceof Error ? error.message : error
      );
    }

    const start = (page - 1) * limit;
    const blogs = fallbackBlogs.slice(start, start + limit);

    return {
      blogs,
      pagination: {
        page,
        limit,
        total: fallbackBlogs.length,
        totalPages: Math.max(1, Math.ceil(fallbackBlogs.length / limit))
      },
      isPreview: true
    };
  }
}

export async function getBlogBySlug(slug: string) {
  try {
    const payload = await fetchUplift<BlogDetailPayload>(
      `/blog/${encodeURIComponent(slug)}`
    );
    const blog = payload.data?.blog;
    return blog ? { blog: normalizeBlog(blog), isPreview: false } : null;
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "Uplift blog detail unavailable:",
        error instanceof Error ? error.message : error
      );
    }

    const blog = fallbackBlogs.find((item) => item.slug === slug);
    return blog ? { blog, isPreview: true } : null;
  }
}

export async function getRelatedBlogs(currentSlug: string, category?: string) {
  const { blogs } = await getBlogs({ limit: 12 });

  return blogs
    .filter((blog) => blog.slug !== currentSlug)
    .filter((blog) => {
      if (!category) {
        return true;
      }

      return blog.categories.includes(category);
    })
    .slice(0, 3);
}
