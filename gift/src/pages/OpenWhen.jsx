// src/pages/OpenWhen.jsx
import { Link, useNavigate} from "react-router-dom";
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
      ease: "easeOut",
    },
  }),
};

export default function OpenWhen() {
  const navigate = useNavigate();

  const conditions = [
    {
      title: "Open when you miss me",
      keywords: ["miss"],
    },
    {
      title: "Open When You’re Feeling Low",
      keywords: ["low", "sad"],
    },
    {
      title: "Open When You Need a Smile",
      keywords: ["smile", "happy"],
    },
    {
      title: "Open When You’re Overthinking",
      keywords: ["overthinking"],
    },
    {
      title: "Open when your heart feels heavy",
      keywords: ["heavy"],
    },
    {
      title: "Open on a special occasion",
      keywords: ["Special", "occasion"],
    },
  ];

  return (
    <div className="justify-center relative min-h-screen w-full flex flex-col items-center overflow-hidden px-4 py-10 bg-gradient-to-tr from-[#be185d] via-[#f472b6] to-[#fbcfe8]">

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

      {/* Letters */}
      <motion.div
        className="z-10 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl"
        initial="hidden"
        animate="visible"
      >
        {conditions.map((cond, index) => {
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
      <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          onClick={() => navigate("/time-together")}
          className="justify-center w-[35%] mt-5 z-10 py-3 rounded-full
                    bg-white/90 text-rose-600 font-bold text-lg
                    shadow-lg shadow-rose-500/40
                    hover:shadow-rose-400/60
                    transition-all duration-300"
        >
          Next →
        </motion.button>
    </div>
  );
}
