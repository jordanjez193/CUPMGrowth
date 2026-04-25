import { useEffect } from 'react'
import type { Chef } from '../data/chefs'

type Props = {
  chef: Chef | null
  onClose: () => void
}

export function ChefVideoPanel({ chef, onClose }: Props) {
  useEffect(() => {
    if (!chef) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [chef, onClose])

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-cu-ink/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          chef ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-cu-ink z-50 flex flex-col shadow-2xl transition-transform duration-300 ease-out ${
          chef ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-white/10">
          <div>
            {chef && (
              <>
                <div className="text-[10px] uppercase tracking-widest text-white/50 font-semibold">
                  Meet the chef
                </div>
                <div className="font-display text-xl text-white mt-0.5">{chef.name}</div>
              </>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
            aria-label="Close"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Chef info */}
        {chef && (
          <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
            <img
              src={chef.photo}
              alt={chef.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-cu-yellow/60"
            />
            <div>
              <div className="text-xs text-white/50">{chef.cuisine}</div>
              <div className="text-sm text-white/80 mt-0.5 line-clamp-2 max-w-[280px]">
                {chef.bio}
              </div>
            </div>
          </div>
        )}

        {/* Video */}
        <div className="flex-1 flex flex-col">
          <div className="relative w-full" style={{ paddingTop: '177.78%' }}>
            {chef && (
              <iframe
                src="https://www.youtube.com/embed/3w02URo6swM?autoplay=1&mute=1&controls=1&rel=0"
                title={`Meet ${chef.name}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
