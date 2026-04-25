import type { Meal } from '../data/chefs'

type Props = {
  meal: Meal
  quantity: number
  disabled: boolean
  onAdd: () => void
  onRemove: () => void
}

const tagStyle = (tag?: string) => {
  switch (tag) {
    case 'Chef Pick':
      return 'bg-cu-plum text-white'
    case 'Selling Fast':
      return 'bg-cu-yellow text-cu-ink'
    case 'Premium':
      return 'bg-cu-ink text-cu-yellow'
    default:
      return 'bg-white text-cu-ink border border-cu-line'
  }
}

export function MealCard({ meal, quantity, disabled, onAdd, onRemove }: Props) {
  const selected = quantity > 0

  return (
    <div
      className={`group relative rounded-2xl overflow-hidden border bg-white transition-all ${
        selected
          ? 'border-cu-yellow-deep ring-2 ring-cu-yellow-deep/40 shadow-card'
          : 'border-cu-line hover:shadow-card'
      }`}
    >
      <div className="relative aspect-[4/3] bg-cu-paper">
        <img
          src={meal.image}
          alt={meal.name}
          loading="lazy"
          className="w-full h-full object-cover"
        />
        {meal.tag && (
          <span
            className={`absolute top-3 left-3 text-[11px] font-semibold px-2.5 py-1 rounded-full ${tagStyle(meal.tag)}`}
          >
            {meal.tag}
          </span>
        )}

        {/* Quantity stepper */}
        <div className="absolute top-3 right-3">
          {selected ? (
            <div className="flex items-center bg-cu-ink rounded-full shadow-sm overflow-hidden">
              <button
                onClick={onRemove}
                aria-label="Remove one"
                className="w-8 h-8 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </button>
              <span className="text-white text-xs font-bold tabular-nums px-0.5 min-w-[1.25rem] text-center">
                {quantity}
              </span>
              <button
                onClick={onAdd}
                disabled={disabled}
                aria-label="Add one more"
                className="w-8 h-8 flex items-center justify-center text-cu-yellow hover:bg-white/10 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          ) : (
            <button
              onClick={onAdd}
              disabled={disabled}
              aria-label="Add to picks"
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-sm ${
                disabled
                  ? 'bg-white/80 text-cu-line cursor-not-allowed'
                  : 'bg-white text-cu-ink hover:bg-cu-yellow hover:scale-105'
              }`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="p-3.5">
        <div className="text-sm font-semibold text-cu-ink leading-snug line-clamp-2 min-h-[2.5rem]">
          {meal.name}
        </div>
        <div className="mt-1 flex items-center gap-2 text-xs text-cu-slate">
          {meal.calories && <span>{meal.calories} cal</span>}
          {meal.protein && (
            <>
              <span>·</span>
              <span>{meal.protein}g protein</span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
