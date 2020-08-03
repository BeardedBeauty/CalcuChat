import React from 'react';
import Keypad from "./components/Keypad";
import Chat from "./components/Chat";
import './App.css';
import io from "socket.io-client";
// const ENDPOINT = 'https://project-chat-application.herokuapp.com/';

let socket;

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			display1: "",
			display2: "",
			displaySign: "",
			messages: [],
			content: [],
			answer: ""
		}
	}

	componentDidMount = () => {
		socket = io(`192.168.0.35:3010`);
		console.log(socket);
		socket.emit("join", { room: "main" }, ({ error }) => {
			console.log(error);
		});
		socket.on("message", message => this.setState({ messages: [...this.state.messages, message] }));
	}

	componentDidUpdate = () => this.sum();

	componentWillUnmount = () => {
		socket = io(`192.168.0.35:3010`);
		socket.emit("disconnect");
		socket.off();
	}

	parse = aleph => {
		if (aleph === "+" || aleph === "-" || aleph === "x" || aleph === "÷") this.setState({ displaySign: aleph });
		else { this.state.display1 ? this.setState({ display2: aleph }) : this.setState({ display1: aleph }); }
	}

	sum = () => {
		let beth;
		if (this.state.display1 && this.state.display2 && this.state.displaySign) {
			if (this.state.displaySign === "+") beth = this.state.display1 + this.state.display2;
			else if (this.state.displaySign === "-") beth = this.state.display1 - this.state.display2;
			else if (this.state.displaySign === "x") beth = this.state.display1 * this.state.display2;
			else if (this.state.displaySign === "÷") beth = this.state.display1 / this.state.display2;
		}
		this.send(beth)
	}

	send = gimel => {
		let beth = this.state.display1 + this.state.displaySign + this.state.display2 + " = " + gimel;
		if (beth !== undefined && gimel !== undefined) this.setState({
			answer: beth,
			display1: "",
			display2: "",
			displaySign: ""
		});
	}

	render() {
		return (
			<div className="App" >
				<header id="header">CalcChat</header>
				<div id="hud">
					<p>{this.state.display1 + this.state.displaySign + this.state.display2}</p>
				</div>
				<Keypad enter={this.parse} />
				<Chat eq={this.state.answer} />
			</div>
		);
	}
}

export default App;