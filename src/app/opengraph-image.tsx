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
          backgroundColor: '#1f2937',
          fontSize: 32,
          fontWeight: 600,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 40,
          }}
        >
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 30,
              color: 'white',
              fontSize: 48,
              fontWeight: 'bold',
            }}
          >
            K
          </div>
          <div style={{ color: 'white' }}>
            <div style={{ fontSize: 48, marginBottom: 10 }}>魚住 紘平</div>
            <div style={{ fontSize: 24, color: '#3b82f6' }}>Software Engineer</div>
          </div>
        </div>
        <div
          style={{
            color: '#9ca3af',
            fontSize: 20,
            textAlign: 'center',
            maxWidth: 800,
            lineHeight: 1.4,
          }}
        >
          福岡工業大学情報工学科在籍のフルスタック開発者
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 30,
            gap: 20,
          }}
        >
          {['React', 'Next.js', 'Node.js', 'TypeScript'].map((tech) => (
            <div
              key={tech}
              style={{
                backgroundColor: '#3b82f6',
                color: 'white',
                padding: '8px 16px',
                borderRadius: 8,
                fontSize: 16,
              }}
            >
              {tech}
            </div>
          ))}
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 30,
            right: 30,
            color: '#6b7280',
            fontSize: 18,
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