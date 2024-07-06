// dependencies
const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
require("dotenv").config();

// internal imports
const userRouter = require("./routes/userRouter");

app.use(express.json());
// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// cookie parser
app.use(cookieParser(process.env.COOKIE_SECRET));

// routes
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login_register.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
