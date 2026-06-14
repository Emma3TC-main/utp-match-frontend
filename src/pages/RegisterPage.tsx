import type { FormEvent } from "react";
import { useState } from "react";
import { ArrowRight, Mail, Sparkles, UserRound } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import { useAppContext } from "../state/appState";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { patchProfile, setAuthUser } = useAppContext();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Falta tu nombre.");
      return;
    }

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError("Correo invalido.");
      return;
    }

    try {
      setLoading(true);
      const session = await authService.createGuestSession({
        displayName: name.trim(),
        metadata: {
          email,
          flow: "register-form",
        },
      });

      window.localStorage.setItem("utp-match-token", session.accessToken);
      setAuthUser({
        id: String(session.user.id),
        email,
        name: session.user.displayName ?? name.trim(),
        role: session.user.role,
        studentProfileId: session.user.studentProfileId,
      });
      patchProfile({
        userId: String(session.user.id),
        name: name.trim(),
      });

      navigate("/onboarding");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Intenta otra vez.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page auth-page--brand auth-page--visual">
      <div className="auth-card auth-card--visual">
        <div className="auth-visual-badge">
          <Sparkles size={17} />
          Guarda avance
        </div>
        <h2>Crea tu sesion</h2>
        <p className="muted">Rapido. Sin clave por ahora.</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            <span>Nombre</span>
            <div className="input-with-icon">
              <UserRound size={16} />
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Tu nombre"
                required
              />
            </div>
          </label>

          <label>
            <span>Correo</span>
            <div className="input-with-icon">
              <Mail size={16} />
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="tu@correo.com"
                required
              />
            </div>
          </label>

          {error ? <div className="auth-error">{error}</div> : null}

          <button className="btn btn-primary auth-submit" type="submit" disabled={loading}>
            {loading ? <span className="btn-loading" aria-hidden /> : "Crear"}
            {!loading ? <ArrowRight size={16} /> : null}
          </button>
        </form>

        <div className="auth-footer">
          <span>Ya tienes?</span>
          <Link to="/login" className="link">
            Entrar
          </Link>
        </div>
      </div>
    </div>
  );
}
