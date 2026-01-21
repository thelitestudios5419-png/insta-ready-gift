import nodemailer from "nodemailer";
import { GoogleGenerativeAI } from "@google/generative-ai";


export default async function handler(req, res) {
  // Allow only POST
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  try {
    const { toEmail } = req.body;
    console.log('toEmail :>> ', toEmail);
    if (!toEmail || !toEmail.includes("@")) {
      return res.status(400).json({
        success: false,
        error: "Invalid email address",
      });
    }

    /* ───────── Gemini AI ───────── */
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    console.log('GEMINI_API_KEY :>> ', process.env.GEMINI_API_KEY);
    console.log('EMAIL_USER :>> ', process.env.EMAIL_USER);
    console.log('EMAIL_PASS :>> ', process.env.EMAIL_PASS);
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
    console.log('prompt :>> ', prompt);
    let aiMessage;
    const ownerMessage = `\nHey ❤️\n\nShe just clicked “Send Hug” 🫂\n\nThat means she was thinking about you and needed a little closeness.\n\nEven if she didn’t say it out loud, this hug says enough.\n\nJust thought you should know 💗`;

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const result = await model.generateContent(prompt);
      aiMessage = result.response.text().trim();
      console.log('aiMessage :>> ', aiMessage);
    } catch (aiErr) {
      console.error("Gemini failed:", aiErr);
      aiMessage =
        "Heyy my baby 😘🫂 Mi ithech ahe tujhya sathi, sending all my love 💖";
        console.log('Catch aiMessage :>> ', aiMessage);
    }

    /* ───────── Email ───────── */
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    console.log('transporter :>> ', transporter);

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
