import { LayoutList, Moon, Sun, UserRound } from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { TOPBAR_NAV_ITEMS, USER_ICON_ROUTES } from "../constants/navigation";
import { useThemeMode } from "../hooks/useThemeMode";
import { LoginModal } from "../modals/LoginModal";
import { RegisterModal } from "../modals/RegisterModal";
import { UserProfileModal } from "../modals/UserProfileModal";
import { FloatingAuthMenu } from "../navigation/FloatingAuthMenu";
import { useAppContext } from "../../state/appState";
import type { ProfileUpdates } from "../types/auth";

export function AppFrame({
  children,
  title,
  subtitle,
  progress,
  showHelp = true,
}: {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  progress?: number;
  showHelp?: boolean;
}) {
  const { authUser, setAuthUser, updateAuthUser } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useThemeMode();

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showSideMenu, setShowSideMenu] = useState(false);

  const shouldShowUserIcon = USER_ICON_ROUTES.includes(location.pathname);
  void showHelp;
  void shouldShowUserIcon;

  const handleLoginSubmit = (email: string, password: string) => {
    // Simulamos login - en producción sería una llamada a API
    setAuthUser({
      id: Math.random().toString(),
      email,
      name: email.split("@")[0],
      phone: "",
      description: "",
      photo: "",
    });
    setShowLoginModal(false);
  };

  const handleRegisterSubmit = (
    email: string,
    password: string,
    name: string,
  ) => {
    // Simulamos registro - en producción sería una llamada a API
    setAuthUser({
      id: Math.random().toString(),
      email,
      name,
      phone: "",
      description: "",
      photo: "",
    });
    setShowRegisterModal(false);
  };

  const handleProfileUpdate = (updates: ProfileUpdates) => {
    updateAuthUser(updates);
    setShowProfileModal(false);
  };

  return (
    <div
      className={`app-shell transition-colors duration-250 ${isDarkMode ? "dark-theme" : "light-theme"}`}
    >
      <div className="app-phone">
        <header className="topbar">
          <Link className="topbar__brand" to="/welcome">
            UTP Match
          </Link>
          <nav className="topbar__nav" aria-label="Navegación principal">
            {TOPBAR_NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `topbar__link ${isActive ? "topbar__link--active" : ""}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              justifySelf: "end",
            }}
          >
            <button
              type="button"
              onClick={toggleTheme}
              className="flex items-center justify-center w-8 h-8 rounded-full border transition-all active:scale-90 cursor-pointer"
              style={{
                color: isDarkMode ? "#f59e0b" : "#475569",
                backgroundColor: isDarkMode ? "#1e293b" : "#ffffff",
                borderColor: isDarkMode ? "#334155" : "#cbd5e1",
                padding: 0,
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              }}
              title={
                isDarkMode ? "Cambiar a Modo Claro" : "Cambiar a Modo Oscuro"
              }
            >
              {isDarkMode ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            <button
              type="button"
              className="topbar__cta topbar__hamburger"
              onClick={() => setShowSideMenu((s) => !s)}
              aria-label="Abrir menú"
            >
              <LayoutList size={18} />
            </button>
          </div>
        </header>

        <div className="app-content">
          <header className="app-header">
            <div>
              <p className="brand">UTP Match</p>
              {title ? <h1 className="screen-title">{title}</h1> : null}
              {subtitle ? <p className="screen-subtitle">{subtitle}</p> : null}
            </div>

            <div className="header-actions">
              {typeof progress === "number" ? (
                <span className="progress-label">
                  Paso {Math.max(1, Math.ceil(progress / 34))} de 3
                </span>
              ) : null}
              <button
                className="icon-button icon-button--accent"
                type="button"
                onClick={() => setShowSideMenu(true)}
                title="Cuenta"
              >
                <UserRound size={18} />
              </button>
            </div>
          </header>

          {typeof progress === "number" ? (
            <div className="progress-shell" aria-hidden="true">
              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          ) : null}

          <main className="app-main">{children}</main>
        </div>

        <footer className="app-footer">
          <div>
            <strong>UTP Match</strong>
            <span>© 2024 UTP Match. Todos los derechos reservados.</span>
          </div>
          <nav aria-label="Enlaces legales">
            <a href="#">Privacidad</a>
            <a href="#">Términos</a>
            <a href="#">Contacto</a>
            <a href="#">UTP Institucional</a>
          </nav>
        </footer>

        <FloatingAuthMenu
          isOpen={showSideMenu}
          onClose={() => setShowSideMenu(false)}
          onLoginClick={() => {
            navigate("/login");
            setShowSideMenu(false);
          }}
          authUser={authUser}
          onLogout={() => {
            setAuthUser(null);
            setShowSideMenu(false);
          }}
        />

        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onSubmit={handleLoginSubmit}
        />

        <RegisterModal
          isOpen={showRegisterModal}
          onClose={() => setShowRegisterModal(false)}
          onSubmit={handleRegisterSubmit}
        />

        <UserProfileModal
          isOpen={showProfileModal}
          onClose={() => setShowProfileModal(false)}
          user={authUser}
          onUpdate={handleProfileUpdate}
        />
      </div>
    </div>
  );
}
