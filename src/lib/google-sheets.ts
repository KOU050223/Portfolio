import { config } from './config'

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

export interface Career {
  date: string
  title: string
  description: string
  type: string
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
      `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/Projects!A2:I?key=${API_KEY}`,
      {
        next: { revalidate: 3600 } // 1時間キャッシュ
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

    const projects = data.values.map(([
      title,
      authors,
      date,
      technologies,
      youtubeUrl,
      description,
      deployLink,
      githubLink,
      articleLink
    ]: string[]) => {
      // YouTube URLのクリーニング
      let cleanedYoutubeUrl = youtubeUrl || null
      if (cleanedYoutubeUrl) {
        cleanedYoutubeUrl = cleanedYoutubeUrl.replace(/[',"\s]+$/, '').trim()
        if (cleanedYoutubeUrl === '') {
          cleanedYoutubeUrl = null
        }
      }

      return {
        title: title || '',
        authors: authors ? authors.split(',').map(author => author.trim()) : [],
        date: date || '',
        technologies: technologies ? technologies.split(',').map(tech => tech.trim()) : [],
        youtubeUrl: cleanedYoutubeUrl,
        description: description || '',
        deployLink: deployLink || null,
        githubLink: githubLink || null,
        articleLink: articleLink || null,
      }
    }).filter((project: Project) => project.title && project.description.length > 0)

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

export async function getCareer(): Promise<Career[]> {
  try {
    const SPREADSHEET_ID = config.googleSheets.spreadsheetId
    const API_KEY = config.googleSheets.apiKey

    if (!config.isConfigValid()) {
      console.warn('環境変数が設定されていません。空の配列を返します。')
      return []
    }

    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/Career!A2:I?key=${API_KEY}`,
      {
        next: { revalidate: 3600 } // 1時間キャッシュ
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
      date,
      title,
      description,
      type,
    ]: string[]) => ({
      date: date || '',
      title: title || '',
      description: description || '',
      type: type || '',
    })).filter((career: Career) => career.title && career.description.length > 0)

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