const express = require('express');
const bodyParser = require('body-parser');
const courseController = require('./course.controller');
const mongoIdValidator = require('../middlewares/mongoIdValidator');
const errorHandler = require('../middlewares/errorHandler');

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.get('/courses', courseController.getCourses);

router.get('/courses/:courseId', mongoIdValidator('courseId'), courseController.getCourseById);

router.post('/courses', courseController.createCourse);

router.put('/courses/:courseId', mongoIdValidator('courseId'), courseController.updateCourse);

router.delete('/courses/:courseId', mongoIdValidator('courseId'), courseController.deleteCourse);

router.use(errorHandler);

module.exports = router;
