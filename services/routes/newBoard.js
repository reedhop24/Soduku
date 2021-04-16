const express = require('express');
const router = express();
const generate = require('../functions/generate');

router.get('/newBoard', (req, res) => {
    res.json(generate(req.query.difficulty));
});

module.exports = router;

