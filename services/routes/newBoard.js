const e = require('express');
const express = require('express');
const router = express();
const generate = require('../functions/generate');

router.get('/newBoard', (req, res) => {
    if(!req.query.difficulty) {
        res.json({
            status: "error",
            errorMessage: "no difficulty specified"
        })
    } else {
        res.json(generate(req.query.difficulty));
    }
});

module.exports = router;

