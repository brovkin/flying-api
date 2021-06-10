const express = require("express");
const router = express.Router();
const User = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { ObjectId } = require("mongodb");
const config = require("../config.json");
const userController = require("../controllers/users");

// get all users

router.get("/", async (req, res) => {
  const users = await User.find({});

  if (users.length) {
    res.status(200).json({ users });
  }

  res.status(500).json({ status: "fail", msg: "no users" });
});

// get user by id

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  // check length object id
  if (!ObjectId.isValid(id))
    res.status(500).json({ status: "fail", msg: "wrong id" });

  const user = await User.findOne(ObjectId(id));

  if (!user) {
    res
      .status(500)
      .json({ status: "fail", msg: "no user with current id", id });
  }

  res.status(200).json({ user });
});

// update user Data

router.post("/update/:id", async (req, res) => {
  const { id } = req.params;
  // check length object id
  if (!ObjectId.isValid(id))
    res.status(500).json({ status: "fail", msg: "wrong id" });

  const params = req.body;

  const user = await User.findByIdAndUpdate(ObjectId(id), params, {
    returnOriginal: false,
  });

  if (!user) {
    res.status(500).json({ status: "fail", msg: "error" });
  }

  res.status(200).json({ status: "ok", user });
});

// update password

router.post("/update_pass/:id", async (req, res) => {
  const { id } = req.params;
  // check length object id
  if (!ObjectId.isValid(id))
    res.status(500).json({ status: "fail", msg: "wrong id" });

  // check User existence

  const user = await User.findById(id);

  if (!user) res.status(400).json({ status: "fail", msg: "no user" });

  // check current password and compare it from db

  const { current_password, new_password, repeat_new_password } = req.body;

  const compareCurrentPassword = await bcrypt.compare(
    current_password,
    user.password
  );

  if (!compareCurrentPassword)
    res.status(500).json({ status: "fail", msg: "wrong pass" });

  // if (compareCurrentPassword) {
  //   return true;
  // } else {
  //   res.status(500).json({ status: 'fail', msg: "can't compare these" });
  //   return false;
  // }

  const updatePass = !!(
    compareCurrentPassword && new_password === repeat_new_password
  );

  if (!updatePass)
    res
      .status(500)
      .json({ status: "fail", msg: "new pass is not equal with repeat pass" });

  // hash password
  if (updatePass) {
    user.password = bcrypt.hashSync(new_password, 10);
  }

  // save user
  await user.save();

  res.status(200).json({ status: "ok", msg: "password updated" });
});

// create user

router.post("/register", (req, res) => {
  userController
    .create(req.body)
    .then(() => res.json({ status: "ok" }))
    .catch(() => {
      res.json({ status: "fail", msg: "user is exist" });
    });
});

// auth user

// middleware

const authToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null)
    return res.status(500).json({ status: "fail", msg: "No Token" });

  jwt.verify(token, config.secret, (err, user) => {
    if (err)
      return res.status(500).json({ status: "fail", msg: "Invalid Token" });
    req.user = user;
    next();
  });
};
//

router.get("/authorize", authToken, (req, res) => {
  res.json({ status: "ok" });
});

router.get("/secret", authToken, (req, res) => {
  res.json({ status: "ok" });
});

router.post("/authentication", async (req, res) => {
  const user = await userController.authentication(req.body);

  if (user) {
    res.json(user);
  }

  res.status(500).send({ status: "fail", msg: "incorrect login or password" });
});

module.exports = router;
