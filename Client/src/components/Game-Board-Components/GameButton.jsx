import { useState, useContext } from "react";
import { GameIDContext } from "./GameBoard";
import { SendMove } from "../../Utils/GameplayApi";
import "../../Styles/ComponentStyles.css";

export default function GameButton({ x, y, z, value}){
    const { gameID } = useContext(GameIDContext);
    const [playValue, setPlayValue] = useState(value)
    let buttonClass = "game-button";

    if (playValue === "X") {
        buttonClass += " x";
    } else if (playValue === "O") {
        buttonClass += " o";
    }

    function handleClick() {
        if(value === "") {
            // Simulate a move
            const newValue = playValue === "X" ? "O" : "X";
            console.log(`Game ID: ${gameID}, Move: (${x}, ${y}, ${z}) set to ${newValue}`);
        }
    }

    return (
        <button className={buttonClass} onClick={handleClick}></button>
    );
}