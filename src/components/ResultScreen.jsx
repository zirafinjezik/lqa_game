import { useState } from "react";
import { C, css } from "../theme.js";

export default function ResultScreen({ score, onRestart, onSave }) {
  const [name, setName] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (!name.trim()) return;
    onSave(name.trim(), score);
    setSaved(true);
  };

  const grade = score >= 800 ? { label: "LQA Expert", color: C.primary, icon: "🏆" }
    : score >= 500 ? { label: "Senior Reviewer", color: C.accent, icon: "⭐" }
    : score >= 300 ? { label: "Junior Tester", color: C.warn, icon: "🎯" }
    : { label: "Keep Practicing", color: C.textMute, icon: "📚" };

  return (
    <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center", paddingTop: 40 }}>
      <div style={{ fontSize: 52, marginBottom: 8 }}>{grade.icon}</div>
      <h2 style={{ margin: "0 0 4px", fontSize: 28, fontWeight: 900, fontFamily: "Georgia, serif", color: grade.color }}>{grade.label}</h2>
      <div style={{ fontSize: 56, fontWeight: 900, color: C.primary, fontFamily: "Georgia, serif", margin: "16px 0 4px" }}>{score}</div>
      <div style={{ color: C.textMute, marginBottom: 32, fontSize: 14 }}>points scored in this session</div>

      {!saved ? (
        <div style={{ ...css.card, textAlign: "left" }}>
          <label style={css.label}>Save your score to the leaderboard</label>
          <div style={{ display: "flex", gap: 10 }}>
            <input
              style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, color: C.text, padding: "10px 12px", fontSize: 13, flex: 1, outline: "none" }}
              placeholder="Enter your name..."
              maxLength={24}
              value={name}
              onChange={e => setName(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSave()}
            />
            <button style={{ ...css.btn, opacity: name.trim() ? 1 : 0.35 }} onClick={handleSave}>Save</button>
          </div>
        </div>
      ) : (
        <div style={{ ...css.card, textAlign: "center", color: C.pass, fontWeight: 700, fontSize: 15 }}>
          Score saved to the leaderboard! 🦒
        </div>
      )}

      <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 16 }}>
        <button style={css.btn} onClick={onRestart}>Play Again</button>
      </div>
    </div>
  );
}
