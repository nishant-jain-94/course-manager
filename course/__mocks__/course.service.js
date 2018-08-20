const mongoose = require('mongoose');
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

const getCourses = jest.fn().mockReturnValue(courses);
const getCourseById = jest.fn().mockReturnValue(courses[0]);
const createCourse = jest.fn(course => ({ ...course, id: mongoose.Types.ObjectId() }));
const deleteCourse = jest.fn((req, res) => res.status(204).send());
const updateCourse = jest.fn();

module.exports = {
  getCourses,
  getCourseById,
  createCourse,
  deleteCourse,
  updateCourse,
};
