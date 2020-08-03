import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";

let socket;

const Chat = props => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    //   const ENDPOINT = 'https://project-chat-application.herokuapp.com/';

    useEffect(() => {
        socket = io(`192.168.0.35:3010`);

        socket.emit('join', { name, room }, (error) => {
            if (error) {
                alert(error);
            }
        });
    }, []);

    useEffect(() => {
        socket.on('message', message => {
            setMessages(messages => [...messages, message]);
        });
    }, []);

    useEffect(() => {
        if (props.eq) socket.emit('sendMessage', props.eq, () => setMessage(''));
    }, [props.eq]);

    return (<>{messages.map(eq => <p key={eq.text}>{eq.text}</p>)}</>);
}

export default Chat;