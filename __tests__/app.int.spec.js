const request = require('supertest');
const should = require('should');
const HttpStatus = require('http-status-codes');

const app = require('../app');
const courseFixture = require('../__fixtures__/course.fixture.json');
const CourseModel = require('../course/course.service');

describe('Course App Tests', () => {
  jest.setTimeout(15000);
  beforeAll(() => {
    process.nextTick(async () => {
      await CourseModel.insertMany(courseFixture);
    });
  });

  test('Should be able to get all the courses from the store', (done) => {
    request(app)
      .get('/courses')
      .expect(HttpStatus.OK)
      .end((err, res) => {
        should.not.exist(err);
        should.exist(res);
        res.body.should.be.an.instanceOf(Array);
        res.body.length.should.be.exactly(courseFixture.length);
        const sampleCourseBody = res.body[0];
        sampleCourseBody.should.have.properties(['_id', 'courseTitle', 'courseDescription', 'toc', 'members', 'recordedSessions', 'createdAt', 'isArchived']);
        done();
      });
  });

  test('Should be able to get the course by id', (done) => {
    request(app)
      .get('/courses/5b7ab734b4725a14a5f25bd7')
      .expect(HttpStatus.OK)
      .end((err, res) => {
        should.not.exist(err);
        should.exist(res);
        res.body.should.be.an.instanceOf(Object);
        res.body._id.should.be.exactly('5b7ab734b4725a14a5f25bd7');
        res.body.should.have.properties(['_id', 'courseTitle', 'courseDescription', 'toc', 'members', 'recordedSessions', 'createdAt', 'isArchived']);
        done();
      });
  });

  test('Should return 404 Course Not Found when the course is not available', (done) => {
    request(app)
      .get('/courses/5b7ab734b4725a14a5f25bd8')
      .expect(HttpStatus.NOT_FOUND)
      .end((err, res) => {
        should.not.exist(err);
        should.exist(res);
        done();
      });
  });

  test('Should return 400 Bad Request when the courseId is wrong', (done) => {
    request(app)
      .get('/courses/5b7ab734b4725a14a5f25f')
      .expect(HttpStatus.BAD_REQUEST)
      .end((err, res) => {
        should.not.exist(err);
        should.exist(res);
        done();
      });
  });

  test('Should return 201 Created when the course is created', (done) => {
    request(app)
      .post('/courses')
      .type('form')
      .send({
        courseTitle: 'Fundamentals of NodeJS',
        courseDescription: 'This course deals with the fundamentals of the nodejs',
        toc: 'This is the TOC String',
        members: [
          {
            name: 'Raj',
            emailId: 'Raj@email.com',
            role: 'cadet',
          },
        ],
      })
      .set('Accept', 'application/json')
      .expect(HttpStatus.CREATED)
      .end((err, res) => {
        should.not.exist(err);
        should.exist(res);
        done();
      });
  });

  test('Should return status 404 on course update, when the course is not available', (done) => {
    const updatedCourse = {
      courseDescription: 'This is the updated description of nodejs',
      toc: 'This is the updated Table of Contents',
    };

    request(app)
      .put('/courses/5b7ab734b4725a14a5f25bd8')
      .type('form')
      .send(updatedCourse)
      .set('Accept', 'application/json')
      .expect(HttpStatus.NOT_FOUND)
      .end(done);
  });

  test('Should return status 200 on course update, when the course is available and updated', (done) => {
    const updatedCourse = {
      courseDescription: 'This is the updated description of nodejs',
      toc: 'This is the updated Table of Contents',
    };

    request(app)
      .put('/courses/5b7ab734b4725a14a5f25bd7')
      .type('form')
      .send(updatedCourse)
      .set('Accept', 'application/json')
      .expect(HttpStatus.OK)
      .end((err, res) => {
        should.not.exist(err);
        should.exist(res);
        should.exist(res.body);
        res.body.courseDescription.should.be.exactly(updatedCourse.courseDescription);
        res.body.toc.should.be.exactly(updatedCourse.toc);
        res.body.should.have.properties(['_id', 'courseTitle', 'courseDescription', 'toc', 'members', 'recordedSessions', 'createdAt', 'isArchived']);
        done();
      });
  });

  test('Should return status 204 on course deletion, if the course to be deleted is available', (done) => {
    request(app)
      .delete('/courses/5b7ab734b4725a14a5f25bd7')
      .set('Accept', 'application/json')
      .expect(HttpStatus.NO_CONTENT)
      .end(done);
  });

  test('Should return status 404 on course deletion, if the course to be deleted is not found', (done) => {
    request(app)
      .delete('/courses/5b7ab734b4725a14a5f25bd8')
      .set('Accept', 'application/json')
      .expect(HttpStatus.NOT_FOUND)
      .end(done);
  });
});
