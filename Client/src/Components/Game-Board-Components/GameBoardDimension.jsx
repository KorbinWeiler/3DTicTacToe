import GameButton from "./GameButton";
import "../../Styles/ComponentStyles.css";

export default function GameBoardDimension({z, boardDimension}) {
    console.log(`Rendering GameBoardDimension for z=${z}`, boardDimension);
    return (
        <div className="game-board-dimension">
            <div className="dimension-label">
            <GameButton x={0} y={0} z={z} value={boardDimension[0][0].value}/>
            <GameButton x={1} y={0} z={z} value={boardDimension[1][0].value}/>
            <GameButton x={2} y={0} z={z} value={boardDimension[2][0].value}/>
            <GameButton x={3} y={0} z={z} value={boardDimension[3][0].value}/>
            </div>
            <div className="dimension-label">
            <GameButton x={0} y={1} z={z} value={boardDimension[0][1].value}/>
            <GameButton x={1} y={1} z={z} value={boardDimension[1][1].value}/>
            <GameButton x={2} y={1} z={z} value={boardDimension[2][1].value}/>
            <GameButton x={3} y={1} z={z} value={boardDimension[3][1].value}/>
            </div>
            <div className="dimension-label">
            <GameButton x={0} y={2} z={z} value={boardDimension[0][2].value}/>
            <GameButton x={1} y={2} z={z} value={boardDimension[1][2].value}/>
            <GameButton x={2} y={2} z={z} value={boardDimension[2][2].value}/>
            <GameButton x={3} y={2} z={z} value={boardDimension[3][2].value}/>
            </div>
            <div className="dimension-label">
            <GameButton x={0} y={3} z={z} value={boardDimension[0][3].value}/>
            <GameButton x={1} y={3} z={z} value={boardDimension[1][3].value}/>
            <GameButton x={2} y={3} z={z} value={boardDimension[2][3].value}/>
            <GameButton x={3} y={3} z={z} value={boardDimension[3][3].value}/>
            </div>
        </div>
    );
}