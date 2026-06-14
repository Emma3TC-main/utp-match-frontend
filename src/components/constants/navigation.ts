import { Home, LayoutList, Target, Zap } from "lucide-react";

export const TOPBAR_NAV_ITEMS = [
  { to: "/home", label: "Inicio" },
  { to: "/compare", label: "Comparar" },
  { to: "/plan", label: "Mi plan" },
];

export const BOTTOM_NAV_ITEMS = [
  { to: "/home", label: "Inicio", icon: Home },
  { to: "/compare", label: "Comparar", icon: LayoutList },
  { to: "/match", label: "Match", icon: Target },
  { to: "/plan", label: "Plan", icon: Zap },
];

export const USER_ICON_ROUTES = ["/home", "/compare", "/plan"];
