import type { ReactNode } from 'react'

/** Transitional line between ideas — “one thing leads to another”. */
export function SectionConnector({ children }: { children: ReactNode }) {
  return <div className="section-connector">{children}</div>
}
