import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Cpu,
  GraduationCap,
  HandHeart,
  HelpCircle,
  Leaf,
  Microscope,
  Palette,
  RefreshCw,
  Scale,
  Sparkles,
  TrendingUp,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCareers } from "../../hooks/useCareers";
import { aiAssistantService } from "../../services/aiAssistantService";
import { useAppContext } from "../../state/appState";
import type { CareerViewModel } from "../../types/domain";
import { PrimaryButton } from "../common/PrimaryButton";

type AreaKey =
  | "tech"
  | "care"
  | "education"
  | "creative"
  | "business"
  | "science"
  | "nature"
  | "law"
  | "field"
  | "employability";

type QuizQuestion = {
  id: string;
  area: AreaKey;
  text: string;
};

type AreaDefinition = {
  label: string;
  short: string;
  detail: string;
  skills: string[];
  keywords: string[];
  fallbackCareers: string[];
  icon: LucideIcon;
};

type QuizResult = {
  topArea: AreaKey;
  secondaryAreas: AreaKey[];
  topScore: number;
  suggestedNames: string[];
  suggestedIds: string[];
  varied: boolean;
};

type VocationalQuizProps = {
  onCompleteProfile?: () => void;
};

const STORAGE_KEY = "utp-match-vocational-test-v1";

const questions: QuizQuestion[] = [
  {
    id: "logic",
    area: "tech",
    text: "¿Qué tanto te gusta resolver problemas usando lógica, números o análisis?",
  },
  {
    id: "digital",
    area: "tech",
    text: "¿Qué tanto disfrutas usar computadoras, aplicaciones, tecnología o herramientas digitales?",
  },
  {
    id: "build",
    area: "tech",
    text: "¿Qué tanto te interesa crear soluciones, sistemas, máquinas, programas o procesos?",
  },
  {
    id: "listen",
    area: "care",
    text: "¿Qué tanto te gusta ayudar, orientar o escuchar a otras personas?",
  },
  {
    id: "health",
    area: "care",
    text: "¿Qué tanto te interesa cuidar la salud física o emocional de las personas?",
  },
  {
    id: "teach",
    area: "education",
    text: "¿Qué tanto disfrutas enseñar, explicar temas o ayudar a otros a aprender?",
  },
  {
    id: "visual",
    area: "creative",
    text: "¿Qué tanto te gusta diseñar, dibujar, editar videos, crear contenido o imaginar ideas visuales?",
  },
  {
    id: "talk",
    area: "creative",
    text: "¿Qué tanto te interesa comunicar ideas, hablar en público, escribir o persuadir?",
  },
  {
    id: "sell",
    area: "business",
    text: "¿Qué tanto te gusta vender, negociar, liderar equipos o iniciar un negocio?",
  },
  {
    id: "organize",
    area: "business",
    text: "¿Qué tanto te interesa organizar tareas, administrar dinero, planificar o tomar decisiones?",
  },
  {
    id: "research",
    area: "science",
    text: "¿Qué tanto te gusta investigar, experimentar o descubrir cómo funcionan las cosas?",
  },
  {
    id: "nature",
    area: "nature",
    text: "¿Qué tanto te interesa el medio ambiente, animales, plantas, agricultura o naturaleza?",
  },
  {
    id: "debate",
    area: "law",
    text: "¿Qué tanto te gusta defender ideas, analizar normas, debatir o resolver conflictos?",
  },
  {
    id: "hands",
    area: "field",
    text: "¿Qué tanto prefieres un trabajo práctico, donde uses herramientas, equipos o estés en campo?",
  },
  {
    id: "income",
    area: "employability",
    text: "Cuando imaginas tu futuro, ¿qué tan importante es para ti tener una carrera con buena empleabilidad e ingresos?",
  },
];

const areaDefinitions: Record<AreaKey, AreaDefinition> = {
  tech: {
    label: "Tecnología / Ingeniería",
    short: "Tecnología",
    detail: "Te puede gustar crear soluciones con lógica y tecnología.",
    skills: ["lógica", "datos", "soluciones"],
    keywords: ["sistemas", "software", "datos", "tecnologia", "ingenier"],
    fallbackCareers: [
      "Ingeniería de Sistemas",
      "Ingeniería de Software",
      "Ciencia de Datos",
    ],
    icon: Cpu,
  },
  care: {
    label: "Salud / Ayuda social",
    short: "Ayuda",
    detail: "Te puede gustar escuchar, orientar y cuidar personas.",
    skills: ["escucha", "empatía", "orientación"],
    keywords: ["salud", "psicologia", "bienestar", "terapia"],
    fallbackCareers: ["Psicología", "Enfermería", "Terapia Física"],
    icon: HandHeart,
  },
  education: {
    label: "Educación",
    short: "Educación",
    detail: "Te puede gustar explicar ideas y ayudar a aprender.",
    skills: ["explicar", "paciencia", "guía"],
    keywords: ["educacion", "docencia", "pedagogia"],
    fallbackCareers: ["Educación", "Comunicación", "Psicología"],
    icon: GraduationCap,
  },
  creative: {
    label: "Creatividad / Comunicación",
    short: "Creatividad",
    detail: "Te puede gustar crear, contar ideas y comunicar.",
    skills: ["ideas", "comunicación", "visual"],
    keywords: ["diseno", "comunicacion", "marketing", "arquitectura"],
    fallbackCareers: ["Marketing", "Comunicación", "Arquitectura"],
    icon: Palette,
  },
  business: {
    label: "Negocios / Gestión",
    short: "Negocios",
    detail: "Te puede gustar organizar, liderar y mover proyectos.",
    skills: ["liderazgo", "gestión", "orden"],
    keywords: ["administracion", "negocios", "marketing", "industrial"],
    fallbackCareers: [
      "Administración",
      "Marketing",
      "Ingeniería Industrial",
    ],
    icon: BriefcaseBusiness,
  },
  science: {
    label: "Ciencia / Investigación",
    short: "Ciencia",
    detail: "Te puede gustar probar, analizar y descubrir patrones.",
    skills: ["curiosidad", "análisis", "método"],
    keywords: ["datos", "ciencia", "laboratorio", "investigacion"],
    fallbackCareers: ["Ciencia de Datos", "Ingeniería Ambiental", "Biología"],
    icon: Microscope,
  },
  nature: {
    label: "Ambiente / Agro / Naturaleza",
    short: "Ambiente",
    detail: "Te puede gustar trabajar con entorno, recursos y campo.",
    skills: ["observación", "campo", "cuidado"],
    keywords: ["ambiental", "agro", "agronomia", "naturaleza"],
    fallbackCareers: ["Ingeniería Ambiental", "Agronomía", "Ingeniería Civil"],
    icon: Leaf,
  },
  law: {
    label: "Derecho / Debate",
    short: "Derecho",
    detail: "Te puede gustar defender ideas y resolver conflictos.",
    skills: ["argumentar", "analizar", "negociar"],
    keywords: ["derecho", "ley", "legal"],
    fallbackCareers: ["Derecho", "Administración", "Psicología"],
    icon: Scale,
  },
  field: {
    label: "Trabajo técnico / Campo",
    short: "Campo",
    detail: "Te puede gustar aprender haciendo y tocar proyectos reales.",
    skills: ["práctica", "herramientas", "acción"],
    keywords: ["civil", "industrial", "mecanica", "campo"],
    fallbackCareers: [
      "Ingeniería Civil",
      "Ingeniería Industrial",
      "Arquitectura",
    ],
    icon: Wrench,
  },
  employability: {
    label: "Empleabilidad / Ingresos",
    short: "Empleo",
    detail: "Te importa que la carrera tenga opciones claras de trabajo.",
    skills: ["metas", "empleo", "plan"],
    keywords: ["industrial", "administracion", "sistemas", "datos"],
    fallbackCareers: [
      "Ingeniería Industrial",
      "Administración",
      "Ingeniería de Sistemas",
    ],
    icon: TrendingUp,
  },
};

const scale = [
  { value: 1, label: "Nada" },
  { value: 2, label: "Poco" },
  { value: 3, label: "Regular" },
  { value: 4, label: "Me gusta" },
  { value: 5, label: "Me encanta" },
];

function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function getCareerMatches(
  area: AreaKey,
  careers: CareerViewModel[],
): { names: string[]; ids: string[] } {
  const definition = areaDefinitions[area];
  const matches = careers.filter((career) => {
    const text = normalize(
      `${career.name} ${career.area} ${career.badge ?? ""} ${career.description}`,
    );

    return definition.keywords.some((keyword) => text.includes(keyword));
  });

  return {
    names: matches.slice(0, 3).map((career) => career.name),
    ids: matches.slice(0, 2).map((career) => career.id),
  };
}

function buildResult(
  answers: Record<string, number>,
  careers: CareerViewModel[],
): QuizResult | null {
  if (Object.keys(answers).length < questions.length) {
    return null;
  }

  const totals = questions.reduce<Record<AreaKey, { total: number; count: number }>>(
    (acc, question) => {
      const current = acc[question.area] ?? { total: 0, count: 0 };
      const answer = answers[question.id] ?? 0;

      return {
        ...acc,
        [question.area]: {
          total: current.total + answer,
          count: current.count + 1,
        },
      };
    },
    {} as Record<AreaKey, { total: number; count: number }>,
  );

  const ranked = (Object.keys(areaDefinitions) as AreaKey[])
    .map((area) => {
      const score = totals[area]
        ? totals[area].total / totals[area].count
        : 0;

      return { area, score };
    })
    .sort((a, b) => b.score - a.score);

  const topArea = ranked[0].area;
  const secondaryAreas = ranked
    .slice(1)
    .filter((item) => item.score >= Math.max(3, ranked[0].score - 0.8))
    .slice(0, 2)
    .map((item) => item.area);

  const primaryMatches = getCareerMatches(topArea, careers);
  const secondaryMatches = secondaryAreas.flatMap((area) =>
    getCareerMatches(area, careers).names,
  );
  const suggestedNames = [
    ...primaryMatches.names,
    ...secondaryMatches,
    ...areaDefinitions[topArea].fallbackCareers,
  ].filter((name, index, list) => list.indexOf(name) === index);

  return {
    topArea,
    secondaryAreas,
    topScore: Math.round(ranked[0].score * 20),
    suggestedNames: suggestedNames.slice(0, 3),
    suggestedIds: primaryMatches.ids,
    varied: ranked[0].score - ranked[2].score < 0.6,
  };
}

function readSavedAnswers(): Record<string, number> {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return {};
    }

    const parsed = JSON.parse(raw) as { answers?: Record<string, number> };

    return parsed.answers ?? {};
  } catch {
    return {};
  }
}

function saveAnswers(answers: Record<string, number>) {
  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      answers,
      updatedAt: new Date().toISOString(),
    }),
  );
}

export function VocationalQuiz({ onCompleteProfile }: VocationalQuizProps) {
  const navigate = useNavigate();
  const { data: careers } = useCareers();
  const { patchProfile, profile, setSelectedCareers } = useAppContext();
  const [answers, setAnswers] = useState<Record<string, number>>(() =>
    readSavedAnswers(),
  );
  const [step, setStep] = useState(() =>
    Math.min(Object.keys(readSavedAnswers()).length, questions.length),
  );
  const [aiTip, setAiTip] = useState<string>(
    "Aquí no hay respuesta mala. Elige lo que más se parece a ti.",
  );
  const [aiLoading, setAiLoading] = useState(false);

  const result = useMemo(() => buildResult(answers, careers), [answers, careers]);
  const isDone = step >= questions.length && Boolean(result);
  const current = questions[Math.min(step, questions.length - 1)];
  const currentArea = areaDefinitions[current.area];
  const CurrentIcon = currentArea.icon;
  const progress = Math.round(
    (Math.min(step, questions.length) / questions.length) * 100,
  );
  const currentAnswer = current ? answers[current.id] : undefined;

  const chooseAnswer = (value: number) => {
    if (!current) {
      return;
    }

    const nextAnswers = {
      ...answers,
      [current.id]: value,
    };

    setAnswers(nextAnswers);
    saveAnswers(nextAnswers);

    window.setTimeout(() => {
      setStep((currentStep) => Math.min(currentStep + 1, questions.length));
    }, 120);
  };

  const resetQuiz = () => {
    setAnswers({});
    setStep(0);
    setAiTip("Listo. Vamos otra vez, rápido y sin presión.");
    window.localStorage.removeItem(STORAGE_KEY);
  };

  const askForHint = async () => {
    if (!current || aiLoading) {
      return;
    }

    try {
      setAiLoading(true);
      const response = await aiAssistantService.ask({
        question: `Explica con un ejemplo de maximo 18 palabras esta pregunta para un estudiante de 16 años: ${current.text}`,
        studentProfileId: profile.id,
        maxContextItems: 3,
      });

      setAiTip(response.answer || "Piensa en lo que harías aunque nadie te obligue.");
    } catch {
      setAiTip("Piensa en lo que harías aunque nadie te obligue.");
    } finally {
      setAiLoading(false);
    }
  };

  const explainResult = async () => {
    if (!result || aiLoading) {
      return;
    }

    const top = areaDefinitions[result.topArea];
    const secondary = result.secondaryAreas
      .map((area) => areaDefinitions[area].label)
      .join(", ");

    try {
      setAiLoading(true);
      const response = await aiAssistantService.ask({
        question: `Resume en 2 frases simples este perfil vocacional: principal ${top.label}; tambien ${secondary || "sin secundarios claros"}; carreras sugeridas ${result.suggestedNames.join(", ")}.`,
        studentProfileId: profile.id,
        careerIds: result.suggestedIds,
        maxContextItems: 5,
      });

      setAiTip(response.answer || top.detail);
    } catch {
      setAiTip(
        result.varied
          ? "Tienes intereses mixtos, comparemos opciones."
          : top.detail,
      );
    } finally {
      setAiLoading(false);
    }
  };

  const completeProfile = () => {
    if (result) {
      const top = areaDefinitions[result.topArea];
      const secondary = result.secondaryAreas.map((area) => areaDefinitions[area]);
      const nextInterests = [
        ...profile.interests,
        top.label,
        ...secondary.map((area) => area.label),
      ].filter((item, index, list) => list.indexOf(item) === index);
      const nextSkills = [
        ...profile.skills,
        ...top.skills,
        ...secondary.flatMap((area) => area.skills.slice(0, 1)),
      ].filter((item, index, list) => list.indexOf(item) === index);

      patchProfile({
        interests: nextInterests.slice(0, 6),
        skills: nextSkills.slice(0, 6),
      });

      if (result.suggestedIds.length >= 2) {
        setSelectedCareers(result.suggestedIds.slice(0, 2));
      }
    }

    if (onCompleteProfile) {
      onCompleteProfile();
      return;
    }

    navigate("/onboarding");
  };

  if (isDone && result) {
    const top = areaDefinitions[result.topArea];
    const TopIcon = top.icon;
    const secondary = result.secondaryAreas.map((area) => areaDefinitions[area]);

    return (
      <section className="vocational-quiz vocational-quiz--result">
        <div className="quiz-top">
          <span className="quiz-pill">
            <CheckCircle2 size={15} />
            Resultado
          </span>
          <span className="quiz-score">{result.topScore}% match</span>
        </div>

        <div className="quiz-result-card">
          <span className="quiz-result-icon">
            <TopIcon size={22} />
          </span>
          <p>Tu perfil principal</p>
          <h3>{top.label}</h3>
          <span>
            {result.varied
              ? "Tienes intereses mixtos, comparemos opciones."
              : top.detail}
          </span>
        </div>

        <div className="quiz-mini-grid">
          <div>
            <span>También</span>
            <strong>
              {secondary.length
                ? secondary.map((area) => area.short).join(" / ")
                : "Ruta clara"}
            </strong>
          </div>
          <div>
            <span>Ahora</span>
            <strong>Completa preferencias</strong>
          </div>
        </div>

        <div className="quiz-career-row">
          {result.suggestedNames.map((name) => (
            <span key={name}>{name}</span>
          ))}
        </div>

        <div className="quiz-ai-note">
          <Sparkles size={16} />
          <span>{aiTip}</span>
        </div>

        <div className="quiz-actions quiz-actions--single">
          <PrimaryButton onClick={completeProfile}>
            Completar mis preferencias <ArrowRight size={16} />
          </PrimaryButton>
        </div>

        <div className="quiz-secondary-actions">
          <button type="button" onClick={explainResult} disabled={aiLoading}>
            <Sparkles size={14} />
            {aiLoading ? "Pensando..." : "Resumen IA"}
          </button>
          <button type="button" onClick={resetQuiz}>
            <RefreshCw size={14} />
            Repetir test
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="vocational-quiz">
      <div className="quiz-top">
        <span className="quiz-pill">
          <CurrentIcon size={15} />
          {currentArea.short}
        </span>
        <span className="quiz-score">
          {Math.min(step + 1, questions.length)}/{questions.length}
        </span>
      </div>

      <div className="quiz-progress" aria-hidden="true">
        <span style={{ width: `${progress}%` }} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18 }}
          className="quiz-question"
        >
          <span className="quiz-question__number">
            {String(step + 1).padStart(2, "0")}
          </span>
          <h3>{current.text}</h3>
        </motion.div>
      </AnimatePresence>

      <div className="quiz-scale" role="radiogroup" aria-label={current.text}>
        {scale.map((item) => (
          <button
            key={item.value}
            type="button"
            className={`quiz-scale__option ${
              currentAnswer === item.value ? "quiz-scale__option--active" : ""
            }`}
            onClick={() => chooseAnswer(item.value)}
            aria-checked={currentAnswer === item.value}
            role="radio"
          >
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      <div className="quiz-ai-note">
        <Sparkles size={16} />
        <span>{aiTip}</span>
      </div>

      <div className="quiz-secondary-actions">
        <button type="button" onClick={askForHint} disabled={aiLoading}>
          <HelpCircle size={14} />
          {aiLoading ? "Pensando..." : "Pista IA"}
        </button>
        {step > 0 ? (
          <button
            type="button"
            onClick={() => setStep((currentStep) => Math.max(0, currentStep - 1))}
          >
            Atrás
          </button>
        ) : null}
      </div>
    </section>
  );
}
