import {
  ArrowRight,
  BookOpen,
  BrainCircuit,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  Code2,
  Lightbulb,
  MessageCircle,
  TrendingUp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  IntensityBar,
  MatchScore,
  ScreenTitleBlock,
  Surface,
} from "../../components/ui";
import type { CareerViewModel, ComparisonTab } from "../../types/domain";

type CompareTabPanelProps = {
  tab: ComparisonTab;
  first: CareerViewModel;
  second: CareerViewModel;
};

const intensityRows = [
  { key: "mathematics", label: "Mate", icon: BrainCircuit, color: "var(--blue)" },
  { key: "programming", label: "Codigo", icon: Code2, color: "var(--teal)" },
  { key: "management", label: "Gestion", icon: BriefcaseBusiness, color: "var(--lime)" },
  { key: "communication", label: "Comunica", icon: MessageCircle, color: "var(--sky)" },
  { key: "logic", label: "Logica", icon: Lightbulb, color: "var(--blue-strong)" },
] as const;

function compactText(value: string, max = 130): string {
  if (value.length <= max) return value;
  return `${value.slice(0, max - 3).trim()}...`;
}

export default function CompareTabPanel({
  tab,
  first,
  second,
}: CompareTabPanelProps) {
  const navigate = useNavigate();
  const careersToCompare = [first, second];

  if (tab === "Resumen") {
    return (
      <>
        <div className="compare-grid compare-grid--visual">
          <MatchScore career={first} />
          <MatchScore career={second} />
        </div>

        <div className="quick-compare-grid">
          {careersToCompare.map((career) => (
            <Surface key={career.id} className="quick-compare-card">
              <span className="quick-compare-card__icon">
                <TrendingUp size={18} />
              </span>
              <div>
                <strong>{career.name}</strong>
                <p>{compactText(career.insight, 96)}</p>
              </div>
            </Surface>
          ))}
        </div>

        <Surface className="summary-snap summary-snap--visual">
          <ScreenTitleBlock
            title="Diferencia rapida"
            body={`${first.area} vs. ${second.area}`}
          />
          <div className="visual-chip-row">
            {[first.skills[0], first.skills[1], second.skills[0], second.skills[1]]
              .filter(Boolean)
              .map((skill) => (
                <span key={skill} className="mini-chip">
                  {skill}
                </span>
              ))}
          </div>
        </Surface>
      </>
    );
  }

  if (tab === "Intensidad") {
    return (
      <div className="compare-columns">
        {careersToCompare.map((career) => (
          <Surface key={career.id} className="visual-panel">
            <div className="post-section-title post-section-title--small">
              <span>
                <BrainCircuit size={17} />
              </span>
              <div>
                <strong>{career.name}</strong>
                <p>Niveles clave</p>
              </div>
            </div>

            {intensityRows.map(({ key, label, icon: Icon, color }) => (
              <div key={key} className="intensity-row-with-icon">
                <Icon size={16} />
                <IntensityBar
                  label={label}
                  value={career.intensity[key]}
                  accent={color}
                />
              </div>
            ))}
          </Surface>
        ))}
      </div>
    );
  }

  if (tab === "Primer ciclo") {
    return (
      <div className="compare-columns">
        {careersToCompare.map((career) => (
          <Surface key={career.id} className="visual-panel">
            <div className="post-section-title post-section-title--small">
              <span>
                <BookOpen size={17} />
              </span>
              <div>
                <strong>{career.name}</strong>
                <p>Cursos para revisar</p>
              </div>
            </div>

            <div className="course-stack">
              {career.courses.slice(0, 4).map((course) => (
                <button
                  key={course.id}
                  className="course-compact course-compact--visual course-compact--icon"
                  onClick={() => navigate(`/course/${course.id}`)}
                  type="button"
                >
                  <span className="course-compact__icon">
                    <BookOpen size={16} />
                  </span>
                  <div>
                    <span className="badge badge--soft">{course.cycle}</span>
                    <strong>{course.name}</strong>
                    <p>{compactText(course.explanation, 84)}</p>
                  </div>

                  <ChevronRight size={16} />
                </button>
              ))}
            </div>
          </Surface>
        ))}
      </div>
    );
  }

  if (tab === "Habilidades") {
    return (
      <div className="compare-columns">
        {careersToCompare.map((career) => (
          <Surface key={career.id} className="visual-panel">
            <div className="post-section-title post-section-title--small">
              <span>
                <CheckCircle2 size={17} />
              </span>
              <div>
                <strong>{career.name}</strong>
                <p>Lo que destaca</p>
              </div>
            </div>

            <div className="skill-orbit">
              {career.skills.slice(0, 6).map((skill) => (
                <span key={skill} className="mini-chip mini-chip--visual">
                  <BrainCircuit size={12} />
                  {skill}
                </span>
              ))}
            </div>

            <div className="detail-list detail-list--icon">
              <strong>Fuerte</strong>

              {career.strengths.slice(0, 4).map((item) => (
                <span key={item}>
                  <CheckCircle2 size={14} />
                  {item}
                </span>
              ))}
            </div>
          </Surface>
        ))}
      </div>
    );
  }

  return (
    <Surface className="summary-snap summary-snap--visual">
      <div className="post-section-title post-section-title--small">
        <span>
          <Lightbulb size={17} />
        </span>
        <div>
          <strong>Idea clave</strong>
          <p>No elige por ti. Te ayuda a conversar mejor.</p>
        </div>
      </div>

      <div className="next-action-grid">
        <button type="button" onClick={() => navigate("/match")}>
          <TrendingUp size={16} />
          Ver match
          <ArrowRight size={14} />
        </button>
        <button type="button" onClick={() => navigate("/compare")}>
          <BookOpen size={16} />
          Comparar otra
          <ArrowRight size={14} />
        </button>
      </div>
    </Surface>
  );
}
