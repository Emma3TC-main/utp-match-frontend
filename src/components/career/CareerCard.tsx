import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import type { CareerViewModel } from "../../types/domain";
import { PrimaryButton } from "../../components/common/PrimaryButton";
import { generateCareerImage } from "./careerImage";

type CareerCardProps = {
  career: CareerViewModel;
  selected: boolean;
  onSelect: () => void;
};

type CareerCardStyle = CSSProperties & {
  "--match": string;
};

export function CareerCard({ career, selected, onSelect }: CareerCardProps) {
  return (
    <motion.article
      whileTap={{ scale: 0.985 }}
      className={`career-card career-card--${career.id} ${
        selected ? "career-card--selected" : ""
      }`}
    >
      <div
        className="career-card__media"
        style={{ "--match": `${career.match}%` } as CareerCardStyle}
      >
        {generateCareerImage(career.id)}
        <span className="career-card__match-badge">{career.match}%</span>
      </div>

      <div className="career-card__top">
        <span className="badge badge--soft">{career.badge ?? career.area}</span>

        <span className="badge badge--area">{career.area}</span>
      </div>

      <h3>{career.name}</h3>
      <p>{career.description}</p>

      <div className="chip-row">
        {career.skills.slice(0, 3).map((skill) => (
          <span key={skill} className="mini-chip">
            {skill}
          </span>
        ))}
      </div>

      <div className="meta-row">
        <span>{career.modality ?? "Modalidad por confirmar"}</span>
        <span>Match {career.match}%</span>
      </div>

      <PrimaryButton
        className={selected ? "btn--selected" : ""}
        onClick={onSelect}
      >
        {selected ? "Seleccionada" : "Seleccionar"}
      </PrimaryButton>
    </motion.article>
  );
}
