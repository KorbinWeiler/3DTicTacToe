import Board from "./Board"
import { useState, createContext, useEffect } from "react"

export const UpdateContext = createContext(null)

export default function GameBoard({BackendGameBoard}){
    const [update, forceUpdate] = useState("")
    const [player, setPlayer] = useState(true);

    return(
        <>
            <UpdateContext.Provider value={{updates: [update, forceUpdate], playerValues: [player, setPlayer]}}>
            <Board z={0} BackendBoard={BackendGameBoard[0].board}/>
            <Board z={1} BackendBoard={BackendGameBoard[1].board}/>
            <Board z={2} BackendBoard={BackendGameBoard[2].board}/>
            <Board z={3} BackendBoard={BackendGameBoard[3].board}/>
            </UpdateContext.Provider>
        </>
    )
}