import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Code, Briefcase, GraduationCap, Star } from 'lucide-react'

export default function Home() {
  return (
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
          <div className="text-2xl font-bold text-gray-900 dark:text-white">10+</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">プロジェクト</div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl text-center">
          <Briefcase className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-gray-900 dark:text-white">5+</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">経験・実績</div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl text-center">
          <GraduationCap className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-gray-900 dark:text-white">1.5年</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">学習期間</div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl text-center">
          <Star className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-gray-900 dark:text-white">20+</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">技術スタック</div>
        </div>
      </section>

      {/* 自己紹介セクション */}
      <section className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
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
  )
}
