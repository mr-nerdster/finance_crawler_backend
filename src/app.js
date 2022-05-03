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

// ------------------ Sentry ----------------------
const Sentry = require("@sentry/node");
// or use es6 import statements
// import * as Sentry from '@sentry/node';

const Tracing = require("@sentry/tracing");
// or use es6 import statements
// import * as Tracing from '@sentry/tracing';

Sentry.init({
  dsn: "https://b0e166ee11434bbe9f544e8a35576bc8@o1230295.ingest.sentry.io/6376883",

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

const transaction = Sentry.startTransaction({
  op: "test",
  name: "My First Test Transaction",
});

setTimeout(() => {
  try {
    foo();
  } catch (e) {
    Sentry.captureException(e);
  } finally {
    transaction.finish();
  }
}, 99);
// --------------------------------------------


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
