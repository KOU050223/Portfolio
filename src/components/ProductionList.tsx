'use client'

import Link from 'next/link'
import { ExternalLink, Github, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import YouTubeThumbnail from '@/components/YouTubeThumbnail'
import Image from 'next/image'
import { Project } from '@/lib/google-sheets'

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

interface ProductionListProps {
  projects: Project[]
}

export default function ProductionList({ projects }: ProductionListProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
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
  )
}