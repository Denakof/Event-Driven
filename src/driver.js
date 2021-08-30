"use strict";
const events = require("../events");

events.on("pickup", (payload) => {
  setTimeout(() => {
    console.log(`DRIVER: picked up ${payload.orderID}`);
    events.emit("in-transit", payload);
  }, 1000);
});

events.on("pickup", (payload) => {
  setTimeout(() => {
    console.log(`delivered ${payload.orderID}`);
    events.emit("delivered", payload);
  }, 3000);
});
module.exports = events;
