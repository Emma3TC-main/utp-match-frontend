import type { ReactNode } from 'react'

export function StickyCTA({ left, right, compact = false }: { left?: ReactNode; right?: ReactNode; compact?: boolean }) {
  return <div className={`sticky-cta ${compact ? 'sticky-cta--compact' : ''}`}>{left}{right}</div>
}
