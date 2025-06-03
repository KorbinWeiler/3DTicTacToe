import GameUI from "../components/BoardComponents/GameUI"
import Navbar from "../components/PageComponents/NavBar"
import Sidebar from "../components/PageComponents/Sidebar"
//import GameUI from "../components/BoardComponents/GameUI"
import GameBoard from "../components/BoardComponents/GameBoard"
import "../App.css"

export default function GamePage(){
    return(
        <div className="uiBox">
            <Navbar className="align-baseline"></Navbar>
            <div className="game">
                <GameUI></GameUI>
            </div>
        </div>
    )
}