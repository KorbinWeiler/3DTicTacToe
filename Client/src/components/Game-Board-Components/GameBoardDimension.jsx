import GameButton from "./GameButton";

export default function GameBoardDimension({ z, boardDimension }) {
    // boardDimension expected as [x][y]
    if (!boardDimension) return null;

    // boardDimension is expected in row-major order: [y][x]
    const height = boardDimension.length;
    const width = (boardDimension[0] || []).length;

    const rows = Array.from({ length: height }, (_, y) => y);
    const cols = Array.from({ length: width }, (_, x) => x);

    return (
        <div className="game-board-dimension">
            <div className="grid grid-rows-4 gap-2">
                {rows.map((y) => (
                    <div key={y} className="flex gap-2 justify-center">
                        {cols.map((x) => (
                            <GameButton key={`${x}-${y}-${z}`} x={x} y={y} z={z} value={boardDimension[y]?.[x] ?? '-'} />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}