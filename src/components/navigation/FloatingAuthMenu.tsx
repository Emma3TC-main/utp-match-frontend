import { AnimatePresence, motion } from "framer-motion";
import { LogIn, LogOut, X } from "lucide-react";
import { createPortal } from "react-dom";
import { useBodySidePanelLock } from "../hooks/useBodySidePanelLock";
import type { AuthUserMenu } from "../types/auth";

export function FloatingAuthMenu({
  isOpen,
  onClose,
  onLoginClick,
  authUser,
  onLogout,
}: {
  isOpen: boolean;
  onClose: () => void;
  onLoginClick: () => void;
  authUser?: AuthUserMenu;
  onLogout?: () => void;
}) {
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
            className="side-auth-menu"
            initial={{ x: 320 }}
            animate={{ x: 0 }}
            exit={{ x: 320 }}
            transition={{ type: "tween", duration: 0.22 }}
          >
            <div className="side-auth-header">
              <strong>Cuenta</strong>
              <button
                className="icon-button"
                onClick={onClose}
                aria-label="Cerrar menú"
              >
                <X size={16} />
              </button>
            </div>

            <div className="side-auth-body">
              <p>Accede o crea una cuenta para guardar tus planes.</p>
              <div className="side-auth-actions">
                {authUser ? (
                  <>
                    <div style={{ padding: "8px 0", color: "var(--text)" }}>
                      Conectado como{" "}
                      <strong style={{ display: "block" }}>
                        {authUser.name || authUser.email}
                      </strong>
                    </div>
                    <button
                      className="side-btn"
                      type="button"
                      onClick={() => {
                        if (onLogout) onLogout();
                        onClose();
                      }}
                    >
                      <LogOut size={16} />
                      <span>Cerrar sesión</span>
                    </button>
                  </>
                ) : (
                  <>
                    {/* Botón único y limpio hacia el login inteligente */}
                    <button
                      className="side-btn"
                      type="button"
                      onClick={() => {
                        onLoginClick();
                        onClose();
                      }}
                    >
                      <LogIn size={16} />
                      <span>Ingresar a mi cuenta</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}
