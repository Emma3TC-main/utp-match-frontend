import {
  AlertCircle,
  ArrowLeft,
  Bookmark,
  BrainCircuit,
  CheckCircle2,
  Gauge,
  Sparkles,
} from "lucide-react";
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
import { careerService } from "../services/careerService";
import { syllabusService } from "../services/syllabusService";
import { useAppContext } from "../state/appState";
import type { CourseViewModel, ExplanationViewModel } from "../types/domain";

function compact(value: string, max = 160): string {
  if (value.length <= max) return value;
  return `${value.slice(0, max - 3).trim()}...`;
}

export default function CoursePage() {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { profile, savedCourses, toggleSavedCourse } = useAppContext();
  const [course, setCourse] = useState<CourseViewModel | null>(null);
  const [explanation, setExplanation] = useState<ExplanationViewModel | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadCourse() {
      try {
        setLoading(true);
        setError(null);

        if (!courseId) {
          throw new Error("Curso no encontrado.");
        }

        const found = await careerService.getCourseById(courseId);

        if (!found) {
          throw new Error("Curso no encontrado.");
        }

        const explained = await syllabusService.explainSyllabus({
          studentProfileId: profile.id,
          course: found,
        });

        if (active) {
          setCourse(found);
          setExplanation(explained);
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : "No se pudo cargar.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadCourse();

    return () => {
      active = false;
    };
  }, [courseId, profile.id]);

  const displayCourse = useMemo(() => {
    if (!course) return null;
    if (!explanation) return course;

    return {
      ...course,
      explanation: explanation.plainLanguageExplanation,
      impact: explanation.whyItMatters ?? course.impact,
      difficulty: explanation.difficulty,
      skill: explanation.skillsYouBuild?.[0] ?? course.skill,
    };
  }, [course, explanation]);

  const sourceLabel =
    explanation?.modelProvider === "mock" || explanation?.fallbackUsed
      ? "IA fallback"
      : explanation?.modelProvider
        ? `IA ${explanation.modelProvider}`
        : "IA backend";

  if (loading) {
    return (
      <AppFrame title="Traduciendo..." subtitle="IA preparando resumen." progress={80}>
        <Surface className="surface--stack surface--raised">
          <div className="post-section-title">
            <span>
              <Sparkles size={18} />
            </span>
            <div>
              <strong>Curso en simple</strong>
              <p>Un momento.</p>
            </div>
          </div>
          <div className="skeleton-cover" />
          <div className="skeleton-line" />
        </Surface>
      </AppFrame>
    );
  }

  if (error || !displayCourse) {
    return (
      <AppFrame
        title="No cargo"
        subtitle={error ?? "Curso no disponible."}
        progress={80}
      >
        <Surface className="surface--stack post-empty-state">
          <AlertCircle size={34} />
          <strong>Revisa esto</strong>
          <p>Vuelve a la comparacion y abre otro curso.</p>
          <SecondaryButton onClick={() => navigate("/compare/result")}>
            Volver
          </SecondaryButton>
        </Surface>
      </AppFrame>
    );
  }

  return (
    <AppFrame title={displayCourse.name} subtitle="Curso en simple." progress={83}>
      <Surface className="surface--stack">
        <AIExplanationCard course={displayCourse} sourceLabel={sourceLabel} />

        <div className="course-detail-grid course-detail-grid--visual">
          <Surface className="visual-panel">
            <div className="post-section-title post-section-title--small">
              <span>
                <BrainCircuit size={17} />
              </span>
              <div>
                <strong>Aprenderas</strong>
                <p>{compact(displayCourse.explanation, 120)}</p>
              </div>
            </div>
          </Surface>

          <Surface className="visual-panel">
            <div className="post-section-title post-section-title--small">
              <span>
                <Gauge size={17} />
              </span>
              <div>
                <strong>Nivel</strong>
                <p>Senales rapidas</p>
              </div>
            </div>
            <div className="difficulty-list difficulty-list--visual">
              {displayCourse.difficulty.slice(0, 4).map((item) => (
                <span key={item}>
                  <CheckCircle2 size={13} />
                  {item}
                </span>
              ))}
            </div>
          </Surface>
        </div>

        <Surface className="summary-snap summary-snap--visual">
          <span className="badge badge--soft">
            <Sparkles size={13} />
            Para ti
          </span>
          <p>{compact(displayCourse.impact, 170)}</p>
        </Surface>
      </Surface>

      <StickyCTA
        left={
          <SecondaryButton onClick={() => navigate("/compare/result")}>
            <ArrowLeft size={16} />
            Volver
          </SecondaryButton>
        }
        right={
          <PrimaryButton onClick={() => toggleSavedCourse(displayCourse.id)}>
            <Bookmark size={16} />
            {savedCourses.includes(displayCourse.id) ? "Guardado" : "Guardar"}
          </PrimaryButton>
        }
      />
    </AppFrame>
  );
}
