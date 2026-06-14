import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  AIExplanationCard,
  AppFrame,
  PrimaryButton,
  SecondaryButton,
  StickyCTA,
  Surface,
} from "../components/ui";
import { careers } from "../data/demo";
import { useAppContext } from "../state/appState";

export default function CoursePage() {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { savedCourses, toggleSavedCourse } = useAppContext();

  const course = useMemo(() => {
    return (
      careers
        .flatMap((career) => career.courses)
        .find((item) => item.id === courseId) ?? careers[0].courses[0]
    );
  }, [courseId]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setLoading(false);
    }, 900);

    return () => window.clearTimeout(timer);
  }, [courseId]);

  if (loading) {
    return (
      <AppFrame
        title="Estamos traduciendo el sílabo a lenguaje claro…"
        subtitle="Te mostraremos qué significa este curso en la práctica."
        progress={80}
      >
        <Surface className="surface--stack surface--raised">
          <div className="skeleton-cover" />
          <div className="skeleton-line skeleton-line--title" />
          <div className="skeleton-line" />
          <div className="skeleton-line" />
          <div className="skeleton-grid skeleton-grid--course">
            <div className="skeleton-box" />
            <div className="skeleton-box" />
          </div>
        </Surface>
      </AppFrame>
    );
  }

  return (
    <AppFrame
      title={course.name}
      subtitle="Este curso te enseña a pensar paso a paso, con claridad y práctica."
      progress={83}
    >
      <Surface className="surface--stack">
        <AIExplanationCard course={course} />

        <div className="course-detail-grid">
          <Surface>
            <h3>Qué aprenderás realmente</h3>
            <p>{course.explanation}</p>
          </Surface>

          <Surface>
            <h3>Qué tan exigente es</h3>
            <div className="difficulty-list">
              {course.difficulty.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </Surface>
        </div>

        <Surface>
          <h3>Cómo conecta con tu perfil</h3>
          <p>{course.impact}</p>
        </Surface>
      </Surface>

      <StickyCTA
        left={
          <SecondaryButton onClick={() => navigate("/compare/result")}>
            Volver a la comparación
          </SecondaryButton>
        }
        right={
          <PrimaryButton onClick={() => toggleSavedCourse(course.id)}>
            {savedCourses.includes(course.id)
              ? "Curso guardado"
              : "Guardar curso clave"}
          </PrimaryButton>
        }
      />
    </AppFrame>
  );
}
