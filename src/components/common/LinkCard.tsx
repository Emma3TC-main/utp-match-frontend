import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export function LinkCard({ title, body, to }: { title: string; body: string; to: string }) {
  return (
    <Link className="link-card" to={to}>
      <div>
        <strong>{title}</strong>
        <p>{body}</p>
      </div>
      <ArrowRight size={18} />
    </Link>
  )
}
