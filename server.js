require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const connectDB = require("./config/db");
const chatSocket = require("./sockets/chat.socket");

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/appointments", require("./routes/appointment.routes"));
app.use("/api/ai", require("./routes/ai.routes"));

app.get("/", (req, res) => res.send("Backend running 🚀"));

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

chatSocket(io);

server.listen(5000, () =>
  console.log("🚀 Server running on port 5000")
);
