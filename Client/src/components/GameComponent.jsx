import { useNavigate } from "react-router-dom";

export default function GameComponent({Game, yourTurn}) {
    const navigate = useNavigate();
    return (
        <div className="game-component" onClick={() => navigate(`/Game/${Game}`)}>
            {Game}
            {yourTurn ? ": Your Play" : ": Opponent's Play"}
        </div>
    );
}