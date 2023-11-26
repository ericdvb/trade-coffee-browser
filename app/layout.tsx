import './globals.css'
import { Inter } from 'next/font/google'
import Navigation from '@/app/components/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Trade Coffee Table',
  description: 'An alternate interface for Trade Coffee',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        {children}
        </body>
    </html>
  )
}
