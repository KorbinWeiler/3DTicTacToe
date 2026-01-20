import { useEffect, useContext, useState } from "react";
import GameComponent from "./GameComponent";
import { UserContext } from "../Utils/UserContext";

export default function OngoingGamesComponent() {
    const [ongoingGames, setOngoingGames] = useState([]);
    const { User, Socket, Refresh } = useContext(UserContext);
    const [notify, setNotify] = Refresh;

    useEffect(() => {
        if (!Socket) return;
        Socket?.emit("get games", User.name, (response) => {
            if (response?.error) {
                console.log("Error fetching ongoing games: ", response.error);
                return;
            }
            setOngoingGames(response || []);
        });
    }, [notify, Socket, User?.name]);

    return (
        <div className="ongoing-games">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-slate-900 dark:text-white">Ongoing Games</h3>
                <span className="text-sm text-slate-500">{ongoingGames.length} active</span>
            </div>

            {ongoingGames.length === 0 ? (
                <div className="p-6 text-sm text-slate-500">No ongoing games at the moment.</div>
            ) : (
                <ul className="space-y-4">
                    {ongoingGames.map((game, index) => (
                        <li key={game.id ?? index} className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow flex items-center justify-between">
                            <div className="flex-1">
                                <GameComponent Game={game} yourTurn={game.CurrentTurn === User.name} />
                            </div>
                            {game.CurrentTurn === User.name && (
                                <span className="ml-4 inline-flex items-center px-2 py-1 text-xs font-medium bg-emerald-100 text-emerald-700 rounded">Your turn</span>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}