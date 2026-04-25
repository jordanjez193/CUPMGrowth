import type { Achievement } from './data'
import { USER } from './data'
import type { Screen } from './AchievementsApp'
import { BottomNav } from './BottomNav'

type Props = {
  achievements: Achievement[]
  onSelect: (a: Achievement) => void
  onTabChange: (s: Screen) => void
  activeTab: Screen
}

const STATUS_ORDER = { unlocked: 0, 'in-progress': 1, locked: 2 }

export function HubScreen({ achievements, onSelect, onTabChange, activeTab }: Props) {
  const sorted = [...achievements].sort((a, b) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status])
  const unlocked = achievements.filter(a => a.status === 'unlocked').length
  const inProgress = achievements.filter(a => a.status === 'in-progress').length
  const claimable = achievements.filter(a => a.status === 'unlocked' && !a.reward.claimed).length
  const xpPct = Math.round((USER.xp / USER.xpForNextLevel) * 100)

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-[#0F1115] px-5 pt-12 pb-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-white/50 text-xs font-medium">Welcome back</p>
            <h1 className="text-white font-bold text-2xl">{USER.name}</h1>
          </div>
          <div className="flex items-center gap-2 bg-[#FFD333] rounded-full px-3 py-1.5">
            <span className="text-xs font-bold text-[#0F1115]">LVL {USER.level}</span>
            <span className="text-[10px] font-medium text-[#0F1115]/70">{USER.levelName}</span>
          </div>
        </div>

        {/* XP bar */}
        <div>
          <div className="flex justify-between text-[11px] mb-1.5">
            <span className="text-white/50">{USER.xp} XP</span>
            <span className="text-white/30">{USER.xpForNextLevel} XP → Level {USER.level + 1}</span>
          </div>
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#FFD333] rounded-full transition-all"
              style={{ width: `${xpPct}%` }}
            />
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-5 grid grid-cols-3 gap-2">
          {[
            { label: 'Earned', value: unlocked, highlight: false },
            { label: 'In progress', value: inProgress, highlight: false },
            { label: 'To claim', value: claimable, highlight: claimable > 0 },
          ].map(s => (
            <div key={s.label} className="rounded-xl p-3 text-center" style={{ backgroundColor: s.highlight ? '#FFD333' : 'rgba(255,255,255,0.08)' }}>
              <div className={`text-2xl font-bold tracking-tight ${s.highlight ? 'text-[#0F1115]' : 'text-white'}`}>{s.value}</div>
              <div className={`text-[10px] font-medium mt-0.5 ${s.highlight ? 'text-[#0F1115]/60' : 'text-white/40'}`}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto pb-24 bg-[#F5F5F5]">
        {/* Milestone path */}
        <MilestonePath orders={USER.totalOrders} />

        {/* Eating stats */}
        <div className="mx-4 mt-3 bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="px-4 pt-4 pb-3 border-b border-gray-50">
            <p className="font-semibold text-[#0F1115] text-sm">Your stats</p>
          </div>
          <div className="grid grid-cols-2">
            {[
              { label: 'Unique meals', value: USER.uniqueMeals.toString() },
              { label: 'Proteins enjoyed', value: USER.proteinsEnjoyed.toString() },
              { label: 'Chefs tried', value: USER.uniqueChefs.toString() },
              { label: 'Avg rating', value: `${USER.avgRating} ★` },
            ].map((s, i) => (
              <div
                key={s.label}
                className={`px-4 py-3 ${i % 2 === 0 ? 'border-r border-gray-50' : ''} ${i >= 2 ? 'border-t border-gray-50' : ''}`}
              >
                <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wide mb-0.5">{s.label}</p>
                <p className="text-sm font-semibold text-[#0F1115]">{s.value}</p>
              </div>
            ))}
            {/* Top chef */}
            <div className="col-span-2 border-t border-gray-50 px-4 py-3 flex items-center gap-3">
              <img src={USER.topChefPhoto} alt={USER.topChef} className="w-10 h-10 rounded-full object-cover shrink-0" />
              <div className="min-w-0">
                <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wide mb-0.5">Top chef</p>
                <p className="text-sm font-semibold text-[#0F1115]">{USER.topChef}</p>
              </div>
            </div>
            {/* Favorite meal */}
            <div className="col-span-2 border-t border-gray-50 px-4 py-3 flex items-center gap-3">
              <img src={USER.favoriteMealImage} alt={USER.favoriteMeal} className="w-10 h-10 rounded-xl object-cover shrink-0" />
              <div className="min-w-0">
                <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wide mb-0.5">Favorite meal</p>
                <p className="text-sm font-semibold text-[#0F1115] truncate">{USER.favoriteMeal}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Badge grid */}
        <div className="px-4 mt-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">All Achievements</p>
          <div className="grid grid-cols-2 gap-3">
            {sorted.map(a => (
              <BadgeCard key={a.id} achievement={a} onPress={() => onSelect(a)} />
            ))}
          </div>
        </div>
      </div>

      <BottomNav active={activeTab} onChange={onTabChange} claimable={claimable} />
    </div>
  )
}

function BadgeCard({ achievement: a, onPress }: { achievement: Achievement; onPress: () => void }) {
  const isUnlocked = a.status === 'unlocked'
  const isInProgress = a.status === 'in-progress'
  const pct = Math.round((a.progress / a.target) * 100)

  return (
    <button
      onClick={onPress}
      className="bg-white rounded-2xl p-4 text-left shadow-sm active:scale-95 transition-transform relative overflow-hidden"
    >
      {/* Claimable indicator */}
      {isUnlocked && !a.reward.claimed && (
        <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-[#FFD333]" />
      )}

      {/* Badge icon */}
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-3 relative"
        style={{
          backgroundColor: isUnlocked ? `${a.color}20` : isInProgress ? '#FFF9E6' : '#F3F4F6',
          border: `2px solid ${isUnlocked ? a.color : isInProgress ? '#FFD333' : '#E5E7EB'}`,
        }}
      >
        <span style={{ opacity: isUnlocked || isInProgress ? 1 : 0.35 }}>{a.emoji}</span>
        {a.status === 'locked' && (
          <span className="absolute -bottom-1 -right-1 text-xs">🔒</span>
        )}
      </div>

      <p className="font-bold text-[#0F1115] text-sm leading-tight">{a.name}</p>
      <p className="text-[10px] text-gray-400 mt-0.5 line-clamp-2">{a.description}</p>

      {/* Progress */}
      <div className="mt-3">
        {isUnlocked ? (
          <div className="flex items-center gap-1.5">
            <div className="flex-1 h-1.5 rounded-full" style={{ backgroundColor: `${a.color}30` }}>
              <div className="h-full rounded-full" style={{ width: '100%', backgroundColor: a.color }} />
            </div>
            <span className="text-[10px] font-bold" style={{ color: a.color }}>Done ✓</span>
          </div>
        ) : (
          <div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-[#FFD333] transition-all"
                style={{ width: `${pct}%` }}
              />
            </div>
            <p className="text-[10px] text-gray-400 mt-1">{a.progress}/{a.target}</p>
          </div>
        )}
      </div>

      {/* Reward preview */}
      <div className="mt-2.5 flex items-center justify-between bg-gray-50 rounded-xl px-2.5 py-1.5">
        <span className="text-[10px] font-medium text-gray-500 truncate">{a.reward.label}</span>
        <span className="text-[10px] font-bold text-[#0F1115] ml-2 shrink-0">{a.reward.value}</span>
      </div>
    </button>
  )
}

const MILESTONES = [
  { orders: 1,   label: '$5 off' },
  { orders: 5,   label: 'Free side' },
  { orders: 10,  label: 'Bonus XP' },
  { orders: 25,  label: 'Free meal' },
  { orders: 50,  label: 'Free gift' },
  { orders: 100, label: '$50 credit' },
]

function getProgressPct(orders: number) {
  const total = MILESTONES.length - 1
  const passedIdx = MILESTONES.filter(m => orders >= m.orders).length - 1
  if (passedIdx < 0) return 0
  if (passedIdx >= total) return 100
  const cur = MILESTONES[passedIdx].orders
  const next = MILESTONES[passedIdx + 1].orders
  const within = (orders - cur) / (next - cur)
  return ((passedIdx + within) / total) * 100
}

function MilestonePath({ orders }: { orders: number }) {
  const pct = getProgressPct(orders)
  const nextMilestone = MILESTONES.find(m => m.orders > orders)
  const toNext = nextMilestone ? nextMilestone.orders - orders : 0

  return (
    <div className="mx-4 mt-4 bg-white rounded-2xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Your journey</p>
          <p className="font-bold text-[#0F1115] text-lg">{orders} orders</p>
        </div>
        {nextMilestone && (
          <p className="text-xs text-gray-500 text-right">
            <span className="font-semibold text-[#0F1115]">{toNext} more</span><br />
            <span>to {nextMilestone.label}</span>
          </p>
        )}
      </div>

      {/* Node trail */}
      <div className="relative flex items-start justify-between px-2">
        {/* Background line */}
        <div className="absolute left-2 right-2 top-3.5 h-0.5 bg-gray-100" />
        {/* Progress line */}
        <div
          className="absolute left-2 top-3.5 h-0.5 bg-[#FFD333] transition-all duration-700"
          style={{ width: `calc(${pct}% * (100% - 16px) / 100)` }}
        />

        {MILESTONES.map((m, i) => {
          const passed = orders >= m.orders
          const isNext = !passed && (i === 0 || orders >= MILESTONES[i - 1].orders)
          return (
            <div key={m.orders} className="flex flex-col items-center gap-1.5 relative z-10">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold border-2 transition-all ${
                  passed
                    ? 'bg-[#FFD333] border-[#FFD333] text-[#0F1115]'
                    : isNext
                    ? 'bg-white border-[#FFD333] text-[#FFD333]'
                    : 'bg-white border-gray-200 text-gray-300'
                }`}
                style={isNext ? { boxShadow: '0 0 0 3px #FFD33330' } : {}}
              >
                {passed ? '✓' : m.orders}
              </div>
              <span className={`text-[8px] font-medium text-center leading-tight w-12 ${passed ? 'text-[#0F1115]' : isNext ? 'text-[#0F1115]' : 'text-gray-300'}`}>
                {m.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
