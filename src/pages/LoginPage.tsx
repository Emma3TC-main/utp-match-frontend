import type { FormEvent } from "react";
import { useState } from "react";
import { ArrowRight, Mail, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import { useAppContext } from "../state/appState";

export default function LoginPage() {
  const navigate = useNavigate();
  const { setAuthUser } = useAppContext();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError("Correo invalido.");
      return;
    }

    try {
      setLoading(true);
      const displayName = email.split("@")[0];
      const session = await authService.createGuestSession({
        displayName,
        metadata: {
          email,
          flow: "login-form",
        },
      });

      window.localStorage.setItem("utp-match-token", session.accessToken);
      setAuthUser({
        id: String(session.user.id),
        email,
        name: session.user.displayName ?? displayName,
        role: session.user.role,
        studentProfileId: session.user.studentProfileId,
      });

      navigate("/home");
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
          Sesion rapida
        </div>
        <h2>Vuelve a tu ruta</h2>
        <p className="muted">Usamos el backend real para crear tu sesion.</p>

        <form onSubmit={handleSubmit} className="auth-form">
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
            {loading ? <span className="btn-loading" aria-hidden /> : "Entrar"}
            {!loading ? <ArrowRight size={16} /> : null}
          </button>
        </form>

        <div className="auth-footer">
          <span>Nuevo?</span>
          <Link to="/register" className="link">
            Crear sesion
          </Link>
        </div>
      </div>
    </div>
  );
}
