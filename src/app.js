const express = require("express");
const dotenv = require("dotenv");
const db = require("./config/dbConnect");
const { errorHandler, notFound } = require("./middleware/errorMiddleware");
const usersRoute = require("./routes/users/usersRoute");
const app = express();

//env
dotenv.config();

//database connect
db();

//middleware
app.use(express.json()); // to allow posting json data

//routes
app.use("/", usersRoute);

//error handling
app.use(notFound);
app.use(errorHandler);

module.exports = app;
