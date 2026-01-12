import GameButton from "./GameButton";
import "../../Styles/ComponentStyles.css";
import { use } from "react";
import { useParams } from "react-router-dom";

export default function GameBoardDimension({z, boardDimension}) {
    const gameID = useParams().gameID;
    const board = JSON.parse(sessionStorage.getItem(`board-${gameID}`)).BoardState;
    return (
        <div className="game-board-dimension">
            <div className="dimension-label">``
            <GameButton x={0} y={0} z={z} value={board[0][0]}/>
            <GameButton x={1} y={0} z={z} value={board[1][0]}/>
            <GameButton x={2} y={0} z={z} value={board[2][0]}/>
            <GameButton x={3} y={0} z={z} value={board[3][0]}/>
            </div>
            <div className="dimension-label">
            <GameButton x={0} y={1} z={z} value={board[0][1]}/>
            <GameButton x={1} y={1} z={z} value={board[1][1]}/>
            <GameButton x={2} y={1} z={z} value={board[2][1]}/>
            <GameButton x={3} y={1} z={z} value={board[3][1]}/>
            </div>
            <div className="dimension-label">
            <GameButton x={0} y={2} z={z} value={board[0][2]}/>
            <GameButton x={1} y={2} z={z} value={board[1][2]}/>
            <GameButton x={2} y={2} z={z} value={board[2][2]}/>
            <GameButton x={3} y={2} z={z} value={board[3][2]}/>
            </div>
            <div className="dimension-label">
            <GameButton x={0} y={3} z={z} value={board[0][3]}/>
            <GameButton x={1} y={3} z={z} value={board[1][3]}/>
            <GameButton x={2} y={3} z={z} value={board[2][3]}/>
            <GameButton x={3} y={3} z={z} value={board[3][3]}/>
            </div>
        </div>
    );
}