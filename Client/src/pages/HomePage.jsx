import { useContext } from "react"
import { gameContext } from "../App"
import PlayerComponent from "../components/PageComponents/PlayerComponent"
import Navbar from "../components/PageComponents/NavBar"

export default function HomePage(){

    const {Socket} = useContext(gameContext)
    let users = [1,2,3,4,5]
    const onlineUsers = []
    Socket.on("active players", (list)=>{
        const onlineUsers = list.map((item, i)=>{<PlayerComponent key={i} PlayerID={item}/>})
    })

    Socket.emit("request users")

    return(
        <div>
            <Navbar/>
            {users ? users.map((item, i)=>(<PlayerComponent key={i} PlayerID={item}/>)) : null}
        </div>
    )
}