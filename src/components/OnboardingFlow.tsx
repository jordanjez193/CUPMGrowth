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

const CHEF_PORTRAITS = [
  { name: 'Esther Choi',       photo: 'https://cu-website-cms-prd.s3.us-east-1.amazonaws.com/Esther_Choi_93538d0d78.png' },
  { name: 'Akhtar Nawab',      photo: 'https://cu-website-cms-prd.s3.us-east-1.amazonaws.com/Akhtar_Nawab_fa5119959c.png' },
  { name: 'Michelle Bernstein',photo: 'https://cu-website-cms-prd.s3.us-east-1.amazonaws.com/Michelle_Bernstein_83fe5b895f.png' },
  { name: 'Pierre Thiam',      photo: 'https://cu-website-cms-prd.s3.us-east-1.amazonaws.com/Pierre_Thiam_dd218212cb.png' },
  { name: 'Chris Ratel',       photo: 'https://cu-website-cms-prd.s3.us-east-1.amazonaws.com/Chris_Ratel_24e8f3e5f0.png' },
  { name: 'José Garcés',       photo: 'https://cu-website-cms-prd.s3.us-east-1.amazonaws.com/Jose_Garces_2c95fc141e.png' },
  { name: 'Einat Admony',      photo: 'https://cu-website-cms-prd.s3.us-east-1.amazonaws.com/Einat_Admony_48dc7c25ca.png' },
  { name: 'John De Lucie',     photo: 'https://cu-website-cms-prd.s3.us-east-1.amazonaws.com/John_De_Lucie_0e67d16f7f.png' },
]

const WHY_OPTIONS: { id: WhyId; title: string; subtitle: string; icon: React.ReactNode }[] = [
  {
    id: 'busy',
    title: 'Too busy\nto cook',
    subtitle: 'No shopping, prep, or cleanup',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'foodie',
    title: 'Food\nlover',
    subtitle: 'Chef-curated meals at home',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M18 2v6a3 3 0 01-3 3H9a3 3 0 01-3-3V2M12 11v10M8 22h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'spending',
    title: 'Save on\ndining out',
    subtitle: 'Restaurant quality, less cost',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M2 10h20" stroke="currentColor" strokeWidth="1.8"/>
      </svg>
    ),
  },
  {
    id: 'health',
    title: 'Eating\nright',
    subtitle: 'Nutrition-transparent dishes',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
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
    body: "CookUnity partners with 100+ award-winning chefs — James Beard nominees, Michelin veterans, Top Chef alumni — rotating 400+ dishes every week. This isn't meal prep. This is dining.",
    stat: '100+ world-class chefs on the platform',
  },
  spending: {
    headline: 'Restaurant quality.\nFraction of the price.',
    body: 'The average CookUnity meal costs less than $13 — far less than delivery apps or dining out. Same chef-crafted quality, prepared in professional kitchens and delivered fresh to your door.',
    stat: 'Under $13 per meal on average',
  },
  health: {
    headline: 'Eat well without\nthe guesswork.',
    body: "Every dish comes with full nutrition transparency and is crafted by professional chefs. Filter by keto, plant-based, high-protein, or gluten-free — and know exactly what you're fueling with.",
    stat: 'Full macros on every single dish',
  },
}

type KitchenInfo = {
  kitchen: string
  city: string
  days: string
  kitchens: number
  imageUrl: string
}

function getKitchenInfo(zip: string): KitchenInfo {
  const n = parseInt(zip.slice(0, 2))
  const kitchens = 6
  const base = (kitchen: string, city: string, days: string, imageUrl: string): KitchenInfo =>
    ({ kitchen, city, days, kitchens, imageUrl })

  if (n >= 10 && n <= 14) return base('Brooklyn Kitchen', 'Brooklyn, NY', '1–2',
    'https://cu-website-cms-prd.s3.us-east-1.amazonaws.com/NY_Kitchen_hero.jpg')
  if (n >= 90 && n <= 96) return base('Los Angeles Kitchen', 'Los Angeles, CA', '1–2',
    'https://cu-website-cms-prd.s3.us-east-1.amazonaws.com/LA_Kitchen_hero.jpg')
  if (n >= 33 && n <= 34) return base('Miami Kitchen', 'Miami, FL', '1–2',
    'https://cu-website-cms-prd.s3.us-east-1.amazonaws.com/Miami_Kitchen_hero.jpg')
  if (n >= 60 && n <= 62) return base('Chicago Kitchen', 'Chicago, IL', '1–2',
    'https://cu-website-cms-prd.s3.us-east-1.amazonaws.com/Chicago_Kitchen_hero.jpg')
  if (n >= 78 && n <= 79) return base('Texas Kitchen', 'Austin, TX', '2–3',
    'https://cu-website-cms-prd.s3.us-east-1.amazonaws.com/TX_Kitchen_hero.jpg')
  return base('Production Kitchen', 'Nearest facility', '2–3',
    'https://cu-website-cms-prd.s3.us-east-1.amazonaws.com/Kitchen_hero.jpg')
}

function getMealMessage(n: number): { text: string; highlight: boolean } {
  if (n <= 5)  return { text: 'A great start. Your meals stay fresh for up to 5 days — easy to work into any schedule.', highlight: false }
  if (n <= 7)  return { text: 'A popular choice. Enough variety to keep things interesting without over-committing. Adjust anytime.', highlight: false }
  if (n <= 10) return { text: 'The sweet spot. Our meals stay fresh for up to 5 days, and most CookUnity subscribers choose 8–10 to keep variety through the week.', highlight: true }
  return { text: 'Going all in. Our most dedicated subscribers love having a CookUnity meal ready for any occasion. Every dish stays fresh for up to 5 days.', highlight: false }
}

export function OnboardingFlow({ onComplete }: { onComplete: (d: OnboardingData) => void }) {
  const [step, setStep]               = useState<Step>('why')
  const [why, setWhy]                 = useState<WhyId | null>(null)
  const [selectedWhy, setSelectedWhy] = useState<WhyId | null>(null)
  const [zip, setZip]                 = useState('')
  const [name, setName]               = useState('')
  const [meals, setMeals]             = useState<number>(8)
  const [mealsChosen, setMealsChosen] = useState(false)
  const [email, setEmail]             = useState('')
  const [anim, setAnim]               = useState<'in' | 'out'>('in')
  const [kitchenImgFailed, setKitchenImgFailed] = useState(false)

  const stepIdx    = STEP_ORDER.indexOf(step)
  const progress   = (stepIdx + 1) / STEP_ORDER.length
  const kitchenInfo = zip.length === 5 ? getKitchenInfo(zip) : null
  const mealMsg     = getMealMessage(meals)
  const firstName   = name.trim().split(' ')[0]
  const sliderPct   = ((meals - 4) / (12 - 4)) * 100

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

              <div className="grid grid-cols-2 gap-3 flex-1">
                {WHY_OPTIONS.map(opt => {
                  const selected = selectedWhy === opt.id
                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleWhySelect(opt.id)}
                      className={`relative flex flex-col items-center justify-center gap-3 px-4 py-7 rounded-2xl border-2 text-center transition-all duration-150 active:scale-[0.97] ${
                        selected
                          ? 'border-cu-yellow bg-cu-yellow/10'
                          : 'border-cu-line bg-white hover:border-cu-slate/30 hover:shadow-sm'
                      }`}
                    >
                      {selected && (
                        <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-cu-yellow flex items-center justify-center animate-pop-in">
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                            <path d="M1 4l3 3 5-6" stroke="#0F1115" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                      )}
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                        selected ? 'bg-cu-yellow text-cu-ink' : 'bg-cu-line/50 text-cu-slate'
                      }`}>
                        {opt.icon}
                      </div>
                      <div>
                        <p className="font-semibold text-[14px] text-cu-ink leading-tight" style={{ whiteSpace: 'pre-line' }}>
                          {opt.title}
                        </p>
                        <p className="text-[11px] text-cu-slate/70 mt-1 leading-tight">
                          {opt.subtitle}
                        </p>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* ── REINFORCE ── */}
          {step === 'reinforce' && why && (() => {
            const r = REINFORCE[why]
            return (
              <div className="flex flex-col flex-1 py-4">
                <div className="flex-1">
                  <span className="inline-flex items-center gap-2 bg-cu-yellow text-cu-ink text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-8">
                    {r.stat}
                  </span>
                  <h1 className="font-display text-white leading-tight mb-5" style={{ fontSize: 'clamp(40px, 9vw, 56px)', whiteSpace: 'pre-line' }}>
                    {r.headline}
                  </h1>
                  <p className="text-white/60 text-[16px] leading-relaxed mb-8">
                    {r.body}
                  </p>

                  {/* Chef portrait strip */}
                  <div className="overflow-x-auto -mx-6 px-6 pb-1">
                    <div className="flex gap-3" style={{ width: 'max-content' }}>
                      {CHEF_PORTRAITS.map(chef => (
                        <div key={chef.name} className="relative w-[88px] h-[120px] rounded-2xl overflow-hidden shrink-0 bg-white/10">
                          <img
                            src={chef.photo}
                            alt={chef.name}
                            className="w-full h-full object-cover object-top"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                          <p className="absolute bottom-2 left-2 right-2 text-white text-[10px] font-semibold leading-tight">
                            {chef.name.split(' ')[0]}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => go('location')}
                  className="w-full py-4 rounded-2xl bg-cu-yellow text-cu-ink font-bold text-base mt-8 hover:brightness-105 transition-all"
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
                    ? 'bg-cu-yellow text-cu-ink hover:brightness-105'
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
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cu-slate mb-5">Step 4 of 7</p>

                {/* Kitchen image card */}
                <div className="relative h-48 rounded-2xl overflow-hidden mb-6 bg-cu-ink">
                  {!kitchenImgFailed && (
                    <img
                      src={kitchenInfo.imageUrl}
                      alt={kitchenInfo.kitchen}
                      className="w-full h-full object-cover"
                      onError={() => setKitchenImgFailed(true)}
                    />
                  )}
                  {/* Always show gradient + text overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                  {/* Kitchen badge */}
                  <div className="absolute top-3 right-3 bg-cu-yellow text-cu-ink text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                    {kitchenInfo.kitchens} kitchens nationwide
                  </div>

                  {/* Kitchen name */}
                  <div className="absolute bottom-4 left-4">
                    <p className="text-white/60 text-[10px] font-semibold uppercase tracking-widest mb-0.5">Your kitchen</p>
                    <p className="text-white font-bold text-lg leading-tight">{kitchenInfo.kitchen}</p>
                    <p className="text-white/50 text-xs">{kitchenInfo.city}</p>
                  </div>

                  {/* If image failed, show a kitchen illustration */}
                  {kitchenImgFailed && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="opacity-20">
                        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9 22V12h6v10" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  )}
                </div>

                <h1 className="font-display text-[32px] text-cu-ink leading-tight mb-4">
                  Great news — we deliver to {zip}.
                </h1>
                <p className="text-cu-slate text-[15px] leading-relaxed mb-3">
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
                className="w-full py-4 rounded-2xl bg-cu-yellow text-cu-ink font-bold text-base mt-8 hover:brightness-105 transition-all"
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
                    ? 'bg-cu-yellow text-cu-ink hover:brightness-105'
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
                <div className="mt-6 mb-10">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cu-slate mb-3">Step 6 of 7</p>
                  <h1 className="font-display text-[38px] text-cu-ink leading-tight mb-2">
                    How many meals a week?
                  </h1>
                  <p className="text-cu-slate text-sm">You can change this anytime.</p>
                </div>

                {/* Big number display */}
                <div className="text-center mb-8">
                  <span
                    key={meals}
                    className="font-display text-[96px] text-cu-ink leading-none animate-pop-in inline-block"
                  >
                    {meals}
                  </span>
                  <p className="text-cu-slate text-sm mt-1">meals per week</p>
                </div>

                {/* Slider */}
                <div className="px-1 mb-2">
                  <input
                    type="range"
                    min={4}
                    max={12}
                    step={1}
                    value={meals}
                    onChange={e => { setMeals(Number(e.target.value)); setMealsChosen(true) }}
                    className="meal-slider w-full"
                    style={{ '--slider-pct': `${sliderPct}%` } as React.CSSProperties}
                  />
                  <div className="flex justify-between mt-2 text-[11px] text-cu-slate/60 font-medium">
                    <span>4</span>
                    <span>12</span>
                  </div>
                </div>

                {mealsChosen && (
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
                className="w-full py-4 rounded-2xl font-bold text-base mt-6 bg-cu-yellow text-cu-ink hover:brightness-105 transition-all"
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
                  onClick={() => onComplete({ why: why!, zip, name, meals, email })}
                  disabled={!email.includes('@') || !email.includes('.')}
                  className={`w-full py-4 rounded-2xl font-bold text-base transition-all ${
                    email.includes('@') && email.includes('.')
                      ? 'bg-cu-yellow text-cu-ink hover:brightness-105'
                      : 'bg-cu-line text-cu-slate cursor-not-allowed'
                  }`}
                >
                  Show me the menu →
                </button>
                <button
                  onClick={() => onComplete({ why: why!, zip, name, meals, email: '' })}
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
