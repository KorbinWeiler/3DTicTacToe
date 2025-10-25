import { useEffect } from "react";
import GameComponent from "./GameComponent";
import { useNavigate } from "react-router-dom";


export default function OngoingGamesComponent() {
    const navigate = useNavigate();
    let ongoingGames = [{GameID: "3"}, {GameID: "4"}]; // This is not a state because the values are not expected to change dynamically in this component.
    useEffect(() => {
        // This would be replaced with an actual API call to fetch ongoing games
        console.log("Fetching ongoing games...");
    }, []);

    return (
        <div className="ongoing-games">
            <h2>Ongoing Games</h2>
            {ongoingGames.length > 0 ? 
                ongoingGames.map((game, index) => (
                    <div key={index} className="ongoing-game-item" onClick={()=>{navigate(`/Game/${game.GameID}`)}}>
                        <GameComponent Game={game.GameID} yourTurn={true}/>
                    </div>
                )) :
            <p>No ongoing games at the moment.</p>
        }
        </div>
    );
}