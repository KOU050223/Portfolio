"use client";

import { ArrowLeft, Calendar, ExternalLink, Play, Trophy, MapPin, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import YouTubeThumbnail from "@/components/YouTubeThumbnail";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/lib/google-sheets";
import { extractYouTubeId } from "@/lib/utils";

interface ProjectDetailClientProps {
  project: Project;
}

export default function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const videoId = project.youtubeUrl ? extractYouTubeId(project.youtubeUrl) : null;

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
            {(() => {
              // 優先順位1: 記事のOGP画像
              if (project.ogpImage) {
                return (
                  <div className="w-full h-full relative bg-gray-100 dark:bg-gray-800">
                    <Image
                      src={project.ogpImage}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                    />
                  </div>
                );
              }

              // 優先順位2: YouTube動画のサムネイル
              if (videoId) {
                return (
                  <YouTubeThumbnail
                    videoId={videoId}
                    title={project.title}
                    className="w-full h-full"
                  />
                );
              }

              // 優先順位3: デフォルト画像
              return (
                <div className="w-full h-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                  <Image
                    src="/tinkani.png"
                    alt={project.title}
                    width={120}
                    height={120}
                    className="opacity-60"
                  />
                </div>
              );
            })()}
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
                    <span>作成者: {project.authors.join(", ")}</span>
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
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200"
                      >
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
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      参加イベント・展示歴
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.events.map((event, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="border-blue-200 text-blue-700 dark:border-blue-800 dark:text-blue-200"
                      >
                        🎪 {event}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 説明 */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                プロジェクトについて
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                {project.description}
              </p>
            </div>

            {/* 使用技術 */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">使用技術</h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <Badge
                    key={index}
                    variant="default"
                    className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* アクションボタン */}
            <div className="flex flex-wrap gap-3">
              {project.deployLink && (
                <Button asChild size="lg" className="flex items-center space-x-2">
                  <Link href={project.deployLink} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4" />
                    <span>デモを見る</span>
                  </Link>
                </Button>
              )}

              {project.githubLink && (
                <Button asChild size="lg" variant="outline" className="flex items-center space-x-2">
                  <Link href={project.githubLink} target="_blank" rel="noopener noreferrer">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    <span>ソースコード</span>
                  </Link>
                </Button>
              )}

              {project.youtubeUrl && (
                <Button asChild size="lg" variant="outline" className="flex items-center space-x-2">
                  <Link href={project.youtubeUrl} target="_blank" rel="noopener noreferrer">
                    <Play className="w-4 h-4" />
                    <span>動画を見る</span>
                  </Link>
                </Button>
              )}

              {project.articleLink && (
                <Button asChild size="lg" variant="outline" className="flex items-center space-x-2">
                  <Link href={project.articleLink} target="_blank" rel="noopener noreferrer">
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
  );
}
