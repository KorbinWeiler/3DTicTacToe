import { useState, useContext, useEffect } from "react";
import { GameIDContext } from "./GameBoard";
import { SendMove } from "../../Utils/GameplayApi";
import "../../Styles/ComponentStyles.css";
import { useParams } from "react-router-dom";
import { UserContext } from "../../Utils/UserContext";

export default function GameButton({ x, y, z, value}){  
    const gameID = useParams().gameID;
    const {User, Socket} = useContext(UserContext);
    let buttonClass = "game-button";
    const [game, setGame] = useState({});
    const [boardState, setBoardState] = useState(JSON.parse(sessionStorage.getItem(`board-${gameID}`)).BoardState);

    // console.log("Button value:",x, y, z, boardState[z]);

    useEffect(() => {
        if(!Socket){
            return;
        }
        Socket.emit("get game", gameID, (response) => {
            if (response.error) {
                console.log("Error fetching game data: ", response.error);
                return;
            }
            // You can use the response to update button state if needed
            setGame(response);
        });
    }, [Socket]);

    if(boardState === "X"){
        buttonClass += " x";
    }
    else if(boardState === "O"){
        buttonClass += " o";
    }

    function handleClick() {
        if(boardState === "-") {

        }
    }

    return (
        <button className={buttonClass} onClick={handleClick}></button>
    );
}