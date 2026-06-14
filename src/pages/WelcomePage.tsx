import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  AppFrame,
  LinkCard,
  PrimaryButton,
  ScreenTitleBlock,
  SecondaryButton,
  Surface,
} from "../components/ui";

const heroBadges = [
  "Entiende qué hace diferente cada carrera",
  "Explora sin miedo a equivocarte",
  "Crea un plan que puedas defender",
];

const features = [
  {
    badge: "Lado a lado",
    title: "Compara de verdad",
    body: "¿Sistemas o Industrial? Mira exactamente qué las hace diferentes en matemáticas, programación, gestión y comunicación.",
  },
  {
    badge: "Traducido",
    title: "Entiende los cursos",
    body: 'Descubre qué es realmente "Principios de Algoritmos" o "Procesos Organizacionales" en palabras que tengan sentido.',
  },
  {
    badge: "Preparado",
    title: "Crea tu argumento",
    body: "Genera un plan concreto para hablar con tu familia o tutor. Con datos, no con dudas.",
  },
];

const modules = [
  {
    title: "Conocerte primero",
    body: "Cuéntanos qué te mueve, tus intereses y lo que te asusta. Esto es privado y solo para ti.",
  },
  {
    title: "Comparar con claridad",
    body: "Mira lado a lado cómo se diferencian dos carreras en lo que realmente importa.",
  },
  {
    title: "Entender los cursos",
    body: "Descubre qué aprenderás realmente en cada materia, sin jerga de universidad.",
  },
  {
    title: "Armar tu plan",
    body: "Guarda pasos concretos para hablar con tu familia, tutor o un estudiante que ya está ahí.",
  },
];

export default function WelcomePage() {
  const navigate = useNavigate();

  return (
    <AppFrame
      title="Elige carrera sin sentirte perdido."
      subtitle="Mira qué hace diferente cada profesión, entiende los cursos reales y crea un plan que puedas defender."
    >
      <section className="hero-card hero-card--landing">
        <div className="hero-card__copy">
          <span className="eyebrow eyebrow--hero">
            Tu decisión merece claridad
          </span>
          <h2>
            Descubre carreras como estudiantes que ya las viven, no como un PDF
            aburrido.
          </h2>
          <p>
            Comparaciones visuales que van al punto. Explicaciones en lenguaje
            real. Un plan paso a paso para que hables con seguridad con tu
            familia, tutor u orientador. Sin tablas, sin jerga, sin esperas.
          </p>

          <div className="hero-actions">
            <PrimaryButton onClick={() => navigate("/login")}>
              Empezar mi match
            </PrimaryButton>
            <SecondaryButton onClick={() => navigate("/compare")}>
              Ya tengo carreras en mente
            </SecondaryButton>
          </div>

          <div className="hero-badges">
            {heroBadges.map((badge) => (
              <span key={badge}>{badge}</span>
            ))}
          </div>
        </div>

        <div className="hero-visual hero-visual--landing">
          <div className="hero-visual__scene">
            <div className="hero-panel hero-panel--main">
              <div className="hero-panel__tag">Panel de descubrimiento</div>
              <strong>Match 92%</strong>
              <p>Ingeniería de Sistemas</p>
              <div className="hero-panel__chips">
                <span>Analítico</span>
                <span>Trabajo en equipo</span>
              </div>
            </div>

            <div className="hero-panel hero-panel--small hero-panel--top">
              <strong>92%</strong>
              <span>Claridad en tu decisión</span>
            </div>

            <div className="hero-panel hero-panel--small hero-panel--bottom">
              <strong>3 módulos</strong>
              <span>Comparación, cursos y plan</span>
            </div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="hero-bubble"
            >
              <Sparkles size={18} />
              <span>Explora</span>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="landing-section landing-section--cards">
        <Surface className="benefit-card">
          <h3>¿Por qué somos diferentes?</h3>
          <p>
            Porque hablamos en tu idioma, no en el de la universidad. Mostramos
            qué aprenderás realmente, quiénes ya lo hacen, y qué necesitas para
            estar listo.
          </p>
        </Surface>

        <div className="feature-grid">
          {features.map((feature) => (
            <Surface key={feature.title} className="feature-card">
              <span className="badge badge--soft">{feature.badge}</span>
              <h3>{feature.title}</h3>
              <p>{feature.body}</p>
            </Surface>
          ))}
        </div>
      </section>

      <Surface className="surface--stack landing-section landing-section--modules">
        <ScreenTitleBlock
          eyebrow="Tu ruta en 4 pasos"
          title="Desde la duda hasta la decisión"
          body="Cada módulo te acerca más a una conversación informada. Rápido, visual, y sin abrumar."
        />

        <div className="module-grid">
          {modules.map((module) => (
            <div key={module.title} className="module-card">
              <strong>{module.title}</strong>
              <p>{module.body}</p>
            </div>
          ))}
        </div>
      </Surface>

      <Surface className="surface--stack landing-section landing-section--quickstart">
        <ScreenTitleBlock
          eyebrow="Empieza ahora"
          title="Prueba sin presión"
          body="No hay registro. No hay datos raros. Solo tú, explorando qué podría ser tu carrera."
        />

        <LinkCard
          title="¿Qué me diferencia?"
          body="Mira cómo cambias tus decisiones al comparar lado a lado."
          to="/compare"
        />
        <LinkCard
          title="Mi plan real"
          body="Crea próximos pasos que puedas defender en casa."
          to="/plan"
        />
      </Surface>
    </AppFrame>
  );
}
