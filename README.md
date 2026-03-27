# LQA Challenge

A gamified Localization Quality Assurance training tool for EN→HR game localization. Players review translation segments under time pressure, identify errors, classify them by MQM category and severity, and compete on a shared leaderboard.

**Live demo:** [lqa-game.vercel.app](https://lqa-game.vercel.app)

**Repository:** [github.com/zirafinjezik/lqa-game](https://github.com/zirafinjezik/lqa-game)

---

## Screenshot

<img width="1405" height="751" alt="LQA Challenge screenshot" src="https://github.com/user-attachments/assets/61382e56-c6f4-4062-859e-cbbd2e164658" />

---

## What It Does

- **10 timed rounds** per session: each round presents a source (EN) and target (HR) game UI segment
- **Error detection**: decide whether the translation contains an error or passes quality checks
- **Error classification**: if an error is found, classify it by MQM category (Accuracy, Compliance, Language, Style, Terminology) and severity (Minor, Major, Critical)
- **Scoring system**: points awarded based on correct identification, accurate classification, and speed (time bonus)
- **Skill ranking**: final scores translate to titles (LQA Expert, Senior Reviewer, Junior Tester)
- **Persistent leaderboard**: scores are saved and shared across sessions

---

## Use Cases

**Junior linguist onboarding**
A new reviewer joins a localization team with no prior LQA experience. Instead of static documentation, they work through the challenge to build pattern recognition for common error types – number changes, register mismatches, missing diacritics – in a low-stakes, interactive environment.

**LQA reviewer self-assessment**
An experienced linguist uses the tool to benchmark their error detection speed and accuracy across MQM categories, identifying personal weak spots before taking on a high-stakes project.

**Team calibration exercise**
A localization PM runs the challenge with the full review team to check alignment on error classification. Disagreements in category or severity scoring surface during debrief and become the basis for team-wide guidelines.

**Training module for game localization courses**
An educator incorporates the tool into a game localization curriculum as a practical exercise in MQM-based quality evaluation, using real EN→HR game UI examples.

---

## Why This Exists

LQA reviewers are typically trained on the job or through static documentation. This tool turns MQM error detection into an interactive exercise, making it useful for onboarding new linguists, self-assessment, or as a training module within localization teams.

All 20 segments are real-world game localization examples (EN→HR) covering common error types found in game UI strings: number errors, missing diacritics, punctuation issues, glossary violations, register mismatches, omissions, and more.

---

## Error Types Covered

| Category | Example errors in the game |
|---|---|
| Accuracy | Number changes (500→5000), omissions, additions |
| Compliance | Non-standard terminology vs. approved glossary terms |
| Language | Missing diacritics (č, ć, š, ž), double spaces, punctuation |
| Style | Formal/informal register mismatch |
| Terminology | Inconsistent term usage |

---

## Scoring

| Outcome | Points |
|---|---|
| Correct PASS (no error) | 80 + time bonus |
| Perfect match (category + severity) | Full severity points × 4 + time bonus |
| Correct category, wrong severity | Severity points × 2 |
| Wrong category | Partial credit |
| Missed error or false positive | 0 |

Time bonus = remaining seconds × 0.5

---

## Tech Stack

- React 18+ with Hooks
- Vite
- Persistent storage API for leaderboard
- Deployed on Vercel

---

## Getting Started

```bash
git clone https://github.com/zirafinjezik/lqa-game.git
cd lqa-game
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## Potential Extensions

- Additional language pairs (EN→DE, EN→ES)
- Expanded segment pool with difficulty tiers
- Team/organization leaderboards
- Analytics dashboard showing error type performance over time
- Integration with real LQA workflows for reviewer calibration

---

## Part of the LQA Lifecycle Tools

This tool is part of a set of three open-source LQA tools built around the full quality assurance lifecycle:

| Tool | Purpose | Link |
|---|---|---|
| **MQM Error Scorer** | Log errors, score quality, export reports | [mqm-checker.vercel.app](https://mqm-checker.vercel.app) |
| **LQA Checker** | Validate character limits and punctuation consistency | [lqa-checker-s7wi.vercel.app](https://lqa-checker-s7wi.vercel.app) |
| **LQA Challenge** | Practice and train LQA skills | [lqa-game.vercel.app](https://lqa-game.vercel.app) |

---

## Author

**Natalija Marić** – Localization Engineer and LQA specialist with 14+ years of experience in game localization, technical translation, and quality assurance.

- 🦒 [Žirafin jezik j.d.o.o.](https://zirafinjezik.hr)
- 💼 [LinkedIn](https://www.linkedin.com/in/natalija-maric-zirafinjezik)

---

## License

MIT
