import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SpeedInsights } from '@vercel/speed-insights/next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Finance App',
  description: 'Personal finance management application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>Next.js</title>
      </head>
      <body className={inter.className}>
        {children}
        <SpeedInsights
          options={{
            thresholds: {
              performance: 50,
              accessibility: 50,
              bestPractices: 50,
              seo: 50,
              pwa: 50,
            },
          }}
        />
      </body>
    </html>
  )
}
