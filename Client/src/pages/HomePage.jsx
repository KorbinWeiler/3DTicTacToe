import { useContext } from "react"
import { gameContext } from "../App"
import PlayerComponent from "../components/PageComponents/PlayerComponent"

export default function HomePage(){

    const {Socket} = useContext(gameContext)
    let users = []

    Socket.on("active players", (list)=>{
        users = list.map((item, i)=>{<PlayerComponent key={i} PlayerID={item}/>})
    })

    Socket.emit("request users")

    return(
        <div>
            {users ? users : null}
        </div>
    )
}