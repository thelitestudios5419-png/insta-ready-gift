import React, { useEffect, useState } from "react";

const EMOJIS = ["💗", "💕", "🫂", "🥰", "💌", "❤️", "😘"];

function random(min, max) {
  return Math.random() * (max - min) + min;
}

export default function EmojiRain({ count = 20 }) {
  const [emojis, setEmojis] = useState([]);

  useEffect(() => {
    const items = Array.from({ length: count }).map((_, i) => ({
      id: i,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      left: random(0, 100),        // ✅ RANDOM START X
      size: random(22, 38),
      duration: random(18, 28),
      delay: random(-20, 0),       // ✅ random stagger
      drift: random(-40, 40),      // ✅ gentle side movement
    }));

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
            top: "-40px", // ✅ always start above screen
            fontSize: `${item.size}px`,
            animation: `emoji-fall ${item.duration}s linear ${item.delay}s infinite`,
            "--drift": `${item.drift}px`,
          }}
        >
          {item.emoji}
        </span>
      ))}
    </div>
  );
}
