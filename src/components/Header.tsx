type Props = {
  step: number
  totalSteps: number
  selected: number
  target: number
}

export function Header({ step, totalSteps, selected, target }: Props) {
  const pct = Math.min(100, (selected / target) * 100)
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-cu-line">
<div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-6">
        <img
          src="https://www.cookunity.com/assets/icons/cu-logo.svg"
          alt="CookUnity"
          className="h-7 w-auto select-none"
          onError={e => {
            const el = e.currentTarget
            el.style.display = 'none'
            const fallback = el.nextElementSibling as HTMLElement | null
            if (fallback) fallback.style.display = 'block'
          }}
        />
        <div className="font-display text-2xl text-cu-ink select-none hidden">
          cook<span className="text-cu-yellow-deep">unity</span>
        </div>
        <div className="hidden md:flex items-center gap-2 text-sm text-cu-slate">
          <span className="font-medium text-cu-ink">Step {step}</span>
          <span>of {totalSteps}</span>
          <span className="mx-2">·</span>
          <span>Pick your chefs</span>
        </div>
        <div className="ml-auto flex items-center gap-4">
<div className="hidden sm:flex items-center gap-2">
            <div className="w-40 h-1.5 bg-cu-line rounded-full overflow-hidden">
              <div
                className="h-full bg-cu-yellow-deep transition-all"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="text-xs text-cu-slate tabular-nums">
              {selected}/{target}
            </span>
          </div>
          <button className="text-sm text-cu-slate hover:text-cu-ink">
            Save & exit
          </button>
        </div>
      </div>
    </header>
  )
}
