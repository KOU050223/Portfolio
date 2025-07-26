'use client'

import { useCareer } from '@/hooks/useCareer'

export default function CareerPage() {
  const { career, isLoading, error } = useCareer()

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center text-red-600 dark:text-red-400">
          エラーが発生しました: {error}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          キャリア
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          学習履歴と経験・実績をご紹介します。
        </p>
      </div>

      {isLoading ? (
        <div className="text-center text-gray-600 dark:text-gray-300">
          読み込み中...
        </div>
      ) : (
        <div className="space-y-6">
          {career.map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex flex-col md:flex-row gap-4">
                <div className="md:w-24 flex-shrink-0">
                  <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                    {item.date}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 leading-relaxed">
                    {item.description}
                  </p>
                  {item.type && (
                    <div className="flex flex-wrap gap-2">
                      {item.type.split(',').map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 text-xs rounded"
                        >
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}