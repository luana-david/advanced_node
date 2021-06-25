const jwt = require("jsonwebtoken");
const config = require("config");

const auth = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) return res.status(401).send({ message: "not valid user" });

  try {
    const decode = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decode;
    next();
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports = auth;
