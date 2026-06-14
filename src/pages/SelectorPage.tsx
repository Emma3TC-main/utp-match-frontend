import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
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
  "Ingenieria",
  "Negocios",
  "Salud",
  "Derecho",
  "Psicologia",
];

export default function SelectorPage() {
  const navigate = useNavigate();
  const { selectedCareers, setSelectedCareers, toggleCareer } = useAppContext();
  const { data: careers, loading, error } = useCareers();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("Todas");

  useEffect(() => {
    if (loading) {
      return;
    }

    const validIds = new Set(careers.map((career) => career.id));
    const validSelection = selectedCareers.filter((careerId) =>
      validIds.has(careerId),
    );

    if (validSelection.length !== selectedCareers.length) {
      setSelectedCareers(validSelection);
    }
  }, [careers, loading, selectedCareers, setSelectedCareers]);

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
      <AppFrame title="Cargando..." subtitle="Preparando carreras." progress={60}>
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
      <AppFrame title="No cargo" subtitle={error} progress={60}>
        <Surface className="surface--stack">
          <p>Intenta otra vez.</p>
          <SecondaryButton onClick={() => window.location.reload()}>
            Recargar
          </SecondaryButton>
        </Surface>
      </AppFrame>
    );
  }

  return (
    <AppFrame title="Elige 2 carreras." subtitle="Toca, compara y decide." progress={60}>
      <Surface className="surface--stack">
        <div className="sticky-search">
          <label className="search-box">
            <Search size={16} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar..."
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
          <div className="selection-summary selection-summary--visual">
            <div>
              <span className="eyebrow">Listo</span>
              <strong>{selectedCareers.length}/2 elegidas</strong>
            </div>

            <div className="selection-summary__chips">
              {selectedCareers.map((careerId) => {
                const career = careers.find((item) => item.id === careerId);

                return (
                  <span key={careerId} className="mini-chip mini-chip--active">
                    {career?.name ?? "Seleccionada"}
                  </span>
                );
              })}
            </div>
          </div>
        ) : (
          <EmptyState
            title="Elige una."
            body="Necesitas 2 para comparar."
            action={
              <SecondaryButton onClick={() => setQuery("")}>
                Explorar
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
        left={<span>{selectedCareers.length}/2 elegidas</span>}
        right={
          <PrimaryButton
            disabled={!canCompare}
            onClick={() => navigate("/compare/result")}
          >
            {canCompare ? "Comparar" : "Elige 2"}
          </PrimaryButton>
        }
      />
    </AppFrame>
  );
}
