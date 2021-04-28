const jwt = require("jsonwebtoken");

const checkUser = (req, res, next) => {
  const user = req.body;
  const header = req.headers.authorization;
  let token = header.split(" ")[1];
  // console.log("user", token);
  const decode = jwt.verify(token, process.env.JWT_SECRET);
  // console.log("decode", decode);
  if (decode) {
    next();
  } else {
    res.status(403).json({ success: false, message: "pora rai" });
  }
  //   next();
};

module.exports = checkUser;
