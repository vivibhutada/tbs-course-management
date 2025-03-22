const dotenv = require('dotenv').config({path:`${__dirname}/../.env`});  
if (dotenv.error) { console.log('dotenv file not found....')
    throw dotenv.error
}
const path = require('path');
var http = require('http');
var express = require('express');
const cors = require('cors');
const db = require('./db').db;
const router = require('./router');
const crypto = require("./middleware/crypto.js");
const { errorLogger } = require("./middleware");
const keys = require('./keys.js');
const commonHelper = require('./helper/commonHelper.js');
global.commonHelper = commonHelper;
var app = express();
const {decodeFile} = require('./helper/FileHelper');
const staticFilesPath = path.join(__dirname, '../public');
app.use(express.static(staticFilesPath));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const fs  = require('fs');
const iocContainer = {express,db,keys,crypto}
app.use('/api',router(iocContainer))
app.get('/api/health', (req, res) => {
    return res.status(200).send({ uptime: process.uptime(),message: 'Ok',date: new Date()});
});

app.use(errorLogger);

const server = http.createServer(app);
server.listen((keys.PORT || 9000), async () => {
});
server.on('listening', () => { 
    console.log(`Common API started on Port - ${keys.PORT}`);
});

