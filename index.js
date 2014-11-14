var Writable = require("stream").Writable;
var patcher = require("html-patcher");

module.exports = patcherStream;

function patcherStream(element, initial) {
	var patch = patcher(element, initial || "");

	var stream = new Writable();
	stream._write = function (chunk, encoding, cb) {
		patch(chunk.toString());
		cb(null);
	}

	return stream;
}
