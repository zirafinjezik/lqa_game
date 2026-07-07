import { summarize } from "./summary.js";

export const SITE_URL = "https://lqa-game.vercel.app";

export function shareText(score, gradeLabel, history) {
  const { categories, clean } = summarize(history);
  const rows = Object.values(categories);
  const caught = rows.reduce((a, c) => a + c.caught, 0);
  const total = rows.reduce((a, c) => a + c.total, 0);

  const lines = [`LQA Challenge: ${score} pts · ${gradeLabel}`];
  if (total > 0) {
    let stats = `Caught ${caught}/${total} errors in EN→HR game strings`;
    if (clean.overFlagged > 0) stats += `, over-flagged ${clean.overFlagged}`;
    lines.push(stats + ".");
  }
  lines.push(`Try it: ${SITE_URL}`);
  return lines.join("\n");
}
