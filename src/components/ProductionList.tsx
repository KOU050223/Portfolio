'use client'

import Link from 'next/link'
import { ExternalLink, Play, Trophy, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import YouTubeThumbnail from '@/components/YouTubeThumbnail'
import Image from 'next/image'
import { Project } from '@/lib/google-sheets'

// YouTubeのビデオIDを抽出する関数
function extractYouTubeId(url: string): string | null {
  if (!url || typeof url !== 'string') {
    return null
  }

  // 様々なYouTubeURL形式に対応
  const patterns = [
    // youtube.com/watch?v=VIDEO_ID
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
    // youtu.be/VIDEO_ID
    /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]{11})/,
    // youtube.com/embed/VIDEO_ID
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    // youtube.com/v/VIDEO_ID
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/v\/([a-zA-Z0-9_-]{11})/,
    // youtube.com/watch?v=VIDEO_ID&other_params
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?.*v=([a-zA-Z0-9_-]{11})/,
    // mobile youtube URLs
    /(?:https?:\/\/)?(?:m\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
  ]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match && match[1] && match[1].length === 11) {
      return match[1]
    }
  }

  // 最後の手段: URLの末尾から11文字の英数字を抽出
  const fallbackMatch = url.match(/([a-zA-Z0-9_-]{11})/)
  if (fallbackMatch && fallbackMatch[1]) {
    return fallbackMatch[1]
  }

  return null
}

interface ProductionListProps {
  projects: Project[]
}

export default function ProductionList({ projects }: ProductionListProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] relative"
        >
          {/* サムネイル表示 */}
          {(() => {
            // YouTubeが設定されている場合はYouTubeサムネイル
            if (project.youtubeUrl) {
              const videoId = extractYouTubeId(project.youtubeUrl)
              return videoId ? (
                <YouTubeThumbnail 
                  videoId={videoId} 
                  title={project.title}
                  className="mb-4"
                />
              ) : null
            }
            
            // qiita.comの記事の場合はQiitaカード
            if (project.articleLink && project.articleLink.includes('qiita.com')) {
              return (
                <div className="h-48 bg-gradient-to-br from-green-400 to-green-600 rounded-lg mb-4 flex flex-col items-center justify-center text-white relative">
                  <div className="text-4xl mb-2">📝</div>
                  <div className="text-lg font-bold mb-1">Qiita記事</div>
                  <div className="text-sm opacity-90 text-center px-4 line-clamp-2">
                    {project.title}
                  </div>
                  <div className="absolute top-2 right-2 bg-white text-green-600 px-2 py-1 rounded-md text-xs font-bold">
                    Qiita
                  </div>
                </div>
              )
            }
            
            // YouTubeもQiitaも設定されていない場合はtinkaniアイコン
            return (
              <div className="h-48 bg-gray-100 dark:bg-gray-800 rounded-lg mb-4 flex items-center justify-center">
                <Image 
                  src="/tinkani.png"
                  alt={project.title}
                  width={80}
                  height={80}
                  className="opacity-60"
                />
              </div>
            )
          })()}
          
          <div className="space-y-3">
            <Link href={`/production/${project.id}`}>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {project.title}
              </h3>
            </Link>
            
            {project.authors.length > 0 && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                作成者: {project.authors.join(', ')}
              </p>
            )}
            
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-2">
              {project.technologies.map((tech, techIndex) => (
                <Badge
                  key={techIndex}
                  variant="default"
                  className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200"
                >
                  {tech}
                </Badge>
              ))}
            </div>
            
            {/* 受賞・イベント情報 */}
            {(project.awards.length > 0 || project.events.length > 0) && (
              <div className="flex flex-wrap gap-1 mb-2">
                {project.awards.length > 0 && (
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-200 text-xs">
                    <Trophy className="w-3 h-3 mr-1" />
                    受賞作品
                  </Badge>
                )}
                {project.events.length > 0 && (
                  <Badge variant="outline" className="border-blue-200 text-blue-600 dark:border-blue-800 dark:text-blue-200 text-xs">
                    <MapPin className="w-3 h-3 mr-1" />
                    展示済み
                  </Badge>
                )}
              </div>
            )}
            
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {project.date}
            </p>
            
            {/* リンクボタン */}
            <div className="flex flex-wrap gap-2 pt-2 relative z-10">
              {project.deployLink && (
                <Button asChild size="sm" variant="default">
                  <a
                    href={project.deployLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>デモ</span>
                  </a>
                </Button>
              )}

              {project.githubLink && (
                <Button asChild size="sm" variant="outline">
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    <span>GitHub</span>
                  </a>
                </Button>
              )}

              {project.youtubeUrl && (
                <Button asChild size="sm" variant="outline">
                  <a
                    href={project.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Play className="w-3 h-3" />
                    <span>動画</span>
                  </a>
                </Button>
              )}

              {project.articleLink && (
                <Button asChild size="sm" variant="outline">
                  <a
                    href={project.articleLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>記事</span>
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}