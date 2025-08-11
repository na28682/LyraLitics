import type { Metadata } from 'next'
import { Orbitron, Exo_2 } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'
import { Toaster } from 'react-hot-toast'

const orbitron = Orbitron({ 
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
})

const exo2 = Exo_2({ 
  subsets: ['latin'],
  variable: '--font-exo',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'LyraLytics - Cybernetic Analytics Platform',
  description: 'Advanced unified analytics platform with cybernetic intelligence for marketing teams. Experience the future of data-driven decision making.',
  keywords: 'cybernetic analytics, AI marketing, neural networks, holographic data, quantum insights',
  authors: [{ name: 'LyraLytics Neural Core' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${orbitron.variable} ${exo2.variable}`}>
      <body className="font-exo">
        <Providers>
          {children}
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'rgba(0, 0, 0, 0.9)',
                color: '#00ffff',
                border: '1px solid rgba(0, 255, 255, 0.3)',
                backdropFilter: 'blur(10px)',
                fontFamily: 'var(--font-orbitron)',
              },
            }}
          />
        </Providers>
      </body>
    </html>
  )
} 