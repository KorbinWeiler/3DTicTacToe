import { useState } from "react";
import { GameIDContext } from "./GameBoard";

export default function GameButton({ x, y, z, value}){
    const { gameID } = useContext(GameIDContext);
    const [playValue, setPlayValue] = useState(value)
    let buttonClass = "game-button";

    if (playValue === "X") {
        buttonClass += " x";
    } else if (playValue === "O") {
        buttonClass += " o";
    }

    return (
        <button className={buttonClass}></button>
    );
}