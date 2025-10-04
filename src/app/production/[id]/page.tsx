import { notFound } from 'next/navigation'
import { getProjectById, getProjects } from '@/lib/google-sheets'
import ProjectDetailClient from './ProjectDetailClient'
import { Metadata } from 'next'

export const revalidate = 3600 // 1時間ごとに再生成

// generateStaticParams でプリレンダリング対象のパスを生成
export async function generateStaticParams() {
  const projects = await getProjects()
  
  return projects.map(project => ({
    id: project.id,
  }))
}

// 動的メタデータ生成
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const project = await getProjectById(id)

  if (!project) {
    return {
      title: '作品が見つかりません',
    }
  }

  return {
    title: `${project.title} | ポートフォリオ`,
    description: project.description,
    openGraph: {
      title: `${project.title} | ポートフォリオ`,
      description: project.description,
      type: 'article',
    },
  }
}

interface ProjectDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { id } = await params
  const project = await getProjectById(id)

  if (!project) {
    notFound()
  }

  return <ProjectDetailClient project={project} />
}