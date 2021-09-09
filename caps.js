"use strict";
const events = require("./events");

require("./src/driver/driver");
require("./src/vendor/vendor");

//pick up

events.on("pickup", (payload) => {
  console.log("EVENTS", {
    event: "pickup",
    time: new Date().toLocaleDateString(),
    payload: payload,
  });
});


events.on("in-transit", (payload) => {
  console.log("EVENTS", {
    event: "in-transit",
    time: new Date().toLocaleDateString(),
    payload: payload,
  });
});


events.on('delivered', (payload) => {
    console.log("EVENTS", {
      event: "delivered",
      time: new Date().toLocaleDateString(),
      payload: payload,
    });
  })

  module.exports= events