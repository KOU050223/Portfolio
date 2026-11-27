import { ExternalLink } from "lucide-react";
import { ARTICLE_SOURCES } from "@/lib/articles";
import { SourceIcon } from "@/components/ArticleCard";

export default function ArticleSourceLinks() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {ARTICLE_SOURCES.map((source) => (
        <a
          key={source.name}
          href={source.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-200"
        >
          <SourceIcon source={source.name} />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {source.name} の記事一覧
          </span>
          <ExternalLink
            className="w-4 h-4 ml-auto text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
            aria-hidden="true"
          />
        </a>
      ))}
    </div>
  );
}
