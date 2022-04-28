const cors = require("cors");

const express = require("express");
const dotenv = require("dotenv");
const db = require("./config/dbConnect");
const { errorHandler, notFound } = require("./middleware/errorMiddleware");
const usersRoute = require("./routes/users/usersRoute");
const incomeRoute = require("./routes/income/incomeRoute");
const expRoute = require("./routes/expenses/expenseRoute");
const app = express();

app.use(cors());
//env
dotenv.config();

//database connect
db();

//middleware
app.use(express.json()); // to allow posting json data

//users routes
app.use("/api/users", usersRoute);
app.get("/", (req, res) => {
  res.json({ msg: "Welcome to the Finance Crawler!" });
});

//income routes
app.use("/api/income", incomeRoute);

//expense routes
app.use("/api/expense", expRoute);
//app.get("//", fwbheofhw);

//error handling
app.use(notFound);
app.use(errorHandler);

module.exports = app;
