const crypto = require('crypto');

function generateRandomWord() {
  const bytes = crypto.randomBytes(6);
  return bytes.toString('base64').slice(0, 8);
}

module.exports = generateRandomWord;
