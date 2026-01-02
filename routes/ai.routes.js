const express = require("express");
const openai = require("../config/openai");
// ❌ remove auth import
// const auth = require("../middleware/auth");

const router = express.Router();

router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a compassionate mental health counsellor. Be empathetic, calm, and supportive."
        },
        { role: "user", content: message }
      ]
    });

    res.json({
      reply: response.choices[0].message.content
    });
  } catch (err) {
    console.error("AI error:", err);
    res.status(500).json({ message: "AI error" });
  }
});

module.exports = router;
