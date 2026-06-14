import { Check, Clock3, Flag, ListChecks } from "lucide-react";

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
      className={`task-item task-item--visual ${checked ? "task-item--checked" : ""}`}
      onClick={onToggle}
    >
      <span className="task-item__check">
        {checked ? <Check size={15} /> : <ListChecks size={15} />}
      </span>
      <span className="task-item__content">
        <strong>{title}</strong>
        <span>{description || "Paso rapido."}</span>
        <span className="task-item__meta">
          <em>
            <Flag size={12} />
            {priority}
          </em>
          <small>
            <Clock3 size={12} />
            {due}
          </small>
        </span>
      </span>
    </button>
  );
}
