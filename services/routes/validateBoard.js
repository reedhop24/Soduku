const express = require('express');
const router = express();
const bodyParser = require('body-parser');
const validate = require('../functions/validate');
router.use(bodyParser.json());

router.post('/validate', (req, res) => {
    if(req.body.board) {
        let parseBoard = [];
        let count = 0;
        for(let i = 0; i < req.body.board.length; i++) {
            parseBoard.push(req.body.board[i].map((x) => {
                if(x !== null) {
                    count++;
                }
                return parseInt(x)
            }));
        }
        res.json({
            valid: validate(parseBoard),
            complete: count === 81 ? true : false
        })
    } else {
        res.json({
            status: 'error',
            errorMessage: 'invalid board'
        })
    }
});

module.exports = router;