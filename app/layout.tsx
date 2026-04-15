import type { Metadata } from 'next'
import { Poppins, Nunito, Yusei_Magic } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { SmoothScroll } from '@/components/motion/SmoothScroll'

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
  title: 'Roshani Chede — Developer & Software Engineer',
  description:
    'Portfolio of Roshani Chede — a developer with 4+ years of experience in .NET, PL/SQL, and modern web stacks. Building dependable, creative software.',
  keywords: ['Roshani Chede', 'Software Engineer', 'Full-Stack Developer', '.NET', 'Next.js', 'PL/SQL', 'Python', 'Portfolio'],
  authors: [{ name: 'Roshani Chede' }],
  openGraph: {
    title: 'Roshani Chede — Developer & Software Engineer',
    description:
      'Portfolio of Roshani Chede — 4+ years of experience building software across .NET, PL/SQL, and modern web stacks.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Roshani Chede — Developer & Software Engineer',
    description: 'Portfolio of Roshani Chede — developer and software engineer.',
  },
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
          <SmoothScroll />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
