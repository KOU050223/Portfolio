import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Star, GitFork, ExternalLink } from 'lucide-react'

interface Repository {
  id: number
  name: string
  description: string | null
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string | null
  topics: string[]
  updated_at: string
}

async function getRepositories(): Promise<Repository[]> {
  try {
    const res = await fetch('https://api.github.com/users/KOU050223/repos?sort=updated&per_page=100', {
      next: { revalidate: 3600 } // 1時間ごとに再検証
    })

    if (!res.ok) {
      throw new Error('Failed to fetch repositories')
    }

    return res.json()
  } catch (error) {
    console.error('Error fetching repositories:', error)
    return []
  }
}

export default async function GitHubSkillPage() {
  const repositories = await getRepositories()

  // 言語ごとにグルーピング
  const groupedRepositories = repositories.reduce((acc, repo) => {
    const language = repo.language || 'Others'
    if (!acc[language]) {
      acc[language] = []
    }
    acc[language].push(repo)
    return acc
  }, {} as Record<string, Repository[]>)

  // 言語のソート順（Othersは最後、それ以外はリポジトリ数が多い順）
  const sortedLanguages = Object.keys(groupedRepositories).sort((a, b) => {
    if (a === 'Others') return 1
    if (b === 'Others') return -1
    return groupedRepositories[b].length - groupedRepositories[a].length
  })

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <Link
          href="/skill"
          className="inline-flex items-center text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          スキル一覧に戻る
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          GitHub Repositories
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          GitHub上の公開リポジトリ一覧です。実際のコードを通してスキルをご確認いただけます。
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">GitHub Stats</h2>
          {/* Light Mode */}
          <div className="block dark:hidden">
            <Image
              src="https://github-readme-stats.vercel.app/api?username=KOU050223&show_icons=true&theme=default&rank_icon=github"
              alt="GitHub Stats (Light)"
              width={495}
              height={195}
              className="w-full h-auto"
              unoptimized
            />
          </div>
          {/* Dark Mode */}
          <div className="hidden dark:block">
            <Image
              src="https://github-readme-stats.vercel.app/api?username=KOU050223&show_icons=true&theme=dark&rank_icon=github&bg_color=111827&title_color=fff&text_color=9ca3af&icon_color=3b82f6&border_color=374151"
              alt="GitHub Stats (Dark)"
              width={495}
              height={195}
              className="w-full h-auto"
              unoptimized
            />
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Top Languages</h2>
          {/* Light Mode */}
          <div className="block dark:hidden">
            <Image
              src="https://github-readme-stats.vercel.app/api/top-langs/?username=KOU050223&layout=compact&theme=default"
              alt="Top Languages (Light)"
              width={300}
              height={165}
              className="w-full h-auto"
              unoptimized
            />
          </div>
          {/* Dark Mode */}
          <div className="hidden dark:block">
            <Image
              src="https://github-readme-stats.vercel.app/api/top-langs/?username=KOU050223&layout=compact&theme=dark&bg_color=111827&title_color=fff&text_color=9ca3af&border_color=374151"
              alt="Top Languages (Dark)"
              width={300}
              height={165}
              className="w-full h-auto"
              unoptimized
            />
          </div>
        </div>
      </div>

      <div className="space-y-12">
        {sortedLanguages.map((language) => (
          <div key={language}>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <span className="w-2 h-8 bg-blue-500 rounded-full mr-3"></span>
              {language}
              <span className="ml-3 text-sm font-normal text-gray-500 dark:text-gray-400">
                ({groupedRepositories[language].length} repositories)
              </span>
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {groupedRepositories[language].map((repo) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-transparent hover:border-blue-500/20 flex flex-col h-full"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                      {repo.name}
                    </h3>
                    <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors flex-shrink-0 ml-2" />
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 h-10 line-clamp-2">
                    {repo.description || 'No description available'}
                  </p>

                  {repo.topics && repo.topics.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4 h-12 overflow-hidden content-start">
                      {repo.topics.map((topic) => (
                        <span
                          key={topic}
                          className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
                    <div className="flex items-center space-x-4">
                      {repo.language && (
                        <span className="flex items-center">
                          <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
                          {repo.language}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center">
                        <Star className="w-4 h-4 mr-1" />
                        {repo.stargazers_count}
                      </span>
                      <span className="flex items-center">
                        <GitFork className="w-4 h-4 mr-1" />
                        {repo.forks_count}
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
