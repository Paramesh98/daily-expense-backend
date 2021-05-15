const express = require("express");
const User = require("../Model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/auth");
const { findOne } = require("../Model/user");

const route = express.Router();

route.post("/signup", async (req, res) => {
  bcrypt.hash(req.body.password, 15).then((hashedPassword) => {
    const user = new User({
      ...req.body,
      password: hashedPassword,
    });
    user
      .save()
      .then(() => res.status(200).json({ message: "User saved successfully" }));
  });
});

route.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (user) {
    console.log(user._id);

    bcrypt.compare(password, user.password).then((response) => {
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
      res.json({
        token,
        user: user,
      });
    });
  } else {
    res.status(403).json({ success: false, message: "pora rai" });
  }
});

route.put("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    User.findByIdAndUpdate(id, req.body, (err, data) => {
      if (err) {
        return res.status(403).json({ success: false, message: "pora rai" });
      }
      return res
        .status(200)
        .json({ success: false, message: "Successfully updated" });
    });
  } catch (err) {
    res.status(403).json({ success: false, message: "pora rai" });
  }
});

route.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  let user = await User.findById(id).select("-password");

  if (user) {
    try {
      return res.status(200).json({ success: false, data: user });
    } catch (err) {
      return res
        .status(403)
        .json({ success: false, message: "Some Error Occured" });
    }
  } else {
    return res
      .status(403)
      .json({ success: false, message: "Some Error Occured" });
  }
});

module.exports = route;
