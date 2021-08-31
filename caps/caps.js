"use strict";
// const events = require("../events");
require('dotenv').config();

const PORT =process.env.PORT || 4000;
const io = require('socket.io')(PORT);
const caps =io.of('/caps');

// require("../src/driver/driver");
// require("../src/vendor/vendor");

//pick up
caps.on('connection',(socket)=>{

socket.on("pickup", (payload) => {
  console.log("EVENTS", {
    event: "pickup",
    time: new Date().toLocaleDateString(),
    payload: payload,
  });
  caps.emit('pickup',payload);

});
socket.on("in-transit", payload => {
  console.log("EVENTS", {
    event: "in-transit",
    time: new Date().toLocaleDateString(),
    payload: payload,
  });
  caps.emit('in-transit',payload);

});


socket.on('delivered', payload => {
    console.log("EVENTS", {
      event: "delivered",
      time: new Date().toLocaleDateString(),
      payload: payload,
    });
    caps.emit('delivered',payload);

  })
});


  module.exports= caps