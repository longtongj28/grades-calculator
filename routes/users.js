const express = require("express");
const router = express.Router();

const User = require("../models/User");

router.get("/", (req, res) => {
  User.find().then((users) => res.json(users));
});

router.post("/create", (req, res) => {
  const newUser = new User({
    username: req.body.username,
    password: req.body.password,
  });
  newUser
    .save()
    .then((user) => res.json(user))
    .catch((err) => res.status(404).json({error: "UserExists"}) );
});

module.exports = router;
