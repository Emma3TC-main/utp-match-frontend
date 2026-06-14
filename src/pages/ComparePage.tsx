import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppFrame,
  Chip,
  PrimaryButton,
  StickyCTA,
  Surface,
} from "../components/ui";
import { careers, comparisonTabs } from "../data/demo";
import { useAppContext } from "../state/appState";
import type { CareerViewModel, ComparisonTab } from "../types/domain";
import CompareHero from "./compare/CompareHero";
import CompareTabPanel from "./compare/CompareTabPanel";

function findCareer(
  id: string | undefined,
  fallbackIndex: number,
): CareerViewModel {
  return careers.find((career) => career.id === id) ?? careers[fallbackIndex];
}

export default function ComparePage() {
  const navigate = useNavigate();

  const { selectedCareers, selectedComparisonTab, setComparisonTab } =
    useAppContext();

  const [selectedTab, setSelectedTab] = useState<ComparisonTab>(
    selectedComparisonTab,
  );

  useEffect(() => {
    setComparisonTab(selectedTab);
  }, [selectedTab, setComparisonTab]);

  const first = findCareer(selectedCareers[0], 0);
  const second = findCareer(selectedCareers[1], 1);

  return (
    <AppFrame
      title={`${first.name} vs. ${second.name}`}
      subtitle="Compara con evidencia, no solo con opiniones."
      progress={72}
    >
      <Surface className="surface--stack">
        <CompareHero first={first} second={second} />

        <div className="tab-row">
          {comparisonTabs.map((tab) => (
            <Chip
              key={tab}
              active={selectedTab === tab}
              onClick={() => setSelectedTab(tab)}
            >
              {tab}
            </Chip>
          ))}
        </div>

        <CompareTabPanel tab={selectedTab} first={first} second={second} />
      </Surface>

      <StickyCTA
        left={<span>Tu siguiente paso</span>}
        right={
          <PrimaryButton onClick={() => navigate("/match")}>
            Ver match con mi perfil
          </PrimaryButton>
        }
      />
    </AppFrame>
  );
}
