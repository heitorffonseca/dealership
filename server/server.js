const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

require('./app/controllers/controller')(app);

app.listen(3000, () => console.log('running in port: 3000'));