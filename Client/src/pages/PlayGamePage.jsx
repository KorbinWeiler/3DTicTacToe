import { useSearchParams } from "react-router-dom";
import GameBoard from "../Components/Game-Board-Components/GameBoard";
import Navbar from "../components/Navbar";

export default function PlayGamePage() {
    const params = new URLSearchParams(window.location.search);
    const gameID = params.get("gameID");
    return (
        <div className="play-game-page">
            <Navbar />
            <h1>Play Game</h1>
            <GameBoard gameID={gameID}/>
        </div>
    );
}