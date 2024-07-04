// external imports
const express = require("express");
const router = express.Router();

// internal imports
const { getLogin, postCreate } = require("../controllers/userController");
const {
  addUserValidator,
  addUserValidationHandler,
} = require("../middlewares/common/userValidator");

router.post("/create", addUserValidator, addUserValidationHandler, postCreate);

// router.get("/login", getLogin);

module.exports = router;
