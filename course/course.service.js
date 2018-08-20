const mongoose = require('mongoose');

const { Schema } = mongoose;

const courseSchema = new Schema({
  courseTitle: String,
  courseDescription: String,
  toc: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  recordedSessions: [String],
  members: {
    name: String,
    email: String,
    role: String,
  },
});

const getCourses = () => {};
const getCourseById = () => {};
const createCourse = () => {};
const updateCourse = () => {};
const deleteCourse = () => {};

courseSchema.statics.getCourses = getCourses;
courseSchema.statics.getCourseById = getCourseById;
courseSchema.statics.createCourse = createCourse;
courseSchema.statics.updateCourse = updateCourse;
courseSchema.statics.deleteCourse = deleteCourse;

module.exports = mongoose.model('Course', courseSchema);
