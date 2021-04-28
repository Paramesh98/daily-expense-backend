const express = require("express");
const Expense = require("../Model/expence");
const authMiddleware = require("../middleware/auth");
const User = require("../Model/user");

const route = express.Router();

route.post("/", authMiddleware, async (req, res) => {
  const { type, user, amount } = req.body;
  let currentBalance;
  let actualUser = await User.findById(user);
  if (type === "income") {
    const userData = await User.findOneAndUpdate(user, {
      $inc: { balance: amount },
    });
    currentBalance = actualUser.balance + amount;
  } else {
    const userData = await User.findOneAndUpdate(user, {
      $inc: { balance: -amount },
    });
    currentBalance = actualUser.balance - amount;
  }

  let expense = new Expense({ ...req.body, currentBalance: currentBalance });
  expense
    .save()
    .then((result) => {
      res.status(200).json({ success: true, message: "Successfully added" });
    })
    .catch((err) => {
      res.status(500).json({ success: false, message: " Some error occured" });
    });
});

route.get("/", authMiddleware, async (req, res) => {
  const data = await Expense.find({}).sort({ createdAt: -1 });

  if (data) {
    res.status(200).json({ success: true, data: data });
  } else {
    res.status(500).json({ success: false, message: " Some error occured" });
  }
});

module.exports = route;
