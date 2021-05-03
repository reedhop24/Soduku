const express = require('express');
const app = express();
const newBoard = require('./routes/newBoard');
const validate = require('./routes/validateBoard');
const cors = require('cors');

app.use(cors());
app.use(newBoard);
app.use(validate);

app.listen(5000, () => {
    console.log('server listening on 5000');
});

module.exports = app;