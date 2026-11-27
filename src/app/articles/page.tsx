import { getLatestArticles } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";
import ArticleSourceLinks from "@/components/ArticleSourceLinks";

export const revalidate = 3600;

export default async function ArticlesPage() {
  const articles = await getLatestArticles(undefined, undefined, 30);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">記事</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Qiita、note、sizu.me に投稿した記事を新しい順に紹介します。
        </p>
      </div>

      {articles.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-10">
          {articles.map((article) => (
            <ArticleCard key={article.url} article={article} />
          ))}
        </div>
      ) : (
        <p className="text-gray-600 dark:text-gray-300 mb-10">
          新着記事を表示できませんでした。各サービスのページからご覧ください。
        </p>
      )}

      <ArticleSourceLinks />
    </div>
  );
}
