var net = require("net");
module.exports = function(host, port) {
    var start = new Buffer("9901010147001B5B324A", "hex");
    var line1 = {};
    var line2 = {};
    line1.red = new Buffer("1B5B313B31481B5B33313B34306D1B2335", "hex");
    line2.red = new Buffer("1B5B323B31481B5B33313B34306D1B2335", "hex");
    line1.green = new Buffer("1B5B313B31481B5B33323B34306D1B2335", "hex");
    line2.green = new Buffer("1B5B323B31481B5B33323B34306D1B2335", "hex");
    line1.yellow = new Buffer("1B5B313B31481B5B33333B34306D1B2335", "hex");
    line2.yellow = new Buffer("1B5B323B31481B5B33333B34306D1B2335", "hex");
    var end = new Buffer("FF", "hex");
    return {
        send: function(l1, l2, color) {
            color = typeof color !== 'undefined' ? color : 'red';
            var client = net.connect({ host: host, port: port }, function(){
                var b = Buffer.concat([
                    start, line1[color],
                    new Buffer(l1),
                    line2[color],
                    new Buffer(l2),
                    end
                ]);
                client.write(b);
            });
            
        }
    }
};
