import { BookOpen, GitCompareArrows, ListChecks, Share2 } from "lucide-react";
import { AppFrame, LinkCard, Surface } from "../components/ui";
import { useAppContext } from "../state/appState";

const homeLinks = [
  {
    title: "Comparar",
    body: "Elige dos carreras.",
    to: "/compare",
    icon: <GitCompareArrows size={18} />,
  },
  {
    title: "Curso IA",
    body: "Entiende un silabo.",
    to: "/course/syl-soft-math-1",
    icon: <BookOpen size={18} />,
  },
  {
    title: "Plan",
    body: "Pasos claros.",
    to: "/plan",
    icon: <ListChecks size={18} />,
  },
  {
    title: "Resumen",
    body: "Listo para compartir.",
    to: "/summary",
    icon: <Share2 size={18} />,
  },
];

export default function HomePage() {
  const { profile } = useAppContext();

  return (
    <AppFrame
      title={`Hola, ${profile.name || "estudiante"}.`}
      subtitle="Elige tu siguiente paso."
      progress={45}
    >
      <Surface className="surface--stack">
        <div className="home-hero">
          <span className="eyebrow">Tu ruta</span>
          <h2>Compara, entiende y avanza.</h2>
          <p>Todo conectado al backend real.</p>
        </div>

        <div className="home-grid">
          {homeLinks.map((link) => (
            <LinkCard
              key={link.title}
              title={link.title}
              body={link.body}
              to={link.to}
              icon={link.icon}
            />
          ))}
        </div>
      </Surface>
    </AppFrame>
  );
}
