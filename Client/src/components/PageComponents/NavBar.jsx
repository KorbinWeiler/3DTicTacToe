import "../../App.css"
import Home from "../../assets/Home.svg"
import SidebarIcon from "./SidebarIcon"

export default function Navbar(){
    return(
        <div className="sidebar">
            <nav>
                <a href="/">Home</a>
                <a href="/invites">Game Invites</a>
                <a href="/">Games</a>
                <a href="/">Profile</a>
                
            </nav>
            <SidebarIcon destinationLink={"/Login"}/>
        </div>
    )
}