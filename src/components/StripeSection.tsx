import type { ReactNode } from 'react'

export type StripeBand =
  | 'neutral'
  | 'aurora'
  | 'depth'
  | 'sunset'
  | 'twilight'
  | 'midnight'
  | 'ink'

type Props = {
  children: ReactNode
  /** Softer gray band (used when `band` is neutral) */
  subtle?: boolean
  /** Full-bleed section personality — use for strong separation from the canvas */
  band?: StripeBand
  /** Extra classes on the outer full-bleed wrapper (meshes, offsets) */
  className?: string
  /** Extra classes on the inner max-width container (asymmetric padding) */
  innerClassName?: string
}

export function StripeSection({
  children,
  subtle,
  band = 'neutral',
  className = '',
  innerClassName = '',
}: Props) {
  const bandClass = band !== 'neutral' ? ` stripe--band-${band}` : subtle ? ' stripe--subtle' : ''
  return (
    <div className={`stripe${bandClass}${className ? ` ${className}` : ''}`.trim()}>
      <div className={`stripe__inner${innerClassName ? ` ${innerClassName}` : ''}`.trim()}>{children}</div>
    </div>
  )
}
