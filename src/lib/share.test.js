import { describe, it, expect } from "vitest";
import { shareText, SITE_URL } from "./share.js";

const err = (category, severity = "Minor") => ({ hasError: true, category, severity });

describe("shareText", () => {
  it("includes score, grade, catch rate, url", () => {
    const history = [
      { seg: err("Language"), answer: { verdict: "error", category: "Language", severity: "Minor" }, points: 40, timedOut: false },
      { seg: err("Accuracy"), answer: { verdict: "pass" }, points: 0, timedOut: false },
      { seg: { hasError: false }, answer: { verdict: "pass" }, points: 90, timedOut: false },
    ];
    const t = shareText(584, "Senior Reviewer", history);
    expect(t).toContain("584 pts · Senior Reviewer");
    expect(t).toContain("Caught 1/2 errors");
    expect(t).toContain(SITE_URL);
    expect(t).not.toContain("over-flagged");
  });

  it("mentions over-flagging when it happened", () => {
    const history = [
      { seg: { hasError: false }, answer: { verdict: "error", category: "Language", severity: "Minor" }, points: 0, timedOut: false },
      { seg: err("Language"), answer: { verdict: "error", category: "Language", severity: "Minor" }, points: 40, timedOut: false },
    ];
    expect(shareText(40, "Keep Practicing", history)).toContain("over-flagged 1");
  });

  it("empty history: score and url only", () => {
    const t = shareText(0, "Keep Practicing", []);
    expect(t).toContain("0 pts");
    expect(t).not.toContain("Caught");
  });
});
