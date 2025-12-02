import Image from 'next/image'
import Link from 'next/link'
import { Github } from 'lucide-react'
import { skillCategories } from '@/data/skills'

export default function SkillPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          技術スタック
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          習得している技術とそのスキルレベルをご紹介します。
        </p>
        <Link
          href="/skill/github"
          className="inline-flex items-center px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:opacity-90 transition-opacity"
        >
          <Github className="w-5 h-5 mr-2" />
          GitHubリポジトリを見る
        </Link>
      </div>

      <div className="space-y-8">
        {skillCategories.map((category, categoryIndex) => (
          <div
            key={categoryIndex}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              {category.name}
            </h2>
            <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
              {category.skills.map((skill, skillIndex) => (
                <div key={skillIndex} className="flex flex-col items-center text-center space-y-3">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                    <Image
                      src={`https://skillicons.dev/icons?i=${skill.icons}`}
                      alt={skill.name}
                      width={40}
                      height={40}
                    />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium text-gray-900 dark:text-white text-sm">
                      {skill.name}
                    </h3>
                    <span className={`inline-block px-2 py-1 rounded text-xs ${skill.level === '上級'
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
                      : skill.level === '中級'
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200'
                        : 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200'
                      }`}>
                      {skill.level}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}