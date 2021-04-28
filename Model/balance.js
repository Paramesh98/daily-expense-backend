const mongoose = require("mongoose");

const balanceSchema = new mongoose.Schema(
  {
    balance: Number,
  },
  {
    timestamps: true,
  }
);

const Balance = mongoose.model("Balance", balanceSchema);

module.exports = Balance;
