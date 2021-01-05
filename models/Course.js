const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategoryAssignment = new Schema({
  username: { type: String, required: true },
  categoryName: { type: String, default: "Course Category" },
  assignmentName: { type: String, default: "Assignment Name" },
  score: { type: Number, default: 100, min: 0 },
});

const CourseCategory = new Schema({
  username: { type: String, required: true },
  categoryName: { type: String, default: "Course Category" },
  assignments: [CategoryAssignment],
});

const CourseSchema = new Schema({
  username: { type: String, required: true },
  courseName: {
    type: String,
    unique: true,
    required: true,
  },
  courseCategories: [CourseCategory],
});

exports.Course = mongoose.model("course", CourseSchema);
exports.CourseCategory = mongoose.model("category", CourseCategory);
exports.CategoryAssignment = mongoose.model("assignment", CategoryAssignment);
