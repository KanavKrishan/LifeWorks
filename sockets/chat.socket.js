module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("🟢 Socket connected:", socket.id);

    // Join a room
    socket.on("join-room", (room) => {
      socket.join(room);
      console.log(`Socket ${socket.id} joined room ${room}`);
    });

    // Send message
    socket.on("send-message", ({ room, sender, message }) => {
      if (!room || !message) return;

      io.to(room).emit("receive-message", {
        sender,
        message,
        time: new Date().toISOString()
      });
    });

    // Disconnect
    socket.on("disconnect", () => {
      console.log("🔴 Socket disconnected:", socket.id);
    });
  });
};
