import Navbar from "../components/PageComponents/NavBar"
import InviteList from "../components/PageComponents/InviteList"
import { useContext } from "react"
import { gameContext } from "../App"

export default function InvitePage(){
    
    const {ClientID} = useContext(gameContext);
    const [clientID, setClientID] = ClientID;
    let tempID = ''

    return(
        <div className="uiBox">
            <Navbar></Navbar>
            <form>
                <input className="border" type="text" onChange={(e)=>{tempID = e.target.value}} placeholder="userID"></input>
                <button type="button" onClick={()=>{setClientID(tempID)}}>change</button>
            </form>
            <div className="invite-list space-invite border background-dark2">
                <InviteList></InviteList>
            </div>
        </div>
    )
}