import { useState } from 'react'
import { findMealById } from '../data/chefs'

type Props = {
  cart: Record<string, number>
  target: number
  onRemove: (id: string) => void
  onContinue: () => void
}

export function StickyCart({ cart, target, onRemove, onContinue }: Props) {
  const [open, setOpen] = useState(false)

  const entries = Object.entries(cart).filter(([, qty]) => qty > 0)
  const totalCount = entries.reduce((s, [, qty]) => s + qty, 0)
  const remaining = Math.max(0, target - totalCount)
  const pct = Math.min(100, (totalCount / target) * 100)
  const ready = totalCount >= target

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 shadow-bar">
      {open && (
        <div className="bg-white border-t border-cu-line max-h-[55vh] overflow-y-auto">
          <div className="max-w-7xl mx-auto px-6 py-5">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-semibold text-cu-ink">
                Your picks ({totalCount})
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-sm text-cu-slate hover:text-cu-ink"
              >
                Hide
              </button>
            </div>
            {entries.length === 0 ? (
              <div className="text-sm text-cu-slate py-6 text-center">
                No meals selected yet — tap the + on any meal to start.
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {entries.map(([id, qty]) => {
                  const found = findMealById(id)
                  if (!found) return null
                  const { meal, chef } = found
                  return (
                    <div
                      key={id}
                      className="flex gap-3 p-2 rounded-xl border border-cu-line hover:border-cu-ink/30"
                    >
                      <div className="relative shrink-0">
                        <img
                          src={meal.image}
                          alt=""
                          className="w-14 h-14 rounded-lg object-cover"
                        />
                        {qty > 1 && (
                          <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-cu-yellow text-cu-ink text-[10px] font-bold flex items-center justify-center">
                            {qty}
                          </span>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs text-cu-slate truncate">{chef.name}</div>
                        <div className="text-sm font-medium text-cu-ink leading-tight line-clamp-2">
                          {meal.name}
                        </div>
                      </div>
                      <button
                        onClick={() => onRemove(id)}
                        aria-label="Remove"
                        className="self-start w-6 h-6 rounded-full text-cu-slate hover:text-cu-ink hover:bg-cu-paper flex items-center justify-center"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                          <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                        </svg>
                      </button>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="bg-cu-ink text-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4 md:gap-6">
          <button
            onClick={() => setOpen(o => !o)}
            className="flex items-center gap-3 text-left hover:opacity-90"
          >
            <div className="w-12 h-12 rounded-full bg-cu-yellow text-cu-ink flex items-center justify-center font-bold text-lg shrink-0 tabular-nums">
              {totalCount}
            </div>
            <div>
              <div className="text-sm font-semibold leading-tight">
                {ready
                  ? "You're all set!"
                  : `${remaining} more meal${remaining === 1 ? '' : 's'} to go`}
              </div>
              <div className="text-xs text-white/70 mt-0.5">
                {totalCount} of {target} selected
                <span className="ml-2 underline underline-offset-2">
                  {open ? 'hide picks' : 'view picks'}
                </span>
              </div>
            </div>
          </button>

          <div className="hidden md:block flex-1 max-w-md">
            <div className="h-2 bg-white/15 rounded-full overflow-hidden">
              <div
                className="h-full bg-cu-yellow transition-all"
                style={{ width: `${pct}%` }}
              />
            </div>
            <div className="mt-1.5 flex justify-between text-[10px] text-white/60">
              <span>0</span>
              <span>{target}</span>
            </div>
          </div>

          <button
            onClick={onContinue}
            disabled={!ready}
            className={`ml-auto px-5 md:px-7 py-3 rounded-full font-semibold text-sm transition-all ${
              ready
                ? 'bg-cu-yellow text-cu-ink hover:bg-cu-yellow-deep'
                : 'bg-white/10 text-white/40 cursor-not-allowed'
            }`}
          >
            Continue {ready && '→'}
          </button>
        </div>
      </div>
    </div>
  )
}
