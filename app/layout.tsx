import type { Metadata } from 'next'
import { Poppins, Nunito, Yusei_Magic } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
})

const nunito = Nunito({ 
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-nunito',
})

const yuseiMagic = Yusei_Magic({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-yusei',
})

export const metadata: Metadata = {
  title: 'Roshani Portfolio',
  description: 'Created with v0',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${poppins.variable} ${nunito.variable} ${yuseiMagic.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
