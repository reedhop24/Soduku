const {col, row, square} = require('./validations');

const validateBoard = (board) => {
    const squareCoord = [[0,0], [0,3], [0, 6], [3,0], [3,3], [3, 6], [6,0], [6,3], [6, 6]];
    let k = 0;
    for(let i = 0; i < 9; i++) {
        if(!col(board, 8, i) || !row(board, i, 8) || !square(board, squareCoord[k][0], squareCoord[k][1])) {
            return false;
        }
        k++;
    }

    return true;
}

module.exports = validateBoard