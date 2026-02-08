import { useNavigate } from "react-router-dom";
import { UserContext } from "../Utils/UserContext";
import { useContext } from "react";

export default function GameComponent({Game}) {
    const navigate = useNavigate();
    const { User } = useContext(UserContext);
    return (
        <div className="game-component" onClick={() => navigate(`/Game/${Game.GameID}`)}>
            {Game.GameID + ": " + ( Game.PlayerX === User.name ? Game.PlayerO : Game.PlayerX) + " -" + (Game.CurrentTurn === User.name ? " Your Play" : " Opponent's Play")}
        </div>
    );
}