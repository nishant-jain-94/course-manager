const HttpStatus = require('http-status-codes');
const courseService = require('./course.service');

const getCourses = async (req, res, next) => {
  try {
    const courses = await courseService.getCourses();
    res.status(HttpStatus.OK).json(courses);
  } catch (e) {
    next(e);
  }
};

const getCourseById = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const foundCourse = await courseService.getCourseById(courseId);
    res.status(HttpStatus.OK).json(foundCourse);
  } catch (error) {
    next(error);
  }
};

const createCourse = async (req, res, next) => {
  try {
    const courseToBeCreated = req.body;
    const createdCourse = await courseService.createCourse(courseToBeCreated);
    res.status(HttpStatus.CREATED).json(createdCourse);
  } catch (error) {
    next(error);
  }
};

const updateCourse = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const courseToBeUpdatedWith = req.body;
    const updatedCourse = await courseService.updateCourse(courseId, courseToBeUpdatedWith);
    res.status(HttpStatus.OK).json(updatedCourse);
  } catch (error) {
    next(error);
  }
};

const deleteCourse = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const deletedCourse = await courseService.deleteCourse(courseId);
    res.status(HttpStatus.NO_CONTENT).json(deletedCourse);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};
