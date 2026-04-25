import type { Screen } from './AchievementsApp'

type Props = {
  active: Screen
  onChange: (s: Screen) => void
  claimable: number
}

export function BottomNav({ active, onChange, claimable }: Props) {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 pb-8 pt-3 flex items-center justify-around">
      <NavItem
        label="Achievements"
        icon={
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M8 21h8M12 17v4M7 4h10v3a5 5 0 01-10 0V4zM5 4H3v2a4 4 0 004 4M19 4h2v2a4 4 0 01-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        }
        active={active === 'hub'}
        onClick={() => onChange('hub')}
      />
      <NavItem
        label="Rewards"
        badge={claimable}
        icon={
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M20 12v10H4V12M22 7H2v5h20V7zM12 22V7M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        }
        active={active === 'rewards'}
        onClick={() => onChange('rewards')}
      />
    </div>
  )
}

function NavItem({
  label, icon, active, onClick, badge,
}: {
  label: string
  icon: React.ReactNode
  active: boolean
  onClick: () => void
  badge?: number
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1 relative"
    >
      <div className="relative">
        <span style={{ color: active ? '#0F1115' : '#9CA3AF' }}>{icon}</span>
        {badge && badge > 0 ? (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#FFD333] text-[#0F1115] text-[9px] font-bold flex items-center justify-center">
            {badge}
          </span>
        ) : null}
      </div>
      <span
        className="text-[10px] font-semibold"
        style={{ color: active ? '#0F1115' : '#9CA3AF' }}
      >
        {label}
      </span>
    </button>
  )
}
