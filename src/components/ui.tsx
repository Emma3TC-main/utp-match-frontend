import { AnimatePresence, motion } from 'framer-motion'
import { createPortal } from 'react-dom'
import { ArrowRight, Check, Home, LayoutList, Sparkles, Target, UserRound, Zap, Sun, Moon, LogIn, UserPlus, X, Mail, Lock, AtSign, Phone, FileText, Upload, LogOut, Code2, Cog, TrendingUp, Megaphone, Building2, Scale, Brain, Layers } from 'lucide-react'
import type { CSSProperties, ReactNode } from 'react'
import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import type { CareerData, CourseData, CareerId } from '../data/demo'
import { useAppContext } from '../state/appState'


export function AppFrame({ children, title, subtitle, progress, showHelp = true }: { children: ReactNode; title?: string; subtitle?: string; progress?: number; showHelp?: boolean }) {

  const { authUser, setAuthUser, updateAuthUser } = useAppContext()
  const location = useLocation()
  
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = window.localStorage.getItem('utp-match-theme')
    return savedTheme === 'dark'
  })

  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [showSideMenu, setShowSideMenu] = useState(false)

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const nextState = !prev
      window.localStorage.setItem('utp-match-theme', nextState ? 'dark' : 'light')
      window.dispatchEvent(new Event('utp-theme-toggle'))
      return nextState
    })
  }

  const shouldShowUserIcon = ['/home', '/compare', '/plan'].includes(location.pathname)

  const navItems = [
    { to: '/home', label: 'Inicio' },
    { to: '/compare', label: 'Comparar' },
    { to: '/plan', label: 'Mi plan' },
  ]

  const handleLoginSubmit = (email: string, password: string) => {
    // Simulamos login - en producción sería una llamada a API
    setAuthUser({
      id: Math.random().toString(),
      email,
      name: email.split('@')[0],
      phone: '',
      description: '',
      photo: '',
    })
    setShowLoginModal(false)
  }

  const handleRegisterSubmit = (email: string, password: string, name: string) => {
    // Simulamos registro - en producción sería una llamada a API
    setAuthUser({
      id: Math.random().toString(),
      email,
      name,
      phone: '',
      description: '',
      photo: '',
    })
    setShowRegisterModal(false)
  }
  const navigate = useNavigate()

  const handleProfileUpdate = (updates: { name?: string; phone?: string; description?: string }) => {
    updateAuthUser(updates)
    setShowProfileModal(false)
  }

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
            
            <button
              type="button"
              className="topbar__cta topbar__hamburger"
              onClick={() => setShowSideMenu((s) => !s)}
              aria-label="Abrir menú"
            >
              <LayoutList size={18} />
            </button>
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
              {typeof progress === 'number' ? (
                <span className="progress-label">Paso {Math.max(1, Math.ceil(progress / 34))} de 3</span>
              ) : null}
              
              {/* Lógica condicional segura para el icono de perfil */}
              {authUser ? (
                <button 
                  className="icon-button icon-button--accent" 
                  type="button"
                  onClick={() => navigate('/login')}
                  title="Mi perfil"
                >
                  <UserRound size={18} />
                </button>
              ) : (
                <button 
                  className="icon-button" 
                  type="button" 
                  onClick={() => navigate('/login')}
                >
                  <UserRound size={18} />
                </button>
              )}
            </div>
          </header>

          {typeof progress === 'number' ? (
            <div className="progress-shell" aria-hidden="true">
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${progress}%` }} />
              </div>
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

type CareerImageConfig = {
  colors: { primary: string; secondary: string; accent: string }
  icon: typeof Code2
  pattern: 'lines' | 'dots' | 'waves' | 'grid'
}

const careerImageConfigs: Record<CareerId, CareerImageConfig> = {
  systems: {
    colors: { primary: '#0d92f4', secondary: '#0066cc', accent: '#00d9ff' },
    icon: Code2,
    pattern: 'grid',
  },
  industrial: {
    colors: { primary: '#6b5b95', secondary: '#3d3b4d', accent: '#9b8eb8' },
    icon: Cog,
    pattern: 'lines',
  },
  administration: {
    colors: { primary: '#1abc9c', secondary: '#0d8659', accent: '#2ecc71' },
    icon: TrendingUp,
    pattern: 'waves',
  },
  marketing: {
    colors: { primary: '#e74c3c', secondary: '#c0392b', accent: '#e67e22' },
    icon: Megaphone,
    pattern: 'dots',
  },
  civil: {
    colors: { primary: '#34495e', secondary: '#1a252f', accent: '#5d6d7b' },
    icon: Building2,
    pattern: 'grid',
  },
  law: {
    colors: { primary: '#8e44ad', secondary: '#6c3483', accent: '#af7ac5' },
    icon: Scale,
    pattern: 'lines',
  },
  psychology: {
    colors: { primary: '#f39c12', secondary: '#d68910', accent: '#f8c471' },
    icon: Brain,
    pattern: 'waves',
  },
  architecture: {
    colors: { primary: '#16a085', secondary: '#117a65', accent: '#48c9b0' },
    icon: Layers,
    pattern: 'dots',
  },
}

function generateCareerImage(careerId: CareerId) {
  const config = careerImageConfigs[careerId]
  const Icon = config.icon

  const patterns = {
    lines: (
      <defs>
        <pattern id="lines" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="20" stroke={config.colors.secondary} strokeWidth="2" opacity="0.3" />
          <line x1="10" y1="0" x2="10" y2="20" stroke={config.colors.secondary} strokeWidth="1" opacity="0.15" />
        </pattern>
      </defs>
    ),
    dots: (
      <defs>
        <pattern id="dots" x="0" y="0" width="25" height="25" patternUnits="userSpaceOnUse">
          <circle cx="12.5" cy="12.5" r="3" fill={config.colors.secondary} opacity="0.25" />
          <circle cx="12.5" cy="12.5" r="1.5" fill={config.colors.accent} opacity="0.4" />
        </pattern>
      </defs>
    ),
    waves: (
      <defs>
        <pattern id="waves" x="0" y="0" width="80" height="40" patternUnits="userSpaceOnUse">
          <path d="M0,20 Q20,10 40,20 T80,20" stroke={config.colors.secondary} strokeWidth="1.5" fill="none" opacity="0.2" />
          <path d="M0,30 Q20,20 40,30 T80,30" stroke={config.colors.secondary} strokeWidth="1" fill="none" opacity="0.1" />
        </pattern>
      </defs>
    ),
    grid: (
      <defs>
        <pattern id="grid" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
          <rect x="0" y="0" width="30" height="30" fill="none" stroke={config.colors.secondary} strokeWidth="1" opacity="0.2" />
        </pattern>
      </defs>
    ),
  }

  return (
    <svg width="100%" height="100%" viewBox="0 0 300 180" preserveAspectRatio="xMidYMid slice" style={{ display: 'block' }}>
      {/* Background gradient */}
      <defs>
        <linearGradient id={`grad-${careerId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: config.colors.primary, stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: config.colors.secondary, stopOpacity: 1 }} />
        </linearGradient>
      </defs>

      {/* Base rectangle */}
      <rect width="300" height="180" fill={`url(#grad-${careerId})`} />

      {/* Pattern */}
      {patterns[config.pattern]}
      <rect width="300" height="180" fill={`url(#${config.pattern})`} />

      {/* Icon background circle */}
      <circle cx="150" cy="90" r="55" fill={config.colors.accent} opacity="0.15" />
      <circle cx="150" cy="90" r="45" fill="none" stroke={config.colors.accent} strokeWidth="1" opacity="0.3" />

      {/* Icon */}
      <g transform="translate(150, 90)">
        <foreignObject x="-20" y="-20" width="40" height="40">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon size={40} color="white" strokeWidth={1.5} />
          </div>
        </foreignObject>
      </g>
    </svg>
  )
}

export function CareerCard({ career, selected, onSelect }: { career: CareerData; selected: boolean; onSelect: () => void }) {
  return (
    <motion.article whileTap={{ scale: 0.985 }} className={`career-card career-card--${career.id} ${selected ? 'career-card--selected' : ''}`}>
      <div className="career-card__media" style={{ '--match': `${career.match}%` } as CSSProperties}>
        {generateCareerImage(career.id)}
        <span className="career-card__match-badge">{career.match}%</span>
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
      <PrimaryButton className={selected ? 'btn--selected' : ''} onClick={onSelect}>{selected ? 'Seleccionada' : 'Seleccionar'}</PrimaryButton>
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

export function FloatingAuthMenu({ isOpen, onClose, onLoginClick, onRegisterClick, authUser, onLogout }: { isOpen: boolean; onClose: () => void; onLoginClick: () => void; onRegisterClick: () => void; authUser?: { id:string; email:string; name:string } | null; onLogout?: () => void }) {
  useEffect(() => {
    if (!isOpen) return

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    // Disable body scroll while side menu is open
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.body.classList.add('side-open')

    window.addEventListener('keydown', handleKey)
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = prevOverflow
      document.body.classList.remove('side-open')
    }
  }, [isOpen, onClose])

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="side-auth-overlay"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.aside
            className="side-auth-menu"
            initial={{ x: 320 }}
            animate={{ x: 0 }}
            exit={{ x: 320 }}
            transition={{ type: 'tween', duration: 0.22 }}
          >
            <div className="side-auth-header">
              <strong>Cuenta</strong>
              <button className="icon-button" onClick={onClose} aria-label="Cerrar menú"><X size={16} /></button>
            </div>

            <div className="side-auth-body">
              <p>Accede o crea una cuenta para guardar tus planes.</p>
              <div className="side-auth-actions">
                {authUser ? (
                  // When logged in, show logout action
                  <>
                    <div style={{padding:'8px 0', color:'var(--text)'}}>Conectado como <strong style={{display:'block'}}>{authUser.name || authUser.email}</strong></div>
                    <button className="side-btn" onClick={() => { if (onLogout) onLogout(); onClose() }}><LogOut size={16} /><span>Cerrar sesión</span></button>
                  </>
                ) : (
                  <>
                    <button className="side-btn" onClick={onLoginClick}><LogIn size={16} /><span>Iniciar sesión</span></button>
                    <button className="side-btn" onClick={onRegisterClick}><UserPlus size={16} /><span>Registrarse</span></button>
                  </>
                )}
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>,
    document.body
  )
}

type FormData = {
  email: string
  password: string
  name?: string
  confirmPassword?: string
}

export function LoginModal({ isOpen, onClose, onSubmit }: { isOpen: boolean; onClose: () => void; onSubmit: (email: string, password: string) => void }) {
  const [formData, setFormData] = useState<FormData>({ email: '', password: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData.email, formData.password)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div className="modal-overlay" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          <motion.div
            className="modal-container modal-container--glass"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="modal-header">
              <h2>Iniciar sesión</h2>
              <button className="modal-close-button" onClick={onClose}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label htmlFor="email" className="form-label">Correo electrónico</label>
                <div className="form-input-wrapper">
                  <Mail size={16} className="form-input-icon" />
                  <input
                    id="email"
                    type="email"
                    className="form-input"
                    placeholder="tu@correo.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">Contraseña</label>
                <div className="form-input-wrapper">
                  <Lock size={16} className="form-input-icon" />
                  <input
                    id="password"
                    type="password"
                    className="form-input"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                Iniciar sesión
              </button>
            </form>

            <div className="modal-divider">o continúa con</div>

            <div className="modal-social-buttons">
              <button className="social-button social-button--google" disabled>
                <Mail size={16} />
                Gmail
              </button>
              <button className="social-button social-button--microsoft" disabled>
                <AtSign size={16} />
                Microsoft
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export function RegisterModal({ isOpen, onClose, onSubmit }: { isOpen: boolean; onClose: () => void; onSubmit: (email: string, password: string, name: string) => void }) {
  const [formData, setFormData] = useState<FormData>({ email: '', password: '', confirmPassword: '', name: '' })
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }
    onSubmit(formData.email, formData.password, formData.name || '')
    setError('')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div className="modal-overlay" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          <motion.div
            className="modal-container modal-container--glass"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="modal-header">
              <h2>Crear cuenta</h2>
              <button className="modal-close-button" onClick={onClose}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label htmlFor="name" className="form-label">Nombre completo</label>
                <div className="form-input-wrapper">
                  <UserRound size={16} className="form-input-icon" />
                  <input
                    id="name"
                    type="text"
                    className="form-input"
                    placeholder="Tu nombre"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email-register" className="form-label">Correo electrónico</label>
                <div className="form-input-wrapper">
                  <Mail size={16} className="form-input-icon" />
                  <input
                    id="email-register"
                    type="email"
                    className="form-input"
                    placeholder="tu@correo.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password-register" className="form-label">Contraseña</label>
                <div className="form-input-wrapper">
                  <Lock size={16} className="form-input-icon" />
                  <input
                    id="password-register"
                    type="password"
                    className="form-input"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="confirm-password" className="form-label">Confirmar contraseña</label>
                <div className="form-input-wrapper">
                  <Lock size={16} className="form-input-icon" />
                  <input
                    id="confirm-password"
                    type="password"
                    className="form-input"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  />
                </div>
              </div>

              {error && <p style={{ color: 'var(--red-alert)', fontSize: '0.875rem' }}>{error}</p>}

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                Crear cuenta
              </button>
            </form>

            <div className="modal-divider">o continúa con</div>

            <div className="modal-social-buttons">
              <button className="social-button social-button--google" disabled>
                <Mail size={16} />
                Gmail
              </button>
              <button className="social-button social-button--microsoft" disabled>
                <AtSign size={16} />
                Microsoft
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export function UserProfileModal({ isOpen, onClose, user, onUpdate }: { isOpen: boolean; onClose: () => void; user: { name: string; email: string; phone?: string; description?: string; photo?: string } | null; onUpdate: (updates: { name?: string; phone?: string; description?: string }) => void }) {
  const [formData, setFormData] = useState({ name: user?.name || '', phone: user?.phone || '', description: user?.description || '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdate(formData)
  }
  useEffect(() => {
    if (!isOpen) return

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.body.classList.add('side-open')

    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = prevOverflow
      document.body.classList.remove('side-open')
    }
  }, [isOpen, onClose])

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div className="side-auth-overlay" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />

          <motion.aside className="profile-side-menu" initial={{ x: 420 }} animate={{ x: 0 }} exit={{ x: 420 }} transition={{ type: 'tween', duration: 0.22 }}>
            <div className="side-auth-header">
              <strong>Mi perfil</strong>
              <button className="icon-button" onClick={onClose} aria-label="Cerrar menú"><X size={18} /></button>
            </div>

            <form onSubmit={handleSubmit} className="modal-form profile-side-body">
              <div className="profile-photo-section">
                <div className="profile-photo-placeholder">
                  <UserRound size={40} />
                </div>
                <button className="profile-photo-button" type="button" disabled>
                  <Upload size={14} />
                  Cambiar foto
                </button>
              </div>

              <div className="form-group">
                <label htmlFor="profile-name" className="form-label">Nombre</label>
                <div className="form-input-wrapper">
                  <UserRound size={16} className="form-input-icon" />
                  <input id="profile-name" type="text" className="form-input" placeholder="Tu nombre" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Correo electrónico</label>
                <div className="form-input-wrapper" style={{ opacity: 0.6, pointerEvents: 'none' }}>
                  <Mail size={16} className="form-input-icon" />
                  <input type="email" className="form-input" placeholder={user?.email} disabled />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="profile-phone" className="form-label">Celular</label>
                <div className="form-input-wrapper">
                  <Phone size={16} className="form-input-icon" />
                  <input id="profile-phone" type="tel" className="form-input" placeholder="+51 999 999 999" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="profile-description" className="form-label">Descripción</label>
                <textarea id="profile-description" className="form-input form-textarea" placeholder="Cuéntame sobre ti..." value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Guardar cambios</button>
            </form>
          </motion.aside>
        </>
      )}
    </AnimatePresence>,
    document.body
  )
}

