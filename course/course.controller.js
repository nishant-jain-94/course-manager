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
    if (foundCourse) {
      res.status(HttpStatus.OK).json(foundCourse);
    } else {
      res.status(404).json();
    }
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
    if (updatedCourse) {
      res.status(HttpStatus.OK).json(updatedCourse);
    } else {
      res.status(HttpStatus.NOT_FOUND).json();
    }
  } catch (error) {
    next(error);
  }
};

const deleteCourse = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const deletedCourse = await courseService.deleteCourse(courseId);
    if (deletedCourse) {
      res.status(HttpStatus.NO_CONTENT).json();
    } else {
      res.status(HttpStatus.NOT_FOUND).json();
    }
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
