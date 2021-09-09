"use strict";
// const events = require("../events");
require('dotenv').config();
const uuid=require("uuid").v4;
const PORT =process.env.PORT || 4000;
const io = require('socket.io')(PORT);
const caps =io.of('/caps');
const queue = {
  package: {},
  transit: {},
};
// require("../src/driver/driver");
// require("../src/vendor/vendor");

//pick up
caps.on('connection',(socket)=>{
  
  socket.on("bringDriver", () => {
    Object.keys(queue.package).forEach((id) => {
      io.emit("pickup", queue.package[id]);
    });
  });
  socket.on("bringVendor", () => {
    Object.keys(queue.transit).forEach((id) => {
      io.emit("delivered", queue.transit[id]);
    });
  });

socket.on("pickup", (payload) => {
  console.log("EVENTS", {
    event: "pickup",
    time: new Date().toLocaleDateString(),
    payload: payload,
  });
  let id = uuid();
  queue.package[id] = payload;

  caps.emit('pickup',payload);
  
});
socket.on("in-transit", payload => {
  console.log("EVENTS", {
    event: "in-transit",
    time: new Date().toLocaleDateString(),
    payload: payload,
  });
  let id = uuid();
  queue.transit[id] = payload;

  let Keys = Object.keys(queue.package);
  for (let i = 0; i < Keys.length; i++) {
    delete queue.package[Keys[i]];
  }
  caps.emit('in-transit',payload);
});


socket.on('delivered', payload => {
    console.log("EVENTS", {
      event: "delivered",
      time: new Date().toLocaleDateString(),
      payload: payload,
    });

    let Keys = Object.keys(queue.transit);
    for (let i = 0; i < Keys.length; i++) {
      delete queue.transit[Keys[i]];
    }

    caps.emit('delivered',payload);

  })
});


  module.exports= caps