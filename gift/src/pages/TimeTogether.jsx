// src/pages/TimeTogether.jsx

import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import { motion } from "framer-motion";
import Counter from "../components/Counter"; 
import { useNavigate } from "react-router-dom";

dayjs.extend(duration);
dayjs.extend(relativeTime);

const startDate = dayjs("2024-12-26T00:00:00");

// Framer Motion Variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] },
  },
};

export default function TimeTogether() {
  const navigate = useNavigate();
  const [now, setNow] = useState(dayjs());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(dayjs());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Full duration object (for years/months/days breakdown)
  let temp = startDate;

  const years = now.diff(temp, "year");
  temp = temp.add(years, "year");

  const months = now.diff(temp, "month");
  temp = temp.add(months, "month");

  const days = now.diff(temp, "day");

  // Total days together (integer)
  const totalDays = now.diff(startDate, "day");

  // Total hours / minutes / seconds since startDate
  const totalHours = now.diff(startDate, "hour");
  const totalMinutes = now.diff(startDate, "minute");
  const totalSeconds = now.diff(startDate, "second");

  // Style for each digit box (light pink background, black border, red text)
  const digitBoxStyle = {
    borderRadius: "0.25rem",         // Rounded corners
    color: "#E11D48",                // Bright red numeral (Tailwind’s rose-600)
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  // Disable the default Counter gradients so each box is uniformly pink
  const hideGradient = { height: 0 };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-crimson-200 via-pink-300 to-rosewood-500 px-4 py-12">
      {/* Heading with subtle heartbeat animation */}
      <motion.h1
          className="text-2xl md:text-4xl font-extrabold text-rose-500 mb-8 text-center drop-shadow-xl"
          initial={{ scale: 1 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          A Little Time Capsule
          <motion.span
            className="ml-2 inline-block"
            animate={{ y: [0, -6, 0], opacity: [1, 0.8, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            ❤️
          </motion.span>
        </motion.h1>


      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-[88%] max-w-4xl"
      >
        {/* Years / Months / Days together */}
        <motion.div
          variants={cardVariants}
          className="bg-white bg-opacity-80 rounded-3xl p-5 shadow-lg backdrop-blur-sm flex flex-col items-center"
        >
          <p className="text-sm uppercase tracking-wide text-gray-500 mb-1">
            Duration
          </p>
          <div className="flex items-center space-x-2">
            {/* Years */}
            <div className="flex items-center space-x-1">
              <Counter
                value={years}
                places={[10, 1]}
                fontSize={24}
                padding={6}                       // vertical padding inside each box
                gap={4}                           // space between the two digit‐boxes
                textColor="#E11D48"
                fontWeight={700}
                digitStyle={digitBoxStyle}
                topGradientStyle={hideGradient}
                bottomGradientStyle={hideGradient}
              />
              <span className="text-rosewood-500 font-semibold">yr,</span>
            </div>
            {/* Months */}
            <div className="flex items-center space-x-1">
              <Counter
                value={months}
                places={[10, 1]}
                fontSize={24}
                padding={6}
                gap={4}
                textColor="#E11D48"
                fontWeight={700}
                digitStyle={digitBoxStyle}
                topGradientStyle={hideGradient}
                bottomGradientStyle={hideGradient}
              />
              <span className="text-rosewood-500 font-semibold">mo,</span>
            </div>
            {/* Days */}
            <div className="flex items-center space-x-1">
              <Counter
                value={days}
                places={[10, 1]}
                fontSize={24}
                padding={6}
                gap={4}
                textColor="#E11D48"
                fontWeight={700}
                digitStyle={digitBoxStyle}
                topGradientStyle={hideGradient}
                bottomGradientStyle={hideGradient}
              />
              <span className="text-rosewood-500  font-semibold">d</span>
            </div>
          </div>
        </motion.div>

        {/* Total Days */}
        <motion.div
          variants={cardVariants}
          className="bg-white bg-opacity-80 rounded-3xl p-5 shadow-lg backdrop-blur-sm flex flex-col items-center"
        >
          <p className="text-sm uppercase tracking-wide text-gray-500 mb-1">
            Total Days
          </p>
          <Counter
            value={totalDays}
            places={[1000, 100, 10, 1]}
            fontSize={24}
            padding={6}
            gap={4}
            textColor="#E11D48"
            fontWeight={700}
            digitStyle={digitBoxStyle}
            topGradientStyle={hideGradient}
            bottomGradientStyle={hideGradient}
          />
        </motion.div>

        {/* Total Hours */}
        <motion.div
          variants={cardVariants}
          className="bg-white bg-opacity-80 rounded-3xl p-5 shadow-lg backdrop-blur-sm flex flex-col items-center"
        >
          <p className="text-sm uppercase tracking-wide text-gray-500 mb-1">
            Total Hours
          </p>
          <Counter
            value={totalHours}
            places={[10000, 1000, 100, 10, 1]}
            fontSize={24}
            padding={6}
            gap={4}
            textColor="#E11D48"
            fontWeight={700}
            digitStyle={digitBoxStyle}
            topGradientStyle={hideGradient}
            bottomGradientStyle={hideGradient}
          />
        </motion.div>

        {/* Total Minutes */}
        <motion.div
          variants={cardVariants}
          className="bg-white bg-opacity-80 rounded-3xl p-5 shadow-lg backdrop-blur-sm flex flex-col items-center"
        >
          <p className="text-sm uppercase tracking-wide text-gray-500 mb-1">
            Total Minutes
          </p>
          <Counter
            value={totalMinutes}
            places={[100000, 10000, 1000, 100, 10, 1]}
            fontSize={24}
            padding={6}
            gap={4}
            textColor="#E11D48"
            fontWeight={700}
            digitStyle={digitBoxStyle}
            topGradientStyle={hideGradient}
            bottomGradientStyle={hideGradient}
          />
        </motion.div>

        {/* Total Seconds */}
        <motion.div
          variants={cardVariants}
          className="bg-white bg-opacity-80 rounded-3xl p-5 shadow-lg backdrop-blur-sm flex flex-col items-center"
        >
          <p className="text-sm uppercase tracking-wide text-gray-500 mb-1">
            Total Seconds
          </p>
          <Counter
            value={totalSeconds}
            places={[100000, 10000, 1000, 100, 10, 1]}
            fontSize={24}
            padding={6}
            gap={4}
            textColor="#E11D48"
            fontWeight={700}
            digitStyle={digitBoxStyle}
            topGradientStyle={hideGradient}
            bottomGradientStyle={hideGradient}
          />
        </motion.div>

        {/* Extra floating heart for fun */}
        <motion.div
          variants={cardVariants}
          className="flex items-center justify-center"
        >
          <motion.span
            className="text-6xl"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 15, 0], opacity: [1, 0.8, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            💕
          </motion.span>
        </motion.div>
      </motion.div>
        <motion.button
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          onClick={() => navigate("/virtual-hug")}
          className="z-10 mt-8 mx-auto w-18  py-3 rounded-full
                     bg-crimson-600 text-white font-semibold text-lg
                     shadow-[0_16px_44px_rgba(220,38,38,0.20)]
                     hover:bg-crimson-700 transition-all duration-300"
          aria-label="Next to Time Together"
        >
          Next →
        </motion.button>
    </div>
  );
}
