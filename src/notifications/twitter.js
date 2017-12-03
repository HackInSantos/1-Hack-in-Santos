const Twit = require('twit');

var _options;
module.exports = function (options) {
  _options = options || {};
  return {
    send: send
  }
};

function send(options) {
	var T = new Twit({
	  consumer_key:         _options.key,
	  consumer_secret:      _options.secret,
	  access_token:         _options.token,
	  access_token_secret:  _options.token_secret
	})

	T.post('statuses/update', { status: options.message }, function(err, data, response) {
	  console.log(data)
	})
}