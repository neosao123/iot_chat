require("dotenv").config();
const io = require("socket.io")(3001, { cors: { origin: "http://localhost:3000", methods: ["GET", "POST"], } });

io.on("connection", (socket) => {
 console.log("user is connected")

 socket.on("data", (data) => {
  console.log("data:", data)
  // socket.broadcast.emit("signal-received", { serialNumber: "12323243", voltage: "450volt", current: "120amp" });
  io.emit("signal-received", data)
 })
})

console.log("started")