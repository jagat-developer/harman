import { marked } from "marked";
import sanitizeHtml from "sanitize-html";

export function toPlainText(value = "") {
  return sanitizeHtml(value, {
    allowedTags: [],
    allowedAttributes: {}
  })
    .replace(/\s+/g, " ")
    .trim();
}

export function truncateText(value: string, maxLength: number) {
  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength).trim().replace(/[.,;:!?]+$/, "")}...`;
}

export function formatDate(value?: string) {
  if (!value) {
    return "Recently updated";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-CA", {
    month: "long",
    day: "numeric",
    year: "numeric"
  }).format(date);
}

export function getReadingTime(content = "", fallback?: unknown) {
  if (typeof fallback === "string" && fallback.trim()) {
    return fallback;
  }

  const words = toPlainText(content).split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 210));
  return `${minutes} min read`;
}

export function renderSafeBlogHtml(content = "") {
  const trimmed = content.trim();
  const looksLikeHtml = /<\/?[a-z][\s\S]*>/i.test(trimmed);
  const rawHtml = looksLikeHtml
    ? trimmed
    : (marked.parse(trimmed, { async: false, breaks: true, gfm: true }) as string);

  return sanitizeHtml(rawHtml, {
    allowedTags: [
      ...sanitizeHtml.defaults.allowedTags,
      "img",
      "figure",
      "figcaption",
      "iframe",
      "span",
      "section",
      "details",
      "summary",
      "table",
      "thead",
      "tbody",
      "tr",
      "th",
      "td"
    ],
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      a: ["href", "name", "target", "rel"],
      img: ["src", "alt", "title", "width", "height", "loading"],
      iframe: [
        "src",
        "title",
        "width",
        "height",
        "allow",
        "allowfullscreen",
        "loading"
      ],
      "*": ["class", "id", "aria-label"]
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", {
        rel: "noopener noreferrer"
      }),
      img: sanitizeHtml.simpleTransform("img", {
        loading: "lazy"
      })
    }
  });
}
