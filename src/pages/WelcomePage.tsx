import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BrainCircuit,
  GitCompareArrows,
  ListChecks,
  Search,
  Sparkles,
  UserRoundCheck,
  X,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { VocationalQuiz } from "../components/vocational/VocationalQuiz";
import {
  AppFrame,
  LinkCard,
  PrimaryButton,
  ScreenTitleBlock,
  SecondaryButton,
  Surface,
} from "../components/ui";

const heroBadges = ["Test en modal", "Perfil claro", "Comparación real"];

const features = [
  {
    badge: "Test",
    title: "Descubre",
    body: "15 preguntas rápidas.",
  },
  {
    badge: "Perfil",
    title: "Ajusta",
    body: "Completa preferencias.",
  },
  {
    badge: "Compara",
    title: "Decide",
    body: "Usa carreras reales.",
  },
];

const modules = [
  {
    title: "1. Test",
    body: "Responde sin presión.",
    icon: <BrainCircuit size={18} />,
  },
  {
    title: "2. Preferencias",
    body: "Completa lo clave.",
    icon: <UserRoundCheck size={18} />,
  },
  {
    title: "3. Comparar",
    body: "Elige dos carreras.",
    icon: <GitCompareArrows size={18} />,
  },
  {
    title: "4. Plan",
    body: "Crea próximos pasos.",
    icon: <ListChecks size={18} />,
  },
];

export default function WelcomePage() {
  const navigate = useNavigate();
  const [showQuiz, setShowQuiz] = useState(false);

  const goToPreferences = () => {
    setShowQuiz(false);
    navigate("/onboarding");
  };

  return (
    <AppFrame
      title="Encuentra tu ruta."
      subtitle="Test, preferencias y comparación. En orden."
    >
      <section className="hero-card hero-card--landing hero-card--quiz-entry">
        <div className="hero-card__copy">
          <span className="eyebrow eyebrow--hero">
            <Sparkles size={14} />
            Test vocacional
          </span>
          <h2>Primero descubre. Luego compara.</h2>
          <p>
            Abre el test, completa tus preferencias y compara carreras reales.
          </p>

          <div className="hero-actions">
            <PrimaryButton onClick={() => setShowQuiz(true)}>
              Iniciar test <ArrowRight size={16} />
            </PrimaryButton>
            <SecondaryButton onClick={() => navigate("/compare")}>
              Ver carreras
            </SecondaryButton>
          </div>

          <div className="hero-badges">
            {heroBadges.map((badge) => (
              <span key={badge}>{badge}</span>
            ))}
          </div>
        </div>

        <div className="hero-quiz-teaser">
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="quiz-teaser-card quiz-teaser-card--main"
          >
            <BrainCircuit size={28} />
            <strong>15 preguntas</strong>
            <span>Una por una</span>
          </motion.div>

          <div className="quiz-flow-steps">
            {modules.slice(0, 3).map((module) => (
              <span key={module.title}>
                {module.icon}
                {module.title.replace(/^\d\.\s/, "")}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="landing-section landing-section--cards">
        <div className="feature-grid feature-grid--compact">
          {features.map((feature) => (
            <Surface key={feature.title} className="feature-card feature-card--tap">
              <span className="badge badge--soft">{feature.badge}</span>
              <h3>{feature.title}</h3>
              <p>{feature.body}</p>
            </Surface>
          ))}
        </div>
      </section>

      <Surface className="surface--stack landing-section landing-section--modules">
        <ScreenTitleBlock
          eyebrow="Flujo claro"
          title="Test → preferencias → comparación"
          body="Así no te pierdes."
        />

        <div className="module-grid module-grid--compact">
          {modules.map((module) => (
            <div key={module.title} className="module-card module-card--mini module-card--icon">
              <span>{module.icon}</span>
              <strong>{module.title}</strong>
              <p>{module.body}</p>
            </div>
          ))}
        </div>
      </Surface>

      <Surface className="surface--stack landing-section landing-section--quickstart">
        <ScreenTitleBlock
          eyebrow="También puedes"
          title="Ir directo"
          body="Si ya tienes opciones, compara."
        />

        <LinkCard
          title="Comparar carreras"
          body="Elige dos y mira diferencias."
          to="/compare"
          icon={<GitCompareArrows size={18} />}
        />
        <LinkCard
          title="Mi plan"
          body="Primero crea tu perfil."
          to="/plan"
          icon={<ListChecks size={18} />}
        />
        <div className="quickstart-icon-row" aria-hidden="true">
          <Search size={18} />
          <span>Explora sin presión</span>
        </div>
      </Surface>

      <AnimatePresence>
        {showQuiz ? (
          <motion.div
            className="quiz-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.section
              className="quiz-modal"
              role="dialog"
              aria-modal="true"
              aria-label="Test vocacional"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <div className="quiz-modal__header">
                <div>
                  <span className="quiz-pill">
                    <BrainCircuit size={15} />
                    Test
                  </span>
                  <h2>Descubre tu perfil</h2>
                </div>
                <button
                  type="button"
                  className="icon-button"
                  onClick={() => setShowQuiz(false)}
                  aria-label="Cerrar test"
                >
                  <X size={18} />
                </button>
              </div>

              <VocationalQuiz onCompleteProfile={goToPreferences} />
            </motion.section>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </AppFrame>
  );
}
