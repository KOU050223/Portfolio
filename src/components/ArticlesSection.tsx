import Link from "next/link";
import { ArrowRight, ExternalLink, Newspaper } from "lucide-react";
import { ARTICLE_SOURCES, type Article } from "@/lib/articles";
import { Button } from "@/components/ui/button";

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
            <a
              key={article.url}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col justify-between bg-gray-50 dark:bg-gray-800 rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <div>
                <span className="inline-block mb-3 px-2 py-1 rounded text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200">
                  {article.source}
                </span>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-3 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {article.title}
                </h3>
              </div>
              <div className="flex items-center justify-between mt-5 text-sm text-gray-500 dark:text-gray-400">
                <time dateTime={article.publishedAt}>
                  {new Intl.DateTimeFormat("ja-JP", {
                    timeZone: "Asia/Tokyo",
                    dateStyle: "medium",
                  }).format(new Date(article.publishedAt))}
                </time>
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </div>
            </a>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 dark:text-gray-300">
          新着記事を表示できませんでした。各サービスのページからご覧ください。
        </p>
      )}

      <div className="mt-8 flex flex-wrap gap-3">
        {ARTICLE_SOURCES.map((source) => (
          <a
            key={source.name}
            href={source.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            {source.name} の記事一覧
            <ExternalLink className="w-4 h-4" aria-hidden="true" />
          </a>
        ))}
      </div>
    </section>
  );
}
