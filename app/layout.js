import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AnimatedBackground from '@/components/layout/AnimatedBackground'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Renaissance HAVEN',
  description: 'A Living Registry of Systems, Signals, and Solutions',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AnimatedBackground />
        <Header />
        <main className="min-h-screen relative z-0">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
