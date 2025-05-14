import "../App.css"
import { useState, useEffect, useContext } from "react"
import { UpdateContext } from "./GameBoard";

export default function GameButton({x, y, z, Tile}){
    const [style, setStyle] = useState("light");
    const [text, setText] = useState("")

    const {updates, playerValues} = useContext(UpdateContext)
    const [update, forceUpdate] = updates;
    const [player, setPlayer] = playerValues

    const stylePresets = "default m-1 w-10 h-10"

    function changeColor(){
        player ? setStyle("light") : setStyle("dark");
        player ? setText("X") : setText("O");
        setPlayer(!player);
        console.log(x + " " + y + " " + z);
        console.log(Tile);
        Tile.val = 'Y';
        console.log(Tile.val);
    }

    function updateTile(){
        if(Tile.val === ""){
            player ? setStyle("light") : setStyle("dark");
            player ? Tile.val = "X" : Tile.val="O";
            setPlayer(!player);
            forceUpdate(Date.now)
        }
        
    }

    useEffect(()=>{
        
    }, [update])

    return (
        <>
            <button className={stylePresets.concat(" " + style)} onClick={updateTile}>{Tile.val}</button>
        </>
    )
}