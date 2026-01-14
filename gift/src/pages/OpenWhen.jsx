// src/pages/OpenWhen.jsx

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import Particles from "../components/Particles.jsx";

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

export default function OpenWhen() {
  const [query, setQuery] = useState("");

  const conditions = [
    {
      title: "Open on our 1st year anniversary",
      keywords: ["1st", "anniversary"],
    },
    {
      title: "Open on your birthday",
      keywords: ["birthday", "bday", "born"],
    },
    {
      title: "Open when you get a job",
      keywords: ["job", "work", "offer", "career"],
    },
    {
      title: "Open when you’re feeling down",
      keywords: ["down", "low", "tired", "upset"],
    },
    {
      title: "Open when you want to relive My favorite memories",
      keywords: ["memories", "memory", "past", "relive"],
    },
    {
      title: "Open when you’re thinking about our first date",
      keywords: ["first", "date"],
    },
    {
      title: "Open when you’re Crying",
      keywords: ["cry", "crying", "tears"],
    },
    {
      title: "Open when you miss me",
      keywords: ["miss", "missing", "distance"],
    },
    {
      title: "Open when you're sad",
      keywords: ["sad", "unhappy", "hurt"],
    },
    {
      title: "Open when you can't sleep",
      keywords: ["sleep", "insomnia", "night"],
    },
    {
      title: "Open when you want to smile",
      keywords: ["smile", "happy", "laugh"],
    },
    {
      title: "Open when we’ve had a fight",
      keywords: ["fight", "argue", "argument"],
    },
    {
      title: "Open on our 2nd year anniversary",
      keywords: ["anniversary", "2nd", "second"],
    },
  ];

  // 🔍 FILTER LOGIC (simple one-word search)
  const filteredConditions = conditions.filter((item) =>
    query.trim() === ""
      ? true
      : item.keywords.some((k) =>
          k.toLowerCase().includes(query.toLowerCase())
        )
  );

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4 py-10 bg-gradient-to-tr from-[#be185d] via-[#f472b6] to-[#fbcfe8]">

      {/* Background Particles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Particles
          className="w-full h-full"
          particleColors={["#ff0059"]}
          particleCount={500}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 text-3xl sm:text-4xl font-bold text-rose-600 mb-6 text-center drop-shadow-md"
      >
        💌 Choose a Letter…
      </motion.h1>

      {/* 🔍 SEARCH BAR */}
      <input
        type="text"
        placeholder="Try: cry, smile, sleep..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="z-10 mb-8 w-full max-w-md px-5 py-3 rounded-full text-medium bg-white/80 text-center text-rose-700 placeholder-rose-400 shadow-lg outline-none focus:ring-2 focus:ring-rose-300"
      />

      {/* Letters */}
      <motion.div
        className="z-10 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl"
        initial="hidden"
        animate="visible"
      >
        {filteredConditions.map((cond, index) => {
          const path = encodeURIComponent(cond.title);

          return (
            <motion.div key={cond.title} variants={itemVariants} custom={index}>
              <Link to={`/open-when/${path}`}>
                <motion.div
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 8px 24px rgba(255, 149, 185, 0.4)",
                  }}
                  whileTap={{ scale: 0.96 }}
                  className="w-[93%] mx-auto bg-white/80 backdrop-blur-md rounded-3xl py-5 px-4 text-center text-lg font-medium text-rose-700 hover:text-rose-900 shadow-lg shadow-rose-500/40 hover:shadow-2xl hover:shadow-rose-400/60 transition-all duration-300"
                >
                  {cond.title}
                </motion.div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>

      {/* No result */}
      {filteredConditions.length === 0 && (
        <p className="z-10 mt-6 text-white text-lg">
          No letter found 💔
        </p>
      )}
    </div>
  );
}
