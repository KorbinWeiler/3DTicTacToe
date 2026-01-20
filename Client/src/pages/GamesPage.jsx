import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import OngoingGamesComponent from "../Components/OngoingGamesComponent";
import GameHistoryComponent from "../Components/GameHistoryComponent";

export default function GamesPage() {

    const [ShowOngoingGames, setShowOngoingGames] = useState(true);

    useEffect(() => {
        // This would be replaced with an actual API call to fetch games
        console.log("Fetching games list...");
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col">
            <Navbar />

            <main className="w-full flex-1">
                <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Games</h1>
                            <p className="text-sm text-slate-500">Play current matches or review game history</p>
                        </div>

                        <div className="inline-flex rounded-md bg-slate-100 dark:bg-slate-800 p-1">
                            <button
                                onClick={() => setShowOngoingGames(true)}
                                className={`px-4 py-2 text-sm rounded-md focus:outline-none ${ShowOngoingGames ? 'bg-emerald-600 text-white' : 'text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700'}`}>
                                Ongoing Games
                            </button>
                            <button
                                onClick={() => setShowOngoingGames(false)}
                                className={`px-4 py-2 text-sm rounded-md focus:outline-none ${!ShowOngoingGames ? 'bg-emerald-600 text-white' : 'text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700'}`}>
                                History
                            </button>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-4 min-h-75">
                        {ShowOngoingGames ? (
                            <OngoingGamesComponent />
                        ) : (
                            <GameHistoryComponent />
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}