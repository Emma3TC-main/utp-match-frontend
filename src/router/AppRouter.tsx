import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { BottomNav } from "../components/ui";
import { useAppContext } from "../state/appState";
import {
  AdminPage,
  ComparePage,
  CoursePage,
  HomePage,
  LoginPage,
  MatchPage,
  OnboardingPage,
  PlanPage,
  RegisterPage,
  SelectorPage,
  SharedPage,
  SummaryPage,
  WelcomePage,
} from "../pages";
import { BOTTOM_NAV_ROUTES } from "./bottomNavRoutes";
import RouteLoader from "./RouteLoader";

export default function AppRouter() {
  const location = useLocation();
  const { isLoading, setIsLoading } = useAppContext();
  const [isDark, setIsDark] = useState(
    () => window.localStorage.getItem("utp-match-theme") === "dark",
  );

  useEffect(() => {
    setIsLoading(true);

    const timer = window.setTimeout(() => setIsLoading(false), 220);

    return () => window.clearTimeout(timer);
  }, [location.pathname, setIsLoading]);

  useEffect(() => {
    const handleThemeChange = () => {
      setIsDark(window.localStorage.getItem("utp-match-theme") === "dark");
    };

    window.addEventListener("utp-theme-toggle", handleThemeChange);

    return () =>
      window.removeEventListener("utp-theme-toggle", handleThemeChange);
  }, []);

  const showBottomNav = BOTTOM_NAV_ROUTES.some((route) =>
    location.pathname.startsWith(route),
  );

  return (
    <div className={`app-stage ${isDark ? "dark-theme" : "light-theme"}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -12, filter: "blur(10px)" }}
          transition={{ duration: 0.26, ease: "easeOut" }}
          className="route-layer"
        >
          <Routes location={location}>
            <Route path="/" element={<Navigate to="/welcome" replace />} />
            <Route path="/welcome" element={<WelcomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/compare" element={<SelectorPage />} />
            <Route path="/compare/result" element={<ComparePage />} />
            <Route path="/course/:courseId" element={<CoursePage />} />
            <Route path="/match" element={<MatchPage />} />
            <Route path="/plan" element={<PlanPage />} />
            <Route path="/summary" element={<SummaryPage />} />
            <Route path="/shared/:token" element={<SharedPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="*" element={<Navigate to="/welcome" replace />} />
          </Routes>
        </motion.div>
      </AnimatePresence>

      {showBottomNav ? <BottomNav /> : null}
      {isLoading ? <RouteLoader /> : null}
    </div>
  );
}
