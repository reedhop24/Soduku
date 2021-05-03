const {col, row, square} = require('./validations');

const generateBoard = (difficulty) => {
    let levels = {
        'easy': 36,
        'medium': 27,
        'hard': 20
    }
    let board = [[],[],[],[],[],[],[],[],[]];
    let randomMap = new Map();

    for(let i = 0; i < levels[difficulty]; i++) {
        let rand = getRandomInt(1, 81);
        while(randomMap.has(rand)) {
            rand = getRandomInt(1, 81);
        }
        randomMap.set(rand, null);
    }

    const randArr = [...randomMap.keys()].sort((a, b) => a -b);
    let randIter = 0; 
    let k = 0;

    for(let i = 0; i < board.length; i++) {
        for(let j = 0; j < 9; j++) {
            k++;
            if(randArr[randIter] === k) {
                let newRand = getRandomInt(1, 9);
                board[i].push(newRand);
                let loopCheck = 0;
                while(!col(board, i, j) || !row(board, i, j) || !square(board, i, j)) {
                    board[i].pop();
                    loopCheck++;

                    if(loopCheck === 9) {
                        return false;
                    }

                    if(newRand !== 9) {
                        newRand += 1;
                    } else {
                        newRand = 1;
                    }
                    board[i].push(newRand);
                }
                randIter++;
            } else {
                board[i].push(null)
            }
        }
    }
    return board;
}

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = generateBoard;