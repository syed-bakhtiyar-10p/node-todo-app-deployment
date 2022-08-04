const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connectionPromise = require('./shared/dbModule/dbModule');
require('dotenv').config();
console.log({environments: process.env})


connectionPromise.then((connection)=>{
    console.log('database connected successfully');
    /**
     * this is for cross domain
     */
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    /**
     * parse json as well as urlencoded
     */
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    /** shared service */
    // const dialogFlowService = require('./shared/services/dialog-flow.service');
    
    // /** Common services */
    // const emailService = require('./core/services/common/email-service');

    // /** App services */
    const todoService = require('./core/services/todo')(connection);

    // App router
    const todoRouter = require('./core/routes/todo')(todoService);

    // middleware handle for routing
    app.use('/', todoRouter);

    app.listen(4000, ()=>{
        console.log('api is running 4000');
    });

}).catch((error) => {
    console.log(error);
})

