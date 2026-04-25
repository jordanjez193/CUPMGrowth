import type { Achievement } from './data'
import type { Screen } from './AchievementsApp'
import { BottomNav } from './BottomNav'

type Props = {
  achievements: Achievement[]
  onSelect: (a: Achievement) => void
  onTabChange: (s: Screen) => void
  activeTab: Screen
}

const PRODUCT_LINE_COLORS: Record<string, string> = {
  'Breakfast': '#F97316',
  'Bundles': '#8B5CF6',
  'Sides': '#06B6D4',
  'Plant Powered': '#22C55E',
  'Premium': '#F59E0B',
  'Kids & Families': '#EC4899',
  'Gifting': '#3B82F6',
  'Any meal': '#6B7280',
}

export function RewardsScreen({ achievements, onSelect, onTabChange, activeTab }: Props) {
  const claimable = achievements.filter(a => a.status === 'unlocked' && !a.reward.claimed)
  const claimed = achievements.filter(a => a.status === 'unlocked' && a.reward.claimed)
  const upcoming = achievements.filter(a => a.status === 'in-progress').sort((a, b) => {
    const aPct = a.progress / a.target
    const bPct = b.progress / b.target
    return bPct - aPct
  })

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-[#0F1115] px-5 pt-12 pb-6">
        <p className="text-white/50 text-xs font-medium mb-1">Your account</p>
        <h1 className="text-white font-bold text-2xl">Rewards</h1>
        <p className="text-white/50 text-sm mt-1">
          {claimable.length > 0
            ? `You have ${claimable.length} reward${claimable.length > 1 ? 's' : ''} ready to claim`
            : 'Earn rewards by completing achievements'}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto pb-24 bg-[#F5F5F5]">
        {/* Ready to claim */}
        {claimable.length > 0 && (
          <div className="px-4 mt-4">
            <SectionHeader label="Ready to claim" count={claimable.length} dot />
            <div className="space-y-3">
              {claimable.map(a => (
                <RewardCard key={a.id} achievement={a} onPress={() => onSelect(a)} />
              ))}
            </div>
          </div>
        )}

        {/* Coming soon */}
        {upcoming.length > 0 && (
          <div className="px-4 mt-5">
            <SectionHeader label="Almost there" count={upcoming.length} />
            <div className="space-y-3">
              {upcoming.map(a => (
                <RewardCard key={a.id} achievement={a} onPress={() => onSelect(a)} upcoming />
              ))}
            </div>
          </div>
        )}

        {/* Claimed */}
        {claimed.length > 0 && (
          <div className="px-4 mt-5">
            <SectionHeader label="Claimed" count={claimed.length} />
            <div className="space-y-3">
              {claimed.map(a => (
                <RewardCard key={a.id} achievement={a} onPress={() => onSelect(a)} dimmed />
              ))}
            </div>
          </div>
        )}

        {claimable.length === 0 && upcoming.length === 0 && claimed.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
            <span className="text-5xl mb-4">🎯</span>
            <p className="font-semibold text-[#0F1115] text-lg">No rewards yet</p>
            <p className="text-gray-400 text-sm mt-1">Complete achievements to earn rewards</p>
          </div>
        )}
      </div>

      <BottomNav active={activeTab} onChange={onTabChange} claimable={claimable.length} />
    </div>
  )
}

function SectionHeader({ label, count, dot }: { label: string; count: number; dot?: boolean }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      {dot && <span className="w-2 h-2 rounded-full bg-[#FFD333]" />}
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{label}</p>
      <span className="text-xs text-gray-300 font-medium ml-auto">{count}</span>
    </div>
  )
}

function RewardCard({
  achievement: a,
  onPress,
  upcoming,
  dimmed,
}: {
  achievement: Achievement
  onPress: () => void
  upcoming?: boolean
  dimmed?: boolean
}) {
  const productColor = PRODUCT_LINE_COLORS[a.reward.productLine] ?? '#6B7280'
  const pct = Math.round((a.progress / a.target) * 100)

  return (
    <button
      onClick={onPress}
      className={`w-full bg-white rounded-2xl p-4 text-left shadow-sm active:scale-95 transition-transform ${dimmed ? 'opacity-60' : ''}`}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0"
          style={{ backgroundColor: `${productColor}15` }}
        >
          {a.reward.emoji}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-0.5">
            <span
              className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
              style={{ backgroundColor: `${productColor}15`, color: productColor }}
            >
              {a.reward.productLine}
            </span>
            {dimmed && (
              <span className="text-[10px] text-gray-400 font-medium">Claimed ✓</span>
            )}
            {!dimmed && !upcoming && (
              <span className="text-[10px] font-bold text-[#FFD333] bg-[#FFF9E6] px-2 py-0.5 rounded-full">
                Claim →
              </span>
            )}
          </div>
          <p className="font-bold text-[#0F1115] text-sm leading-tight">{a.reward.label}</p>
          <p className="text-[11px] text-gray-400 mt-0.5">{a.name} achievement</p>
        </div>
      </div>

      {/* Progress bar for upcoming */}
      {upcoming && (
        <div className="mt-3">
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-[#FFD333]"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="text-[10px] text-gray-400 mt-1">
            {a.progress}/{a.target} · {a.target - a.progress} more to unlock
          </p>
        </div>
      )}
    </button>
  )
}
