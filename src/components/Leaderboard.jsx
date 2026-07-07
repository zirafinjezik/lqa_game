import { C, css } from "../theme.js";

export default function Leaderboard({ entries }) {
  if (entries.length === 0) return <div style={{ ...css.card, color: C.textMute, fontSize: 13 }}>No scores yet.</div>;
  return (
    <div style={{ ...css.card, textAlign: "left" }}>
      <div style={css.label}>🏆 Leaderboard</div>
      {entries.slice(0, 10).map((entry, i) => (
        <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: i < Math.min(entries.length, 10) - 1 ? `1px solid ${C.border}` : "none" }}>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <span style={{ color: i === 0 ? "#e91e8c" : i === 1 ? C.accent : i === 2 ? C.warn : C.textMute, fontWeight: 800, fontSize: 14, minWidth: 24 }}>{i + 1}.</span>
            <span style={{ color: C.text, fontSize: 14 }}>{entry.name}</span>
          </div>
          <span style={{ color: C.primary, fontWeight: 900, fontSize: 17, fontFamily: "Georgia, serif" }}>{entry.score}</span>
        </div>
      ))}
    </div>
  );
}
