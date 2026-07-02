import { renderSafeBlogHtml } from "@/lib/format";

export function ArticleBody({ content }: { content: string }) {
  return (
    <div
      className="article-content"
      dangerouslySetInnerHTML={{
        __html: renderSafeBlogHtml(content)
      }}
    />
  );
}
