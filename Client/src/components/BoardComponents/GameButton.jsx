import { useState, useContext } from "react"
import "../../App.css"
import { UpdateContext } from "./GameUI";
import { playerContext } from "./GameBoard";
import { gameContext } from "../../App";

export default function GameButton({x, y, z, Tile}){

    //do these all have to be useStates?
    const [style, setStyle] = useState("default");
    
    const {updates} = useContext(UpdateContext)
    const {players} = useContext(playerContext)
    const {ClientID} = useContext(gameContext) 

    const [clientID, setClientID] = ClientID

    //would it be easier just to pass a player value?
    const [update, forceUpdate] = updates;
    const [player, setPlayer] = players


    const stylePresets = "default square"

    function updateTile(){
        if(Tile.val === " " || style === "default"){
            player ? setStyle("light") : setStyle("dark");
            player ? Tile.val = "X" : Tile.val="O"; //maybe rework once playerIDs are being used
            setPlayer(!player); //remove once multiplayer is implemented

            player ? forceUpdate(x.toString() + y.toString() + z.toString() + 'X' + '1') : forceUpdate(x.toString() + y.toString() + z.toString() + 'O' + '1')
        }       
    }

    return (
        <>
            <button className={stylePresets.concat(" " + style)} onClick={updateTile}></button>
        </>
    )
}