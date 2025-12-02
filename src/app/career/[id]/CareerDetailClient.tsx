'use client'

import { ArrowLeft, Calendar, MapPin, ExternalLink, Award, Briefcase } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import Link from 'next/link'
import { Career } from '@/lib/google-sheets'

interface CareerDetailClientProps {
  careerItem: Career
}

export default function CareerDetailClient({ careerItem }: CareerDetailClientProps) {
  // 日付の表示形式を整える
  const displayDate = careerItem.endDate 
    ? `${careerItem.date} 〜 ${careerItem.endDate}`
    : careerItem.date

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* 戻るボタン */}
        <div className="mb-6">
          <Button asChild variant="ghost" className="mb-4">
            <Link href="/career" className="flex items-center space-x-2">
              <ArrowLeft className="w-4 h-4" />
              <span>キャリア一覧に戻る</span>
            </Link>
          </Button>
        </div>

        {/* メインコンテンツ */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          {/* ヘッダー画像 */}
          {careerItem.imageUrl && (
            <div className="relative h-64 md:h-80">
              <div className="w-full h-full relative bg-gray-100 dark:bg-gray-800">
                <Image
                  src={careerItem.imageUrl}
                  alt={careerItem.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                />
              </div>
            </div>
          )}

          {/* キャリア情報 */}
          <div className="p-6 md:p-8">
            {/* タイトルと基本情報 */}
            <div className="mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {careerItem.title}
              </h1>
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-300 mb-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{displayDate}</span>
                </div>
                
                {careerItem.location && (
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>{careerItem.location}</span>
                  </div>
                )}
              </div>

              {/* カテゴリタグ */}
              {careerItem.type && (
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {careerItem.type.split(',').map((tag, index) => (
                      <Badge key={index} variant="outline" className="border-blue-200 text-blue-700 dark:border-blue-800 dark:text-blue-200">
                        <Briefcase className="w-3 h-3 mr-1" />
                        {tag.trim()}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 説明 */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">詳細</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                {careerItem.detailedDescription}
              </p>
            </div>

            {/* 使用技術・スキル */}
            {careerItem.skills.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">使用技術・スキル</h2>
                <div className="flex flex-wrap gap-2">
                  {careerItem.skills.map((skill) => (
                    <Badge key={skill} variant="default" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* 成果・実績 */}
            {careerItem.achievements.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-3">
                  <Award className="w-5 h-5 text-yellow-500" />
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">成果・実績</h2>
                </div>
                <div className="space-y-2">
                  {careerItem.achievements.map((achievement) => (
                    <div key={achievement} className="flex items-start space-x-2">
                      <span className="text-yellow-500 mt-1">✓</span>
                      <span className="text-gray-700 dark:text-gray-300">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 関連リンク */}
            {careerItem.links.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">関連リンク</h2>
                <div className="flex flex-wrap gap-3">
                  {careerItem.links.map((link, index) => (
                    <Button
                      key={index}
                      asChild
                      size="lg"
                      variant="outline"
                      className="flex items-center space-x-2"
                    >
                      <Link
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>{link.label}</span>
                      </Link>
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
