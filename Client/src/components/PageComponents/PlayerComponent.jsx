import { useContext } from "react"
import { gameContext } from "../../App"
export default function PlayerComponent(PlayerID){
    const {ClientID} = useContext(gameContext)
    const [clientID, setClientID] = ClientID
    return(
        <div>
            <button className="main-page-invite-button plus-sign active-user" title="Invite Player" type="button" onClick={()=>{socket.emit("invite", PlayerID.PlayerID, clientID)}}></button>
            {PlayerID.PlayerID}
        </div>
    )
}