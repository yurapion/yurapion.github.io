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

  const toggle = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle("dark", next)
    try {
      localStorage.setItem("theme", next ? "dark" : "light")
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
        <div className="flex items-center gap-5 sm:gap-7">
          {navLinks.map((l, index) => {
            const hrefPath = l.href.replace(basePath, "").replace(/#.*$/, "") || "/"
            const active = hrefPath !== "/" && activePath.startsWith(hrefPath)
            return (
              <a
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`link-slide transition-colors hover:text-fg ${
                  index > 1 ? "hidden sm:inline" : "inline"
                } ${active ? "text-accent" : "text-muted"}`}
              >
                {l.label}
              </a>
            )
          })}
          <button
            onClick={toggle}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-accent"
          >
            {dark ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        </div>
      </nav>
    </header>
  )
}
