import { motion } from "framer-motion";

export function IntensityBar({
  label,
  value,
  accent = "var(--blue)",
}: {
  label: string;
  value: number;
  accent?: string;
}) {
  return (
    <div className="intensity-bar">
      <div className="intensity-bar__row">
        <span>{label}</span>
        <strong>{value}%</strong>
      </div>
      <div className="intensity-bar__track">
        <motion.div
          className="intensity-bar__fill"
          initial={{ width: 0 }}
          animate={{ width: `${value}%`, background: accent }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
