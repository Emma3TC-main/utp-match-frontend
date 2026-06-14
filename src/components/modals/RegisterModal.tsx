import { AnimatePresence, motion } from "framer-motion";
import { AtSign, Lock, Mail, UserRound, X } from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";
import type { AuthFormData } from "../types/auth";

export function RegisterModal({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (email: string, password: string, name: string) => void;
}) {
  const [formData, setFormData] = useState<AuthFormData>({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }
    onSubmit(formData.email, formData.password, formData.name || "");
    setError("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="modal-overlay"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
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
                <label htmlFor="name" className="form-label">
                  Nombre completo
                </label>
                <div className="form-input-wrapper">
                  <UserRound size={16} className="form-input-icon" />
                  <input
                    id="name"
                    type="text"
                    className="form-input"
                    placeholder="Tu nombre"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email-register" className="form-label">
                  Correo electrónico
                </label>
                <div className="form-input-wrapper">
                  <Mail size={16} className="form-input-icon" />
                  <input
                    id="email-register"
                    type="email"
                    className="form-input"
                    placeholder="tu@correo.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password-register" className="form-label">
                  Contraseña
                </label>
                <div className="form-input-wrapper">
                  <Lock size={16} className="form-input-icon" />
                  <input
                    id="password-register"
                    type="password"
                    className="form-input"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="confirm-password" className="form-label">
                  Confirmar contraseña
                </label>
                <div className="form-input-wrapper">
                  <Lock size={16} className="form-input-icon" />
                  <input
                    id="confirm-password"
                    type="password"
                    className="form-input"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              {error && (
                <p style={{ color: "var(--red-alert)", fontSize: "0.875rem" }}>
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: "100%" }}
              >
                Crear cuenta
              </button>
            </form>

            <div className="modal-divider">o continúa con</div>

            <div className="modal-social-buttons">
              <button className="social-button social-button--google" disabled>
                <Mail size={16} />
                Gmail
              </button>
              <button
                className="social-button social-button--microsoft"
                disabled
              >
                <AtSign size={16} />
                Microsoft
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
