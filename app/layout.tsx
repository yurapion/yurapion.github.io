import type { Metadata } from "next"
import { Fraunces, IBM_Plex_Mono, Instrument_Sans } from "next/font/google"
import { siteProfile, siteUrl } from "@/data/site"
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

const description = `${siteProfile.role} building cloud-native systems for healthcare, medical imaging AI, SaaS, and production agent workflows.`

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteProfile.name} — ${siteProfile.role}`,
    template: `%s — ${siteProfile.name}`,
  },
  description,
  applicationName: siteProfile.name,
  authors: [{ name: siteProfile.name, url: siteUrl }],
  creator: siteProfile.name,
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: `${siteProfile.name} — Portfolio`,
    title: `${siteProfile.name} — ${siteProfile.role}`,
    description,
    locale: "en_GB",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `${siteProfile.name} — ${siteProfile.role}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteProfile.name} — ${siteProfile.role}`,
    description,
    images: ["/og.png"],
  },
  alternates: {
    canonical: siteUrl,
  },
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
