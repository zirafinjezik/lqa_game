import { useState } from "react";
import { css } from "./theme.js";
import { pickRounds } from "./lib/scoring.js";
import Dots from "./components/Dots.jsx";
import HomeScreen from "./components/HomeScreen.jsx";
import GameScreen from "./components/GameScreen.jsx";
import ResultScreen from "./components/ResultScreen.jsx";

export default function LQAGame() {
  const [screen, setScreen] = useState("home");
  const [rounds, setRounds] = useState([]);
  const [finalScore, setFinalScore] = useState(0);
  const [history, setHistory] = useState([]);
  const [leaderboard, setLeaderboard] = useState(() => {
    try {
      const raw = localStorage.getItem("lqa_leaderboard");
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.warn("Could not read leaderboard:", e);
      return [];
    }
  });

  const startGame = () => { setRounds(pickRounds()); setScreen("game"); };

  const handleFinish = ({ score, history }) => { setFinalScore(score); setHistory(history); setScreen("result"); };

  const handleSave = (name, score) => {
    const updated = [...leaderboard, { name, score }].sort((a, b) => b.score - a.score).slice(0, 20);
    setLeaderboard(updated);
    try {
      localStorage.setItem("lqa_leaderboard", JSON.stringify(updated));
    } catch (e) {
      console.warn("Could not save leaderboard:", e);
    }
  };

  return (
    <div style={css.app}>
      <Dots />
      <div style={{ position: "relative", zIndex: 1 }}>
        {screen === "home" && <HomeScreen onStart={startGame} leaderboard={leaderboard} />}
        {screen === "game" && <GameScreen rounds={rounds} onFinish={handleFinish} />}
        {screen === "result" && <ResultScreen score={finalScore} history={history} leaderboard={leaderboard} onRestart={() => setScreen("home")} onSave={handleSave} />}
      </div>
    </div>
  );
}
