import { AppFrame, LinkCard, Surface } from "../components/ui";
import { useAppContext } from "../state/appState";

const homeLinks = [
  {
    title: "Comparar carreras",
    body: "Selecciona Ingeniería de Sistemas e Ingeniería Industrial.",
    to: "/compare",
  },
  {
    title: "Entiende un curso",
    body: "Traduce Principios de Algoritmos a lenguaje claro.",
    to: "/course/algoritmos",
  },
  {
    title: "Crea tu plan",
    body: "Convierte tus dudas en próximos pasos.",
    to: "/plan",
  },
  {
    title: "Ver resumen",
    body: "Guarda una pieza lista para compartir con tu familia.",
    to: "/summary",
  },
];

export default function HomePage() {
  const { profile } = useAppContext();

  return (
    <AppFrame
      title={`Hola, ${profile.name}.`}
      subtitle="Tu decisión puede tener dudas, pero no tiene que estar desordenada."
      progress={45}
    >
      <Surface className="surface--stack">
        <div className="home-hero">
          <span className="eyebrow">Tu journey vocacional</span>
          <h2>
            Empieza comparando dos carreras. Luego entiende cursos y crea tu
            plan.
          </h2>
          <p>
            Comparamos con evidencia, no solo con opiniones. Todo pensado para
            que avances sin saturarte.
          </p>
        </div>

        <div className="home-grid">
          {homeLinks.map((link) => (
            <LinkCard
              key={link.title}
              title={link.title}
              body={link.body}
              to={link.to}
            />
          ))}
        </div>
      </Surface>
    </AppFrame>
  );
}
