import {
  AlertCircle,
  Download,
  MessageCircle,
  Share2,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import {
  AppFrame,
  PrimaryButton,
  SecondaryButton,
  StatusToast,
  Surface,
} from "../components/ui";
import { useCareers } from "../hooks/useCareers";
import { shareService } from "../services/shareService";
import { useAppContext } from "../state/appState";

function getTodayLabel() {
  return new Date().toLocaleDateString("es-PE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function compact(value: string, max = 150): string {
  if (value.length <= max) return value;
  return `${value.slice(0, max - 3).trim()}...`;
}

export default function SummaryPage() {
  const {
    comparisonId,
    authUser,
    planId,
    profile,
    selectedCareers,
    setShareUrl,
    shareUrl,
    vocationalReportId,
  } = useAppContext();
  const { data: careers, loading, error } = useCareers();
  const [sharing, setSharing] = useState(false);
  const [shareError, setShareError] = useState<string | null>(null);
  const [shared, setShared] = useState(false);
  const today = getTodayLabel();

  const selectedCareer =
    careers.find((career) => career.id === selectedCareers[0]) ?? careers[0];

  const downloadSummary = () => {
    if (!selectedCareer) return;

    const content = [
      "UTP Match",
      profile.name || "Estudiante",
      `Carrera: ${selectedCareer.name}`,
      `Match: ${selectedCareer.match}%`,
      `Fecha: ${today}`,
      shareUrl ? `Link: ${shareUrl}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = "utp-match-resumen.txt";
    anchor.click();
    window.URL.revokeObjectURL(url);
  };

  const shareSummary = async () => {
    setShareError(null);

    if (!comparisonId && !planId && !vocationalReportId) {
      setShareError("Primero crea una comparacion o plan.");
      return;
    }

    const ownerProfileId = profile.id ?? authUser?.studentProfileId ?? undefined;

    if (!ownerProfileId) {
      setShareError("Crea tu perfil primero.");
      return;
    }

    try {
      setSharing(true);
      const share = await shareService.createShare({
        ownerProfileId,
        comparisonId: comparisonId ?? null,
        planId: planId ?? null,
        vocationalReportId: vocationalReportId ?? null,
        audience: "family",
        title: "Resumen UTP Match",
        summary: selectedCareer?.insight ?? "Resumen generado por UTP Match.",
      });

      setShareUrl(share.shareUrl);
      setShared(true);
      window.open(
        `https://wa.me/?text=${encodeURIComponent(
          `Te comparto mi resumen de UTP Match: ${share.shareUrl}`,
        )}`,
        "_blank",
        "noopener,noreferrer",
      );
    } catch (err) {
      setShareError(err instanceof Error ? err.message : "No se pudo.");
    } finally {
      setSharing(false);
    }
  };

  if (loading) {
    return (
      <AppFrame title="Resumen..." subtitle="Preparando tarjeta." progress={100}>
        <Surface className="surface--stack">
          <div className="skeleton-line skeleton-line--title" />
          <div className="skeleton-line" />
        </Surface>
      </AppFrame>
    );
  }

  if (error || !selectedCareer) {
    return (
      <AppFrame
        title="No se pudo"
        subtitle={error ?? "No hay carrera elegida."}
        progress={100}
      >
        <Surface className="surface--stack post-empty-state">
          <AlertCircle size={34} />
          <strong>Elige una carrera</strong>
          <p>Compara dos opciones y vuelve aqui.</p>
        </Surface>
      </AppFrame>
    );
  }

  return (
    <AppFrame title="Resumen" subtitle="Listo para compartir." progress={100}>
      <Surface className="surface--stack">
        <div className="share-card share-card--premium share-card--compact share-card--visual">
          <div className="share-card__header">
            <div>
              <span className="brand brand--card">UTP Match</span>
              <p>Tu ruta sugerida</p>
            </div>

            <div className="share-card__date">{today}</div>
          </div>

          <div className="share-card__title-row">
            <div>
              <span className="badge badge--soft">
                <Sparkles size={13} />
                Te puede gustar
              </span>
              <h2>{selectedCareer.name}</h2>
              <p>{compact(selectedCareer.insight)}</p>
            </div>

            <div className="share-card__match share-card__match--highlight">
              <div className="match-ring">{selectedCareer.match}%</div>
              <span className="match-label">MATCH</span>
            </div>
          </div>

          <div className="share-grid">
            <Surface className="visual-panel">
              <div className="post-section-title post-section-title--small">
                <span>
                  <Target size={17} />
                </span>
                <div>
                  <strong>Por que</strong>
                  <p>{compact(selectedCareer.description, 120)}</p>
                </div>
              </div>
            </Surface>

            <Surface className="visual-panel">
              <div className="post-section-title post-section-title--small">
                <span>
                  <TrendingUp size={17} />
                </span>
                <div>
                  <strong>Claves</strong>
                  <p>Lo que destaca.</p>
                </div>
              </div>
              <div className="chip-row">
                {(profile.skills.length > 0
                  ? profile.skills
                  : selectedCareer.skills.slice(0, 4)
                ).map((skill) => (
                  <span key={skill} className="mini-chip mini-chip--visual">
                    <Sparkles size={12} />
                    {skill}
                  </span>
                ))}
              </div>
            </Surface>
          </div>

          <Surface className="summary-snap summary-snap--visual">
            <span className="badge badge--soft">
              <MessageCircle size={13} />
              Sigue
            </span>
            <div className="question-list question-list--icon">
              <span>
                <Target size={14} />
                Revisar malla
              </span>
              <span>
                <TrendingUp size={14} />
                Completar plan
              </span>
              <span>
                <MessageCircle size={14} />
                Conversar en casa
              </span>
            </div>
          </Surface>

          {shareUrl ? (
            <Surface className="summary-snap summary-snap--visual">
              <span className="badge badge--soft">
                <Share2 size={13} />
                Link
              </span>
              <p>{shareUrl}</p>
            </Surface>
          ) : null}

          <div className="share-footer-note">
            <Sparkles size={14} />
            <p>Esto orienta. Tu decides.</p>
          </div>
        </div>
      </Surface>

      {shared ? <StatusToast title="Listo" body="Link creado." /> : null}

      {shareError ? (
        <StatusToast title="Revisa esto" body={shareError} tone="warning" />
      ) : null}

      <div className="stack-actions stack-actions--summary">
        <PrimaryButton onClick={shareSummary} loading={sharing}>
          <Share2 size={16} />
          WhatsApp
        </PrimaryButton>
        <SecondaryButton onClick={downloadSummary}>
          <Download size={16} />
          Descargar
        </SecondaryButton>
      </div>
    </AppFrame>
  );
}
