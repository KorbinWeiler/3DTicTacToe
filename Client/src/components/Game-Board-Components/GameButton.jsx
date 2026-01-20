import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../Utils/UserContext";

export default function GameButton({ x, y, z, value }){
    const gameID = useParams().gameID;
    const { User, Socket, Refresh, Token } = useContext(UserContext);
    const [notify] = Refresh;
    const [token] = Token;
    const [cell, setCell] = useState(value ?? '-');
    const [game, setGame] = useState(null);

    useEffect(() => {
        if (!Socket){
            console.log("failed")
            return;
        }
        Socket.emit("get game", gameID, (response) => {
            if (response?.error) {
                console.log("Error fetching game data: ", response.error);
                return;
            }
            setGame(response);
        });
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
        if (!Socket || !game) return;
        if (cell && cell !== '-') return; // already taken
        if (game.CurrentTurn !== User.name){
            return
        }; // not your turn

        const symbol = User?.name === game.PlayerX ? 'X' : 'O';

        // try to update sessionStorage board if present
        try {
            const raw = sessionStorage.getItem(`board-${gameID}`);
            console.log(raw)
            if (raw) {
                const parsed = JSON.parse(raw);
                const boardState = parsed?.BoardState ?? parsed;
                if (boardState && boardState[z] && boardState[z][x]) {
                    boardState[z][y][x] = symbol;
                    sessionStorage.setItem(`board-${gameID}`, JSON.stringify({ BoardState: boardState }));
                    Socket.emit("make move", gameID, token, { x, y, z }, User.name, User.name === game.PlayerX ? game.PlayerO : game.PlayerX, boardState);
                    setCell(symbol);
                }
            } else {
                // no board in storage — still send move
                Socket.emit("make move", gameID, token, { x, y, z }, User.name, User.name === game.PlayerX ? game.PlayerO : game.PlayerX, null);
                setCell(symbol);
            }
        } catch (e) {
            console.log('Failed to update board in storage', e);
            Socket.emit("make move", gameID, token, { x, y, z }, User.name, User.name === game.PlayerX ? game.PlayerO : game.PlayerX, null);
            setCell(symbol);
        }
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