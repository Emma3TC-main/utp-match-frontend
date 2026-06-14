import {
  Brain,
  Building2,
  Code2,
  Cog,
  Layers,
  Megaphone,
  Scale,
  TrendingUp,
} from "lucide-react";
import type { ComponentType, ReactElement } from "react";
import type { LucideProps } from "lucide-react";
import type { CareerId } from "../../types/domain";

type CareerImagePattern = "lines" | "dots" | "waves" | "grid";

type CareerImageConfig = {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  icon: ComponentType<LucideProps>;
  pattern: CareerImagePattern;
};

const careerImageConfigs: Record<CareerId, CareerImageConfig> = {
  systems: {
    colors: { primary: "#0d92f4", secondary: "#0066cc", accent: "#00d9ff" },
    icon: Code2,
    pattern: "grid",
  },
  industrial: {
    colors: { primary: "#6b5b95", secondary: "#3d3b4d", accent: "#9b8eb8" },
    icon: Cog,
    pattern: "lines",
  },
  administration: {
    colors: { primary: "#1abc9c", secondary: "#0d8659", accent: "#2ecc71" },
    icon: TrendingUp,
    pattern: "waves",
  },
  marketing: {
    colors: { primary: "#e74c3c", secondary: "#c0392b", accent: "#e67e22" },
    icon: Megaphone,
    pattern: "dots",
  },
  civil: {
    colors: { primary: "#34495e", secondary: "#1a252f", accent: "#5d6d7b" },
    icon: Building2,
    pattern: "grid",
  },
  law: {
    colors: { primary: "#8e44ad", secondary: "#6c3483", accent: "#af7ac5" },
    icon: Scale,
    pattern: "lines",
  },
  psychology: {
    colors: { primary: "#f39c12", secondary: "#d68910", accent: "#f8c471" },
    icon: Brain,
    pattern: "waves",
  },
  architecture: {
    colors: { primary: "#16a085", secondary: "#117a65", accent: "#48c9b0" },
    icon: Layers,
    pattern: "dots",
  },
};

function isKnownCareerId(careerId: string): careerId is CareerId {
  return careerId in careerImageConfigs;
}

function getCareerImageConfig(careerId: string): CareerImageConfig {
  if (isKnownCareerId(careerId)) {
    return careerImageConfigs[careerId];
  }

  return careerImageConfigs.systems;
}

export function generateCareerImage(careerId: string) {
  const config = getCareerImageConfig(careerId);
  const Icon = config.icon;

  const safeId = careerId.replace(/[^a-zA-Z0-9_-]/g, "-");
  const gradientId = `grad-${safeId}`;
  const patternId = `pattern-${config.pattern}-${safeId}`;

  const patterns: Record<CareerImagePattern, ReactElement> = {
    lines: (
      <pattern
        id={patternId}
        x="0"
        y="0"
        width="20"
        height="20"
        patternUnits="userSpaceOnUse"
      >
        <line
          x1="0"
          y1="0"
          x2="0"
          y2="20"
          stroke={config.colors.secondary}
          strokeWidth="2"
          opacity="0.3"
        />
        <line
          x1="10"
          y1="0"
          x2="10"
          y2="20"
          stroke={config.colors.secondary}
          strokeWidth="1"
          opacity="0.15"
        />
      </pattern>
    ),
    dots: (
      <pattern
        id={patternId}
        x="0"
        y="0"
        width="25"
        height="25"
        patternUnits="userSpaceOnUse"
      >
        <circle
          cx="12.5"
          cy="12.5"
          r="3"
          fill={config.colors.secondary}
          opacity="0.25"
        />
        <circle
          cx="12.5"
          cy="12.5"
          r="1.5"
          fill={config.colors.accent}
          opacity="0.4"
        />
      </pattern>
    ),
    waves: (
      <pattern
        id={patternId}
        x="0"
        y="0"
        width="80"
        height="40"
        patternUnits="userSpaceOnUse"
      >
        <path
          d="M0,20 Q20,10 40,20 T80,20"
          stroke={config.colors.secondary}
          strokeWidth="1.5"
          fill="none"
          opacity="0.2"
        />
        <path
          d="M0,30 Q20,20 40,30 T80,30"
          stroke={config.colors.secondary}
          strokeWidth="1"
          fill="none"
          opacity="0.1"
        />
      </pattern>
    ),
    grid: (
      <pattern
        id={patternId}
        x="0"
        y="0"
        width="30"
        height="30"
        patternUnits="userSpaceOnUse"
      >
        <rect
          x="0"
          y="0"
          width="30"
          height="30"
          fill="none"
          stroke={config.colors.secondary}
          strokeWidth="1"
          opacity="0.2"
        />
      </pattern>
    ),
  };

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 300 180"
      preserveAspectRatio="xMidYMid slice"
      style={{ display: "block" }}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop
            offset="0%"
            style={{ stopColor: config.colors.primary, stopOpacity: 1 }}
          />
          <stop
            offset="100%"
            style={{ stopColor: config.colors.secondary, stopOpacity: 1 }}
          />
        </linearGradient>

        {patterns[config.pattern]}
      </defs>

      <rect width="300" height="180" fill={`url(#${gradientId})`} />
      <rect width="300" height="180" fill={`url(#${patternId})`} />

      <circle
        cx="150"
        cy="90"
        r="55"
        fill={config.colors.accent}
        opacity="0.15"
      />
      <circle
        cx="150"
        cy="90"
        r="45"
        fill="none"
        stroke={config.colors.accent}
        strokeWidth="1"
        opacity="0.3"
      />

      <g transform="translate(130, 70)">
        <Icon size={40} color="white" strokeWidth={1.5} />
      </g>
    </svg>
  );
}
