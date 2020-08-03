import React from "react";
import "./style.css";

const Keypad = props => {
    return (
        <div className="pad">
            <button onClick={() => props.enter(1)}>1</button>
            <button onClick={() => props.enter(2)}>2</button>
            <button onClick={() => props.enter(3)}>3</button>
            <button onClick={() => props.enter(4)}>4</button>
            <button onClick={() => props.enter(5)}>5</button>
            <button onClick={() => props.enter(6)}>6</button>
            <button onClick={() => props.enter(7)}>7</button>
            <button onClick={() => props.enter(8)}>8</button>
            <button onClick={() => props.enter(9)}>9</button>
            <button onClick={() => props.enter("+")}>+</button>
            <button onClick={() => props.enter("-")}>-</button>
            <button onClick={() => props.enter("x")}>x</button>
            <button onClick={() => props.enter("÷")}>÷</button>
        </div>
    )
}

export default Keypad;