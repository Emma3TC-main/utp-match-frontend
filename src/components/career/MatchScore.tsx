import type { CSSProperties } from 'react'
import type { Career } from "../../types/domain";

export function MatchScore({ career }: { career: Career }) {
  return (
    <div className="match-score">
      <div className="match-score__ring" style={{ '--progress': career.match } as CSSProperties}>
        <div>
          <strong>{career.match}%</strong>
          <span>{career.matchLabel}</span>
        </div>
      </div>
      <p>{career.matchText}</p>
    </div>
  )
}
