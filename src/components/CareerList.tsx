'use client'

import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Filter, X, ArrowRight, Calendar, MapPin } from 'lucide-react'
import { Career } from '@/lib/google-sheets'
import Link from 'next/link'

interface CareerListProps {
  career: Career[]
}

export default function CareerList({ career }: CareerListProps) {
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

  return (
    <>
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

      {/* キャリア一覧 */}
      <div className="space-y-6">
        {filteredCareer.map((item) => {
          const displayDate = item.endDate 
            ? `${item.date} 〜 ${item.endDate}`
            : item.date

          return (
            <Link
              key={item.id}
              href={`/career/${item.id}`}
              className="block bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:scale-[1.01] group"
            >
              <div className="flex flex-col md:flex-row gap-4">
                <div className="md:w-32 flex-shrink-0">
                  <div className="flex items-start space-x-2 text-sm font-semibold text-blue-600 dark:text-blue-400">
                    <Calendar className="w-4 h-4 mt-0.5" />
                    <span>{displayDate}</span>
                  </div>
                  {item.location && (
                    <div className="flex items-start space-x-2 text-xs text-gray-500 dark:text-gray-400 mt-2">
                      <MapPin className="w-3 h-3 mt-0.5" />
                      <span>{item.location}</span>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {item.title}
                    </h3>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex-shrink-0 ml-2" />
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.type && item.type.split(',').map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 text-xs rounded"
                      >
                        {tag.trim()}
                      </span>
                    ))}
                    {item.skills.length > 0 && (
                      <>
                        {item.skills.slice(0, 3).map((skill, skillIndex) => (
                          <span
                            key={`skill-${skillIndex}`}
                            className="px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs rounded"
                          >
                            {skill}
                          </span>
                        ))}
                        {item.skills.length > 3 && (
                          <span className="px-2 py-1 text-gray-500 dark:text-gray-400 text-xs">
                            +{item.skills.length - 3}
                          </span>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
        {filteredCareer.length === 0 && (
          <div className="text-center text-gray-600 dark:text-gray-300 py-8">
            「{selectedFilter}」に該当するキャリアが見つかりませんでした。
          </div>
        )}
      </div>
    </>
  )
}