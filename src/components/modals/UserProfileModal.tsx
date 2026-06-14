import { AnimatePresence, motion } from "framer-motion";
import { Mail, Phone, Upload, UserRound, X } from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";
import { createPortal } from "react-dom";
import { useBodySidePanelLock } from "../hooks/useBodySidePanelLock";
import type { ProfileUpdates, ProfileUser } from "../types/auth";

export function UserProfileModal({
  isOpen,
  onClose,
  user,
  onUpdate,
}: {
  isOpen: boolean;
  onClose: () => void;
  user: ProfileUser;
  onUpdate: (updates: ProfileUpdates) => void;
}) {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    description: user?.description || "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
  };

  useBodySidePanelLock(isOpen, onClose);

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
            className="profile-side-menu"
            initial={{ x: 420 }}
            animate={{ x: 0 }}
            exit={{ x: 420 }}
            transition={{ type: "tween", duration: 0.22 }}
          >
            <div className="side-auth-header">
              <strong>Mi perfil</strong>
              <button
                className="icon-button"
                onClick={onClose}
                aria-label="Cerrar menú"
              >
                <X size={18} />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="modal-form profile-side-body"
            >
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
                <label htmlFor="profile-name" className="form-label">
                  Nombre
                </label>
                <div className="form-input-wrapper">
                  <UserRound size={16} className="form-input-icon" />
                  <input
                    id="profile-name"
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
                <label className="form-label">Correo electrónico</label>
                <div
                  className="form-input-wrapper"
                  style={{ opacity: 0.6, pointerEvents: "none" }}
                >
                  <Mail size={16} className="form-input-icon" />
                  <input
                    type="email"
                    className="form-input"
                    placeholder={user?.email}
                    disabled
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="profile-phone" className="form-label">
                  Celular
                </label>
                <div className="form-input-wrapper">
                  <Phone size={16} className="form-input-icon" />
                  <input
                    id="profile-phone"
                    type="tel"
                    className="form-input"
                    placeholder="+51 999 999 999"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="profile-description" className="form-label">
                  Descripción
                </label>
                <textarea
                  id="profile-description"
                  className="form-input form-textarea"
                  placeholder="Cuéntame sobre ti..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: "100%" }}
              >
                Guardar cambios
              </button>
            </form>
          </motion.aside>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}
