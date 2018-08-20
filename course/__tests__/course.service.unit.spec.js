const should = require('should');
const mongoose = require('mongoose');

const config = require('../../app.config');

const CourseModel = require('../course.service');

let listOfCourses;

describe('Course Service', () => {
  beforeAll(async () => {
    mongoose.connect(`${config.MONGODB_URL}`);
    listOfCourses = await CourseModel.insertMany([
      {
        courseTitle: 'Introduction to NodeJS',
        courseDescription: 'This course is the introduction to the nodejs',
        toc: '# Introduction to NodeJS',
        termsAndConditions: 'These are the terms and conditions',
        recordedSessions: [
          'http://youtube.com/507f191e810c19729de860ea',
        ],
        members: [
          {
            name: 'string',
            emailId: 'string',
            role: 'string',
          },
        ],
      },
    ]);
  });

  test('Should be able to get courses from the db', async () => {
    const courses = await CourseModel.getCourses();
    should.exist(courses);
    courses.should.be.an.instanceOf(Array);
    courses[0].should.be.an.instanceOf(Object);
    courses[0].should.have.properties(['id', 'courseTitle', 'courseDescription', 'toc', 'termsAndConditions', 'recordedSessions', 'members']);
    courses[0].isArchived.should.be.exactly(false);
  });

  test('Should be able to getCourseById from the db', async () => {
    const courseId = listOfCourses[0].id;
    const course = await CourseModel.getCourseById(courseId);
    should.exist(course);
    course.should.be.an.instanceOf(Object);
    course.should.have.properties(['id', 'courseTitle', 'courseDescription', 'toc', 'termsAndConditions', 'recordedSessions', 'members']);
    course.isArchived.should.be.exactly(false);
  });
});
