'use client'

import Link from 'next/link'
import { ExternalLink, Github, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useProjects } from '@/hooks/useProjects'
import YouTubeThumbnail from '@/components/YouTubeThumbnail'

// YouTubeのビデオIDを抽出する関数
function extractYouTubeId(url: string): string | null {
  if (!url || typeof url !== 'string') {
    console.log('[extractYouTubeId] 無効なURL:', url)
    return null
  }
  
  console.log('[extractYouTubeId] 処理中のURL:', url)
  
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
      console.log('[extractYouTubeId] 抽出成功:', match[1])
      return match[1]
    }
  }
  
  // 最後の手段: URLの末尾から11文字の英数字を抽出
  const fallbackMatch = url.match(/([a-zA-Z0-9_-]{11})/)
  if (fallbackMatch && fallbackMatch[1]) {
    console.log('[extractYouTubeId] フォールバック抽出:', fallbackMatch[1])
    return fallbackMatch[1]
  }
  
  console.log('[extractYouTubeId] 抽出失敗:', url)
  return null
}

export default function ProductionPage() {
  const { projects, isLoading, error } = useProjects()

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="text-center text-red-600 dark:text-red-400">
          エラーが発生しました: {error}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          作品一覧
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          これまでに制作したプロジェクトをご紹介します。
        </p>
      </div>

      {isLoading ? (
        <div className="text-center text-gray-600 dark:text-gray-300">
          読み込み中...
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              {/* YouTubeサムネイル */}
              {project.youtubeUrl && (() => {
                const videoId = extractYouTubeId(project.youtubeUrl)
                return videoId ? (
                  <YouTubeThumbnail 
                    videoId={videoId} 
                    title={project.title}
                    className="mb-4"
                  />
                ) : null
              })()}
              
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {project.title}
                </h3>
                
                {project.authors.length > 0 && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    作成者: {project.authors.join(', ')}
                  </p>
                )}
                
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-xs rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {project.date}
                </p>
                
                {/* リンクボタン */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.deployLink && (
                    <Button asChild size="sm" variant="default">
                      <Link
                        href={project.deployLink}
                        target="_blank"
                        className="flex items-center space-x-1"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>デモ</span>
                      </Link>
                    </Button>
                  )}
                  
                  {project.githubLink && (
                    <Button asChild size="sm" variant="outline">
                      <Link
                        href={project.githubLink}
                        target="_blank"
                        className="flex items-center space-x-1"
                      >
                        <Github className="w-3 h-3" />
                        <span>GitHub</span>
                      </Link>
                    </Button>
                  )}
                  
                  {project.youtubeUrl && (
                    <Button asChild size="sm" variant="outline">
                      <Link
                        href={project.youtubeUrl}
                        target="_blank"
                        className="flex items-center space-x-1"
                      >
                        <Play className="w-3 h-3" />
                        <span>動画</span>
                      </Link>
                    </Button>
                  )}
                  
                  {project.articleLink && (
                    <Button asChild size="sm" variant="outline">
                      <Link
                        href={project.articleLink}
                        target="_blank"
                        className="flex items-center space-x-1"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>記事</span>
                      </Link>
                    </Button>
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