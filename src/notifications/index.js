module.exports = function (options) {
  return {
    send: send
  }
};
const Twitter = require('./twitter')(options);
async function send(message){
  await Twitter.send({
    message: message,
    key: process.env.KEY,
    secret: process.env.SECRET,
    token: process.env.TOKEN,
    token_secret: process.env.TOKEN_SECRET
  });
};