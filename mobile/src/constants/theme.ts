export const colors = {
  // Brand
  primary: "#1B4332",
  primaryPressed: "#143326",
  primaryContainer: "#1B4332",
  onPrimary: "#FFFFFF",

  secondary: "#2D6A4F",
  onSecondary: "#FFFFFF",

  // Surfaces
  background: "#F9F9F7",
  surface: "#FFFFFF",
  surfaceLow: "#F1F3FF",
  surfaceHigh: "#E9EDFF",

  // Text
  text: "#111827",
  textSecondary: "#475569",
  textMuted: "#64748B",
  textOnSurface: "#141B2B",

  // Borders
  border: "#E5E7EB",
  borderStrong: "#D1D5DB",

  // Status
  success: "#166534",
  successBackground: "#DCFCE7",
  warning: "#92400E",
  warningBackground: "#FEF3C7",
  danger: "#DC2626",
  dangerBackground: "#FFEBEE",
  pending: "#475569",
  pendingBackground: "#F1F5F9",

  // Interaction
  focus: "#2D6A4F",
  disabled: "#9CA3AF",
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

export const radius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 28,
  full: 9999,
} as const;

export const typography = {
  headlineXL: {
    fontFamily: "Inter",
    fontSize: 28,
    fontWeight: "700" as const,
    lineHeight: 34,
    letterSpacing: -0.56,
  },
  headlineLG: {
    fontFamily: "Inter",
    fontSize: 22,
    fontWeight: "700" as const,
    lineHeight: 28,
    letterSpacing: -0.33,
  },
  headlineMD: {
    fontFamily: "Inter",
    fontSize: 18,
    fontWeight: "600" as const,
    lineHeight: 24,
    letterSpacing: -0.18,
  },
  headlineSM: {
    fontFamily: "Inter",
    fontSize: 16,
    fontWeight: "600" as const,
    lineHeight: 22,
  },
  bodyLG: {
    fontFamily: "Inter",
    fontSize: 16,
    fontWeight: "400" as const,
    lineHeight: 24,
  },
  bodyMD: {
    fontFamily: "Inter",
    fontSize: 14,
    fontWeight: "400" as const,
    lineHeight: 20,
  },
  bodySM: {
    fontFamily: "Inter",
    fontSize: 12,
    fontWeight: "400" as const,
    lineHeight: 16,
  },
  numericLG: {
    fontFamily: "JetBrains Mono",
    fontSize: 20,
    fontWeight: "600" as const,
    lineHeight: 24,
    letterSpacing: -0.4,
  },
  numericMD: {
    fontFamily: "JetBrains Mono",
    fontSize: 14,
    fontWeight: "500" as const,
    lineHeight: 18,
  },
  sku: {
    fontFamily: "JetBrains Mono",
    fontSize: 11,
    fontWeight: "500" as const,
    lineHeight: 14,
    letterSpacing: 0.44,
  },
  label: {
    fontFamily: "Inter",
    fontSize: 12,
    fontWeight: "600" as const,
    lineHeight: 16,
    letterSpacing: 0.12,
  },
} as const;
