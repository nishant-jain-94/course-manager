const events = require('events');
const should = require('should');
const mongoose = require('mongoose');
const httpMocks = require('node-mocks-http');

const courseController = require('../course.controller');
const courseService = require('../course.service');

const courses = [
  {
    id: '507f191e810c19729de860ea',
    courseTitle: 'Introduction to NodeJS',
    courseDescription: 'This course is the introduction to the nodejs',
    toc: '# Introduction to NodeJS',
    termsAndConditions: 'These are the terms and conditions',
    recordedSessions: [
      'http://youtube.com/507f191e810c19729de860ea',
    ],
    members: [
      {
        id: 'string',
        name: 'string',
        emailId: 'string',
        role: 'string',
      },
    ],
  },
];

const mockCourse = {
  id: '507f191e810c19729de860eb',
  courseTitle: 'Introduction to NodeJS',
  courseDescription: 'This course is the introduction to the nodejs',
  toc: '# Introduction to NodeJS',
  termsAndConditions: 'These are the terms and conditions',
  recordedSessions: [
    'http://youtube.com/507f191e810c19729de860eb',
  ],
  members: [
    {
      id: '507f191e810c19729de860eb',
      name: 'Fake Name',
      emailId: 'fake@mail.com',
      role: 'admin',
    },
  ],
};

let response;

describe('Course Controller Test', () => {

  beforeEach(() => {
    response = httpMocks.createResponse({
      eventEmitter: events.EventEmitter,
    });
  });

  test('getCourses should get all the courses', (done) => {
    const getCoursesSpy = jest.spyOn(courseService, 'getCourses').mockImplementation(() => new Promise(resolve => resolve(courses)));

    const request = httpMocks.createRequest({
      method: 'GET',
      url: '/courses',
    });

    response.on('end', () => {
      const responseData = JSON.parse(response._getData());
      should.exist(responseData);
      responseData.should.be.an.instanceOf(Array);
      responseData[0].should.be.an.instanceOf(Object);
      responseData[0].should.have.properties(['id', 'courseTitle', 'courseDescription', 'toc', 'termsAndConditions', 'recordedSessions', 'members']);
      expect(getCoursesSpy).toBeCalled();
      expect(getCoursesSpy).toHaveBeenCalledTimes(1);
      done();
    });

    courseController.getCourses(request, response, (err) => { console.log(err); });
  });

  test('getCourseById should be able to find the course by Id', (done) => {
    const getCourseByIdSpy = jest.spyOn(courseService, 'getCourseById').mockImplementation(() => new Promise(resolve => resolve(courses[0])));

    const request = httpMocks.createRequest({
      method: 'GET',
      url: '/courses/507f191e810c19729de860ea',
      params: {
        courseId: '507f191e810c19729de860ea',
      },
    });

    courseController.getCourseById(request, response, (err) => { console.log(err); });

    response.on('end', () => {
      const responseData = JSON.parse(response._getData());
      should.exist(responseData);
      responseData.should.be.an.instanceOf(Object);
      responseData.id.should.be.exactly('507f191e810c19729de860ea');
      responseData.should.have.properties(['id', 'courseTitle', 'courseDescription', 'toc', 'termsAndConditions', 'recordedSessions', 'members']);
      expect(getCourseByIdSpy).toBeCalled();
      expect(getCourseByIdSpy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  test('createCourse should create a course', (done) => {
    jest.spyOn(courseService, 'createCourse').mockImplementation((courseToBeCreated) => {
      const createdCourse = {
        ...courseToBeCreated,
        id: mongoose.Types.ObjectId(),
      };
      return new Promise(resolve => resolve(createdCourse));
    });

    const courseToBeCreated = {
      courseTitle: 'Introduction to NodeJS',
      courseDescription: 'This course is the introduction to the nodejs',
      toc: '# Introduction to NodeJS',
      termsAndConditions: 'These are the terms and conditions',
      recordedSessions: [
        'http://youtube.com/507f191e810c19729de860eb',
      ],
      members: [
        {
          id: '507f191e810c19729de860eb',
          name: 'Fake Name',
          emailId: 'fake@mail.com',
          role: 'admin',
        },
      ],
    };

    const request = httpMocks.createRequest({
      method: 'POST',
      url: '/courses',
      body: courseToBeCreated,
    });

    response.on('end', () => {
      const responseData = JSON.parse(response._getData());
      should.exist(responseData);
      response.statusCode.should.be.exactly(201);
      responseData.should.be.an.instanceOf(Object);
      responseData.should.have.properties(['id', 'courseTitle', 'courseDescription', 'toc', 'termsAndConditions', 'recordedSessions', 'members']);
      done();
    });

    courseController.createCourse(request, response, (error) => { console.log(error); });
  });

  test('updateCourse should be able to update a course', (done) => {
    const updateCourseSpy = jest.spyOn(courseService, 'updateCourse').mockImplementation((courseId, courseToBeUpdated) => ({ ...courses[0], ...courseToBeUpdated }));

    const updateCourseBodyPayload = {
      courseDescription: 'Updated Course Description',
    };

    const request = httpMocks.createRequest({
      method: 'PUT',
      body: updateCourseBodyPayload,
      params: {
        courseId: '507f191e810c19729de860ea',
      },
    });

    response.on('end', () => {
      const responseData = JSON.parse(response._getData());
      should.exist(responseData);
      responseData.should.be.an.instanceOf(Object);
      responseData.id.should.be.exactly('507f191e810c19729de860ea');
      responseData.courseDescription.should.be.exactly('Updated Course Description');
      expect(updateCourseSpy).toBeCalled();
      expect(updateCourseSpy).toHaveBeenCalledTimes(1);
      expect(updateCourseSpy).toBeCalledWith('507f191e810c19729de860ea', updateCourseBodyPayload);
      done();
    });

    courseController.updateCourse(request, response, (err) => { console.log(err); });
  });

  test('deleteCourse should be able to delete a course by id', (done) => {
    jest.spyOn(courseService, 'deleteCourse')
      .mockImplementation(() => ({ ...courses[0], isArchived: true }));

    const request = httpMocks.createRequest({
      method: 'DELETE',
      url: '/courses/507f191e810c19729de860ea',
      params: {
        courseId: '507f191e810c19729de860ea',
      },
    });

    response.on('end', () => {
      const responseData = JSON.parse(response._getData());
      should.exist(responseData);
      responseData.should.be.an.instanceOf(Object);
      responseData.should.have.property('isArchived');
      responseData.isArchived.should.be.exactly(true);
      done();
    });

    courseController.deleteCourse(request, response, (err) => { console.log(err); });
  });
});
