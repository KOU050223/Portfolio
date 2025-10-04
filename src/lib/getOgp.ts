import ogs from 'open-graph-scraper'

export async function getOgp(url: string) {
  try {
    const { result } = await ogs({ url })
    return result
  } catch (error) {
    console.error('Error fetching OGP:', error)
    return null
  }
}

export async function getOgpImage(url: string): Promise<string | null> {
  try {
    const ogp = await getOgp(url)
    if (ogp?.ogImage && ogp.ogImage.length > 0) {
      return ogp.ogImage[0]?.url || null
    }
    return null
  } catch (error) {
    console.error('Error fetching OGP image:', error)
    return null
  }
}
