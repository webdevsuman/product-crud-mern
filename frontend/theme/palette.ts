import { PaletteOptions } from "@mui/material";

export const getPalette = (mode: "light" | "dark"): PaletteOptions => ({
  mode,
  primary: {
    main: "#6366f1", // Indigo 500
    light: "#818cf8",
    dark: "#4f46e5",
    contrastText: "#ffffff",
  },
  secondary: {
    main: "#64748b", // Slate 500
  },
  success: {
    main: "#10b981", // Emerald 500
  },
  warning: {
    main: "#f59e0b", // Amber 500
  },
  error: {
    main: "#ef4444", // Red 500
  },
  background: {
    default: mode === "light" ? "#f8fafc" : "#0f172a", // Slate 50 / Slate 900
    paper: mode === "light" ? "#ffffff" : "#1e293b", // White / Slate 800
  },
  text: {
    primary: mode === "light" ? "#1e293b" : "#f8fafc",
    secondary: mode === "light" ? "#64748b" : "#94a3b8",
  },
  divider: mode === "light" ? "#e2e8f0" : "#334155",
});
