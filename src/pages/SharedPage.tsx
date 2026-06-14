import { useEffect, useState } from "react";
import { Link2, ShieldAlert, Sparkles } from "lucide-react";
import { useParams } from "react-router-dom";
import { AppFrame, EmptyState, Surface } from "../components/ui";
import { shareService } from "../services/shareService";
import type { SharedSummaryDto } from "../types/api";

function getAudienceLabel(value: SharedSummaryDto["audience"]) {
  if (value === "family") return "Familia";
  if (value === "advisor") return "Asesor";
  return "Demo";
}

export default function SharedPage() {
  const { token } = useParams();
  const [summary, setSummary] = useState<SharedSummaryDto | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadSummary() {
      try {
        setLoading(true);
        setError(null);

        if (!token) {
          throw new Error("Link invalido.");
        }

        const result = await shareService.getSharedSummary(token);

        if (active) {
          setSummary(result);
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : "No se pudo abrir.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadSummary();

    return () => {
      active = false;
    };
  }, [token]);

  if (loading) {
    return (
      <AppFrame title="Abriendo..." subtitle="Validando link.">
        <Surface className="surface--stack">
          <div className="skeleton-line skeleton-line--title" />
          <div className="skeleton-line" />
          <div className="skeleton-box" />
        </Surface>
      </AppFrame>
    );
  }

  if (error || !summary) {
    return (
      <AppFrame title="No abre" subtitle={error ?? "Link vencido."}>
        <Surface>
          <EmptyState
            title="Pide otro link"
            body="El resumen ya no esta disponible."
            icon={<ShieldAlert size={22} />}
          />
        </Surface>
      </AppFrame>
    );
  }

  return (
    <AppFrame
      title="Resumen compartido"
      subtitle={getAudienceLabel(summary.audience)}
      progress={100}
    >
      <Surface className="surface--stack">
        <div className="share-card share-card--premium share-card--compact">
          <div className="share-card__header">
            <div>
              <span className="brand brand--card">UTP Match</span>
              <p>Vista compartida</p>
            </div>
            <div className="share-card__date">{summary.status}</div>
          </div>

          <div className="shared-hero">
            <span className="quiz-result-icon">
              <Link2 size={22} />
            </span>
            <div>
              <span className="badge badge--soft">Compartido</span>
              <h2>{summary.title}</h2>
            </div>
          </div>

          <Surface className="summary-snap">
            <h3>Clave</h3>
            <p>{summary.summary}</p>
          </Surface>

          <div className="share-footer-note">
            <Sparkles size={14} />
            <p>Esto orienta. La decision final es del estudiante.</p>
          </div>
        </div>
      </Surface>
    </AppFrame>
  );
}
