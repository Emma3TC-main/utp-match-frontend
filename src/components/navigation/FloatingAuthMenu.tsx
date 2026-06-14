import { AnimatePresence, motion } from "framer-motion";
import { LogIn, LogOut, UserRound, X } from "lucide-react";
import { createPortal } from "react-dom";
import { useBodySidePanelLock } from "../hooks/useBodySidePanelLock";
import type { AuthUserMenu } from "../types/auth";

export function FloatingAuthMenu({
  isOpen,
  onClose,
  onLoginClick,
  onProfileClick,
  authUser,
  onLogout,
}: {
  isOpen: boolean;
  onClose: () => void;
  onLoginClick: () => void;
  onProfileClick?: () => void;
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
            className="side-auth-menu side-auth-menu--visual"
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
                aria-label="Cerrar menu"
              >
                <X size={16} />
              </button>
            </div>

            <div className="side-auth-body">
              <p>{authUser ? "Tu avance esta listo." : "Entra y guarda tu ruta."}</p>
              <div className="side-auth-actions">
                {authUser ? (
                  <>
                    <div className="side-user-card">
                      <span>
                        <UserRound size={18} />
                      </span>
                      <div>
                        <strong>{authUser.name || authUser.email}</strong>
                        <p>{authUser.email ?? "Sesion activa"}</p>
                      </div>
                    </div>

                    <button
                      className="side-btn"
                      type="button"
                      onClick={() => {
                        onProfileClick?.();
                        onClose();
                      }}
                    >
                      <UserRound size={16} />
                      <span>Ver perfil</span>
                    </button>

                    <button
                      className="side-btn"
                      type="button"
                      onClick={() => {
                        onLogout?.();
                        onClose();
                      }}
                    >
                      <LogOut size={16} />
                      <span>Cerrar sesion</span>
                    </button>
                  </>
                ) : (
                  <button
                    className="side-btn side-btn--primary"
                    type="button"
                    onClick={() => {
                      onLoginClick();
                      onClose();
                    }}
                  >
                    <LogIn size={16} />
                    <span>Entrar</span>
                  </button>
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
