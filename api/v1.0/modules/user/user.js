const functions = require('../../../../common/functions');
const validator = require('validator');
const statusCode = require('../../../../common/statusCode');
const message = require('../../../../common/message');
const fs = require('fs');
const db = require('../user/database/mysql/mysql');

class UserService {
  /**
   * API for Adding User if not exist
   * @param {*} req (user detials)
   * @param {*} res (json with success/failure)
   */
  async checkIfValid(info) {
    try {
      if (!validator.isEthereumAddress(info.eth_address)) {
        throw {
          statusCode: statusCode.bad_request,
          message: message.badRequest,
          data: null,
        };
      }

      let checkIfuserExists = await db.userDatabase().checkIfuserExists(info);

      if (checkIfuserExists.length !== 0) {
        return {
          statusCode: statusCode.success,
          message: message.success,
          data: {
            userData:checkIfuserExists[0],
            isvalid:true
          }
        }
      }

      return {
        statusCode: statusCode.success,
        message: message.success,
        data: {
          userData: null,
          isvalid:true
        },
      }
      
      
    } catch (error) {
      throw {
        statusCode: error.statusCode,
        message: error.message,
        data: JSON.stringify(error),
      };
    }
  }

 
}

module.exports = {
  userService: function () {
    return new UserService();
  },
};
