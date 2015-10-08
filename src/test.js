// Twitter
var sign = require('./sign')('10.0.0.201', 3500);

var pad = function(line) {
    if (line.length < 16) {
        line += ' '.repeat(16 - line.length);
    }
    return line;
}


// sign.send(
//   // ----------------
//     "Sign bitches !!!",
//     "----------------"
// );
var hex = process.argv[2];
console.log(hex);
var line2 = [];
for (var i = 0; i < 16; i++) {
    line2.push(parseInt(hex)+i);
}
sign.send(pad("> "+ hex +" <"), new Buffer(line2));
console.log(JSON.stringify(line2), new Buffer(line2));

// -88 upside down ?
// -100 £ sign
// -97 f ligature