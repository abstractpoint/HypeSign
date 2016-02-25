
//var Twitter = require('node-tweet-stream');
//var t = new Twitter(require('./credentials.json'));

var sign = require('./sign')('10.0.0.201', 3500);

var extractor = require('./extractor');


var exec = require('child_process').exec;
var lastMessage = false;

function sendTime() {

	exec('date +\"%H:%M %a %b %d (%z)\"', function(error, stdout, stderr){
			console.log(stdout);
			string = stdout;

			var lines = extractor.extract("@test " + string);
			if (! lines) return;
			sign.send(lines.line1,lines.line2);

	});

}

function sendMessage(string) {

	var lines = extractor.extract("@test " + string);
	if (! lines) return;
	sign.send(lines.line1,lines.line2, 'yellow');


	lastMessage = Math.floor(Date.now() / 1000);
}


setInterval(function(){
	var currentTime = Math.floor(Date.now() / 1000);

	if (lastMessage < currentTime - 43200) {
		sendTime();
	}

}, 60000);

// t.on('tweet', function (tweet) {
//     console.log('tweet recieved', tweet);
//     var lines = extractor.extract(tweet.text);
//     if (! lines) return;

//     sign.send(lines.line1,lines.line2);
// });

// t.follow('3874743447');
var PUBNUB = require("pubnub");
var pubnub = PUBNUB.init({
	publish_key: 'pub-c-c34ae78b-ff0c-4173-8582-6f337b01eeba',
	subscribe_key: 'sub-c-2a90ec72-831a-11e2-9881-12313f022c90',
	error: function (error) {
		console.log('Error:', error);
	}
});

pubnub.time(
   function(time){
	  console.log(time)
   }
);

// Subscribe to a channel
 
pubnub.subscribe({
	channel: 'hypesign',
	message: function(m){
		console.log(m);
		sendMessage(m.message);
	},
	error: function (error) {
	  // Handle error here
	  console.log(JSON.stringify(error));
	}
});