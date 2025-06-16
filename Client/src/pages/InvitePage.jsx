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

    return(
        <div>
            <Navbar></Navbar>
            {/* <form>
                <input className="border background-dark2" type="text" onChange={(e)=>{tempID = e.target.value}} placeholder="userID"></input>
                <button type="button" onClick={()=>{setClientID(tempID)}}>change</button>
            </form>

            <form>
                <input className="border background-dark2" type="text" onChange={(e)=>{opponent = e.target.value}} placeholder="OpponentID"></input>
                <button type="button" onClick={()=>{socket.emit("invite", opponent, clientID)}}>Send Invite</button>
            </form> */}
            <div className="box">
                <div className="invite-box">
                    <InviteList invites={invites}></InviteList>
                </div>
                <button className="button invite-button" type="button">Send Invite</button>
            </div>
        </div>
    )
}