import { useState } from "react";
import { C, css } from "../theme.js";
import { summarize } from "../lib/summary.js";
import Leaderboard from "./Leaderboard.jsx";
import { shareText } from "../lib/share.js";

function Bar({ value, max, color }) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <div style={{ background: C.bg, borderRadius: 6, height: 8, overflow: "hidden", flex: 1 }}>
      <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 6 }} />
    </div>
  );
}

function Breakdown({ history }) {
  const { categories, clean } = summarize(history);
  const rows = Object.entries(categories);
  if (rows.length === 0 && clean.total === 0) return null;

  return (
    <div style={{ ...css.card, textAlign: "left" }}>
      <div style={css.label}>Your review profile</div>

      {rows.map(([cat, s]) => {
        const missed = s.total - s.caught;
        const note = missed > 0 ? `${missed} missed` : s.catRight < s.caught ? "caught, but misclassified" : s.sevRight < s.catRight ? "check severity calls" : "clean sweep";
        return (
          <div key={cat} style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{cat}</span>
              <span style={{ fontSize: 12, color: C.textMute }}>caught {s.caught}/{s.total} · category right {s.catRight}/{s.total} · {note}</span>
            </div>
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <Bar value={s.caught} max={s.total} color={C.accent} />
              <Bar value={s.catRight} max={s.total} color={C.primary} />
            </div>
          </div>
        );
      })}

      {clean.total > 0 && (
        <div style={{ marginTop: 16, paddingTop: 12, borderTop: `1px solid ${C.border}` }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: C.text }}>Clean segments</span>
            <span style={{ fontSize: 12, color: clean.overFlagged > 0 ? C.warn : C.pass }}>
              passed {clean.passed}/{clean.total}{clean.overFlagged > 0 ? ` · over-flagged ${clean.overFlagged}` : ""}
            </span>
          </div>
        </div>
      )}

      <div style={{ marginTop: 12, fontSize: 11, color: C.textMute }}>
        Teal = errors caught · magenta = right MQM category. Timeouts count as misses.
      </div>
    </div>
  );
}

export default function ResultScreen({ score, history = [], leaderboard = [], onRestart, onSave }) {
  const [name, setName] = useState("");
  const [saved, setSaved] = useState(false);
  const [showBoard, setShowBoard] = useState(false);
  const [shared, setShared] = useState(false);

  const handleSave = () => {
    if (!name.trim()) return;
    onSave(name.trim(), score);
    setSaved(true);
  };

  const grade = score >= 800 ? { label: "LQA Expert", color: C.primary, icon: "🏆" }
    : score >= 500 ? { label: "Senior Reviewer", color: C.accent, icon: "⭐" }
    : score >= 300 ? { label: "Junior Tester", color: C.warn, icon: "🎯" }
    : { label: "Keep Practicing", color: C.textMute, icon: "📚" };

  const handleShare = async () => {
    const text = shareText(score, grade.label, history);
    try {
      if (navigator.share) {
        await navigator.share({ text });
      } else {
        await navigator.clipboard.writeText(text);
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      }
    } catch (e) {
      if (e.name !== "AbortError") console.warn("Share failed:", e);
    }
  };

  return (
    <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center", paddingTop: 40 }}>
      <div style={{ fontSize: 52, marginBottom: 8 }}>{grade.icon}</div>
      <h2 style={{ margin: "0 0 4px", fontSize: 28, fontWeight: 900, fontFamily: "Georgia, serif", color: grade.color }}>{grade.label}</h2>
      <div style={{ fontSize: 56, fontWeight: 900, color: C.primary, fontFamily: "Georgia, serif", margin: "16px 0 4px" }}>{score}</div>
      <div style={{ color: C.textMute, marginBottom: 32, fontSize: 14 }}>points scored in this session</div>

      <Breakdown history={history} />

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
        <button style={css.btnAccent} onClick={handleShare}>{shared ? "Copied!" : "Share Result"}</button>
      </div>

      <div style={{ marginTop: 12 }}>
        <button style={css.btnGhost} onClick={() => setShowBoard(v => !v)}>
          {showBoard ? "Hide Leaderboard" : "View Leaderboard"}
        </button>
      </div>

      {showBoard && <div style={{ marginTop: 16 }}><Leaderboard entries={leaderboard} /></div>}
    </div>
  );
}
