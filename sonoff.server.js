const fs = require('fs');
const path = require('path');
const sonoffServer = require("./sonoff.server.module.js");
var express = require('express');
var server = express();
var bodyParser = require('body-parser')
var http = require('http');

const config = JSON.parse(fs.readFileSync(path.resolve(__dirname, './sonoff.config.json')));

config.logger = {
    log: console.log,
    warn: console.warn,
    error: console.error,
    trace: console.info,
    debug: console.debug,
};

//if (process.env.HTTP_PORT !== undefined)
    config.server.httpPort = process.env.HTTP_PORT;
//if (process.env.HTTPS_PORT !== undefined)
    config.server.httpsPort = process.env.HTTPS_PORT;
//if (process.env.WEBSOCKET_PORT !== undefined)
    config.server.websocketPort = process.env.WEBSOCKET_PORT;
//if (process.env.SERVER_IP !== undefined)
    config.server.IP = process.env.SERVER_IP;


const log = config.logger;

// call sonoff server for device handling 
var devices = sonoffServer.createServer(config);

// Register body-parser
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

