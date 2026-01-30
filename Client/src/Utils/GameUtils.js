import { normalizeToArray } from "./GameBoardUtils";

async function GetBoard(gameID, socket){
    console.log("Getting board for gameID:", gameID);
    return new Promise((resolve) => {
        if (!socket) return resolve(null);
        socket.emit("get board", gameID, (response) => {
            if (response?.error) {
                console.error("Error fetching game board: ", response.error);
                return resolve(null);
            }

            const boardArray = normalizeToArray(response) ?? normalizeToArray(response?.BoardState) ?? null;
            if (!boardArray) {
                console.error('Unable to normalize board response:', response);
                return resolve(null);
            }
            try { sessionStorage.setItem(`board-${gameID}`, JSON.stringify({ BoardState: boardArray })); } catch (e) {}
            console.log("Normalized board array:", boardArray);
            resolve(boardArray);
        });
    });
}

function GetWinner(gameID, socket){
    return new Promise((resolve) => {
        if (!socket) return resolve(null);
        socket.emit("get winner", gameID, (winResponse) => {
            if (winResponse?.error) {
                console.error("Error fetching game winner: ", winResponse.error);
                return resolve(null);
            }
            resolve(winResponse?.Winner ?? null);
        });
    });
}

function GetGame(gameID, socket){
    return new Promise((resolve) => {
        if (!socket) return resolve(null);
        socket.emit("get game", gameID, (response) => {
            if (response?.error) {
                console.error("Error fetching game data: ", response.error);
                return resolve(null);
            }
            resolve(response);
        });
    });
}

function MakeMove(gameID, token, move, player, board, socket){
    console.log(socket);
    return new Promise((resolve) => {
        if (!socket) return resolve(null);
        socket.emit("make move", gameID, token, move, player, board, (response) => {
            if (response?.error) {
                console.error("Error making move: ", response.error);
                return resolve(null);
            }
            resolve(response);
        });
    });
}

const functions = {makeMove: MakeMove, getBoard: GetBoard, getWinner: GetWinner, getGame: GetGame}

export {GetBoard, GetWinner, MakeMove, GetGame, functions}