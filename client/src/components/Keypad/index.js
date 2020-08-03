import React from "react";
import "./style.css";

const Keypad = props => {
    return (
        <div className="pad">
            <div className="button fade" onClick={() => props.enter(1)}>1</div>
            <div className="button fade" onClick={() => props.enter(2)}>2</div>
            <div className="button fade" onClick={() => props.enter(3)}>3</div>
            <div className="button fade" onClick={() => props.enter(4)}>4</div>
            <div className="button fade" onClick={() => props.enter(5)}>5</div>
            <div className="button fade" onClick={() => props.enter(6)}>6</div>
            <div className="button fade" onClick={() => props.enter(7)}>7</div>
            <div className="button fade" onClick={() => props.enter(8)}>8</div>
            <div className="button fade" onClick={() => props.enter(9)}>9</div>
            <div className="button fade" onClick={() => props.enter("+")}>+</div>
            <div className="button fade" onClick={() => props.enter("-")}>-</div>
            <div className="button fade" onClick={() => props.enter("x")}>x</div>
            <div className="button fade" onClick={() => props.enter("÷")}>÷</div>
            {/* <div className="button fade" onClick={() => props.enter(".")}>enter</div> */}
        </div>
    )
}

export default Keypad;