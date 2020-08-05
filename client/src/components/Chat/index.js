import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import api from "../../api.js";
let socket;
const host = "https://immense-falls-83737.herokuapp.com";
// const host = "http://192.168.0.35:3010";

const Chat = props => {
    const [messages, setMessages] = useState([]);

    socket = io(host);
    const name = "any";
    const room = "math room";

    useEffect(() => {
        socket.emit('join', { name, room }, err => {
            if (err) {
                alert(err);
            }
        });
        return () => {
            socket.emit("disconnect");
            socket.off();
        }
    }, []);

    useEffect(() => {
        socket.on('message', message => {
            console.log(message)
            getthem();
        });
    }, []);

    const getthem = () => {
        api.getEq().then(res => {
            let daleth = [];
            for (let q = res.data.length - 1; q > res.data.length - 11; q--) {
                daleth.push({ text: res.data[q].text });
            }
            setMessages(daleth);
        });
    }

    useEffect(() => {
        if (props.eq) {
            api.newEq({
                user: "any",
                text: props.eq
            }).then(() => socket.emit("sendMessage", props.eq));
        }
    }, [props.eq]);

    return (<>{messages.map(eq => <p key={eq.text}>{eq.text}</p>)}</>);
}

export default Chat;