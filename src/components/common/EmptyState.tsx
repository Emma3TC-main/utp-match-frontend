import { SearchX } from "lucide-react";
import type { ReactNode } from "react";

export function EmptyState({
  title,
  body,
  action,
  icon,
}: {
  title: string;
  body: string;
  action?: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <div className="empty-state">
      <span className="empty-state__icon">
        {icon ?? <SearchX size={22} />}
      </span>
      <strong>{title}</strong>
      <p>{body}</p>
      {action}
    </div>
  );
}
