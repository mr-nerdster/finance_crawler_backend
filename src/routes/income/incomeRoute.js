const {
  createIncome,
  fetchAllIncomes,
  fetchSingle,
  updateIncome,
  deleteIncome,
} = require("../../controllers/income/incomectlr");
const auth = require("../../middleware/authMiddleware");

const express = require("express");
const incomeRoute = express.Router();

incomeRoute.post("/", auth, createIncome);
incomeRoute.get("/all", auth, fetchAllIncomes);
incomeRoute.get("/:id", auth, fetchSingle);
incomeRoute.put("/:id/update", auth, updateIncome);
incomeRoute.delete("/:id/delete", auth, deleteIncome);

module.exports = incomeRoute;
