"use strict";
require("dotenv").config();
const events = require("../../events");
const faker = require("faker");

setInterval(() => {
  const Order = {
    store: process.env.STORE || "NINJA",
    orderID: faker.datatype.uuid(),
    customer: faker.name.findName(),
    address: faker.address.streetName(),
  };
  events.emit("pickup", Order);

}, 5000);



events.on("delivered", (payload) => {
  console.log(`VENDOR: Thank you for delivering ${payload.orderID}`);
});

module.exports=events