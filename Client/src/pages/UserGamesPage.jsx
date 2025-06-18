import { gameContext } from "../App"
import { useContext } from "react"
import GameCard from "../components/PageComponents/GameCard";
import Navbar from "../components/PageComponents/NavBar";

export default function UserGamesPage(){

    const {ClientID, Lobbies} = useContext(gameContext);
    // const onGoingGames = Lobbies

    const onGoingGame = {
        1:{
            player1ID: 3,
            player2ID: 6,
            yourTurn: false
        },
        2:{
            player1ID: 6,
            player2ID: 3,
            yourTurn: false
        },
        3:{
            player1ID: 7,
            player2ID: 8,
            yourTurn: true
        },
        4:{
            player1ID: 7,
            player2ID: 8,
            yourTurn: true
        },
        5:{
            player1ID: 7,
            player2ID: 8,
            yourTurn: true
        },
        6:{
            player1ID: 7,
            player2ID: 8,
            yourTurn: true
        }
    }

    return(
        <>
            <Navbar></Navbar>
            <div className="box-format game-box">
                <div className="games-grid">
                    {Object.entries(onGoingGame).map(([gameID, gameData]) => (<GameCard key={gameID} game={gameData} gameID={gameID}/>))}
                </div>
            </div>
        </>
    )
}