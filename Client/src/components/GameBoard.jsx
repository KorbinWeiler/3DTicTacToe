import Board from "./Board"
import { useState, createContext, useEffect } from "react"

export const playerContext = createContext(null)

export default function GameBoard({BackendGameBoard}){
    const [player, setPlayer] = useState(true);
    const tempBoards = BackendGameBoard.boards

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