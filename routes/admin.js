const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("../config.json");

const isAuth = (req, res) => {
  return res.status(403).send("Access Denied");
};

// middleware

// const authToken = (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   console.log('AUTH', authHeader);
//   const token = authHeader && authHeader.split(' ')[1];
//   console.log('req', req.headers);
//   console.log('token', token);
//
//   if (token == null) return res.json({ status: 'fail', msg: 'No Token' });
//
//   jwt.verify(token, config.secret, (err, user) => {
//     if (err) return res.send({ status: 'fail', msg: 'Invalid Token' });
//     req.user = user;
//     next();
//   })
// }
//

router.get("/", (req, res) => {
  console.log("test");
  res.send("Hello");
});

module.exports = router;
