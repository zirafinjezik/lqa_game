import { useState, useEffect, useRef, useCallback } from "react";
import { C, css } from "../theme.js";
import { CATEGORIES, SEVERITIES } from "../data/segments.js";
import { ROUND_TIME, calcRoundScore } from "../lib/scoring.js";
import { diffWords } from "../lib/diff.js";

export default function GameScreen({ rounds, onFinish }) {
  const [round, setRound] = useState(0);
  const [timeLeft, setTimeLeft] = useState(ROUND_TIME);
  const [answer, setAnswer] = useState({ verdict: null, category: "", severity: "" });
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const timerRef = useRef(null);

  const seg = rounds[round];
  const total = rounds.length;

  const handleTimeout = useCallback(() => {
    setResult({ points: 0, breakdown: "⏱ Time's up -- no answer submitted." });
    setHistory(prev => [...prev, { seg, answer: { verdict: null }, points: 0, timedOut: true }]);
  }, [seg]);

  useEffect(() => {
    if (result) return;
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(timerRef.current); handleTimeout(); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [round, result, handleTimeout]);

  const handleSubmit = () => {
    clearInterval(timerRef.current);
    const { points, breakdown } = calcRoundScore(seg, answer, timeLeft);
    setResult({ points, breakdown });
    setHistory(prev => [...prev, { seg, answer, points, timedOut: false }]);
  };

  const handleNext = () => {
    if (round + 1 >= total) {
      onFinish({ score: history.reduce((a, h) => a + h.points, 0), history });
    } else {
      setRound(r => r + 1);
      setTimeLeft(ROUND_TIME);
      setAnswer({ verdict: null, category: "", severity: "" });
      setResult(null);
    }
  };

  useEffect(() => {
    const onKey = e => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const tag = e.target.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      const k = e.key.toLowerCase();

      if (result) {
        if (e.key === "Enter") { e.preventDefault(); handleNext(); }
        return;
      }
      if (k === "e") setAnswer(a => ({ ...a, verdict: "error" }));
      else if (k === "p") setAnswer(a => ({ ...a, verdict: "pass" }));
      else if (answer.verdict === "error") {
        const cat = CATEGORIES.find(c => c[0].toLowerCase() === k);
        if (cat) setAnswer(a => ({ ...a, category: cat }));
        const sev = SEVERITIES[parseInt(k, 10) - 1];
        if (sev) setAnswer(a => ({ ...a, severity: sev }));
      }
      if (e.key === "Enter") {
        e.preventDefault();
        const valid = answer.verdict === "pass" || (answer.verdict === "error" && answer.category && answer.severity);
        if (valid) handleSubmit();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const totalSoFar = history.reduce((a, h) => a + h.points, 0);
  const timerPct = (timeLeft / ROUND_TIME) * 100;
  const timerColor = timeLeft > 15 ? C.accent : timeLeft > 7 ? C.warn : C.error;

  return (
    <div style={{ maxWidth: 820, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{ fontSize: 13, color: C.textMute }}>Round <span style={{ color: C.primary, fontWeight: 800 }}>{round + 1}</span> / {total}</div>
        <div style={{ fontSize: 22, fontWeight: 900, color: C.primary, fontFamily: "Georgia, serif" }}>{totalSoFar} pts</div>
        <div style={{ fontSize: 14, color: timerColor, fontWeight: 800 }}>{timeLeft}s</div>
      </div>

      <div style={{ background: C.border, borderRadius: 8, height: 6, overflow: "hidden", marginBottom: 20 }}>
        <div style={{ width: `${timerPct}%`, height: "100%", background: `linear-gradient(90deg, ${C.primary}, ${timerColor})`, transition: "width 1s linear", borderRadius: 8 }} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16, marginBottom: 16 }}>
        <div style={css.card}>
          <div style={css.label}>Source (EN)</div>
          <div style={{ fontSize: 15, color: C.text, lineHeight: 1.7 }}>{seg.source}</div>
        </div>
        <div style={{ ...css.card, borderColor: result ? (seg.hasError ? "#f48fb1" : "#80cbc4") : C.border }}>
          <div style={css.label}>Target (HR)</div>
          <div style={{ fontSize: 15, color: C.text, lineHeight: 1.7 }}>{seg.target}</div>
        </div>
      </div>

      {!result && (
        <div style={css.card}>
          <div style={css.label}>Your verdict</div>
          <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
            <button style={{ ...css.btnSm(answer.verdict === "error", C.error), flex: 1, fontSize: 14, padding: "12px", color: answer.verdict === "error" ? "#fff" : C.textMute }} onClick={() => setAnswer(a => ({ ...a, verdict: "error" }))}>❌ Error found</button>
            <button style={{ ...css.btnSm(answer.verdict === "pass", C.pass), flex: 1, fontSize: 14, padding: "12px", color: answer.verdict === "pass" ? "#fff" : C.textMute }} onClick={() => setAnswer(a => ({ ...a, verdict: "pass" }))}>✓ Looks correct</button>
          </div>

          {answer.verdict === "error" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
              <div>
                <label style={css.label}>Category</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {CATEGORIES.map(c => (
                    <button key={c} style={{ ...css.btnSm(answer.category === c, C.primary), fontSize: 12, padding: "6px 12px" }} onClick={() => setAnswer(a => ({ ...a, category: c }))}>{c}</button>
                  ))}
                </div>
              </div>
              <div>
                <label style={css.label}>Severity</label>
                <div style={{ display: "flex", gap: 6 }}>
                  {SEVERITIES.map(s => {
                    const col = s === "Critical" ? C.error : s === "Major" ? C.warn : C.accent;
                    return <button key={s} style={{ ...css.btnSm(answer.severity === s, col), fontSize: 12, padding: "6px 12px" }} onClick={() => setAnswer(a => ({ ...a, severity: s }))}>{s}</button>;
                  })}
                </div>
              </div>
            </div>
          )}

          <button
            style={{ ...css.btn, opacity: answer.verdict === "error" ? (answer.category && answer.severity ? 1 : 0.35) : answer.verdict === "pass" ? 1 : 0.35 }}
            onClick={handleSubmit}
            disabled={!answer.verdict || (answer.verdict === "error" && (!answer.category || !answer.severity))}
          >Submit</button>
        </div>
      )}

      {result && (
        <div style={{ ...css.card, borderColor: result.points > 0 ? "#80cbc4" : "#f48fb1", background: result.points > 0 ? C.passBg : C.errorBg }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 20, fontWeight: 900, color: result.points > 0 ? C.pass : C.error, marginBottom: 4, fontFamily: "Georgia, serif" }}>
                {result.points > 0 ? "+" : ""}{result.points} pts
              </div>
              <div style={{ fontSize: 14, color: C.textMid }}>{result.breakdown}</div>
            </div>
            {seg.hasError && (
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 10, color: C.textMute, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>Correct answer</div>
                <div style={{ fontSize: 13, color: C.primary, fontWeight: 700 }}>{seg.category} / {seg.subcategory} / {seg.severity}</div>
              </div>
            )}
            {!seg.hasError && <div style={{ fontSize: 13, color: C.pass, fontWeight: 700 }}>No error -- PASS ✓</div>}
          </div>
          {seg.hasError && (() => {
            const d = diffWords(seg.target, seg.correct);
            const render = (tokens, color, bg) => tokens.map((t, i) => (
              <span key={i} style={t.changed ? { color, background: bg, borderRadius: 4, padding: "0 3px", fontWeight: 700 } : undefined}>{t.text} </span>
            ));
            return (
              <div style={{ fontSize: 14, background: "rgba(255,255,255,0.6)", borderRadius: 8, padding: "10px 14px", marginBottom: 10, lineHeight: 1.8 }}>
                <div><span style={{ ...css.label, display: "inline", marginRight: 8 }}>Shown</span>{render(d.target, C.error, C.errorBg)}</div>
                <div><span style={{ ...css.label, display: "inline", marginRight: 8 }}>Reference</span>{render(d.reference, C.pass, C.passBg)}</div>
              </div>
            );
          })()}
          <div style={{ fontSize: 13, color: C.textMid, background: "rgba(255,255,255,0.6)", borderRadius: 8, padding: "10px 14px", marginBottom: 14 }}>
            💡 {seg.explanation}
          </div>
          <button style={css.btn} onClick={handleNext}>
            {round + 1 >= total ? "See Final Score" : "Next Round →"}
          </button>

        </div>
      )}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: C.surface, borderTop: `1px solid ${C.border}`, padding: "8px 16px", display: "flex", gap: 18, justifyContent: "center", flexWrap: "wrap", fontSize: 12, color: C.textMute, zIndex: 2 }}>
        {[["E", "Error"], ["P", "Pass"], ["A", "Accuracy"], ["L", "Language"], ["1", "Minor"], ["2", "Major"], ["3", "Critical"], ["Enter", result ? "Next" : "Submit"]].map(([k, label]) => (
          <span key={k} style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <kbd style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 4, padding: "1px 6px", fontFamily: "monospace", fontSize: 11, color: C.textMid, fontWeight: 700 }}>{k}</kbd>
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
