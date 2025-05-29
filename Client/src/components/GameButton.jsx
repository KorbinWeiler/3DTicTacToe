import "../App.css"
import { useState, useEffect, useContext } from "react"
import { UpdateContext } from "../App";
import { playerContext } from "./GameBoard";

export default function GameButton({x, y, z, Tile}){
    const [style, setStyle] = useState("light");
    const [text, setText] = useState("")

    const {updates} = useContext(UpdateContext)
    const {players} = useContext(playerContext)
    const [update, forceUpdate] = updates;
    const [player, setPlayer] = players

    const stylePresets = "default m-1 w-10 h-10"

    function updateTile(){
        if(Tile.val === " " || style === "default"){
            player ? setStyle("light") : setStyle("dark");
            player ? Tile.val = "X" : Tile.val="O";
            setPlayer(!player);
            const tileName = x.toString() + y.toString() + z.toString()

            player ? forceUpdate(x.toString() + y.toString() + z.toString() + 'X' + '1') : forceUpdate(x.toString() + y.toString() + z.toString() + 'O' + '1')
        }       
    }
    /*
    useEffect(()=>{
        console.log("hit")
    }, [update])
    */

    return (
        <>
            <button className={stylePresets.concat(" " + style)} onClick={updateTile}>{Tile.val}</button>
        </>
    )
}