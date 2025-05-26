
import TileUtils from "./TileUtils.js";
class BoardUtils{
    constructor(z){
        this.board = [];

        for (let x = 0; x < 4; ++x){
            this.board[x] = [];
            for (let y = 0; y < 4; ++y){
                this.board[x][y] = new TileUtils(x, y, z)
            }
        }
    }
}

export default BoardUtils