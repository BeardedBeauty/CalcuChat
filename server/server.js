const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const router = require("./routes");
const { addUser, getUser, removeUser, getUsersInRoom } = require("../users");
require("dotenv").config();
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const PORT = process.env.PORT || 3010;

io.on("connection", socket => {
    socket.on("join", ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room });
        if (error) callback({ error: "error" });
        socket.emit("message", { user: "user", text: "math room" });
        socket.join(user.room);
        // io.to(user.room).emit("roomData", { room: user.room, users: getUsersInRoom(user.room) });
        // callback();
    });

    socket.on("disconnect", () => { const user = removeUser(socket.id) });

    socket.on("sendMessage", (message, callback) => {
        const user = getUser(socket.id);
        console.log(message)

        io.to(user.room).emit('message', { user: user.name, text: message });

        callback();
    });
});

app.use(router);

//app.listen(PORT, () => console.log("port connected: " + PORT));
server.listen(PORT, () => console.log("port connected: " + PORT));