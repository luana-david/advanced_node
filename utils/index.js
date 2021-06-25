const passwordComplexityLib = require("joi-password-complexity");

const complexityOptions = {
  min: 8,
  max: 20,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 2,
};

const passwordComplexity = passwordComplexityLib(complexityOptions);

module.exports = passwordComplexity;
