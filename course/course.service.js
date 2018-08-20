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
  termsAndConditions: String,
  isArchived: {
    type: Boolean,
    default: false,
  },
});

const getCourses = async function getCourses() {
  const courses = await this.find({});
  return courses;
};

const getCourseById = async function getCourseById(courseId) {
  const fetchedCourse = await this.findById(courseId);
  return fetchedCourse;
};

const createCourse = async function createCourse(course) {
  const courseToBeCreated = new this(course);
  const createdCourse = await courseToBeCreated.save();
  return createdCourse;
};

const updateCourse = async function updateCourse(courseId, updatedCourseProperties) {
  const updatedCourse = await this.update({ id: courseId }, updatedCourseProperties, { new: true });
  return updatedCourse;
};

const deleteCourse = async function deleteCourse(courseId) {
  const updatedCourse = await this.update({ id: courseId }, { isArchived: true }, { new: true });
  return updatedCourse;
};

courseSchema.statics.getCourses = getCourses;
courseSchema.statics.getCourseById = getCourseById;
courseSchema.statics.createCourse = createCourse;
courseSchema.statics.updateCourse = updateCourse;
courseSchema.statics.deleteCourse = deleteCourse;

module.exports = mongoose.model('Course', courseSchema, 'courses');
