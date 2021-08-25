"use strict";

const express = require("express");
const cors=require('cors')
const app = express();
app.use(cors())

app.use(express.json());
const userRoute = require("./router/user");
const start = (port) => {
  app.listen(port, () => {
    console.log(`The server start running at port ${port}`);
  });
};


app.get('/', (req, res) => {
  res.status(200).send('Hello 👋 to basic-auth server 🖥')
})
app.use(userRoute);
module.exports = {
  app: app,
  start: start,
};