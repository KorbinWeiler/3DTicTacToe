import GameUI from "../components/BoardComponents/GameUI"
import Navbar from "../components/PageComponents/NavBar"
import Sidebar from "../components/PageComponents/Sidebar"
import "../App.css"

export default function GamePage(){
    return(
        <div className="uiBox">
            <Navbar className="align-baseline"></Navbar>
            <div className="game">
            <Sidebar></Sidebar>
            <Sidebar></Sidebar>
            <Sidebar></Sidebar>
            <Sidebar className="bottom"></Sidebar>
            </div>
        </div>
    )
}