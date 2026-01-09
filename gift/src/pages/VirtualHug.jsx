import { useState } from "react"
import WarpOverlay from "../components/WarpOverlay.jsx"

export default function SendHug() {
  const [status, setStatus] = useState("")
  const [overlayOpen, setOverlayOpen] = useState(false)
  const [responseMessage, setResponseMessage] = useState("")
  const [loading, setLoading] = useState(false);

  
  const handleSend = async () => {
    setLoading(true);      // 👈 ADD THIS
    setOverlayOpen(true);
    setResponseMessage("Sending a warm hug… 🫂💗");
  try {
    const response = await fetch(
      "https://anniversarygift.onrender.com/send-hug",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toEmail: "theprathamesh07@gmail.com",
        }),
      }
    );

    // 🚨 Check HTTP status first
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (data.success) {
      setResponseMessage(data.message || "Hug sent successfully 🫂💗");
    } else {
      setResponseMessage(data.message || "Hug failed 😢");
    }
  } catch (error) {
    console.error("Frontend fetch error:", error);
    setResponseMessage(
      "Server is waking up 💗 Please try again in a few seconds."
    );
  } finally {
    setOverlayOpen(true);
  }
};


  const closeOverlay = () => {
    setOverlayOpen(false)
  }

  return (
<div className="min-h-screen w-full bg-white relative">
  {/* Pink Glow Background */}
  <div
    className="absolute inset-0 z-0"
    style={{
      backgroundImage: `
        radial-gradient(125% 125% at 50% 90%, #ff54f6a7 40%, #fd2d95ff 100%)
      `,
      backgroundSize: "100% 100%",
    }}
  />
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <WarpOverlay
        open={overlayOpen}
        message={responseMessage}
        onClose={closeOverlay}
      />

      <h1 className="text-3xl font-bold text-deep mb-4">Virtual Hug 🤗</h1>

      <img
        src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExc3B5cWVrdDhoY3podGpqOWUxbmx2Z2w2NXoxOW9uMmFkdjRuazR6dyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/qCT06WLJURMyfsEi2r/giphy.gif"
        alt="Hug GIF"
        className="w-48 h-48 rounded-2xl shadow-lg mb-4"
      />

      <button
        onClick={handleSend}
        className="bg-deep-rose-400 text-white px-6 py-2 rounded-full shadow-lg hover:bg-pink-600 transition duration-300"
        disabled={loading}
      >
        Send Hug 💌
      </button>
    </div>
    </div>
  )
}
