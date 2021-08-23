"use strict";

const express = require("express");
const app = express();
app.use(express.json());
const userRoute = require("./router/user");
const start = (port) => {
  app.listen(port, () => {
    console.log(`The server start running at port ${port}`);
  });
};
app.use(userRoute);
module.exports = {
  app: app,
  start: start,
};