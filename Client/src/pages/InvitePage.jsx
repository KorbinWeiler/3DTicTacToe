import Navbar from "../components/PageComponents/NavBar"
import InviteList from "../components/PageComponents/InviteList"
import InviteModal from "../components/PageComponents/InviteModal"
import { useState, useContext } from "react"
import { gameContext } from "../App"

export default function InvitePage({invites}){
    
    const {Socket, ClientID} = useContext(gameContext);
    const [clientID, setClientID] = ClientID;
    const socket = Socket

    let tempOpponentID = ""

    const [isOpen, setIsOpen] = useState(false)

    const temp = [1,2,3,4,5,6,7,8,9,10,11]

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
            <div id="box" className="box">
                <div className="card invite-box">
                    {/* <InviteList invites={invites}></InviteList> */}
                    <InviteList invites={temp}></InviteList>
                </div>
                <button className="button invite-button" type="button" onClick={()=>{setIsOpen(true)}}>Invite Player</button>
                <InviteModal open={[isOpen, setIsOpen]}></InviteModal>
            </div>
        </div>
    )
}