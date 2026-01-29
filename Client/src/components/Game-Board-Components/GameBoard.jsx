import { useEffect, createContext, useContext, useState } from "react";
import GameBoardDimension from "./GameBoardDimension";
import { UserContext } from "../../Utils/UserContext";
import { useParams } from "react-router-dom";

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
        if (!Socket || !gameID) return;
        Socket.emit("get board", gameID, (response) => {
            if (response?.error) {
                console.error("Error fetching game board: ", response.error);
                return;
            }

            //what the actual fuck is this?????
            // Safely normalize response into an array of dimensions without deep recursion
            function normalizeToArray(data) {
                if (data == null) return null;
                // If it's a JSON string, try to parse it
                if (typeof data === 'string') {
                    try {
                        const parsed = JSON.parse(data);
                        return normalizeToArray(parsed);
                    } catch (e) {
                        return null;
                    }
                }

                if (Array.isArray(data)) return data;
                if (data.BoardState) return normalizeToArray(data.BoardState);

                // If object has numeric keys at top level, map them to an array (one level deep)
                const topKeys = Object.keys(data).filter(k => /^\d+$/.test(k)).sort((a,b) => Number(a)-Number(b));
                if (topKeys.length) {
                    return topKeys.map(k => {
                        const v = data[k];
                        // If value is a JSON string or an object/array, normalize it
                        return normalizeToArray(v);
                    });
                }

                return null;
            }

            const boardArray = normalizeToArray(response) ?? normalizeToArray(response?.BoardState) ?? null;
            if (!boardArray) console.error('Unable to normalize board response:', response);
            setBoard(boardArray);
            try { sessionStorage.setItem(`board-${gameID}`, JSON.stringify({ BoardState: boardArray })); } catch (e) {}
            Socket.emit("get winner", gameID, (winResponse) => {
                if (winResponse?.error) {
                    console.error("Error fetching game winner: ", winResponse.error);
                    return;
                }
                setWinner(winResponse.Winner || null);
            });
        });
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