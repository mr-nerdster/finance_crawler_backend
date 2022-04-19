const expressAsyncHandler = require("express-async-handler");
const User = require("../../models/User");
//registration
const registerUser = expressAsyncHandler(async (req, res) => {
  const { email, firstname, lastname, password } = req?.body;

  const userExists = await User.findOne({ email }); // handle custom error handlers outside catch.
  if (userExists) throw new Error("User Exists");
  try {
    // const userExists = await User.findOne({ email });

    // if (userExists) {
    //   res.json("User Exists");
    // } else {
    const user = await User.create({ email, firstname, lastname, password });
    res.status(200).json(user);
    console.log("User created");
  } catch (error) {
    res.json(error);
  }
});

const fetchAllUsers = expressAsyncHandler(async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.json({ error: error.message });
  }
});

module.exports = { registerUser, fetchAllUsers };
