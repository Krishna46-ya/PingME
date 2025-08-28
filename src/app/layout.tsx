import type { Metadata } from 'next'
import { Geist, Geist_Mono , Edu_NSW_ACT_Cursive, Nunito , Bubbler_One } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-nunito',
})

const bubblerOne = Bubbler_One({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-bubbler',
})

const eduFont = Edu_NSW_ACT_Cursive({
  subsets: ['latin'],        // required
  weight: ['400', '700'],    // choose the weights you need
  style: 'normal',           // optional
  variable: '--font-edu',    // optional CSS variable for Tailwind
})

export const metadata: Metadata = {
  title: 'PingME',
  icons:{
    icon: "/favicon.jpg"
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${eduFont.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
