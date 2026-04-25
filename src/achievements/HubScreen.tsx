import type { Achievement } from './data'
import { USER, LEADERBOARD } from './data'
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
        <div className="mt-5 grid grid-cols-3 gap-3">
          {[
            { label: 'Earned', value: unlocked, icon: '🏅' },
            { label: 'In progress', value: inProgress, icon: '⚡' },
            { label: 'To claim', value: claimable, icon: '🎁', highlight: claimable > 0 },
          ].map(s => (
            <div key={s.label} className={`rounded-2xl p-3 text-center ${s.highlight ? 'bg-[#FFD333]' : 'bg-white/8'}`} style={{ backgroundColor: s.highlight ? '#FFD333' : 'rgba(255,255,255,0.08)' }}>
              <div className="text-lg mb-0.5">{s.icon}</div>
              <div className={`text-xl font-bold ${s.highlight ? 'text-[#0F1115]' : 'text-white'}`}>{s.value}</div>
              <div className={`text-[10px] ${s.highlight ? 'text-[#0F1115]/70' : 'text-white/40'}`}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto pb-24 bg-[#F5F5F5]">
        {/* Order journey */}
        <div className="mx-4 mt-4 bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Your journey</p>
              <p className="font-bold text-[#0F1115] text-lg">{USER.totalOrders} orders completed</p>
            </div>
            <div className="text-right">
              <p className="text-[11px] text-gray-400">Next milestone</p>
              <p className="text-sm font-semibold text-[#0F1115]">25 orders</p>
            </div>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-2">
            <div
              className="h-full bg-[#FFD333] rounded-full"
              style={{ width: `${(USER.totalOrders / 25) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-gray-400">
            {[0, 5, 10, 25].map(n => (
              <span key={n} className={USER.totalOrders >= n ? 'text-[#0F1115] font-semibold' : ''}>{n}</span>
            ))}
          </div>
          <p className="mt-2 text-xs text-gray-500">
            <span className="font-semibold text-[#0F1115]">2 more orders</span> until your free meal reward 🎁
          </p>
        </div>

        {/* Friends leaderboard */}
        <div className="mx-4 mt-3 bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="px-4 pt-4 pb-2 flex items-center justify-between">
            <p className="font-semibold text-[#0F1115] text-sm">Friends Leaderboard</p>
            <span className="text-[10px] text-gray-400">This month</span>
          </div>
          {LEADERBOARD.map((entry, i) => (
            <div
              key={entry.name}
              className={`flex items-center gap-3 px-4 py-2.5 ${entry.isYou ? 'bg-[#FFF9E6]' : ''}`}
            >
              <span className="text-sm w-4 text-center font-bold text-gray-400">
                {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i + 1}`}
              </span>
              <span className="text-lg">{entry.avatar}</span>
              <div className="flex-1">
                <p className={`text-sm font-semibold ${entry.isYou ? 'text-[#0F1115]' : 'text-gray-700'}`}>
                  {entry.name} {entry.isYou && <span className="text-[10px] text-[#0F1115]/50 font-normal ml-1">You</span>}
                </p>
                <p className="text-[10px] text-gray-400">Level {entry.level}</p>
              </div>
              <span className={`text-xs font-bold ${entry.isYou ? 'text-[#0F1115]' : 'text-gray-500'}`}>
                {entry.points} pts
              </span>
            </div>
          ))}
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
      <div className="mt-2.5 flex items-center gap-1.5 bg-gray-50 rounded-xl px-2.5 py-1.5">
        <span className="text-xs">{a.reward.emoji}</span>
        <span className="text-[10px] font-medium text-gray-600 truncate">{a.reward.label}</span>
      </div>
    </button>
  )
}
