import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '토토로',
  description: '산책이 즐거워지다',
}

// Zustand 상태 감싸기
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Tailwind CSS로 모바일 레이아웃 적용
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <div className="min-h-screen flex flex-col justify-between max-w-md mx-auto overflow-y-scroll">
          <main
            className="flex-1"
            style={{
              backgroundImage: "url('/totoro.png')",
              backgroundPosition: 'top 120% center',
            }}
          >
            {children}
          </main>

          {/* 네비게이션 바 */}
          <nav className="bg-black shadow-md fixed bottom-0 left-0 right-0 max-w-md mx-auto">
            <ul className="flex justify-around p-4 text-white">
              <li>
                <Link href="/">home</Link>
              </li>
              <li>
                <Link href="/new-post">new-post</Link>
              </li>
              <li>
                <Link href="/event">event</Link>
              </li>
              <li>
                <Link href="/profile">profile</Link>
              </li>
            </ul>
          </nav>
        </div>
      </body>
    </html>
  )
}
