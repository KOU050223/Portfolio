'use client'

import { ArrowLeft, Calendar, ExternalLink, Github, Play, Trophy, MapPin, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import YouTubeThumbnail from '@/components/YouTubeThumbnail'
import Image from 'next/image'
import Link from 'next/link'
import { Project } from '@/lib/google-sheets'

// YouTubeのビデオIDを抽出する関数
function extractYouTubeId(url: string): string | null {
  if (!url || typeof url !== 'string') {
    return null
  }
  
  const patterns = [
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
    /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]{11})/,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/v\/([a-zA-Z0-9_-]{11})/,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?.*v=([a-zA-Z0-9_-]{11})/,
    /(?:https?:\/\/)?(?:m\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
  ]
  
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match && match[1] && match[1].length === 11) {
      return match[1]
    }
  }
  
  return null
}

interface ProjectDetailClientProps {
  project: Project
}

export default function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const videoId = project.youtubeUrl ? extractYouTubeId(project.youtubeUrl) : null

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* 戻るボタン */}
        <div className="mb-6">
          <Button asChild variant="ghost" className="mb-4">
            <Link href="/production" className="flex items-center space-x-2">
              <ArrowLeft className="w-4 h-4" />
              <span>作品一覧に戻る</span>
            </Link>
          </Button>
        </div>

        {/* メインコンテンツ */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          {/* ヘッダー画像 */}
          <div className="relative h-64 md:h-80">
            {videoId ? (
              <YouTubeThumbnail
                videoId={videoId}
                title={project.title}
                className="w-full h-full"
              />
            ) : project.articleLink && project.articleLink.includes('qiita.com') ? (
              <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600 flex flex-col items-center justify-center text-white relative">
                <div className="text-6xl mb-4">📝</div>
                <div className="text-2xl font-bold mb-2">Qiita記事</div>
                <div className="text-lg opacity-90 text-center px-4">
                  {project.title}
                </div>
                <div className="absolute top-4 right-4 bg-white text-green-600 px-3 py-2 rounded-lg font-bold">
                  Qiita
                </div>
              </div>
            ) : (
              <div className="w-full h-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                <Image 
                  src="/tinkani.png"
                  alt={project.title}
                  width={120}
                  height={120}
                  className="opacity-60"
                />
              </div>
            )}
          </div>

          {/* プロジェクト情報 */}
          <div className="p-6 md:p-8">
            {/* タイトルと基本情報 */}
            <div className="mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {project.title}
              </h1>
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-300 mb-4">
                {project.authors.length > 0 && (
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>作成者: {project.authors.join(', ')}</span>
                  </div>
                )}
                
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{project.date}</span>
                </div>
              </div>

              {/* 受賞歴 */}
              {project.awards.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">受賞歴</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.awards.map((award, index) => (
                      <Badge key={index} variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200">
                        🏆 {award}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* イベント・展示歴 */}
              {project.events.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin className="w-5 h-5 text-blue-500" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">参加イベント・展示歴</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.events.map((event, index) => (
                      <Badge key={index} variant="outline" className="border-blue-200 text-blue-700 dark:border-blue-800 dark:text-blue-200">
                        🎪 {event}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 説明 */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">プロジェクトについて</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                {project.description}
              </p>
            </div>

            {/* 使用技術 */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">使用技術</h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <Badge key={index} variant="default" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* アクションボタン */}
            <div className="flex flex-wrap gap-3">
              {project.deployLink && (
                <Button asChild size="lg" className="flex items-center space-x-2">
                  <Link
                    href={project.deployLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>デモを見る</span>
                  </Link>
                </Button>
              )}
              
              {project.githubLink && (
                <Button asChild size="lg" variant="outline" className="flex items-center space-x-2">
                  <Link
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="w-4 h-4" />
                    <span>ソースコード</span>
                  </Link>
                </Button>
              )}
              
              {project.youtubeUrl && (
                <Button asChild size="lg" variant="outline" className="flex items-center space-x-2">
                  <Link
                    href={project.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Play className="w-4 h-4" />
                    <span>動画を見る</span>
                  </Link>
                </Button>
              )}
              
              {project.articleLink && (
                <Button asChild size="lg" variant="outline" className="flex items-center space-x-2">
                  <Link
                    href={project.articleLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>記事を読む</span>
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}