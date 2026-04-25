import { useState } from 'react'
import { CHEFS } from '../data/chefs'
import type { Meal, Chef } from '../data/chefs'

type Result = { meal: Meal; chef: Chef; score: number }

type Props = {
  cart: Record<string, number>
  cartFull: boolean
  onAdd: (id: string) => void
  onRemove: (id: string) => void
}

const KEYWORD_TERMS: Record<string, string[]> = {
  healthy:       ['grilled', 'salad', 'salmon', 'chicken', 'quinoa', 'kale', 'lemon', 'cod'],
  italian:       ['pasta', 'risotto', 'parmesan', 'bolognese', 'rigatoni', 'cacio', 'lasagna', 'truffle'],
  protein:       ['chicken', 'salmon', 'lamb', 'pork', 'burger', 'beef', 'steak', 'ribeye'],
  spicy:         ['curry', 'kimchi', 'jalapeño', 'jerk', 'chili', 'arrabiata', 'suya', 'mole', 'habanero'],
  comfort:       ['mac', 'pot', 'roast', 'meatball', 'burger', 'fried', 'gumbo', 'lasagna'],
  vegetarian:    ['salad', 'quinoa', 'mushroom', 'spinach', 'kale', 'cauliflower', 'eggplant', 'vegan'],
  asian:         ['bibimbap', 'kimchi', 'miso', 'fried rice', 'curry', 'japchae', 'yassa'],
  mediterranean: ['shawarma', 'tahini', 'za\'atar', 'levantine', 'couscous', 'pomegranate'],
  seafood:       ['salmon', 'shrimp', 'cod', 'mahi', 'paella', 'snapper', 'oyster'],
  latin:         ['mole', 'paella', 'plantain', 'tacos', 'brasa', 'chimichurri', 'peruvian', 'cuban'],
  african:       ['yassa', 'suya', 'oxtail', 'peanut', 'west african'],
}

function findTopMatches(query: string, count = 4): Result[] {
  const q = query.toLowerCase()
  const words = q.split(/\s+/).filter(w => w.length >= 3)

  const scored: Result[] = CHEFS.flatMap(chef =>
    chef.meals.map(meal => {
      const mealName = meal.name.toLowerCase()
      const cuisine = chef.cuisine.toLowerCase()
      let score = 0

      for (const word of words) {
        if (mealName.includes(word)) score += 4
        if (cuisine.includes(word)) score += 2
        for (const [, terms] of Object.entries(KEYWORD_TERMS)) {
          const categoryMatch = terms.some(t => word.includes(t) || t.includes(word))
          if (categoryMatch && terms.some(t => mealName.includes(t))) score += 1
        }
      }

      return { meal, chef, score }
    })
  )

  // Sort by score, then dedupe to max 1 per chef for variety
  scored.sort((a, b) => b.score - a.score)

  const seen = new Set<string>()
  const results: Result[] = []

  for (const r of scored) {
    if (results.length >= count) break
    if (!seen.has(r.chef.id)) {
      seen.add(r.chef.id)
      results.push(r)
    }
  }

  // If we didn't get enough unique chefs, pad with remaining (may repeat chefs)
  if (results.length < count) {
    for (const r of scored) {
      if (results.length >= count) break
      if (!results.includes(r)) results.push(r)
    }
  }

  // If no signal at all, return top-rated meals from different chefs
  if (results.every(r => r.score === 0)) {
    return CHEFS.slice(0, count).map(chef => ({ meal: chef.meals[0], chef, score: 0 }))
  }

  return results
}

const MATCH_LABELS = ['Perfect match', 'Great pick', 'You\'ll love this', 'Worth trying']

const EXAMPLES = [
  'healthy Italian with protein',
  'spicy Asian comfort food',
  'light seafood for summer',
  'hearty Latin American',
]

export function MoodSearch({ cart, cartFull, onAdd, onRemove }: Props) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Result[]>([])
  const [loading, setLoading] = useState(false)
  const [exampleIdx] = useState(() => Math.floor(Math.random() * EXAMPLES.length))

  const handleSearch = (q = query) => {
    if (!q.trim()) return
    setLoading(true)
    setResults([])
    setTimeout(() => {
      setResults(findTopMatches(q, 4))
      setLoading(false)
    }, 700)
  }

  return (
    <div className="rounded-3xl bg-cu-ink px-6 py-8 md:px-10 md:py-10 mb-6 md:mb-8">
      <div className="max-w-xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 text-cu-yellow text-xs font-semibold uppercase tracking-widest mb-3">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l1.5 4.5H18l-3.75 2.7 1.5 4.5L12 11.1 8.25 13.7l1.5-4.5L6 6.5h4.5L12 2z"/>
          </svg>
          AI Suggestion
        </div>
        <h2 className="font-display text-2xl md:text-3xl text-white leading-snug">
          What are you in the mood for?
        </h2>
        <p className="text-white/50 text-sm mt-2 mb-6">
          Describe a craving and we'll find your perfect dishes
        </p>

        <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-2xl px-4 py-3 focus-within:border-cu-yellow/60 transition-colors">
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
            placeholder={`Try: "${EXAMPLES[exampleIdx]}"`}
            className="flex-1 text-sm text-white placeholder-white/30 bg-transparent outline-none"
          />
          <button
            onClick={() => handleSearch()}
            disabled={!query.trim() || loading}
            className="shrink-0 px-4 py-1.5 bg-cu-yellow rounded-xl text-xs font-bold text-cu-ink hover:bg-cu-yellow-deep transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? '...' : 'Find'}
          </button>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mt-3">
          {EXAMPLES.map(ex => (
            <button
              key={ex}
              onClick={() => { setQuery(ex); handleSearch(ex) }}
              className="text-xs text-white/40 hover:text-white/80 border border-white/10 hover:border-white/30 rounded-full px-3 py-1 transition-all"
            >
              {ex}
            </button>
          ))}
        </div>
      </div>

      {results.length > 0 && !loading && (
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
          {results.map((r, i) => (
            <div
              key={r.meal.id}
              className="bg-white/10 rounded-2xl border border-white/15 overflow-hidden hover:border-cu-yellow/40 transition-colors"
            >
              <div className="relative aspect-[4/3]">
                <img
                  src={r.meal.image}
                  alt={r.meal.name}
                  className="w-full h-full object-cover"
                />
                {i === 0 && (
                  <span className="absolute top-2 left-2 text-[10px] font-bold text-cu-ink bg-cu-yellow px-2 py-0.5 rounded-full">
                    Top pick
                  </span>
                )}
              </div>
              <div className="p-3">
                <div className="text-[10px] uppercase tracking-wider text-cu-yellow/60 font-semibold">
                  {r.chef.cuisine}
                </div>
                <div className="text-xs font-semibold text-white leading-snug mt-0.5 line-clamp-2">
                  {r.meal.name}
                </div>
                <div className="text-[10px] text-white/40 mt-1">by {r.chef.name}</div>
                <div className="mt-2.5 flex items-center justify-between">
                  <span className="text-[10px] text-white/40 italic">
                    {MATCH_LABELS[i % MATCH_LABELS.length]}
                  </span>
                  {(() => {
                    const qty = cart[r.meal.id] ?? 0
                    return qty > 0 ? (
                      <div className="flex items-center bg-white/10 rounded-full overflow-hidden">
                        <button
                          onClick={() => onRemove(r.meal.id)}
                          className="w-6 h-6 flex items-center justify-center text-white hover:bg-white/10"
                        >
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                            <path d="M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                          </svg>
                        </button>
                        <span className="text-white text-xs font-bold tabular-nums px-0.5 min-w-[1rem] text-center">
                          {qty}
                        </span>
                        <button
                          onClick={() => onAdd(r.meal.id)}
                          disabled={cartFull}
                          className="w-6 h-6 flex items-center justify-center text-cu-yellow hover:bg-white/10 disabled:opacity-40"
                        >
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => onAdd(r.meal.id)}
                        disabled={cartFull}
                        className="w-6 h-6 rounded-full bg-cu-yellow text-cu-ink flex items-center justify-center hover:bg-cu-yellow-deep transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                          <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                        </svg>
                      </button>
                    )
                  })()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
