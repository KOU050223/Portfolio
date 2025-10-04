import { notFound } from 'next/navigation'
import { getCareerById, getCareer } from '@/lib/google-sheets'
import CareerDetailClient from './CareerDetailClient'
import { Metadata } from 'next'

export const revalidate = 300 // 5分ごとに再生成（スプレッドシート更新を5分以内に反映）

// generateStaticParams でプリレンダリング対象のパスを生成
export async function generateStaticParams() {
  const career = await getCareer()
  
  return career.map(item => ({
    id: item.id,
  }))
}

// 動的メタデータ生成
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const careerItem = await getCareerById(id)

  if (!careerItem) {
    return {
      title: 'キャリアが見つかりません',
    }
  }

  return {
    title: `${careerItem.title} | キャリア`,
    description: careerItem.description,
    openGraph: {
      title: `${careerItem.title} | キャリア`,
      description: careerItem.description,
      type: 'article',
    },
  }
}

interface CareerDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function CareerDetailPage({ params }: CareerDetailPageProps) {
  const { id } = await params
  const careerItem = await getCareerById(id)

  if (!careerItem) {
    notFound()
  }

  return <CareerDetailClient careerItem={careerItem} />
}
