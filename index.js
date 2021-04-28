// const { Router } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const route = require("./Route/expenceController");
const userRoute = require("./Route/userController");
const dotenv = require("dotenv");

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();
mongoose
  .connect("mongodb://localhost/expense", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api", route);
app.use("/user", userRoute);
const PORT = 5000;

// Router.get("/", (req, res) => res.send("App in running in 5000"));

app.listen(PORT, () => console.log("app running in 5000"));
