import { useEffect, createContext, useContext, useState } from "react";
import GameBoardDimension from "./GameBoardDimension";
import "../../Styles/ComponentStyles.css";
import { UserContext } from "../../Utils/UserContext";
import { useParams } from "react-router-dom";

export const GameIDContext = createContext();

export default function GameBoard({gameID}){
    // Board is generated in the format [z][x][y] so that each dimension can be easily sent to the GameButton component.
    const [board, setBoard] = useState(null);
    gameID = useParams().gameID
    const { Socket } = useContext(UserContext);

    useEffect(() => {
        // This would be replaced with an actual API call to fetch the game board based on game
        if (!Socket) {
            return;
        }
        Socket?.emit("get board", gameID, (response) => {
            if (response.error) {
                console.log("Error fetching game board: ", response.error);
                return;
            }
            setBoard(response);
            sessionStorage.setItem(`board-${gameID}`, JSON.stringify(response));
            // Update the board state here based on response
            // For now, we'll just log it
        });
    }, [gameID, Socket]);

    return board ? 
     (
        <div className="game-board">
            <GameIDContext.Provider value={gameID}>
                <GameBoardDimension z={0} boardDimension={board[0]}/>
                <GameBoardDimension z={1} boardDimension={board[1]}/>
                <GameBoardDimension z={2} boardDimension={board[2]}/>
                <GameBoardDimension z={3} boardDimension={board[3]}/>
            </GameIDContext.Provider>
        </div>
    ) : <p>Loading board...</p>;
}