module.exports = function (options) {
  return {
    send: send
  }
};
const Twitter = require('./twitter')({
  key: process.env.KEY,
  secret: process.env.SECRET,
  token: process.env.TOKEN,
  token_secret: process.env.TOKEN_SECRET
});
const Facebook = require('./facebook')({
  fb_id: process.env.FB_ID,
  fb_secret: process.env.FB_SECRET
})
async function send(message){
  await Twitter.send({
    message: message,
  });
  await Facebook.send({
    message: message,
  });
};