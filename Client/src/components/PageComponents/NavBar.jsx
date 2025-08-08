import "../../App.css"
import Home from "../../assets/Home.svg"
import SidebarIcon from "./SidebarIcon"
import { gameContext } from "../../App"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"

export default function Navbar(){
    const {ClientID} = useContext(gameContext)
    const [clientID, setClientID] = ClientID
    const navigate = useNavigate

    function SignOut(){
        navigate("/Login")
    }
    return(
        <div className="sidebar">
            <nav>
                <a href="/">Home</a>
                <a href="/invites">Game Invites</a>
                <a href="/Games">Games</a>
                <a href="/">Profile</a>
                {/* make it so clicking login send the authenitcation message through the socket. Actually make it go to the login screen but this works for now */}
                {clientID ? 
                    <button className="button nav-login-button" onClick={()=>{SignOut}}>Sign Out</button> : 
                    <button className="button nav-login-button" onClick={()=>{navigate("/Login")}}>Login</button>
                }     
            </nav>
            <SidebarIcon destinationLink={"/Login"}/>
        </div>
    )
}