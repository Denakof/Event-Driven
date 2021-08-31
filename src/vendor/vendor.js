"use strict";
const io=require('socket.io-client');
require("dotenv").config();
// const events = require("../../events");
const host = process.env.HOST;
const connectionToCaps=io.connect(`${host}/caps`);
const faker = require("faker");


setInterval(() => {
  const Order = {
    store: process.env.STORE || "NINJA",
    orderID: faker.datatype.uuid(),
    customer: faker.name.findName(),
    address: faker.address.streetName(),
  };
  connectionToCaps.emit("pickup", Order);
  // console.log(Order);
}, 5000);



connectionToCaps.on("delivered", payload => {
  console.log(`VENDOR: Thank you for delivering ${payload.orderID}`);
});



module.exports=connectionToCaps;
