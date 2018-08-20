
const HttpStatus = require('http-status-codes');

const errorHandler = (err, req, res, next) => {
  if (err.name === 'ValidationError') {
    res.status(HttpStatus).json(err.errors);
  } else {
    res.status(500).send(err.message);
    next();
  }
};

module.exports = errorHandler;
