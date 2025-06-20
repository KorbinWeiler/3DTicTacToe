import "../../App.css"
import Home from "../../assets/Home.svg"
import SidebarIcon from "./SidebarIcon"
import { gameContext } from "../../App"
import { useContext } from "react"


export default function Navbar(){
    const {ClientID} = useContext(gameContext)
    const [clientID, setClientID] = ClientID
    return(
        <div className="sidebar">
            <nav>
                <a href="/">Home</a>
                <a href="/invites">Game Invites</a>
                <a href="/">Games</a>
                <a href="/">Profile</a>
                {clientID ? <button>Sign Out</button> : <button>Login</button>}                
            </nav>
            <SidebarIcon destinationLink={"/Login"}/>
        </div>
    )
}