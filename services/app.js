const express = require('express');
const app = express();
const newBoard = require('./routes/newBoard');
const validate = require('./routes/validateBoard');

app.use(newBoard);
app.use(validate);

app.listen(500, () => {
    console.log('server listening on 500');
});