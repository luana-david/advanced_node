const mongoose = require("mongoose");
const {
  userSchema,
  validateUser,
  validateUserForCompare,
  userModel,
} = require("../models/user");
const Joi = require("joi");
const hash = require("../utils/hash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const config = require("config");

const validateUserCredentials = async (req, res) => {
  try {
    const { body: data } = req;
    console.log(data);
    const { error } = validateUserForCompare(data);
    if (error) res.status(400).send({ message: error.message });
    const foundUser = await userModel.findOne({
      email: data.email,
    });
    if (!foundUser) {
      return res.status(404).send({ message: "wrong email" });
    }
    const { password, ...resData } = foundUser.toObject();
    const isValidPassword = await bcrypt.compare(data.password, password);
    console.log(isValidPassword);

    if (!isValidPassword) {
      return res.status(400).send({ message: "wrong password" });
    }
    console.log(config.get("jwtPrivateKey"));
    const token = jwt.sign(resData, config.get("jwtPrivateKey"));
    res.status(200).send({ token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "server error" });
  }
};

module.exports = validateUserCredentials;
