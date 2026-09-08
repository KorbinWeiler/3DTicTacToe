import { useParams } from "react-router-dom";
import GameBoard from "../components/Game-Board-Components/GameBoard";
import Navbar from "../components/Navbar";

export default function PlayGamePage() {
    const params = useParams();
    const gameID = params.gameID;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col">
            <Navbar />

            <main className="w-full flex-1">
                <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Play Game</h1>
                        <p className="text-sm text-slate-500">Game ID: {gameID || 'N/A'}</p>
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
                        <GameBoard gameID={gameID} />
                    </div>
                </div>
            </main>
        </div>
    );
}