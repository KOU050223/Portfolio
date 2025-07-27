import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
export const dynamic = 'force-static'
 
export const alt = '魚住 紘平 | ウオミーのポートフォリオサイト'
export const size = {
  width: 1200,
  height: 630,
}
 
export const contentType = 'image/png'
 
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0f172a',
          fontSize: 32,
          fontWeight: 600,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 30,
          }}
        >
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 25,
              color: 'white',
              fontSize: 40,
              fontWeight: 'bold',
            }}
          >
            K
          </div>
          <div style={{ color: 'white' }}>
            <div style={{ fontSize: 42, marginBottom: 8 }}>魚住 紘平</div>
            <div style={{ fontSize: 22, color: '#1d4ed8' }}>@uomikou_0223</div>
          </div>
        </div>
        <div
          style={{
            color: '#cbd5e1',
            fontSize: 18,
            textAlign: 'center',
            maxWidth: 700,
            lineHeight: 1.3,
          }}
        >
          福岡工業大学情報工学科在籍のフルスタック開発者のポートフォリオサイト
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 25,
            gap: 15,
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {['React', 'Next.js', 'TypeScript', 'Node.js'].map((tech) => (
            <div
              key={tech}
              style={{
                backgroundColor: '#1e40af',
                color: 'white',
                padding: '6px 12px',
                borderRadius: 6,
                fontSize: 14,
              }}
            >
              {tech}
            </div>
          ))}
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 25,
            right: 25,
            color: '#64748b',
            fontSize: 16,
          }}
        >
          portfolio.uomi.site
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}