import { useEffect } from "react";
import GameComponent from "./GameComponent";

export default function OngoingGamesComponent() {
    let ongoingGames = ["3", "4"]; // This is not a state because the values are not expected to change dynamically in this component.

    useEffect(() => {
        // This would be replaced with an actual API call to fetch ongoing games
        console.log("Fetching ongoing games...");
    }, []);

    return (
        <div className="ongoing-games">
            <h2>Ongoing Games</h2>
            {ongoingGames.length > 0 ? 
                ongoingGames.map((game, index) => (
                    <div key={index} className="ongoing-game-item">
                        <GameComponent Game={game} yourTurn={true}/>
                    </div>
                )) :
            <p>No ongoing games at the moment.</p>
        }
        </div>
    );
}