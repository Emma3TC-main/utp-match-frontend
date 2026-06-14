import type { ActionTask, CareerData } from "../types/domain";

export const careers: CareerData[] = [
  {
    id: "systems",
    name: "Ingeniería de Sistemas",
    area: "Tecnología y software",
    modality: "Virtual / Presencial",
    description:
      "Diseña soluciones tecnológicas, crea software y resuelve problemas usando lógica, datos y programación.",
    badge: "Ingeniería",
    intensity: {
      mathematics: 70,
      programming: 90,
      management: 35,
      communication: 45,
      logic: 95,
    },
    match: 92,
    matchLabel: "Alto",
    matchText:
      "Tienes buena afinidad con lógica, tecnología y resolución de problemas. El reto estará en sostener práctica constante.",
    strengths: [
      "Pensamiento Lógico Abstracto",
      "Orientación a Resultados",
      "Curiosidad tecnológica",
    ],
    risks: [
      "Matemáticas avanzadas",
      "Rutina de práctica",
      "Tolerancia a errores",
    ],
    skills: [
      "Programación",
      "Pensamiento lógico",
      "Datos",
      "Tecnología",
      "Resolución de problemas",
    ],
    insight:
      "Sistemas exige más lógica y programación desde temprano. Si te gusta construir cosas y ver resultados concretos, aquí hay una ruta clara.",
    courses: [
      {
        id: "algoritmos",
        name: "Principios de Algoritmos",
        cycle: "Ciclo 1",
        area: "Programación",
        intensityLabel: "Alta",
        explanation:
          "Aprenderás a resolver problemas paso a paso, como si le enseñaras a una computadora qué hacer.",
        impact:
          "Te entrena para dividir retos grandes en instrucciones pequeñas, ordenadas y fáciles de verificar.",
        difficulty: [
          "Práctica constante: Alta",
          "Pensamiento lógico: Alto",
          "Lectura teórica: Media",
          "Tolerancia al error: Alta",
        ],
        skill: "Resolver problemas paso a paso",
      },
      {
        id: "math",
        name: "Matemática Básica",
        cycle: "Ciclo 1",
        area: "Base",
        intensityLabel: "Media",
        explanation:
          "Usarás números y fórmulas como herramientas para sostener decisiones técnicas.",
        impact:
          "Te ayuda a pensar con precisión antes de programar o diseñar soluciones.",
        difficulty: [
          "Ritmo: Medio",
          "Ejercicios: Constantes",
          "Memoria: Media",
          "Aplicación: Alta",
        ],
        skill: "Aplicar razonamiento matemático",
      },
    ],
  },
  {
    id: "industrial",
    name: "Ingeniería Industrial",
    area: "Procesos y optimización",
    modality: "Presencial",
    description:
      "Mejora procesos, optimiza recursos y conecta personas, tecnología y gestión para que las organizaciones funcionen mejor.",
    badge: "Ingeniería",
    intensity: {
      mathematics: 75,
      programming: 35,
      management: 85,
      communication: 65,
      logic: 80,
    },
    match: 76,
    matchLabel: "Medio",
    matchText:
      "También encajas con procesos, organización y mejora continua. Puede ser una buena opción si te interesa combinar números, personas y gestión.",
    strengths: ["Gestión de Operaciones", "Supply Chain", "Mejora continua"],
    risks: [
      "Carga de proyectos",
      "Comunicación constante",
      "Equilibrio entre teoría y práctica",
    ],
    skills: ["Gestión", "Procesos", "Análisis", "Optimización", "Comunicación"],
    insight:
      "Industrial combina matemática, procesos y gestión. Si te gusta mejorar cómo funcionan las cosas, vas por un camino muy útil.",
    courses: [
      {
        id: "industrial-intro",
        name: "Introducción a la Ingeniería Industrial",
        cycle: "Ciclo 1",
        area: "Procesos",
        intensityLabel: "Media",
        explanation:
          "Verás cómo ordenar procesos, detectar cuellos de botella y proponer mejoras reales.",
        impact:
          "Te enseña a mirar una organización como un sistema que se puede entender y optimizar.",
        difficulty: [
          "Ritmo: Medio",
          "Análisis: Alto",
          "Trabajo en equipo: Alto",
          "Casos: Constantes",
        ],
        skill: "Detectar y mejorar procesos",
      },
      {
        id: "org-processes",
        name: "Procesos Organizacionales",
        cycle: "Ciclo 1",
        area: "Gestión",
        intensityLabel: "Media",
        explanation:
          "Aprenderás cómo se coordinan personas, recursos y decisiones dentro de una empresa.",
        impact:
          "Te ayuda a entender por qué una organización funciona bien o se desordena.",
        difficulty: [
          "Observación: Alta",
          "Memoria: Media",
          "Práctica: Alta",
          "Comunicación: Alta",
        ],
        skill: "Coordinar equipos y procesos",
      },
    ],
  },
  {
    id: "administration",
    name: "Administración",
    area: "Negocios",
    modality: "Presencial / Virtual",
    description:
      "Dirige empresas con visión estratégica y habilidades para coordinar equipos, finanzas y operaciones.",
    badge: "Negocios",
    intensity: {
      mathematics: 55,
      programming: 20,
      management: 90,
      communication: 80,
      logic: 70,
    },
    match: 68,
    matchLabel: "Medio",
    matchText:
      "Encaja si te interesa liderar, organizar recursos y tomar decisiones con datos.",
    strengths: ["Liderazgo", "Planeamiento", "Comunicación"],
    risks: [
      "Exposiciones frecuentes",
      "Análisis financiero",
      "Trabajo en equipo constante",
    ],
    skills: ["Gestión", "Finanzas", "Liderazgo", "Estrategia"],
    insight:
      "Administración combina visión de negocio, personas y decisión práctica.",
    courses: [
      {
        id: "admin-intro",
        name: "Fundamentos de Administración",
        cycle: "Ciclo 1",
        area: "Gestión",
        intensityLabel: "Media",
        explanation:
          "Aprenderás cómo se estructura y coordina una organización.",
        impact:
          "Te ayuda a entender decisiones de negocio desde el primer ciclo.",
        difficulty: [
          "Lectura: Media",
          "Casos: Constantes",
          "Exposición: Media",
        ],
        skill: "Analizar organizaciones",
      },
    ],
  },
  {
    id: "marketing",
    name: "Marketing",
    area: "Negocios y creatividad",
    modality: "Presencial / Virtual",
    description:
      "Conecta marcas con personas usando investigación, creatividad, datos y comunicación digital.",
    badge: "Negocios",
    intensity: {
      mathematics: 40,
      programming: 25,
      management: 65,
      communication: 92,
      logic: 62,
    },
    match: 72,
    matchLabel: "Medio",
    matchText:
      "Buena opción si te gusta comunicar ideas, entender audiencias y crear estrategias.",
    strengths: ["Creatividad", "Comunicación", "Investigación"],
    risks: ["Presentaciones", "Lectura de datos", "Iteración creativa"],
    skills: ["Creatividad", "Datos", "Marca", "Comunicación"],
    insight:
      "Marketing mezcla creatividad con evidencia para decidir cómo una marca debe actuar.",
    courses: [
      {
        id: "marketing-intro",
        name: "Introducción al Marketing",
        cycle: "Ciclo 1",
        area: "Comunicación",
        intensityLabel: "Media",
        explanation:
          "Verás cómo se analizan clientes, mercados y propuestas de valor.",
        impact: "Te entrena para conectar ideas con necesidades reales.",
        difficulty: [
          "Creatividad: Alta",
          "Investigación: Media",
          "Trabajo grupal: Alto",
        ],
        skill: "Diseñar propuestas de valor",
      },
    ],
  },
  {
    id: "civil",
    name: "Ingeniería Civil",
    area: "Ingeniería",
    modality: "Presencial",
    description:
      "Diseña y construye infraestructura con base matemática, criterio técnico y seguridad.",
    badge: "Ingeniería",
    intensity: {
      mathematics: 88,
      programming: 30,
      management: 62,
      communication: 55,
      logic: 84,
    },
    match: 62,
    matchLabel: "Medio",
    matchText:
      "Puede encajar si te gustan estructuras, planos y resolver problemas físicos concretos.",
    strengths: ["Cálculo", "Diseño estructural", "Rigor técnico"],
    risks: ["Alta matemática", "Física constante", "Precisión en planos"],
    skills: ["Cálculo", "Estructuras", "Planos", "Obra"],
    insight:
      "Civil pide disciplina técnica y gusto por construir soluciones visibles.",
    courses: [
      {
        id: "civil-intro",
        name: "Introducción a la Ingeniería Civil",
        cycle: "Ciclo 1",
        area: "Ingeniería",
        intensityLabel: "Media",
        explanation:
          "Conocerás el rol del ingeniero civil en obras e infraestructura.",
        impact: "Te ayuda a visualizar proyectos reales desde temprano.",
        difficulty: ["Física: Media", "Planos: Medio", "Cálculo: Alto"],
        skill: "Pensar infraestructura",
      },
    ],
  },
  {
    id: "law",
    name: "Derecho",
    area: "Derecho",
    modality: "Presencial",
    description:
      "Analiza normas, argumenta con claridad y comprende conflictos desde una mirada legal y social.",
    badge: "Humanidades",
    intensity: {
      mathematics: 15,
      programming: 10,
      management: 45,
      communication: 94,
      logic: 78,
    },
    match: 65,
    matchLabel: "Medio",
    matchText:
      "Encaja si disfrutas leer, debatir, escribir y defender argumentos.",
    strengths: ["Argumentación", "Lectura crítica", "Comunicación"],
    risks: ["Lectura extensa", "Memoria normativa", "Exposición oral"],
    skills: ["Lectura", "Argumentación", "Ética", "Debate"],
    insight:
      "Derecho exige claridad verbal, lectura constante y criterio para resolver conflictos.",
    courses: [
      {
        id: "law-intro",
        name: "Introducción al Derecho",
        cycle: "Ciclo 1",
        area: "Legal",
        intensityLabel: "Media",
        explanation:
          "Aprenderás conceptos base del sistema jurídico y sus ramas.",
        impact: "Te permite comprender cómo se ordenan normas y derechos.",
        difficulty: ["Lectura: Alta", "Memoria: Media", "Argumentación: Alta"],
        skill: "Construir argumentos",
      },
    ],
  },
  {
    id: "psychology",
    name: "Psicología",
    area: "Salud y personas",
    modality: "Presencial",
    description:
      "Comprende el comportamiento humano y apoya el bienestar mental desde evidencia y escucha.",
    badge: "Salud",
    intensity: {
      mathematics: 35,
      programming: 10,
      management: 48,
      communication: 90,
      logic: 72,
    },
    match: 81,
    matchLabel: "Alto",
    matchText:
      "Buena ruta si te interesa escuchar, investigar y comprender a las personas.",
    strengths: ["Escucha activa", "Empatía", "Investigación"],
    risks: ["Lectura científica", "Carga emocional", "Ética profesional"],
    skills: ["Personas", "Investigación", "Comunicación", "Análisis"],
    insight: "Psicología combina sensibilidad humana con método científico.",
    courses: [
      {
        id: "psychology-intro",
        name: "Bases de la Psicología",
        cycle: "Ciclo 1",
        area: "Salud",
        intensityLabel: "Media",
        explanation:
          "Explorarás teorías y conceptos iniciales del comportamiento humano.",
        impact: "Te ayuda a conectar observación, evidencia y acompañamiento.",
        difficulty: ["Lectura: Alta", "Escucha: Alta", "Investigación: Media"],
        skill: "Comprender conducta humana",
      },
    ],
  },
  {
    id: "architecture",
    name: "Arquitectura de Software",
    area: "Tecnología y software",
    modality: "Virtual",
    description:
      "Diseña infraestructura lógica de sistemas robustos, escalables y conectados.",
    badge: "Tecnología",
    intensity: {
      mathematics: 64,
      programming: 88,
      management: 58,
      communication: 52,
      logic: 91,
    },
    match: 89,
    matchLabel: "Alto",
    matchText:
      "Encaja si te gusta pensar sistemas grandes, ordenar tecnología y anticipar problemas.",
    strengths: ["Arquitectura", "Cloud", "Pensamiento sistémico"],
    risks: ["Abstracción alta", "Práctica técnica", "Documentación"],
    skills: ["Software", "Cloud", "Sistemas", "Diseño técnico"],
    insight:
      "Arquitectura de Software exige ver el mapa completo, no solo una pieza del código.",
    courses: [
      {
        id: "software-architecture",
        name: "Fundamentos de Arquitectura",
        cycle: "Ciclo 1",
        area: "Software",
        intensityLabel: "Alta",
        explanation:
          "Aprenderás cómo se organizan sistemas y componentes digitales.",
        impact: "Te prepara para diseñar soluciones que puedan crecer.",
        difficulty: [
          "Lógica: Alta",
          "Programación: Alta",
          "Documentación: Media",
        ],
        skill: "Diseñar sistemas escalables",
      },
    ],
  },
];

export const actionTasks: ActionTask[] = [
  {
    id: "courses",
    title: "Revisar cursos clave",
    description: "Mira qué cursos te acercan más a tu estilo de aprendizaje.",
    priority: "Alta prioridad",
    due: "Hoy",
  },
  {
    id: "student",
    title: "Conversar con un estudiante",
    description: "Haz una pregunta real sobre cómo se vive la carrera.",
    priority: "Recomendado",
    due: "Mañana",
  },
  {
    id: "family",
    title: "Mostrar resumen a mi familia",
    description: "Lleva argumentos claros para conversar sin presión.",
    priority: "Personal",
    due: "Fin de semana",
  },
  {
    id: "modality",
    title: "Preguntar por modalidad",
    description: "Aclara si la carrera tiene más presencialidad o virtualidad.",
    priority: "Recomendado",
    due: "Esta semana",
  },
  {
    id: "shortlist",
    title: "Guardar shortlist",
    description: "Deja tus dos opciones favoritas listas para revisar luego.",
    priority: "Personal",
    due: "Cuando termines",
  },
];

export const comparisonTabs = [
  "Resumen",
  "Intensidad",
  "Primer ciclo",
  "Habilidades",
  "Insights",
] as const;

export const adminCatalog = [
  { title: "Ingeniería de Sistemas", state: "Publicado" },
  { title: "Ingeniería Industrial", state: "Publicado" },
  { title: "Principios de Algoritmos", state: "Borrador" },
  { title: "Procesos Organizacionales", state: "Publicado" },
];
