import './globals.css'
import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'

import "@fortawesome/fontawesome-svg-core/styles.css"; 
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; 


const noto_sans = Noto_Sans({
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Weather App',
  description: 'A simple weather app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={noto_sans.className+' bg-[#a288e0] dark:bg-[#5f3fc1]'}>{children}</body>
    </html>
  )
}
