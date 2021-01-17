const express = require("express");
const router = express.Router();

// Course Model
// Course, CourseCategory, CategoryAssignment models.
const userCourse = require("../models/Course");

// get all course names
router.get("/", (req, res) => {
  userCourse.Course.find().then((courses) => res.json(courses));
});

router.get("/:id", (req, res) => {
  userCourse.Course.findById(req.params.id).then((courses) =>
    res.json(courses)
  );
});

// add a new course
router.post("/", (req, res) => {
  const newCourse = new userCourse.Course({
    username: req.body.username,
    courseName: req.body.courseName,
  });

  newCourse.save().then((course) => res.json(course));
});

//add a new category to a course
router.post("/category", (req, res) => {
  const newCategory = new userCourse.CourseCategory({
    username: req.body.username,
    courseID: req.body.courseID,
    categoryName: req.body.categoryName,
    percentWorth: req.body.percentWorth,
  });

  userCourse.Course.findById(req.body.courseID).then((foundCourse) => {
    foundCourse.courseCategories.push(newCategory);
    newCategory.save();
    foundCourse.save().then((savedCourse) => res.json(savedCourse));
  });
});

// edit course name
router.put("/", (req, res) => {
  userCourse.Course.findById(req.body.courseID).then((foundCourse) => {
    foundCourse.courseName = req.body.newCourseName;
    foundCourse.save().then((savedCourse) => res.send(savedCourse));
  });
});

router.delete("/:id", (req, res) => {
  userCourse.CategoryAssignment.find().then((foundAssignments) => {
    for (let i = 0; i < foundAssignments.length; i++) {
      if (foundAssignments[i].courseID === req.params.id.toString()) {
        foundAssignments[i].remove();
      }
    }
  });
  userCourse.CourseCategory.find().then((foundCategories) => {
    for (let i = 0; i < foundCategories.length; i++) {
      if (foundCategories[i].courseID === req.params.id.toString()) {
        foundCategories[i].remove();
      }
    }
  });
  userCourse.Course.findById(req.params.id)
    .then((course) => course.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});
module.exports = router;
