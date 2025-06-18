export default function GameCard({game, gameID}){
    return(
        <div className="card game" onClick={()=>{console.log(gameID)}}>
            <div>Player1: {game.player1ID}</div>
            <div>Player2: {game.player2ID}</div>
            {game.yourTurn ? <div>Your Turn</div> : <div>Opponents Turn</div>}
        </div>
    )
}