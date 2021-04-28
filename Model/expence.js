const mongoose = require("mongoose");
const User = require("./user");

const expenseSchema = new mongoose.Schema(
  {
    date: String,
    email: String,
    amount: Number,
    type: String,
    title: String,
    message: String,
    currentBalance: Number,
    user: { type: mongoose.Schema.Types.ObjectId, ref: User },
  },
  {
    timestamps: true,
  }
);

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
