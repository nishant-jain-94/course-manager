const HttpStatus = require('http-status-codes');
const mongoose = require('mongoose');

const mongoIdValidator = property => (req, res, next) => {
  if (mongoose.Types.ObjectId.isValid(req.params[property])) {
    next();
  } else {
    res.status(HttpStatus.BAD_REQUEST).send(`Invalid ${property}`);
  }
};

module.exports = mongoIdValidator;
