const {
  registerUser,
  fetchAllUsers,
} = require("../../controllers/users/userctlr");
const express = require("express");

const userRoute = express.Router();
userRoute.post("/api/users/register", registerUser);
userRoute.get("/api/users", fetchAllUsers);
module.exports = userRoute;
