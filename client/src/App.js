import React from 'react';
import Keypad from "./components/Keypad";
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
			int: null
		}
	}

	parse = aleph => {
		if (aleph === "+" || aleph === "-" || aleph === "x" || aleph === "÷") {
			this.setState({ displaySign: aleph });
		}
		else { this.state.display1 ? this.setState({ display2: aleph }) : this.setState({ display1: aleph }); }
		this.sum()
	}

	sum = () => {

	}

	render() {
		return (
			<div className="App" >
				<header></header>
				<p>{this.state.display1 + this.state.displaySign + this.state.display2}</p>
				<Keypad
					enter={this.parse}
				/>
			</div>
		);
	}
}

export default App;