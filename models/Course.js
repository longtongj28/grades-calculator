const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    courseName: {
        type: String,
        unique:true,
        required: true
    },
    grade: {
        type: String,
        default: 'A'
    }
});

module.exports = Course = mongoose.model('course', CourseSchema);