// src/pages/VirtualHug.jsx

import { useState } from "react";
import WarpOverlay from "../components/WarpOverlay.jsx";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function SendHug() {
  const navigate = useNavigate();
  const [hugPhase, setHugPhase] = useState("idle"); 
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    setLoading(true);
    setHugPhase("sending");
    setOverlayOpen(true);
    setResponseMessage("Sending a warm hug… 🫂💗");

    try {
      const response = await fetch("/api/send-hug", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toEmail: "theprathamesh07@gmail.com",
        }),
      });

      const data = await response.json();

      setHugPhase("response");
      setOverlayOpen(true); // 🔥 reopen no matter what

      if (data.success) {
        setResponseMessage("Hug sent successfully, with love! 🫂💗");
      } else {
        setResponseMessage("Aww, the hug got lost 😢 Try sending it again!");
      }
    } catch (error) {
      setHugPhase("response");
      setOverlayOpen(true); // 🔥 reopen even if user cancelled earlier
      setResponseMessage("Oops! Something went wrong 💔 Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      
      {/* Soft romantic background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-crimson-200 via-crimson-300 to-rosewood-300" />
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-5 text-center">
        
      <WarpOverlay
        open={overlayOpen}
        message={responseMessage}
        onClose={() => {
          // Only allow full close after response is shown
          if (hugPhase === "response") {
            setOverlayOpen(false);
            setHugPhase("idle");
          } else {
            setOverlayOpen(false); // sending overlay can be cancelled
          }
        }}
      />


        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-3xl font-bold text-charcoal/90 mb-6"
        >
          A Little Virtual Hug 🤍
        </motion.h1>

        {/* GIF */}
        <motion.img
          src="https://media1.giphy.com/media/v1.Y2lkPTZjMDliOTUyeTZtM3lvaXRzZmEzaTd5bnJveWRwcmNuNGJqM2U1b2J3YTVvYjRtYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IzXiddo2twMmdmU8Lv/giphy.gif"
          alt="Virtual hug gif"
          className="w-52 sm:w-75 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.35)] mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        />

        {/* Send Hug Button */}
        <motion.button
          onClick={handleSend}
          disabled={loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-35 max-w-xs py-3 rounded-full
                     bg-rosewood-400 text-white font-semibold text-base
                     shadow-lg shadow-rosewood-400/40
                     hover:bg-rosewood-500 transition-all duration-300"
        >
          Send a cute little hug 💌
        </motion.button>

        {/* Next button (hidden while overlay is open) */}
        {!overlayOpen && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            onClick={() => navigate("/dashboard")}
            className="mt-6 w-13 max-w-xs py-3 rounded-full
                       bg-white/90 text-rosewood-400 font-semibold
                       shadow-md shadow-rosewood-300/40
                       hover:bg-white transition-all duration-300"
          >
            Next →
          </motion.button>
        )}
      </div>
    </div>
  );
}
