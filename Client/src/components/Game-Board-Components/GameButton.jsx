import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../Utils/UserContext";
import { localFunctions } from "../../Utils/LocalGameUtils";
import { functions } from "../../Utils/GameUtils";

export default function GameButton({ x, y, z, value }){
    const gameID = useParams().gameID;
    const { User, Socket, Refresh, Token } = useContext(UserContext);
    const [notify] = Refresh;
    const [token] = Token;
    const [cell, setCell] = useState(value ?? '-');
    const [game, setGame] = useState(null);
    const activeFuncs = (gameID && gameID.startsWith("localgame-")) ? localFunctions : functions;

    useEffect(() => {
        if (!Socket){
            console.log("failed")
            return;
        }
        let mounted = true;
        (async () => {
            try {
                const gameData = await activeFuncs.getGame(gameID, Socket);
                if (!mounted) return;
                if (gameData) setGame(gameData);
                else console.error("Error fetching game data");
            } catch (err) {
                console.error("Error fetching game data:", err);
            }
        })();
        return () => { mounted = false; };
    }, [notify, Socket]);

    // Keep local `cell` in sync with incoming `value` prop (board updates)
    useEffect(() => {
        setCell(value ?? '-');
    }, [value]);

    let baseClasses = "sm:w-10 w-8 aspect-square flex items-center justify-center rounded-md border transition-colors p-0";
    const xClasses = "text-2xl bg-blue-600 text-white font-bold";
    const oClasses = "text-2xl bg-red-600 text-white font-bold";
    const emptyClasses = "bg-white hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer";

    function handleClick() {
        if (!Socket || !game){ 
            console.log("no socket or game");
            return;
        }
        if (cell && cell !== '-') {
            console.log("cell already taken");
            return; // already taken
        }
        if (game.Winner){
            console.log("game already won");
            return
        };
        if (game.CurrentTurn !== User.name){
            console.log(game.CurrentTurn, User.name);
            console.log("not your turn");
            return
        }; // not your turn

        const symbol = User?.name === game.PlayerX ? 'X' : 'O';

        // Prepare board payload: ensure it's a parsed 3D array and apply the move
        const parsedBoard = (typeof game.BoardState === 'string') ? JSON.parse(game.BoardState) : game.BoardState;
        if (!Array.isArray(parsedBoard)) {
            console.error('Invalid board payload, cannot make move');
            return;
        }
        const updatedBoard = JSON.parse(JSON.stringify(parsedBoard));
        if (!updatedBoard[z] || !updatedBoard[z][y] || typeof updatedBoard[z][y][x] === 'undefined'){
            console.error('Board dimensions incorrect for move', { x, y, z });
            return;
        }
        updatedBoard[z][y][x] = symbol;

        // Send updated board to server and await acknowledgement
        (async () => {
            try {
                const res = await activeFuncs.makeMove(gameID, token, { x, y, z }, User.name, updatedBoard, Socket);
                if (!res) console.warn('No ack from makeMove');
            } catch (err) {
                console.error('makeMove failed:', err);
            }
        })();

        // Update local cell state optimistically and update local game object
        setCell(symbol);
        setGame(prev => prev ? { ...prev, BoardState: updatedBoard } : prev);
    }

    const computedClasses = `${baseClasses} ${cell === 'X' ? xClasses : cell === 'O' ? oClasses : emptyClasses}`;

    return (
        <button
            onClick={handleClick}
            aria-label={`cell-${x}-${y}-${z}`}
            title={cell === '-' ? 'Empty cell' : `Placed: ${cell}`}
            className={computedClasses}>
        </button>
    );
}