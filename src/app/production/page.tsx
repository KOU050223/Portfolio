import { Code, Star } from 'lucide-react'
import { getProjects } from '@/lib/google-sheets'
import ProductionList from '@/components/ProductionList'

export const revalidate = 3600 // 1時間ごとに再生成

export default async function ProductionPage() {
  const projects = await getProjects()

  // 全技術数を計算（重複除去）
  const totalTechnologies = projects.length > 0 
    ? new Set(projects.flatMap(project => project.technologies)).size 
    : 0

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

      {/* 統計情報 */}
      <section className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl text-center">
          <Code className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{projects.length}</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">作品数</div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl text-center">
          <Star className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{totalTechnologies}</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">使用技術数</div>
        </div>
      </section>

      <ProductionList projects={projects} />
    </div>
  )
}