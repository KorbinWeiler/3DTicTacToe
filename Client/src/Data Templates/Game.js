class Game{
    constructor(obj){
        this.gameID = obj.gameId;
        this.player1 = obj.player1;
        this.player2 = obj.player2;
        this.gameBoard = obj.gameBoard;
        this.playerTurn = obj.playerTurn;
        this.gameOver = obj.gameOver;
    }

    constructor(gameID, player1, player2, gameBoard, playerTurn, gameOver){
        this.gameID = gameId;
        this.player1 = player1;
        this.player2 = player2;
        this.gameBoard = gameBoard;
        this.playerTurn = playerTurn;
        this.gameOver = gameOver;
    }
}

export {Game};