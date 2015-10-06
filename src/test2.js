var string = process.argv[2];

var sign = require('./sign')('10.0.0.201', 3500);
var extractor = require('./extractor');

var lines = extractor.extract("@test " + string);
if (! lines) return;
sign.send(lines.line1,lines.line2);