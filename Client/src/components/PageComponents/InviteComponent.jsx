import { useContext } from "react"
import { gameContext } from "../../App"

export default function InviteComponent({invite}){
    
    const {ClientID, Socket} = useContext(gameContext)
    const socket = Socket
    const [clientID, setClientID] = ClientID

    function accept(){
        socket.emit("accept invitation", clientID, invite)
        console.log(clientID + " " + invite)
    }
    
    return(
        <div className="space-invite">
            {invite}
            <button type="button" onClick={accept}>Accept</button>
            <button type="button" onClick={()=>{socket.emit("decline invitation", clientID, invite)}}>Decline</button>
        </div>
    )
}