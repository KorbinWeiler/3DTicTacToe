import { useEffect, createContext } from "react";
import GameBoardDimension from "./GameBoardDimension";
import "../../Styles/ComponentStyles.css";

export const GameIDContext = createContext();

export default function GameBoard({gameID}){
    // Board is generated in the format [z][x][y] so that each dimension can be easily sent to the GameButton component.
    let board = Array.from({ length: 4 }, () =>
        Array.from({ length: 4 }, () =>
            Array.from({ length: 4 }, () => ({ value: "" }))
        )
    ); // Initialize a 4x4x4 board

    useEffect(() => {
        // This would be replaced with an actual API call to fetch the game board based on game
        console.log(`Fetching game board for game ID: ${gameID}...`);
    }, [gameID]);

    return (
        <div className="game-board">
            <GameIDContext.Provider value={gameID}>
                <GameBoardDimension z={0} boardDimension={board[0]}/>
                <GameBoardDimension z={1} boardDimension={board[1]}/>
                <GameBoardDimension z={2} boardDimension={board[2]}/>
                <GameBoardDimension z={3} boardDimension={board[3]}/>
            </GameIDContext.Provider>
        </div>
    )
}