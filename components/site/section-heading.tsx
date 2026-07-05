export function SectionHeading({ index, title, lede }: { index: string; title: string; lede?: string }) {
  return (
    <div className="mb-14 sm:mb-20">
      <p className="mb-4 font-mono text-xs tracking-[0.2em] text-accent">
        {index} <span className="text-muted">/</span>
      </p>
      <h2 className="font-display text-4xl leading-tight sm:text-5xl">{title}</h2>
      {lede && <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{lede}</p>}
    </div>
  )
}
