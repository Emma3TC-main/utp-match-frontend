import { Sparkles } from "lucide-react";
import type { CourseData } from "../../data/demo";

export function AIExplanationCard({ course }: { course: CourseData }) {
  return (
    <div className="ai-card">
      <div className="ai-card__tag">
        <Sparkles size={14} /> Traducido con IA
      </div>
      <h3>{course.name}</h3>
      <p className="ai-card__lead">{course.explanation}</p>
      <div className="ai-card__grid">
        <div>
          <span>Por qué importa</span>
          <strong>{course.impact}</strong>
        </div>
        <div>
          <span>Qué habilidad desarrolla</span>
          <strong>{course.skill}</strong>
        </div>
      </div>
      <div className="difficulty-list">
        {course.difficulty.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </div>
  );
}
