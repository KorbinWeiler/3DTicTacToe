import { useEffect, createContext } from "react";
import GameBoardDimension from "./GameBoardDimension";

export const GameIDContext = createContext();

export default function GameBoard({gameID}){
    // Board is generated in the format [z][x][y] so that each dimension can be easily sent to the GameButton component.
    let board =[4][4][4]; 
    for (let z = 0; z < 4; z++) {
        board[z] = [];
        for (let x = 0; x < 4; x++) {
            board[z][x] = [];
            for (let y = 0; y < 4; y++) {
                board[z][x][y] = { value: "" }; // Initialize with empty values
            }
        }
    }

    useEffect(() => {
        // This would be replaced with an actual API call to fetch the game board based on game
        console.log(`Fetching game board for game ID: ${gameID}...`);
    }, [gameID]);

    return (
        <div className="game-board">
            <gameID.Provider ID={gameID}>
                <GameBoardDimension z={0} boardDimension={board[0]}/>
                <GameBoardDimension z={1} boardDimension={board[1]}/>
                <GameBoardDimension z={2} boardDimension={board[2]}/>
                <GameBoardDimension z={3} boardDimension={board[3]}/>
            </gameID.Provider>
        </div>
    )
}