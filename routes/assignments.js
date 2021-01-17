const express = require("express");
const router = express.Router();
// Course Model
// Course, CourseCategory, CategoryAssignment models.
const userCourse = require("../models/Course");

//get all assignments
router.get("/", (req, res) => {
  userCourse.CategoryAssignment.find().then((assignments) =>
    res.json(assignments)
  );
});

router.get("/:categoryID", (req, res) => {
  userCourse.CourseCategory.findById(
    req.params.categoryID
  ).then((foundCategory) => res.json(foundCategory.assignments));
});

//add an assignment to a category
// need categoryID , username, categoryName, assignmentName, score
router.post("/", (req, res) => {
  const newAssignment = new userCourse.CategoryAssignment({
    username: req.body.username,
    courseID: req.body.courseID,
    categoryID: req.body.categoryID,
    assignmentName: req.body.assignmentName,
    scoreNum: req.body.scoreNum,
    scoreDenom: req.body.scoreDenom,
  });

  userCourse.CourseCategory.findById(req.body.categoryID).then(
    (foundCategory) => {
      foundCategory.assignments.push(newAssignment);
      newAssignment.save();
      foundCategory.save().then((savedCategory) => res.json(savedCategory));
    }
  );
});

//update an assignment
//needs: assignmentID, categoryID, newAssignmentName, newScoreNum, newScoreDenom
router.put("/", (req, res) => {
  userCourse.CourseCategory.findById(req.body.categoryID).then(
    (foundCategory) => {
      for (let i = 0; i < foundCategory.assignments.length; i++) {
        if(foundCategory.assignments[i]._id.toString() === req.body.assignmentID) {
          foundCategory.assignments[i].assignmentName =
            req.body.newAssignmentName;
          foundCategory.assignments[i].scoreNum = req.body.newScoreNum;
          foundCategory.assignments[i].scoreDenom = req.body.newScoreDenom;
          foundCategory.save();
        }
      }
    }
  );

  userCourse.CategoryAssignment.findById(req.body.assignmentID).then(
    (foundAssignment) => {
      foundAssignment.assignmentName = req.body.newAssignmentName;
      foundAssignment.scoreNum = req.body.newScoreNum;
      foundAssignment.scoreDenom = req.body.newScoreDenom;
      foundAssignment.save().then(() => res.json({ success: true }));
    }
  );
});

router.delete("/", (req, res) => {
  userCourse.CategoryAssignment.findById(req.body.assignmentID)
    .then((foundAssignment) => {
      foundAssignment.remove();
    })
    .catch((err) => res.status(404).send(err));

  userCourse.CourseCategory.findById(req.body.categoryID).then(
    (foundCategory) => {
      foundCategory.assignments.pull({ _id: req.body.assignmentID });
      foundCategory.save().then(() => res.json({ remove: "successful" }));
    }
  );
});
module.exports = router;
