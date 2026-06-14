import React, { useState } from 'react'
import { Mail, Lock } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppContext } from '../state/appState'

export default function RegisterPage() {
  const navigate = useNavigate()
  const { setAuthUser } = useAppContext()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!name.trim()) return setError('Ingresa tu nombre')
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return setError('Correo inválido')
    if (password.length < 6) return setError('La contraseña debe tener al menos 6 caracteres')

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      
      window.localStorage.setItem('demo-user-name', name) 
      
      setAuthUser({ id: Math.random().toString(36).slice(2), email, name, phone: '', description: '', photo: '' })
      
      navigate('/onboarding')
    }, 900)
  }

  return (
    <div className="auth-page auth-page--brand">
      <div className="auth-card">
        <h2>Crear cuenta</h2>
        <p className="muted">Regístrate y guarda tu plan personal.</p>

          <form onSubmit={handleSubmit} className="auth-form">
            <label>
              <span>Nombre</span>
              <div className="input-with-icon">
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Tu nombre" required />
              </div>
            </label>

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
            {loading ? <span className="btn-loading" aria-hidden /> : 'Crear cuenta'}
          </button>
        </form>

        <div className="auth-footer">
          <span>¿Ya tienes cuenta?</span>
          <Link to="/login" className="link">Inicia sesión</Link>
        </div>
      </div>
    </div>
  )
}
