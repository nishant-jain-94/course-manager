const request = require('supertest');
const mongoose = require('mongoose');
const should = require('should');
const app = require('../app');
const courseFixture = require('../__fixtures__/course.fixture.json');

describe('Course App Tests', () => {
  beforeAll(async () => {
    await mongoose.connection.createCollection('courses');
    await mongoose.connection.db.collection('courses').insertMany(courseFixture);
  });

  test('Should be able to get all the courses from the store', (done) => {
    request(app)
      .get('/courses')
      .expect(200)
      .end((err, res) => {
        should.not.exist(err);
        should.exist(res);
        res.body.should.be.an.instanceOf(Array);
        res.body.length.should.be.exactly(courseFixture.length);
        const sampleCourseBody = res.body[0];
        sampleCourseBody.should.have.properties(['id', 'courseTitle', 'courseDescription', 'toc', 'members', 'recordedSessions', 'createdAt', 'isArchived']);
        done();
      });
  });
});
