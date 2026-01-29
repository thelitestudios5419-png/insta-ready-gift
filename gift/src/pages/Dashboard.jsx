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
                    bg-ivory px-4 py-12 overflow-hidden">

      {/* Emoji background (behind everything) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <EmojiRain count={10} />
      </div>

      {/* Foreground content */}
      <div className="relative z-10 flex flex-col items-center">

        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl
                       font-semibold text-center mb-12
                       text-charcoal tracking-wide">
          A Few Memories
          <span className="text-crimson-500 ml-2">♥</span>
        </h1>

        {/* Photo Stack */}
        <div className="relative w-72 h-96 mb-12">
          {visiblePhotos.map((src, i) => (
            <motion.img
              key={src}
              src={src}
              className="absolute w-full h-full object-cover rounded-3xl
                         border border-crimson-100
                         shadow-[0_25px_70px_rgba(185,28,28,0.18)]"
              style={{ zIndex: 10 - i }}
              initial={{ opacity: 0, y: 40, rotate: -6 + i * 5 }}
              animate={{
                opacity: 1,
                y: i * 12,
                rotate: -6 + i * 5,
                scale: 1 - i * 0.05,
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          ))}
        </div>

        {/* Next Button */}
        <motion.button
          onClick={nextPhoto}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-10 py-3 rounded-full
                     bg-crimson-600 text-white
                     font-semibold text-lg
                     shadow-[0_18px_50px_rgba(220,38,38,0.35)]
                     hover:bg-crimson-700
                     transition-all duration-300"
        >
          Next
        </motion.button>

        {/* Re-experience Button */}
        <motion.button
          onClick={() => navigate("/")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-5 px-8 py-3 rounded-full
                     bg-white border border-crimson-300
                     text-crimson-600 font-medium text-base
                     shadow-md hover:shadow-lg
                     transition-all duration-300"
        >
          Experience again
        </motion.button>

      </div>
    </div>
  );
}
