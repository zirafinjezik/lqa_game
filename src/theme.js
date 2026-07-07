// Magenta palette
export const C = {
  bg: "#fdf0f8",
  surface: "#ffffff",
  border: "#f0c0e0",
  primary: "#c2185b",
  primaryLight: "#e91e8c",
  accent: "#0097a7", // teal complement
  accentLight: "#00bcd4",
  text: "#2a0a18",
  textMid: "#8a3060",
  textMute: "#b06080",
  pass: "#00796b",
  passBg: "#e0f7f4",
  error: "#c2185b",
  errorBg: "#fce4ec",
  warn: "#f57c00",
  warnBg: "#fff3e0",
};

export const css = {
  app: { minHeight: "100vh", width: "100%", boxSizing: "border-box", background: C.bg, color: C.text, fontFamily: "'Helvetica Neue', Arial, sans-serif", padding: "24px 32px 64px" },
  card: { background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: 20, marginBottom: 16, width: "100%", boxSizing: "border-box", boxShadow: "0 2px 12px rgba(194,24,91,0.06)" },
  btn: { background: `linear-gradient(135deg, ${C.primary}, ${C.primaryLight})`, color: "#fff", border: "none", borderRadius: 8, padding: "10px 24px", fontWeight: 800, fontSize: 14, cursor: "pointer", letterSpacing: 0.3 },
  btnAccent: { background: `linear-gradient(135deg, ${C.accent}, ${C.accentLight})`, color: "#fff", border: "none", borderRadius: 8, padding: "10px 24px", fontWeight: 800, fontSize: 14, cursor: "pointer" },
  btnGhost: { background: "transparent", color: C.textMute, border: `1px solid ${C.border}`, borderRadius: 8, padding: "9px 20px", fontWeight: 600, fontSize: 13, cursor: "pointer" },
  btnSm: (active, color, textColor = "#fff") => ({
    background: active ? color : "transparent",
    color: active ? textColor : C.textMute,
    border: `1px solid ${active ? color : C.border}`,
    borderRadius: 8, padding: "8px 14px", fontWeight: 700, fontSize: 12,
    cursor: "pointer", transition: "all 0.15s"
  }),
  label: { fontSize: 10, fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase", color: C.textMute, marginBottom: 8, display: "block" },
};
