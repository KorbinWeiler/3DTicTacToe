import GameBoard from "../Components/Game-Board-Components/GameBoard";
import Navbar from "../components/Navbar";

export default function PlayGamePage() {
    return (
        <div className="play-game-page">
            <Navbar />
            <h1>Play Game</h1>
            <GameBoard gameID={"1"}/>
        </div>
    );
}