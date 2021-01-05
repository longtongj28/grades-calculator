const express = require("express");
const router = express.Router();

// Course Model
// Course, CourseCategory, CategoryAssignment models.
const userCourse = require("../models/Course");

// get all course names
router.get("/", (req, res) => {
  userCourse.Course.find().then((courses) => res.json(courses));
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
    categoryName: req.body.categoryName,
  });

  userCourse.Course.findById(req.body.courseID).then((foundCourse) => {
    foundCourse.courseCategories.push(newCategory);
    newCategory.save();
    foundCourse.save().then((savedCourse) => res.json(savedCourse));
  });
});

//add an assignment to a category
router.post("/category/assignment", (req, res) => {
  const newAssignment = new userCourse.CategoryAssignment({
    username:req.body.username,
    categoryName: req.body.categoryName,
    assignmentName: req.body.assignmentName,
    score: req.body.score,
  });

  userCourse.CourseCategory.findById(req.body.categoryID).then((foundCategory) => {
    foundCategory.assignments.push(newAssignment);
    newAssignment.save();
    foundCategory.save().then((savedCategory) => res.json(savedCategory));
  })
  
  
});

router.delete("/:id", (req, res) => {
  userCourse.Course.findById(req.params.id)
    .then((course) => course.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});
module.exports = router;
