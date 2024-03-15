const express = require('express');
const app = express();  

const connect = require("./database/dbconnection");

const veterinaryClinicRouter = require('./routes/patients'); 

app.use(express.json());

app.use('/veterinaryClinic', veterinaryClinicRouter);

connect();

module.exports = app; 