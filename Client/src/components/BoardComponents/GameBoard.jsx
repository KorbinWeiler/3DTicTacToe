import Board from "./Board"
import "../../App.css"

export default function GameBoard({BackendGameBoard}){
    const tempBoards = BackendGameBoard.boards

    //Could be created with a for loop
    return(
        <>

            <Board z={0} BackendBoard={tempBoards[0].board}/>
            <Board z={1} BackendBoard={tempBoards[1].board}/>
            <Board z={2} BackendBoard={tempBoards[2].board}/>
            <Board z={3} BackendBoard={tempBoards[3].board}/>
        </>
    )
}