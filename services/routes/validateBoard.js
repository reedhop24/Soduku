const express = require('express');
const router = express();
const bodyParser = require('body-parser');
const validate = require('../functions/validate');
router.use(bodyParser.json());

router.post('/validate', (req, res) => {
    console.log(validate(req.body.board));
});

module.exports = router;