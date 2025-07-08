import { useContext, useState, useEffect } from "react"
import { gameContext } from "../App"
import PlayerComponent from "../components/PageComponents/PlayerComponent"
import Navbar from "../components/PageComponents/NavBar"

export default function HomePage(){

  const {Socket} = useContext(gameContext)
  const [users, setUsers] = useState([1,2,3,4,5,6,7,8,9])
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
          <div className="mainView">
            <div className="UserList widget">
              <p>Active User</p>
              <hr className="break"/>
              {users ? users.map((item, i)=>(<PlayerComponent key={i} PlayerID={item}/>)) : null}
              <button className="user-invite plus-sign"></button>
            </div>
            <div className="miscDetails">
              <div className="userDetails">
                <div className="ranking widget textWidget">
                  <p>?</p>
                </div>
                <div className="other-detail widget textWidget">
                  <p>Your Ranking value</p>
                </div>
              </div>
              <div className="ongoingGames widget textWidget">
                <p>Games that are your turn</p>
              </div>
              <div className="leaderBoard widget textWidget">
                <p>Leaderboard</p>
              </div>
            </div>
          </div>
      </div>
  )
}