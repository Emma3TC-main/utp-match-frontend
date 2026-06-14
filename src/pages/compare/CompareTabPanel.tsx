import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  IntensityBar,
  MatchScore,
  ScreenTitleBlock,
  Surface,
} from "../../components/ui";
import type { Career } from "../../types/domain";

type CompareTabPanelProps = {
  tab: string;
  first: Career;
  second: Career;
};

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
        <div className="compare-grid">
          <MatchScore career={first} />
          <MatchScore career={second} />
        </div>

        <Surface>
          <ScreenTitleBlock
            title="Diferencia rápida"
            body="Sistemas se apoya más en lógica y programación temprana. Industrial combina matemática, procesos y gestión."
          />
          <p className="insight-copy">{first.insight}</p>
        </Surface>
      </>
    );
  }

  if (tab === "Intensidad") {
    return (
      <div className="compare-columns">
        {careersToCompare.map((career) => (
          <Surface key={career.id}>
            <h3>{career.name}</h3>
            <IntensityBar
              label="Matemática"
              value={career.intensity.mathematics}
            />
            <IntensityBar
              label="Programación"
              value={career.intensity.programming}
              accent="var(--teal)"
            />
            <IntensityBar
              label="Gestión"
              value={career.intensity.management}
              accent="var(--lime)"
            />
            <IntensityBar
              label="Comunicación"
              value={career.intensity.communication}
              accent="var(--sky)"
            />
            <IntensityBar
              label="Pensamiento lógico"
              value={career.intensity.logic}
              accent="var(--blue-strong)"
            />
          </Surface>
        ))}
      </div>
    );
  }

  if (tab === "Primer ciclo") {
    return (
      <div className="compare-columns">
        {careersToCompare.map((career) => (
          <Surface key={career.id}>
            <h3>{career.name}</h3>
            <div className="course-stack">
              {career.courses.map((course) => (
                <div
                  key={course.id}
                  className="course-compact"
                  onClick={() => navigate(`/course/${course.id}`)}
                  role="button"
                  tabIndex={0}
                >
                  <div>
                    <span className="badge badge--soft">{course.cycle}</span>
                    <strong>{course.name}</strong>
                    <p>{course.explanation}</p>
                  </div>
                  <ChevronRight size={16} />
                </div>
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
          <Surface key={career.id}>
            <h3>{career.name}</h3>

            <div className="chip-row">
              {career.skills.map((skill) => (
                <span key={skill} className="mini-chip">
                  {skill}
                </span>
              ))}
            </div>

            <div className="detail-list">
              <strong>Fortalezas</strong>
              {career.strengths.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </Surface>
        ))}
      </div>
    );
  }

  return (
    <Surface>
      <ScreenTitleBlock
        title="Insight final"
        body="No se trata de decirte qué elegir, sino de ayudarte a conversar mejor."
      />
      <p className="insight-copy">
        {first.insight} {second.insight}
      </p>
    </Surface>
  );
}
