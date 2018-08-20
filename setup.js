const MongodbMemoryServer = require('mongodb-memory-server');
const config = require('./app.config');

const mongod = new MongodbMemoryServer.default({
  instance: {
    dbName: config.MONGODB_NAME,
  },
  binary: {
    version: '3.2.18',
  },
});

module.exports = async () => {
  config.MONGODB_URL = await mongod.getConnectionString();
  process.env.MONGODB_URL = config.MONGODB_URL;
  global.__MONGOD__ = mongod;
};
