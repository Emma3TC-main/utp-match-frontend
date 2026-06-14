import {
  AlertCircle,
  BrainCircuit,
  GitCompareArrows,
  Layers3,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppFrame,
  Chip,
  PrimaryButton,
  SecondaryButton,
  StickyCTA,
  Surface,
} from "../components/ui";
import { useCareers } from "../hooks/useCareers";
import { useCreateComparison } from "../hooks/useCreateComparison";
import { useAppContext } from "../state/appState";
import type { CareerViewModel, ComparisonTab } from "../types/domain";
import CompareHero from "./compare/CompareHero";
import CompareTabPanel from "./compare/CompareTabPanel";

const comparisonTabs: Array<{
  label: ComparisonTab;
  icon: typeof Target;
}> = [
  { label: "Resumen", icon: Target },
  { label: "Intensidad", icon: Zap },
  { label: "Primer ciclo", icon: Layers3 },
  { label: "Habilidades", icon: BrainCircuit },
  { label: "Insights", icon: Sparkles },
];

function findCareer(
  careers: CareerViewModel[],
  id: string | undefined,
  fallbackIndex: number,
): CareerViewModel {
  return careers.find((career) => career.id === id) ?? careers[fallbackIndex];
}

function getCompatibilityLabel(match: number): string {
  if (match >= 85) return "Alta compatibilidad";
  if (match >= 70) return "Buena opcion";
  return "Explora mas";
}

export default function ComparePage() {
  const navigate = useNavigate();
  const {
    profile,
    selectedCareers,
    selectedComparisonTab,
    setComparisonId,
    setComparisonTab,
  } = useAppContext();
  const { data: careers, loading, error } = useCareers();
  const {
    data: comparison,
    error: comparisonError,
    loading: creatingComparison,
    mutate: createComparison,
  } = useCreateComparison();
  const [selectedTab, setSelectedTab] = useState<ComparisonTab>(
    selectedComparisonTab,
  );

  useEffect(() => {
    setComparisonTab(selectedTab);
  }, [selectedTab, setComparisonTab]);

  const canRenderComparison = !loading && !error && careers.length >= 2;
  const first = canRenderComparison
    ? findCareer(careers, selectedCareers[0], 0)
    : null;
  const second = canRenderComparison
    ? findCareer(careers, selectedCareers[1], 1)
    : null;

  useEffect(() => {
    let active = true;

    async function run() {
      if (!first || !second) return;

      const result = await createComparison({
        studentProfileId: profile.id,
        firstCareer: first,
        secondCareer: second,
      });

      if (active) {
        setComparisonId(result.comparisonId);
      }
    }

    run().catch(() => undefined);

    return () => {
      active = false;
    };
  }, [createComparison, first, profile.id, second, setComparisonId]);

  if (loading) {
    return (
      <AppFrame title="Comparando..." subtitle="Preparando vista." progress={72}>
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

  if (error || careers.length < 2) {
    return (
      <AppFrame
        title="Revisa esto"
        subtitle={error ?? "Necesitas dos carreras."}
        progress={72}
      >
        <Surface className="surface--stack post-empty-state">
          <AlertCircle size={34} />
          <strong>Elige dos opciones</strong>
          <p>Vuelve al catalogo y compara otra vez.</p>
          <SecondaryButton onClick={() => navigate("/compare")}>
            Volver
          </SecondaryButton>
        </Surface>
      </AppFrame>
    );
  }

  if (!first || !second) return null;

  return (
    <AppFrame
      title="Resultado"
      subtitle={`${first.name} vs. ${second.name}`}
      progress={72}
    >
      <Surface className="surface--stack compare-result-shell">
        <div className="post-section-title">
          <span>
            <GitCompareArrows size={18} />
          </span>
          <div>
            <strong>Comparacion lista</strong>
            <p>Elige que revisar primero.</p>
          </div>
        </div>

        <CompareHero first={first} second={second} />

        <div className="compare-match-strip">
          {[first, second].map((career) => (
            <div key={career.id} className="compare-match-card">
              <span className="badge badge--soft">
                {getCompatibilityLabel(career.match)}
              </span>
              <strong>{career.match}%</strong>
              <p>{career.name}</p>
              <div className="mini-progress">
                <span style={{ width: `${career.match}%` }} />
              </div>
            </div>
          ))}
        </div>

        {creatingComparison ? (
          <Surface className="surface--pulse post-inline-status">
            <Sparkles size={18} />
            <p>IA comparando...</p>
          </Surface>
        ) : null}

        {comparisonError ? (
          <Surface className="surface--alert post-inline-status">
            <AlertCircle size={18} />
            <p>{comparisonError}</p>
          </Surface>
        ) : null}

        {comparison?.summary ? (
          <Surface className="summary-snap summary-snap--visual">
            <span className="badge badge--soft">
              <Sparkles size={13} />
              Resumen IA
            </span>
            <p>{comparison.summary}</p>
          </Surface>
        ) : null}

        <div className="tab-row tab-row--icon">
          {comparisonTabs.map(({ label, icon: Icon }) => (
            <Chip
              key={label}
              active={selectedTab === label}
              onClick={() => setSelectedTab(label)}
            >
              <Icon size={14} />
              {label}
            </Chip>
          ))}
        </div>

        <CompareTabPanel tab={selectedTab} first={first} second={second} />
      </Surface>

      <StickyCTA
        left={<span>Siguiente paso</span>}
        right={
          <PrimaryButton onClick={() => navigate("/match")}>
            Ver match <Target size={16} />
          </PrimaryButton>
        }
      />
    </AppFrame>
  );
}
