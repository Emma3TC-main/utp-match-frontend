import { BrainCircuit, Lightbulb, Sparkles, Target } from "lucide-react";
import type { CourseViewModel } from "../../types/domain";

type AIExplanationCardProps = {
  course: CourseViewModel;
  sourceLabel?: string;
};

function compact(value: string, max = 180): string {
  if (value.length <= max) return value;
  return `${value.slice(0, max - 3).trim()}...`;
}

export function AIExplanationCard({
  course,
  sourceLabel,
}: AIExplanationCardProps) {
  return (
    <div className="ai-card ai-card--compact ai-card--visual">
      <div className="ai-card__tag">
        <Sparkles size={14} /> {sourceLabel ?? "IA backend"}
      </div>

      <div className="ai-card__title-row">
        <span>
          <BrainCircuit size={22} />
        </span>
        <div>
          <h3>{course.name}</h3>
          <p className="ai-card__lead">{compact(course.explanation)}</p>
        </div>
      </div>

      <div className="ai-card__grid">
        <div>
          <span>
            <Target size={14} />
            Importa
          </span>
          <strong>{compact(course.impact, 120)}</strong>
        </div>

        <div>
          <span>
            <Lightbulb size={14} />
            Habilidad
          </span>
          <strong>{course.skill}</strong>
        </div>
      </div>

      <div className="difficulty-list difficulty-list--visual">
        {course.difficulty.slice(0, 4).map((item) => (
          <span key={item}>
            <Sparkles size={12} />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
