import { useState, useContext } from "react"
import "../../App.css"
import { UpdateContext } from "./GameUI";
import { gameContext } from "../../App";
import { PlayerStateContext } from "./GameUI";

export default function GameButton({x, y, z, Tile}){

    //do these all have to be useStates?
    const [style, setStyle] = useState("default");
    
    const {updates} = useContext(UpdateContext)
    const {playerValue, yourTurn} = useContext(PlayerStateContext) //is this still a thing?
    const {ClientID} = useContext(gameContext) 

    const [clientID, setClientID] = ClientID

    //would it be easier just to pass a player value?
    const [update, forceUpdate] = updates;
    //let turn = yourTurn


    const stylePresets = "default square"

    if(Tile.val != " " && style === "default"){
        Tile.val === "X" ? setStyle("light") : setStyle("dark");
    }

    function updateTile(){
        if((Tile.val === " " || style === "default") && yourTurn){
            playerValue ? setStyle("light") : setStyle("dark");
            playerValue ? Tile.val = "X" : Tile.val="O"; //maybe rework once playerValueIDs are being used

            playerValue ? forceUpdate(x.toString() + y.toString() + z.toString() + 'X' + '9') : forceUpdate(x.toString() + y.toString() + z.toString() + 'O' + '9')
        }       
    }

    return (
        <>
            <button className={stylePresets.concat(" " + style)} onClick={updateTile}></button>
        </>
    )
}