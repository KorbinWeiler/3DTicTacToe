import { useEffect, createContext, useContext, useState } from "react";
import GameBoardDimension from "./GameBoardDimension";
import { UserContext } from "../../Utils/UserContext";
import { useParams } from "react-router-dom";
import { localFunctions } from "../../Utils/LocalGameUtils";
import { functions } from "../../Utils/GameUtils";

export const GameIDContext = createContext();

export default function GameBoard({ gameID }){
    // Board shape: [z][x][y]
    const [board, setBoard] = useState(null);
    const params = useParams();
    const [winner, setWinner] = useState(null);
    gameID = params.gameID;
    const { Socket, Refresh } = useContext(UserContext);
    const [notify] = Refresh;

    useEffect(() => {
        if (!Socket || !gameID) return; //local games dont work without online connection for now

        const activeFuncs = (gameID && gameID.startsWith("localgame-")) ? localFunctions : functions;
        console.log("Using functions: ", activeFuncs);
    let mounted = true;
    (async () => {
        try {
            const boardData = await activeFuncs.getBoard(gameID, Socket);
            if (!mounted) return;
            if (boardData) setBoard(boardData);
            else console.error("Error fetching game board");

            const winnerData = await activeFuncs.getWinner(gameID, Socket);
            if (!mounted) return;
            setWinner(winnerData ?? null);
        } catch (err) {
            console.error("Error fetching game data:", err);
        }

    })();
    return () => { mounted = false; };
}, [notify, gameID, Socket]);

    if (!board) return <p className="text-sm text-slate-500">Loading board...</p>;
    return (
        <div className="game-board space-y-6">
            {winner ? <div className="mb-4 p-4 bg-green-100 text-green-800 rounded">
                <strong>Game Over!</strong> Winner: {winner}
            </div> : null}
            <GameIDContext.Provider value={gameID}>
                {(Array.isArray(board) ? board : board?.BoardState ?? []).map((dim, z) => (
                    <div key={z} className="">
                        <div className="mb-2 text-sm text-slate-600 dark:text-slate-300">Level {z + 1}</div>
                        <GameBoardDimension z={z} boardDimension={dim} />
                    </div>
                ))}
            </GameIDContext.Provider>
        </div>
    );
}