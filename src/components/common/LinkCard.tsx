import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";

export function LinkCard({
  title,
  body,
  to,
  icon,
}: {
  title: string;
  body: string;
  to: string;
  icon?: ReactNode;
}) {
  return (
    <Link className="link-card" to={to}>
      {icon ? <span className="link-card__icon">{icon}</span> : null}
      <div>
        <strong>{title}</strong>
        <p>{body}</p>
      </div>
      <ArrowRight size={18} />
    </Link>
  );
}
