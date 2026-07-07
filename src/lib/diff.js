// Word-level diff between the shown target and the reference string.
// Returns { target: [{ text, changed }], reference: [{ text, changed }] }.
export function diffWords(target, reference) {
  const a = target.split(/\s+/).filter(Boolean);
  const b = reference.split(/\s+/).filter(Boolean);

  // LCS table
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }

  const tOut = [], rOut = [];
  let i = 0, j = 0;
  while (i < m && j < n) {
    if (a[i] === b[j]) {
      tOut.push({ text: a[i], changed: false });
      rOut.push({ text: b[j], changed: false });
      i++; j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      tOut.push({ text: a[i], changed: true });
      i++;
    } else {
      rOut.push({ text: b[j], changed: true });
      j++;
    }
  }
  while (i < m) tOut.push({ text: a[i++], changed: true });
  while (j < n) rOut.push({ text: b[j++], changed: true });

  return { target: tOut, reference: rOut };
}
