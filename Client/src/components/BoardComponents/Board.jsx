import GameButton from "./GameButton"
export default function Board({z, BackendBoard}){
    //this one can definitely be a for loop
    //and get the that tailwind out of there
    const boardButtons= [];

    for(let i = 0; i < 4; ++i){
        for(let j = 0; j < 4; ++j){
            //boardButtons += <GameButton x={j} y={i} z={z} Tile={BackendBoard[j][i]}/>
        }
    }

    return (
        <>
            <div className="board-grid board">

                {/* {boardButtons} */}

                <GameButton x={0} y={0} z={z} Tile={BackendBoard[0][0]}/>
                <GameButton x={1} y={0} z={z} Tile={BackendBoard[1][0]}/>
                <GameButton x={2} y={0} z={z} Tile={BackendBoard[2][0]}/>
                <GameButton x={3} y={0} z={z} Tile={BackendBoard[3][0]}/>

                <GameButton x={0} y={1} z={z} Tile={BackendBoard[0][1]}/>
                <GameButton x={1} y={1} z={z} Tile={BackendBoard[1][1]}/>
                <GameButton x={2} y={1} z={z} Tile={BackendBoard[2][1]}/>
                <GameButton x={3} y={1} z={z} Tile={BackendBoard[3][1]}/>

                <GameButton x={0} y={2} z={z} Tile={BackendBoard[0][2]}/>
                <GameButton x={1} y={2} z={z} Tile={BackendBoard[1][2]}/>
                <GameButton x={2} y={2} z={z} Tile={BackendBoard[2][2]}/>
                <GameButton x={3} y={2} z={z} Tile={BackendBoard[3][2]}/>


                <GameButton x={0} y={3} z={z} Tile={BackendBoard[0][3]}/>
                <GameButton x={1} y={3} z={z} Tile={BackendBoard[1][3]}/>
                <GameButton x={2} y={3} z={z} Tile={BackendBoard[2][3]}/>
                <GameButton x={3} y={3} z={z} Tile={BackendBoard[3][3]}/>
                
            </div>
        </>
    )
}