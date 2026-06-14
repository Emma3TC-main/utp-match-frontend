import React, { useState } from 'react'
import { Mail, Lock } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppContext } from '../state/appState'

export default function LoginPage() {
  const navigate = useNavigate()
  const { setAuthUser } = useAppContext()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return setError('Correo inválido')
    if (password.length < 6) return setError('La contraseña debe tener al menos 6 caracteres')

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      
      const computedName = email.split('@')[0]
      window.localStorage.setItem('demo-user-name', computedName) 
      
      setAuthUser({ id: Math.random().toString(36).slice(2), email, name: computedName, phone: '', description: '', photo: '' })
      
      navigate('/home')
    }, 900)
  }

  return (
    <div className="auth-page auth-page--brand">
      <div className="auth-card">
        <h2>Iniciar sesión</h2>
        <p className="muted">Accede con tu correo para guardar tu progreso.</p>

          <form onSubmit={handleSubmit} className="auth-form">
          <label>
            <span>Correo</span>
            <div className="input-with-icon">
              <Mail size={16} />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@correo.com" required />
            </div>
          </label>

          <label>
            <span>Contraseña</span>
            <div className="input-with-icon">
              <Lock size={16} />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
            </div>
          </label>

          {error ? <div className="auth-error">{error}</div> : null}

          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? <span className="btn-loading" aria-hidden /> : 'Entrar'}
          </button>
        </form>

        <div className="auth-footer">
          <span>¿No tienes cuenta?</span>
          <Link to="/register" className="link">Regístrate</Link>
        </div>
      </div>
    </div>
  )
}
