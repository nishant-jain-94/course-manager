const should = require('should');
const mongoose = require('mongoose');

const config = require('../../app.config');

const CourseModel = require('../course.service');

const coursefixtures = require('../../__fixtures__/course.fixture.json');

let listOfCourses;

// [
//   {
//     courseTitle: 'Introduction to NodeJS',
//     courseDescription: 'This course is the introduction to the nodejs',
//     toc: '# Introduction to NodeJS',
//     termsAndConditions: 'These are the terms and conditions',
//     recordedSessions: [
//       'http://youtube.com/507f191e810c19729de860ea',
//     ],
//     members: [
//       {
//         name: 'string',
//         emailId: 'string',
//         role: 'string',
//       },
//     ],
//   },
// ]);
// }


describe('Course Service', () => {
  beforeAll(async () => {
    mongoose.connect(`${config.MONGODB_URL}`);
    listOfCourses = await CourseModel.insertMany(coursefixtures);
  });

  test('Should be able to get courses from the db', async () => {
    const courses = await CourseModel.getCourses();
    should.exist(courses);
    courses.should.be.an.instanceOf(Array);
    courses[0].should.be.an.instanceOf(Object);
    courses[0].should.have.properties(['_id', 'courseTitle', 'courseDescription', 'toc', 'termsAndConditions', 'recordedSessions', 'members']);
  });

  test('Should be able to getCourseById from the db', async () => {
    const courseId = listOfCourses[0].id;
    const course = await CourseModel.getCourseById(courseId);
    should.exist(course);
    course.should.be.an.instanceOf(Object);
    course.should.have.properties(['_id', 'courseTitle', 'courseDescription', 'toc', 'termsAndConditions', 'recordedSessions', 'members']);
  });

  test('Should be able to update course by courseId from the db', async () => {
    const courseId = listOfCourses[0].id;
    const updatedCourseProps = {
      courseDescription: 'This is the updated course description',
      toc: 'This is the updated toc',
    };
    const updatedCourse = await CourseModel.updateCourse(courseId, updatedCourseProps);
    should.exist(updatedCourse);
    updatedCourse.courseDescription.should.be.exactly(updatedCourseProps.courseDescription);
    updatedCourse.toc.should.be.exactly(updatedCourseProps.toc);
    updatedCourse.should.have.properties(['_id', 'courseTitle', 'courseDescription', 'toc', 'termsAndConditions', 'recordedSessions', 'members']);
  });

  test('Should be able to delete course by courseId from the db', async () => {
    const courseId = listOfCourses[0].id;
    const deletedCourse = await CourseModel.deleteCourse(courseId);
    should.exist(deletedCourse);
    deletedCourse.isArchived.should.be.exactly(true);
  });
});
