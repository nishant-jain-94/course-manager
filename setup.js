const MongodbMemoryServer = require('mongodb-memory-server');

const mongod = new MongodbMemoryServer.default({
  instance: {
    dbName: 'jest',
  },
  binary: {
    version: '3.2.18',
  },
});
