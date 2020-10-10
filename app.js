require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

const masterRouter = require('./api/master/master.router');
const establishmentRouter = require('./api/establishment/establishment.router');
const cepRouter = require('./api/cep/cep.router');

var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/MasterUser", masterRouter);
app.use("/api/Establishment", establishmentRouter);
app.use("/api/Cep", cepRouter);

app.listen(process.env.APP_PORT, () => {
    console.log('Working', process.env.APP_PORT);
})