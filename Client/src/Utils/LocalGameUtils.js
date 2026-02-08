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
    let win = false;
    win = win || !!TraverseBoard(x, y, z, 1, 0, 0, board, char); //X axis
    win = win || !!TraverseBoard(x, y, z, 0, 1, 0, board, char); //Y axis
    win = win || !!TraverseBoard(x, y, z, 0, 0, 1, board, char); //Z axis
    if (win) return true;
    win = win || !!TraverseBoard(x, y, z, 1, 1, 0, board, char); //XY diagonal
    win = win || !!TraverseBoard(x, y, z, 1, -1, 0, board, char); //XY anti-diagonal
    if (win) return true;
    win = win || !!TraverseBoard(x, y, z, 1, 0, 1, board, char); //XZ diagonal
    win = win || !!TraverseBoard(x, y, z, 1, 0, -1, board, char); //XZ anti-diagonal
    win = win || !!TraverseBoard(x, y, z, 0, 1, 1, board, char); //YZ diagonal
    win = win || !!TraverseBoard(x, y, z, 0, 1, -1, board, char); //YZ anti-diagonal
    if (win) return true;
    win = win || !!TraverseBoard(x, y, z, 1, 1, 1, board, char); // main space diagonal
    win = win || !!TraverseBoard(x, y, z, 1, 1, -1, board, char); // space diagonal  
    win = win || !!TraverseBoard(x, y, z, 1, -1, 1, board, char); // space diagonal  
    win = win || !!TraverseBoard(x, y, z, -1, 1, 1, board, char); // space diagonal
    return !!win;
}

function CreateLocalGame(User){
    const localGames = JSON.parse(localStorage.getItem('localgames')) || [];
    let gameID = "localgame-" + (Math.floor(Math.random() * 1000000000)).toString()
    while (localGames.includes(gameID)){
        gameID = "localgame-" + (Math.floor(Math.random() * 1000000000)).toString()
    }

    const NewGame = {
        BoardState: InitializeBlankBoard(),
        GameID: gameID,
        PlayerX: User.name,
        PlayerO: "Computer",
        CurrentTurn: User.name,
        Winner: null,
    }
    console.log("New local game data: ", NewGame);
    localStorage.setItem(gameID, JSON.stringify(NewGame));
    if (!localGames.includes(gameID)) {
        localGames.push(gameID);
        localStorage.setItem('localgames', JSON.stringify(localGames));
    }
}

function GetGameLocal(gameID){
    return new Promise((resolve) => {
        const gameData = localStorage.getItem(gameID);
        if (!gameData) return resolve(null);
        try {
            resolve(JSON.parse(gameData));
        } catch (e) {
            console.error('Failed to parse local game data', e);
            resolve(null);
        }
    });
}

function GetGamesLocal(){
    const localGames = JSON.parse(localStorage.getItem('localgames')) || [];
    console.log("Fetching local games: ", localGames);
    return localGames
}

function SaveLocalGame(gameData){
    if (!gameData || !gameData.GameID) {
        console.error('SaveLocalGame: invalid gameData or missing GameID', gameData);
        return false;
    }
    try {
        localStorage.setItem(gameData.GameID, JSON.stringify(gameData));
        return true;
    } catch (e) {
        console.error('SaveLocalGame: failed to persist game', e);
        return false;
    }
}

function ComputerMove(gameData){
    if (!gameData) return null;
    if (gameData.Winner) return null;

    try {
        const emptyCells = [];
        for (let z = 0; z < 4; z++) {
            for (let y = 0; y < 4; y++) {
                for (let x = 0; x < 4; x++) {
                    if (gameData.BoardState && gameData.BoardState[z] && gameData.BoardState[z][y] && gameData.BoardState[z][y][x] === '-') {
                        emptyCells.push({ x, y, z });
                    }
                }
            }
        }
        if (emptyCells.length === 0) return gameData;

        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const move = emptyCells[randomIndex];
        console.log("Computer move: ", move);

        // place computer symbol
        const compSymbol = 'O';
        if (!gameData.BoardState) gameData.BoardState = InitializeBlankBoard();
        gameData.BoardState[move.z][move.y][move.x] = compSymbol;
        console.log("Board after computer move: ", gameData.BoardState);

        // try to detect a win, but don't throw if CheckWin isn't available
        try {
            if (typeof CheckWin === 'function' && CheckWin(move.x, move.y, move.z, gameData.BoardState, compSymbol)){
                // set Winner to the player name that corresponds to the winning symbol
                gameData.Winner = compSymbol === 'X' ? gameData.PlayerX : gameData.PlayerO;
                console.log('ComputerMove: win detected, setting Winner to', gameData.Winner);
            }
        } catch (e) {
            console.error('ComputerMove: CheckWin failed', e);
        }

        // flip turn back to player
        try { gameData.CurrentTurn = gameData.PlayerX || gameData.CurrentTurn; } catch (e) {}

        if (!SaveLocalGame(gameData)) {
            console.error('ComputerMove: failed to save game after computer move', gameData.GameID);
        }

        return gameData;
    } catch (err) {
        console.error('ComputerMove unexpected error:', err);
        // ensure we still attempt to persist any partial changes
        try { SaveLocalGame(gameData); } catch (e) {}
        return gameData;
    }
}

//These functions take a socket arg because it will be mirrored by a non-local variation that will require a socket connection
function GetBoardLocal(gameID, socket){
    return new Promise((resolve) => {
        GetGameLocal(gameID).then((gameData) => {
            console.log("Fetched local game data for board: ", gameData);
            resolve(gameData.BoardState);
        }).catch(() => resolve(null));
    });
}

function GetWinnerLocal(gameID, socket){
    return new Promise((resolve) => {
        GetGameLocal(gameID).then((gameData) => {
            resolve(gameData.Winner);
        }).catch(() => resolve(null));
    });
}

function MakeMoveLocal(gameID, token, move, player, board, socket){
    return new Promise((resolve) => {
        GetGameLocal(gameID).then((gameData) => {
            if (!gameData) return resolve(null);

            if (gameData.Winner) return resolve(gameData);

            // validate move coordinates
            if (!move || !('x' in move) || !('y' in move) || !('z' in move)) return resolve(null);
            if (!gameData.BoardState || !gameData.BoardState[move.z] || !gameData.BoardState[move.z][move.y]) return resolve(null);
            if (gameData.BoardState[move.z][move.y][move.x] !== '-') return resolve(null);

            // choose symbol: prefer `token`, otherwise infer from player
            let playerSymbol = 'X';
            if (token === 'O' || token === 'o') playerSymbol = 'O';
            else if (token === 'X' || token === 'x') playerSymbol = 'X';
            else if (player && gameData.PlayerO && player === gameData.PlayerO) playerSymbol = 'O';

            gameData.BoardState[move.z][move.y][move.x] = playerSymbol;

            // Check for win condition for the moving player
            if (typeof CheckWin === 'function' && CheckWin(move.x, move.y, move.z, gameData.BoardState, playerSymbol)){
                gameData.Winner = playerSymbol === 'X' ? gameData.PlayerX : gameData.PlayerO;
            }

            // persist after player's move
            try { localStorage.setItem(gameData.GameID, JSON.stringify(gameData)); } catch (e) { console.error('Failed to store game after player move', e); }

            // perform computer move when appropriate
            if (!gameData.Winner && gameData.PlayerO === 'Computer') {
                const compResult = ComputerMove(gameData);
                if (compResult) {
                    gameData = compResult;
                    try { localStorage.setItem(gameData.GameID, JSON.stringify(gameData)); } catch (e) { console.error('Failed to store game after computer move', e); }
                }
            }

            resolve(gameData);
        }).catch(() => resolve(null));
    });
}

const localFunctions = {makeMove: MakeMoveLocal, getBoard: GetBoardLocal, getWinner: GetWinnerLocal, getGame: GetGameLocal}

export { CreateLocalGame, GetGameLocal, MakeMoveLocal, GetBoardLocal, GetWinnerLocal, GetGamesLocal, localFunctions };