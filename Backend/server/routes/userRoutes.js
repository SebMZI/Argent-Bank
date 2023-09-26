const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const tokenValidation = require("../middleware/tokenValidation");
const verifyRoles = require("../middleware/rolesValidation");
const rolesList = require("../config/rolesList");

router.get(
  "/getUsers",
  tokenValidation.validateToken,
  verifyRoles(rolesList.Banker, verifyRoles.Admin),
  userController.getUsers
);

router.post("/signup", userController.createUser);
router.post("/login", userController.loginUser);
router.post(
  "/profile",
  tokenValidation.validateToken,
  userController.getUserProfile
);
router.put(
  "/profile",
  tokenValidation.validateToken,
  userController.updateUserProfile
);

module.exports = router;
