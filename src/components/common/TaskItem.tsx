import { Check } from "lucide-react";

export function TaskItem({
  title,
  description,
  priority,
  due,
  checked,
  onToggle,
}: {
  title: string;
  description: string;
  priority: string;
  due: string;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      className={`task-item ${checked ? "task-item--checked" : ""}`}
      onClick={onToggle}
    >
      <span className="task-item__check">
        {checked ? <Check size={15} /> : null}
      </span>
      <span className="task-item__content">
        <strong>{title}</strong>
        <span>{description}</span>
        <span className="task-item__meta">
          <em>{priority}</em> · Vence: {due}
        </span>
      </span>
    </button>
  );
}
