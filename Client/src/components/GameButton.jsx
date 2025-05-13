import "../App.css"
import { useState } from "react"

export default function GameButton(){
    const [style, setStyle] = useState("default")
    const [player, setPlayer] = useState(2)
    const [text, setText] = useState("")

    const stylePresets = "default m-1 w-10 h-10"

    function changeColor(){
        player === 1 ? setStyle("light") : setStyle("dark")
        player === 1 ? setText("X") : setText("O")
        
    }

    return (
        <>
            <button className={stylePresets.concat(" " + style)} onClick={changeColor}>{text}</button>
        </>
    )
}