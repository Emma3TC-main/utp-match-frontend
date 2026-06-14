import type { ReactNode } from 'react'

export function Chip({ children, active = false, onClick }: { children: ReactNode; active?: boolean; onClick?: () => void }) {
  return (
    <button className={`chip ${active ? 'chip--active' : ''}`} type="button" onClick={onClick}>
      {children}
    </button>
  )
}
