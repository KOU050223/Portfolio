import Link from 'next/link'
import { Github, Twitter, Mail } from 'lucide-react'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* ブランド */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-md bg-white flex items-center justify-center">
              <Image 
                src="/tinkani.png"
                alt="KOU Portfolio Logo"
                width={32}
                height={32}
                className="w-full h-full object-contain rounded-md"
              />
            </div>
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              KOU Portfolio
            </span>
          </div>

          {/* ソーシャルリンク */}
          <div className="flex items-center space-x-4">
            <Link 
              href="https://github.com/KOU050223" 
              target="_blank"
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
            >
              <Github className="w-5 h-5" />
              <span className="text-sm">GitHub</span>
            </Link>
            <Link 
              href="https://x.com/uomikou_0223" 
              target="_blank"
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
            >
              <Twitter className="w-5 h-5" />
              <span className="text-sm">Twitter</span>
            </Link>
            <Link 
              href="mailto:s23a1090@bene.fit.ac.jp"
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span className="text-sm">Email</span>
            </Link>
          </div>
        </div>

        {/* コピーライト */}
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © 2024 魚住 紘平. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}