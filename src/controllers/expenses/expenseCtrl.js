const expressAsyncHandler = require("express-async-handler");

const expense = require("../../models/expense");

const createExpense = expressAsyncHandler(async (req, res) => {
  const { title, description, amount, user } = req?.body;
  try {
    const exp = await expense.create({ title, description, amount, user });
    res.json(exp);
  } catch (error) {
    res.json(error);
  }
});

// fetch all
const fetchExpenses = expressAsyncHandler(async (req, res) => {
  const page = Number(req?.query.page);
  try {
    const fetchAll = await expense.paginate(
      {},
      { limit: 10, page: page, populate: "user" }
    );
    res.json(fetchAll);
  } catch (error) {
    res.json(error);
  }
});

// fetch single expense
const fetchSingleExpense = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params;
  try {
    const exp = await expense.findById(id);
    res.json(exp);
  } catch (error) {
    res.json(error);
  }
});

// update the expense
const updateExpense = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params;
  const { title, description, amount } = req?.body;
  try {
    const newExp = await expense.findByIdAndUpdate(
      id,
      { title, description, amount },
      { new: true }
    );
    res.json(newExp);
  } catch (error) {
    res.json(error);
  }
});

// delete expense
const deleteExpense = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params;
  try {
    const exp = await expense.findByIdAndDelete(id);
    res.json(exp);
  } catch (error) {
    res.json(error);
  }
});

module.exports = {
  createExpense,
  fetchExpenses,
  fetchSingleExpense,
  updateExpense,
  deleteExpense,
};
