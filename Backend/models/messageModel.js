const mongoose = require("mongoose");
const messageModel = mongoose.Scema(
  {
    sender: {
      type: mongoose.Scema.type.ObjectId,
      ref: "User",
    },
    content: { type: String, trim: true },
    chat: {
      type: mongoose.Scema.type.ObjectId,
      ref: "Chat",
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", messageModel);

module.exports = Message;
