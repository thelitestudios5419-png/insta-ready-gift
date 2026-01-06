// index.js
import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
const PORT = 5000;

const prompt = `
You are an AI companion whose job is to send a sweet “virtual hug” message whenever the user clicks the “Send Hug” button. Generate a single, heartfelt paragraph (7–8 lines) that feels personal, warm, and playful—just like a real hug wrapped in words. Include at least one heart or kiss emoji, mention the phrase “sending all my love,” and keep the tone romantic and uplifting (as if speaking directly to your girlfriend).

When addressing her, use exactly one of these pet names, always prefaced by “my”:
- my baby
- my shona
- my pedha
- my pookie
- my Gauri
- my bachha
- my bachhu

Begin with something like “Heyy my baby,” “Hii my shona,”, "heyy my sweet pedha", “Heyy my pookie,” “Hii my Gauri,” “Hello my bachha,” or “Heyy my bachhu,” then continue with a heartfelt message in a single paragraph spanning at least 7–8 lines. Make sure to include “sending all my love” somewhere in the middle or end. Do not output multiple options—only one complete paragraph per invocation.  

don't generate same kind of message every time try different message every time
`;

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/send-hug", async (req, res) => {
  const { toEmail } = req.body;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const aiMessage = response.text();

    console.log("AI Message generated:", aiMessage);

    
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send the email
    await transporter.sendMail({
      from: `Virtual Hug 🤗💖 <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject: "A Virtual Hug Just for You 🤗",
      text: aiMessage,
    });

    res.json({ success: true, message: aiMessage });
  } catch (error) {
    console.error("Error sending hug:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Failed to send hug",
    });
  }
});

app.get("/", (req, res) => {
  res.send("Backend is working!");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});