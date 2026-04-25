import { useEffect, useState } from 'react'

const COLORS = ['#FFD333', '#FF6B2B', '#7C3AED', '#22C55E', '#3B82F6', '#EC4899', '#F59E0B', '#ffffff']

type Particle = {
  id: number
  x: number
  color: string
  delay: number
  duration: number
  w: number
  h: number
  spin: number
}

function makeParticles(n = 65): Particle[] {
  return Array.from({ length: n }, (_, i) => ({
    id: i,
    x: 5 + Math.random() * 90,
    color: COLORS[i % COLORS.length],
    delay: Math.random() * 0.5,
    duration: 2.8 + Math.random() * 1.8,
    w: 6 + Math.random() * 9,
    h: 4 + Math.random() * 6,
    spin: Math.random() * 360,
  }))
}

export function Confetti({ active, onDone }: { active: boolean; onDone: () => void }) {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    if (!active) return
    setParticles(makeParticles())
    const t = setTimeout(() => { setParticles([]); onDone() }, 5000)
    return () => clearTimeout(t)
  }, [active])

  if (!particles.length) return null

  return (
    <div className="absolute inset-0 pointer-events-none z-[70] overflow-hidden">
      {particles.map(p => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: -14,
            width: p.w,
            height: p.h,
            backgroundColor: p.color,
            borderRadius: 2,
            transform: `rotate(${p.spin}deg)`,
            animation: `confetti-fall ${p.duration}s ${p.delay}s cubic-bezier(.4,.05,.6,.95) forwards`,
          }}
        />
      ))}
    </div>
  )
}
