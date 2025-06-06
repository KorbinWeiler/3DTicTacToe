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

    setTile(x,y,x,newValue){
        this.boards[z].board[x][y].val = newValue
    }

    //Corners
    //x: 0, y: 0, z: z
    //x: 3, y: 0, z: z
    //x: 0, y: 3, z: z
    //x: 3, y: 3, z: z

    //Down, Left, and Right
    //x: x, y: 0, z: z
    //x: 0, y: y, z: z
    //x: x, y: y, z: 0
    checkWin(playerValue, x, y, z, xScale, yScale, zScale){

        let count = 0;
        while(x < 4 && y < 4 && z < 4 && x >= 0 && y >= 0 && z >= 0){
            const tile = this.getTile(x, y, z);
            if(tile.val === playerValue){
                count++;
            }

            x += 1 * xScale;
            y += 1 * yScale;
            z += 1 * zScale;
        }
        return count === 4;

    }
}

export default GameBoardUtils