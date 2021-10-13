const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
const socketio = require("socket.io");
const router = require("./routes");
const { addUser, getUser, removeUser, getUsersInRoom } = require("./users");
require("dotenv").config();
const app = express();
const bodyParser = require('body-parser')//required for routing on seperate server
app.use(bodyParser.json());//required for routing on seperate server
app.use(express.urlencoded({ extended: true }));//required for routing on seperate server
app.use(cors());
const server = http.createServer(app);

const io = socketio(server);
const PORT = process.env.PORT || 3010;
let mdb = process.env.MONGODB_URI;

app.use(router);

io.on('connection', socket => {
    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id });
        console.log(name, room)
        if (error) return callback(error);

        socket.join("math room");

        socket.emit('message', { user: 'admin', text: `${name}, welcome to room ${room}.` });
        socket.broadcast.to(room).emit('message', { user: 'admin', text: `${name} has joined!` });

        io.to("math room").emit('roomData', { room: "math room", users: getUsersInRoom(user.room) });

        if (error) callback({ error: "error" });
    });

    socket.on('sendMessage', (message, callback) => {
        // const user = getUser(socket.id);
        console.log(message)
        io.to("math room").emit('message', { text: message });
        // callback();
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
    })
});

mongoose.connect(mdb, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log(`Database connected successfully`);
}).catch(err => console.log(err));

app.use((req, res, next) => {
    res.header("Access-Control-Allow=Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

server.listen(PORT, () => console.log("port connected: " + PORT));