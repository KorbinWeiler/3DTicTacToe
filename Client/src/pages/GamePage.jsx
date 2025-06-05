import GameUI from "../components/GameUI"

import { useState } from "react"

export default function GamePage(){

    const [playerID, setPlayerID] = useState('');
    const [opponentID, setOpponentID] = useState('');

    //temporary states for testing
    const [tempPlayerID, setTempPlayerID] = useState('');
    const [tempOpponentID, setTempOpponentID] = useState('');

    function fuckall(){
        console.log("idk man")
    }

    function newPlayerID(){
        setPlayerID(tempPlayerID);
        document.getElementById('userid').value = ''
    }

    function newOpponentID(){
        setOpponentID(tempOpponentID)
        document.getElementById('opponentid').value = ''
    }

    return (
        <div className="grid grid-cols-2">
            <div className="align-middle m-2  justify-items-start">
                <form className="m-2">
                    <label>userID</label>
                    <input className="border rounded" type="text" placeholder="UserId" id="userid" onChange={(e)=>{setTempPlayerID(e.target.value)}}></input>
                    <button className="text-blackck" type="button" text="Set UserID" id="opponentid" onClick={newPlayerID}></button>
                </form>
                <form className="m-2">
                    <label>OpponentID</label>
                    <input className="border rounded" type="text" placeholder="UserId" onChange={(e)=>{setTempOpponentID(e.target.value)}}></input>
                    <button className="text-black" type="button" text="Send Invite" onClick={newOpponentID}></button>
                </form>
            </div>
            <div>
                <GameUI playerID={playerID} opponentID={opponentID}/>
            </div>
        </div>
    )
}