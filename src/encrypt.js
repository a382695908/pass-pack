const crypto = require('crypto');

module.exports = (data) => {
  data = JSON.stringify(data);
  let cipher = crypto.createCipher('aes-256-cbc', global.key);
  let crypted = cipher.update(data, 'utf8', 'binary');
  crypted += cipher.final('binary');
  crypted = new Buffer(crypted, 'binary').toString('base64');
  return crypted;
}