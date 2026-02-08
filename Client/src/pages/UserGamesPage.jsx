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
            yourTurn: true,
        },
        7:{
            player1ID: 7,
            player2ID: 8,
            yourTurn: true
        },
        8:{
            player1ID: 7,
            player2ID: 8,
            yourTurn: true
        },
        9:{
            player1ID: 7,
            player2ID: 8,
            yourTurn: true
        },
        10:{
            player1ID: 7,
            player2ID: 8,
            yourTurn: true
        },
        11:{
            player1ID: 7,
            player2ID: 8,
            yourTurn: true
        },
        12:{
            player1ID: 7,
            player2ID: 8,
            yourTurn: true
        },
        13:{
            player1ID: 7,
            player2ID: 8,
            yourTurn: true
        },
        14:{
            player1ID: 7,
            player2ID: 8,
            yourTurn: true
        },
        15:{
            player1ID: 7,
            player2ID: 8,
            yourTurn: true
        },
        16:{
            player1ID: 7,
            player2ID: 8,
            yourTurn: true
        },
        17:{
            player1ID: 7,
            player2ID: 8,
            yourTurn: true
        },
        18:{
            player1ID: 7,
            player2ID: 8,
            yourTurn: true
        },
        19:{
            player1ID: 7,
            player2ID: 8,
            yourTurn: true
        },
        20:{
            player1ID: 7,
            player2ID: 8,
            yourTurn: true
        },
        21:{
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