require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connection } = require("./db");
const { createServer } = require("http");
const socketIo = require("socket.io");
const { DeviceModel } = require("./models/deviceModel");
const { Customer } = require("./models/customerModel");
const { DeviceTypeModel } = require("./models/deviceTypeModel");
const { Admin } = require("./models/adminModel");
const winston = require("winston");
const logger = require("./logger");
const logRoutes = require("./routes/log.route");
require("dotenv").config();


const app = express();
app.use(express.json());
app.use(cors(
    { origin: ["https://iotfront.neosao.online", "http://localhost:3000"], methods: ["GET", "POST"], }
))
app.use("/logs", logRoutes);
const server = createServer(app);
const io = socketIo(server, {
    cors: {
        origin: ["https://iotfront.neosao.online", "http://localhost:3000"],
        methods: ["GET", "POST"]
    }
});


// const io = require("socket.io")(3001, { cors: { origin: ["http://localhost:3000", "http://127.0.0.1:5500"], methods: ["GET", "POST"], } });

io.on("connection", (socket) => {

    socket.on("data", async (data) => {
        // socket.broadcast.emit("signal-received", { serialNumber: "12323243", voltage: "450volt", current: "120amp" });
        try {
            io.emit("signal-received", data);
            const updatedDevice = await DeviceModel.findOneAndUpdate({ serialNumber: data.serialNumber }, { voltage: data.voltage, current: data.current, status: data?.status === "1" ? true : false }, { new: true });
        }
        catch (error) {
            console.log("error:", error)
        }
    });

    socket.on("error-signal", async (data) => {
        const log = logger(data.serialNumber);
        try {
            io.emit("error-data", data);
            log.error(data)
            const updatedDevice = await DeviceModel.findOneAndUpdate({ serialNumber: data.serialNumber }, { voltage: data.voltage, current: data.current, status: data?.status === "1" ? true : false }, { new: true });
        }
        catch (error) {
            console.log("error:", error)
        }
    })
})

server.listen(process.env.PORT, async () => {
    try {
        await connection;
        console.log(`server is connected to DB running at ${process.env.PORT}`)
    }
    catch (error) {
        console.log("something went wrong while connecting to the server:", error)
    }
})