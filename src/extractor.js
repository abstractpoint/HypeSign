module.exports = function() {
    var isValid = function(text) {
        var valid = /@\w+ .+/.test(text);
        return valid;
    }

    var strip = function(text) {
        var matches = text.match(/@\w+ (.+)/);
        //console.log(matches);
        return matches[1];
    }

    var pad = function(line) {
        if (line.length < 16) {
            line += ' '.repeat(16 - line.length);
        }
        return line;
    }

    var rp = function(char) {
        switch(char) {
            case '£': return new Buffer([-100]);
            case '|': return new Buffer('}');
            case '}': return new Buffer('|');
            default: return new Buffer(char);
        }
    }

    var charReplace = function(text) {
        return text.split('').reduce(function(a, b) {
            return Buffer.concat([a, rp(b)]);
        }, new Buffer([]));
    }

    return {
        extract: function(text) {
            // Determine if tweet a mention
            if (! isValid(text)) return false;
            // Extract text
            var strippedText = strip(text);
            // Clean text up
            
            // Break into lines
            var line1 = strippedText.substring(0, 16);
            var line2 = strippedText.substring(16, 32);

            return {
                line1: charReplace(pad(line1)),
                line2: charReplace(pad(line2))
            }
        }
    };
}();