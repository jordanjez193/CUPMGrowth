import { useState } from 'react'
import { ACHIEVEMENTS, type Achievement } from './data'
import { HubScreen } from './HubScreen'
import { RewardsScreen } from './RewardsScreen'
import { DetailSheet } from './DetailSheet'
import { Confetti } from './Confetti'

export type Screen = 'hub' | 'rewards'

export function AchievementsApp() {
  const [screen, setScreen] = useState<Screen>('hub')
  const [selected, setSelected] = useState<Achievement | null>(null)
  const [achievements, setAchievements] = useState(ACHIEVEMENTS)
  const [confetti, setConfetti] = useState(false)

  const claimReward = (id: string) => {
    setAchievements(prev =>
      prev.map(a => a.id === id ? { ...a, reward: { ...a.reward, claimed: true } } : a)
    )
    setConfetti(true)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center py-0 md:py-8">
      <div
        className="relative bg-white w-full md:max-w-[390px] md:rounded-[2.5rem] md:shadow-2xl overflow-hidden"
        style={{ height: '100dvh' }}
      >
        {screen === 'hub' && (
          <HubScreen
            achievements={achievements}
            onSelect={setSelected}
            onTabChange={setScreen}
            activeTab={screen}
          />
        )}
        {screen === 'rewards' && (
          <RewardsScreen
            achievements={achievements}
            onSelect={setSelected}
            onTabChange={setScreen}
            activeTab={screen}
          />
        )}

        <DetailSheet
          achievement={selected}
          onClose={() => setSelected(null)}
          onClaim={claimReward}
        />

        <Confetti active={confetti} onDone={() => setConfetti(false)} />
      </div>
    </div>
  )
}
