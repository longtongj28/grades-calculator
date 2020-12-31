const express = require("express");
const router = express.Router();

// Course Model
const Course = require("../models/Course");

router.get("/", (req, res) => {
  Course.find().then((courses) => res.json(courses));
});

router.post("/", (req, res) => {
  const newCourse = new Course({
    courseName: req.body.courseName,
  });

  newCourse.save().then((course) => res.json(course));
});

router.delete("/:id", (req, res) => {
  Course.findById(req.params.id)
    .then((course) => course.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));

});
module.exports = router;
