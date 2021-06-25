const mongoose = require("mongoose");
const Joi = require("joi");
const passwordComplexity = require("../utils");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
  email: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    min: 8,
    max: 20,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    email: Joi.string().min(3).max(255).required().email(),
    password: passwordComplexity,
    isAdmin: Joi.boolean().default(false),
  });

  return schema.validate(user);
};

const validateUserForCompare = (user) => {
  const schema = Joi.object({
    email: Joi.string().min(3).max(255).required().email(),
    password: passwordComplexity,
  });

  return schema.validate(user);
};

const User = mongoose.model("User", userSchema);

module.exports.userSchema = userSchema;
module.exports.validateUser = validateUser;
module.exports.userModel = User;
module.exports.validateUserForCompare = validateUserForCompare;
