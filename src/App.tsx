import { useEffect, useState } from 'react'
import { Header } from './components/Header'
import { ChefCard } from './components/ChefCard'
import { StickyCart } from './components/StickyCart'
import { MoodSearch } from './components/MoodSearch'
import { ChefVideoPanel } from './components/ChefVideoPanel'
import { CHEFS } from './data/chefs'
import type { Chef } from './data/chefs'

const TARGET = 8
const INITIAL_CHEF_COUNT = 6
const AI_INTERSTITIAL_AFTER = 1

function App() {
  const [cart, setCart] = useState<Record<string, number>>({})
  const [chefsShown, setChefsShown] = useState(INITIAL_CHEF_COUNT)
  const [meetChef, setMeetChef] = useState<Chef | null>(null)
  const [liveBoosts, setLiveBoosts] = useState<Record<string, number>>({})

  // Increment a random chef's order count every 15s
  useEffect(() => {
    const tick = () => {
      const chef = CHEFS[Math.floor(Math.random() * CHEFS.length)]
      setLiveBoosts(prev => ({
        ...prev,
        [chef.id]: (prev[chef.id] ?? 0) + Math.floor(Math.random() * 3) + 1,
      }))
    }
    const id = setInterval(tick, 15000)
    return () => clearInterval(id)
  }, [])

  const totalSelected = Object.values(cart).reduce((s, n) => s + n, 0)
  const cartFull = totalSelected >= TARGET

  const addMeal = (id: string) => {
    setCart(prev => {
      const t = Object.values(prev).reduce((s, n) => s + n, 0)
      if (t >= TARGET) return prev
      return { ...prev, [id]: (prev[id] ?? 0) + 1 }
    })
  }

  const removeMeal = (id: string) => {
    setCart(prev => {
      const current = prev[id] ?? 0
      if (current <= 1) {
        const next = { ...prev }
        delete next[id]
        return next
      }
      return { ...prev, [id]: current - 1 }
    })
  }

  const removeAllOfMeal = (id: string) => {
    setCart(prev => {
      const next = { ...prev }
      delete next[id]
      return next
    })
  }

  const visibleChefs = CHEFS.slice(0, chefsShown)
  const remainingChefs = CHEFS.length - chefsShown

  return (
    <div className="min-h-screen bg-cu-paper pb-40">
      <Header step={3} totalSteps={5} selected={totalSelected} target={TARGET} />

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <div className="text-xs uppercase tracking-[0.2em] text-cu-slate font-semibold">
            Step 3 of 5
          </div>
          <h1 className="font-display text-4xl md:text-5xl text-cu-ink mt-2 leading-tight">
            Discover dishes from the world's best chefs
          </h1>

          {/* Social proof stats */}
          <div className="mt-5 flex items-center justify-center gap-6 md:gap-10">
            <ProofStat value="100+" label="World-class chefs" />
            <div className="w-px h-8 bg-cu-line" />
            <ProofStat value="400+" label="Rotating dishes" />
            <div className="w-px h-8 bg-cu-line" />
            <ProofStat value="2M+" label="Meals delivered" />
          </div>
          <p className="mt-3 text-xs text-cu-slate/60 text-center">
            Avg. 4.7★ · 8 picks from 400+ dishes —{' '}
            <span className="font-semibold text-cu-slate">over 1.2 billion</span> possible combinations
          </p>
        </div>

        <div className="space-y-6 md:space-y-8">
          {visibleChefs.flatMap((chef, i) => {
            const card = (
              <ChefCard
                key={chef.id}
                chef={chef}
                cart={cart}
                cartFull={cartFull}
                orderBoost={liveBoosts[chef.id] ?? 0}
                onAdd={addMeal}
                onRemove={removeMeal}
                onMeetChef={setMeetChef}
              />
            )
            return i === AI_INTERSTITIAL_AFTER
              ? [card, <MoodSearch key="mood-search" cart={cart} cartFull={cartFull} onAdd={addMeal} onRemove={removeMeal} />]
              : [card]
          })}
        </div>

        <div className="mt-10 flex flex-col items-center gap-4">
          <div className="flex items-center gap-3 flex-wrap justify-center">
            {remainingChefs > 0 && (
              <button
                onClick={() => setChefsShown(c => c + INITIAL_CHEF_COUNT)}
                className="px-7 py-3 rounded-full border-2 border-cu-ink text-cu-ink font-semibold text-sm hover:bg-cu-ink hover:text-cu-yellow transition-all"
              >
                Load {Math.min(INITIAL_CHEF_COUNT, remainingChefs)} more chef
                {remainingChefs === 1 ? '' : 's'}
              </button>
            )}
            <button className="px-7 py-3 rounded-full border-2 border-cu-line text-cu-slate font-semibold text-sm hover:border-cu-ink hover:text-cu-ink transition-all">
              See all dishes
            </button>
          </div>
        </div>
      </main>

      <StickyCart
        cart={cart}
        target={TARGET}
        onRemove={removeAllOfMeal}
        onContinue={() => alert(`Continuing with ${totalSelected} meals!`)}
      />

      <ChefVideoPanel chef={meetChef} onClose={() => setMeetChef(null)} />
    </div>
  )
}

function ProofStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="font-display text-2xl md:text-3xl text-cu-ink">{value}</div>
      <div className="text-xs text-cu-slate mt-0.5">{label}</div>
    </div>
  )
}

export default App
