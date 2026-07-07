import { SEGMENTS } from "../data/segments.js";

export const ROUND_TIME = 30;
export const SEV_POINTS = { Critical: 25, Major: 15, Minor: 10 };

export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function pickRounds() {
  // 10 distinct segments; the first 7 contribute an error variant, the last 3 their clean one.
  // Guarantees the 7/3 mix (the old random-variant-then-filter approach could yield 9-round games).
  const segs = shuffle(SEGMENTS).slice(0, 10);
  return shuffle(segs.map((seg, i) => {
    const options = seg.variants.filter(v => v.hasError === (i < 7));
    const variant = options[Math.floor(Math.random() * options.length)];
    return { ...variant, id: seg.id, source: seg.source, correct: seg.correct };
  }));
}

export function calcRoundScore(seg, answer, timeLeft) {
  if (!seg.hasError && answer.verdict === "pass") return { points: 80 + Math.floor(timeLeft * 0.5), breakdown: "Correct PASS!" };
  if (!seg.hasError && answer.verdict === "error") return { points: 0, breakdown: "Wrong -- no error here." };
  if (seg.hasError && answer.verdict === "pass") return { points: 0, breakdown: "Missed the error!" };
  if (seg.hasError && answer.verdict === "error") {
    const catOk = answer.category === seg.category;
    const sevOk = answer.severity === seg.severity;
    const base = SEV_POINTS[seg.severity] || 10;
    if (catOk && sevOk) return { points: base * 4 + Math.floor(timeLeft * 0.5), breakdown: "Perfect!" };
    if (catOk) return { points: base * 2, breakdown: "Right category, wrong severity." };
    return { points: Math.floor(base * 0.5), breakdown: "Wrong category." };
  }
  return { points: 0, breakdown: "" };
}
