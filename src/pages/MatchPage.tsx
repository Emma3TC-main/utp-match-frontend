import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  Lightbulb,
  ShieldAlert,
  Target,
  TrendingUp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  AppFrame,
  MatchScore,
  PrimaryButton,
  SecondaryButton,
  StickyCTA,
  Surface,
} from "../components/ui";
import { useCareers } from "../hooks/useCareers";
import { useAppContext } from "../state/appState";
import type { CareerViewModel } from "../types/domain";

export default function MatchPage() {
  const navigate = useNavigate();
  const { authUser, profile, selectedCareers } = useAppContext();
  const { data: careers, loading, error } = useCareers();

  if (loading) {
    return (
      <AppFrame title="Calculando..." subtitle="Buscando tu match." progress={88}>
        <Surface className="surface--stack">
          <div className="compare-loading-grid">
            <div className="skeleton-box" />
            <div className="skeleton-box" />
          </div>
          <div className="skeleton-line" />
        </Surface>
      </AppFrame>
    );
  }

  if (error || careers.length === 0) {
    return (
      <AppFrame
        title="No se pudo"
        subtitle={error ?? "No hay carreras disponibles."}
        progress={88}
      >
        <Surface className="surface--stack post-empty-state">
          <AlertCircle size={34} />
          <strong>Elige otra vez</strong>
          <p>Vuelve al catalogo y selecciona dos carreras.</p>
          <SecondaryButton onClick={() => navigate("/compare")}>
            Volver
          </SecondaryButton>
        </Surface>
      </AppFrame>
    );
  }

  const validIds = new Set(careers.map((career) => career.id));
  const selected = Array.from(new Set(selectedCareers)).filter((careerId) =>
    validIds.has(careerId),
  );
  const careersToShow =
    selected.length > 0
      ? selected
          .map((careerId) => careers.find((career) => career.id === careerId))
          .filter((career): career is CareerViewModel => Boolean(career))
      : careers.slice(0, 2);
  const hasProfile = Boolean(profile.id ?? authUser?.studentProfileId);
  const bestCareer = careersToShow
    .slice()
    .sort((a, b) => b.match - a.match)[0];

  return (
    <AppFrame title="Tu match" subtitle="Elige con señales claras." progress={88}>
      <Surface className="surface--stack match-result-shell">
        <div className="post-section-title">
          <span>
            <Target size={18} />
          </span>
          <div>
            <strong>Tu mejor match</strong>
            <p>{bestCareer?.name ?? "Carrera sugerida"}</p>
          </div>
        </div>

        <div className="match-grid match-grid--visual">
          {careersToShow.map((career) => (
            <Surface key={career.id} className="match-card-lite match-card-lite--visual">
              <div className="match-grid__head">
                <div>
                  <span className="badge badge--area">{career.area}</span>
                  <h3>{career.name}</h3>
                </div>
                <div className="match-grid__score">
                  <TrendingUp size={16} />
                  {career.match}%
                </div>
              </div>

              <MatchScore career={career} />

              <div className="detail-list detail-list--split detail-list--icon">
                <strong>
                  <CheckCircle2 size={15} />
                  Fuerte
                </strong>
                {career.strengths.slice(0, 3).map((item) => (
                  <span key={item}>
                    <CheckCircle2 size={14} />
                    {item}
                  </span>
                ))}
              </div>

              <div className="detail-list detail-list--split detail-list--danger detail-list--icon">
                <strong>
                  <ShieldAlert size={15} />
                  Reforzar
                </strong>
                {career.risks.slice(0, 3).map((item) => (
                  <span key={item}>
                    <ShieldAlert size={14} />
                    {item}
                  </span>
                ))}
              </div>
            </Surface>
          ))}
        </div>

        <Surface className="question-snap question-snap--visual">
          <div className="post-section-title post-section-title--small">
            <span>
              <HelpCircle size={17} />
            </span>
            <div>
              <strong>Piensa rapido</strong>
              <p>Responde mentalmente antes del plan.</p>
            </div>
          </div>
          <div className="question-list question-list--icon">
            <span>
              <Lightbulb size={14} />
              Que practicarias cada semana?
            </span>
            <span>
              <Lightbulb size={14} />
              Que duda necesitas resolver?
            </span>
            <span>
              <Lightbulb size={14} />
              Con quien lo conversarias?
            </span>
          </div>
        </Surface>
      </Surface>

      <StickyCTA
        left={<span>Siguiente paso</span>}
        right={
          <PrimaryButton onClick={() => navigate(hasProfile ? "/plan" : "/onboarding")}>
            {hasProfile ? "Crear plan" : "Terminar perfil"}
            <ArrowRight size={16} />
          </PrimaryButton>
        }
      />
    </AppFrame>
  );
}
