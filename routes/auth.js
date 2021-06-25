const express = require("express");
const router = express.Router();
const authControler = require("../controller/auth");

router.post("/", authControler);

module.exports = router;
