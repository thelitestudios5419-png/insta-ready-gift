import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-crimson-300 to-rosewood-300 flex items-center justify-center px-4 py-12">
      <div className="relative z-10 max-w-2xl w-full bg-white/95 border border-crimson-50 rounded-3xl p-8 shadow-[0_30px_80px_rgba(30,30,30,0.06)]">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-3xl sm:text-4xl md:text-5xl font-semibold text-charcoal text-center leading-tight"
        >
          Welcome
          <span className="inline-block ml-3 text-crimson-600">♥</span>
          <div className="text-base sm:text-lg font-medium text-charcoal/70 mt-4">
            A private little space for memories, letters & tiny moments.
          </div>
        </motion.h1>

        {/* Hero area: GIF/illustration on the right for larger screens */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
         <div className="flex flex-col items-center md:items-start">
            <p className="text-charcoal/80 text-sm sm:text-base mb-6">
              Start a gentle journey — letters to open later, memories to revisit, and tiny surprises to make them smile.
            </p>

            <motion.button
              onClick={() => navigate("/open-when")}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 rounded-full bg-crimson-600 text-white font-semibold text-base shadow-[0_14px_40px_rgba(220,38,38,0.18)] hover:bg-crimson-700 transition"
              aria-label="Get started"
            >
             Start the Surprise ✨
            </motion.button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full flex items-center justify-center"
          >
            {/* Keep the GIF or swap for an illustration at /public/assets/hero.png */}
            <img
              src="https://media.tenor.com/ujq2yTt6EuoAAAAj/crystal-amaru.gif"
              alt="cute cats gif"
              className="w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-xl object-cover shadow-[0_18px_50px_rgba(0,0,0,0.06)]"
            />
          </motion.div>
        </div>

        {/* subtle footer note */}
        <p className="text-xs text-charcoal/60 mt-6 text-center">
          Made with care
        </p>
      </div>
    </div>
  );
}
