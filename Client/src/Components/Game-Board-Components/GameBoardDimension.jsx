import GameButton from "./GameButton";

export default function GameBoardDimension({z, boardDimension}) {

    return (
        <div className="game-board">
            <GameButton x={0} y={0} z={z} value={boardDimension[0][0][z].value}/>
            <GameButton x={1} y={0} z={z} value={boardDimension[1][0][z].value}/>
            <GameButton x={2} y={0} z={z} value={boardDimension[2][0][z].value}/>
            <GameButton x={3} y={0} z={z} value={boardDimension[3][0][z].value}/>

            <GameButton x={0} y={1} z={z} value={boardDimension[0][1][z].value}/>
            <GameButton x={1} y={1} z={z} value={boardDimension[1][1][z].value}/>
            <GameButton x={2} y={1} z={z} value={boardDimension[2][1][z].value}/>
            <GameButton x={3} y={1} z={z} value={boardDimension[3][1][z].value}/>

            <GameButton x={0} y={2} z={z} value={boardDimension[0][2][z].value}/>
            <GameButton x={1} y={2} z={z} value={boardDimension[1][2][z].value}/>
            <GameButton x={2} y={2} z={z} value={boardDimension[2][2][z].value}/>
            <GameButton x={3} y={2} z={z} value={boardDimension[3][2][z].value}/>

            <GameButton x={0} y={3} z={z} value={boardDimension[0][3][z].value}/>
            <GameButton x={1} y={3} z={z} value={boardDimension[1][3][z].value}/>
            <GameButton x={2} y={3} z={z} value={boardDimension[2][3][z].value}/>
            <GameButton x={3} y={3} z={z} value={boardDimension[3][3][z].value}/>
        </div>
    );
}