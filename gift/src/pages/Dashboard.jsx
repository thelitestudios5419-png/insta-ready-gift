import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const cards = [
    { label: 'Open When…', to: '/open-when' },
    { label: 'Our Time Together', to: '/time-together' },
    { label: 'Virtual Hug', to: '/virtual-hug' },
  ];

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#f48fb1] via-[#f06292] to-[#ad1457] px-4 py-12">  
      <h1
  className="
    text-[30px] sm:text-3xl md:text-4xl
    font-bold text-center
    bg-gradient-to-r from-white via-rose-100 to-white
    bg-clip-text text-transparent
    drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)]
    mb-10
  "
>
  What would you like to do?
  <span className="ml-2 notranslate text-rose-50 bg-none text-clip">
    🤔🫣
  </span>
</h1>


      <motion.div
        className="w-[75%] grid w-full max-w-6xl gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-4 z-1"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {cards.map(({ label, to }) => (
          <Link key={label} to={to} className="w-full">
            <motion.div
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className=" z-1 w-full h-full bg-pink-100 text-rose-600 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.55)]
                         py-4 px-4 text-center text-lg sm:text-xl font-bold 
                         transition-all duration-300 hover:shadow-lg"
            >
              {label}
            </motion.div>
          </Link>
        ))}
      </motion.div>
    </div>
  );
}
