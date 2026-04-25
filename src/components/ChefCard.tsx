import { useEffect, useRef, useState } from 'react'
import type { Chef } from '../data/chefs'
import { MealCard } from './MealCard'

type Props = {
  chef: Chef
  cart: Record<string, number>
  cartFull: boolean
  orderBoost?: number
  onAdd: (id: string) => void
  onRemove: (id: string) => void
  onMeetChef: (chef: Chef) => void
}

const fmt = (n: number) => n.toLocaleString()

export function ChefCard({ chef, cart, cartFull, orderBoost = 0, onAdd, onRemove, onMeetChef }: Props) {
  const totalOrders = chef.ordersLast30Days + orderBoost
  const [animating, setAnimating] = useState(false)
  const prevOrders = useRef(totalOrders)

  useEffect(() => {
    if (totalOrders !== prevOrders.current) {
      prevOrders.current = totalOrders
      setAnimating(false)
      // Flush, then re-apply so animation restarts
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimating(true))
      })
      const t = setTimeout(() => setAnimating(false), 1500)
      return () => clearTimeout(t)
    }
  }, [totalOrders])

  return (
    <section className="bg-white rounded-3xl border border-cu-line shadow-card p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-start gap-5 md:gap-6">
        <div className="flex items-center gap-4 md:gap-5 md:flex-1">
          <img
            src={chef.photo}
            alt={chef.name}
            className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover bg-cu-paper border border-cu-line shrink-0"
          />
          <div className="min-w-0">
            <div className="text-xs uppercase tracking-wider text-cu-slate font-semibold">
              {chef.cuisine}
            </div>
            <div className="flex items-center gap-2.5 flex-wrap mt-0.5">
              <h2 className="font-display text-2xl md:text-3xl text-cu-ink leading-tight">
                {chef.name}
              </h2>
              <button
                onClick={() => onMeetChef(chef)}
                className="flex items-center gap-1 text-xs font-semibold text-cu-ink bg-cu-yellow hover:bg-cu-yellow-deep rounded-full px-3 py-1 transition-all shrink-0"
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5"/>
                  <path d="M10 8l6 4-6 4V8z" fill="currentColor"/>
                </svg>
                Meet {chef.name.split(' ')[0]}
              </button>
            </div>
            <p className="text-sm text-cu-slate mt-1.5 max-w-xl line-clamp-2">
              {chef.bio}
            </p>
          </div>
        </div>

        <div className="flex md:flex-col md:items-end gap-4 md:gap-1.5 md:text-right">
          <Stat
            label="Rating"
            value={
              <span className="inline-flex items-center gap-1">
                <svg width="14" height="14" viewBox="0 0 24 24" className="text-cu-yellow-deep" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                {chef.rating.toFixed(1)}
                <span className="text-cu-slate font-normal">({fmt(chef.reviews)})</span>
              </span>
            }
          />
          <Stat
            label="Ordered (30d)"
            value={
              <span className={animating ? 'animate-count-pop inline-block' : 'inline-block'}>
                {fmt(totalOrders)} meals
              </span>
            }
          />
        </div>
      </div>

      {chef.awards.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {chef.awards.map(a => (
            <span
              key={a}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-cu-ink bg-cu-paper border border-cu-line rounded-full px-3 py-1.5"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-cu-yellow-deep">
                <path d="M8 21h8M12 17v4M7 4h10v3a5 5 0 01-10 0V4zM5 4H3v2a4 4 0 004 4M19 4h2v2a4 4 0 01-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {a}
            </span>
          ))}
        </div>
      )}

      <div className="mt-6 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-cu-ink uppercase tracking-wider">
          Featured meals
        </h3>
        <button className="text-sm text-cu-slate hover:text-cu-ink">
          See all from {chef.name.split(' ')[0]} →
        </button>
      </div>

      <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
        {chef.meals.map(meal => (
          <MealCard
            key={meal.id}
            meal={meal}
            quantity={cart[meal.id] ?? 0}
            disabled={cartFull && !(cart[meal.id] > 0)}
            onAdd={() => onAdd(meal.id)}
            onRemove={() => onRemove(meal.id)}
          />
        ))}
      </div>
    </section>
  )
}

function Stat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="text-sm">
      <div className="text-[11px] uppercase tracking-wider text-cu-slate font-semibold">
        {label}
      </div>
      <div className="text-cu-ink font-semibold">{value}</div>
    </div>
  )
}
