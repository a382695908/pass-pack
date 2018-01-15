const crypto = require('crypto');

module.exports = (data) => {
  data = new Buffer(data, 'base64').toString('binary');
  var decipher = crypto.createDecipher('aes-256-cbc', global.key);
  var decoded = decipher.update(data, 'binary', 'utf8');
  decoded += decipher.final('utf8');
  return JSON.parse(decoded);
}