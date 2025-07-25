export default function CareerPage() {
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

      <div className="space-y-6">
        {/* キャリアアイテムのプレースホルダー */}
        {[
          { date: '2024/01', title: '最新の実績', type: '開発,受賞' },
          { date: '2023/12', title: 'プロジェクト完成', type: '開発' },
          { date: '2023/10', title: 'ハッカソン参加', type: 'イベント' },
          { date: '2023/08', title: 'インターンシップ', type: '開発,学習' },
          { date: '2023/04', title: 'プログラミング学習開始', type: '学習' },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6"
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
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  ここに詳細な説明が入ります。経験の内容や学んだことについて記載します。
                </p>
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
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}