import { gameContext } from "../../App"
import { useContext } from "react"

export default function GameCard({game, gameID}){

    const {CurrentLobby} = useContext(gameContext)
    const [currentLobby, setCurrentLobby] = CurrentLobby

    return(
        <div className="card game" onClick={()=>{setCurrentLobby(gameID)}}>
            <div>Player1: {game.player1ID}</div>
            <div>Player2: {game.player2ID}</div>
            {game.yourTurn ? <div>Your Turn</div> : <div>Opponents Turn</div>}
        </div>
    )
}