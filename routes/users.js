const express = require("express");
const router = express.Router();

const User = require("../models/User");
const UserCourse = require("../models/Course");

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
    .catch((err) => res.status(404).json({ error: "UserExists" }));
});

router.put("/update_password", (req, res) => {
  User.findById(req.body.userID).then((foundUser) => {
    if (req.body.oldPassword === foundUser.password) {
      foundUser.password = req.body.newPassword;
      foundUser.save().then(() => res.json({success: true}));
    }
  });
});
router.put("/update_username", (req, res) => {
  User.findById(req.body.userID).then((foundUser) => {
    foundUser.username = req.body.newUsername;
    foundUser.save().then((savedUser) => res.json(savedUser));
  });

  UserCourse.Course.find().then((foundCourses) => {
    for (let i = 0; i < foundCourses.length; i++) {
      if (foundCourses[i].username === req.body.oldUsername) {
        foundCourses[i].username = req.body.newUsername;
        for (let j = 0; j < foundCourses[i].courseCategories.length; j++) {
          foundCourses[i].courseCategories[j].username = req.body.newUsername;
        }
        foundCourses[i].save();
      }
    }
  });
  UserCourse.CourseCategory.find().then((foundCategories) => {
    for (let i = 0; i < foundCategories.length; i++) {
      if (foundCategories[i].username === req.body.oldUsername) {
        foundCategories[i].username = req.body.newUsername;
        for (let j = 0; j < foundCategories[i].assignments.length; j++) {
          foundCategories[i].assignments[j].username = req.body.newUsername;
        }
        foundCategories[i].save();
      }
    }
  });
  UserCourse.CategoryAssignment.find().then((foundAssignments) => {
    for (let i = 0; i < foundAssignments.length; i++) {
      if (foundAssignments[i].username === req.body.oldUsername) {
        foundAssignments[i].username = req.body.newUsername;
        foundAssignments[i].save();
      }
    }
  });
});
router.delete("/", (req, res) => {
  User.findById(req.body.userID).then((foundUser) => {
    foundUser.remove();
  });

  UserCourse.Course.find().then((foundCourses) => {
    for (let i = 0; i < foundCourses.length; i++) {
      if (foundCourses[i].username === req.body.username) {
        foundCourses[i].remove();
      }
    }
  });

  UserCourse.CourseCategory.find().then((foundCategories) => {
    for (let i = 0; i < foundCategories.length; i++) {
      if (foundCategories[i].username === req.body.username) {
        foundCategories[i].remove();
      }
    }
  });

  UserCourse.CategoryAssignment.find().then((foundAssignments) => {
    for (let i = 0; i < foundAssignments.length; i++) {
      if (foundAssignments[i].username === req.body.username) {
        foundAssignments[i].remove().then(() => res.json({ success: true }));
      }
    }
  });
});
module.exports = router;
