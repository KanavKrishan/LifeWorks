const express = require("express");
const openai = require("../config/openai");
const auth = require("../middleware/auth");

const router = express.Router();

/* ================= AI CHAT ================= */
router.post("/chat", auth, async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ message: "Message is required" });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ message: "OpenAI key not configured" });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a compassionate mental health counsellor. Be empathetic, calm, supportive, and non-judgmental."
        },
        {
          role: "user",
          content: message
        }
      ],
      temperature: 0.7
    });

    const reply =
      response?.choices?.[0]?.message?.content ||
      "I'm here for you. Could you tell me a bit more?";

    res.json({ reply });

  } catch (err) {
    console.error("AI chat error:", err);
    res.status(500).json({
      message: "AI service temporarily unavailable"
    });
  }
});

module.exports = router;
