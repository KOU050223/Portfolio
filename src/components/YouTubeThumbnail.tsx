'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Play } from 'lucide-react'

interface YouTubeThumbnailProps {
  videoId: string
  title: string
  className?: string
}

export default function YouTubeThumbnail({ videoId, title, className = "" }: YouTubeThumbnailProps) {
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [currentUrlIndex, setCurrentUrlIndex] = useState(0)
  const [isValidVideoId, setIsValidVideoId] = useState(true)

  // YouTubeサムネイルURLの優先順位付きリスト（高解像度から低解像度へ）
  const thumbnailUrls = [
    `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,      // 480x360 (高品質)
    `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,      // 320x180 (中品質)
    `https://img.youtube.com/vi/${videoId}/default.jpg`,        // 120x90 (標準)
    `https://img.youtube.com/vi/${videoId}/0.jpg`,             // フレーム0
    `https://img.youtube.com/vi/${videoId}/1.jpg`,             // フレーム1
    `https://img.youtube.com/vi/${videoId}/2.jpg`,             // フレーム2
    `https://img.youtube.com/vi/${videoId}/3.jpg`              // フレーム3
  ]

  // videoIdの基本的な検証
  useEffect(() => {
    if (!videoId || videoId.length < 10 || videoId.length > 12) {
      setIsValidVideoId(false)
      setImageError(true)
    } else {
      setIsValidVideoId(true)
      setImageError(false)
      setCurrentUrlIndex(0)
      setImageLoaded(false)
    }
  }, [videoId])

  const handleImageError = () => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[YouTubeThumbnail] 404エラー: ${thumbnailUrls[currentUrlIndex]}`)
      console.log(`[YouTubeThumbnail] Video ID: ${videoId}`)
    }
    
    if (currentUrlIndex < thumbnailUrls.length - 1) {
      const nextIndex = currentUrlIndex + 1
      if (process.env.NODE_ENV === 'development') {
        console.log(`[YouTubeThumbnail] 次の解像度に切り替え: ${thumbnailUrls[nextIndex]}`)
      }
      setCurrentUrlIndex(nextIndex)
      setImageLoaded(false) // 新しい画像のローディング状態をリセット
    } else {
      if (process.env.NODE_ENV === 'development') {
        console.log(`[YouTubeThumbnail] 全ての解像度で404エラー (${videoId}) - フォールバック表示`)
      }
      setImageError(true)
    }
  }

  const handleImageLoad = () => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[YouTubeThumbnail] 成功: ${thumbnailUrls[currentUrlIndex]} (Video ID: ${videoId})`)
    }
    setImageLoaded(true)
    setImageError(false)
  }

  // 無効なvideoIdまたは全てのURLが失敗した場合のフォールバック
  if (!isValidVideoId || imageError) {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[YouTubeThumbnail] フォールバック表示: ${videoId} (エラー: ${imageError}, 無効ID: ${!isValidVideoId})`)
    }
    return (
      <div className={`aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-lg overflow-hidden relative flex items-center justify-center ${className}`}>
        <div className="text-center p-4">
          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
            <Play className="w-8 h-8 text-white" fill="white" />
          </div>
          <p className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">
            YouTube動画
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            {title}
          </p>
          {process.env.NODE_ENV === 'development' && (
            <p className="text-xs text-red-500 mt-2">
              404: {videoId}
            </p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={`aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden relative ${className}`}>
      <Image
        key={`${videoId}-${currentUrlIndex}`} // キーを追加してリレンダリングを強制
        src={thumbnailUrls[currentUrlIndex]}
        alt={`${title} - YouTubeサムネイル`}
        fill
        className="object-cover"
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
      
      {/* ローディング状態の表示 */}
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-2"></div>
            <p className="text-xs text-gray-500 dark:text-gray-400">読み込み中...</p>
          </div>
        </div>
      )}
      
      {/* 開発環境でのデバッグ情報 */}
      {process.env.NODE_ENV === 'development' && imageLoaded && (
        <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
          <div>解像度: {currentUrlIndex === 0 ? '最高' : currentUrlIndex === 1 ? '高' : currentUrlIndex === 2 ? '中' : '標準'}</div>
          <div>URL: {currentUrlIndex + 1}/{thumbnailUrls.length}</div>
        </div>
      )}
    </div>
  )
}