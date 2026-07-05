"use client"

import { useEffect, useRef, useState } from "react"
import type { ProjectArchitecture } from "@/data/architecture"

export function ArchitectureDiagram({ arch }: { arch: ProjectArchitecture }) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true)
            observer.disconnect()
          }
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="rounded-lg border border-line bg-surface p-5 sm:p-7">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">System architecture</p>
        <p className="font-mono text-[11px] text-accent">{arch.pattern}</p>
      </div>

      <div className="flow-root">
        {arch.layers.map((layer, i) => (
          <div key={layer.tier}>
            <div
              className="grid gap-3 sm:grid-cols-[110px,1fr] sm:gap-5"
              style={{
                opacity: shown ? 1 : 0,
                transform: shown ? "none" : "translateY(12px)",
                transition: "opacity 0.5s ease, transform 0.5s ease",
                transitionDelay: `${i * 90}ms`,
              }}
            >
              <div className="flex items-center">
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">{layer.tier}</span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {layer.nodes.map((node) => (
                  <div
                    key={node.label}
                    className={`group rounded-md border px-3.5 py-2.5 transition-all duration-200 hover:-translate-y-0.5 ${
                      node.accent
                        ? "border-accent/60 bg-accent/10"
                        : "border-line bg-bg hover:border-accent/50"
                    }`}
                  >
                    <p className={`text-sm leading-tight ${node.accent ? "text-fg" : "text-fg"}`}>{node.label}</p>
                    {node.note && <p className="mt-1 font-mono text-[11px] leading-snug text-muted">{node.note}</p>}
                  </div>
                ))}
              </div>
            </div>

            {i < arch.layers.length - 1 && (
              <div
                className="sm:ml-[110px]"
                style={{
                  opacity: shown ? 1 : 0,
                  transition: "opacity 0.5s ease",
                  transitionDelay: `${i * 90 + 45}ms`,
                }}
                aria-hidden
              >
                <div className="my-2 flex items-center gap-2 sm:pl-5">
                  <span className="h-3 w-px bg-line" />
                  <span className="font-mono text-[10px] text-line">▼</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
