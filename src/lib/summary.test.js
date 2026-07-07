import { describe, it, expect } from "vitest";
import { summarize } from "./summary.js";

const err = (category, severity = "Minor") => ({ hasError: true, category, severity });
const clean = { hasError: false };

describe("summarize", () => {
  it("counts caught, category-right, severity-right per category", () => {
    const history = [
      { seg: err("Accuracy", "Major"), answer: { verdict: "error", category: "Accuracy", severity: "Major" }, points: 60, timedOut: false },
      { seg: err("Accuracy", "Major"), answer: { verdict: "error", category: "Language", severity: "Major" }, points: 7, timedOut: false },
      { seg: err("Accuracy", "Major"), answer: { verdict: "pass" }, points: 0, timedOut: false },
    ];
    const { categories } = summarize(history);
    expect(categories.Accuracy).toEqual({ total: 3, caught: 2, catRight: 1, sevRight: 1 });
  });

  it("counts clean rounds: passed vs over-flagged", () => {
    const history = [
      { seg: clean, answer: { verdict: "pass" }, points: 90, timedOut: false },
      { seg: clean, answer: { verdict: "error", category: "Style", severity: "Minor" }, points: 0, timedOut: false },
    ];
    const { clean: c } = summarize(history);
    expect(c).toEqual({ total: 2, passed: 1, overFlagged: 1 });
  });

  it("timeouts count as neither caught nor passed nor over-flagged", () => {
    const history = [
      { seg: err("Language"), answer: { verdict: null }, points: 0, timedOut: true },
      { seg: clean, answer: { verdict: null }, points: 0, timedOut: true },
    ];
    const { categories, clean: c } = summarize(history);
    expect(categories.Language).toEqual({ total: 1, caught: 0, catRight: 0, sevRight: 0 });
    expect(c).toEqual({ total: 1, passed: 0, overFlagged: 0 });
  });

  it("empty history yields empty summary", () => {
    expect(summarize([])).toEqual({ categories: {}, clean: { total: 0, passed: 0, overFlagged: 0 } });
  });
});
