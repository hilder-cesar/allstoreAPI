require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const masterRouter = require('./api/master/master.router');

var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/master", masterRouter);

app.listen(process.env.APP_PORT, () => {
    console.log('Working', process.env.APP_PORT);
})