import { AnimatePresence, motion } from 'framer-motion'
import { ChevronRight, CircleCheckBig, Search, Sparkles } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom'
import { AppProvider } from './state/AppProvider'
import { useAppContext } from './state/appState'
import {
  AIExplanationCard,
  AppFrame,
  BottomNav,
  CareerCard,
  Chip,
  EmptyState,
  IntensityBar,
  LinkCard,
  MatchScore,
  PrimaryButton,
  SecondaryButton,
  ScreenTitleBlock,
  StickyCTA,
  StatusToast,
  Surface,
  TaskItem,
} from './components/ui'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import { actionTasks, adminCatalog, careers, comparisonTabs } from './data/demo'

function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  )
}

function AppRouter() {
  const location = useLocation()
  const { isLoading, setIsLoading } = useAppContext()

  useEffect(() => {
    setIsLoading(true)
    const timer = window.setTimeout(() => setIsLoading(false), 220)

    return () => window.clearTimeout(timer)
  }, [location.pathname, setIsLoading])

  const showBottomNav = ['/home', '/compare', '/compare/result', '/match', '/plan', '/summary', '/admin'].some((route) => location.pathname.startsWith(route))

  return (
    <div className="app-stage">
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 18, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -12, filter: 'blur(10px)' }}
          transition={{ duration: 0.26, ease: 'easeOut' }}
          className="route-layer"
        >
          <Routes location={location}>
            <Route path="/" element={<Navigate to="/welcome" replace />} />
            <Route path="/welcome" element={<WelcomePage />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/compare" element={<SelectorPage />} />
            <Route path="/compare/result" element={<ComparePage />} />
            <Route path="/course/:courseId" element={<CoursePage />} />
            <Route path="/match" element={<MatchPage />} />
            <Route path="/plan" element={<PlanPage />} />
            <Route path="/summary" element={<SummaryPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="*" element={<Navigate to="/welcome" replace />} />
          </Routes>
        </motion.div>
      </AnimatePresence>

      {showBottomNav ? <BottomNav /> : null}

      {isLoading ? (
        <div className="route-loader" aria-live="polite" aria-busy="true">
          <div className="route-loader__card">
            <div className="skeleton-line skeleton-line--title" />
            <div className="skeleton-line" />
            <div className="skeleton-grid">
              <div className="skeleton-box" />
              <div className="skeleton-box" />
              <div className="skeleton-box" />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

function WelcomePage() {
  const navigate = useNavigate()

  return (
    <AppFrame title="Elige carrera sin sentirte perdido." subtitle="Mira qué hace diferente cada profesión, entiende los cursos reales y crea un plan que puedas defender.">
      <section className="hero-card hero-card--landing">
        <div className="hero-card__copy">
          <span className="eyebrow eyebrow--hero">Tu decisión merece claridad</span>
          <h2>Descubre carreras como estudiantes que ya las viven, no como un PDF aburridо.</h2>
          <p>
            Comparaciones visuales que van al punto. Explicaciones en lenguaje real. Un plan paso a paso para que
            hables con seguridad con tu familia, tutor u orientador. Sin tablas, sin jerga, sin esperas.
          </p>
          <div className="hero-actions">
            <PrimaryButton onClick={() => navigate('/onboarding')}>Iniciar mi match</PrimaryButton>
            <SecondaryButton onClick={() => navigate('/compare')}>Ver comparador</SecondaryButton>
          </div>
          <div className="hero-badges">
            <span>Entiende qué hace diferente cada carrera</span>
            <span>Explora sin miedo a equivocarte</span>
            <span>Crea un plan que puedas defender</span>
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
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }} className="hero-bubble">
              <Sparkles size={18} />
              <span>Explora</span>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="landing-section landing-section--cards">
        <Surface className="benefit-card">
          <h3>¿Por qué somos diferentes?</h3>
          <p>Porque hablamos en tu idioma, no en el de la universidad. Mostramos qué aprenderás realmente, quiénes ya lo hacen, y qué necesitas para estar listo.</p>
        </Surface>
        <div className="feature-grid">
          <Surface className="feature-card">
            <span className="badge badge--soft">Lado a lado</span>
            <h3>Compara de verdad</h3>
            <p>¿Sistemas o Industrial? Mira exactamente qué las hace diferentes en matemáticas, programación, gestión y comunicación.</p>
          </Surface>
          <Surface className="feature-card">
            <span className="badge badge--soft">Traducido</span>
            <h3>Entiende los cursos</h3>
            <p>Descubre qué es realmente "Principios de Algoritmos" o "Procesos Organizacionales" en palabras que tenga sentido.</p>
          </Surface>
          <Surface className="feature-card">
            <span className="badge badge--soft">Preparado</span>
            <h3>Crea tu argumento</h3>
            <p>Genera un plan concreto para hablar con tu familia o tutor. Con datos, no con dudas.</p>
          </Surface>
        </div>
      </section>

      <Surface className="surface--stack landing-section landing-section--modules">
        <ScreenTitleBlock eyebrow="Tu ruta en 4 pasos" title="Desde la duda hasta la decisión" body="Cada módulo te acerca más a una conversación informada. Rápido, visual, y sin abrumar." />
        <div className="module-grid">
          <div className="module-card">
            <strong>Conocerte primero</strong>
            <p>Cuéntanos qué te mueve, tus intereses y lo que te asusta. Esto es privado y solo para ti.</p>
          </div>
          <div className="module-card">
            <strong>Comparar con claridad</strong>
            <p>Mira lado a lado cómo se diferencian dos carreras en lo que realmente importa.</p>
          </div>
          <div className="module-card">
            <strong>Entender los cursos</strong>
            <p>Descubre qué aprenderás realmente en cada materia, sin jerga de universidad.</p>
          </div>
          <div className="module-card">
            <strong>Armar tu plan</strong>
            <p>Guarda pasos concretos para hablar con tu familia, tutor o un estudiante que ya está ahí.</p>
          </div>
        </div>
      </Surface>

      <Surface className="surface--stack landing-section landing-section--quickstart">
        <ScreenTitleBlock eyebrow="Empieza ahora" title="Prueba sin presión" body="No hay registro. No hay datos raros. Solo tú, explorando qué podría ser tu carrera." />
        <LinkCard title="¿Qué me diferencia?" body="Mira cómo cambias tus decisiones al comparar lado a lado." to="/compare" />
        <LinkCard title="Mi plan real" body="Crea próximos pasos que puedas defender en casa." to="/plan" />
      </Surface>
    </AppFrame>
  )
}

function OnboardingPage() {
  const navigate = useNavigate()
  const { profile, setProfile } = useAppContext()
  const [step, setStep] = useState(0)
  const [name, setName] = useState(profile.name)
  const [year, setYear] = useState(profile.year)
  const [interests, setInterests] = useState(profile.interests)
  const [skills, setSkills] = useState(profile.skills)
  const [doubts, setDoubts] = useState(profile.doubts)
  const [worry, setWorry] = useState(profile.worry)

  const totalSteps = 5

  const stepBody = useMemo(() => {
    const values = [
      {
        title: 'Primero, cuéntanos un poco de ti.',
        body: 'No hay respuestas correctas. Esto nos ayuda a orientarte mejor.',
        content: (
          <div className="form-stack">
            <label>
              <span>¿Cómo te llamas?</span>
              <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Ej. Andrea García" />
            </label>
            <label>
              <span>¿En qué año estás?</span>
              <input value={year} onChange={(event) => setYear(event.target.value)} placeholder="5.° de secundaria" />
            </label>
          </div>
        ),
      },
      {
        title: '¿Qué te interesa más?',
        body: 'Selecciona lo que sí te llama la atención hoy, aunque todavía tengas dudas.',
        content: (
          <div className="chip-grid">
            {['Tecnología', 'Diseño', 'Ciencias', 'Negocios', 'Personas', 'Creatividad'].map((item) => (
              <Chip key={item} active={interests.includes(item)} onClick={() => setInterests((current) => current.includes(item) ? current.filter((value) => value !== item) : [...current, item])}>
                {item}
              </Chip>
            ))}
          </div>
        ),
      },
      {
        title: '¿Qué habilidades sientes más tuyas?',
        body: 'Esto nos ayuda a entender cómo podrías vivir una carrera.',
        content: (
          <div className="chip-grid">
            {['Matemáticas', 'Creatividad', 'Comunicación', 'Organización', 'Lógica', 'Trabajo en equipo'].map((item) => (
              <Chip key={item} active={skills.includes(item)} onClick={() => setSkills((current) => current.includes(item) ? current.filter((value) => value !== item) : [...current, item])}>
                {item}
              </Chip>
            ))}
          </div>
        ),
      },
      {
        title: '¿Qué carreras tienes en mente?',
        body: 'Puedes escribir una, dos o varias opciones si todavía estás comparando.',
        content: (
          <label>
            <span>Carreras en duda</span>
            <input value={doubts} onChange={(event) => setDoubts(event.target.value)} placeholder="Ing. de Sistemas, Ing. Industrial..." />
          </label>
        ),
      },
      {
        title: '¿Qué te preocupa más al elegir una carrera?',
        body: 'Tu preocupación también importa. Nos ayuda a darte un plan más útil.',
        content: (
          <div className="chip-grid">
            {['No entender los cursos', 'Mucha matemática', 'Presión familiar', 'Modalidad', 'Costo de la carrera', 'Salir preparado'].map((item) => (
              <Chip key={item} active={worry === item} onClick={() => setWorry(item)}>
                {item}
              </Chip>
            ))}
          </div>
        ),
      },
    ]

    return values[step]
  }, [doubts, interests, name, skills, step, worry, year])

  const goNext = () => {
    if (step < totalSteps - 1) {
      setStep((current) => current + 1)
      return
    }

    setProfile({ name, year, interests, skills, doubts, worry })
    navigate('/home')
  }

  return (
    <AppFrame title="Diseñemos tu futuro profesional" subtitle="Queremos conocerte para que tu comparación sea 100% personalizada." progress={Math.round(((step + 1) / totalSteps) * 100)}>
      <Surface className="surface--stack surface--raised">
        <div className="stepper">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <span key={index} className={index <= step ? 'stepper__dot stepper__dot--active' : 'stepper__dot'} />
          ))}
        </div>
        <ScreenTitleBlock title={stepBody.title} body={stepBody.body} />
        {stepBody.content}
        <div className="info-banner">
          <Sparkles size={16} />
          <p>Usaremos esta información para encontrar las mallas curriculares que mejor se adapten a tu perfil.</p>
        </div>
        <div className="stack-actions">
          <SecondaryButton onClick={() => navigate('/home')}>Saltar por ahora</SecondaryButton>
          <PrimaryButton onClick={goNext}>{step === totalSteps - 1 ? 'Guardar y continuar' : 'Continuar'}</PrimaryButton>
        </div>
      </Surface>
    </AppFrame>
  )
}

function HomePage() {
  const { profile } = useAppContext()

  return (
    <AppFrame title={`Hola, ${profile.name}.`} subtitle="Tu decisión puede tener dudas, pero no tiene que estar desordenada." progress={45}>
      <Surface className="surface--stack">
        <div className="home-hero">
          <span className="eyebrow">Tu journey vocacional</span>
          <h2>Empieza comparando dos carreras. Luego entiende cursos y crea tu plan.</h2>
          <p>Comparamos con evidencia, no solo con opiniones. Todo pensado para que avances sin saturarte.</p>
        </div>
        <div className="home-grid">
          <LinkCard title="Comparar carreras" body="Selecciona Ingeniería de Sistemas e Ingeniería Industrial." to="/compare" />
          <LinkCard title="Entiende un curso" body="Traduce Principios de Algoritmos a lenguaje claro." to="/course/algoritmos" />
          <LinkCard title="Crea tu plan" body="Convierte tus dudas en próximos pasos." to="/plan" />
          <LinkCard title="Ver resumen" body="Guarda una pieza lista para compartir con tu familia." to="/summary" />
        </div>
      </Surface>
    </AppFrame>
  )
}

function SelectorPage() {
  const navigate = useNavigate()
  const { selectedCareers, toggleCareer } = useAppContext()
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('Todas')

  const filteredCareers = careers.filter((career) => {
    const matchQuery = `${career.name} ${career.area}`.toLowerCase().includes(query.toLowerCase())
    const matchFilter = filter === 'Todas' || career.area.toLowerCase().includes(filter.toLowerCase())

    return matchQuery && matchFilter
  })

  const canCompare = selectedCareers.length === 2

  return (
    <AppFrame title="Selecciona dos carreras que te llamen la atención." subtitle="Compara planes de estudio, demanda laboral y puntaje de afinidad." progress={60}>
      <Surface className="surface--stack">
        <div className="sticky-search">
          <label className="search-box">
            <Search size={16} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar carrera..." />
          </label>
          <div className="chip-row chip-row--scroll">
            {['Todas', 'Ingeniería', 'Negocios', 'Salud', 'Derecho', 'Psicología'].map((item) => (
              <Chip key={item} active={filter === item} onClick={() => setFilter(item)}>
                {item}
              </Chip>
            ))}
          </div>
        </div>

        {selectedCareers.length > 0 ? (
          <div className="selection-summary">
            <div>
              <span className="eyebrow">Comparando</span>
              <strong>{selectedCareers.length} de 2 seleccionadas</strong>
            </div>
            <div className="selection-summary__chips">
              {selectedCareers.map((careerId) => (
                <span key={careerId} className="mini-chip mini-chip--active">
                  {careers.find((career) => career.id === careerId)?.name}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <EmptyState title="Aún no seleccionaste carreras." body="Elige dos opciones para empezar a comparar." action={<SecondaryButton onClick={() => setQuery('')}>Explorar carreras</SecondaryButton>} />
        )}

        <div className="career-list">
          {filteredCareers.map((career) => (
            <CareerCard key={career.id} career={career} selected={selectedCareers.includes(career.id)} onSelect={() => toggleCareer(career.id)} />
          ))}
        </div>
      </Surface>

      <StickyCTA
        left={<span>Seleccionaste {selectedCareers.length} de 2</span>}
        right={<PrimaryButton disabled={!canCompare} onClick={() => navigate('/compare/result')}>{canCompare ? 'Comparar ahora' : 'Selecciona 2 carreras'}</PrimaryButton>}
      />
    </AppFrame>
  )
}

function ComparePage() {
  const navigate = useNavigate()
  const { selectedCareers, selectedComparisonTab, setComparisonTab } = useAppContext()
  const [selectedTab, setSelectedTab] = useState(selectedComparisonTab)

  useEffect(() => {
    setComparisonTab(selectedTab)
  }, [selectedTab, setComparisonTab])

  const first = careers.find((career) => career.id === selectedCareers[0]) ?? careers[0]
  const second = careers.find((career) => career.id === selectedCareers[1]) ?? careers[1]

  const tabContent = {
    Resumen: (
      <>
        <div className="compare-grid">
          <MatchScore career={first} />
          <MatchScore career={second} />
        </div>
        <Surface>
          <ScreenTitleBlock title="Diferencia rápida" body="Sistemas se apoya más en lógica y programación temprana. Industrial combina matemática, procesos y gestión." />
          <p className="insight-copy">{first.insight}</p>
        </Surface>
      </>
    ),
    Intensidad: (
      <div className="compare-columns">
        {[first, second].map((career) => (
          <Surface key={career.id}>
            <h3>{career.name}</h3>
            <IntensityBar label="Matemática" value={career.intensity.mathematics} />
            <IntensityBar label="Programación" value={career.intensity.programming} accent="var(--teal)" />
            <IntensityBar label="Gestión" value={career.intensity.management} accent="var(--lime)" />
            <IntensityBar label="Comunicación" value={career.intensity.communication} accent="var(--sky)" />
            <IntensityBar label="Pensamiento lógico" value={career.intensity.logic} accent="var(--blue-strong)" />
          </Surface>
        ))}
      </div>
    ),
    'Primer ciclo': (
      <div className="compare-columns">
        {[first, second].map((career) => (
          <Surface key={career.id}>
            <h3>{career.name}</h3>
            <div className="course-stack">
              {career.courses.map((course) => (
                <div key={course.id} className="course-compact" onClick={() => navigate(`/course/${course.id}`)} role="button" tabIndex={0}>
                  <div>
                    <span className="badge badge--soft">{course.cycle}</span>
                    <strong>{course.name}</strong>
                    <p>{course.explanation}</p>
                  </div>
                  <ChevronRight size={16} />
                </div>
              ))}
            </div>
          </Surface>
        ))}
      </div>
    ),
    Habilidades: (
      <div className="compare-columns">
        {[first, second].map((career) => (
          <Surface key={career.id}>
            <h3>{career.name}</h3>
            <div className="chip-row">
              {career.skills.map((skill) => <span key={skill} className="mini-chip">{skill}</span>)}
            </div>
            <div className="detail-list">
              <strong>Fortalezas</strong>
              {career.strengths.map((item) => <span key={item}>{item}</span>)}
            </div>
          </Surface>
        ))}
      </div>
    ),
    Insights: (
      <Surface>
        <ScreenTitleBlock title="Insight final" body="No se trata de decirte qué elegir, sino de ayudarte a conversar mejor." />
        <p className="insight-copy">{first.insight} {second.insight}</p>
      </Surface>
    ),
  }

  return (
    <AppFrame title="Ing. de Sistemas vs. Industrial" subtitle="Compara con evidencia, no solo con opiniones." progress={72}>
      <Surface className="surface--stack">
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

        <div className="tab-row">
          {comparisonTabs.map((tab) => (
            <Chip key={tab} active={selectedTab === tab} onClick={() => setSelectedTab(tab)}>{tab}</Chip>
          ))}
        </div>

        {tabContent[selectedTab as keyof typeof tabContent]}
      </Surface>

      <StickyCTA
        left={<span>Tu siguiente paso</span>}
        right={<PrimaryButton onClick={() => navigate('/match')}>Ver match con mi perfil</PrimaryButton>}
      />
    </AppFrame>
  )
}

function CoursePage() {
  const navigate = useNavigate()
  const { courseId } = useParams()
  const { savedCourses, toggleSavedCourse } = useAppContext()
  const course = careers.flatMap((career) => career.courses).find((item) => item.id === courseId) ?? careers[0].courses[0]
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 900)
    return () => window.clearTimeout(timer)
  }, [courseId])

  if (loading) {
    return (
      <AppFrame title="Estamos traduciendo el sílabo a lenguaje claro…" subtitle="Te mostraremos qué significa este curso en la práctica." progress={80}>
        <Surface className="surface--stack surface--raised">
          <div className="skeleton-cover" />
          <div className="skeleton-line skeleton-line--title" />
          <div className="skeleton-line" />
          <div className="skeleton-line" />
          <div className="skeleton-grid skeleton-grid--course">
            <div className="skeleton-box" />
            <div className="skeleton-box" />
          </div>
        </Surface>
      </AppFrame>
    )
  }

  return (
    <AppFrame title={course.name} subtitle="Este curso te enseña a pensar paso a paso, con claridad y práctica." progress={83}>
      <Surface className="surface--stack">
        <AIExplanationCard course={course} />
        <div className="course-detail-grid">
          <Surface>
            <h3>Qué aprenderás realmente</h3>
            <p>{course.explanation}</p>
          </Surface>
          <Surface>
            <h3>Qué tan exigente es</h3>
            <div className="difficulty-list">
              {course.difficulty.map((item) => <span key={item}>{item}</span>)}
            </div>
          </Surface>
        </div>
        <Surface>
          <h3>Cómo conecta con tu perfil</h3>
          <p>{course.impact}</p>
        </Surface>
      </Surface>

      <StickyCTA
        left={<SecondaryButton onClick={() => navigate('/compare/result')}>Volver a la comparación</SecondaryButton>}
        right={<PrimaryButton onClick={() => toggleSavedCourse(course.id)}>{savedCourses.includes(course.id) ? 'Curso guardado' : 'Guardar curso clave'}</PrimaryButton>}
      />
    </AppFrame>
  )
}

function MatchPage() {
  const navigate = useNavigate()
  const { selectedCareers } = useAppContext()
  const selected = selectedCareers.length ? selectedCareers : ['systems', 'industrial']

  return (
    <AppFrame title="Tu Match Perfecto" subtitle="Este resultado no decide por ti; te ayuda a conversar mejor." progress={88}>
      <Surface className="surface--stack">
        <div className="match-intro">
          <div>
            <span className="eyebrow">Personalizado para ti</span>
            <h2>Elige con más claridad, no con más presión.</h2>
            <p>Te mostramos fortalezas, riesgos y preguntas para decidir con más confianza.</p>
          </div>
        </div>

        <div className="match-grid">
          {selected.map((careerId) => {
            const career = careers.find((item) => item.id === careerId) ?? careers[0]

            return (
              <Surface key={career.id}>
                <div className="match-grid__head">
                  <div>
                    <span className="badge badge--area">{career.area}</span>
                    <h3>{career.name}</h3>
                  </div>
                  <div className="match-grid__score">{career.match}%</div>
                </div>
                <MatchScore career={career} />
                <div className="detail-list detail-list--split">
                  <strong>Fortalezas</strong>
                  {career.strengths.map((item) => <span key={item}>{item}</span>)}
                </div>
                <div className="detail-list detail-list--split detail-list--danger">
                  <strong>Riesgos a reforzar</strong>
                  {career.risks.map((item) => <span key={item}>{item}</span>)}
                </div>
              </Surface>
            )
          })}
        </div>

        <Surface>
          <h3>Preguntas para decidir mejor</h3>
          <div className="question-list">
            <span>¿Te motiva más construir tecnología o mejorar procesos?</span>
            <span>¿Te ves practicando programación cada semana?</span>
            <span>¿Te gusta coordinar personas y recursos?</span>
          </div>
        </Surface>
      </Surface>

      <StickyCTA
        left={<span>Próximo paso</span>}
        right={<PrimaryButton onClick={() => navigate('/plan')}>Crear mi plan</PrimaryButton>}
      />
    </AppFrame>
  )
}

function PlanPage() {
  const navigate = useNavigate()
  const { completedTasks, toggleTask } = useAppContext()
  const [saved, setSaved] = useState(false)

  const completedCount = completedTasks.length

  useEffect(() => {
    if (!saved) {
      return
    }

    const timer = window.setTimeout(() => setSaved(false), 1800)
    return () => window.clearTimeout(timer)
  }, [saved])

  return (
    <AppFrame title="Plan de Acción" subtitle="Ahora tienes próximos pasos claros para decidir mejor." progress={94}>
      <Surface className="surface--stack">
        <div className="plan-header">
          <div>
            <span className="eyebrow">{completedCount} tareas pendientes</span>
            <h2>Tu decisión merece pasos concretos.</h2>
          </div>
          <div className="progress-ring">
            <strong>{Math.round((completedCount / actionTasks.length) * 100)}%</strong>
            <span>avance</span>
          </div>
        </div>

        <div className="task-list">
          {actionTasks.map((task) => (
            <TaskItem key={task.id} title={task.title} description={task.description} priority={task.priority} due={task.due} checked={completedTasks.includes(task.id)} onToggle={() => toggleTask(task.id)} />
          ))}
        </div>

        <div className="community-card">
          <div>
            <span className="badge badge--soft">Comunidad UTP</span>
            <h3>Habla con alguien que ya lo vivió</h3>
            <p>Una conversación corta puede ayudarte más que una duda larga.</p>
          </div>
          <button className="community-card__img" type="button">Ver comunidad</button>
        </div>
      </Surface>

      {saved ? <StatusToast title="Tu plan fue guardado." body="Ahora tienes próximos pasos claros para decidir mejor." /> : null}

      <StickyCTA
        left={<SecondaryButton onClick={() => navigate('/summary')}>Ver resumen para compartir</SecondaryButton>}
        right={<PrimaryButton onClick={() => setSaved(true)}>Guardar plan</PrimaryButton>}
      />
    </AppFrame>
  )
}

function SummaryPage() {
  const { profile, selectedCareers } = useAppContext()
  
  const selectedCareer = careers.find((c) => c.id === selectedCareers[0]) ?? careers[0]
  const today = new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })

  const downloadSummary = () => {
    const content = `UTP Match\n${profile.name}\nCarrera recomendada: ${selectedCareer.name}\nMatch: ${selectedCareer.match}%\nFecha: ${today}`
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
    const url = window.URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = 'utp-match-resumen.txt'
    anchor.click()
    window.URL.revokeObjectURL(url)
  }

  const shareSummary = () => {
    const text = `Mi decisión aún puede tener dudas, pero ahora tengo razones claras para conversar.\n\nUTP Match / SyllabusX`
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <AppFrame title="Resumen de Perfil" subtitle="Un análisis detallado de tu futuro profesional." progress={100}>
      <Surface className="surface--stack">
        <div className="share-card share-card--premium">
          <div className="share-card__header">
            <div>
              <span className="brand brand--card">UTP Match</span>
              <p>Reporte de orientación vocacional</p>
            </div>
            <div className="share-card__date">{today}</div>
          </div>
          <div className="share-card__title-row">
            <div>
              <span className="badge badge--soft">Recomendación principal</span>
              <h2>{selectedCareer.name}</h2>
              <p>{selectedCareer.insight}</p>
            </div>
            <div className="share-card__match share-card__match--highlight">
              <div className="match-ring">{selectedCareer.match}%</div>
              <span className="match-label">MATCH</span>
            </div>
          </div>

          <div className="share-grid">
            <Surface>
              <h3>¿Por qué encaja?</h3>
              <p>Alta capacidad de abstracción, afinidad con entornos tecnológicos e interés genuino por cómo funcionan los sistemas digitales.</p>
            </Surface>
            <Surface>
              <h3>Tus habilidades clave</h3>
              <div className="chip-row">
                {profile.skills.map((skill) => <span key={skill} className="mini-chip">{skill}</span>)}
              </div>
            </Surface>
          </div>

          <Surface>
            <h3>Próximos pasos</h3>
            <div className="question-list">
              <span>Revisar malla curricular</span>
              <span>Agendar visita al campus</span>
            </div>
          </Surface>

          <div className="share-footer-note">
            <Sparkles size={14} />
            <p>“Este resultado no decide por ti; te ayuda a conversar mejor sobre tus intereses y fortalezas.”</p>
          </div>
        </div>
      </Surface>

      <div className="stack-actions stack-actions--summary">
        <PrimaryButton onClick={shareSummary}>Compartir por WhatsApp</PrimaryButton>
        <SecondaryButton onClick={downloadSummary}>Descargar resumen</SecondaryButton>
      </div>
    </AppFrame>
  )
}

function AdminPage() {
  return (
    <AppFrame title="Catálogo simplificado" subtitle="Esta vista es funcional, pero no compite con el flujo principal." progress={38}>
      <Surface className="surface--stack">
        <div className="sticky-search">
          <label className="search-box">
            <Search size={16} />
            <input placeholder="Buscar catálogo..." />
          </label>
          <div className="chip-row chip-row--scroll">
            {['Carreras', 'Cursos', 'Borradores', 'Publicados'].map((item) => <Chip key={item}>{item}</Chip>)}
          </div>
        </div>

        <Surface>
          <h3>Lista de carreras</h3>
          <div className="catalog-list">
            {adminCatalog.map((item) => (
              <div key={item.title} className="catalog-row">
                <div>
                  <strong>{item.title}</strong>
                  <p>Estado: {item.state}</p>
                </div>
                <CircleCheckBig size={18} />
              </div>
            ))}
          </div>
        </Surface>

        <PrimaryButton>Agregar curso</PrimaryButton>
      </Surface>
    </AppFrame>
  )
}

export default App
