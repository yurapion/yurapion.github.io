"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { Moon, Sun } from "lucide-react"
import { basePath, navLinks, routes } from "@/data/site"

export function Nav() {
  const [dark, setDark] = useState(true)
  const pathname = usePathname()

  const activePath = pathname?.startsWith(basePath) ? pathname.slice(basePath.length) || "/" : pathname || "/"

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"))
  }, [])

  function toggleTheme() {
    const useDarkTheme = !dark

    setDark(useDarkTheme)
    document.documentElement.classList.toggle("dark", useDarkTheme)

    try {
      localStorage.setItem("theme", useDarkTheme ? "dark" : "light")
    } catch {
      // private mode — theme just won't persist
    }
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg/85 backdrop-blur-md">
      <nav className="mx-auto flex h-14 max-w-page items-center justify-between px-5 font-mono text-xs tracking-wide sm:px-8">
        <a href={routes.home} className="font-medium text-fg">
          Y·P
        </a>
        <div className="flex items-center gap-4 sm:gap-6">
          {navLinks.map((link, index) => {
            const hrefPath = link.href.replace(basePath, "").replace(/#.*$/, "") || "/"
            const active = hrefPath !== "/" && activePath.startsWith(hrefPath)

            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`link-slide py-4 transition-colors hover:text-fg ${
                  index > 2 ? "hidden sm:inline" : "inline"
                } ${active ? "text-accent" : "text-muted"}`}
              >
                {link.label}
              </a>
            )
          })}
          <button
            onClick={toggleTheme}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-accent"
          >
            {dark ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        </div>
      </nav>
    </header>
  )
}
