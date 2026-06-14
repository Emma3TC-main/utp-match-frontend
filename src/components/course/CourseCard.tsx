import { ArrowRight } from "lucide-react";
import type { CourseData } from "../../data/demo";

export function CourseCard({
  course,
  saved,
  onOpen,
  onSave,
}: {
  course: CourseData;
  saved: boolean;
  onOpen: () => void;
  onSave: () => void;
}) {
  return (
    <article className="course-card">
      <div className="course-card__head">
        <div>
          <span className="badge badge--soft">{course.cycle}</span>
          <span className="badge badge--area">{course.area}</span>
        </div>
        <span className="course-card__intensity">
          Intensidad {course.intensityLabel}
        </span>
      </div>
      <h4>{course.name}</h4>
      <p>{course.explanation}</p>
      <div className="course-card__foot">
        <button className="link-button" type="button" onClick={onOpen}>
          Ver explicado <ArrowRight size={14} />
        </button>
        <button
          className={`save-pill ${saved ? "save-pill--active" : ""}`}
          type="button"
          onClick={onSave}
        >
          {saved ? "Guardado" : "Guardar curso"}
        </button>
      </div>
    </article>
  );
}
