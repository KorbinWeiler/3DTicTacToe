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
        <div>
            <Navbar />
            <h1>Games Page</h1>

            {ShowOngoingGames ? (
                <>
                    <button className="state-button selected" onClick={() => setShowOngoingGames(true)}>Ongoing Games</button>
                    <button className="state-button" onClick={() => setShowOngoingGames(false)}>History</button>
                </>
            ) : (
                <>
                    <button className="state-button" onClick={() => setShowOngoingGames(true)}>Ongoing Games</button>
                    <button className="state-button selected" onClick={() => setShowOngoingGames(false)}>History</button>
                </>
            )}
            {ShowOngoingGames ?
                <OngoingGamesComponent /> :
                <GameHistoryComponent />
            }
        </div>
    );
}