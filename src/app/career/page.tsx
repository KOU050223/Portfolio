'use client'

import { useState, useMemo } from 'react'
import { useCareer } from '@/hooks/useCareer'
import { Button } from '@/components/ui/button'
import { Filter, X } from 'lucide-react'

export default function CareerPage() {
  const { career, isLoading, error } = useCareer()
  const [selectedFilter, setSelectedFilter] = useState<string>('すべて')

  // 全てのタグを取得
  const allTags = useMemo(() => {
    const tags = new Set<string>()
    career.forEach(item => {
      if (item.type) {
        item.type.split(',').forEach(tag => {
          tags.add(tag.trim())
        })
      }
    })
    return ['すべて', ...Array.from(tags).sort()]
  }, [career])

  // フィルタリングされたキャリア
  const filteredCareer = useMemo(() => {
    if (selectedFilter === 'すべて') {
      return career
    }
    return career.filter(item => 
      item.type && item.type.split(',').some(tag => tag.trim() === selectedFilter)
    )
  }, [career, selectedFilter])

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
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          学習履歴と経験・実績をご紹介します。
        </p>
        
        {/* フィルター */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Filter className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">カテゴリで絞り込み:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <Button
                key={tag}
                variant={selectedFilter === tag ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter(tag)}
                className="text-xs"
              >
                {tag}
                {selectedFilter === tag && selectedFilter !== 'すべて' && (
                  <X className="w-3 h-3 ml-1" />
                )}
              </Button>
            ))}
          </div>
          {selectedFilter !== 'すべて' && (
            <div className="mt-3 text-sm text-gray-600 dark:text-gray-300">
              「{selectedFilter}」で絞り込み中 ({filteredCareer.length}件)
            </div>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="text-center text-gray-600 dark:text-gray-300">
          読み込み中...
        </div>
      ) : (
        <div className="space-y-6">
          {filteredCareer.map((item, index) => (
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
          {filteredCareer.length === 0 && (
            <div className="text-center text-gray-600 dark:text-gray-300 py-8">
              「{selectedFilter}」に該当するキャリアが見つかりませんでした。
            </div>
          )}
        </div>
      )}
    </div>
  )
}