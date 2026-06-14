import { AnimatePresence, motion } from "framer-motion";
import { AtSign, Lock, Mail, X } from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";
import type { AuthFormData } from "../types/auth";

export function LoginModal({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (email: string, password: string) => void;
}) {
  const [formData, setFormData] = useState<AuthFormData>({
    email: "",
    password: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData.email, formData.password);
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
              <h2>Iniciar sesión</h2>
              <button className="modal-close-button" onClick={onClose}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Correo electrónico
                </label>
                <div className="form-input-wrapper">
                  <Mail size={16} className="form-input-icon" />
                  <input
                    id="email"
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
                <label htmlFor="password" className="form-label">
                  Contraseña
                </label>
                <div className="form-input-wrapper">
                  <Lock size={16} className="form-input-icon" />
                  <input
                    id="password"
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

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: "100%" }}
              >
                Iniciar sesión
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
