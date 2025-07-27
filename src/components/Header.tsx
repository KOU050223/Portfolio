"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Home, Code, Briefcase, Settings, Gamepad2, Menu, X } from 'lucide-react'
import Image from 'next/image'

const navigationItems = [
  { name: 'ホーム', path: '/', icon: Home },
  { name: '作品一覧', path: '/production', icon: Code },
  { name: 'キャリア', path: '/career', icon: Briefcase },
  { name: '技術スタック', path: '/skill', icon: Settings },
  { name: '趣味', path: '/hobby', icon: Gamepad2 },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const isActiveRoute = (path: string) => {
    if (path === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(path)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 dark:bg-gray-900/80 dark:border-gray-700">
      <div className="max-w-7xl mx-auto h-16 md:h-20">
        <div className="flex items-center justify-between h-full px-4 md:px-6">
          {/* ロゴ・ブランド名 */}
          <Link href="/" className="flex items-center space-x-2 md:space-x-3 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-md bg-white flex items-center justify-center">
              <Image 
                src="/tinkani.png"
                alt="KOU Portfolio Logo"
                width={40}
                height={40}
                className="w-full h-full object-contain rounded-md"
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg md:text-xl font-bold text-blue-600 dark:text-blue-400">
                KOU Portfolio
              </h1>
            </div>
            <div className="block sm:hidden">
              <h1 className="text-lg font-bold text-blue-600 dark:text-blue-400">KOU</h1>
            </div>
          </Link>

          {/* デスクトップナビゲーション */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon
              return (
                <Button
                  key={item.path}
                  asChild
                  variant={isActiveRoute(item.path) ? "default" : "ghost"}
                  size="sm"
                  className="h-9"
                >
                  <Link href={item.path} className="flex items-center space-x-2">
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                </Button>
              )
            })}
          </nav>

          {/* モバイルメニューボタン */}
          <Button
            variant="default"
            size="sm"
            className="md:hidden flex items-center space-x-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            <span>{isOpen ? '閉じる' : 'メニュー'}</span>
          </Button>
        </div>

        {/* モバイルナビゲーション */}
        {isOpen && (
          <div className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-700">
            <nav className="flex flex-col p-4 space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon
                return (
                  <Button
                    key={item.path}
                    asChild
                    variant={isActiveRoute(item.path) ? "default" : "ghost"}
                    className="justify-start h-12"
                    onClick={() => setIsOpen(false)}
                  >
                    <Link href={item.path} className="flex items-center space-x-3">
                      <Icon className="w-5 h-5" />
                      <span>{item.name}</span>
                    </Link>
                  </Button>
                )
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}