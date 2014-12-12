var through2 = require("through2");
var patcher = require("html-patcher");

module.exports = HtmlPatcherStream;

function HtmlPatcherStream(element, initial) {
	var patch = patcher(element, initial || "");

	var stream = through2({objectMode:true}, function(chunk, encoding, cb) {
		patch(chunk.toString(), function(err) {
			if (err) return cb(err);

			this.push(element);
			cb(null);
		}.bind(this));
	});

	return stream;
}
