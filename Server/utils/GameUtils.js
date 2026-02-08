function InitializeBlankBoard(){
    const board = [];
    for (let z = 0; z < 4; z++) {
        const layer = [];
        for (let y = 0; y < 4; y++) {
            const row = [];
            for (let x = 0; x < 4; x++) {
                row.push('-');
            }
            layer.push(row);
        }
        board.push(layer);
    }
    return board;
}

function TraverseBoard(x, y, z, xScale, yScale, zScale, board, char) {
    let count = 0;
    //Traverse down
    for (let i = 0; i < 4; i++) {
        const currX = x + i * xScale;
        const currY = y + i * yScale;
        const currZ = z + i * zScale;
        if(currX > 3 || currY > 3 || currZ > 3 || currX < 0 || currY < 0 || currZ < 0){
            break;
        }

        if (board[currZ][currY][currX] === char) {
            count++;
        }
        else{
            break;
        }
    }
    //Traverse up
    for (let i = 1; i < 4; i++) {
        const currX = x - i * xScale;
        const currY = y - i * yScale;
        const currZ = z - i * zScale;
        if(currX < 0 || currY < 0 || currZ < 0 || currX > 3 || currY > 3 || currZ > 3){
            break;
        }

        if (board[currZ][currY][currX] === char) {
            count++;
        }
        else{
            break;
        }
    }
    return count === 4;
}

function CheckWin(x, y, z, board, char) {
    //Check rows, columns, and pillars
    let win = false;
    win = win || !!TraverseBoard(x, y, z, 1, 0, 0, board, char); //X axis
    win = win || !!TraverseBoard(x, y, z, 0, 1, 0, board, char); //Y axis
    win = win || !!TraverseBoard(x, y, z, 0, 0, 1, board, char); //Z axis
    if (win) return true;
    //Check diagonals on each layer
    win = win || !!TraverseBoard(x, y, z, 1, 1, 0, board, char); //XY diagonal
    win = win || !!TraverseBoard(x, y, z, 1, -1, 0, board, char); //XY anti-diagonal
    if (win) return true;
    //Check vertical diagonals
    win = win || !!TraverseBoard(x, y, z, 1, 0, 1, board, char); //XZ diagonal
    win = win || !!TraverseBoard(x, y, z, 1, 0, -1, board, char); //XZ anti-diagonal
    win = win || !!TraverseBoard(x, y, z, 0, 1, 1, board, char); //YZ diagonal
    win = win || !!TraverseBoard(x, y, z, 0, 1, -1, board, char); //YZ anti-diagonal
    if (win) return true;
    //Check space diagonals
    win = win || !!TraverseBoard(x, y, z, 1, 1, 1, board, char); // main space diagonal
    win = win || !!TraverseBoard(x, y, z, 1, 1, -1, board, char); // space diagonal  
    win = win || !!TraverseBoard(x, y, z, 1, -1, 1, board, char); // space diagonal  
    win = win || !!TraverseBoard(x, y, z, -1, 1, 1, board, char); // space diagonal
    return !!win;
}   

module.exports = {
    InitializeBlankBoard,
    TraverseBoard,
    CheckWin
}