import { C } from "../theme.js";

export default function Dots() {
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
