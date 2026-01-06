// src/pages/TimeTogether.jsx

import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import { motion } from "framer-motion";
import Counter from "../components/Counter"; 

dayjs.extend(duration);
dayjs.extend(relativeTime);

const startDate = dayjs("2024-06-11T00:00:00");

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
  const [now, setNow] = useState(dayjs());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(dayjs());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Full duration object (for years/months/days breakdown)
  const totalDuration = dayjs.duration(now.diff(startDate));
  const years = totalDuration.years();
  const months = totalDuration.months();
  const days = totalDuration.days();

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-soft-pink to-deep-rose px-4 py-12">
      {/* Heading with subtle heartbeat animation */}
      <motion.h1
       className="text-4xl md:text-5xl font-extrabold text-white mb-8 text-center"
        initial={{ scale: 1 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        Time We’ve Been Together
        <motion.span
          className="text-rose-200"
          animate={{ y: [0, -5, 0], opacity: [1, 0.7, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          ❤️
        </motion.span>
      </motion.h1>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl"
      >
        {/* Years / Months / Days together */}
        <motion.div
          variants={cardVariants}
          className="bg-white bg-opacity-80 rounded-2xl p-6 shadow-lg backdrop-blur-sm flex flex-col items-center"
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
              <span className="text-deep-rose font-semibold">yr,</span>
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
              <span className="text-deep-rose font-semibold">mo,</span>
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
              <span className="text-deep-rose font-semibold">d</span>
            </div>
          </div>
        </motion.div>

        {/* Total Days */}
        <motion.div
          variants={cardVariants}
          className="bg-white bg-opacity-80 rounded-2xl p-6 shadow-lg backdrop-blur-sm flex flex-col items-center"
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
          className="bg-white bg-opacity-80 rounded-2xl p-6 shadow-lg backdrop-blur-sm flex flex-col items-center"
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
          className="bg-white bg-opacity-80 rounded-2xl p-6 shadow-lg backdrop-blur-sm flex flex-col items-center"
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
          className="bg-white bg-opacity-80 rounded-2xl p-6 shadow-lg backdrop-blur-sm flex flex-col items-center"
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
    </div>
  );
}
