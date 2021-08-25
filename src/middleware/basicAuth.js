"use strict";

const bcrypt = require("bcrypt");
const base64 = require("base-64");

const {users} = require("../models/index");

const basicAuth = async (req, res, next) => {

  if (req.headers["authorization"]) {
    let basicHeaderParts = req.headers.authorization.split(" ");
    let encoded = basicHeaderParts.pop();
    let decoded = base64.decode(encoded);
    let [username, password] = decoded.split(":");
    try {
      console.log(users.findAll());
      const user = await users.findOne({ where: { username: username } });
      const valid = await bcrypt.compare(password, user.password);
      if (valid) {
        res.status(200).json({
          username: username,
          id: user.id,
          password:password
        });
        next();
      } else {
        throw new Error("Invalid UserName and Password");
      }
    } catch (error) {
      console.log(error);
      res.status(403).send("error in signin");
    }
  }
};

module.exports = basicAuth;