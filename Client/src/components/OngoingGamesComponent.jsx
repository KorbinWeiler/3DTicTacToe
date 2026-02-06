import { useEffect, useContext, useState } from "react";
import { UserContext } from "../Utils/UserContext";
import GameComponent from "../components/GameComponent";
import { GetGameLocal, GetGamesLocal } from "../Utils/LocalGameUtils";
import LocalGameComponent from "../components/LocalGameComponent";

export default function OngoingGamesComponent({ localRefresh }) {
    const [ongoingGames, setOngoingGames] = useState([]);
    const { User, Socket, Refresh } = useContext(UserContext);
    const [notify] = Refresh;

    // store local game IDs and resolved local game objects separately
    const [localGameIDs, setLocalGameIDs] = useState([]);
    const [localGames, setLocalGames] = useState([]);

    useEffect(() => {
        const tempLocalIDs = GetGamesLocal();
        setLocalGameIDs(tempLocalIDs || []);

        if (!Socket) return;
        Socket.emit("get games", User.name, (response) => {
            if (response?.error) {
                console.log("Error fetching ongoing games: ", response.error);
                return;
            }
            setOngoingGames(response || []);
        });
    }, [notify, Socket, User?.name, localRefresh]);

    // Resolve GetGameLocal promises into concrete game objects
    useEffect(() => {
        if (!localGameIDs || localGameIDs.length === 0) {
            setLocalGames([]);
            return;
        }

        let mounted = true;
        Promise.all(localGameIDs.map((id) => GetGameLocal(id)))
            .then((resolved) => {
                if (!mounted) return;
                setLocalGames(resolved.filter(Boolean));
            })
            .catch((err) => {
                console.error("Error resolving local games:", err);
            });

        return () => {
            mounted = false;
        };
    }, [localGameIDs]);

    const activeCount = (ongoingGames?.length || 0) + (localGames?.length || 0);

    return (
        <div className="ongoing-games">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-slate-900 dark:text-white">Ongoing Games</h3>
                <span className="text-sm text-slate-500">{activeCount} active</span>
            </div>

            {activeCount === 0 ? (
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

                    {localGames.map((game, index) => (
                        <li key={game?.id ?? `local-${index}`} className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow flex items-center justify-between">
                            <div className="flex-1">
                                <LocalGameComponent gameID={game.GameID} />
                            </div>
                            {game?.CurrentTurn === User.name && (
                                <span className="ml-4 inline-flex items-center px-2 py-1 text-xs font-medium bg-emerald-100 text-emerald-700 rounded">Your turn</span>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}