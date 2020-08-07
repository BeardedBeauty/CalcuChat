import React from 'react';
import Keypad from "./components/Keypad";
import Chat from "./components/Chat";
import './App.css';
import io from "socket.io-client";

const host = "https://immense-falls-83737.herokuapp.com";
// const host = "http://192.168.0.35:3010";

let socket;

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			display1: "",
			display2: "",
			displaySign: "",
			messages: [],
			answer: "",
			sendString: ""
		}
	}

	componentDidMount = () => {
		socket = io(host);
		// socket.emit("join", { room: "math room" }, ({ error }) => {
		// 	console.log(error);
		// });
		// socket.on("message", message => this.setState({ messages: [...this.state.messages, message] }));
	}

	componentWillUpdate = () => console.log(this.state)

	componentWillUnmount = () => {
		socket = io(host);
		socket.emit("disconnect");
		socket.off();
	}

	parse = aleph => {
		if (aleph === ".") this.enter();
		else if (aleph === "~") this.setState({
			display1: "",
			display2: "",
			displaySign: "",
		});
		else {
			if (aleph === "+" || aleph === "-" || aleph === "x" || aleph === "÷") this.setState({ displaySign: aleph });
			else { this.state.display1 !== "" ? this.setState({ display2: aleph }) : this.setState({ display1: aleph }); }
		}
	}

	enter = () => {
		let beth;
		if (this.state.display1 !== "" && this.state.display2 !== "" && this.state.displaySign) {
			if (this.state.displaySign === "+") beth = this.state.display1 + this.state.display2;
			else if (this.state.displaySign === "-") beth = this.state.display1 - this.state.display2;
			else if (this.state.displaySign === "x") beth = this.state.display1 * this.state.display2;
			else if (this.state.displaySign === "÷") beth = this.state.display1 / this.state.display2;
		}
		let gimel = this.state.display1 + this.state.displaySign + this.state.display2 + " = " + beth;
		if (beth !== undefined && gimel !== undefined) this.setState({
			sendString: gimel,
			display1: "",
			display2: "",
			displaySign: "",
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
				<Chat eq={this.state.sendString} />
			</div>
		);
	}
}

export default App;