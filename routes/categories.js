const express = require("express");
const router = express.Router();
// Course Model
// Course, CourseCategory, CategoryAssignment models.
const userCourse = require("../models/Course");

router.get("/", (req, res) => {
  userCourse.CourseCategory.find().then((courseCategories) =>
    res.json(courseCategories)
  );
});

//update category
// need: courseID, categoryName, newCategoryName, newPercentWorth, categoryID
router.put("/", (req, res) => {
  userCourse.Course.findById(req.body.courseID).then((foundCourse) => {
    for (let i = 0; i < foundCourse.courseCategories.length; i++) {
      if (
        foundCourse.courseCategories[i].categoryName === req.body.categoryName
      ) {
        foundCourse.courseCategories[i].categoryName = req.body.newCategoryName;
        foundCourse.courseCategories[i].percentWorth = req.body.newPercentWorth;
        foundCourse.save();
      }
    }
  });

  userCourse.CourseCategory.findById(req.body.categoryID).then(
    (foundCategory) => {
      foundCategory.categoryName = req.body.newCategoryName;
      foundCategory.percentWorth = req.body.newPercentWorth;
      foundCategory.save().then((savedCategory) => res.json(savedCategory));
    }
  );
});

router.delete("/", (req, res) => {
  userCourse.Course.findById(req.body.courseID).then((foundCourse)=> {
    foundCourse.courseCategories.pull({_id: req.body.categoryID});
    foundCourse.save();
  })

  userCourse.CourseCategory.findById(req.body.categoryID).then(
    (foundCategory) => {
      foundCategory
        .remove()
        .then(() => res.json({ remove: "successful" }))
        .catch((err) => res.status(404).json({ remove: failed }));
    }
  );

  userCourse.CategoryAssignment.find().then((allAssignments) => {
    for (let i = 0; i < allAssignments.length; i ++) {
      if (allAssignments[i].categoryID === req.body.categoryID) {
        allAssignments[i].remove();
      }
    }
  }).catch((err) => res.status(404).json({success: false}));
});

module.exports = router;
