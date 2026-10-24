import type { Metadata } from 'next'
import { Bricolage_Grotesque, Space_Grotesk } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import './globals.css'

const display = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-display' })
const body = Space_Grotesk({ subsets: ['latin'], variable: '--font-body' })

export const metadata: Metadata = {
  title: { default: 'Kaapi Collective · Specialty Indian coffee, roasted weekly', template: '%s · Kaapi Collective' },
  description: 'Single-estate Indian coffee beans, South Indian filter coffee and brewing gear, roasted every Monday in Chikmagalur.',
  icons: { icon: '/favicon.svg' },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
