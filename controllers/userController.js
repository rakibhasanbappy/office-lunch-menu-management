// external imports
const bcrypt = require("bcrypt");

// internal imports
const { createUser } = require("../db_operations/db_users");

function getLogin() {}

async function postCreate(req, res) {
  let newUser;
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    newUser = {
      email: req.body.email,
      name: req.body.name,
      password: hashedPassword,
    };

    const result = await createUser(newUser);
    // console.log(result);
    res.status(201).json({
      message: "User created successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      errors: {
        common: {
          msg: "Error creating user. Please try again later!",
        },
      },
    });
  }
}

module.exports = {
  getLogin,
  postCreate,
};
