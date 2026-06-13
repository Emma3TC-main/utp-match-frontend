export type CareerId = 'systems' | 'industrial' | 'administration' | 'marketing' | 'civil' | 'law' | 'psychology' | 'architecture'

export type CareerData = {
  id: CareerId
  name: string
  area: string
  modality: string
  description: string
  badge: string
  intensity: {
    mathematics: number
    programming: number
    management: number
    communication: number
    logic: number
  }
  match: number
  matchLabel: 'Alto' | 'Medio' | 'Bajo'
  matchText: string
  strengths: string[]
  risks: string[]
  skills: string[]
  courses: CourseData[]
  insight: string
}

export type CourseData = {
  id: string
  name: string
  cycle: string
  area: string
  intensityLabel: string
  explanation: string
  impact: string
  difficulty: string[]
  skill: string
}

export type ActionTask = {
  id: string
  title: string
  description: string
  priority: 'Alta prioridad' | 'Recomendado' | 'Personal'
  due: string
}

export const careers: CareerData[] = [
  {
    id: 'systems',
    name: 'Ingeniería de Sistemas',
    area: 'Tecnología y software',
    modality: 'Virtual / Presencial',
    description:
      'Diseña soluciones tecnológicas, crea software y resuelve problemas usando lógica, datos y programación.',
    badge: 'Ingeniería',
    intensity: {
      mathematics: 70,
      programming: 90,
      management: 35,
      communication: 45,
      logic: 95,
    },
    match: 92,
    matchLabel: 'Alto',
    matchText:
      'Tienes buena afinidad con lógica, tecnología y resolución de problemas. El reto estará en sostener práctica constante.',
    strengths: ['Pensamiento Lógico Abstracto', 'Orientación a Resultados', 'Curiosidad tecnológica'],
    risks: ['Matemáticas avanzadas', 'Rutina de práctica', 'Tolerancia a errores'],
    skills: ['Programación', 'Pensamiento lógico', 'Datos', 'Tecnología', 'Resolución de problemas'],
    insight:
      'Sistemas exige más lógica y programación desde temprano. Si te gusta construir cosas y ver resultados concretos, aquí hay una ruta clara.',
    courses: [
      {
        id: 'algoritmos',
        name: 'Principios de Algoritmos',
        cycle: 'Ciclo 1',
        area: 'Programación',
        intensityLabel: 'Alta',
        explanation:
          'Aprenderás a resolver problemas paso a paso, como si le enseñaras a una computadora qué hacer.',
        impact:
          'Te entrena para dividir retos grandes en instrucciones pequeñas, ordenadas y fáciles de verificar.',
        difficulty: ['Práctica constante: Alta', 'Pensamiento lógico: Alto', 'Lectura teórica: Media', 'Tolerancia al error: Alta'],
        skill: 'Resolver problemas paso a paso',
      },
      {
        id: 'math',
        name: 'Matemática Básica',
        cycle: 'Ciclo 1',
        area: 'Base',
        intensityLabel: 'Media',
        explanation: 'Usarás números y fórmulas como herramientas para sostener decisiones técnicas.',
        impact: 'Te ayuda a pensar con precisión antes de programar o diseñar soluciones.',
        difficulty: ['Ritmo: Medio', 'Ejercicios: Constantes', 'Memoria: Media', 'Aplicación: Alta'],
        skill: 'Aplicar razonamiento matemático',
      },
    ],
  },
  {
    id: 'industrial',
    name: 'Ingeniería Industrial',
    area: 'Procesos y optimización',
    modality: 'Presencial',
    description:
      'Mejora procesos, optimiza recursos y conecta personas, tecnología y gestión para que las organizaciones funcionen mejor.',
    badge: 'Ingeniería',
    intensity: {
      mathematics: 75,
      programming: 35,
      management: 85,
      communication: 65,
      logic: 80,
    },
    match: 76,
    matchLabel: 'Medio',
    matchText:
      'También encajas con procesos, organización y mejora continua. Puede ser una buena opción si te interesa combinar números, personas y gestión.',
    strengths: ['Gestión de Operaciones', 'Supply Chain', 'Mejora continua'],
    risks: ['Carga de proyectos', 'Comunicación constante', 'Equilibrio entre teoría y práctica'],
    skills: ['Gestión', 'Procesos', 'Análisis', 'Optimización', 'Comunicación'],
    insight:
      'Industrial combina matemática, procesos y gestión. Si te gusta mejorar cómo funcionan las cosas, vas por un camino muy útil.',
    courses: [
      {
        id: 'industrial-intro',
        name: 'Introducción a la Ingeniería Industrial',
        cycle: 'Ciclo 1',
        area: 'Procesos',
        intensityLabel: 'Media',
        explanation:
          'Verás cómo ordenar procesos, detectar cuellos de botella y proponer mejoras reales.',
        impact:
          'Te enseña a mirar una organización como un sistema que se puede entender y optimizar.',
        difficulty: ['Ritmo: Medio', 'Análisis: Alto', 'Trabajo en equipo: Alto', 'Casos: Constantes'],
        skill: 'Detectar y mejorar procesos',
      },
      {
        id: 'org-processes',
        name: 'Procesos Organizacionales',
        cycle: 'Ciclo 1',
        area: 'Gestión',
        intensityLabel: 'Media',
        explanation: 'Aprenderás cómo se coordinan personas, recursos y decisiones dentro de una empresa.',
        impact: 'Te ayuda a entender por qué una organización funciona bien o se desordena.',
        difficulty: ['Observación: Alta', 'Memoria: Media', 'Práctica: Alta', 'Comunicación: Alta'],
        skill: 'Coordinar equipos y procesos',
      },
    ],
  },
  {
    id: 'administration',
    name: 'AdministraciÃ³n',
    area: 'Negocios',
    modality: 'Presencial / Virtual',
    description: 'Dirige empresas con visiÃ³n estratÃ©gica y habilidades para coordinar equipos, finanzas y operaciones.',
    badge: 'Negocios',
    intensity: { mathematics: 55, programming: 20, management: 90, communication: 80, logic: 70 },
    match: 68,
    matchLabel: 'Medio',
    matchText: 'Encaja si te interesa liderar, organizar recursos y tomar decisiones con datos.',
    strengths: ['Liderazgo', 'Planeamiento', 'ComunicaciÃ³n'],
    risks: ['Exposiciones frecuentes', 'AnÃ¡lisis financiero', 'Trabajo en equipo constante'],
    skills: ['GestiÃ³n', 'Finanzas', 'Liderazgo', 'Estrategia'],
    insight: 'AdministraciÃ³n combina visiÃ³n de negocio, personas y decisiÃ³n prÃ¡ctica.',
    courses: [
      { id: 'admin-intro', name: 'Fundamentos de AdministraciÃ³n', cycle: 'Ciclo 1', area: 'GestiÃ³n', intensityLabel: 'Media', explanation: 'AprenderÃ¡s cÃ³mo se estructura y coordina una organizaciÃ³n.', impact: 'Te ayuda a entender decisiones de negocio desde el primer ciclo.', difficulty: ['Lectura: Media', 'Casos: Constantes', 'ExposiciÃ³n: Media'], skill: 'Analizar organizaciones' },
    ],
  },
  {
    id: 'marketing',
    name: 'Marketing',
    area: 'Negocios y creatividad',
    modality: 'Presencial / Virtual',
    description: 'Conecta marcas con personas usando investigaciÃ³n, creatividad, datos y comunicaciÃ³n digital.',
    badge: 'Negocios',
    intensity: { mathematics: 40, programming: 25, management: 65, communication: 92, logic: 62 },
    match: 72,
    matchLabel: 'Medio',
    matchText: 'Buena opciÃ³n si te gusta comunicar ideas, entender audiencias y crear estrategias.',
    strengths: ['Creatividad', 'ComunicaciÃ³n', 'InvestigaciÃ³n'],
    risks: ['Presentaciones', 'Lectura de datos', 'IteraciÃ³n creativa'],
    skills: ['Creatividad', 'Datos', 'Marca', 'ComunicaciÃ³n'],
    insight: 'Marketing mezcla creatividad con evidencia para decidir cÃ³mo una marca debe actuar.',
    courses: [
      { id: 'marketing-intro', name: 'IntroducciÃ³n al Marketing', cycle: 'Ciclo 1', area: 'ComunicaciÃ³n', intensityLabel: 'Media', explanation: 'VerÃ¡s cÃ³mo se analizan clientes, mercados y propuestas de valor.', impact: 'Te entrena para conectar ideas con necesidades reales.', difficulty: ['Creatividad: Alta', 'InvestigaciÃ³n: Media', 'Trabajo grupal: Alto'], skill: 'DiseÃ±ar propuestas de valor' },
    ],
  },
  {
    id: 'civil',
    name: 'IngenierÃ­a Civil',
    area: 'IngenierÃ­a',
    modality: 'Presencial',
    description: 'DiseÃ±a y construye infraestructura con base matemÃ¡tica, criterio tÃ©cnico y seguridad.',
    badge: 'IngenierÃ­a',
    intensity: { mathematics: 88, programming: 30, management: 62, communication: 55, logic: 84 },
    match: 62,
    matchLabel: 'Medio',
    matchText: 'Puede encajar si te gustan estructuras, planos y resolver problemas fÃ­sicos concretos.',
    strengths: ['CÃ¡lculo', 'DiseÃ±o estructural', 'Rigor tÃ©cnico'],
    risks: ['Alta matemÃ¡tica', 'FÃ­sica constante', 'PrecisiÃ³n en planos'],
    skills: ['CÃ¡lculo', 'Estructuras', 'Planos', 'Obra'],
    insight: 'Civil pide disciplina tÃ©cnica y gusto por construir soluciones visibles.',
    courses: [
      { id: 'civil-intro', name: 'IntroducciÃ³n a la IngenierÃ­a Civil', cycle: 'Ciclo 1', area: 'IngenierÃ­a', intensityLabel: 'Media', explanation: 'ConocerÃ¡s el rol del ingeniero civil en obras e infraestructura.', impact: 'Te ayuda a visualizar proyectos reales desde temprano.', difficulty: ['FÃ­sica: Media', 'Planos: Medio', 'CÃ¡lculo: Alto'], skill: 'Pensar infraestructura' },
    ],
  },
  {
    id: 'law',
    name: 'Derecho',
    area: 'Derecho',
    modality: 'Presencial',
    description: 'Analiza normas, argumenta con claridad y comprende conflictos desde una mirada legal y social.',
    badge: 'Humanidades',
    intensity: { mathematics: 15, programming: 10, management: 45, communication: 94, logic: 78 },
    match: 65,
    matchLabel: 'Medio',
    matchText: 'Encaja si disfrutas leer, debatir, escribir y defender argumentos.',
    strengths: ['ArgumentaciÃ³n', 'Lectura crÃ­tica', 'ComunicaciÃ³n'],
    risks: ['Lectura extensa', 'Memoria normativa', 'ExposiciÃ³n oral'],
    skills: ['Lectura', 'ArgumentaciÃ³n', 'Ã‰tica', 'Debate'],
    insight: 'Derecho exige claridad verbal, lectura constante y criterio para resolver conflictos.',
    courses: [
      { id: 'law-intro', name: 'IntroducciÃ³n al Derecho', cycle: 'Ciclo 1', area: 'Legal', intensityLabel: 'Media', explanation: 'AprenderÃ¡s conceptos base del sistema jurÃ­dico y sus ramas.', impact: 'Te permite comprender cÃ³mo se ordenan normas y derechos.', difficulty: ['Lectura: Alta', 'Memoria: Media', 'ArgumentaciÃ³n: Alta'], skill: 'Construir argumentos' },
    ],
  },
  {
    id: 'psychology',
    name: 'PsicologÃ­a',
    area: 'Salud y personas',
    modality: 'Presencial',
    description: 'Comprende el comportamiento humano y apoya el bienestar mental desde evidencia y escucha.',
    badge: 'Salud',
    intensity: { mathematics: 35, programming: 10, management: 48, communication: 90, logic: 72 },
    match: 81,
    matchLabel: 'Alto',
    matchText: 'Buena ruta si te interesa escuchar, investigar y comprender a las personas.',
    strengths: ['Escucha activa', 'EmpatÃ­a', 'InvestigaciÃ³n'],
    risks: ['Lectura cientÃ­fica', 'Carga emocional', 'Ã‰tica profesional'],
    skills: ['Personas', 'InvestigaciÃ³n', 'ComunicaciÃ³n', 'AnÃ¡lisis'],
    insight: 'PsicologÃ­a combina sensibilidad humana con mÃ©todo cientÃ­fico.',
    courses: [
      { id: 'psychology-intro', name: 'Bases de la PsicologÃ­a', cycle: 'Ciclo 1', area: 'Salud', intensityLabel: 'Media', explanation: 'ExplorarÃ¡s teorÃ­as y conceptos iniciales del comportamiento humano.', impact: 'Te ayuda a conectar observaciÃ³n, evidencia y acompaÃ±amiento.', difficulty: ['Lectura: Alta', 'Escucha: Alta', 'InvestigaciÃ³n: Media'], skill: 'Comprender conducta humana' },
    ],
  },
  {
    id: 'architecture',
    name: 'Arquitectura de Software',
    area: 'TecnologÃ­a y software',
    modality: 'Virtual',
    description: 'DiseÃ±a infraestructura lÃ³gica de sistemas robustos, escalables y conectados.',
    badge: 'TecnologÃ­a',
    intensity: { mathematics: 64, programming: 88, management: 58, communication: 52, logic: 91 },
    match: 89,
    matchLabel: 'Alto',
    matchText: 'Encaja si te gusta pensar sistemas grandes, ordenar tecnologÃ­a y anticipar problemas.',
    strengths: ['Arquitectura', 'Cloud', 'Pensamiento sistÃ©mico'],
    risks: ['AbstracciÃ³n alta', 'PrÃ¡ctica tÃ©cnica', 'DocumentaciÃ³n'],
    skills: ['Software', 'Cloud', 'Sistemas', 'DiseÃ±o tÃ©cnico'],
    insight: 'Arquitectura de Software exige ver el mapa completo, no solo una pieza del cÃ³digo.',
    courses: [
      { id: 'software-architecture', name: 'Fundamentos de Arquitectura', cycle: 'Ciclo 1', area: 'Software', intensityLabel: 'Alta', explanation: 'AprenderÃ¡s cÃ³mo se organizan sistemas y componentes digitales.', impact: 'Te prepara para diseÃ±ar soluciones que puedan crecer.', difficulty: ['LÃ³gica: Alta', 'ProgramaciÃ³n: Alta', 'DocumentaciÃ³n: Media'], skill: 'DiseÃ±ar sistemas escalables' },
    ],
  },
]

export const actionTasks: ActionTask[] = [
  {
    id: 'courses',
    title: 'Revisar cursos clave',
    description: 'Mira qué cursos te acercan más a tu estilo de aprendizaje.',
    priority: 'Alta prioridad',
    due: 'Hoy',
  },
  {
    id: 'student',
    title: 'Conversar con un estudiante',
    description: 'Haz una pregunta real sobre cómo se vive la carrera.',
    priority: 'Recomendado',
    due: 'Mañana',
  },
  {
    id: 'family',
    title: 'Mostrar resumen a mi familia',
    description: 'Lleva argumentos claros para conversar sin presión.',
    priority: 'Personal',
    due: 'Fin de semana',
  },
  {
    id: 'modality',
    title: 'Preguntar por modalidad',
    description: 'Aclara si la carrera tiene más presencialidad o virtualidad.',
    priority: 'Recomendado',
    due: 'Esta semana',
  },
  {
    id: 'shortlist',
    title: 'Guardar shortlist',
    description: 'Deja tus dos opciones favoritas listas para revisar luego.',
    priority: 'Personal',
    due: 'Cuando termines',
  },
]

export const comparisonTabs = ['Resumen', 'Intensidad', 'Primer ciclo', 'Habilidades', 'Insights'] as const

export const adminCatalog = [
  { title: 'Ingeniería de Sistemas', state: 'Publicado' },
  { title: 'Ingeniería Industrial', state: 'Publicado' },
  { title: 'Principios de Algoritmos', state: 'Borrador' },
  { title: 'Procesos Organizacionales', state: 'Publicado' },
]
