// external imports
const { body, validationResult } = require("express-validator");
const createError = require("http-errors");

// internal imports
const { getUserByEmail } = require("../../db_operations/db_users");

// register new user
const addUserValidator = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid Email address")
    .custom(async (value) => {
      try {
        const user = await getUserByEmail(value);
        if (user.length) {
          throw createError("Email already in use");
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isAlpha("en-US", { ignore: "-" })
    .withMessage("Name must be alphabetic")
    .escape(),
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

/*
mappedErrors = {
  name: {
    msg:"Invalid value",
  },
  email: {
    msg:"Invalid value",
  },
}
*/

module.exports = {
  addUserValidator,
  addUserValidationHandler,
};
