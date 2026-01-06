// server/index.js
import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
const PORT = 5000;

/* ────────────────────────
   Middleware
──────────────────────── */
app.use(cors({
  origin: "http://localhost:5173", // frontend only
}));
app.use(express.json());

/* ────────────────────────
   Gemini AI Setup
──────────────────────── */
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/* ────────────────────────
   Email Transporter (REUSED)
──────────────────────── */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Gmail App Password
  },
});

/* ────────────────────────
   Rate Limiting (simple)
──────────────────────── */
let lastSent = 0;
const RATE_LIMIT_MS = 15000;

/* ────────────────────────
   AI Prompt
──────────────────────── */
const prompt = `
You are an AI companion whose job is to send a sweet “virtual hug” message whenever the user clicks the “Send Hug” button.
Generate a single heartfelt paragraph (7–8 lines) that feels personal, warm, romantic, and playful—just like a real hug wrapped in words.
Use cute emojis throughout the message 💕🫂😘🥹✨ and mention the phrase “sending all my love”.

Begin with exactly ONE of the following (chosen randomly):
“Heyy my baby😘😍,”
“Hii my shona 🥰🥰,”
“Heyy my sweet pedha 🫠💕,”
“Heyy my pookie 🥹,”
“Hii my Gauri 💕,”
“Hello my bachha 😘,”
“Heyy my bachhu 🫠,”
“Hello my sweet little kuchupuchu 😘,”

Continue naturally in ONE paragraph only.
Do NOT generate multiple options.
Make every message feel different from previous ones.
`;

/* ────────────────────────
   Routes
──────────────────────── */
app.post("/send-hug", async (req, res) => {
  try {
    /* Rate limit */
    const now = Date.now();
    if (now - lastSent < RATE_LIMIT_MS) {
      return res.status(429).json({
        success: false,
        error: "Please wait before sending another hug 💗",
      });
    }
    lastSent = now;

    /* Validate email */
    const { toEmail } = req.body;
    if (!toEmail || !toEmail.includes("@")) {
      return res.status(400).json({
        success: false,
        error: "Invalid email address",
      });
    }

    /* Generate AI message */
    let aiMessage;
    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
      });

      const result = await model.generateContent(prompt);
      aiMessage = result.response.text().trim();
    } catch (aiError) {
      console.error("Gemini AI failed:", aiError);
      aiMessage =
        "Heyy my baby 😘🫂 I’m sending all my love wrapped in the warmest hug right now 💕✨ Just close your eyes and feel me holding you tight 💗";
    }

    console.log("AI Hug Message:\n", aiMessage);

    /* Send Email */
    await transporter.sendMail({
      from: `Virtual Hug 🤗💖 <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject: "A Virtual Hug Just for You 🤗",
      text: aiMessage,
    });

    res.json({
      success: true,
      message: aiMessage,
    });

  } catch (error) {
    console.error("Error sending hug:", error);
    res.status(500).json({
      success: false,
      error: "Failed to send hug 💔",
    });
  }
});

/* Health Check */
app.get("/", (req, res) => {
  res.send("Backend is working ❤️");
});

/* ────────────────────────
   Server Start
──────────────────────── */
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
