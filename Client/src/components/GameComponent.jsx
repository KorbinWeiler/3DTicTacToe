import { useNavigate } from "react-router-dom";

export default function GameComponent({Game}) {
    const navigate = useNavigate();
    return (
        <div className="game-component" onClick={() => navigate(`/Game/${Game.ID}`)}>
            {Game.ID + ": " + Game.Opponent + " -" + (Game.yourTurn ? " Your Play" : " Opponent's Play")}
        </div>
    );
}