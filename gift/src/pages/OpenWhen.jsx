// src/pages/OpenWhen.jsx

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Particles from "../components/Particles.jsx";

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.6,
      ease: "easeOut"
    }
  })
};

export default function OpenWhen() {
  const conditions = [
    "Open on our 1st year anniversary",
    "Open on your birthday",
    "Open when you get a job",
    "Open when you’re feeling down",
    "Open when you want to relive My favorite memories",
    "Open when you’re thinking about our first date",
    "Open when you’re Crying",
    "Open when you miss me",
    "Open when you're sad",
    "Open when you can't sleep",
    "Open when you want to smile",
    "Open when we’ve had a fight",
    "Open on our 2nd year anniversary",
  ];

return (
  <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4 py-10 bg-gradient-to-tr from-[#be185d] via-[#f472b6] to-[#fbcfe8]">
    
    {/* Background Particles */}
    <div className="absolute inset-0 z-0 pointer-events-none">
    <Particles
    className="w-full h-full"
    particleColors={['#ff0059']}
    particleCount={500}
    particleSpread={10}
    speed={0.1}
    particleBaseSize={100}
    moveParticlesOnHover={true}
    alphaParticles={false}
    disableRotation={false}
    />
    </div>



    {/* Rest of your content remains unchanged */}
    <motion.h1
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="z-10 text-3xl sm:text-4xl font-bold text-rose-600 mb-8 drop-shadow-md text-center"
    >
      💌 Choose a Letter…
    </motion.h1>

    <motion.div
      className="z-10 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl"
      initial="hidden"
      animate="visible"
    >
      {conditions.map((cond, index) => {
        const path = encodeURIComponent(cond);
        return (
          <motion.div
            key={cond}
            variants={itemVariants}
            custom={index}
          >
            <Link to={`/open-when/${path}`}>
              <motion.div
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 8px 24px rgba(255, 149, 185, 0.4)",
                }}
                whileTap={{ scale: 0.96 }}
                className="w-[93%] mx-auto bg-white/80 backdrop-blur-md rounded-3xl py-5 px-4 text-center text-lg font-medium text-rose-700 hover:text-rose-900 transition duration-200 shadow-lg shadow-rose-500/40 hover:shadow-2xl hover:shadow-rose-400/60 transition-all duration-300"
              >
                {cond}
              </motion.div>
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  </div>
);

}
