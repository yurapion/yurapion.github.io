"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"

const links = [
  { href: "#work", label: "Work" },
  { href: "#approach", label: "Approach" },
  { href: "#ai", label: "AI" },
  { href: "#writing", label: "Writing" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
]

export function Nav() {
  const [dark, setDark] = useState(true)

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
        <a href="#top" className="font-medium text-fg">
          Y·P
        </a>
        <div className="flex items-center gap-5 sm:gap-7">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="link-slide hidden text-muted transition-colors hover:text-fg sm:inline">
              {l.label}
            </a>
          ))}
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
