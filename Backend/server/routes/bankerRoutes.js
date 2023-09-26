const express = require("express");
const router = express.Router();
const bankerController = require("../controllers/panelController");
const tokenValidation = require("../middleware/tokenValidation");
const verifyRoles = require("../middleware/rolesValidation");
const rolesList = require("../config/rolesList");

router.get(
  "/users",
  tokenValidation.validateToken,
  verifyRoles(rolesList.Banker),
  bankerController.getAllUsers
);

router.get(
  "/users/:id",
  tokenValidation.validateToken,
  verifyRoles(rolesList.Banker),
  bankerController.getUser
);

router.post(
  "/banker/addAccount",
  tokenValidation.validateToken,
  verifyRoles(rolesList.Banker),
  bankerController.createAccount
);

router.post(
  "/banker/addTransaction",
  tokenValidation.validateToken,
  verifyRoles(rolesList.Banker),
  bankerController.createTransaction
);

module.exports = router;
