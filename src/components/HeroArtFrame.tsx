import type { ReactNode } from 'react'
import { useParallax } from '../hooks/useParallax'

type Props = {
  children: ReactNode
  /** Scroll coupling strength */
  intensity?: number
}

export function HeroArtFrame({ children, intensity = 0.05 }: Props) {
  const { ref, y } = useParallax(intensity)
  return (
    <div
      ref={ref}
      className="hero-art-frame"
      style={{ transform: `translate3d(0, ${y}px, 0)` }}
    >
      {children}
    </div>
  )
}
