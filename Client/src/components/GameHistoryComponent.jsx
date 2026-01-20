import { useEffect, useState } from "react";

export default function GameHistoryComponent() {
    const [gameHistory] = useState(["game1", "game2"]);

    useEffect(() => {
        // This would be replaced with an actual API call to fetch game history
        console.log("Fetching game history...");
    }, []);

    return (
        <div className="game-history">
            <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-4">Game History</h3>

            {gameHistory.length === 0 ? (
                <div className="text-sm text-slate-500">No game history available.</div>
            ) : (
                <ul className="space-y-3">
                    {gameHistory.map((game, index) => (
                        <li key={index} className="bg-white dark:bg-slate-800 p-3 rounded shadow">{game}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}