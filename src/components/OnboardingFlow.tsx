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

const WHY_OPTIONS: { id: WhyId; label: string; icon: React.ReactNode }[] = [
  {
    id: 'busy',
    label: "I'm busy and don't always have time to cook",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'foodie',
    label: 'I really enjoy food and want chef-curated meals at home',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M18 2v6a3 3 0 01-3 3H9a3 3 0 01-3-3V2M12 11v10M8 22h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'spending',
    label: 'I spend too much eating out',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M2 10h20" stroke="currentColor" strokeWidth="1.8"/>
      </svg>
    ),
  },
  {
    id: 'health',
    label: "I want to make sure I'm eating right",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M12 22c-4.5-3-9-6.5-9-12a6 6 0 0112 0 6 6 0 0112 0c0 5.5-4.5 9-9 12z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
]

const REINFORCE: Record<WhyId, { headline: string; body: string; stat: string }> = {
  busy: {
    headline: 'Get your\ntime back.',
    body: 'CookUnity meals are ready in under 2 minutes — no shopping, no prep, no cleanup. Our subscribers reclaim an average of 6 hours every week and still eat better than ever.',
    stat: '6 hours saved per week on average',
  },
  foodie: {
    headline: "Chef's table,\ndelivered.",
    body: 'CookUnity partners with 100+ award-winning chefs — James Beard nominees, Michelin veterans, Top Chef alumni — rotating 400+ dishes every week. This isn\'t meal prep. This is dining.',
    stat: '100+ world-class chefs on the platform',
  },
  spending: {
    headline: 'Restaurant quality.\nFraction of the price.',
    body: 'The average CookUnity meal costs less than $13 — far less than delivery apps or dining out. Same chef-crafted quality, prepared in professional kitchens and delivered fresh to your door.',
    stat: 'Under $13 per meal on average',
  },
  health: {
    headline: 'Eat well without\nthe guesswork.',
    body: 'Every dish comes with full nutrition transparency and is crafted by professional chefs. Filter by keto, plant-based, high-protein, or gluten-free — and know exactly what you\'re fueling with.',
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
  if (n <= 5)  return { text: 'A great start. Your meals stay fresh for up to 5 days — easy to work into any schedule.', highlight: false }
  if (n <= 7)  return { text: 'A popular choice. Enough variety to keep things interesting without over-committing. Adjust anytime.', highlight: false }
  if (n <= 10) return { text: 'The sweet spot. Our meals stay fresh for up to 5 days, and most CookUnity subscribers choose 8–10 to keep variety through the week.', highlight: true }
  return { text: 'Going all in. Our most dedicated subscribers love having a CookUnity meal ready for any occasion. Every dish stays fresh for up to 5 days.', highlight: false }
}

export function OnboardingFlow({ onComplete }: { onComplete: (d: OnboardingData) => void }) {
  const [step, setStep]           = useState<Step>('why')
  const [why, setWhy]             = useState<WhyId | null>(null)
  const [selectedWhy, setSelectedWhy] = useState<WhyId | null>(null)
  const [zip, setZip]             = useState('')
  const [name, setName]           = useState('')
  const [meals, setMeals]         = useState<number | null>(null)
  const [email, setEmail]         = useState('')
  const [anim, setAnim]           = useState<'in' | 'out'>('in')

  const stepIdx  = STEP_ORDER.indexOf(step)
  const progress = (stepIdx + 1) / STEP_ORDER.length
  const kitchenInfo = zip.length === 5 ? getKitchenInfo(zip) : null
  const mealMsg     = meals !== null ? getMealMessage(meals) : null
  const firstName   = name.trim().split(' ')[0]

  const go = (next: Step) => {
    setAnim('out')
    setTimeout(() => { setStep(next); setAnim('in') }, 160)
  }

  const goBack = () => {
    if (stepIdx > 0) go(STEP_ORDER[stepIdx - 1])
  }

  const handleWhySelect = (id: WhyId) => {
    setSelectedWhy(id)
    setWhy(id)
    setTimeout(() => go('reinforce'), 420)
  }

  // Reinforce screen is dark — flag it
  const isDark = step === 'reinforce'

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${isDark ? 'bg-cu-ink' : 'bg-cu-paper'}`}>
      {/* Progress bar */}
      <div className={`h-[3px] shrink-0 ${isDark ? 'bg-white/10' : 'bg-cu-line'}`}>
        <div
          className="h-full bg-cu-yellow transition-all duration-500 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* Nav */}
      <div className="max-w-lg mx-auto w-full flex items-center justify-between px-6 py-4 shrink-0">
        <img
          src="https://www.cookunity.com/assets/icons/cu-logo.svg"
          alt="CookUnity"
          className={`h-6 w-auto transition-all ${isDark ? 'brightness-0 invert' : ''}`}
          onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
        />
        {stepIdx > 0 && (
          <button
            onClick={goBack}
            className={`text-sm font-medium transition-colors ${isDark ? 'text-white/50 hover:text-white' : 'text-cu-slate hover:text-cu-ink'}`}
          >
            ← Back
          </button>
        )}
      </div>

      {/* Screen content */}
      <div className="flex-1 flex flex-col max-w-lg mx-auto w-full px-6 pb-10">
        <div
          key={step}
          className={`flex-1 flex flex-col ${anim === 'in' ? 'animate-onboard-in' : 'animate-onboard-out'}`}
        >

          {/* ── WHY ── */}
          {step === 'why' && (
            <div className="flex flex-col flex-1">
              <div className="mt-6 mb-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cu-slate mb-3">
                  Step 1 of 7
                </p>
                <h1 className="font-display text-[38px] text-cu-ink leading-tight">
                  What brings you to CookUnity?
                </h1>
                <p className="text-cu-slate text-sm mt-2">We'll personalize your experience.</p>
              </div>

              <div className="space-y-2.5 flex-1">
                {WHY_OPTIONS.map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => handleWhySelect(opt.id)}
                    className={`w-full text-left px-4 py-4 rounded-2xl border-2 flex items-center gap-4 transition-all duration-150 active:scale-[0.98] ${
                      selectedWhy === opt.id
                        ? 'border-cu-yellow bg-cu-yellow/10'
                        : 'border-cu-line bg-white hover:border-cu-slate/40 hover:shadow-sm'
                    }`}
                  >
                    <span className={`shrink-0 transition-colors ${selectedWhy === opt.id ? 'text-cu-ink' : 'text-cu-slate'}`}>
                      {opt.icon}
                    </span>
                    <span className={`font-medium text-[14px] leading-snug transition-colors ${selectedWhy === opt.id ? 'text-cu-ink' : 'text-cu-slate'}`}>
                      {opt.label}
                    </span>
                    {selectedWhy === opt.id && (
                      <span className="ml-auto shrink-0 w-5 h-5 rounded-full bg-cu-yellow flex items-center justify-center animate-pop-in">
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4l3 3 5-6" stroke="#0F1115" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── REINFORCE ── */}
          {step === 'reinforce' && why && (() => {
            const r = REINFORCE[why]
            return (
              <div className="flex flex-col flex-1 justify-between py-4">
                <div>
                  <span className="inline-flex items-center gap-2 bg-cu-yellow text-cu-ink text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-8">
                    {r.stat}
                  </span>
                  <h1 className="font-display text-white leading-tight mb-6" style={{ fontSize: 'clamp(40px, 9vw, 56px)', whiteSpace: 'pre-line' }}>
                    {r.headline}
                  </h1>
                  <p className="text-white/60 text-[16px] leading-relaxed">
                    {r.body}
                  </p>
                </div>
                <button
                  onClick={() => go('location')}
                  className="w-full py-4 rounded-2xl bg-white text-cu-ink font-bold text-base mt-10 hover:bg-cu-yellow transition-colors"
                >
                  Continue →
                </button>
              </div>
            )
          })()}

          {/* ── LOCATION ── */}
          {step === 'location' && (
            <div className="flex flex-col flex-1 justify-between">
              <div className="mt-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cu-slate mb-3">Step 3 of 7</p>
                <h1 className="font-display text-[38px] text-cu-ink leading-tight mb-2">
                  Where do we deliver to you?
                </h1>
                <p className="text-cu-slate text-sm mb-12">Enter your zip code to confirm delivery.</p>
                <div className="relative">
                  <input
                    type="tel"
                    inputMode="numeric"
                    maxLength={5}
                    placeholder="10001"
                    value={zip}
                    onChange={e => setZip(e.target.value.replace(/\D/g, '').slice(0, 5))}
                    className="w-full text-[52px] font-bold text-center text-cu-ink tracking-[0.25em] border-b-2 border-cu-line focus:border-cu-ink outline-none py-2 bg-transparent transition-colors placeholder:text-cu-line"
                    autoFocus
                  />
                </div>
                {zip.length === 5 && (
                  <p className="text-center text-[13px] text-cu-green font-semibold mt-5 animate-pop-in">
                    ✓ &nbsp;We deliver to {zip}
                  </p>
                )}
              </div>
              <button
                onClick={() => go('location-confirm')}
                disabled={zip.length < 5}
                className={`w-full py-4 rounded-2xl font-bold text-base mt-8 transition-all ${
                  zip.length === 5
                    ? 'bg-cu-yellow text-cu-ink hover:bg-cu-yellow-deep'
                    : 'bg-cu-line text-cu-slate cursor-not-allowed'
                }`}
              >
                Continue
              </button>
            </div>
          )}

          {/* ── LOCATION CONFIRM ── */}
          {step === 'location-confirm' && kitchenInfo && (
            <div className="flex flex-col flex-1 justify-between">
              <div className="mt-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cu-slate mb-8">Step 4 of 7</p>
                <div className="w-12 h-12 rounded-2xl bg-cu-green/10 border border-cu-green/20 flex items-center justify-center mb-6">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M20 7L9 18l-5-5" stroke="#1F7A4D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h1 className="font-display text-[34px] text-cu-ink leading-tight mb-5">
                  Great news — we deliver to {zip}.
                </h1>
                <p className="text-cu-slate text-[15px] leading-relaxed mb-4">
                  Your meals are prepared fresh in {kitchenInfo.kitchen} and shipped
                  refrigerated — <strong className="text-cu-ink font-semibold">never frozen</strong>. Most
                  orders arrive within {kitchenInfo.days} days of being cooked.
                </p>
                <p className="text-cu-slate text-[15px] leading-relaxed">
                  Every box is packed with dry ice and insulated liners so your meals arrive in
                  perfect condition and stay fresh for up to 5 days in your fridge.
                </p>
              </div>
              <button
                onClick={() => go('name')}
                className="w-full py-4 rounded-2xl bg-cu-yellow text-cu-ink font-bold text-base mt-8 hover:bg-cu-yellow-deep transition-colors"
              >
                Continue
              </button>
            </div>
          )}

          {/* ── NAME ── */}
          {step === 'name' && (
            <div className="flex flex-col flex-1 justify-between">
              <div className="mt-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cu-slate mb-3">Step 5 of 7</p>
                <h1 className="font-display text-[38px] text-cu-ink leading-tight mb-2">
                  What should we call you?
                </h1>
                <p className="text-cu-slate text-sm mb-10">We'd love to make this feel personal.</p>
                <input
                  type="text"
                  placeholder="First name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full text-[32px] font-bold text-cu-ink border-b-2 border-cu-line focus:border-cu-ink outline-none py-2 bg-transparent transition-colors placeholder:text-cu-line placeholder:font-normal"
                  autoFocus
                />
              </div>
              <button
                onClick={() => go('meals')}
                disabled={name.trim().length === 0}
                className={`w-full py-4 rounded-2xl font-bold text-base mt-8 transition-all ${
                  name.trim().length > 0
                    ? 'bg-cu-yellow text-cu-ink hover:bg-cu-yellow-deep'
                    : 'bg-cu-line text-cu-slate cursor-not-allowed'
                }`}
              >
                {name.trim() ? `Nice to meet you, ${firstName} →` : 'Continue'}
              </button>
            </div>
          )}

          {/* ── MEALS ── */}
          {step === 'meals' && (
            <div className="flex flex-col flex-1 justify-between">
              <div className="flex-1">
                <div className="mt-6 mb-8">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cu-slate mb-3">Step 6 of 7</p>
                  <h1 className="font-display text-[38px] text-cu-ink leading-tight mb-2">
                    How many meals a week?
                  </h1>
                  <p className="text-cu-slate text-sm">You can change this anytime.</p>
                </div>
                <div className="grid grid-cols-3 gap-2.5">
                  {[4, 5, 6, 7, 8, 9, 10, 11, 12].map(n => (
                    <button
                      key={n}
                      onClick={() => setMeals(n)}
                      className={`py-5 rounded-2xl font-bold text-2xl transition-all duration-150 active:scale-95 ${
                        meals === n
                          ? 'bg-cu-yellow text-cu-ink shadow-card scale-[1.02]'
                          : 'bg-white text-cu-slate border border-cu-line hover:border-cu-slate/40'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
                {mealMsg && (
                  <div className={`mt-5 p-4 rounded-2xl border transition-all animate-onboard-in ${
                    mealMsg.highlight
                      ? 'bg-cu-yellow/10 border-cu-yellow/40'
                      : 'bg-white border-cu-line'
                  }`}>
                    {mealMsg.highlight && (
                      <p className="text-[10px] font-bold uppercase tracking-widest text-cu-slate mb-1">Most popular choice</p>
                    )}
                    <p className="text-[13px] text-cu-slate leading-relaxed">{mealMsg.text}</p>
                  </div>
                )}
              </div>
              <button
                onClick={() => go('email')}
                disabled={meals === null}
                className={`w-full py-4 rounded-2xl font-bold text-base mt-6 transition-all ${
                  meals !== null
                    ? 'bg-cu-yellow text-cu-ink hover:bg-cu-yellow-deep'
                    : 'bg-cu-line text-cu-slate cursor-not-allowed'
                }`}
              >
                Continue
              </button>
            </div>
          )}

          {/* ── EMAIL ── */}
          {step === 'email' && (
            <div className="flex flex-col flex-1 justify-between">
              <div className="mt-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cu-slate mb-6">Almost there</p>
                <h1 className="font-display text-[38px] text-cu-ink leading-tight mb-4">
                  Before we show you the 400+ dishes available this week...
                </h1>
                <p className="text-cu-slate text-[15px] leading-relaxed mb-10">
                  Can we grab your email to save your preferences and weekly menu?
                </p>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full text-xl font-semibold text-cu-ink border-b-2 border-cu-line focus:border-cu-ink outline-none py-2 bg-transparent transition-colors placeholder:text-cu-line placeholder:font-normal"
                  autoFocus
                />
              </div>
              <div className="mt-8 space-y-3">
                <button
                  onClick={() => onComplete({ why: why!, zip, name, meals: meals ?? 8, email })}
                  disabled={!email.includes('@') || !email.includes('.')}
                  className={`w-full py-4 rounded-2xl font-bold text-base transition-all ${
                    email.includes('@') && email.includes('.')
                      ? 'bg-cu-yellow text-cu-ink hover:bg-cu-yellow-deep'
                      : 'bg-cu-line text-cu-slate cursor-not-allowed'
                  }`}
                >
                  Show me the menu →
                </button>
                <button
                  onClick={() => onComplete({ why: why!, zip, name, meals: meals ?? 8, email: '' })}
                  className="w-full py-3 text-sm text-cu-slate font-medium hover:text-cu-ink transition-colors"
                >
                  Skip for now
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
