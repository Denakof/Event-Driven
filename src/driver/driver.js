"use strict";
require('dotenv').config();
// const events = require("../../events");
const io=require('socket.io-client');
const host = process.env.HOST || "http://localhost:4000" ;
const connectionToCaps = io.connect(`${host}/caps`);


connectionToCaps.on("pickup", payload => {
  setTimeout(() => {
    console.log(`DRIVER: picked up ${payload.orderID}`);
    connectionToCaps.emit("in-transit", payload);
  }, 1500);
  
  setTimeout(() => {
    console.log(`delivered ${payload.orderID}`);
    connectionToCaps.emit("delivered", payload);
  }, 3000);
  
});
module.exports = connectionToCaps;
