import React, { useEffect, useState } from "react";

const EMOJIS = ["💗", "💕", "🫂", "✨", "💌", "🥹", "😘"];

function random(min, max) {
  return Math.random() * (max - min) + min;
}

export default function EmojiRain({ count = 20 }) {
  const [emojis, setEmojis] = useState([]);

  useEffect(() => {
    const durationMin = 18;
    const durationMax = 28;

    const items = Array.from({ length: count }).map((_, i) => {
      const duration = random(durationMin, durationMax);
      const laneWidth = 100 / count;
      const left = i * laneWidth + random(0, laneWidth * 0.7);

      return {
        id: i,
        emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
        left,
        size: random(22, 38),
        duration,
        delay: -(i * (duration / count)),
        drift: random(-20, 20), // ✅ ADD THIS
      };
    });

    setEmojis(items);
  }, [count]);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {emojis.map((item) => (
        <span
          key={item.id}
          className="absolute select-none"
          style={{
            left: `${item.left}%`,
            fontSize: `${item.size}px`,
            animation: `emoji-fall ${item.duration}s linear ${item.delay}s infinite`,
            "--drift": `${item.drift}px`, // ✅ AND THIS
          }}
        >
          {item.emoji}
        </span>
      ))}
    </div>
  );
}
