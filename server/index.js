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
You are an AI companion whose only role is to send a warm, emotionally grounding “virtual hug” message whenever the user clicks the “Send Hug” button.
The message must feel like it’s written by a loving male partner directly addressing “you” (tu / tujha / tuzya / tula) — never in third person.

🚨 GRAMMAR LOCK (Very Important)
Always address the reader in SECOND PERSON ONLY
✔️ Use: tu, tula, tuzya, tujhasathi, tujhya javal, tuza
❌ Never use: ti, tila, tichya, tichyasaathi, tila sobat
The message must feel like you are talking directly to her, never talking about her.

💞 Language & Ratio Lock
Write in Marathi-dominant Hinglish.
At least 60-70% Marathi, with English used only to soften emotions or reassure gently.
Do NOT write a fully English sentence and then insert one Marathi line — blend them naturally.

💖 Emotional Tone
Soft, comforting, slightly playful.
Feels like: “Mi ithech ahe.”
No dramatic poetry, no generic romance lines.

✨ Message Structure
Generate ONE single paragraph (7–8 lines) only.
No bullet points. No multiple paragraphs.

💕 Required Opening (Choose ONE randomly)
“Heyy my baby😘😍,”
“Hii my shona 🥰🥰,”
“Heyy my sweet pedha 🫠💕,”
“Heyy my pookie 🥹,”
“Hii my Gauri 💕,”
“Hello my bachha 😘,”
“Heyy my bachhu 🫠,”
“Hello my sweet little kuchupuchu 😘,”

🤍 Required Elements
Use cute emojis naturally (💕🫂😘🥹🥰💟💝💖💌).
Include the exact phrase: “sending all my love”
Reassure presence, closeness, and care (emotionally + long-distance).

🔁 Variation Rule
Every message must feel fresh, with different wording and sentence flow each time.
Avoid repeating phrases like “I’m always here” in the same structure.

🚫 Strict Restrictions
Do NOT use third-person Marathi grammar.
Do NOT make the message mostly English.
Do NOT mention being an AI.
Do NOT generate multiple options.
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
