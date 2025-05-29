import Session from "../../utils/session";
const ws = require('ws')

let activeSession = {}; //stores a map of sessionIDs to session objects to be mapped to websocket connections
let lobbyStack = []; //A stack of available sessionIDs for use when a new lobby is created

function initLobbyStack(){
    for(let i = 0; i < 10; ++i){
        lobbyStack.push(i);
    }
}

function createNewSession(SessionID, player1, player2){
    activeSession.sessionID = new Session(SessionID, player1, player2);
}

function getLobbyNumber(player1, player2){
    const lobby = lobbyStack.pop();
    createNewSession(lobby, player1, player2);
    return lobby;
}

function closeSession(sessionID){
    lobbyStack.push(sessionID);
}

async function notifyOpponent(playerId){

}

export{
    getLobbyNumber,
    initLobbyStack,
    closeSession,
    notifyOpponent
}