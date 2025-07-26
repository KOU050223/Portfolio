'use client'

import { useEffect, useState } from 'react'

export interface Career {
  date: string
  title: string
  description: string
  type: string
}

export const useCareer = () => {
  const [career, setCareer] = useState<Career[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCareer = async () => {
      try {
        const SPREADSHEET_ID = process.env.NEXT_PUBLIC_SPREADSHEET_ID
        const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY

        if (!SPREADSHEET_ID || !API_KEY) {
          throw new Error('環境変数が設定されていません')
        }

        const response = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/Career!A2:I?key=${API_KEY}`
        )

        if (!response.ok) {
          throw new Error('データの取得に失敗しました: ' + response.status)
        }

        const data = await response.json()

        if (!data.values || !data.values.length) {
          console.log('データが空です')
          setCareer([])
          setIsLoading(false)
          return
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
        setCareer(sortedCareer)
        setIsLoading(false)
      } catch (err) {
        console.error('エラーが発生しました:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
        setIsLoading(false)
      }
    }

    fetchCareer()
  }, [])

  return { career, isLoading, error }
}