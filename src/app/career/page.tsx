import { getCareer } from '@/lib/google-sheets'
import CareerList from '@/components/CareerList'

export const revalidate = 300 // 5分ごとに再生成（スプレッドシート更新を5分以内に反映）

export default async function CareerPage() {
  const career = await getCareer()

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          キャリア
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          学習履歴と経験・実績をご紹介します。
        </p>
      </div>

      <CareerList career={career} />
    </div>
  )
}