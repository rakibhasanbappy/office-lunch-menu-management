// external imports
const { body, validationResult } = require("express-validator");

// internal imports

// register new user
const addUserValidator = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid Email address"),
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isAlpha("en-US", { ignore: "-" })
    .withMessage("Name must be alphabetic"),
  body("password")
    .isStrongPassword()
    .withMessage(
      "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number and one special character"
    ),
];

const addUserValidationHandler = function (req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    res.status(400).json({ errors: mappedErrors });
  }
};

module.exports = {
  addUserValidator,
  addUserValidationHandler,
};
