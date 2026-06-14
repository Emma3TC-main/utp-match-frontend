import { useNavigate } from "react-router-dom";
import {
  AppFrame,
  MatchScore,
  PrimaryButton,
  StickyCTA,
  Surface,
} from "../components/ui";
import { careers } from "../data/demo";
import { useAppContext } from "../state/appState";

const DEFAULT_SELECTED_CAREERS = ["systems", "industrial"];

export default function MatchPage() {
  const navigate = useNavigate();
  const { selectedCareers } = useAppContext();
  const selected = selectedCareers.length
    ? selectedCareers
    : DEFAULT_SELECTED_CAREERS;

  return (
    <AppFrame
      title="Tu Match Perfecto"
      subtitle="Este resultado no decide por ti; te ayuda a conversar mejor."
      progress={88}
    >
      <Surface className="surface--stack">
        <div className="match-intro">
          <div>
            <span className="eyebrow">Personalizado para ti</span>
            <h2>Elige con más claridad, no con más presión.</h2>
            <p>
              Te mostramos fortalezas, riesgos y preguntas para decidir con más
              confianza.
            </p>
          </div>
        </div>

        <div className="match-grid">
          {selected.map((careerId) => {
            const career =
              careers.find((item) => item.id === careerId) ?? careers[0];

            return (
              <Surface key={career.id}>
                <div className="match-grid__head">
                  <div>
                    <span className="badge badge--area">{career.area}</span>
                    <h3>{career.name}</h3>
                  </div>
                  <div className="match-grid__score">{career.match}%</div>
                </div>

                <MatchScore career={career} />

                <div className="detail-list detail-list--split">
                  <strong>Fortalezas</strong>
                  {career.strengths.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>

                <div className="detail-list detail-list--split detail-list--danger">
                  <strong>Riesgos a reforzar</strong>
                  {career.risks.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </Surface>
            );
          })}
        </div>

        <Surface>
          <h3>Preguntas para decidir mejor</h3>
          <div className="question-list">
            <span>¿Te motiva más construir tecnología o mejorar procesos?</span>
            <span>¿Te ves practicando programación cada semana?</span>
            <span>¿Te gusta coordinar personas y recursos?</span>
          </div>
        </Surface>
      </Surface>

      <StickyCTA
        left={<span>Próximo paso</span>}
        right={
          <PrimaryButton onClick={() => navigate("/plan")}>
            Crear mi plan
          </PrimaryButton>
        }
      />
    </AppFrame>
  );
}
