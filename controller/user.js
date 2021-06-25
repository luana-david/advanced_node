const { userSchema, validateUser, userModel } = require("../models/user");
const bcrypt = require("bcrypt");
const hash = require("../utils/hash");
const passwordComplexity = require("../utils");

const getUser = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
  } catch (error) {}
};

const getMe = async (req, res) => {
  try {
    const { _id } = req.user;
    const user = await userModel.findOne({ _id }, "-password");
    res.status(201).send(user);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const addUser = async (req, res) => {
  try {
    const data = req.body;
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send({ message: error.message });
    const hashed = await hash(data.password);
    const user = new userModel({
      ...data,
      password: hashed,
    });
    const newUser = await user.save();
    const { password, ...resData } = newUser.toObject();

    res.status(201).send(resData);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "server error" });
  }
};

const updatePassword = async (req, res) => {
  try {
    const { password, email } = req.body;
    const { error } = passwordComplexity.validate(password);
    console.log(error);
    if (error) return res.status(400).send({ message: error.message });
    const hashed = await hash(password);
    const foundUser = await userModel.updateOne(
      { email },
      {
        $set: {
          password: hashed,
        },
      }
    );

    // await foundUser.save();

    res.status(201).send({ message: "Password Changed Successfuly" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    res.status(201).send();
  } catch (error) {
    res.status(500).send({ message: "server error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { _id } = req.user;
    await userModel.deleteOne({ _id });
    res.status(201).send({ message: "user deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  getUser,
  getUserById,
  addUser,
  updateUser,
  updatePassword,
  getMe,
  deleteUser,
};
