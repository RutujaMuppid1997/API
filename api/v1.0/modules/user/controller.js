const object = require('./user');
const functions = require('../../../../common/functions');

const controller = {
  // Add User API
  checkIfValid: async (req, res, next) => {
    try {
      const status = await object
        .userService()
        .checkIfValid(res.locals.requestedData);
      res.send(
        functions.responseGenerator(
          status.statusCode,
          status.message,
          status.data
        )
      );
    } catch (error) {
      return next(error);
    }
  },

 
};

module.exports = controller;
