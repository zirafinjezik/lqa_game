# LQA Challenge

A gamified Localization Quality Assurance training tool for EN→HR game localization. Players review translation segments under time pressure, identify errors, classify them by MQM category and severity, and compete on a shared leaderboard.

🔗 **Live demo:** [lqa-game-b19l.vercel.app](https://lqa-game-b19l.vercel.app)

## What it does

- **10 timed rounds** per session: each round presents a source (EN) and target (HR) game UI segment
- **Error detection**: decide whether the translation contains an error or passes quality checks
- **Error classification**: if an error is found, classify it by MQM category (Accuracy, Compliance, Language, Style, Terminology) and severity (Minor, Major, Critical)
- **Scoring system**: points awarded based on correct identification, accurate classification, and speed (time bonus)
- **Skill ranking**: final scores translate to titles (LQA Expert, Senior Reviewer, Junior Tester)
- **Persistent leaderboard**: scores are saved and shared across sessions

## Why this exists

LQA reviewers are typically trained on the job or through static documentation. This tool turns MQM error detection into an interactive exercise, making it useful for onboarding new linguists, self-assessment, or as a training module within localization teams.

All 20 segments are real-world game localization examples (EN→HR) covering common error types found in game UI strings: number errors, missing diacritics, punctuation issues, glossary violations, register mismatches, omissions, and more.

## Error Types Covered

| Category    | Example errors in the game                                    |
|------------|---------------------------------------------------------------|
| Accuracy    | Number changes (500→5000), omissions, additions               |
| Compliance  | Non-standard terminology vs. approved glossary terms          |
| Language    | Missing diacritics (č, ć, š, ž), double spaces, punctuation  |
| Style       | Formal/informal register mismatch                             |
| Terminology | Inconsistent term usage                                       |

## Scoring

| Outcome                        | Points                    |
|-------------------------------|---------------------------|
| Correct PASS (no error)        | 80 + time bonus           |
| Perfect match (category + severity) | Full severity points × 4 + time bonus |
| Correct category, wrong severity | Severity points × 2      |
| Wrong category                  | Partial credit             |
| Missed error or false positive  | 0                          |

Time bonus = remaining seconds × 0.5

## Tech Stack

- React 18+ with Hooks
- Vite
- Persistent storage API for leaderboard
- Deployed on Vercel

## Getting Started

```bash
git clone https://github.com/zirafinjezik/lqa-game.git
cd lqa-game
npm install
npm run dev
```
## Screenshot
<img width="1405" height="751" alt="Snimka zaslona 2026-03-01 172017" src="https://github.com/user-attachments/assets/61382e56-c6f4-4062-859e-cbbd2e164658" />

## Potential Extensions

- Additional language pairs (EN→DE, EN→ES)
- Expanded segment pool with difficulty tiers
- Team/organization leaderboards
- Analytics dashboard showing error type performance over time
- Integration with real LQA workflows for reviewer calibration

## Author

**Natalija Marić** -- Localization specialist and LQA reviewer with 13+ years of experience in game localization, technical translation, and quality assurance.

- 🦒 [Žirafin jezik j.d.o.o.](https://zirafinjezik.com)
- 💼 [LinkedIn](www.linkedin.com/in/natalija-maric-zirafinjezik)

## License

MIT
