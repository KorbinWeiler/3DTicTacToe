import { useEffect, useContext, useState } from "react";
import GameComponent from "./GameComponent";
import { UserContext } from "../Utils/UserContext";

export default function OngoingGamesComponent() {
    const [ongoingGames, setOngoingGames] = useState([]);
    const { User, Socket, Refresh } = useContext(UserContext);
    const [socket, setSocket] = Socket;
    const [notify, setNotify] = Refresh;
    
    useEffect(() => {
        if (!socket) {
            return;
        }
        socket?.emit("get games", User.name, (response) => {
            if (response.error) {
                console.log("Error fetching ongoing games: ", response.error);
                return;
            }
            console.log("Ongoing games fetched: ", response);
            setOngoingGames(response);
        });
    }, [notify, socket]);

    return (
        <div className="ongoing-games">
            <h2>Ongoing Games</h2>
            {ongoingGames.length > 0 ? 
                ongoingGames.map((game, index) => (
                    <div key={index} className="ongoing-game-item">
                        <GameComponent Game={game} yourTurn={game.CurrentTurn === User.name}/>
                    </div>
                )) :
            <p>No ongoing games at the moment.</p>
        }
        </div>
    );
}