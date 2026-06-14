import { LayoutList, Moon, Sun, UserRound } from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../../state/appState";
import { TOPBAR_NAV_ITEMS, USER_ICON_ROUTES } from "../constants/navigation";
import { useThemeMode } from "../hooks/useThemeMode";
import { UserProfileModal } from "../modals/UserProfileModal";
import { FloatingAuthMenu } from "../navigation/FloatingAuthMenu";
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
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showSideMenu, setShowSideMenu] = useState(false);

  const shouldShowUserIcon = USER_ICON_ROUTES.includes(location.pathname);
  void showHelp;
  void shouldShowUserIcon;

  const handleProfileUpdate = (updates: ProfileUpdates) => {
    updateAuthUser(updates);
    setShowProfileModal(false);
  };

  return (
    <div
      className={`app-shell transition-colors duration-250 ${
        isDarkMode ? "dark-theme" : "light-theme"
      }`}
    >
      <div className="app-phone">
        <header className="topbar">
          <Link className="topbar__brand" to="/welcome">
            UTP Match
          </Link>
          <nav className="topbar__nav" aria-label="Navegacion principal">
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

          <div className="topbar__actions">
            <button
              type="button"
              onClick={toggleTheme}
              className="theme-toggle"
              title={isDarkMode ? "Modo claro" : "Modo oscuro"}
            >
              {isDarkMode ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            <button
              type="button"
              className="topbar__cta topbar__hamburger"
              onClick={() => setShowSideMenu((isOpen) => !isOpen)}
              aria-label="Abrir menu"
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
            <span>2024 UTP Match.</span>
          </div>
          <nav aria-label="Enlaces">
            <a href="#">Privacidad</a>
            <a href="#">Terminos</a>
            <a href="#">Contacto</a>
            <a href="#">UTP</a>
          </nav>
        </footer>

        <FloatingAuthMenu
          isOpen={showSideMenu}
          onClose={() => setShowSideMenu(false)}
          onLoginClick={() => {
            navigate("/login");
            setShowSideMenu(false);
          }}
          onProfileClick={() => setShowProfileModal(true)}
          authUser={authUser}
          onLogout={() => {
            window.localStorage.removeItem("utp-match-token");
            setAuthUser(null);
            setShowSideMenu(false);
          }}
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
