export default function SkillPage() {
  const skillCategories = [
    {
      name: 'フロントエンド',
      skills: [
        { name: 'React', level: 90, icon: 'react' },
        { name: 'Next.js', level: 85, icon: 'nextjs' },
        { name: 'TypeScript', level: 80, icon: 'typescript' },
        { name: 'Tailwind CSS', level: 85, icon: 'tailwindcss' },
      ]
    },
    {
      name: 'バックエンド',
      skills: [
        { name: 'Node.js', level: 85, icon: 'nodejs' },
        { name: 'Python', level: 75, icon: 'python' },
        { name: 'Go', level: 70, icon: 'go' },
        { name: 'PostgreSQL', level: 80, icon: 'postgresql' },
      ]
    },
    {
      name: 'ツール・その他',
      skills: [
        { name: 'Git', level: 85, icon: 'git' },
        { name: 'Docker', level: 75, icon: 'docker' },
        { name: 'AWS', level: 70, icon: 'aws' },
        { name: 'Figma', level: 65, icon: 'figma' },
      ]
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          技術スタック
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          習得している技術とそのスキルレベルをご紹介します。
        </p>
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
            <div className="grid gap-6 md:grid-cols-2">
              {category.skills.map((skill, skillIndex) => (
                <div key={skillIndex} className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                      {skill.icon.slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {skill.name}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-600 dark:bg-blue-400 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
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