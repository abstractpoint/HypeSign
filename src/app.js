
//var Twitter = require('node-tweet-stream');
//var t = new Twitter(require('./credentials.json'));

var sign = require('./sign')('10.0.0.201', 3500);

var extractor = require('./extractor');


var exec = require('child_process').exec;


function sendTime() {

	exec('date +\"%H:%M %a %b %d (%z)\"', function(error, stdout, stderr){
	        console.log(stdout);
	        string = stdout;

	        var lines = extractor.extract("@test " + string);
	        if (! lines) return;
	        sign.send(lines.line1,lines.line2);

	});

}


setInterval(function(){
	sendTime();
}, 60000);

// t.on('tweet', function (tweet) {
//     console.log('tweet recieved', tweet);
//     var lines = extractor.extract(tweet.text);
//     if (! lines) return;

//     sign.send(lines.line1,lines.line2);
// });

// t.follow('3874743447');
