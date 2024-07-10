// external imports
const express = require("express");
const router = express.Router();

// internal imports
const {
  getLogin,
  postCreate,
  logout,
} = require("../controllers/userController");
const {
  addUserValidator,
  addUserValidationHandler,
} = require("../middlewares/common/userValidator");

const {
  loginValidator,
  loginValidationHandler,
} = require("../middlewares/common/loginValidator");

router.post("/create", addUserValidator, addUserValidationHandler, postCreate);

router.post("/login", loginValidator, loginValidationHandler, getLogin);

router.delete("/", logout);

module.exports = router;
