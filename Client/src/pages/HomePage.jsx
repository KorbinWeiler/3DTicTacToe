import { useContext, useState, useEffect } from "react"
import { gameContext } from "../App"
import PlayerComponent from "../components/PageComponents/PlayerComponent"
import Navbar from "../components/PageComponents/NavBar"

export default function HomePage(){

    const {Socket} = useContext(gameContext)
    const [users, setUsers] = useState([])
    useEffect(() => {
    // Listener
    const handleActivePlayers = (list) => {
      if (JSON.stringify(list) !== JSON.stringify(users)) {
        setUsers(list);
      }
    };

    Socket.on("active players", handleActivePlayers);

    // Emit only once when component mounts
    Socket.emit("request users");

    // Cleanup to avoid memory leaks or duplicate listeners
    return () => {
      Socket.off("active players", handleActivePlayers);
    };
  }, []);

    return(
        <div>
            <Navbar/>
            {users ? users.map((item, i)=>(<PlayerComponent key={i} PlayerID={item}/>)) : null}
        </div>
    )
}