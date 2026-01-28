import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import EmojiRain from "../components/EmojiRain";

export default function Dashboard() {
  const navigate = useNavigate();
  const photos = [
    "/photos/1.jpg",
    "/photos/2.jpeg",
    "/photos/3.jpeg",
    "/photos/4.jpeg",
  ];

  const [index, setIndex] = useState(0);

  const visiblePhotos = [
    photos[index],
    photos[(index + 1) % photos.length],
    photos[(index + 2) % photos.length],
  ];

  const nextPhoto = () => {
    setIndex((prev) => (prev + 1) % photos.length);
  };

   return (
    <div className="relative min-h-screen flex flex-col items-center justify-center
                    bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))]
                    from-[#f48fb1] via-[#f06292] to-[#ad1457]
                    px-4 py-12 overflow-hidden">

      {/* Emoji background */}
      <EmojiRain count={12} />

      {/* Foreground content */}
      <div className="relative z-10 flex flex-col items-center">

        <h1 className="text-2xl sm:text-3xl md:text-4xl
                       font-bold text-center mb-12 text-white">
          A Few Memories 🤍
        </h1>

        {/* Photo Stack */}
        <div className="relative w-72 h-96 mb-10">
          {visiblePhotos.map((src, i) => (
            <motion.img
              key={src}
              src={src}
              className="absolute w-full h-full object-cover rounded-3xl
                         shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
              style={{ zIndex: 10 - i }}
              initial={{ opacity: 0, y: 30, rotate: -5 + i * 5 }}
              animate={{
                opacity: 1,
                y: i * 10,
                rotate: -5 + i * 5,
                scale: 1 - i * 0.05,
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          ))}
        </div>

        {/* Buttons */}
        <motion.button
          onClick={nextPhoto}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 rounded-full
                     bg-white/90 text-rose-600 font-bold text-lg
                     shadow-lg shadow-rose-500/40
                     hover:shadow-rose-400/60
                     transition-all duration-300"
        >
          Next →
        </motion.button>

        <motion.button
          onClick={() => navigate('/')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-4 bg-rose-500 hover:bg-rose-600
                     text-white text-lg font-semibold
                     py-3 px-6 rounded-full shadow-lg"
        >
          Re-experience again
        </motion.button>

      </div>
    </div>
  );
}