import nodemailer from "nodemailer";
import { GoogleGenerativeAI } from "@google/generative-ai";


export default async function handler(req, res) {
  // Allow only POST
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  try {
    const { toEmail } = req.body;
    if (!toEmail || !toEmail.includes("@")) {
      return res.status(400).json({
        success: false,
        error: "Invalid email address",
      });
    }

    /* ───────── Gemini AI ───────── */
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const prompt = `You are a creative copywriter whose only role is to generate short, emotionally engaging Instagram Reel text to showcase a digital “Open When / Virtual Hug” gift website.
The content must feel warm, personal, and gift-worthy, as if one person created something special just for someone they love.
It should make viewers think: “I want this for my person.”

🚨 VOICE & POV LOCK (Very Important)
Write in second person (you / your).
Speak directly to the viewer, never about them.
Do NOT use third-person narration.

💬 LANGUAGE & STYLE
100% English
Simple, emotionally soft, Instagram-friendly
No complex words, no poetry, no clichés
Feels natural for reels (spoken or caption text)

💖 EMOTIONAL TONE
Warm
Comforting
Slightly romantic, but not cringey
Feels intimate, thoughtful, and genuine
Like a quiet moment, not a loud ad

✨ STRUCTURE RULES
Generate ONE single short paragraph only
5–7 short lines (perfect for reel text overlays)
Each line should be easy to read in under 1 second
No emojis overload (2–4 max, used naturally)`;
    let aiMessage;
    const ownerMessage = `\nHey ❤️\n\nShe just clicked “Send Hug” 🫂\n\nThat means she was thinking about you and needed a little closeness.\n\nEven if she didn’t say it out loud, this hug says enough.\n\nJust thought you should know 💗`;

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const result = await model.generateContent(prompt);
      aiMessage = result.response.text().trim();
    } catch (aiErr) {
      console.error("Gemini failed:", aiErr);
      aiMessage =
        "Heyy sweetheart 😘🫂 i am always thier for you, sending all my love 💖";
    }

    /* ───────── Email ───────── */
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    /* ───────── Send Hug Email (to her) ───────── */
    await transporter.sendMail({
      from: `Virtual Hug 🤗💖 <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject: "A Virtual Hug Just for You 🤗",
      text: aiMessage,
    });

     /* ───────── Acknowledgement Email (to you) ───────── */
     await transporter.sendMail({
      from: `Virtual Hug 🤗💖 <${process.env.EMAIL_USER}>`,
      to: process.env.OWNER_EMAIL,
      subject: "She just sent a hug 🫂",
      text: ownerMessage,
     });

    return res.status(200).json({
      success: true,
      message: aiMessage,
    });
  } catch (error) {
    console.error("Send hug error:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to send hug 💔",
    });
  }
}
