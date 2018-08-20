const request = require('supertest');
const express = require('express');
require('../course.controller');
const courseRoutes = require('../course.routes');

jest.mock('../course.controller');

const app = express();
app.use(courseRoutes);

describe('Course Router Test', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('GET /courses endpoint should call the getCourses method of the course controller', (done) => {
    request(app)
      .get('/courses')
      .expect(200)
      .end((err, response) => {
        expect(err).toBeNull();
        expect(response).not.toBeNull();
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
        done();
      });
  });

  test('GET /courses/{courseId} endpoint should call the getCourseById', () => {
    request(app)
      .get('/courses/507f191e810c19729de860ea')
      .expect(200)
      .end((err, res) => {
        expect(err).toBeNull();
        expect(res).not.toBeNull();
        expect(res.status).toBe(200);
      });
  });

  test('POST /courses endpoint should be able to call createCourse method of the courseController', (done) => {
    request(app)
      .post('/courses')
      .expect(201)
      .end((err, res) => {
        expect(err).toBeNull();
        expect(res).not.toBeNull();
        expect(res.status).toBe(201);
        done();
      });
  });

  test('DELETE /courses/{courseId} endpoint should call the deleteCourse method of the courseController', (done) => {
    request(app)
      .delete('/courses/507f191e810c19729de860ea')
      .end((err, res) => {
        expect(err).toBeNull();
        expect(res).not.toBeNull();
        expect(res.status).toBe(204);
        done();
      });
  });
});
