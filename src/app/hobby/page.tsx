
export default function HobbyPage() {
  const hobbies = [
    {
      title: '音楽',
      description: 'SOUL\'dOUT、ヤバイTシャツ屋さん、超能力戦士ドリアン、Creepy Nuts、キュウソネコカミ、四星球など、邦楽ロックやヒップホップを中心に聴いています。コーディング中のBGMとしても欠かせません。',
      icon: '🎵',
      featured: true,
      link: 'https://music.apple.com/jp/playlist/%E3%82%B9%E3%83%88sognglx%E3%83%9E%E3%82%A4/pl.u-LdbqEpguxGlxdlN',
      linkText: 'Apple Music プレイリスト'
    },
    {
      title: 'アニメ',
      description: '様々なジャンルのアニメを楽しんでいます。ストーリー性の高い作品から日常系まで幅広く視聴し、キャラクターの心情や世界観に没入するのが好きです。',
      icon: '📺',
      featured: true,
      links: [
        {
          url: 'https://animestore.docomo.ne.jp/animestore/CF/mylist_detail?shareListId=9fQYBtjOyMi23bXQ',
          text: '現在視聴中のアニメ一覧'
        },
        {
          url: 'https://animestore.docomo.ne.jp/animestore/CF/mylist_detail?shareListId=9fRv5dD12XrQmw1U',
          text: 'お気に入りアニメ一覧①'
        },
        {
          url: 'https://animestore.docomo.ne.jp/animestore/CF/mylist_detail?shareListId=OCxm4vt6vuox9fwT',
          text: 'お気に入りアニメ一覧②'
        }
      ]
    },
    {
      title: 'ゲーム',
      description: 'ノベルゲームやゆるい戦略ゲーとか箱庭系のゲームとか好きです！Steamでプレイ履歴も公開しています。',
      icon: '🎮',
      link: 'https://steamcommunity.com/profiles/76561198312605499',
      linkText: 'Steamプロフィール'
    },
    {
      title: '漫画',
      description: '結構いろんなジャンルの漫画を読みます。特に、特定の業界に特化した作品が好きで、技術や社会の裏側を描いたものが面白いと感じます。IT系漫画についてもnoteで記事をまとめています。',
      icon: '📚',
      link: 'https://note.com/kou050223/n/n220c9224a377?from=notice',
      linkText: 'IT系漫画まとめ記事'
    }
  ]

  const favoriteArtists = [
    'SOUL\'dOUT', 'ヤバイTシャツ屋さん', '超能力戦士ドリアン', 'Creepy Nuts',
    'キュウソネコカミ', '四星球', 'バンドリ', 'Lucky Kilimanjaro','マキシマム・ザ・ホルモン','SKRYU','sumika',
    'KMNZ','ORANGE RANGE'
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
            className={`bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow ${
              hobby.featured ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
            }`}
          >
            <div className="flex items-start space-x-4">
              <div className="text-4xl">{hobby.icon}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {hobby.title}
                  </h3>
                  {hobby.featured && (
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-xs rounded">
                      特に好き
                    </span>
                  )}
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                  {hobby.description}
                </p>
                {hobby.link && (
                  <a
                    href={hobby.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline text-sm"
                  >
                    {hobby.linkText} →
                  </a>
                )}
                {hobby.links && (
                  <div className="space-y-1">
                    {hobby.links.map((link, linkIndex) => (
                      <a
                        key={linkIndex}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-blue-600 dark:text-blue-400 hover:underline text-sm"
                      >
                        {link.text} →
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 好きなアーティスト */}
      <div className="mt-12 bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <span className="text-2xl mr-3">🎤</span>
          好きなアーティスト
        </h2>
        <div className="flex flex-wrap gap-2">
          {favoriteArtists.map((artist, index) => (
            <span
              key={index}
              className="px-3 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-800 dark:text-purple-200 rounded-full text-sm font-medium"
            >
              {artist}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}