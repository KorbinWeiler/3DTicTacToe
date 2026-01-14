import { useState, useContext, useEffect } from "react";
import "../../Styles/ComponentStyles.css";
import { useParams } from "react-router-dom";
import { UserContext } from "../../Utils/UserContext";

export default function GameButton({ x, y, z, value}){  
    const gameID = useParams().gameID;
    const {User, Socket, Refresh, Token} = useContext(UserContext);
    let buttonClass = "game-button";
    const [game, setGame] = useState({});
    const [notify, setNotify] = Refresh;
    const [token, ] = Token;
    const [boardState, setBoardState] = useState(JSON.parse(JSON.parse(sessionStorage.getItem(`board-${gameID}`)).BoardState));
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
    }, [notify, Socket]);

    if(boardState[z][x][y] === "X"){
        buttonClass += " x";
    }
    else if(boardState[z][x][y] === "O"){
        buttonClass += " o";
    }

    function handleClick() {
        console.log(boardState)
        console.log(game)
        if(boardState[z][x][y] === "-") {
            boardState[z][x][y] = User.name === game.PlayerX ? "X" : "O";
            console.log("Updated board state:", boardState[z][x][y]);
            if(boardState[z][x][y] === "X"){
                buttonClass += " x";
            }
            else if(boardState[z][x][y] === "O"){
                buttonClass += " o";
            }
            //sessionStorage.setItem(`board-${gameID}`, JSON.stringify(JSON.stringify(boardState)));
            Socket.emit("make move", gameID, token, { x, y, z }, User.name, User.name === game.PlayerX ? game.PlayerO : game.PlayerX, boardState);
            setBoardState([...boardState]);
        }
    }

    return (
        <button className={buttonClass} onClick={() => handleClick()}></button>
    );
}