const Message = require("../models/Message");

module.exports = (io) => {
  io.on("connection", (socket) => {
    socket.on("join", (room) => socket.join(room));

    socket.on("message", async (data) => {
      await Message.create(data);
      io.to(data.room).emit("message", data);
    });
  });
};
