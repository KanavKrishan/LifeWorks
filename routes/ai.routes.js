const express = require("express");
const openai = require("../config/openai");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/chat", auth, async (req, res) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are a compassionate mental health counsellor. Be empathetic, calm, and supportive."
      },
      { role: "user", content: req.body.message }
    ]
  });

  res.json({ reply: response.choices[0].message.content });
});

module.exports = router;
