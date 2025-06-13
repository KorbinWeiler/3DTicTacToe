import { gameContext } from "../App";
import { useState, useContext } from "react"

import GameUI from "../components/BoardComponents/GameUI"
import Navbar from "../components/PageComponents/NavBar"
import Sidebar from "../components/PageComponents/Sidebar"
import "../App.css"


export default function GamePage({socket}){

    //These should come from app.jsx
    //IDK if either of these points are necessary in this page (Maybe for displaying details)
    const [opponentID, setOpponentID] = useState('');

    const {Lobbies, ClientID} = useContext(gameContext)
    const [clientID, setClientID] = ClientID
    const currentLobbies = Lobbies;

    const [lobbyID, setLobbyID] = useState("9")

    //temporary states for testing
    const [tempPlayerID, setTempPlayerID] = useState('');
    const [tempOpponentID, setTempOpponentID] = useState('');

    //These Functions are also temporary
    function newPlayerID(){
        setClientID(tempPlayerID);
        document.getElementById('userid').value = ''
    }

    function newOpponentID(){
        setOpponentID(tempOpponentID)
        document.getElementById('opponentid').value = ''
    }

    //make a create lobby button
//     return (
//         <div className="grid grid-cols-2">
//             <div className="align-middle m-2  justify-items-start">
//                 <form className="m-2">
//                     <label>userID</label>
//                     <input className="border rounded" type="text" placeholder="UserId" id="userid" onChange={(e)=>{setTempPlayerID(e.target.value)}}></input>
//                     <button className="text-blackck" type="button" text="Set UserID" id="opponentid" onClick={newPlayerID}></button>
//                 </form>
//                 <form className="m-2">
//                     <label>OpponentID</label>
//                     <input className="border rounded" type="text" placeholder="UserId" onChange={(e)=>{setTempOpponentID(e.target.value)}}></input>
//                     <button className="text-black" type="button" text="Send Invite" onClick={newOpponentID}></button>
//                 </form>
//             </div>
//             <div>
//                 <GameUI lobby={currentLobbies[lobbyID]}/>
//             </div>
//         </div>
//     )
// }

    return(
        <div className="uiBox">
            <div className="sidebar navigation background-dark2 border border-thin">
            <Sidebar content={<Navbar/>}></Sidebar>
            </div>
            <div className="content-box">
                <div className="game border border-thin background-dark2">
                    <GameUI lobby={currentLobbies[lobbyID]}/>
                </div>
            </div>
            <div  className="sidebar play-stats background-dark2 border border-thin">
            <Sidebar></Sidebar>
            </div>
        </div>
    )
}

            