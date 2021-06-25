const config = require('../config');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const randomstring = require('randomstring');
const { errorHandler } = require('./error');
const rp = require('request-promise');

/**
 * Function for Encrypting the data
 * @param {*} data (data to encrypt)
 * @param {*} return (encrypted data)
 */
function encryptData(data) {
  if (config.bodyEncryption) {
    var dataString = JSON.stringify(data);
    var response = CryptoJS.AES.encrypt(dataString, config.cryptokey);
    return { encResponse: response.toString() };
  }
  return data;
}

/**
 * Function for decrypting the data
 * @param {*} data (data to decrypt)
 * @param {*} return (decrypt data)
 */
function decryptData(data) {
  if (config.bodyEncryption) {
    var decrypted = CryptoJS.AES.decrypt(data, config.cryptokey);
    if (decrypted) {
      var userinfo = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
      return userinfo;
    } else {
      return { userinfo: { error: 'Please send proper token' } };
    }
  }
  return data;
}

/**
 * Function for Encrypting the password
 * @param {*} data (data to encrypt)
 * @param {*} return (encrypted data)
 */
function encryptPassword(data) {
  var response = CryptoJS.AES.encrypt(data, config.tokenkey);
  return response.toString();
}

/**
 * Function for decrypting the password
 * @param {*} data (data to decrypt)
 * @param {*} return (decrypt data)
 */
function decryptPassword(data) {
  var decrypted = CryptoJS.AES.decrypt(data, config.tokenkey);
  if (decrypted) {
    var userinfo = decrypted.toString(CryptoJS.enc.Utf8);
    return userinfo;
  } else {
    return { userinfo: { error: 'Please send proper token' } };
  }
}

/**
 * Function for encryting the userId with session
 * @param {*} data (data to encrypt)
 * @param {*} return (encrypted data)
 */
async function tokenEncrypt(data) {
  var token = await jwt.sign({ data: data }, config.tokenkey, {
    expiresIn: 24 * 60 * 60,
  }); // Expires in 1 day
  return token;
}

/**
 * Function for decryting the userId with session
 * @param {*} data (data to decrypt)
 * @param {*} return (decrypted data)
 */
async function tokenDecrypt(data) {
  try {
    const decode = await jwt.verify(data, config.tokenkey);
    return decode;
  } catch (error) {
    return error;
  }
}

/**
 * Function for creating response
 * @param {*} data (status, data, token)
 * @param {*} return (encrypted data)
 */
function responseGenerator(statusCode, message, data = '') {
  var details = {
    statusCode: statusCode,
    message: message,
    result: data,
  };

  if (config.bodyEncryption) {
    return encryptData(details);
  } else {
    return details;
  }
}

/**
 * Function for sending email
 * @param {*} data (to, sub)
 * @param {*} return (decrypted data)
 */
async function sendEmail(to, subject, message) {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.SMTPemailAddress,
      pass: config.SMTPPassword,
    },
  });

  var mailOptions = {
    from: 'developers.winjit@gmail.com',
    to: to,
    subject: subject,
    html: message,
  };

  try {
    const smsDetails = await transporter.sendMail(mailOptions);
    return smsDetails;
  } catch (error) {
    errorHandler(error);
  }
}

/**
 * Function to randomly generate string
 * param
 * return (err, result)
 */
async function generateRandomString() {
  const randomStringGenerated = new Promise((resolve, reject) => {
    const referralCode = randomstring.generate({
      length: 6,
      charset: 'numeric',
    });
    resolve(referralCode);
  });

  const generatedString = await randomStringGenerated;
  return generatedString;
}

/* 
  Generate random string of specific size, 
  which used  for generating random password in create user by admin.
*/
function randomPasswordGenerater(length) {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

/**
 * Function for getting eth to usd price
 * @param {*} data (to, sub)
 * @param {*} return (decrypted data)
 */
async function tokenToUSD(price) {
  try {
    // https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD&api_key=7c07e26a5bf57caaf94ba3c0ef9598ba89c69d39a4f36111281270878a12fbea
    var options = {
      uri: `https://min-api.cryptocompare.com/data/${price}&api_key=7c07e26a5bf57caaf94ba3c0ef9598ba89c69d39a4f36111281270878a12fbea&`,
      headers: {
        'User-Agent': 'Request-Promise',
      },
      json: true,
    };
    const result = rp(options);
    return result;
  } catch (error) {
    errorHandler(error);
  }
}

/**
 * Function for getting eth to usd price
 * @param {*} data (to, sub)
 * @param {*} return (decrypted data)
 */
async function callThirdPartyAPI(options) {
  try {
    const result = await rp(options);
    return result;
  } catch (error) {
    errorHandler(error);
  }
}

module.exports = {
  encryptData,
  decryptData,
  encryptPassword,
  decryptPassword,
  tokenEncrypt,
  tokenDecrypt,
  responseGenerator,
  sendEmail,
  generateRandomString,
  randomPasswordGenerater,
  tokenToUSD,
  callThirdPartyAPI,
};
