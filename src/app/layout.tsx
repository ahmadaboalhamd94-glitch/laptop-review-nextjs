import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'لابتوباتي - مراجعات ومواصفات اللاب توبات',
  description: 'أفضل مراجعات اللاب توبات بالعربي - مقارنات، مواصفات، وأسعار',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans bg-bg text-white min-h-screen">
        {children}
      </body>
    </html>
  )
}
