import GameUI from "../components/BoardComponents/GameUI"
import Navbar from "../components/PageComponents/NavBar"
import Sidebar from "../components/PageComponents/Sidebar"
import "../App.css"

//<Navbar className="align-baseline"></Navbar>
export default function GamePage(){
    return(
        <div className="uiBox">
            <div className="sidebar navigation background-dark2 border border-thin">
            <Sidebar content={<Navbar/>}></Sidebar>
            </div>
            <div className="content-box">
                <div className="game border border-thin background-dark2">
                    <GameUI></GameUI>
                </div>
            </div>
            <div  className="sidebar play-stats background-dark2 border border-thin">
            <Sidebar></Sidebar>
            </div>
        </div>
    )
}