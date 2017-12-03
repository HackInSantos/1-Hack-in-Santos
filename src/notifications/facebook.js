const request = require('request');

var _options;
module.exports = function (options) {
  _options = options || {};
  return {
    send: send
  }
};

function send(options) {

	request.post('https://graph.facebook.com/1738415926466937/feed?message='+options.message+'&access_token='+_options.fb_secret,
	    { message: _options.message, access_token: _options.fb_secret },
	    function (error, response, body) {
	        if (!error && response.statusCode == 200) {
	            console.log(body);
	            console.log(response);
	        }else{console.log(error+' '+JSON.stringify(response))}
	    }
	);
}