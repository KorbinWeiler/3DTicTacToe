import Navbar from "../components/PageComponents/NavBar"
import InviteList from "../components/PageComponents/InviteList"
import { useContext } from "react"
import { gameContext } from "../App"

export default function InvitePage({invites}){
    
    const {Socket, ClientID} = useContext(gameContext);
    const [clientID, setClientID] = ClientID;
    const socket = Socket
    let tempID = ''
    let opponent = ''
    console.log(invites)

    return(
        <div className="uiBox">
            <Navbar></Navbar>
            <form>
                <input className="border background-dark2" type="text" onChange={(e)=>{tempID = e.target.value}} placeholder="userID"></input>
                <button type="button" onClick={()=>{setClientID(tempID)}}>change</button>
            </form>

            <form>
                <input className="border background-dark2" type="text" onChange={(e)=>{opponent = e.target.value}} placeholder="OpponentID"></input>
                <button type="button" onClick={()=>{socket.emit("invite", opponent, clientID)}}>Send Invite</button>
            </form>
            <div className="invite-list space-invite border background-dark2">
                <InviteList invites={invites}></InviteList>
            </div>
        </div>
    )
}