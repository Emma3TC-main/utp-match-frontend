import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  BookOpen,
  CheckCircle2,
  Database,
  FileText,
  ShieldCheck,
} from "lucide-react";
import { AppFrame, EmptyState, Surface } from "../components/ui";
import { adminService, type AdminOverview } from "../services/adminService";

function formatDate(value: string | null): string {
  if (!value) {
    return "Ahora";
  }

  return new Date(value).toLocaleDateString("es-PE", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminPage() {
  const [overview, setOverview] = useState<AdminOverview | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadOverview() {
      try {
        setLoading(true);
        setError(null);
        const data = await adminService.getOverview();

        if (active) {
          setOverview(data);
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

    loadOverview();

    return () => {
      active = false;
    };
  }, []);

  const cards = useMemo(() => {
    if (!overview) {
      return [];
    }

    return [
      {
        label: "Registros",
        value: overview.totals.records,
        icon: <Database size={18} />,
      },
      {
        label: "Carreras",
        value: overview.totals.careers,
        icon: <BookOpen size={18} />,
      },
      {
        label: "Silabos",
        value: overview.totals.syllabi,
        icon: <FileText size={18} />,
      },
      {
        label: "Auditoria",
        value: overview.totals.auditEvents,
        icon: <Activity size={18} />,
      },
    ];
  }, [overview]);

  const statusRows = overview
    ? [
        ["Borradores", overview.byStatus.draft],
        ["Publicados", overview.byStatus.published],
        ["Archivados", overview.byStatus.archived],
      ]
    : [];

  return (
    <AppFrame
      title="Admin"
      subtitle="Catalogo real del backend."
      progress={38}
    >
      <Surface className="surface--stack admin-dashboard">
        <div className="admin-hero">
          <span className="quiz-pill">
            <ShieldCheck size={15} />
            Backend
          </span>
          <div>
            <h2>Estado del catalogo</h2>
            <p>{overview ? `Actualizado: ${formatDate(overview.lastUpdatedAt)}` : "Cargando..."}</p>
          </div>
        </div>

        {loading ? (
          <div className="admin-kpi-grid">
            <div className="skeleton-box" />
            <div className="skeleton-box" />
            <div className="skeleton-box" />
            <div className="skeleton-box" />
          </div>
        ) : null}

        {error ? (
          <EmptyState
            title="Revisa esto"
            body={error}
            icon={<ShieldCheck size={22} />}
          />
        ) : null}

        {!loading && !error ? (
          <>
            <div className="admin-kpi-grid">
              {cards.map((card) => (
                <div key={card.label} className="admin-kpi-card">
                  <span>{card.icon}</span>
                  <strong>{card.value}</strong>
                  <p>{card.label}</p>
                </div>
              ))}
            </div>

            <Surface className="surface--stack admin-status-card">
              <h3>Publicacion</h3>
              <div className="catalog-list">
                {statusRows.map(([label, value]) => (
                  <div key={label} className="catalog-row catalog-row--visual">
                    <div>
                      <strong>{label}</strong>
                      <p>{value}</p>
                    </div>

                    <CheckCircle2 size={18} />
                  </div>
                ))}
              </div>
            </Surface>

            <div className="admin-note">
              <span>Solo lectura</span>
              <p>Crear/editar catalogo necesita endpoints admin completos.</p>
            </div>
          </>
        ) : null}
      </Surface>
    </AppFrame>
  );
}
