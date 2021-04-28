const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    phone: { type: Number, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    montlyIncome: { type: Number, required: true },
    incomeBalance: Number,
    relationshipStatus: String,
    myExpense: Array,
    myIncome: Array,
    balance: Number,
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);

module.exports = User;
