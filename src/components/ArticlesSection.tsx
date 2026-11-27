import Link from "next/link";
import { ArrowRight, Newspaper } from "lucide-react";
import type { Article } from "@/lib/articles";
import { Button } from "@/components/ui/button";
import ArticleCard from "@/components/ArticleCard";
import ArticleSourceLinks from "@/components/ArticleSourceLinks";

export default function ArticlesSection({
  articles,
  showHeading = true,
}: {
  articles: Article[];
  showHeading?: boolean;
}) {
  return (
    <section className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 mb-12">
      {showHeading ? (
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            <Newspaper className="inline w-6 h-6 mr-3 text-blue-600 dark:text-blue-400" />
            執筆・ブログ
          </h2>
          <Button asChild variant="outline" size="sm">
            <Link href="/articles" className="flex items-center space-x-2">
              <span>すべて見る</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      ) : null}

      {articles.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.url} article={article} />
          ))}
        </div>
      ) : (
        <p className="text-gray-600 dark:text-gray-300">
          新着記事を表示できませんでした。各サービスのページからご覧ください。
        </p>
      )}

      <div className="mt-8">
        <ArticleSourceLinks />
      </div>
    </section>
  );
}
