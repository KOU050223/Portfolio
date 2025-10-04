import { NextRequest, NextResponse } from 'next/server'
import { getOgpImage } from '@/lib/getOgp'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const url = searchParams.get('url')

  if (!url) {
    return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 })
  }

  try {
    const ogpImage = await getOgpImage(url)
    return NextResponse.json({ ogpImage })
  } catch (error) {
    console.error('OGP取得エラー:', error)
    return NextResponse.json({ ogpImage: null })
  }
}
