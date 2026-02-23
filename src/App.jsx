import { useState, useEffect, useRef } from "react";

const SEGMENTS = [
  {
    id: 1, source: "Save your progress before exiting the game.",
    correct: "Spremite svoj napredak prije izlaska iz igre.",
    variants: [
      { target: "Spremite svoj napredak prije izlaska.", hasError: true, category: "Accuracy", subcategory: "Omission", severity: "Major", explanation: "'Iz igre' (from the game) was omitted." },
      { target: "Sačuvajte svoj napredak prije izlaska iz igre.", hasError: true, category: "Compliance", subcategory: "Glossary not used", severity: "Minor", explanation: "'Sačuvajte' is non-standard -- 'Spremite' is the approved term." },
      { target: "Spremite svoj napredak prije izlaska iz igre.", hasError: false, category: null, subcategory: null, severity: null, explanation: "No errors. Accurate and natural." },
      { target: "Spremite  svoj napredak prije izlaska iz igre.", hasError: true, category: "Language", subcategory: "Spelling/Typos", severity: "Minor", explanation: "Double space after 'Spremite'." },
    ]
  },
  {
    id: 2, source: "Your account has been deleted due to suspicious activity.",
    correct: "Vaš je račun izbrisan zbog sumnjive aktivnosti.",
    variants: [
      { target: "Vaš je račun izbrisan zbog sumnjive aktivnosti.", hasError: false, category: null, subcategory: null, severity: null, explanation: "No errors. Accurate and natural." },
      { target: "Vaš je račun izbrisan zbog sumljive aktivnosti.", hasError: true, category: "Language", subcategory: "Spelling/Typos", severity: "Minor", explanation: "'Sumljive' is misspelled -- should be 'sumnjive'." },
      { target: "Vaš je račun izbrisan zbog sumnjive aktivnosti", hasError: true, category: "Language", subcategory: "Punctuation", severity: "Minor", explanation: "Missing full stop at the end of the sentence." },
    ]
  },
  {
    id: 3, source: "Collect all 5 crystals to unlock the final level.",
    correct: "Sakupi svih 5 kristala za otključavanje završne razine.",
    variants: [
      { target: "Sakupi svih 5 kristala za otključavanje završne razine.", hasError: false, category: null, subcategory: null, severity: null, explanation: "No errors. Clean and accurate." },
      { target: "Sakupi sve 5 kristale za otključavanje završne razine.", hasError: true, category: "Language", subcategory: "Grammar/Syntax", severity: "Minor", explanation: "'Sve 5 kristale' is incorrect -- should be 'svih 5 kristala' (genitive plural)." },
      { target: "Sakupi svih 5 kristala za otkljucavanje završne razine.", hasError: true, category: "Language", subcategory: "Spelling/Typos", severity: "Minor", explanation: "'Otkljucavanje' is missing the diacritic -- should be 'otključavanje'." },
    ]
  },
  {
    id: 4, source: "Warning: Low battery. Please charge your device.",
    correct: "Upozorenje: Baterija je slaba. Napunite svoj uređaj.",
    variants: [
      { target: "Upozorenje: Baterija je slaba. Moilmo napunite svoj uređaj.", hasError: true, category: "Language", subcategory: "Spelling/Typos", severity: "Minor", explanation: "'Moilmo' is a typo -- should be 'Molimo'." },
      { target: "Upozorenje Baterija je slaba. Napunite svoj uređaj.", hasError: true, category: "Language", subcategory: "Punctuation", severity: "Minor", explanation: "Missing colon after 'Upozorenje'." },
      { target: "Upozorenje: Baterija je slaba. Napunite  svoj uređaj.", hasError: true, category: "Language", subcategory: "Spelling/Typos", severity: "Minor", explanation: "Double space before 'svoj'." },
      { target: "Upozorenje: Baterija je slaba. Napunite svoj uređaj.", hasError: false, category: null, subcategory: null, severity: null, explanation: "No errors. Clean and accurate." },
    ]
  },
  {
    id: 5, source: "Are you sure you want to delete this character?",
    correct: "Jeste li sigurni da želite izbrisati ovog lika?",
    variants: [
      { target: "Jeste li sigurni da želite izbrisati ovog lika?", hasError: false, category: null, subcategory: null, severity: null, explanation: "No errors. Accurate and natural." },
      { target: "Jeste li sigurni da želite izbrisati ovog lika", hasError: true, category: "Language", subcategory: "Punctuation", severity: "Minor", explanation: "Missing question mark at the end." },
      { target: "Jeste li sigurni da želite obrisati ovog lika?", hasError: true, category: "Compliance", subcategory: "Glossary not used", severity: "Minor", explanation: "'Obrisati' is non-standard here -- 'izbrisati' is the approved term." },
    ]
  },
  {
    id: 6, source: "Complete the mission to earn 500 gold coins.",
    correct: "Završi misiju da zaradiš 500 zlatnika.",
    variants: [
      { target: "Završi misiju da zaradiš 500 zlatnika.", hasError: false, category: null, subcategory: null, severity: null, explanation: "No errors. Accurate and natural." },
      { target: "Završi misiju da zaradiš 5000 zlatnika.", hasError: true, category: "Accuracy", subcategory: "Numbers", severity: "Critical", explanation: "500 was changed to 5000 -- a critical number error." },
      { target: "Završi  misiju da zaradiš 500 zlatnika.", hasError: true, category: "Language", subcategory: "Spelling/Typos", severity: "Minor", explanation: "Double space after 'Završi'." },
    ]
  },
  {
    id: 7, source: "Hey! You totally crushed that level!",
    correct: "Hej! Izvrsno si savladao tu razinu!",
    variants: [
      { target: "Hej! Izvrsno ste savladali tu razinu!", hasError: true, category: "Style", subcategory: "Wrong register", severity: "Major", explanation: "Casual 'Hey!' source needs informal 'si' form -- 'ste' is too formal." },
      { target: "Hej Izvrsno si savladao tu razinu!", hasError: true, category: "Language", subcategory: "Punctuation", severity: "Minor", explanation: "Missing exclamation mark after 'Hej'." },
      { target: "Hej! Izvrsno si savladao tu razinu!", hasError: false, category: null, subcategory: null, severity: null, explanation: "No errors. Casual tone matches source." },
    ]
  },
  {
    id: 8, source: "The sword deals 120 damage per hit.",
    correct: "Mač nanosi 120 štete po udarcu.",
    variants: [
      { target: "Mač nanosi 120 štete po udarcu.", hasError: false, category: null, subcategory: null, severity: null, explanation: "No errors. Accurate and natural." },
      { target: "Mač nanosi 1200 štete po udarcu.", hasError: true, category: "Accuracy", subcategory: "Numbers", severity: "Critical", explanation: "120 was changed to 1200 -- a critical number error." },
      { target: "Mač  nanosi 120 štete po udarcu.", hasError: true, category: "Language", subcategory: "Spelling/Typos", severity: "Minor", explanation: "Double space after 'Mač'." },
    ]
  },
  {
    id: 9, source: "Members can access the shared inventory.",
    correct: "Članovi mogu pristupiti dijeljenom inventaru.",
    variants: [
      { target: "Članovi mogu pristupiti dijeljenom inventaru.", hasError: false, category: null, subcategory: null, severity: null, explanation: "No errors. Clean and accurate." },
      { target: "Članovi mogu pristupiti dijeljenom inventaru ceha.", hasError: true, category: "Accuracy", subcategory: "Addition", severity: "Minor", explanation: "'Ceha' (guild) was added -- not present in the source." },
      { target: "Članovi mogu pristupti dijeljenom inventaru.", hasError: true, category: "Language", subcategory: "Spelling/Typos", severity: "Minor", explanation: "'Pristupti' is a typo -- should be 'pristupiti'." },
    ]
  },
  {
    id: 10, source: "Press START to begin the adventure.",
    correct: "Pritisnite START za početak avanture.",
    variants: [
      { target: "Pritisnite START za početak avanture.", hasError: false, category: null, subcategory: null, severity: null, explanation: "No errors. Accurate and natural." },
      { target: "Pritisnite START za  početak avanture.", hasError: true, category: "Language", subcategory: "Spelling/Typos", severity: "Minor", explanation: "Double space before 'početak'." },
      { target: "Pritisnite START za početak avanture", hasError: true, category: "Language", subcategory: "Punctuation", severity: "Minor", explanation: "Missing full stop at the end." },
    ]
  },
  {
    id: 11, source: "The potion restores 50 points instantly.",
    correct: "Napitak odmah vraća 50 bodova.",
    variants: [
      { target: "Napitak odmah vraća 50 bodova.", hasError: false, category: null, subcategory: null, severity: null, explanation: "No errors. Clean and accurate." },
      { target: "Napitak odmah vraća 500 bodova.", hasError: true, category: "Accuracy", subcategory: "Numbers", severity: "Critical", explanation: "50 was changed to 500 -- a critical number error." },
      { target: "Napitak odmah vraca 50 bodova.", hasError: true, category: "Language", subcategory: "Spelling/Typos", severity: "Minor", explanation: "'Vraca' is missing the diacritic -- should be 'vraća'." },
    ]
  },
  {
    id: 12, source: "You are disconnected.",
    correct: "Odspojeni ste.",
    variants: [
      { target: "Otspojen ste.", hasError: true, category: "Language", subcategory: "Spelling/Typos", severity: "Minor", explanation: "'Otspojen' is misspelled -- should be 'Odspojeni'." },
      { target: "Odspojeni ste.", hasError: false, category: null, subcategory: null, severity: null, explanation: "No errors. Clean and accurate." },
      { target: "Odspojeni ste", hasError: true, category: "Language", subcategory: "Punctuation", severity: "Minor", explanation: "Missing full stop at the end." },
    ]
  },
  {
    id: 13, source: "Invite your friends and earn bonus rewards!",
    correct: "Pozovi svoje prijatelje i osvoji bonus nagrade!",
    variants: [
      { target: "Pozovi svoje prijatelje i osvoji bonus nagrade!", hasError: false, category: null, subcategory: null, severity: null, explanation: "No errors. Natural and accurate." },
      { target: "Pozovi svoje prijatelje i osvoji bonus nagrade", hasError: true, category: "Language", subcategory: "Punctuation", severity: "Minor", explanation: "Missing exclamation mark at the end." },
      { target: "Pozovi prijatelje i osvoji bonus nagrade!", hasError: true, category: "Accuracy", subcategory: "Omission", severity: "Minor", explanation: "'Svoje' (your) was omitted." },
    ]
  },
  {
    id: 14, source: "New season starts on December 25th.",
    correct: "Nova sezona počinje 25. prosinca.",
    variants: [
      { target: "Nova sezona počinje 25. prosinca.", hasError: false, category: null, subcategory: null, severity: null, explanation: "No errors. Date correctly formatted for Croatian." },
      { target: "Nova sezona počinje 25 prosinca.", hasError: true, category: "Language", subcategory: "Punctuation", severity: "Minor", explanation: "Missing full stop after '25' -- Croatian date format requires '25.'." },
      { target: "Nova sezona  počinje 25. prosinca.", hasError: true, category: "Language", subcategory: "Spelling/Typos", severity: "Minor", explanation: "Double space before 'počinje'." },
    ]
  },
  {
    id: 15, source: "Achievement unlocked: Master of Shadows!",
    correct: "Postignuće otključano: Majstor Sjena!",
    variants: [
      { target: "Postignuće otključano: Majstor Sjena!", hasError: false, category: null, subcategory: null, severity: null, explanation: "No errors. Clean and accurate." },
      { target: "Postignuće otključano Majstor Sjena!", hasError: true, category: "Language", subcategory: "Punctuation", severity: "Minor", explanation: "Missing colon after 'otključano'." },
      { target: "Postignuce otključano: Majstor Sjena!", hasError: true, category: "Language", subcategory: "Spelling/Typos", severity: "Minor", explanation: "'Postignuce' is missing the diacritic -- should be 'Postignuće'." },
    ]
  },
  {
    id: 16, source: "Your skills are transferable across all game modes.",
    correct: "Vaše su vještine prenosive kroz sve načine igre.",
    variants: [
      { target: "Vaše vještine su prenosiv kroz sve načine igre.", hasError: true, category: "Language", subcategory: "Grammar/Syntax", severity: "Major", explanation: "'Prenosiv' does not agree with 'vještine' -- should be 'prenosive'." },
      { target: "Vaše su vještine prenosive kroz sve načine igre.", hasError: false, category: null, subcategory: null, severity: null, explanation: "No errors. Correct agreement and natural word order." },
      { target: "Vaše su vještine prenosive kroz sve  načine igre.", hasError: true, category: "Language", subcategory: "Spelling/Typos", severity: "Minor", explanation: "Double space before 'načine'." },
    ]
  },
  {
    id: 17, source: "Click here to learn more about our privacy policy.",
    correct: "Kliknite ovdje da biste saznali više o našoj politici privatnosti.",
    variants: [
      { target: "Kliknite ovdje da biste saznali više o našoj politici privatnosti.", hasError: false, category: null, subcategory: null, severity: null, explanation: "No errors. Accurate and natural." },
      { target: "Kliknite ovdje da biste saznali vise o našoj politici privatnosti.", hasError: true, category: "Language", subcategory: "Spelling/Typos", severity: "Minor", explanation: "'Vise' is missing the diacritic -- should be 'više'." },
      { target: "Kliknite ovdje da biste saznali više o nasoj politici privatnosti.", hasError: true, category: "Language", subcategory: "Spelling/Typos", severity: "Minor", explanation: "'Nasoj' is missing the diacritic -- should be 'našoj'." },
    ]
  },
  {
    id: 18, source: "The event ends in 3 days, 4 hours and 12 minutes.",
    correct: "Događaj završava za 3 dana, 4 sata i 12 minuta.",
    variants: [
      { target: "Događaj završava za 3 dana, 4 sata i 12 minuta.", hasError: false, category: null, subcategory: null, severity: null, explanation: "No errors. Numbers and time correctly formatted." },
      { target: "Događaj završava za 3 dana, 4 sata i 120 minuta.", hasError: true, category: "Accuracy", subcategory: "Numbers", severity: "Critical", explanation: "12 was changed to 120 -- a critical number error." },
      { target: "Događaj završava za 3 dana 4 sata i 12 minuta.", hasError: true, category: "Language", subcategory: "Punctuation", severity: "Minor", explanation: "Missing comma after '3 dana'." },
    ]
  },
  {
    id: 19, source: "Tap the screen to jump over obstacles.",
    correct: "Dodirnite zaslon kako biste preskočili prepreke.",
    variants: [
      { target: "Dodirnite zaslon kako biste prekočili prepreke.", hasError: true, category: "Language", subcategory: "Spelling/Typos", severity: "Minor", explanation: "'Prekočili' is misspelled -- should be 'preskočili'." },
      { target: "Dodirnite zaslon kako biste preskočili prepreke.", hasError: false, category: null, subcategory: null, severity: null, explanation: "No errors. Natural and accurate." },
      { target: "Dodirnite  zaslon kako biste preskočili prepreke.", hasError: true, category: "Language", subcategory: "Spelling/Typos", severity: "Minor", explanation: "Double space after 'Dodirnite'." },
    ]
  },
  {
    id: 20, source: "You have new messages from your teammates.",
    correct: "Imate nove poruke od svojih suigrača.",
    variants: [
      { target: "Imate nove poruke od svojih suigrači.", hasError: true, category: "Language", subcategory: "Grammar/Syntax", severity: "Minor", explanation: "'Suigrači' should be 'suigrača' (genitive plural after 'od')." },
      { target: "Imate nove poruke od svojih suigrača.", hasError: false, category: null, subcategory: null, severity: null, explanation: "No errors. Clean and accurate." },
      { target: "Imate nove  poruke od svojih suigrača.", hasError: true, category: "Language", subcategory: "Spelling/Typos", severity: "Minor", explanation: "Double space before 'poruke'." },
    ]
  },
];

const CATEGORIES = ["Accuracy", "Compliance", "Language", "Style", "Terminology"];
const SEVERITIES = ["Minor", "Major", "Critical"];
const ROUND_TIME = 30;
const SEV_POINTS = { Critical: 25, Major: 15, Minor: 10 };

// Magenta palette
const C = {
  bg: "#fdf0f8",
  surface: "#ffffff",
  border: "#f0c0e0",
  primary: "#c2185b",
  primaryLight: "#e91e8c",
  accent: "#0097a7", // teal complement
  accentLight: "#00bcd4",
  text: "#2a0a18",
  textMid: "#8a3060",
  textMute: "#b06080",
  pass: "#00796b",
  passBg: "#e0f7f4",
  error: "#c2185b",
  errorBg: "#fce4ec",
  warn: "#f57c00",
  warnBg: "#fff3e0",
};

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickRounds() {
  const pool = SEGMENTS.map(seg => {
    const variant = seg.variants[Math.floor(Math.random() * seg.variants.length)];
    return { ...variant, id: seg.id, source: seg.source, correct: seg.correct };
  });
  const errors = shuffle(pool.filter(s => s.hasError)).slice(0, 7);
  const passes = shuffle(pool.filter(s => !s.hasError)).slice(0, 3);
  return shuffle([...errors, ...passes]);
}

function calcRoundScore(seg, answer, timeLeft) {
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

const css = {
  app: { minHeight: "100vh", width: "100%", boxSizing: "border-box", background: C.bg, color: C.text, fontFamily: "'Helvetica Neue', Arial, sans-serif", padding: "24px 32px" },
  card: { background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: 20, marginBottom: 16, width: "100%", boxSizing: "border-box", boxShadow: "0 2px 12px rgba(194,24,91,0.06)" },
  btn: { background: `linear-gradient(135deg, ${C.primary}, ${C.primaryLight})`, color: "#fff", border: "none", borderRadius: 8, padding: "10px 24px", fontWeight: 800, fontSize: 14, cursor: "pointer", letterSpacing: 0.3 },
  btnAccent: { background: `linear-gradient(135deg, ${C.accent}, ${C.accentLight})`, color: "#fff", border: "none", borderRadius: 8, padding: "10px 24px", fontWeight: 800, fontSize: 14, cursor: "pointer" },
  btnGhost: { background: "transparent", color: C.textMute, border: `1px solid ${C.border}`, borderRadius: 8, padding: "9px 20px", fontWeight: 600, fontSize: 13, cursor: "pointer" },
  btnSm: (active, color, textColor = "#fff") => ({
    background: active ? color : "transparent",
    color: active ? textColor : C.textMute,
    border: `1px solid ${active ? color : C.border}`,
    borderRadius: 8, padding: "8px 14px", fontWeight: 700, fontSize: 12,
    cursor: "pointer", transition: "all 0.15s"
  }),
  label: { fontSize: 10, fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase", color: C.textMute, marginBottom: 8, display: "block" },
};

function Dots() {
  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      {[...Array(12)].map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          borderRadius: "50%",
          background: i % 2 === 0 ? C.primary : C.accent,
          opacity: 0.05,
          width: 40 + (i * 17) % 80,
          height: 40 + (i * 17) % 80,
          top: `${(i * 31) % 100}%`,
          left: `${(i * 47) % 100}%`,
        }} />
      ))}
    </div>
  );
}

function HomeScreen({ onStart, leaderboard }) {
  return (
    <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center", paddingTop: 32 }}>
      <h1 style={{ margin: "0 0 8px", fontSize: 34, fontWeight: 900, fontFamily: "Georgia, serif" }}>
        <span style={{ background: `linear-gradient(135deg, ${C.primary}, ${C.primaryLight})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>LQA</span>
        <span style={{ color: C.text }}> Challenge</span>
      </h1>
      <p style={{ color: C.textMute, marginBottom: 32, fontSize: 14 }}>EN to HR localization quality game -- 10 rounds, find the errors, beat the leaderboard</p>

      <div style={{ ...css.card, textAlign: "left", marginBottom: 24 }}>
        <div style={css.label}>How to play</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {[
            ["🔍", "Read the source and target segment"],
            ["❌ ✓", "Mark as Error or Pass"],
            ["🏷", "If error: pick category and severity"],
            ["⚡", "Faster answers earn time bonus points"],
            ["💯", "Perfect match = full points + bonus"],
            ["🏆", "Top scores go on the leaderboard"],
          ].map(([icon, text], i) => (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", padding: "6px 0" }}>
              <span style={{ fontSize: 16 }}>{icon}</span>
              <span style={{ fontSize: 13, color: C.textMid }}>{text}</span>
            </div>
          ))}
        </div>
      </div>

      <button style={{ ...css.btn, fontSize: 16, padding: "14px 48px", marginBottom: 32 }} onClick={onStart}>Start Game</button>

      {leaderboard.length > 0 && (
        <div style={css.card}>
          <div style={css.label}>🏆 Leaderboard</div>
          {leaderboard.slice(0, 10).map((entry, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: i < Math.min(leaderboard.length, 10) - 1 ? `1px solid ${C.border}` : "none" }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <span style={{ color: i === 0 ? "#e91e8c" : i === 1 ? C.accent : i === 2 ? C.warn : C.textMute, fontWeight: 800, fontSize: 14, minWidth: 24 }}>{i + 1}.</span>
                <span style={{ color: C.text, fontSize: 14 }}>{entry.name}</span>
              </div>
              <span style={{ color: C.primary, fontWeight: 900, fontSize: 17, fontFamily: "Georgia, serif" }}>{entry.score}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function GameScreen({ rounds, onFinish }) {
  const [round, setRound] = useState(0);
  const [timeLeft, setTimeLeft] = useState(ROUND_TIME);
  const [answer, setAnswer] = useState({ verdict: null, category: "", severity: "" });
  const [result, setResult] = useState(null);
  const [scores, setScores] = useState([]);
  const timerRef = useRef(null);

  const seg = rounds[round];
  const total = rounds.length;

  useEffect(() => {
    setTimeLeft(ROUND_TIME);
    setAnswer({ verdict: null, category: "", severity: "" });
    setResult(null);
  }, [round]);

  useEffect(() => {
    if (result) return;
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(timerRef.current); handleSubmit(true); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [round, result]);

  const handleSubmit = (timedOut = false) => {
    clearInterval(timerRef.current);
    const ans = timedOut ? { verdict: "pass", category: "", severity: "" } : answer;
    const { points, breakdown } = calcRoundScore(seg, ans, timeLeft);
    setResult({ points, breakdown });
    setScores(prev => [...prev, points]);
  };

  const handleNext = () => {
    if (round + 1 >= total) {
      onFinish(scores.reduce((a, b) => a + b, 0) + (result?.points || 0));
    } else {
      setRound(r => r + 1);
    }
  };

  const totalSoFar = scores.reduce((a, b) => a + b, 0);
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
            onClick={() => handleSubmit()}
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
          <div style={{ fontSize: 13, color: C.textMid, background: "rgba(255,255,255,0.6)", borderRadius: 8, padding: "10px 14px", marginBottom: 14 }}>
            💡 {seg.explanation}
          </div>
          <button style={css.btn} onClick={handleNext}>
            {round + 1 >= total ? "See Final Score" : "Next Round →"}
          </button>
        </div>
      )}
    </div>
  );
}

function ResultScreen({ score, onRestart, onSave }) {
  const [name, setName] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (!name.trim()) return;
    onSave(name.trim(), score);
    setSaved(true);
  };

  const grade = score >= 800 ? { label: "LQA Expert", color: C.primary, icon: "🏆" }
    : score >= 500 ? { label: "Senior Reviewer", color: C.accent, icon: "⭐" }
    : score >= 300 ? { label: "Junior Tester", color: C.warn, icon: "🎯" }
    : { label: "Keep Practicing", color: C.textMute, icon: "📚" };

  return (
    <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center", paddingTop: 40 }}>
      <div style={{ fontSize: 52, marginBottom: 8 }}>{grade.icon}</div>
      <h2 style={{ margin: "0 0 4px", fontSize: 28, fontWeight: 900, fontFamily: "Georgia, serif", color: grade.color }}>{grade.label}</h2>
      <div style={{ fontSize: 56, fontWeight: 900, color: C.primary, fontFamily: "Georgia, serif", margin: "16px 0 4px" }}>{score}</div>
      <div style={{ color: C.textMute, marginBottom: 32, fontSize: 14 }}>points scored in this session</div>

      {!saved ? (
        <div style={{ ...css.card, textAlign: "left" }}>
          <label style={css.label}>Save your score to the leaderboard</label>
          <div style={{ display: "flex", gap: 10 }}>
            <input
              style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, color: C.text, padding: "10px 12px", fontSize: 13, flex: 1, outline: "none" }}
              placeholder="Enter your name..."
              value={name}
              onChange={e => setName(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSave()}
            />
            <button style={{ ...css.btn, opacity: name.trim() ? 1 : 0.35 }} onClick={handleSave}>Save</button>
          </div>
        </div>
      ) : (
        <div style={{ ...css.card, textAlign: "center", color: C.pass, fontWeight: 700, fontSize: 15 }}>
          Score saved to the leaderboard! 🦒
        </div>
      )}

      <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 16 }}>
        <button style={css.btn} onClick={onRestart}>Play Again</button>
      </div>
    </div>
  );
}

export default function LQAGame() {
  const [screen, setScreen] = useState("home");
  const [rounds, setRounds] = useState([]);
  const [finalScore, setFinalScore] = useState(0);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await window.storage.get("lqa_leaderboard", true);
        if (res?.value) setLeaderboard(JSON.parse(res.value));
      } catch {}
      setLoading(false);
    };
    load();
  }, []);

  const startGame = () => { setRounds(pickRounds()); setScreen("game"); };

  const handleFinish = score => { setFinalScore(score); setScreen("result"); };

  const handleSave = async (name, score) => {
    const updated = [...leaderboard, { name, score }].sort((a, b) => b.score - a.score).slice(0, 20);
    setLeaderboard(updated);
    try { await window.storage.set("lqa_leaderboard", JSON.stringify(updated), true); } catch {}
  };

  if (loading) return <div style={{ ...css.app, display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ color: C.textMute }}>Loading...</div></div>;

  return (
    <div style={css.app}>
      <Dots />
      <div style={{ position: "relative", zIndex: 1 }}>

        {screen === "home" && <HomeScreen onStart={startGame} leaderboard={leaderboard} />}
        {screen === "game" && <GameScreen rounds={rounds} onFinish={handleFinish} />}
        {screen === "result" && <ResultScreen score={finalScore} onRestart={() => setScreen("home")} onSave={handleSave} />}
      </div>
    </div>
  );
}