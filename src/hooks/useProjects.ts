'use client'

import { useEffect, useState } from 'react'

export interface Project {
  title: string
  authors: string[]
  date: string
  technologies: string[]
  youtubeUrl: string | null
  description: string
  deployLink: string | null
  githubLink: string | null
  articleLink: string | null
}

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const SPREADSHEET_ID = process.env.NEXT_PUBLIC_SPREADSHEET_ID
        const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY

        if (!SPREADSHEET_ID || !API_KEY) {
          throw new Error('環境変数が設定されていません')
        }

        const response = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/Projects!A2:I?key=${API_KEY}`
        )

        if (!response.ok) {
          throw new Error('データの取得に失敗しました: ' + response.status)
        }

        const data = await response.json()

        if (!data.values || !data.values.length) {
          console.log('データが空です')
          setProjects([])
          setIsLoading(false)
          return
        }

        const fetchedProjects = data.values.map(([
          title,
          author,
          date,
          technologiesStr,
          youtubeUrl,
          description,
          deployLink,
          githubLink,
          articleLink
        ]: string[]) => {
          // YouTube URLのクリーニング処理
          let cleanedYoutubeUrl = youtubeUrl || null
          if (cleanedYoutubeUrl) {
            // 余分な文字（カンマ、クオート、スペース）を除去
            cleanedYoutubeUrl = cleanedYoutubeUrl.replace(/[',"\s]+$/, '').trim()
            if (cleanedYoutubeUrl === '') {
              cleanedYoutubeUrl = null
            }
          }
          
          return {
            title: title || '',
            authors: author ? author.split(',').map(name => name.trim()) : [],
            date: date || '',
            technologies: technologiesStr ? technologiesStr.split(',').map(tech => tech.trim()) : [],
            youtubeUrl: cleanedYoutubeUrl,
            description: description || '',
            deployLink: deployLink || null,
            githubLink: githubLink || null,
            articleLink: articleLink || null
          }
        }).filter((project: Project) => project.title && project.authors.length > 0)

        const sortedProjects = fetchedProjects.sort((a: Project, b: Project) => {
          if (!a.date) return 1
          if (!b.date) return -1

          const dateA = new Date(a.date.replace(/(\d+)\/(\d+)\/(\d+)/, '$1-$2-$3'))
          const dateB = new Date(b.date.replace(/(\d+)\/(\d+)\/(\d+)/, '$1-$2-$3'))

          return dateB.getTime() - dateA.getTime()
        })

        console.log('取得したプロジェクトデータ:', sortedProjects)
        
        // YouTube URLが設定されているプロジェクトを詳細ログ出力
        const projectsWithYoutube = sortedProjects.filter((project: Project) => project.youtubeUrl)
        console.log('YouTube URLが設定されているプロジェクト数:', projectsWithYoutube.length)
        projectsWithYoutube.forEach((project: Project) => {
          console.log(`プロジェクト: ${project.title}`)
          console.log(`YouTube URL: ${project.youtubeUrl}`)
        })
        setProjects(sortedProjects)
        setIsLoading(false)
      } catch (err) {
        console.error('エラーが発生しました:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
        setIsLoading(false)
      }
    }

    fetchProjects()
  }, [])

  return { projects, isLoading, error }
}