import type { Metadata } from "next"
import { Fraunces, IBM_Plex_Mono, Instrument_Sans } from "next/font/google"
import "./globals.css"

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
})

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
})

const sans = Instrument_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Yurii Piontkovskyi — Senior Full-Stack Engineer",
  description:
    "Senior full-stack engineer building cloud-native, distributed systems for healthcare, medical imaging AI, and SaaS — and running AI agents in production.",
}

const themeInit = `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':true;document.documentElement.classList.toggle('dark',d)}catch(e){document.documentElement.classList.add('dark')}})()`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className={`${display.variable} ${mono.variable} ${sans.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
