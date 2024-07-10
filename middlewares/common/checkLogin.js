const jwt = require("jsonwebtoken");

const checkLogin = (req, res, next) => {
  const token = req.signedCookies[process.env.COOKIE_NAME];
  if (!token) {
    return res.status(401).json({
      errors: {
        common: {
          msg: "Authentication required!",
        },
      },
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      errors: {
        common: {
          msg: "Authentication required!",
        },
      },
    });
  }
};

const redirectLoggedIn = (req, res, next) => {
  if (req.signedCookies[process.env.COOKIE_NAME]) {
    return res.redirect("/user/dashboard");
  }
  next();
};

module.exports = {
  checkLogin,
  redirectLoggedIn,
};
