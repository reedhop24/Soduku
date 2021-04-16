const validateCol = (board, rowPos, colPos) => {
    let cols = new Map();

    for(let i = rowPos; i >= 0; i--) {
        if(board[i][colPos] > 0) {
            if(cols.has(board[i][colPos])) {
                return false;
            } else {
                cols.set(board[i][colPos], null)
            }
        }
    }

    return true;
}

const validateRow = (board, rowPos, colPos) => {
    let row = new Map();

    for(let i = colPos; i >= 0; i--) {
        if(board[rowPos][i] > 0) {
            if(row.has(board[rowPos][i])) {
                return false;
            } else {
                row.set(board[rowPos][i], null)
            }
        }
    }

    return true;
}

const validateSquare = (board, rowPos, colPos) => {
    const position = (num) => {
        if(num <= 2) {
            return {
                'floor': 0,
                'ceil': 2
            };
        } else if(num <= 5) {
            return {
                'floor': 3,
                'ceil': 5
            }
        } else if(num <= 8) {
            return {
                'floor': 6,
                'ceil': 8
            }
        }
    }
    
    let x = position(rowPos);
    let y = position(colPos);
    let squareMap = new Map();

    for(let j = x['floor']; j <= x['ceil']; j++) {
        if(board[j].length > 0) {
            for(let k = y['floor']; k <= y['ceil']; k++) {
                if(board[j][k] > 0) {
                    if(squareMap.has(board[j][k])) {
                        return false;
                    } else {
                        squareMap.set(board[j][k])
                    }
                }
            }
        }
    }
    
    return true;
}

module.exports = {
    col : validateCol,
    row : validateRow,
    square: validateSquare
}