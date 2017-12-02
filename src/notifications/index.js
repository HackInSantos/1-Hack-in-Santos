module.exports = function (options) {
  return {
    send: send
  }
};
const Twitter = require('./twitter')(options);
async function send(message){
  await Twitter.send({
    message: message
  });
};