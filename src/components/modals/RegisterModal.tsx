import { AnimatePresence, motion } from "framer-motion";
import { Mail, UserRound, X } from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";

export function RegisterModal({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (email: string, name: string) => void;
}) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!name.trim()) {
      setError("Falta tu nombre.");
      return;
    }

    setError("");
    onSubmit(email, name.trim());
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
              <h2>Crear sesion</h2>
              <button className="modal-close-button" onClick={onClose}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Nombre
                </label>
                <div className="form-input-wrapper">
                  <UserRound size={16} className="form-input-icon" />
                  <input
                    id="name"
                    type="text"
                    className="form-input"
                    placeholder="Tu nombre"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email-register" className="form-label">
                  Correo
                </label>
                <div className="form-input-wrapper">
                  <Mail size={16} className="form-input-icon" />
                  <input
                    id="email-register"
                    type="email"
                    className="form-input"
                    placeholder="tu@correo.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                </div>
              </div>

              {error ? <p className="auth-error">{error}</p> : null}

              <button type="submit" className="btn btn-primary">
                Crear
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
