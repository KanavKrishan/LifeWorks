const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    room: {
      type: String,
      required: true,
      index: true
    },

    sender: {
      type: String,
      required: true
    },

    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    message: {
      type: String,
      required: true,
      trim: true
    },

    type: {
      type: String,
      enum: ["user", "ai", "system"],
      default: "user"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Message", MessageSchema);
