import Image from "next/image";
import { ExternalLink, Tag } from "lucide-react";
import type { Article } from "@/lib/articles";

export const SOURCE_ICONS: Record<string, { src: string; label: string }> = {
  Qiita: { src: "/icons/qiita.svg", label: "Qiita" },
  note: { src: "/icons/note.svg", label: "note" },
  "sizu.me": { src: "/icons/sizu.png", label: "sizu.me" },
};

export function SourceIcon({ source, size = 20 }: { source: string; size?: number }) {
  const icon = SOURCE_ICONS[source];
  if (!icon) return null;
  return (
    <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white border border-gray-200 dark:border-gray-600 shadow-sm overflow-hidden shrink-0">
      <Image src={icon.src} alt="" width={size} height={size} className="object-contain" />
    </span>
  );
}

const MAX_TAGS = 3;

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <a
      key={article.url}
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden hover:shadow-lg hover:-translate-y-0.5 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-200"
    >
      {article.imageUrl ? (
        <div className="relative aspect-video w-full overflow-hidden bg-gray-100 dark:bg-gray-700">
          <Image
            src={article.imageUrl}
            alt=""
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover group-hover:scale-105 transition-transform duration-200"
          />
        </div>
      ) : null}

      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center gap-2.5 mb-3">
          <SourceIcon source={article.source} />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
            {article.source}
          </span>
          <time
            dateTime={article.publishedAt}
            className="ml-auto text-xs text-gray-400 dark:text-gray-500"
          >
            {new Intl.DateTimeFormat("ja-JP", {
              timeZone: "Asia/Tokyo",
              dateStyle: "medium",
            }).format(new Date(article.publishedAt))}
          </time>
        </div>

        <h3 className="text-base font-semibold leading-relaxed text-gray-900 dark:text-white line-clamp-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {article.title}
        </h3>

        {article.tags.length > 0 ? (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {article.tags.slice(0, MAX_TAGS).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
              >
                <Tag className="w-3 h-3" aria-hidden="true" />
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        <div className="flex justify-end mt-auto pt-4">
          <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            記事を読む
            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
          </span>
        </div>
      </div>
    </a>
  );
}
