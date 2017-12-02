module.exports = function (options) {
  return {
    send: send
  }
};
const Twitter = require('./twitter')(options);
async function send(message){
  await Twitter.send({
    message: message,
    key: process.env.PORT,
    secret: process.env.PORT,
    token: process.env.PORT,
    token_secret: process.env.PORT
  });
};