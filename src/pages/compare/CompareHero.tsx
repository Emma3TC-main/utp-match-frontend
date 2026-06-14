import type { CareerViewModel } from "../../types/domain";

type CompareHeroProps = {
  first: CareerViewModel;
  second: CareerViewModel;
};

export default function CompareHero({ first, second }: CompareHeroProps) {
  return (
    <div className="compare-hero">
      <div className="career-summary">
        <span className="badge badge--area">{first.area}</span>
        <h3>{first.name}</h3>
        <p>{first.description}</p>
      </div>

      <div className="vs-pill">VS</div>

      <div className="career-summary career-summary--right">
        <span className="badge badge--area">{second.area}</span>
        <h3>{second.name}</h3>
        <p>{second.description}</p>
      </div>
    </div>
  );
}
