import Board from "./Board"
import "../../App.css"
import { useState, createContext, useEffect } from "react"

export const playerContext = createContext(null)

export default function GameBoard({BackendGameBoard}){
    const [player, setPlayer] = useState(true); //move this to app.jsx in the player details
    const tempBoards = BackendGameBoard.boards

    //Could be created with a for loop
    return(
        <>
        <playerContext.Provider value={{players: [player, setPlayer]}}>
            <Board z={0} BackendBoard={tempBoards[0].board}/>
            <Board z={1} BackendBoard={tempBoards[1].board}/>
            <Board z={2} BackendBoard={tempBoards[2].board}/>
            <Board z={3} BackendBoard={tempBoards[3].board}/>
        </playerContext.Provider>
        </>
    )
}