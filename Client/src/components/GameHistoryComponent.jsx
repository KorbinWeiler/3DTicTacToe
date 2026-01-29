import { useEffect, useState, useContext } from "react";
import { UserContext } from "../Utils/UserContext";


export default function GameHistoryComponent() {
    const [gameHistory, setGameHistory] = useState([]);
    const {Socket, User, Refresh} = useContext(UserContext);
    const [notify, setNotify] = Refresh;

    useEffect(() => {
        // This would be replaced with an actual API call to fetch game history
        if (!Socket) return;
        Socket?.emit("get game history", User.name, (response) => {
            if (response?.error) {
                console.error("Error fetching game history: ", response.error);
                return;
            }
            setGameHistory(response || []);
        });
    }, [Socket, notify]);

    return (
        <div className="game-history">
            <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-4">Game History</h3>

            {gameHistory.length === 0 ? (
                <div className="text-sm text-slate-500">No game history available.</div>
            ) : (
                <ul className="space-y-3">
                    {gameHistory.map((game, index) => (
                        <li key={index} className="bg-white dark:bg-slate-800 p-3 rounded shadow">{game.GameID + ": " + ( game.PlayerX === User.name ? game.PlayerO : game.PlayerX)}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}