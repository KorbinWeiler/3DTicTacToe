import BoardUtils from "./BoardUtils";

class GameBoardUtils{
    constructor(){
        this.boards = []
        for (let z = 0; z < 4; ++z){
            this.boards[z] = new BoardUtils(z);
        }
    }

    getTile(x,y,z){

        return this.boards[z].board[x][y]
    }
}

export default GameBoardUtils