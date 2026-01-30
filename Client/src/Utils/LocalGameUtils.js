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
    localStorage.setItem(`localgame-${User.id}`, JSON.stringify(NewGame));
    if (!localGames.includes(gameID)) {
        localGames.push(User.id);
        localStorage.setItem('localgames', JSON.stringify(localGames));
    }
}

function GetGameLocal(gameID){
    return new Promise((resolve) => {
        const gameData = localStorage.getItem(`localgame-${gameID}`);
        if (!gameData) return resolve(null);
        try {
            resolve(JSON.parse(gameData));
        } catch (e) {
            console.error('Failed to parse local game data', e);
            resolve(null);
        }
    });
}

function ComputerMove(gameData){
    if (!gameData) return null;
    if (gameData.Winner) return null;
    const emptyCells = [];
    for (let z = 0; z < 4; z++) {
        for (let y = 0; y < 4; y++) {
            for (let x = 0; x < 4; x++) {
                if (gameData.BoardState[z][y][x] === '-') {
                    emptyCells.push({ x, y, z });
                }
            }
        }
    }
    if (emptyCells.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const move = emptyCells[randomIndex];
    gameData.BoardState[move.z][move.y][move.x] = "O";
    if (CheckWin(move.x, move.y, move.z, gameData.BoardState, "O")){
        gameData.Winner = gameData.PlayerO;
    }
    try { localStorage.setItem(gameData.GameID, JSON.stringify(gameData)); } catch (e) {}
    return gameData;
}

//These functions take a socket arg because it will be mirrored by a non-local variation that will require a socket connection
function GetBoardLocal(gameID, socket){
    return new Promise((resolve) => {
        GetGameLocal(gameID).then((gameData) => {
            if (!gameData) return resolve(null);
            resolve(gameData.BoardState);
        }).catch(() => resolve(null));
    });
}

function GetWinnerLocal(gameID, socket){
    return new Promise((resolve) => {
        GetGameLocal(gameID).then((gameData) => {
            if (!gameData) return resolve(null);
            resolve(gameData.Winner);
        }).catch(() => resolve(null));
    });
}

function MakeMoveLocal(gameID, token, move, player, board, socket){
    return new Promise((resolve) => {
        GetGameLocal(gameID).then((gameData) => {
            if (!gameData) return resolve(null);
            if (gameData.Winner) return resolve(null);
            if (gameData.BoardState[move.z][move.y][move.x] !== '-') return resolve(null);

            const playerSymbol = "X";
            gameData.BoardState[move.z][move.y][move.x] = playerSymbol;

            // Check for win condition
            if (CheckWin(move.x, move.y, move.z, gameData.BoardState, "X")){
                gameData.Winner = gameData.PlayerX;
            }
            gameData = ComputerMove(gameData);
            try { localStorage.setItem(gameData.GameID, JSON.stringify(gameData)); } catch (e) {}
            resolve(gameData);
        }).catch(() => resolve(null));
    });
}

const localFunctions = {makeMove: MakeMoveLocal, getBoard: GetBoardLocal, getWinner: GetWinnerLocal, getGame: GetGameLocal}

export { CreateLocalGame, GetGameLocal, MakeMoveLocal, GetBoardLocal, GetWinnerLocal, localFunctions };