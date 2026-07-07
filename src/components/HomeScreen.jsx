import { C, css } from "../theme.js";
import Leaderboard from "./Leaderboard.jsx";

export default function HomeScreen({ onStart, leaderboard }) {
  return (
    <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center", paddingTop: 32 }}>
      <h1 style={{ margin: "0 0 8px", fontSize: 34, fontWeight: 900, fontFamily: "Georgia, serif" }}>
        <span style={{ background: `linear-gradient(135deg, ${C.primary}, ${C.primaryLight})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>LQA</span>
        <span style={{ color: C.text }}> Challenge</span>
      </h1>
      <p style={{ color: C.textMute, marginBottom: 32, fontSize: 14 }}>EN to HR localization quality game -- 10 rounds, find the errors, beat the leaderboard</p>

      <div style={{ ...css.card, textAlign: "left", marginBottom: 24 }}>
        <div style={css.label}>How to play</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {[
            ["🔍", "Read the source and target segment"],
            ["❌ ✓", "Mark as Error or Pass"],
            ["🏷", "If error: pick category and severity"],
            ["⚡", "Faster answers earn time bonus points"],
            ["💯", "Perfect match = full points + bonus"],
            ["🏆", "Top scores go on the leaderboard"],
          ].map(([icon, text], i) => (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", padding: "6px 0" }}>
              <span style={{ fontSize: 16 }}>{icon}</span>
              <span style={{ fontSize: 13, color: C.textMid }}>{text}</span>
            </div>
          ))}
        </div>
      </div>

      <button style={{ ...css.btn, fontSize: 16, padding: "14px 48px", marginBottom: 32 }} onClick={onStart}>Start Game</button>

      {leaderboard.length > 0 && <Leaderboard entries={leaderboard} />}
    </div>
  );
}
