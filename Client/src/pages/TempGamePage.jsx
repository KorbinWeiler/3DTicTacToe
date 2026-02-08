import GameUI from "../components/BoardComponents/GameUI"
import { useState, useContext } from "react"
import { gameContext } from "../App";
import "../App.css"

export default function TempGamePage(){

    const {Lobbies, ClientID} = useContext(gameContext)
    const [clientID, setClientID] = ClientID
    const currentLobbies = Lobbies;

    const lobbyID = 9

    function fuckall(){
        console.log("idk man")
    }

    return (
        <div className="grid grid-cols-2">
            <div className=" bg-yellow-200 rounded align-self-middle m-2 justify-items-start h-[10%]">
                <form className="m-2" onSubmit={fuckall}>
                    <label>userID</label>
                    <input className="border rounded" type="text" placeholder="UserId"></input>
                    <button className="text-blackck" type="submit" text="Set UserID"></button>
                </form>
                <form className="m-2" onSubmit={fuckall}>
                    <label>OpponentID</label>
                    <input className="border rounded" type="text" placeholder="UserId"></input>
                    <button className="text-black" type="submit" text="Send Invite"></button>
                </form>
            </div>
            <div className="w-[70%]">
                <GameUI lobby={currentLobbies[lobbyID]}/>
            </div>
        </div>
    )
}