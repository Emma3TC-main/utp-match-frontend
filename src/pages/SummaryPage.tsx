import { Sparkles } from "lucide-react";
import {
  AppFrame,
  PrimaryButton,
  SecondaryButton,
  Surface,
} from "../components/ui";
import { careers } from "../data/demo";
import { useAppContext } from "../state/appState";

function getTodayLabel() {
  return new Date().toLocaleDateString("es-PE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function SummaryPage() {
  const { profile, selectedCareers } = useAppContext();
  const selectedCareer =
    careers.find((career) => career.id === selectedCareers[0]) ?? careers[0];
  const today = getTodayLabel();

  const downloadSummary = () => {
    const content = [
      "UTP Match",
      profile.name,
      `Carrera recomendada: ${selectedCareer.name}`,
      `Match: ${selectedCareer.match}%`,
      `Fecha: ${today}`,
    ].join("\n");

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = "utp-match-resumen.txt";
    anchor.click();

    window.URL.revokeObjectURL(url);
  };

  const shareSummary = () => {
    const text =
      "Mi decisión aún puede tener dudas, pero ahora tengo razones claras para conversar.\n\nUTP Match / SyllabusX";
    window.open(
      `https://wa.me/?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <AppFrame
      title="Resumen de Perfil"
      subtitle="Un análisis detallado de tu futuro profesional."
      progress={100}
    >
      <Surface className="surface--stack">
        <div className="share-card share-card--premium">
          <div className="share-card__header">
            <div>
              <span className="brand brand--card">UTP Match</span>
              <p>Reporte de orientación vocacional</p>
            </div>

            <div className="share-card__date">{today}</div>
          </div>

          <div className="share-card__title-row">
            <div>
              <span className="badge badge--soft">Recomendación principal</span>
              <h2>{selectedCareer.name}</h2>
              <p>{selectedCareer.insight}</p>
            </div>

            <div className="share-card__match share-card__match--highlight">
              <div className="match-ring">{selectedCareer.match}%</div>
              <span className="match-label">MATCH</span>
            </div>
          </div>

          <div className="share-grid">
            <Surface>
              <h3>¿Por qué encaja?</h3>
              <p>
                Alta capacidad de abstracción, afinidad con entornos
                tecnológicos e interés genuino por cómo funcionan los sistemas
                digitales.
              </p>
            </Surface>

            <Surface>
              <h3>Tus habilidades clave</h3>
              <div className="chip-row">
                {profile.skills.map((skill) => (
                  <span key={skill} className="mini-chip">
                    {skill}
                  </span>
                ))}
              </div>
            </Surface>
          </div>

          <Surface>
            <h3>Próximos pasos</h3>
            <div className="question-list">
              <span>Revisar malla curricular</span>
              <span>Agendar visita al campus</span>
            </div>
          </Surface>

          <div className="share-footer-note">
            <Sparkles size={14} />
            <p>
              “Este resultado no decide por ti; te ayuda a conversar mejor sobre
              tus intereses y fortalezas.”
            </p>
          </div>
        </div>
      </Surface>

      <div className="stack-actions stack-actions--summary">
        <PrimaryButton onClick={shareSummary}>
          Compartir por WhatsApp
        </PrimaryButton>
        <SecondaryButton onClick={downloadSummary}>
          Descargar resumen
        </SecondaryButton>
      </div>
    </AppFrame>
  );
}
