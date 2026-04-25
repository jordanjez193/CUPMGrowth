import { useState } from 'react'

type WhyId = 'busy' | 'foodie' | 'spending' | 'health'
type Step = 'why' | 'reinforce' | 'location' | 'location-confirm' | 'name' | 'meals' | 'email'

export type OnboardingData = {
  why: WhyId
  zip: string
  name: string
  meals: number
  email: string
}

const STEP_ORDER: Step[] = ['why', 'reinforce', 'location', 'location-confirm', 'name', 'meals', 'email']

const WHY_OPTIONS: { id: WhyId; label: string }[] = [
  { id: 'busy',     label: "I'm busy and don't always have time to cook" },
  { id: 'foodie',   label: 'I really enjoy food and am looking for chef-curated meals at home' },
  { id: 'spending', label: 'I spend too much eating out' },
  { id: 'health',   label: "I want to make sure I'm eating right" },
]

const REINFORCE: Record<WhyId, { headline: string; body: string; stat: string }> = {
  busy: {
    headline: 'Get your time back.',
    body: 'CookUnity meals are ready in under 2 minutes — no shopping, no prep, no cleanup. Our subscribers reclaim an average of 6 hours every week, and still eat better than ever.',
    stat: '6 hrs saved per week on average',
  },
  foodie: {
    headline: "This is chef's table, delivered.",
    body: 'CookUnity partners with 100+ award-winning chefs — James Beard nominees, Michelin-starred veterans, Top Chef alumni — rotating 400+ dishes every week. This isn\'t meal prep. This is dining.',
    stat: '100+ world-class chefs on the platform',
  },
  spending: {
    headline: 'Restaurant quality. Fraction of the price.',
    body: 'The average CookUnity meal costs less than $13 — far less than delivery apps or dining out. Same chef-crafted quality, prepared in professional kitchens and delivered fresh to your door.',
    stat: 'Under $13 per meal on average',
  },
  health: {
    headline: 'Eat well without the guesswork.',
    body: 'Every dish comes with full nutrition transparency and is designed by professional chefs. Filter by keto, plant-based, high-protein, or gluten-free — and know exactly what you\'re fueling with.',
    stat: 'Full macros on every single dish',
  },
}

function getKitchenInfo(zip: string): { kitchen: string; days: string } {
  const n = parseInt(zip.slice(0, 2))
  if (n >= 10 && n <= 14) return { kitchen: 'our Brooklyn kitchen', days: '1–2' }
  if (n >= 90 && n <= 96) return { kitchen: 'our Los Angeles kitchen', days: '1–2' }
  if (n >= 33 && n <= 34) return { kitchen: 'our Miami kitchen', days: '1–2' }
  if (n >= 60 && n <= 62) return { kitchen: 'our Chicago kitchen', days: '1–2' }
  if (n >= 78 && n <= 79) return { kitchen: 'our Texas kitchen', days: '2–3' }
  return { kitchen: 'our nearest production kitchen', days: '2–3' }
}

function getMealMessage(n: number): { text: string; highlight: boolean } {
  if (n <= 5) return { text: 'A great start. Your meals stay fresh for up to 5 days refrigerated — easy to fit into any schedule.', highlight: false }
  if (n <= 7) return { text: 'A popular choice. Enough variety to keep things interesting without over-committing. You can adjust anytime.', highlight: false }
  if (n <= 10) return { text: `The sweet spot. Our meals stay fresh for up to 5 days, and most CookUnity subscribers choose 8–10 to keep variety through the week.`, highlight: true }
  return { text: 'Going all in. Our most dedicated subscribers love having a CookUnity meal ready for any occasion. Every dish stays fresh for up to 5 days.', highlight: false }
}

export function OnboardingFlow({ onComplete }: { onComplete: (d: OnboardingData) => void }) {
  const [step, setStep] = useState<Step>('why')
  const [why, setWhy] = useState<WhyId | null>(null)
  const [selectedWhy, setSelectedWhy] = useState<WhyId | null>(null)
  const [zip, setZip] = useState('')
  const [name, setName] = useState('')
  const [meals, setMeals] = useState<number | null>(null)
  const [email, setEmail] = useState('')
  const [visible, setVisible] = useState(true)

  const stepIdx = STEP_ORDER.indexOf(step)
  const progress = (stepIdx + 1) / STEP_ORDER.length

  const go = (next: Step) => {
    setVisible(false)
    setTimeout(() => { setStep(next); setVisible(true) }, 180)
  }

  const goBack = () => {
    if (stepIdx > 0) go(STEP_ORDER[stepIdx - 1])
  }

  const handleWhySelect = (id: WhyId) => {
    setSelectedWhy(id)
    setWhy(id)
    setTimeout(() => go('reinforce'), 380)
  }

  const kitchenInfo = zip.length === 5 ? getKitchenInfo(zip) : null
  const mealMsg = meals !== null ? getMealMessage(meals) : null
  const firstName = name.trim().split(' ')[0]

  return (
    <div className="min-h-screen bg-white flex flex-col" style={{ maxWidth: 520, margin: '0 auto' }}>
      {/* Progress */}
      <div className="h-[3px] bg-gray-100 shrink-0">
        <div
          className="h-full bg-[#FFD333] transition-all duration-500 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* Nav bar */}
      <div className="flex items-center justify-between px-6 py-4 shrink-0">
        <img
          src="https://www.cookunity.com/assets/icons/cu-logo.svg"
          alt="CookUnity"
          className="h-6 w-auto"
          onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
        />
        {stepIdx > 0 && (
          <button onClick={goBack} className="text-sm text-gray-400 font-medium hover:text-gray-600">
            ← Back
          </button>
        )}
      </div>

      {/* Screen */}
      <div
        className="flex-1 flex flex-col px-6 pb-10"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(12px)',
          transition: 'opacity 0.18s ease, transform 0.18s ease',
        }}
      >

        {/* WHY */}
        {step === 'why' && (
          <div className="flex flex-col flex-1">
            <div className="mt-6 mb-7">
              <h1 className="text-[28px] font-bold text-[#0F1115] leading-tight mb-2">
                What brings you to CookUnity?
              </h1>
              <p className="text-gray-400 text-sm">We'll personalize your experience.</p>
            </div>
            <div className="space-y-3">
              {WHY_OPTIONS.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => handleWhySelect(opt.id)}
                  className={`w-full text-left px-4 py-4 rounded-2xl border-2 transition-all duration-150 ${
                    selectedWhy === opt.id
                      ? 'border-[#FFD333] bg-[#FFFBEA]'
                      : 'border-gray-100 bg-white hover:border-gray-200'
                  }`}
                >
                  <span className="font-medium text-[#0F1115] text-[15px] leading-snug">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* REINFORCE */}
        {step === 'reinforce' && why && (() => {
          const r = REINFORCE[why]
          return (
            <div className="flex flex-col flex-1 justify-between">
              <div className="mt-8">
                <span className="inline-block bg-[#FFFBEA] text-[#0F1115] text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6">
                  {r.stat}
                </span>
                <h1
                  className="text-[38px] font-bold text-[#0F1115] leading-tight mb-5"
                  style={{ fontFamily: "'DM Serif Display', serif" }}
                >
                  {r.headline}
                </h1>
                <p className="text-gray-500 text-[16px] leading-relaxed">{r.body}</p>
              </div>
              <button
                onClick={() => go('location')}
                className="w-full py-4 rounded-2xl bg-[#0F1115] text-white font-bold text-base mt-8"
              >
                Continue →
              </button>
            </div>
          )
        })()}

        {/* LOCATION */}
        {step === 'location' && (
          <div className="flex flex-col flex-1 justify-between">
            <div className="mt-6">
              <h1 className="text-[28px] font-bold text-[#0F1115] leading-tight mb-2">
                Where do we deliver to you?
              </h1>
              <p className="text-gray-400 text-sm mb-10">Enter your zip code to confirm availability.</p>
              <input
                type="tel"
                inputMode="numeric"
                maxLength={5}
                placeholder="10001"
                value={zip}
                onChange={e => setZip(e.target.value.replace(/\D/g, '').slice(0, 5))}
                className="w-full text-[52px] font-bold text-center text-[#0F1115] tracking-[0.2em] border-b-2 border-gray-200 focus:border-[#FFD333] outline-none py-2 bg-transparent transition-colors placeholder:text-gray-200"
                autoFocus
              />
              {zip.length === 5 && (
                <p className="text-center text-sm text-[#22C55E] font-semibold mt-4">
                  ✓ &nbsp;We deliver to {zip}
                </p>
              )}
            </div>
            <button
              onClick={() => go('location-confirm')}
              disabled={zip.length < 5}
              className={`w-full py-4 rounded-2xl font-bold text-base mt-8 transition-all ${
                zip.length === 5
                  ? 'bg-[#FFD333] text-[#0F1115]'
                  : 'bg-gray-100 text-gray-300 cursor-not-allowed'
              }`}
            >
              Continue
            </button>
          </div>
        )}

        {/* LOCATION CONFIRM */}
        {step === 'location-confirm' && kitchenInfo && (
          <div className="flex flex-col flex-1 justify-between">
            <div className="mt-8">
              <div className="w-14 h-14 rounded-2xl bg-[#FFFBEA] flex items-center justify-center text-2xl mb-6">
                🚚
              </div>
              <h1 className="text-[28px] font-bold text-[#0F1115] leading-tight mb-4">
                Great news — we deliver to {zip}.
              </h1>
              <p className="text-gray-500 text-[16px] leading-relaxed mb-4">
                Your meals are prepared fresh in {kitchenInfo.kitchen} and shipped
                refrigerated — <strong className="text-[#0F1115]">never frozen</strong>. Most
                orders arrive within {kitchenInfo.days} days of being cooked.
              </p>
              <p className="text-gray-500 text-[16px] leading-relaxed">
                Every box is packed with dry ice and insulated liners so your meals stay in
                perfect condition. Once refrigerated, they stay fresh for up to 5 days.
              </p>
            </div>
            <button
              onClick={() => go('name')}
              className="w-full py-4 rounded-2xl bg-[#FFD333] text-[#0F1115] font-bold text-base mt-8"
            >
              Continue
            </button>
          </div>
        )}

        {/* NAME */}
        {step === 'name' && (
          <div className="flex flex-col flex-1 justify-between">
            <div className="mt-6">
              <h1 className="text-[28px] font-bold text-[#0F1115] leading-tight mb-2">
                What should we call you?
              </h1>
              <p className="text-gray-400 text-sm mb-10">We'd love to make this feel personal.</p>
              <input
                type="text"
                placeholder="First name"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full text-[28px] font-bold text-[#0F1115] border-b-2 border-gray-200 focus:border-[#FFD333] outline-none py-2 bg-transparent transition-colors placeholder:text-gray-200 placeholder:font-normal"
                autoFocus
              />
            </div>
            <button
              onClick={() => go('meals')}
              disabled={name.trim().length === 0}
              className={`w-full py-4 rounded-2xl font-bold text-base mt-8 transition-all ${
                name.trim().length > 0
                  ? 'bg-[#FFD333] text-[#0F1115]'
                  : 'bg-gray-100 text-gray-300 cursor-not-allowed'
              }`}
            >
              {name.trim() ? `Nice to meet you, ${firstName} →` : 'Continue'}
            </button>
          </div>
        )}

        {/* MEALS */}
        {step === 'meals' && (
          <div className="flex flex-col flex-1 justify-between">
            <div className="flex-1">
              <div className="mt-6 mb-7">
                <h1 className="text-[28px] font-bold text-[#0F1115] leading-tight mb-2">
                  How many meals a week?
                </h1>
                <p className="text-gray-400 text-sm">You can change this anytime.</p>
              </div>
              <div className="grid grid-cols-3 gap-2.5">
                {[4, 5, 6, 7, 8, 9, 10, 11, 12].map(n => (
                  <button
                    key={n}
                    onClick={() => setMeals(n)}
                    className={`py-[18px] rounded-2xl font-bold text-xl transition-all active:scale-95 ${
                      meals === n
                        ? 'bg-[#FFD333] text-[#0F1115] shadow-sm'
                        : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
              {mealMsg && (
                <div className={`mt-5 p-4 rounded-2xl transition-all ${mealMsg.highlight ? 'bg-[#FFFBEA] border border-[#FFD333]/30' : 'bg-gray-50'}`}>
                  {mealMsg.highlight && (
                    <p className="text-[11px] font-bold uppercase tracking-widest text-[#B8972C] mb-1">Most popular choice</p>
                  )}
                  <p className="text-sm text-gray-600 leading-relaxed">{mealMsg.text}</p>
                </div>
              )}
            </div>
            <button
              onClick={() => go('email')}
              disabled={meals === null}
              className={`w-full py-4 rounded-2xl font-bold text-base mt-6 transition-all ${
                meals !== null
                  ? 'bg-[#FFD333] text-[#0F1115]'
                  : 'bg-gray-100 text-gray-300 cursor-not-allowed'
              }`}
            >
              Continue
            </button>
          </div>
        )}

        {/* EMAIL */}
        {step === 'email' && (
          <div className="flex flex-col flex-1 justify-between">
            <div className="mt-6">
              <h1 className="text-[28px] font-bold text-[#0F1115] leading-tight mb-3">
                Before we show you the 400+ dishes available this week...
              </h1>
              <p className="text-gray-500 text-[15px] leading-relaxed mb-10">
                Can we grab your email to save your preferences and weekly menu?
              </p>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full text-xl font-medium text-[#0F1115] border-b-2 border-gray-200 focus:border-[#FFD333] outline-none py-2 bg-transparent transition-colors placeholder:text-gray-300 placeholder:font-normal"
                autoFocus
              />
            </div>
            <div className="mt-8 space-y-3">
              <button
                onClick={() => onComplete({ why: why!, zip, name, meals: meals ?? 8, email })}
                disabled={!email.includes('@') || !email.includes('.')}
                className={`w-full py-4 rounded-2xl font-bold text-base transition-all ${
                  email.includes('@') && email.includes('.')
                    ? 'bg-[#FFD333] text-[#0F1115]'
                    : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                }`}
              >
                Show me the menu →
              </button>
              <button
                onClick={() => onComplete({ why: why!, zip, name, meals: meals ?? 8, email: '' })}
                className="w-full py-3 text-sm text-gray-400 font-medium hover:text-gray-600"
              >
                Skip for now
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
