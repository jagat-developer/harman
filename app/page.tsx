import { BlogIndex } from "@/components/blog-index";
import { getBlogs } from "@/lib/uplift";

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function parsePage(value?: string | string[]) {
  const raw = Array.isArray(value) ? value[0] : value;
  const page = Number(raw || "1");
  return Number.isFinite(page) && page > 0 ? page : 1;
}

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;
  const currentPage = parsePage(params?.page);
  const { blogs, pagination, isPreview } = await getBlogs({
    page: currentPage,
    limit: 9
  });

  return (
    <BlogIndex
      blogs={blogs}
      pagination={pagination}
      currentPage={currentPage}
      isPreview={isPreview}
    />
  );
}
