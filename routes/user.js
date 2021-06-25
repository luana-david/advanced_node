const express = require("express");
const router = express.Router();
const userController = require("../controller/user");
const authMiddleware = require("../middleware/auth");
const adminMiddleware = require("../middleware/admin");

router.get("/", authMiddleware, userController.getUser);
router.get("/me", authMiddleware, userController.getMe);
router.get("/:id", authMiddleware, userController.getUserById);
router.post("/", authMiddleware, userController.addUser);
router.put("/:id", authMiddleware, userController.updateUser);
router.post("/changePassword", authMiddleware, userController.updatePassword);
router.delete(
  "/",
  [authMiddleware, adminMiddleware],
  userController.deleteUser
);

module.exports = router;
