"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var dotenv_1 = require("dotenv");
dotenv_1.default.config();
var server_1 = require("./config/server");
try {
    var server = server_1.Server.instance;
    server.start();
}
catch (error) {
    console.log(error);
}
