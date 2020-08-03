const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const router = require("./routes");
require("dotenv").config();
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const PORT = process.env.PORT || 3010;

io.on("connection", beth => {
    console.log("new connection" + beth);
    socket.on("disconnect", () => console.log("disconnection"));
});

app.use(router);

//app.listen(PORT, () => console.log("port connected: " + PORT));
server.listen(PORT, () => console.log("port connected: " + PORT));