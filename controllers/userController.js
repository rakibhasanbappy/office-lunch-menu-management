// external imports
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// internal imports
const { createUser, getUserByEmail } = require("../db_operations/db_users");

// create jwt token and set cookie
function createJWTToken(userId, email, role, res) {
  const token = jwt.sign(
    { userId: userId, email: email, role: role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
  // set cookie
  res.cookie(process.env.COOKIE_NAME, token, {
    signed: true,
    maxAge: process.env.JWT_EXPIRES_IN,
    httpOnly: true,
  });
}

async function getLogin(req, res) {
  try {
    const user = await getUserByEmail(req.body.email);
    if (user.length === 0) {
      return res.status(400).json({
        errors: {
          common: {
            msg: "There is no account associated with this email. Please signup!",
          },
        },
      });
    }
    const match = await bcrypt.compare(req.body.password, user[0].password);
    if (!match) {
      return res.status(400).json({
        errors: {
          common: {
            msg: "Password is incorrect. Please try again!",
          },
        },
      });
    }
    // create jwt token and set cookie
    createJWTToken(user[0].id, user[0].email, user[0].role, res);
    res.status(200).json({
      message: "Login successful",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      errors: {
        common: {
          msg: "Error logging in. Please try again later!",
        },
      },
    });
  }
}

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
