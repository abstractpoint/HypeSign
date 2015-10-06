var assert = require('assert');

describe('Extractor', function() {
    describe('extract', function() {
        var extractor = require('../src/extractor');
        it("can extract a tweet", function() {
            var lines = extractor.extract('@foo foo');
            assert.equal(typeof lines, 'object');
        });

        it("Filters incorrect messages", function() {
            var lines = extractor.extract("Not Valid");
            assert.equal(false, lines);
        });

        it("Splits into first line, 16 chars", function() {
            var lines = extractor.extract('@foo This Message is ');
            assert.equal(lines.line1, "This Message is ");
        });

        it("Splits text into two lines, 16 chars", function() {
            var lines = extractor.extract("@FooBar This Message is the shizzle what");
            assert.equal(lines.line1, "This Message is ");
            assert.equal(lines.line2, "the shizzle what");
        });

        it("Pads lines to 16 chars", function() {
            var lines = extractor.extract("@FooBar Que?");
            assert.equal(lines.line1, "Que?            ");
            assert.equal(lines.line2, "                ");
        });

        it("Truncates lines bigger than 32 chars", function() {
            var lines = extractor.extract("@HypeSign29 This is a massive message, No way this will fit");
            assert.equal(lines.line1, "This is a massiv");
            assert.equal(lines.line2, "e message, No wa");
        });

        it("Strips chars we can't display", function() {
            var lines = extractor.extract("@T !@£$%^&*()");
            //assert.equal(lines.line1, "!@£$%^&*()      ");
        });
    });
});