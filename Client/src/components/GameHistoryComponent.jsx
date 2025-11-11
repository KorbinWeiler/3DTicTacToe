import { useEffect } from "react";

export default function GameHistoryComponent() {
    let gameHistory = ["game1", "game2"]; // This isn't a state because the values are not expected to change dynamically in this component.

    useEffect(() => {
        // This would be replaced with an actual API call to fetch game history
        console.log("Fetching game history...");
    }, []);

    return (
        <div className="game-history">
            <h2>Game History</h2>
            {gameHistory.length > 0 ? 
                gameHistory.map((game, index) => (
                    <div key={index} className="game-history-item">
                        {game}
                    </div>
                )) :
            <p>No game history available.</p>
            }
        </div>
    );
}