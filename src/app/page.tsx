'use client'

import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'
import { Button } from '@/components/ui/button'
import { ArrowRight, Code, Briefcase, GraduationCap, Star, Eye } from 'lucide-react'
import { useProjects } from '@/hooks/useProjects'
import { useCareer } from '@/hooks/useCareer'
import { skillCategories, getLevelPercentage, getSkillColor } from '@/data/skills'

export default function Home() {
  const { projects, isLoading: projectsLoading } = useProjects()
  const { career, isLoading: careerLoading } = useCareer()
  
  // 最新の3つのプロジェクトを取得
  const latestProjects = projects.slice(0, 3)
  // 最新の3つのキャリアを取得
  const latestCareer = career.slice(0, 3)
  
  // メインスキルを中級以上から抽出（重複除去）
  const allSkills = skillCategories.flatMap(category => category.skills)
  const seen = new Set()
  const mainSkills = allSkills
    .filter(skill => {
      if (seen.has(skill.name) || skill.level === "初級") return false
      seen.add(skill.name)
      return true
    })
    .slice(0, 6)
    .map(skill => ({
      name: skill.name,
      level: getLevelPercentage(skill.level),
      color: getSkillColor(skill.name),
      icons: skill.icons
    }))
  
  // 全技術数を計算（重複除去）
  const totalSkillsCount = new Set(allSkills.map(skill => skill.name)).size
  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "魚住 紘平",
              "alternateName": "ウオミー",
              "description": "福岡工業大学情報工学科在籍のフルスタック開発者",
              "url": "https://portfolio.uomi.site",
              "image": "https://pbs.twimg.com/profile_images/1899830477785075712/LxVQunEl_400x400.jpg",
              "sameAs": [
                "https://github.com/KOU050223",
                "https://x.com/uomikou_0223"
              ],
              "jobTitle": "Software Engineer",
              "worksFor": {
                "@type": "EducationalOrganization",
                "name": "福岡工業大学",
                "department": "情報工学科"
              },
              "knowsAbout": [
                "React", "Next.js", "Node.js", "TypeScript", "JavaScript",
                "Python", "Java", "C++", "Web Development", "Full Stack Development"
              ]
            })
          }}
        />
      </Head>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* ヒーローセクション */}
      <section className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 mb-12">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden shadow-lg">
            <Image
              src="https://pbs.twimg.com/profile_images/1899830477785075712/LxVQunEl_400x400.jpg"
              alt="プロフィール画像"
              width={256}
              height={256}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              魚住 紘平
            </h1>
            <p className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
              Software Engineer
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              福岡工業大学情報工学科在籍（3年生）<br/>
              フルスタック開発者として、新しい技術への挑戦と学習を通じて価値のあるプロダクトを創造
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button asChild size="lg">
                <Link href="/production" className="flex items-center space-x-2">
                  <span>作品を見る</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link 
                  href="https://github.com/KOU050223" 
                  target="_blank"
                  className="flex items-center space-x-2"
                >
                  <span>GitHub</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 統計情報 */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl text-center">
          <Code className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{projects.length}+</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">プロジェクト</div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl text-center">
          <Briefcase className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{career.length}+</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">経験・実績</div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl text-center">
          <GraduationCap className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-gray-900 dark:text-white">1.5年</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">学習期間</div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl text-center">
          <Star className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{totalSkillsCount}+</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">技術スタック</div>
        </div>
      </section>

      {/* 自己紹介セクション */}
      <section className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          <Eye className="inline w-6 h-6 mr-3 text-blue-600 dark:text-blue-400" />
          About Me
        </h2>
        <div className="space-y-6">
          <p className="text-lg text-gray-600 dark:text-gray-300 text-center leading-relaxed">
            はじめまして！福岡工業大学の情報工学科に在籍している魚住 紘平です。
            現在は大学3年生で、2年生の頃から本格的にプログラミングで制作活動を始めました。
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            新しい技術を学ぶことが好きで、常に自己成長を目指しています。
            様々な技術に触れるためフルスタックに開発することが多いですが、
            特にバックエンドの開発を行うことが多いです。
            チーム開発の経験も積んでおり、効率的な開発プロセスと品質の高いコードを心がけています。
          </p>
        </div>
      </section>

      {/* 技術スタック概要 */}
      <section className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          <Star className="inline w-6 h-6 mr-3 text-blue-600 dark:text-blue-400" />
          技術スタック
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {mainSkills.map((skill, index) => (
            <div key={index} className="flex flex-col items-center text-center space-y-3">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <Image 
                  src={`https://skillicons.dev/icons?i=${skill.icons}`} 
                  alt={skill.name}
                  width={40}
                  height={40}
                />
              </div>
              <div className="space-y-1">
                <p className="font-medium text-gray-900 dark:text-white text-sm">
                  {skill.name}
                </p>
                <span className="inline-block px-2 py-1 rounded text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200">
                  {skill.level === 75 ? "中級" : "上級"}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Button asChild variant="outline">
            <Link href="/skill" className="flex items-center space-x-2">
              <span>すべてのスキルを見る</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* 最新プロジェクト */}
      <section className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 mb-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            <Code className="inline w-6 h-6 mr-3 text-blue-600 dark:text-blue-400" />
            最新プロジェクト
          </h2>
          <Button asChild variant="outline" size="sm">
            <Link href="/production" className="flex items-center space-x-2">
              <span>すべて見る</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
        {projectsLoading ? (
          <div className="text-center text-gray-600 dark:text-gray-300">読み込み中...</div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {latestProjects.map((project, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-xs rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {project.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 最新キャリア */}
      <section className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 mb-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            <Briefcase className="inline w-6 h-6 mr-3 text-blue-600 dark:text-blue-400" />
            最新の経験・実績
          </h2>
          <Button asChild variant="outline" size="sm">
            <Link href="/career" className="flex items-center space-x-2">
              <span>すべて見る</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
        {careerLoading ? (
          <div className="text-center text-gray-600 dark:text-gray-300">読み込み中...</div>
        ) : (
          <div className="space-y-4">
            {latestCareer.map((item, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="md:w-24 flex-shrink-0">
                    <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                      {item.date}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      {item.description}
                    </p>
                    {item.type && (
                      <div className="flex flex-wrap gap-1">
                        {item.type.split(',').map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 text-xs rounded"
                          >
                            {tag.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* クイックナビゲーション */}
      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link href="/production" className="group">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <Code className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              作品一覧
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              これまでに制作したプロジェクトをご覧ください
            </p>
          </div>
        </Link>
        <Link href="/career" className="group">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <Briefcase className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              キャリア
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              学習履歴と経験・実績をご紹介
            </p>
          </div>
        </Link>
        <Link href="/skill" className="group">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <Star className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              技術スタック
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              習得している技術とスキルレベル
            </p>
          </div>
        </Link>
        <Link href="/hobby" className="group">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <GraduationCap className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              趣味
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              プログラミング以外の趣味について
            </p>
          </div>
        </Link>
      </section>
      </div>
    </>
  )
}
