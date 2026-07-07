import { describe, it, expect } from "vitest";
import { calcRoundScore, pickRounds, SEV_POINTS, ROUND_TIME } from "./scoring.js";
import { SEGMENTS, CATEGORIES, SEVERITIES } from "../data/segments.js";

const errorSeg = { hasError: true, category: "Language", subcategory: "Spelling/Typos", severity: "Minor" };
const cleanSeg = { hasError: false, category: null, subcategory: null, severity: null };

describe("calcRoundScore", () => {
  it("correct PASS on a clean segment: 80 base + time bonus", () => {
    const { points, breakdown } = calcRoundScore(cleanSeg, { verdict: "pass" }, 20);
    expect(points).toBe(80 + Math.floor(20 * 0.5));
    expect(breakdown).toBe("Correct PASS!");
  });

  it("correct PASS with 0 time left: base only, no bonus", () => {
    expect(calcRoundScore(cleanSeg, { verdict: "pass" }, 0).points).toBe(80);
  });

  it("flagging an error on a clean segment scores 0", () => {
    const { points } = calcRoundScore(cleanSeg, { verdict: "error", category: "Language", severity: "Minor" }, 30);
    expect(points).toBe(0);
  });

  it("passing a segment that has an error scores 0", () => {
    expect(calcRoundScore(errorSeg, { verdict: "pass" }, 30).points).toBe(0);
  });

  it("perfect match: category + severity right = base*4 + time bonus", () => {
    const { points, breakdown } = calcRoundScore(errorSeg, { verdict: "error", category: "Language", severity: "Minor" }, 10);
    expect(points).toBe(SEV_POINTS.Minor * 4 + Math.floor(10 * 0.5));
    expect(breakdown).toBe("Perfect!");
  });

  it("right category, wrong severity = base*2, no time bonus", () => {
    const { points } = calcRoundScore(errorSeg, { verdict: "error", category: "Language", severity: "Critical" }, 30);
    expect(points).toBe(SEV_POINTS.Minor * 2);
  });

  it("wrong category = base*0.5 floored, regardless of severity", () => {
    const { points } = calcRoundScore(errorSeg, { verdict: "error", category: "Accuracy", severity: "Minor" }, 30);
    expect(points).toBe(Math.floor(SEV_POINTS.Minor * 0.5));
  });

  it("severity base scales: Critical perfect > Major perfect > Minor perfect", () => {
    const at = sev => calcRoundScore({ ...errorSeg, severity: sev }, { verdict: "error", category: "Language", severity: sev }, 0).points;
    expect(at("Critical")).toBe(100);
    expect(at("Major")).toBe(60);
    expect(at("Minor")).toBe(40);
  });

  it("no verdict (timeout path) scores 0", () => {
    expect(calcRoundScore(errorSeg, { verdict: null, category: "", severity: "" }, 0).points).toBe(0);
    expect(calcRoundScore(cleanSeg, { verdict: null, category: "", severity: "" }, 0).points).toBe(0);
  });

  it("unknown severity on segment falls back to base 10", () => {
    const weird = { ...errorSeg, severity: "Blocker" };
    const { points } = calcRoundScore(weird, { verdict: "error", category: "Language", severity: "Blocker" }, 0);
    expect(points).toBe(10 * 4);
  });
});

describe("pickRounds", () => {
  it("always returns 10 rounds: 7 errors + 3 passes", () => {
    for (let i = 0; i < 50; i++) {
      const rounds = pickRounds();
      expect(rounds).toHaveLength(10);
      expect(rounds.filter(r => r.hasError)).toHaveLength(7);
      expect(rounds.filter(r => !r.hasError)).toHaveLength(3);
    }
  });

  it("never repeats a segment id within a game", () => {
    for (let i = 0; i < 50; i++) {
      const ids = pickRounds().map(r => r.id);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });

  it("every round carries source and correct from its segment", () => {
    for (const r of pickRounds()) {
      expect(r.source).toBeTruthy();
      expect(r.correct).toBeTruthy();
    }
  });
});

describe("segment data integrity", () => {
  it("every segment has exactly one clean variant and at least one error", () => {
    for (const seg of SEGMENTS) {
      const clean = seg.variants.filter(v => !v.hasError);
      const errors = seg.variants.filter(v => v.hasError);
      expect(clean, `seg ${seg.id}`).toHaveLength(1);
      expect(errors.length, `seg ${seg.id}`).toBeGreaterThan(0);
    }
  });

  it("every error variant uses a known category and severity", () => {
    for (const seg of SEGMENTS) {
      for (const v of seg.variants.filter(v => v.hasError)) {
        expect(CATEGORIES, `seg ${seg.id}: ${v.category}`).toContain(v.category);
        expect(SEVERITIES, `seg ${seg.id}: ${v.severity}`).toContain(v.severity);
      }
    }
  });

  it("no error variant target equals the reference string", () => {
    for (const seg of SEGMENTS) {
      for (const v of seg.variants.filter(v => v.hasError)) {
        expect(v.target, `seg ${seg.id}`).not.toBe(seg.correct);
      }
    }
  });

  it("ROUND_TIME is a positive number of seconds", () => {
    expect(ROUND_TIME).toBeGreaterThan(0);
  });
});
