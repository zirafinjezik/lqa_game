// Builds the per-category diagnostic from round history.
// history: [{ seg, answer, points, timedOut }]
export function summarize(history) {
  const cats = {};
  let cleanTotal = 0, cleanPassed = 0, overFlagged = 0;

  for (const { seg, answer, timedOut } of history) {
    if (!seg.hasError) {
      cleanTotal++;
      if (!timedOut && answer.verdict === "pass") cleanPassed++;
      if (!timedOut && answer.verdict === "error") overFlagged++;
      continue;
    }
    const c = cats[seg.category] ??= { total: 0, caught: 0, catRight: 0, sevRight: 0 };
    c.total++;
    if (!timedOut && answer.verdict === "error") {
      c.caught++;
      if (answer.category === seg.category) c.catRight++;
      if (answer.category === seg.category && answer.severity === seg.severity) c.sevRight++;
    }
  }

  return { categories: cats, clean: { total: cleanTotal, passed: cleanPassed, overFlagged } };
}
