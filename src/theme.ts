// Build-time theme flag. The colored "v2" build is produced with
// VITE_THEME=color (see .github/workflows/deploy.yml). The default (mono)
// build keeps the original grayscale look.
export type Theme = "mono" | "color";

export const THEME: Theme =
  (import.meta as any).env?.VITE_THEME === "color" ? "color" : "mono";

export const isColor = THEME === "color";
