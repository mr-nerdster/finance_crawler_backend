const income = require("../../models/income");
const expressAsyncHandler = require("express-async-handler");

const createIncome = expressAsyncHandler(async (req, res) => {
  const { title, description, amount, user } = req?.body;
  try {
    const inc = await income.create({ title, description, amount, user });
    res.json(inc);
  } catch (error) {
    res.json(error);
  }
});

//fetch all the incomes
const fetchAllIncomes = expressAsyncHandler(async (req, res) => {
  // console.log(req?.user);
  const page = Number(req?.query.page);
  // console.log(page);
  try {
    const allIncomes = await income.paginate(
      {},
      { limit: 10, page: page, populate: "user" }
    );
    res.json(allIncomes);
  } catch (error) {
    res.json(error);
  }
});

//fetch single income
const fetchSingle = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    const inc = await income.findById(id);
    // console.log("here");
    res.json(inc);
  } catch (error) {
    console.log(error.message);
    res.json(error);
  }
});

//update
const updateIncome = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params;
  const { title, description, amount } = req?.body;
  try {
    const inc = await income.findByIdAndUpdate(
      id,
      { title, description, amount },
      { new: true }
    );
    res.json(inc);
  } catch (error) {
    res.json(error);
  }
});

//delete
const deleteIncome = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params;
  try {
    const delIncome = await income.findByIdAndDelete(id);
    res.json(delIncome);
  } catch (error) {
    res.json(error);
  }
});

module.exports = {
  createIncome,
  fetchAllIncomes,
  fetchSingle,
  updateIncome,
  deleteIncome,
};
