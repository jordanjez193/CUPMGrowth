import { useEffect } from 'react'
import type { Achievement } from './data'

type Props = {
  achievement: Achievement | null
  onClose: () => void
  onClaim: (id: string) => void
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

export function DetailSheet({ achievement: a, onClose, onClaim }: Props) {
  const isOpen = a !== null
  const pct = a ? Math.round((a.progress / a.target) * 100) : 0
  const isUnlocked = a?.status === 'unlocked'
  const canClaim = isUnlocked && a && !a.reward.claimed
  const productColor = a ? PRODUCT_LINE_COLORS[a.reward.productLine] ?? '#6B7280' : '#6B7280'

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Sheet */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 transition-transform duration-300 ease-out ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 bg-gray-200 rounded-full" />
        </div>

        {a && (
          <div className="px-5 pb-10 pt-2">
            {/* Badge hero */}
            <div className="flex flex-col items-center mb-5">
              <div
                className="w-24 h-24 rounded-3xl flex items-center justify-center text-5xl mb-4 relative"
                style={{
                  backgroundColor: isUnlocked ? `${a.color}15` : '#F3F4F6',
                  border: `3px solid ${isUnlocked ? a.color : '#E5E7EB'}`,
                }}
              >
                {a.emoji}
                {isUnlocked && (
                  <span className="absolute -bottom-2 -right-2 text-lg">✅</span>
                )}
              </div>

              <span
                className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-2"
                style={{ backgroundColor: `${a.color}20`, color: a.color }}
              >
                {a.categoryLabel}
              </span>
              <h2 className="font-bold text-[#0F1115] text-2xl text-center">{a.name}</h2>
              <p className="text-gray-500 text-sm text-center mt-1">{a.description}</p>
            </div>

            {/* Progress */}
            <div className="bg-gray-50 rounded-2xl p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-[#0F1115]">Progress</span>
                <span className="text-sm font-bold" style={{ color: isUnlocked ? a.color : '#6B7280' }}>
                  {a.progress} / {a.target}
                </span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${pct}%`,
                    backgroundColor: isUnlocked ? a.color : '#FFD333',
                  }}
                />
              </div>
              {!isUnlocked && a.status === 'in-progress' && (
                <p className="text-xs text-gray-400 mt-2">
                  {a.target - a.progress} more to unlock this badge
                </p>
              )}
              {a.status === 'locked' && (
                <p className="text-xs text-gray-400 mt-2">
                  Keep going — you'll unlock this as you build your streak
                </p>
              )}
            </div>

            {/* Reward card */}
            <div
              className="rounded-2xl p-4 mb-5"
              style={{ backgroundColor: `${productColor}10`, border: `1.5px solid ${productColor}25` }}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: `${productColor}20`, color: productColor }}
                >
                  {a.reward.productLine}
                </span>
                <span className="text-xs font-medium text-gray-400">Reward</span>
              </div>
              <p className="text-2xl font-bold text-[#0F1115] mb-0.5">{a.reward.value}</p>
              <p className="text-sm font-semibold text-[#0F1115]">{a.reward.label}</p>
              <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">{a.reward.description}</p>
            </div>

            {/* CTA */}
            {canClaim ? (
              <button
                onClick={() => { onClaim(a.id); onClose() }}
                className="w-full py-4 rounded-2xl font-bold text-base text-[#0F1115] transition-all active:scale-95"
                style={{ backgroundColor: '#FFD333' }}
              >
                Claim reward →
              </button>
            ) : a.reward.claimed ? (
              <div className="w-full py-4 rounded-2xl font-bold text-base text-center text-gray-400 bg-gray-100">
                Reward claimed ✓
              </div>
            ) : (
              <button
                onClick={onClose}
                className="w-full py-4 rounded-2xl font-bold text-base text-white bg-[#0F1115] transition-all active:scale-95"
              >
                Keep going →
              </button>
            )}
          </div>
        )}
      </div>
    </>
  )
}
