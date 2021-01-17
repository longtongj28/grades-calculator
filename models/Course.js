const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategoryAssignment = new Schema({
  username: { type: String, required: true },
  categoryID: { type: String },
  courseID: { type: String },
  assignmentName: { type: String, default: "Assignment Name" },
  scoreNum: { type: Number, default: 100, min: 0 },
  scoreDenom: { type: Number, default: 100, min: 0 },
});

const CourseCategory = new Schema({
  username: { type: String, required: true },
  courseID: { type: String },
  categoryName: { type: String, default: "Course Category" },
  percentWorth: { type: Number, default: 100 },
  assignments: [CategoryAssignment],
});

const CourseSchema = new Schema({
  username: { type: String, required: true },
  courseName: {
    type: String,
    required: true,
  },
  courseCategories: [CourseCategory],
});

exports.Course = mongoose.model("course", CourseSchema);
exports.CourseCategory = mongoose.model("category", CourseCategory);
exports.CategoryAssignment = mongoose.model("assignment", CategoryAssignment);
