
export default function HobbyPage() {
  const hobbies = [
    {
      title: 'ゲーム',
      description: 'FPSゲームやRPGなど、様々なジャンルのゲームを楽しんでいます。特にチーム戦略を考えるゲームが好きです。',
      icon: '🎮'
    },
    {
      title: '読書',
      description: '技術書からビジネス書まで幅広く読んでいます。新しい知識を得ることで視野を広げています。',
      icon: '📚'
    },
    {
      title: '映画鑑賞',
      description: 'SF映画やドキュメンタリーを中心に観ています。ストーリーテリングの技法を学ぶのも楽しみの一つです。',
      icon: '🎬'
    },
    {
      title: '音楽',
      description: 'ロックやジャズを聴くのが好きです。コーディング中にも集中できる音楽を探すのが趣味です。',
      icon: '🎵'
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          趣味
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          プログラミング以外の時間に楽しんでいることをご紹介します。
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {hobbies.map((hobby, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-start space-x-4">
              <div className="text-4xl">{hobby.icon}</div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {hobby.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {hobby.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          なぜ趣味が大切か
        </h2>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          プログラミングに集中している時間も大切ですが、異なる分野に触れることで新しい視点やアイデアを得ることができます。
          趣味を通じて得た経験や知識は、開発において創造性を発揮する際の重要な源泉となっています。
          また、リフレッシュすることで、より効率的で質の高いコードを書くことにもつながっています。
        </p>
      </div>
    </div>
  )
}