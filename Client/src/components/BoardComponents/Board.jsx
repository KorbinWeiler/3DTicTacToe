import GameButton from "./GameButton"
export default function Board({z, BackendBoard}){
    return (
        <>
            <div className="grid grid-cols-4 m-5">

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