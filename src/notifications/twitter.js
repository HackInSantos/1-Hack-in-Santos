var Twit = require('twit')

const options;
module.exports = function (options) {
  options = options || {};
  return {
    send: send
  }
};

function send(options) {
	var T = new Twit({
	  consumer_key:         options.key,
	  consumer_secret:      options.secret,
	  access_token:         options.token,
	  access_token_secret:  options.token_secret
	})

	T.post('statuses/update', { status: options.message }, function(err, data, response) {
	  console.log(data)
	})
}