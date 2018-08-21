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
  members: [{
    name: String,
    emailId: String,
    role: String,
  }],
  termsAndConditions: String,
  isArchived: {
    type: Boolean,
    default: false,
  },
});

const getCourses = async function getCourses() {
  const courses = await this.find({}).exec();
  return courses;
};

const getCourseById = async function getCourseById(courseId) {
  const fetchedCourse = await this.findById(courseId).exec();
  return fetchedCourse;
};

const createCourse = async function createCourse(course) {
  const courseToBeCreated = new this(course);
  const createdCourse = await courseToBeCreated.save();
  return createdCourse;
};

const updateCourse = async function updateCourse(courseId, updatedCourseProperties) {
  const updatedCourse = await this.findOneAndUpdate(
    { _id: courseId },
    updatedCourseProperties,
    { new: true, runValidators: true },
  ).exec();
  return updatedCourse;
};

const deleteCourse = async function deleteCourse(courseId) {
  const deletedCourse = await this.findOneAndUpdate(
    { _id: courseId },
    { isArchived: true },
    { new: true },
  ).exec();
  return deletedCourse;
};

courseSchema.statics.getCourses = getCourses;
courseSchema.statics.getCourseById = getCourseById;
courseSchema.statics.createCourse = createCourse;
courseSchema.statics.updateCourse = updateCourse;
courseSchema.statics.deleteCourse = deleteCourse;

module.exports = mongoose.model('courses', courseSchema, 'courses');
