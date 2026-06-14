import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppFrame,
  CareerCard,
  Chip,
  EmptyState,
  PrimaryButton,
  SecondaryButton,
  StickyCTA,
  Surface,
} from "../components/ui";
import { useCareers } from "../hooks/useCareers";
import { useAppContext } from "../state/appState";

const CAREER_FILTERS = [
  "Todas",
  "Ingeniería",
  "Negocios",
  "Salud",
  "Derecho",
  "Psicología",
];

export default function SelectorPage() {
  const navigate = useNavigate();
  const { selectedCareers, toggleCareer } = useAppContext();

  const { data: careers, loading, error } = useCareers();

  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("Todas");

  const filteredCareers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const normalizedFilter = filter.toLowerCase();

    return careers.filter((career) => {
      const matchQuery = `${career.name} ${career.area}`
        .toLowerCase()
        .includes(normalizedQuery);

      const matchFilter =
        filter === "Todas" ||
        career.area.toLowerCase().includes(normalizedFilter) ||
        career.badge?.toLowerCase().includes(normalizedFilter);

      return matchQuery && matchFilter;
    });
  }, [careers, query, filter]);

  const canCompare = selectedCareers.length === 2;

  if (loading) {
    return (
      <AppFrame
        title="Cargando carreras..."
        subtitle="Estamos preparando el catálogo para ti."
        progress={60}
      >
        <Surface className="surface--stack">
          <div className="skeleton-line skeleton-line--title" />
          <div className="skeleton-line" />
          <div className="skeleton-grid">
            <div className="skeleton-box" />
            <div className="skeleton-box" />
          </div>
        </Surface>
      </AppFrame>
    );
  }

  if (error) {
    return (
      <AppFrame
        title="No pudimos cargar las carreras"
        subtitle={error}
        progress={60}
      >
        <Surface className="surface--stack">
          <p>Intenta nuevamente en unos segundos.</p>

          <SecondaryButton onClick={() => window.location.reload()}>
            Recargar catálogo
          </SecondaryButton>
        </Surface>
      </AppFrame>
    );
  }

  return (
    <AppFrame
      title="Selecciona dos carreras que te llamen la atención."
      subtitle="Compara planes de estudio, demanda laboral y puntaje de afinidad."
      progress={60}
    >
      <Surface className="surface--stack">
        <div className="sticky-search">
          <label className="search-box">
            <Search size={16} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar carrera..."
            />
          </label>

          <div className="chip-row chip-row--scroll">
            {CAREER_FILTERS.map((item) => (
              <Chip
                key={item}
                active={filter === item}
                onClick={() => setFilter(item)}
              >
                {item}
              </Chip>
            ))}
          </div>
        </div>

        {selectedCareers.length > 0 ? (
          <div className="selection-summary">
            <div>
              <span className="eyebrow">Comparando</span>
              <strong>{selectedCareers.length} de 2 seleccionadas</strong>
            </div>

            <div className="selection-summary__chips">
              {selectedCareers.map((careerId) => {
                const career = careers.find((item) => item.id === careerId);

                return (
                  <span key={careerId} className="mini-chip mini-chip--active">
                    {career?.name ?? "Carrera seleccionada"}
                  </span>
                );
              })}
            </div>
          </div>
        ) : (
          <EmptyState
            title="Aún no seleccionaste carreras."
            body="Elige dos opciones para empezar a comparar."
            action={
              <SecondaryButton onClick={() => setQuery("")}>
                Explorar carreras
              </SecondaryButton>
            }
          />
        )}

        <div className="career-list">
          {filteredCareers.map((career) => (
            <CareerCard
              key={career.id}
              career={career}
              selected={selectedCareers.includes(career.id)}
              onSelect={() => toggleCareer(career.id)}
            />
          ))}
        </div>
      </Surface>

      <StickyCTA
        left={<span>Seleccionaste {selectedCareers.length} de 2</span>}
        right={
          <PrimaryButton
            disabled={!canCompare}
            onClick={() => navigate("/compare/result")}
          >
            {canCompare ? "Comparar ahora" : "Selecciona 2 carreras"}
          </PrimaryButton>
        }
      />
    </AppFrame>
  );
}
