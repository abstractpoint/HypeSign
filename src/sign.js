var net = require("net");
module.exports = function(host, port) {
    var start = new Buffer("9901010147001B5B324A", "hex");
    var line1 = new Buffer("1B5B313B31481B5B33333B34306D1B2335", "hex");
    var line2 = new Buffer("1B5B323B31481B5B33333B34306D1B2335", "hex");
    var end = new Buffer("FF", "hex");
    return {
        send: function(l1, l2) {
            var client = net.connect({ host: host, port: port }, function(){
                var b = Buffer.concat([
                    start, line1,
                    new Buffer(l1),
                    line2,
                    new Buffer(l2),
                    end
                ]);
                client.write(b);
            });
            
        }
    }
};
