import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Check, Download, Home, LayoutList, Sparkles, Target, UserRound, Zap, Sun, Moon } from 'lucide-react'
import type { CSSProperties, ReactNode } from 'react'
import { Link, NavLink } from 'react-router-dom'
import type { CareerData, CourseData } from '../data/demo'
import { useState } from 'react'


export function AppFrame({ children, title, subtitle, progress, showHelp = true }: { children: ReactNode; title?: string; subtitle?: string; progress?: number; showHelp?: boolean }) {
const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = window.localStorage.getItem('utp-match-theme')
    return savedTheme === 'dark'
  })

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const nextState = !prev
      window.localStorage.setItem('utp-match-theme', nextState ? 'dark' : 'light')
      return nextState
    })
  }
  const navItems = [
    { to: '/home', label: 'Inicio' },
    { to: '/compare', label: 'Comparar' },
    { to: '/plan', label: 'Mi plan' },
  ]

return (
    <div className={`app-shell transition-colors duration-250 ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>      
      <div className="app-phone">
                <header className="topbar">
          <Link className="topbar__brand" to="/welcome">UTP Match</Link>
          <nav className="topbar__nav" aria-label="Navegación principal">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} className={({ isActive }) => `topbar__link ${isActive ? 'topbar__link--active' : ''}`}>
                {item.label}
              </NavLink>
            ))}
          </nav>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifySelf: 'end' }}>
            <button 
              type="button"
              onClick={toggleTheme}
              className="flex items-center justify-center w-8 h-8 rounded-full border transition-all active:scale-90 cursor-pointer"
              style={{ 
                color: isDarkMode ? '#f59e0b' : '#475569', 
                backgroundColor: isDarkMode ? '#1e293b' : '#ffffff', 
                borderColor: isDarkMode ? '#334155' : '#cbd5e1',
                padding: 0,
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
              }}
              title={isDarkMode ? "Cambiar a Modo Claro" : "Cambiar a Modo Oscuro"}
            >
              {isDarkMode ? <Sun size={15} /> : <Moon size={15} />}
            </button>
            
            <Link className="topbar__cta" to="/onboarding">Empezar</Link>
          </div>
        </header>
        <div className="app-content">
          <header className="app-header">
            <div>
              <p className="brand">UTP Match</p>
              {title ? <h1 className="screen-title">{title}</h1> : null}
              {subtitle ? <p className="screen-subtitle">{subtitle}</p> : null}
            </div>
            <div className="header-actions">
              {typeof progress === 'number' ? <span className="progress-label">Paso {Math.max(1, Math.ceil(progress / 34))} de 3</span> : null}
              {showHelp ? <button className="icon-button" type="button"><Download size={16} /></button> : null}
              <button className="icon-button icon-button--accent" type="button"><UserRound size={18} /></button>
            </div>
          </header>
          {typeof progress === 'number' ? (
            <div className="progress-shell" aria-hidden="true">
              <div className="progress-track"><div className="progress-fill" style={{ width: `${progress}%` }} /></div>
            </div>
          ) : null}
          <main className="app-main">{children}</main>
        </div>

        <footer className="app-footer">
          <div>
            <strong>UTP Match</strong>
            <span>© 2024 UTP Match. Todos los derechos reservados.</span>
          </div>
          <nav aria-label="Enlaces legales">
            <a href="#">Privacidad</a>
            <a href="#">Términos</a>
            <a href="#">Contacto</a>
            <a href="#">UTP Institucional</a>
          </nav>
        </footer>
      </div>
    </div>
  )
}

export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={String(children)}
        initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: -12, filter: 'blur(8px)' }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
        className="page-motion"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

export function PrimaryButton(props: React.ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean }) {
  const { children, loading, className = '', ...rest } = props

  return (
    <button className={`btn btn-primary ${className}`} type="button" disabled={loading || rest.disabled} {...rest}>
      {loading ? <span className="spinner" aria-hidden="true" /> : null}
      <span>{children}</span>
    </button>
  )
}

export function SecondaryButton(props: React.ButtonHTMLAttributes<HTMLButtonElement> & { className?: string }) {
  const { children, className = '', ...rest } = props

  return (
    <button className={`btn btn-secondary ${className}`} type="button" {...rest}>
      <span>{children}</span>
    </button>
  )
}

export function Chip({ children, active = false, onClick }: { children: ReactNode; active?: boolean; onClick?: () => void }) {
  return (
    <button className={`chip ${active ? 'chip--active' : ''}`} type="button" onClick={onClick}>
      {children}
    </button>
  )
}

export function Surface({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <section className={`surface ${className}`}>{children}</section>
}

export function CareerCard({ career, selected, onSelect }: { career: CareerData; selected: boolean; onSelect: () => void }) {
  return (
    <motion.article whileTap={{ scale: 0.985 }} className={`career-card career-card--${career.id} ${selected ? 'career-card--selected' : ''}`}>
      <div className="career-card__media" style={{ '--match': `${career.match}%` } as CSSProperties}>
        <span>{career.match}%</span>
      </div>
      <div className="career-card__top">
        <span className="badge badge--soft">{career.badge}</span>
        <span className="badge badge--area">{career.area}</span>
      </div>
      <h3>{career.name}</h3>
      <p>{career.description}</p>
      <div className="chip-row">
        {career.skills.slice(0, 3).map((skill) => <span key={skill} className="mini-chip">{skill}</span>)}
      </div>
      <div className="meta-row">
        <span>{career.modality}</span>
        <span>Match {career.match}%</span>
      </div>
      <PrimaryButton onClick={onSelect}>{selected ? 'Seleccionada' : 'Seleccionar'}</PrimaryButton>
    </motion.article>
  )
}

export function MatchScore({ career }: { career: CareerData }) {
  return (
    <div className="match-score">
      <div className="match-score__ring" style={{ '--progress': career.match } as CSSProperties}>
        <div>
          <strong>{career.match}%</strong>
          <span>{career.matchLabel}</span>
        </div>
      </div>
      <p>{career.matchText}</p>
    </div>
  )
}

export function IntensityBar({ label, value, accent = 'var(--blue)' }: { label: string; value: number; accent?: string }) {
  return (
    <div className="intensity-bar">
      <div className="intensity-bar__row">
        <span>{label}</span>
        <strong>{value}%</strong>
      </div>
      <div className="intensity-bar__track">
        <motion.div className="intensity-bar__fill" initial={{ width: 0 }} animate={{ width: `${value}%`, background: accent }} transition={{ duration: 0.9, ease: 'easeOut' }} />
      </div>
    </div>
  )
}

export function CourseCard({ course, saved, onOpen, onSave }: { course: CourseData; saved: boolean; onOpen: () => void; onSave: () => void }) {
  return (
    <article className="course-card">
      <div className="course-card__head">
        <div>
          <span className="badge badge--soft">{course.cycle}</span>
          <span className="badge badge--area">{course.area}</span>
        </div>
        <span className="course-card__intensity">Intensidad {course.intensityLabel}</span>
      </div>
      <h4>{course.name}</h4>
      <p>{course.explanation}</p>
      <div className="course-card__foot">
        <button className="link-button" type="button" onClick={onOpen}>Ver explicado <ArrowRight size={14} /></button>
        <button className={`save-pill ${saved ? 'save-pill--active' : ''}`} type="button" onClick={onSave}>{saved ? 'Guardado' : 'Guardar curso'}</button>
      </div>
    </article>
  )
}

export function AIExplanationCard({ course }: { course: CourseData }) {
  return (
    <div className="ai-card">
      <div className="ai-card__tag"><Sparkles size={14} /> Traducido con IA</div>
      <h3>{course.name}</h3>
      <p className="ai-card__lead">{course.explanation}</p>
      <div className="ai-card__grid">
        <div><span>Por qué importa</span><strong>{course.impact}</strong></div>
        <div><span>Qué habilidad desarrolla</span><strong>{course.skill}</strong></div>
      </div>
      <div className="difficulty-list">
        {course.difficulty.map((item) => <span key={item}>{item}</span>)}
      </div>
    </div>
  )
}

export function TaskItem({ title, description, priority, due, checked, onToggle }: { title: string; description: string; priority: string; due: string; checked: boolean; onToggle: () => void }) {
  return (
    <button type="button" className={`task-item ${checked ? 'task-item--checked' : ''}`} onClick={onToggle}>
      <span className="task-item__check">{checked ? <Check size={15} /> : null}</span>
      <span className="task-item__content">
        <strong>{title}</strong>
        <span>{description}</span>
        <span className="task-item__meta"><em>{priority}</em> · Vence: {due}</span>
      </span>
    </button>
  )
}

export function BottomNav() {
  const items = [
    { to: '/home', label: 'Inicio', icon: Home },
    { to: '/compare', label: 'Comparar', icon: LayoutList },
    { to: '/match', label: 'Match', icon: Target },
    { to: '/plan', label: 'Plan', icon: Zap },
  ]

  return (
    <nav className="bottom-nav" aria-label="Navegación principal">
      {items.map((item) => {
        const Icon = item.icon

        return (
          <NavLink key={item.to} to={item.to} className={({ isActive }) => `bottom-nav__item ${isActive ? 'bottom-nav__item--active' : ''}`}>
            <Icon size={18} />
            <span>{item.label}</span>
          </NavLink>
        )
      })}
    </nav>
  )
}

export function StickyCTA({ left, right, compact = false }: { left?: ReactNode; right?: ReactNode; compact?: boolean }) {
  return <div className={`sticky-cta ${compact ? 'sticky-cta--compact' : ''}`}>{left}{right}</div>
}

export function StatusToast({ title, body }: { title: string; body: string }) {
  return (
    <div className="toast">
      <strong>{title}</strong>
      <span>{body}</span>
    </div>
  )
}

export function EmptyState({ title, body, action }: { title: string; body: string; action?: ReactNode }) {
  return (
    <div className="empty-state">
      <strong>{title}</strong>
      <p>{body}</p>
      {action}
    </div>
  )
}

export function ScreenTitleBlock({ eyebrow, title, body }: { eyebrow?: string; title: string; body: string }) {
  return (
    <div className="title-block">
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h2>{title}</h2>
      <p>{body}</p>
    </div>
  )
}

export function LinkCard({ title, body, to }: { title: string; body: string; to: string }) {
  return (
    <Link className="link-card" to={to}>
      <div>
        <strong>{title}</strong>
        <p>{body}</p>
      </div>
      <ArrowRight size={18} />
    </Link>
  )
}
