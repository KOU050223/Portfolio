import { getLatestArticles } from "@/lib/articles";
import ArticlesSection from "@/components/ArticlesSection";

export const revalidate = 3600;

export default async function ArticlesPage() {
  const articles = await getLatestArticles(undefined, undefined, 30);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">記事</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Qiita、note、sizu.me に投稿した記事を新しい順に紹介します。
        </p>
      </div>

      <ArticlesSection articles={articles} showHeading={false} />
    </div>
  );
}
