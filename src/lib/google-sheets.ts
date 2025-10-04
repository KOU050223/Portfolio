import { config } from './config'
import { getOgpImage } from './getOgp'

export interface Project {
  id: string
  title: string
  authors: string[]
  date: string
  technologies: string[]
  youtubeUrl: string | null
  description: string
  deployLink: string | null
  githubLink: string | null
  articleLink: string | null
  events: string[]
  awards: string[]
  ogpImage: string | null
}

// プロジェクトIDを生成する関数
export function generateProjectId(title: string, date: string): string {
  const cleanTitle = title.toLowerCase()
    .replace(/[^\w\s-]/g, '') // 特殊文字を除去
    .replace(/\s+/g, '-') // スペースをハイフンに変換
    .replace(/-+/g, '-') // 連続するハイフンを単一に
    .trim()
  
  const cleanDate = date.replace(/\//g, '-')
  return `${cleanDate}-${cleanTitle}`.substring(0, 50) // 長すぎる場合は切り詰め
}

export interface Career {
  id: string
  title: string
  date: string
  endDate: string | null
  type: string
  description: string
  detailedDescription: string
  skills: string[]
  achievements: string[]
  links: Array<{ label: string; url: string }>
  imageUrl: string | null
  location: string | null
}

// キャリアIDを生成する関数
export function generateCareerId(title: string, date: string): string {
  const cleanTitle = title.toLowerCase()
    .replace(/[^\w\s-]/g, '') // 特殊文字を除去
    .replace(/\s+/g, '-') // スペースをハイフンに変換
    .replace(/-+/g, '-') // 連続するハイフンを単一に
    .trim()
  
  const cleanDate = date.replace(/\//g, '-')
  return `${cleanDate}-${cleanTitle}`.substring(0, 50) // 長すぎる場合は切り詰め
}

export async function getProjects(): Promise<Project[]> {
  try {
    const SPREADSHEET_ID = config.googleSheets.spreadsheetId
    const API_KEY = config.googleSheets.apiKey

    if (!config.isConfigValid()) {
      console.warn('環境変数が設定されていません。空の配列を返します。')
      return []
    }

    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/Projects!A2:K?key=${API_KEY}`,
      {
        next: { revalidate: 300 } // 5分キャッシュ（スプレッドシート更新を5分以内に反映）
      }
    )

    if (!response.ok) {
      throw new Error('データの取得に失敗しました: ' + response.status)
    }

    const data = await response.json()

    if (!data.values || !data.values.length) {
      console.log('データが空です')
      return []
    }

    const projectsData = data.values.map(([
      title,
      authors,
      date,
      technologies,
      youtubeUrl,
      description,
      deployLink,
      githubLink,
      articleLink,
      events,
      awards
    ]: string[]) => {
      // YouTube URLのクリーニング
      let cleanedYoutubeUrl = youtubeUrl || null
      if (cleanedYoutubeUrl) {
        cleanedYoutubeUrl = cleanedYoutubeUrl.replace(/[',"\s]+$/, '').trim()
        if (cleanedYoutubeUrl === '') {
          cleanedYoutubeUrl = null
        }
      }

      const projectTitle = title || ''
      const projectDate = date || ''

      return {
        id: generateProjectId(projectTitle, projectDate),
        title: projectTitle,
        authors: authors ? authors.split(',').map(author => author.trim()) : [],
        date: projectDate,
        technologies: technologies ? technologies.split(',').map(tech => tech.trim()) : [],
        youtubeUrl: cleanedYoutubeUrl,
        description: description || '',
        deployLink: deployLink || null,
        githubLink: githubLink || null,
        articleLink: articleLink || null,
        events: events ? events.split(',').map(event => event.trim()) : [],
        awards: awards ? awards.split(',').map(award => award.trim()) : [],
        ogpImage: null, // 後で取得
      }
    }).filter((project: Project) => project.title && project.description.length > 0)

    // OGP画像を並列取得
    const projects = await Promise.all(
      projectsData.map(async (project: Project) => {
        if (project.articleLink) {
          try {
            const ogpImage = await getOgpImage(project.articleLink)
            return { ...project, ogpImage }
          } catch (error) {
            console.error(`OGP取得失敗 (${project.title}):`, error)
            return project
          }
        }
        return project
      })
    )

    // 日付でソート（新しい順）
    const sortedProjects = projects.sort((a: Project, b: Project) => {
      if (!a.date) return 1
      if (!b.date) return -1

      const dateA = new Date(a.date.replace(/(\d+)\/(\d+)\/(\d+)/, '$1-$2-$3'))
      const dateB = new Date(b.date.replace(/(\d+)\/(\d+)\/(\d+)/, '$1-$2-$3'))

      return dateB.getTime() - dateA.getTime()
    })

    console.log('取得したプロジェクトデータ:', sortedProjects)
    return sortedProjects
  } catch (err) {
    console.error('プロジェクトデータ取得エラー:', err)
    return []
  }
}

// 特定のプロジェクトを取得する関数
export async function getProjectById(id: string): Promise<Project | null> {
  const projects = await getProjects()
  return projects.find(project => project.id === id) || null
}

export async function getCareer(): Promise<Career[]> {
  try {
    const SPREADSHEET_ID = config.googleSheets.spreadsheetId
    const API_KEY = config.googleSheets.apiKey

    if (!config.isConfigValid()) {
      console.warn('環境変数が設定されていません。空の配列を返します。')
      return []
    }

    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/Career!A2:K?key=${API_KEY}`,
      {
        next: { revalidate: 300 } // 5分キャッシュ（スプレッドシート更新を5分以内に反映）
      }
    )

    if (!response.ok) {
      throw new Error('データの取得に失敗しました: ' + response.status)
    }

    const data = await response.json()

    if (!data.values || !data.values.length) {
      console.log('データが空です')
      return []
    }

    const fetchedCareer = data.values.map(([
      title,
      date,
      endDate,
      type,
      description,
      detailedDescription,
      skills,
      achievements,
      links,
      imageUrl,
      location,
    ]: string[]) => {
      // linksのパース
      let parsedLinks: Array<{ label: string; url: string }> = []
      if (links && links.trim()) {
        try {
          parsedLinks = JSON.parse(links)
        } catch (error) {
          console.error('links JSONのパースエラー:', error)
        }
      }

      const careerTitle = title || ''
      const careerDate = date || ''

      return {
        id: generateCareerId(careerTitle, careerDate),
        title: careerTitle,
        date: careerDate,
        endDate: endDate && endDate.trim() ? endDate.trim() : null,
        type: type || '',
        description: description || '',
        detailedDescription: detailedDescription || description || '',
        skills: skills ? skills.split(',').map(skill => skill.trim()).filter(s => s) : [],
        achievements: achievements ? achievements.split(',').map(achievement => achievement.trim()).filter(a => a) : [],
        links: parsedLinks,
        imageUrl: imageUrl && imageUrl.trim() ? imageUrl.trim() : null,
        location: location && location.trim() ? location.trim() : null,
      }
    }).filter((career: Career) => career.title && career.description.length > 0)

    const sortedCareer = fetchedCareer.sort((a: Career, b: Career) => {
      if (!a.date) return 1
      if (!b.date) return -1

      const dateA = new Date(a.date.replace(/(\d+)\/(\d+)\/(\d+)/, '$1-$2-$3'))
      const dateB = new Date(b.date.replace(/(\d+)\/(\d+)\/(\d+)/, '$1-$2-$3'))

      return dateB.getTime() - dateA.getTime()
    })

    console.log('取得したキャリアデータ:', sortedCareer)
    return sortedCareer
  } catch (err) {
    console.error('キャリアデータ取得エラー:', err)
    return []
  }
}

// 特定のキャリアを取得する関数
export async function getCareerById(id: string): Promise<Career | null> {
  const career = await getCareer()
  return career.find(item => item.id === id) || null
}