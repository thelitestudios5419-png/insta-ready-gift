import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen bg-gradient-to-b from-pink-200 to-white flex flex-col justify-center items-center text-center px-4">
      {/* Cute Header Text */}
      <motion.p
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-3xl md:text-5xl font-bold text-rose-600 mb-8"
      >
        Welcome, My Love 💕 <br />
        This Corner of the Internet Is All Yours
      </motion.p>


      {/* Get Started Button */}
      <motion.button
        onClick={() => navigate('/dashboard')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-rose-500 hover:bg-rose-600 text-white text-lg md:text-lg font-semibold py-3 px-6 rounded-full shadow-lg transition duration-300"
      >
       Let the Magic Begin
      </motion.button>

      {/* Cute Hug GIF */}
      <motion.img
        src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmMzY2tmZXZyMXFwZHdmaTY2ZGR5YWwwZzdjZDNhY2ZxeXhsOW9qYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/KztT2c4u8mYYUiMKdJ/giphy.gif"
        alt="hug gif"
        className="mt-10 w-[250px] sm:w-[300px] md:w-[350px] lg:w-[400px] h-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        
      />
    </div>
  );
}
