const config = {
  MONGODB_URL: process.env.MONGODB_URL ? process.env.MONGODB_URL : 'mongodb://localhost',
  MONGODB_NAME: 'course-manager',
  PORT: process.env.PORT ? process.env.PORT : 8090,
};

module.exports = config;
